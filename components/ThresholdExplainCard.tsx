"use client";

import { useState } from "react";
import { explainThresholdReasons } from "@/lib/thresholdExplain";

export default function ThresholdExplainCard({
  reason,
}: {
  reason: string | null;
}) {
  const [open, setOpen] = useState(false);
  const { bullets } = explainThresholdReasons(reason);

  if (!reason || bullets.length === 0) return null;

  return (
    <div className="mt-3 rounded-xl border border-brand-600/15 bg-brand-200/50 px-3 py-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left text-[10px] font-semibold uppercase tracking-wide text-brand-600"
        aria-expanded={open}
      >
        Why did this nudge appear?
        <span className="text-brand-600/60">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-brand-600/85 normal-case tracking-normal">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
