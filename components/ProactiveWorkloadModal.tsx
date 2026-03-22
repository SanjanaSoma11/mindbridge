"use client";

import type { WorkloadAnalysis } from "@/lib/canvasTypes";

type Props = {
  open: boolean;
  analysis: WorkloadAnalysis | null;
  onDismiss: () => void;
  onCheckIn: () => void;
};

/**
 * Demo / product: surfaces when workload rules flag a busy stretch
 * (see lib/workloadStress.ts — suggestProactiveCheckin).
 */
export default function ProactiveWorkloadModal({
  open,
  analysis,
  onDismiss,
  onCheckIn,
}: Props) {
  if (!open || !analysis) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-900/45 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="proactive-workload-title"
    >
      <div className="w-full max-w-sm rounded-2xl border-2 border-accent/40 bg-brand-100 p-5 shadow-[0_20px_50px_rgba(42,61,50,0.25)]">
        <div className="flex items-start gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15"
            aria-hidden
          >
            <span className="h-3 w-3 animate-pulse rounded-full bg-accent shadow-[0_0_0_4px_rgba(31,122,77,0.2)]" />
          </span>
          <div className="min-w-0">
            <h2
              id="proactive-workload-title"
              className="font-display text-lg font-semibold leading-tight text-brand-600"
            >
              A lot is coming due
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-600/88">
              MindBridge noticed a busy stretch ahead (next 48h:{" "}
              <strong className="text-brand-600">{analysis.dueNext48h}</strong>,
              next 7 days:{" "}
              <strong className="text-brand-600">{analysis.dueNext7d}</strong>
              ). Want a private check-in — not about grades, just how you&apos;re
              doing?
            </p>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onDismiss}
            className="rounded-xl border border-brand-600/20 bg-white px-4 py-2.5 text-sm font-medium text-brand-600/85 hover:bg-brand-200/40"
          >
            Not now
          </button>
          <button
            type="button"
            onClick={onCheckIn}
            className="btn-solid-cocina rounded-xl px-4 py-2.5 text-sm"
          >
            Yes — check in
          </button>
        </div>
      </div>
    </div>
  );
}
