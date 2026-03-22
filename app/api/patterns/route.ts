/**
 * GET  /api/patterns?userId=...  — return recent check-ins + weekly summary
 * POST /api/patterns              — generate a new weekly summary
 */

import { NextRequest, NextResponse } from "next/server";
import {
  getCheckins,
  getWeeklySummaries,
  createWeeklySummary,
} from "@/lib/repository";
import { generateWeeklySummary } from "@/lib/claude";
import { evaluateThreshold } from "@/lib/threshold";
import { getUserIdFromRequest } from "@/lib/requestUser";

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req);

  const checkins = await getCheckins(userId);
  const summaries = await getWeeklySummaries(userId);
  const threshold = evaluateThreshold(checkins.slice(-14));

  return NextResponse.json({
    checkins,
    summaries,
    threshold,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = getUserIdFromRequest(req, body.userId);

    const checkins = await getCheckins(userId);
    const recent = checkins.slice(-7);

    if (recent.length === 0) {
      return NextResponse.json(
        { error: "No check-ins to summarize" },
        { status: 400 }
      );
    }

    const messages = recent.map((c) => c.user_text);
    const summaryText = await generateWeeklySummary(messages);

    const avgSentiment =
      recent.reduce((s, c) => s + c.sentiment_score, 0) / recent.length;

    const tagCounts: Record<string, number> = {};
    recent.forEach((c) =>
      c.tags.forEach((t) => {
        tagCounts[t] = (tagCounts[t] || 0) + 1;
      })
    );
    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([tag]) => tag);

    const firstSentiment = recent[0]?.sentiment_score ?? 3;
    const lastSentiment = recent[recent.length - 1]?.sentiment_score ?? 3;
    const trend =
      lastSentiment > firstSentiment
        ? "improving"
        : lastSentiment < firstSentiment
          ? "declining"
          : "stable";

    const threshold = evaluateThreshold(recent);

    const weekStart = recent[0].created_at.split("T")[0];
    const weekEnd = recent[recent.length - 1].created_at.split("T")[0];

    const summary = await createWeeklySummary({
      user_id: userId,
      week_start: weekStart,
      week_end: weekEnd,
      avg_sentiment: Math.round(avgSentiment * 100) / 100,
      top_tags: topTags,
      summary_text: summaryText,
      trend,
      nudge_triggered: threshold.nudge,
      nudge_reason: threshold.reason,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ summary, threshold });
  } catch (err) {
    console.error("[/api/patterns POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
