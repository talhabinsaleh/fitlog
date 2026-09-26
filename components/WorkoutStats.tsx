import { LuClock, LuFlame, LuStar } from "react-icons/lu";
import { Workout } from "@/lib/types";

// Duration / calories / rating row used on cards and plan items
export default function WorkoutStats({ workout }: { workout: Workout }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/80">
      <span className="flex items-center gap-1.5">
        <LuClock className="text-accent" /> {workout.duration} min
      </span>
      <span className="flex items-center gap-1.5">
        <LuFlame className="text-accent" /> {workout.caloriesBurned} kcal
      </span>
      <span className="flex items-center gap-1.5">
        <LuStar className="text-accent" /> {workout.rating}
      </span>
    </div>
  );
}
