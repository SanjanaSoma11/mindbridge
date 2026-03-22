"use client";

import type { ImpactMetrics } from "@/lib/impactMetrics";
import Link from "next/link";

export default function ImpactDashboard({
  metrics,
}: {
  metrics: ImpactMetrics;
}) {
  const cards = [
    {
      label: "Bridge score",
      value: `${metrics.bridgeScore}`,
      suffix: "/100",
      sub: "Engagement + stability + follow-through (demo heuristic)",
    },
    {
      label: "Check-ins (14d)",
      value: `${metrics.checkinsLast14Days}`,
      suffix: "",
      sub: `${metrics.totalCheckins} total recorded`,
    },
    {
      label: "Avg mood (14d)",
      value:
        metrics.avgSentiment14d !== null
          ? String(metrics.avgSentiment14d)
          : "—",
      suffix: "/5",
      sub: "Rolling average of sentiment scores",
    },
    {
      label: "Themes tracked",
      value: `${metrics.uniqueThemes}`,
      suffix: "",
      sub: "Distinct tags in the last 14 days",
    },
    {
      label: "Nudge weeks",
      value: `${metrics.nudgeEligibleWeeks}`,
      suffix: "",
      sub: "Weekly summaries where threshold fired",
    },
    {
      label: "Follow-up yes-rate",
      value:
        metrics.followupYesRate !== null ? `${metrics.followupYesRate}%` : "—",
      suffix: "",
      sub:
        metrics.followupsCompleted > 0
          ? `${metrics.followupsCompleted} completed`
          : "Answer a follow-up on Patterns to populate",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        {cards.map((c) => (
          <div key={c.label} className="surface-card p-4">
            <p className="text-xs font-medium text-brand-600/55">
              {c.label}
            </p>
            <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-brand-600">
              {c.value}
              <span className="text-sm font-semibold text-brand-600/70">
                {c.suffix}
              </span>
            </p>
            <p className="mt-1 text-xs text-brand-600/65 leading-snug normal-case tracking-normal">
              {c.sub}
            </p>
          </div>
        ))}
      </div>

      {metrics.topTags.length > 0 && (
        <div className="surface-card p-5">
          <h3 className="mb-3 font-display text-base font-semibold tracking-tight text-brand-600">
            Top themes (14 days)
          </h3>
          <div className="flex flex-wrap gap-2">
            {metrics.topTags.map((t) => (
              <span
                key={t.tag}
                className="inline-flex items-center gap-1 rounded-full border border-brand-600/15 bg-brand-200/55 px-3 py-1 text-xs font-medium text-brand-600"
              >
                {t.tag}
                <span className="text-brand-600/50">×{t.count}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="surface-card p-5 border-brand-600/30">
        <p className="text-xs text-brand-600/80 leading-relaxed normal-case tracking-normal">
          MindBridge is designed to show{" "}
          <strong>proactive, explainable</strong> support: trends and thresholds
          surface help before crisis. These numbers are a{" "}
          <strong>transparent snapshot</strong> of that loop — not a clinical
          assessment.
        </p>
        <Link
          href="/patterns"
          className="mt-3 inline-block text-sm font-semibold text-accent underline decoration-accent/35 underline-offset-[3px]"
        >
          See patterns & nudge →
        </Link>
      </div>
    </div>
  );
}
