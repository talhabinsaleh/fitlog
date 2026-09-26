import Image from "next/image";
import Link from "next/link";
import { LuCheck, LuX } from "react-icons/lu";
import { Workout } from "@/lib/types";
import WorkoutStats from "./WorkoutStats";

interface Props {
  workout: Workout;
  done?: boolean;
  onMarkDone?: () => void; // only passed on the Today's Plan tab
  onRemove: () => void;
}

export default function PlanItem({ workout, done = false, onMarkDone, onRemove }: Props) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-line bg-card p-4 sm:flex-row sm:items-center ${
        done ? "opacity-70" : ""
      }`}
    >
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-36">
        <Image src={workout.image} alt={workout.name} fill sizes="(min-width: 640px) 144px, 100vw" className="object-cover" />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className={`font-display text-lg font-bold uppercase ${done ? "line-through decoration-accent" : ""}`}>
            {workout.name}
          </h3>
          {done && (
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-bold uppercase text-accent">Done</span>
          )}
        </div>
        <p className="mb-2 text-xs font-medium text-muted">{workout.equipment}</p>
        <WorkoutStats workout={workout} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-full border border-[#3a3f4a] px-4 py-2 text-xs font-medium hover:border-accent hover:text-accent"
        >
          View Details
        </Link>
        {onMarkDone && (
          <button
            onClick={onMarkDone}
            disabled={done}
            className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-black hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LuCheck /> {done ? "Completed" : "Mark as Done"}
          </button>
        )}
        <button
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="grid h-8 w-8 place-items-center rounded-full border border-[#3a3f4a] text-muted hover:border-red-400 hover:text-red-400"
        >
          <LuX />
        </button>
      </div>
    </div>
  );
}
