import Image from "next/image";
import { notFound } from "next/navigation";
import DetailActions from "@/components/DetailActions";
import { getWorkout } from "@/lib/api";

export default async function WorkoutDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const workout = await getWorkout(id);

  // Unknown id → show the 404 page
  if (!workout) notFound();

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left: image */}
        <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-line bg-card lg:sticky lg:top-28 lg:self-start">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Right: info */}
        <div>
          <h1 className="font-display text-4xl font-bold uppercase sm:text-5xl">{workout.name}</h1>
          <p className="mt-4 text-base leading-relaxed text-muted">{workout.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span key={group} className="rounded-full bg-accent px-3.5 py-1 text-xs font-semibold text-black">
                {group}
              </span>
            ))}
          </div>

          <div className="mt-7 overflow-hidden rounded-2xl border border-line bg-panel">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between gap-4 border-b border-line px-6 py-3.5 last:border-b-0"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-muted">{spec.label}</span>
                <span className="text-right text-sm font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>

          <h2 className="mt-9 font-display text-2xl font-bold uppercase">Instructions</h2>
          <ol className="mt-4 space-y-3">
            {workout.instructions.map((step, index) => (
              <li key={index} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-xs font-bold text-accent">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <div className="mt-9">
            <DetailActions workout={workout} />
          </div>
        </div>
      </div>
    </section>
  );
}
