import { NextRequest, NextResponse } from "next/server";
import { createNewUser, ensureUser } from "@/lib/repository";
import { DEMO_USER_ID } from "@/lib/mockData";

/**
 * POST /api/user/bootstrap
 * { "mode": "new" | "judge" } — judge returns fixed demo UUID with seeded mock data.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const mode = body.mode === "judge" ? "judge" : "new";

    if (mode === "judge") {
      await ensureUser(DEMO_USER_ID, 2);
      return NextResponse.json({
        userId: DEMO_USER_ID,
        mode: "judge",
        message: "14-day storyline loaded (in-memory demo or seeded DB).",
      });
    }

    const user = await createNewUser(
      typeof body.frequency_days === "number" ? body.frequency_days : 2
    );
    return NextResponse.json({
      userId: user.id,
      mode: "new",
      message: "Fresh session created.",
    });
  } catch (e) {
    console.error("[bootstrap]", e);
    return NextResponse.json(
      { error: "Could not create user" },
      { status: 500 }
    );
  }
}
