"use client";

import { useEffect, useState } from "react";
import { getWorkouts, searchWorkouts, sortWorkouts } from "@/lib/api";
import { SortKey, Workout } from "@/lib/types";
import Loader from "./Loader";
import SearchBox from "./SearchBox";
import SortDropdown from "./SortDropdown";
import WorkoutCard from "./WorkoutCard";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("duration");
  const [search, setSearch] = useState("");

  // Load all workouts from the API when the page opens
  useEffect(() => {
    getWorkouts()
      .then((data) => setWorkouts(data))
      .catch(() => setError("Could not load workouts. Please refresh the page."))
      .finally(() => setLoading(false));
  }, []);

  const visible = sortWorkouts(searchWorkouts(workouts, search), sortBy);

  return (
    <section id="library" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-16 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase">The Library</h2>
          <p className="mt-1 text-sm text-muted">Twelve lifts covering every major muscle group.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBox value={search} onChange={setSearch} />
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {loading && <Loader />}
      {error && <p className="py-24 text-center text-sm text-red-400">{error}</p>}

      {!loading && !error && visible.length === 0 && (
        <p className="py-24 text-center text-sm text-muted">
          No workouts match &ldquo;{search}&rdquo;. Try a name like &ldquo;squat&rdquo; or a tag like &ldquo;core&rdquo;.
        </p>
      )}

      {!loading && !error && visible.length > 0 && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
