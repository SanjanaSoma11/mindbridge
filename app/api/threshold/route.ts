/**
 * POST /api/threshold
 * Evaluates the 3-condition threshold for a given user.
 */

import { NextRequest, NextResponse } from "next/server";
import { getCheckins } from "@/lib/repository";
import { evaluateThreshold } from "@/lib/threshold";
import { getUserIdFromRequest } from "@/lib/requestUser";
import { explainThresholdReasons } from "@/lib/thresholdExplain";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = getUserIdFromRequest(req, body.userId);
    const windowDays = typeof body.windowDays === "number" ? body.windowDays : 14;

    const all = await getCheckins(userId);
    const cutoff = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000);
    const recent = all.filter(
      (c) => new Date(c.created_at).getTime() >= cutoff.getTime()
    );

    const result = evaluateThreshold(recent);
    const explain = explainThresholdReasons(result.reason);

    return NextResponse.json({ ...result, explain });
  } catch (err) {
    console.error("[/api/threshold]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
