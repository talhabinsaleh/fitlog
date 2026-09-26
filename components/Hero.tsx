import Image from "next/image";
import { LuArrowDown } from "react-icons/lu";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12">
      <div className="grid items-center gap-8 rounded-2xl border border-line bg-card px-6 py-10 sm:px-12 md:grid-cols-[1.4fr_1fr] md:py-14">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent">Workout Library</p>
          <h1 className="mt-4 font-display text-4xl leading-tight font-bold uppercase sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and
            watch the week&apos;s work add up.
          </p>
          {/* Anchor link: scrolls down to the library on the same page */}
          <a
            href="#library"
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-xs font-bold uppercase tracking-wide text-black transition hover:brightness-110"
          >
            Browse workouts
            <LuArrowDown className="text-base" />
          </a>
        </div>
        <div className="flex justify-center">
          <Image
            src="/banner.png"
            alt="Athlete training on a preacher curl machine"
            width={334}
            height={334}
            priority
            className="w-56 sm:w-72 md:w-80"
          />
        </div>
      </div>
    </section>
  );
}
