import type { CanvasAssignmentInput } from "@/lib/canvasTypes";

/** Minimal event shape from Calendar API `events.list`. */
export type GoogleCalendarEventLike = {
  id?: string | null;
  summary?: string | null;
  start?: { dateTime?: string | null; date?: string | null };
  end?: { dateTime?: string | null; date?: string | null };
  organizer?: { displayName?: string | null } | null;
};

/**
 * Map Google Calendar events to the same shape as Canvas assignments so
 * `analyzeWorkload` / chat can reuse the pipeline.
 *
 * Uses event end time when present (deadline feel); otherwise start. All-day
 * events use start date at noon UTC for stable sorting.
 */
export function googleEventsToAssignments(
  events: GoogleCalendarEventLike[]
): CanvasAssignmentInput[] {
  const out: CanvasAssignmentInput[] = [];

  for (const ev of events) {
    const name = ev.summary?.trim() || "(Untitled event)";
    let due_at: string | null = null;

    if (ev.end?.dateTime) {
      due_at = ev.end.dateTime;
    } else if (ev.start?.dateTime) {
      due_at = ev.start.dateTime;
    } else if (ev.start?.date) {
      // All-day: Google uses end.date exclusive; treat start day end-of-day UTC.
      const d = ev.start.date;
      if (/^\d{4}-\d{2}-\d{2}$/.test(d)) {
        due_at = `${d}T23:59:59.000Z`;
      }
    }

    if (!due_at) continue;

    const course_name =
      ev.organizer?.displayName?.trim() || "Google Calendar";

    out.push({
      id: ev.id ?? undefined,
      name,
      due_at,
      course_name,
    });
  }

  return out;
}
