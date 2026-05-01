"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const steps = [
  { href: "/", label: "Session" },
  { href: "/listen", label: "Listen" },
  { href: "/sync", label: "AI Sync" },
  { href: "/release", label: "Release" },
  { href: "/brief", label: "Brief" },
  { href: "/export", label: "Export" },
];

export function Stepper() {
  const pathname = usePathname();
  const currentIndex = steps.findIndex((s) =>
    s.href === "/" ? pathname === "/" : pathname.startsWith(s.href)
  );

  return (
    <nav className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl px-6 py-4">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {steps.map((step, idx) => {
            const isActive = idx === currentIndex;
            const isPast = currentIndex >= 0 && idx < currentIndex;
            return (
              <li key={step.href} className="flex items-center gap-2">
                <Link
                  href={step.href}
                  className={`rounded-full px-3 py-1 transition-colors ${
                    isActive
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                      : isPast
                      ? "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {idx + 1}. {step.label}
                </Link>
                {idx < steps.length - 1 && (
                  <span className="text-zinc-300 dark:text-zinc-700">→</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
