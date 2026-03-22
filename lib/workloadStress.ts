import type { CanvasAssignmentInput, WorkloadAnalysis, WorkloadTier } from "./canvasTypes";

const MS_48H = 48 * 60 * 60 * 1000;
const MS_7D = 7 * 24 * 60 * 60 * 1000;

function parseDue(due_at: string | null): number | null {
  if (!due_at) return null;
  const t = new Date(due_at).getTime();
  return Number.isFinite(t) ? t : null;
}

function tierFromCounts(due48: number, due7: number, total: number): WorkloadTier {
  if (due48 >= 6 || due7 >= 14) return "crushing";
  if (due48 >= 4 || due7 >= 10) return "heavy";
  if (due48 >= 2 || due7 >= 5 || total >= 8) return "moderate";
  return "light";
}

export type AnalyzeWorkloadOptions = {
  /** Shown in the AI system prompt (e.g. Canvas vs Google Calendar). */
  workloadSourceLabel?: string;
};

/**
 * Analyze assignment list for supportive (non-judgmental) check-in context.
 */
export function analyzeWorkload(
  assignments: CanvasAssignmentInput[],
  now = Date.now(),
  options?: AnalyzeWorkloadOptions
): WorkloadAnalysis {
  const valid = assignments.filter((a) => a.name?.trim());
  const withDue = valid
    .map((a) => ({ ...a, t: parseDue(a.due_at) }))
    .filter((a) => a.t !== null && a.t! >= now) as (CanvasAssignmentInput & {
    t: number;
  })[];

  const dueNext48h = withDue.filter((a) => a.t <= now + MS_48H).length;
  const dueNext7d = withDue.filter((a) => a.t <= now + MS_7D).length;
  const totalTracked = valid.length;

  const tier = tierFromCounts(dueNext48h, dueNext7d, totalTracked);

  const soonest = withDue.sort((a, b) => a.t - b.t)[0];
  const nextDueLabel = soonest
    ? `${soonest.name}${soonest.course_name ? ` (${soonest.course_name})` : ""}`
    : null;

  const suggestProactiveCheckin =
    tier === "heavy" || tier === "crushing" || dueNext48h >= 3;

  const headlines: Record<WorkloadTier, string> = {
    light: "Your schedule looks manageable right now — still okay to check in.",
    moderate: "You’ve got a fair amount due soon — no shame in pausing for a breath.",
    heavy: "That’s a lot on the calendar — MindBridge is here if you want to vent or sort through it.",
    crushing: "Heavy load ahead — you’re not failing for feeling pressure. Want a quick check-in?",
  };

  const workloadSourceLabel =
    options?.workloadSourceLabel ??
    "Canvas assignment due dates, approximate";

  const contextForAI = [
    `Workload signal (from ${workloadSourceLabel}):`,
    `- Items with due/end times in the next 48 hours: ${dueNext48h}`,
    `- Items with due/end times in the next 7 days: ${dueNext7d}`,
    `- Overall tier: ${tier} (internal label only; do not use the word "crushing" with the student).`,
    nextDueLabel
      ? `- Next upcoming (by time): "${nextDueLabel}"`
      : `- No upcoming due dates were provided in the payload.`,
    `The student may feel time pressure. Be warm, normalize stress, never imply they are lazy. Do not list every assignment unless they ask.`,
  ].join("\n");

  return {
    tier,
    contextForAI,
    headline: headlines[tier],
    dueNext48h,
    dueNext7d,
    totalTracked,
    suggestProactiveCheckin,
    nextDueLabel,
  };
}
