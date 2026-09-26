"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const links = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  // "Workouts" stays active on the home page and on workout detail pages
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" || pathname.startsWith("/workouts") : pathname.startsWith(href);

  const navLinks = links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className={`rounded-full px-4 py-1.5 text-xs transition ${
        isActive(link.href)
          ? "bg-accent-soft font-semibold text-accent"
          : "font-medium text-muted hover:text-white"
      }`}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-[#1c1f26] bg-bg/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="FitLog logo" width={28} height={28} />
          <span className="font-display text-lg font-bold tracking-wide">FITLOG</span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">{navLinks}</nav>

        <div className="flex items-center gap-4 text-xs font-medium sm:gap-6">
          <Link href="/my-plan" className="flex items-center gap-2 text-white">
            Plan
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-black">
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2 text-muted hover:text-white">
            Saved
            <span className="grid h-5 min-w-5 place-items-center rounded-full border border-[#2d313b] px-1.5 text-[11px] font-bold text-white">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>

      {/* On phones the links move to a second row so they stay easy to tap */}
      <nav className="flex justify-center gap-1 border-t border-[#1c1f26] py-2 sm:hidden">{navLinks}</nav>
    </header>
  );
}
