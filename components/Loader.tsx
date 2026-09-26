export default function Loader({ text = "Loading workouts…" }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <span className="h-12 w-12 animate-spin rounded-full border-4 border-line border-t-accent" />
      <p className="text-sm text-muted">{text}</p>
    </div>
  );
}
