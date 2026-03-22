/**
 * GET  /api/checkins?userId=...   — list check-ins for a user
 * POST /api/checkins               — create a check-in directly (CRUD, not AI)
 */

import { NextRequest, NextResponse } from "next/server";
import { getCheckins, createCheckin, ensureUser } from "@/lib/repository";
import { getUserIdFromRequest } from "@/lib/requestUser";

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req);
  const checkins = await getCheckins(userId);
  return NextResponse.json({ checkins });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId: bodyUserId,
      user_text,
      ai_response = null,
      sentiment_score = 3,
      tags = [],
      crisis_flag = false,
    } = body;

    if (!user_text) {
      return NextResponse.json({ error: "user_text is required" }, { status: 400 });
    }

    const userId = getUserIdFromRequest(req, bodyUserId);

    await ensureUser(userId);

    const checkin = await createCheckin({
      user_id: userId,
      created_at: new Date().toISOString(),
      user_text,
      ai_response,
      sentiment_score,
      tags,
      crisis_flag,
    });

    return NextResponse.json({ checkin }, { status: 201 });
  } catch (err) {
    console.error("[/api/checkins POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
