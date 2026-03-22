import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/requestUser";
import {
  getCheckins,
  getWeeklySummaries,
  getFollowups,
} from "@/lib/repository";
import { computeImpactMetrics } from "@/lib/impactMetrics";
import { explainThresholdReasons } from "@/lib/thresholdExplain";

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req);
  try {
    const [checkins, summaries, followups] = await Promise.all([
      getCheckins(userId),
      getWeeklySummaries(userId),
      getFollowups(userId),
    ]);
    const metrics = computeImpactMetrics(checkins, summaries, followups);
    const explain = explainThresholdReasons(metrics.threshold.reason);
    return NextResponse.json({
      metrics,
      thresholdExplain: explain,
      userId,
    });
  } catch (e) {
    console.error("[/api/impact]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
