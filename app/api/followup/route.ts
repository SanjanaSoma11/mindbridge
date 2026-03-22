/**
 * GET  /api/followup?userId=...  — check if a 2-week follow-up is due
 * POST /api/followup              — record a follow-up response
 */

import { NextRequest, NextResponse } from "next/server";
import {
  getFollowups,
  createFollowup,
  updateFollowup,
  getWeeklySummaries,
} from "@/lib/repository";
import { getUserIdFromRequest } from "@/lib/requestUser";

const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req);

  const summaries = await getWeeklySummaries(userId);
  const nudgedSummary = summaries.find(
    (s) =>
      s.nudge_triggered &&
      Date.now() - new Date(s.created_at).getTime() >= TWO_WEEKS_MS
  );

  if (!nudgedSummary) {
    return NextResponse.json({ due: false });
  }

  const followups = await getFollowups(userId);
  const existing = followups.find(
    (f) =>
      Math.abs(
        new Date(f.nudge_date).getTime() -
          new Date(nudgedSummary.created_at).getTime()
      ) <
      24 * 60 * 60 * 1000
  );

  if (existing) {
    return NextResponse.json({ due: false, followup: existing });
  }

  const followup = await createFollowup({
    user_id: userId,
    nudge_date: nudgedSummary.created_at,
    followup_sent_at: new Date().toISOString(),
    response: null,
    created_at: new Date().toISOString(),
  });

  return NextResponse.json({ due: true, followup });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { followupId, response } = body;

    if (!followupId || !["yes", "no"].includes(response)) {
      return NextResponse.json(
        { error: "followupId and response ('yes'|'no') are required" },
        { status: 400 }
      );
    }

    const updated = await updateFollowup(followupId, { response });
    if (!updated) {
      return NextResponse.json({ error: "Follow-up not found" }, { status: 404 });
    }

    return NextResponse.json({ followup: updated });
  } catch (err) {
    console.error("[/api/followup POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
