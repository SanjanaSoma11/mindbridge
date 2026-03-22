/**
 * GET /api/google-calendar/events
 *
 * Fetches upcoming events from the Google Calendar linked via server env
 * (refresh token). Maps them to the same workload shape as Canvas assignments.
 *
 * Required env (see public/docs/GOOGLE_CALENDAR_DEMO.md):
 * - GOOGLE_CLIENT_ID
 * - GOOGLE_CLIENT_SECRET
 * - GOOGLE_REFRESH_TOKEN
 *
 * Optional:
 * - GOOGLE_CALENDAR_ID (default: "primary")
 */

import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { analyzeWorkload } from "@/lib/workloadStress";
import { googleEventsToAssignments } from "@/lib/googleCalendar";

export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN?.trim();

  if (!clientId || !clientSecret || !refreshToken) {
    return NextResponse.json(
      {
        error: "Google Calendar not configured",
        hint: "Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN in .env.local. See public/docs/GOOGLE_CALENDAR_DEMO.md",
      },
      { status: 503 }
    );
  }

  const calendarId = process.env.GOOGLE_CALENDAR_ID?.trim() || "primary";
  const days = Math.min(
    30,
    Math.max(1, Number(req.nextUrl.searchParams.get("days")) || 14)
  );

  const now = new Date();
  const timeMax = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  try {
    const oauth2 = new OAuth2Client(clientId, clientSecret);
    oauth2.setCredentials({ refresh_token: refreshToken });

    const calendar = google.calendar({ version: "v3", auth: oauth2 });
    const list = await calendar.events.list({
      calendarId,
      timeMin: now.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
      maxResults: 100,
    });

    const items = list.data.items ?? [];
    const assignments = googleEventsToAssignments(items);
    const analysis = analyzeWorkload(assignments, Date.now(), {
      workloadSourceLabel:
        "Google Calendar events (upcoming deadlines, approximate)",
    });

    return NextResponse.json({
      assignments,
      analysis,
      workloadContext: analysis.contextForAI,
      calendarId,
      eventCount: items.length,
    });
  } catch (e) {
    console.error("[/api/google-calendar/events]", e);
    const message = e instanceof Error ? e.message : "Calendar fetch failed";
    return NextResponse.json(
      { error: message, hint: "Check refresh token scope includes calendar.readonly" },
      { status: 502 }
    );
  }
}
