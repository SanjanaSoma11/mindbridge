import { Checkin, WeeklySummary, Followup, ThresholdResult } from "@/types";
import { evaluateThreshold } from "@/lib/threshold";

export interface ImpactMetrics {
  totalCheckins: number;
  checkinsLast14Days: number;
  avgSentiment14d: number | null;
  trendDirection: "up" | "down" | "flat" | "unknown";
  uniqueThemes: number;
  topTags: { tag: string; count: number }[];
  nudgeEligibleWeeks: number;
  followupYesRate: number | null;
  followupsCompleted: number;
  daysSinceFirstCheckin: number | null;
  /** Simulated “early support” score 0–100 for dashboard storytelling */
  bridgeScore: number;
  threshold: ThresholdResult;
}

export function computeImpactMetrics(
  checkins: Checkin[],
  summaries: WeeklySummary[],
  followups: Followup[]
): ImpactMetrics {
  const sorted = [...checkins].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  const now = Date.now();
  const cutoff14 = now - 14 * 24 * 60 * 60 * 1000;
  const last14 = sorted.filter(
    (c) => new Date(c.created_at).getTime() >= cutoff14
  );

  const avgSentiment14d =
    last14.length > 0
      ? Math.round(
          (last14.reduce((s, c) => s + c.sentiment_score, 0) / last14.length) *
            10
        ) / 10
      : null;

  let trendDirection: ImpactMetrics["trendDirection"] = "unknown";
  if (last14.length >= 4) {
    const half = Math.floor(last14.length / 2);
    const first = last14.slice(0, half);
    const second = last14.slice(half);
    const a =
      first.reduce((s, c) => s + c.sentiment_score, 0) / first.length;
    const b =
      second.reduce((s, c) => s + c.sentiment_score, 0) / second.length;
    if (b > a + 0.25) trendDirection = "up";
    else if (b < a - 0.25) trendDirection = "down";
    else trendDirection = "flat";
  }

  const tagCounts: Record<string, number> = {};
  last14.forEach((c) =>
    c.tags.forEach((t) => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    })
  );
  const topTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((x, y) => y.count - x.count)
    .slice(0, 5);

  const nudgeEligibleWeeks = summaries.filter((s) => s.nudge_triggered).length;

  const completed = followups.filter((f) => f.response !== null);
  const yesCount = completed.filter((f) => f.response === "yes").length;
  const followupYesRate =
    completed.length > 0
      ? Math.round((yesCount / completed.length) * 100)
      : null;

  const first = sorted[0];
  const daysSinceFirstCheckin = first
    ? Math.max(
        1,
        Math.floor(
          (now - new Date(first.created_at).getTime()) / (24 * 60 * 60 * 1000)
        )
      )
    : null;

  const threshold = evaluateThreshold(last14.length ? last14 : sorted);

  // Bridge score: blend engagement, stability, and follow-through (demo-friendly)
  let bridgeScore = 0;
  if (sorted.length >= 3) bridgeScore += 25;
  if (sorted.length >= 7) bridgeScore += 15;
  if (avgSentiment14d !== null && avgSentiment14d >= 3) bridgeScore += 20;
  if (avgSentiment14d !== null && avgSentiment14d >= 4) bridgeScore += 10;
  if (nudgeEligibleWeeks > 0) bridgeScore += 15;
  if (followupYesRate !== null && followupYesRate >= 50) bridgeScore += 15;
  bridgeScore = Math.min(100, bridgeScore);

  return {
    totalCheckins: sorted.length,
    checkinsLast14Days: last14.length,
    avgSentiment14d,
    trendDirection,
    uniqueThemes: Object.keys(tagCounts).length,
    topTags,
    nudgeEligibleWeeks,
    followupYesRate,
    followupsCompleted: completed.length,
    daysSinceFirstCheckin,
    bridgeScore,
    threshold,
  };
}
