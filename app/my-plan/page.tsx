"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import PlanItem from "@/components/PlanItem";
import SearchBox from "@/components/SearchBox";
import SortDropdown from "@/components/SortDropdown";
import { usePlan } from "@/context/PlanContext";
import { searchWorkouts, sortWorkouts } from "@/lib/api";
import { SortKey } from "@/lib/types";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const { plan, saved, doneIds, ready, removeFromPlan, removeFromSaved, markDone } = usePlan();
  const [tab, setTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortKey>("duration");
  const [search, setSearch] = useState("");

  // Workouts in the active tab (Today's Plan or Saved)
  const activeList = tab === "plan" ? plan : saved;
  const list = sortWorkouts(searchWorkouts(activeList, search), sortBy);

  // Summary numbers follow the active tab
  const totalMinutes = activeList.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = activeList.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const stats = [
    { label: "Exercises", value: activeList.length, highlight: true },
    { label: "Minutes", value: totalMinutes },
    { label: "Calories", value: totalCalories },
  ];

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "plan", label: "Today's Plan", count: plan.length },
    { key: "saved", label: "Saved", count: saved.length },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14">
      <h1 className="font-display text-4xl font-bold uppercase sm:text-5xl">My Plan</h1>
      <p className="mt-2 text-sm text-muted">Cap of five lifts for today. Finish them, then load more.</p>

      {/* Metrics summary */}
      <div className="mt-8 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-panel py-6">
        {stats.map((stat) => (
          <div key={stat.label} className="px-4 sm:px-8">
            <p className="text-xs text-muted sm:text-sm">{stat.label}</p>
            <p className={`mt-1 font-display text-3xl font-bold sm:text-4xl ${stat.highlight ? "text-accent" : ""}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs + sort */}
      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="inline-flex w-fit gap-1 rounded-xl border border-line bg-panel p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-lg px-4 py-2 text-xs whitespace-nowrap transition ${
                tab === t.key ? "bg-[#1f242d] font-semibold text-white" : "text-muted hover:text-white"
              }`}
            >
              {t.label} ({t.count})
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBox value={search} onChange={setSearch} />
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {/* List */}
      <div className="mt-6">
        {!ready ? (
          <Loader text="Loading workouts…" />
        ) : activeList.length > 0 && list.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted">No lifts in this tab match &ldquo;{search}&rdquo;.</p>
        ) : list.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-card px-6 py-20 text-center">
            <h2 className="font-display text-2xl font-bold uppercase">Nothing here yet</h2>
            <p className="mt-2 max-w-xs text-sm text-muted">Browse the library and add a lift to get today moving.</p>
            <Link
              href="/"
              className="mt-6 rounded-full bg-accent px-6 py-2.5 text-xs font-semibold text-black hover:brightness-110"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {list.map((workout) =>
              tab === "plan" ? (
                <PlanItem
                  key={workout.id}
                  workout={workout}
                  done={doneIds.includes(workout.id)}
                  onMarkDone={() => {
                    markDone(workout.id);
                    toast.success(`Nice work! ${workout.name} marked as done`);
                  }}
                  onRemove={() => {
                    removeFromPlan(workout.id);
                    toast.error(`${workout.name} removed from today's plan`);
                  }}
                />
              ) : (
                <PlanItem
                  key={workout.id}
                  workout={workout}
                  onRemove={() => {
                    removeFromSaved(workout.id);
                    toast.error(`${workout.name} removed from saved`);
                  }}
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
