/**
 * POST /api/canvas/context
 * Body: { assignments: CanvasAssignmentInput[] }
 * Returns workload analysis + string to pass as workloadContext to /api/chat
 */

import { NextRequest, NextResponse } from "next/server";
import type { CanvasAssignmentInput } from "@/lib/canvasTypes";
import { analyzeWorkload } from "@/lib/workloadStress";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const raw = body.assignments;
    if (!Array.isArray(raw)) {
      return NextResponse.json(
        { error: "assignments array required" },
        { status: 400 }
      );
    }

    const assignments = raw as CanvasAssignmentInput[];
    const analysis = analyzeWorkload(assignments);

    return NextResponse.json({
      analysis,
      workloadContext: analysis.contextForAI,
    });
  } catch (e) {
    console.error("[/api/canvas/context]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
