import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <p className="font-display text-8xl font-bold text-accent">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase">Page not found</h1>
      <p className="mt-3 text-sm text-muted">
        This lift isn&apos;t in the library. Check the link or head back to the workouts.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-2.5 text-xs font-semibold text-black hover:brightness-110"
      >
        Go to workouts
      </Link>
    </section>
  );
}
