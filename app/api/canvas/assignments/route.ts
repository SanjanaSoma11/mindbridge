/**
 * GET /api/canvas/assignments
 * Server-side Canvas pull when CANVAS_API_TOKEN + CANVAS_BASE_URL are set.
 * Intended for LTI / backend use — token must never ship to the browser.
 *
 * Query: optional course_ids=comma-separated (limits scope)
 */

import { NextRequest, NextResponse } from "next/server";
import type { CanvasAssignmentInput } from "@/lib/canvasTypes";
import { analyzeWorkload } from "@/lib/workloadStress";

async function fetchCanvasJson(
  path: string,
  token: string
): Promise<unknown[]> {
  const base = process.env.CANVAS_BASE_URL!.replace(/\/$/, "");
  const url = `${base}/api/v1${path}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Canvas ${res.status}: ${text.slice(0, 200)}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-mindbridge-canvas-secret");
  if (
    !process.env.CANVAS_SYNC_SECRET ||
    secret !== process.env.CANVAS_SYNC_SECRET
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.CANVAS_API_TOKEN?.trim();
  const baseUrl = process.env.CANVAS_BASE_URL?.trim();
  if (!token || !baseUrl) {
    return NextResponse.json(
      {
        error: "Canvas not configured",
        hint: "Set CANVAS_BASE_URL and CANVAS_API_TOKEN on the server (LTI worker).",
      },
      { status: 503 }
    );
  }

  try {
    // Planner-style upcoming assignments (Canvas exposes this for the current user as token user)
    const planner = await fetchCanvasJson(
      "/planner/items?per_page=100",
      token
    );

    const assignments: CanvasAssignmentInput[] = planner
      .filter(
        (row: unknown) =>
          typeof row === "object" &&
          row !== null &&
          (row as { plannable_type?: string }).plannable_type ===
            "assignment"
      )
      .map((row: unknown) => {
        const r = row as {
          plannable?: {
            id?: string | number;
            title?: string;
            name?: string;
            due_at?: string | null;
            points_possible?: number;
            html_url?: string;
          };
          context_name?: string;
          plannable_date?: string | null;
        };
        const p = r.plannable;
        return {
          id: p?.id != null ? String(p.id) : undefined,
          name: p?.title ?? p?.name ?? "Assignment",
          due_at: p?.due_at ?? r.plannable_date ?? null,
          course_name: r.context_name,
          points_possible: p?.points_possible,
          html_url: p?.html_url,
        };
      });

    const analysis = analyzeWorkload(assignments);

    return NextResponse.json({
      assignments,
      analysis,
      workloadContext: analysis.contextForAI,
    });
  } catch (e) {
    console.error("[canvas/assignments]", e);
    return NextResponse.json(
      {
        error: "Canvas fetch failed",
        message: e instanceof Error ? e.message : "unknown",
      },
      { status: 502 }
    );
  }
}
