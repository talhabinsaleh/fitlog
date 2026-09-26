"use client";

import { toast } from "react-toastify";
import { LuBookmark, LuCheck, LuPlus } from "react-icons/lu";
import { PLAN_LIMIT, usePlan } from "@/context/PlanContext";
import { Workout } from "@/lib/types";

export default function DetailActions({ workout }: { workout: Workout }) {
  const { plan, saved, addToPlan, saveForLater } = usePlan();

  const inPlan = plan.some((p) => p.id === workout.id);
  const isSaved = saved.some((s) => s.id === workout.id);
  const planFull = !inPlan && plan.length >= PLAN_LIMIT;

  const handleAdd = () => {
    const result = addToPlan(workout);
    if (result === "added") toast.success(`${workout.name} added to today's plan`);
    if (result === "exists") toast.info("Already in today's plan");
    if (result === "full") toast.warning(`Today's plan is capped at ${PLAN_LIMIT} lifts`);
  };

  const handleSave = () => {
    const result = saveForLater(workout);
    if (result === "added") toast.success(`${workout.name} saved for later`);
    else toast.info("Already in your saved list");
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        onClick={handleAdd}
        disabled={inPlan || planFull}
        className="flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {inPlan ? <LuCheck className="text-lg" /> : <LuPlus className="text-lg" />}
        {inPlan ? "In today's plan" : planFull ? "Plan is full (5/5)" : "Add to today's plan"}
      </button>
      <button
        onClick={handleSave}
        disabled={isSaved}
        className="flex items-center justify-center gap-2 rounded-xl border border-[#3a3f4a] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LuBookmark className="text-lg" />
        {isSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
