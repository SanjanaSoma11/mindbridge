/**
 * 3-condition threshold logic from the architecture doc.
 * Any single condition sustained over a rolling 7-14 day window = nudge.
 * We err toward early nudging: a false positive costs 10 seconds of dismissal;
 * a false negative costs months of unaddressed suffering.
 */

import { Checkin, ThresholdResult } from "@/types";

const HELP_PATTERNS =
  /\b(need help|what should i do|should i see someone|talk to someone|need to talk|need support)\b/i;

export function evaluateThreshold(checkins: Checkin[]): ThresholdResult {
  // ── CRISIS: immediate, overrides everything ───────────────────────────────
  if (checkins.some((c) => c.crisis_flag)) {
    return { nudge: true, reason: "crisis_detected", urgency: "crisis" };
  }

  // ── RAPID DECLINE: single check-in at sentiment 1 ────────────────────────
  const latest = checkins[checkins.length - 1];
  if (latest && latest.sentiment_score === 1) {
    return {
      nudge: true,
      reason: "severe_distress_single_checkin",
      urgency: "soft",
    };
  }

  // Need at least 5 check-ins before evaluating rolling-window conditions
  if (checkins.length < 5) {
    return { nudge: false, reason: null, urgency: "standard" };
  }

  const conditions: string[] = [];

  // ── CONDITION 1: Average sentiment consistently low ───────────────────────
  const avgSentiment =
    checkins.reduce((s, c) => s + c.sentiment_score, 0) / checkins.length;
  if (avgSentiment <= 2.5) {
    conditions.push("sustained_low_sentiment");
  }

  // ── CONDITION 2: 3+ distress tags recurring across 4+ check-ins ──────────
  const tagCounts: Record<string, number> = {};
  checkins.forEach((c) =>
    c.tags.forEach((t) => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    })
  );
  const recurringTags = Object.entries(tagCounts).filter(
    ([, count]) => count >= 4
  );
  if (recurringTags.length >= 3) {
    conditions.push("recurring_distress_themes");
  }

  // ── CONDITION 3: Student directly asked for help ──────────────────────────
  if (checkins.some((c) => HELP_PATTERNS.test(c.user_text))) {
    conditions.push("explicit_help_request");
  }

  if (conditions.length > 0) {
    return {
      nudge: true,
      reason: conditions.join(", "),
      urgency: "standard",
    };
  }

  return { nudge: false, reason: null, urgency: "standard" };
}

export function nudgeMessage(reason: string | null): string {
  if (!reason) return "";

  if (reason.includes("crisis_detected")) {
    return "You mentioned something that made me want to check in. There are people available right now who want to help.";
  }
  if (reason.includes("severe_distress_single_checkin")) {
    return "Today sounded really hard. You don't have to carry that alone — talking to someone can help.";
  }
  if (reason.includes("sustained_low_sentiment")) {
    return "Looking back over the past couple of weeks, things have felt consistently heavy. Connecting with a counselor — even once — can make a real difference.";
  }
  if (reason.includes("recurring_distress_themes")) {
    return "A few themes keep showing up in your check-ins. A counselor can help you work through exactly this kind of thing.";
  }
  if (reason.includes("explicit_help_request")) {
    return "You mentioned wanting to talk to someone. We think that's a great idea — here's how to take that step.";
  }
  return "Based on your recent check-ins, we think it might help to connect with a counselor or someone you trust.";
}
