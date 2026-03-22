/**
 * Human-readable explanations for judges & users (not clinical advice).
 */

const REASON_LABELS: Record<string, string> = {
  crisis_detected:
    "Safety keywords or crisis language appeared in a check-in — we prioritize immediate support resources.",
  severe_distress_single_checkin:
    "Your latest check-in indicated severe distress — we surface gentle support options early.",
  sustained_low_sentiment:
    "Average mood over recent check-ins has stayed in a low range — a pattern we watch for proactive outreach.",
  recurring_distress_themes:
    "The same themes showed up across many check-ins — repetition can mean it’s worth talking to someone.",
  explicit_help_request:
    "You asked for help or how to talk to someone — we treat that as a clear signal to show options.",
};

export function explainThresholdReasons(reason: string | null): {
  codes: string[];
  bullets: string[];
} {
  if (!reason) return { codes: [], bullets: [] };
  const codes = reason.split(",").map((s) => s.trim()).filter(Boolean);
  const bullets = codes.map(
    (c) => REASON_LABELS[c] ?? `Signal: ${c.replace(/_/g, " ")}.`
  );
  return { codes, bullets };
}

export function whyMindBridgeIsDifferent(): { title: string; body: string }[] {
  return [
    {
      title: "Preventive, not reactive",
      body: "We look at trends over time — not just the latest message — so support can show up before a crisis.",
    },
    {
      title: "Explainable thresholds",
      body: "Nudges fire from clear rules (mood trend, recurring themes, direct help-seeking) plus crisis safety checks — not a black box.",
    },
    {
      title: "Student-owned data",
      body: "Pseudonymous ID, one-tap delete. Optional Canvas embed uses due dates only for tone — your check-in words aren’t sent to instructors.",
    },
    {
      title: "Thermometer, not treatment",
      body: "MindBridge doesn’t diagnose or replace care — it helps you notice patterns and reach vetted resources.",
    },
  ];
}
