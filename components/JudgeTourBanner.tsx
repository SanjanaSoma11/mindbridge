"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const STEPS = [
  { path: "/patterns", label: "1. Patterns & nudge", hint: "14-day arc + threshold" },
  { path: "/check-in", label: "2. Live check-in", hint: "Try Claude or fallback" },
  { path: "/impact", label: "3. Impact", hint: "Metrics judges love" },
  { path: "/resources", label: "4. Resources", hint: "Vetted links" },
];

export default function JudgeTourBanner({
  onExit,
}: {
  onExit: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="mb-4 rounded-2xl border-2 border-brand-600/25 bg-brand-200/50 p-4 shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="section-eyebrow text-brand-600/70">Judge demo path</p>
          <p className="text-sm text-brand-600/85 mt-0.5 normal-case tracking-normal">
            Pre-loaded storyline → nudge → follow-up flow.{" "}
            <span className="text-brand-600/55">~90 seconds.</span>
          </p>
        </div>
        <button
          type="button"
          onClick={onExit}
          className="text-xs font-semibold text-brand-600 underline decoration-brand-600/30 underline-offset-[3px] hover:text-brand-800"
        >
          Exit demo — my own session
        </button>
      </div>
      <ol className="mt-3 flex flex-wrap gap-2">
        {STEPS.map((s) => {
          const active = pathname === s.path;
          return (
            <li key={s.path}>
              <Link
                href={s.path}
                className={`inline-flex flex-col rounded-xl border px-3 py-2 text-left transition-colors ${
                  active
                    ? "border-brand-600 bg-brand-200/70 shadow-none"
                    : "border-brand-600/12 bg-brand-200/50 hover:bg-brand-200/75"
                }`}
              >
                <span className="text-[11px] font-semibold leading-tight text-brand-600">
                  {s.label}
                </span>
                <span className="text-[9px] text-brand-600/55 normal-case">{s.hint}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
