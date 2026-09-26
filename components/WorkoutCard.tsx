import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/lib/types";
import WorkoutStats from "./WorkoutStats";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition hover:-translate-y-1 hover:border-accent/60"
    >
      <div className="relative h-48 overflow-hidden bg-[#1f232b]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black"
            >
              {group}
            </span>
          ))}
        </div>
        <h3 className="mt-3 font-display text-xl font-bold uppercase">{workout.name}</h3>
        <p className="mt-1 text-xs text-muted">{workout.equipment}</p>
        <div className="mt-auto border-t border-line pt-4">
          <WorkoutStats workout={workout} />
        </div>
      </div>
    </Link>
  );
}
