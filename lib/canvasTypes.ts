/**
 * Canvas-related types. Assignment payloads can come from:
 * - LTI/OAuth backend calling Canvas API, then POSTing here
 * - postMessage from a trusted parent (school-hosted bridge page)
 * - Demo / manual entry in the embed UI
 */

export interface CanvasAssignmentInput {
  id?: string;
  name: string;
  /** ISO 8601 or null if no due date */
  due_at: string | null;
  course_name?: string;
  points_possible?: number;
  html_url?: string;
}

export type WorkloadTier = "light" | "moderate" | "heavy" | "crushing";

export interface WorkloadAnalysis {
  tier: WorkloadTier;
  /** Human-readable summary for the AI system prompt (no PII beyond course/assignment names you choose to send) */
  contextForAI: string;
  /** Short line for UI */
  headline: string;
  dueNext48h: number;
  dueNext7d: number;
  totalTracked: number;
  /** Suggest opening a check-in without forcing */
  suggestProactiveCheckin: boolean;
  nextDueLabel: string | null;
}
