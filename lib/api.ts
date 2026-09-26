import { SortKey, Workout } from "./types";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

// Get all workouts for the library
export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to load workouts");
  return res.json();
}

// Get one workout by id (returns null when the id does not exist)
export async function getWorkout(id: string): Promise<Workout | null> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return null;
  return res.json();
}

// Sort a copy of the list: duration & calories low → high, rating high → low
export function sortWorkouts(list: Workout[], key: SortKey): Workout[] {
  const copy = [...list];
  if (key === "duration") copy.sort((a, b) => a.duration - b.duration);
  if (key === "calories") copy.sort((a, b) => a.caloriesBurned - b.caloriesBurned);
  if (key === "rating") copy.sort((a, b) => b.rating - a.rating);
  return copy;
}

// Keep workouts whose name or muscle-group tag contains the search text
export function searchWorkouts(list: Workout[], query: string): Workout[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter(
    (w) => w.name.toLowerCase().includes(q) || w.muscleGroups.some((tag) => tag.toLowerCase().includes(q))
  );
}
