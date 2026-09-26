"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Workout } from "@/lib/types";

export const PLAN_LIMIT = 5;
const STORAGE_KEY = "fitlog-data";

interface PlanContextValue {
  plan: Workout[];
  saved: Workout[];
  doneIds: number[];
  ready: boolean; // true once localStorage has been read
  addToPlan: (w: Workout) => "added" | "exists" | "full";
  saveForLater: (w: Workout) => "added" | "exists";
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [ready, setReady] = useState(false);

  // Load saved data once when the app starts
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setPlan(data.plan ?? []);
        setSaved(data.saved ?? []);
        setDoneIds(data.doneIds ?? []);
      }
    } catch {
      // ignore broken or blocked storage
    }
    setReady(true);
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved, doneIds }));
    } catch {
      // ignore
    }
  }, [plan, saved, doneIds, ready]);

  const addToPlan = (w: Workout) => {
    if (plan.some((p) => p.id === w.id)) return "exists";
    if (plan.length >= PLAN_LIMIT) return "full";
    setPlan([...plan, w]);
    return "added";
  };

  const saveForLater = (w: Workout) => {
    if (saved.some((s) => s.id === w.id)) return "exists";
    setSaved([...saved, w]);
    return "added";
  };

  const removeFromPlan = (id: number) => {
    setPlan(plan.filter((p) => p.id !== id));
    setDoneIds(doneIds.filter((d) => d !== id));
  };

  const removeFromSaved = (id: number) => {
    setSaved(saved.filter((s) => s.id !== id));
  };

  const markDone = (id: number) => {
    if (!doneIds.includes(id)) setDoneIds([...doneIds, id]);
  };

  return (
    <PlanContext.Provider
      value={{ plan, saved, doneIds, ready, addToPlan, saveForLater, removeFromPlan, removeFromSaved, markDone }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}
