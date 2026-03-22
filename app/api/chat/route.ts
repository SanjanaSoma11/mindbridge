/**
 * POST /api/chat
 * Accepts a user message + conversation history, returns an AI response
 * and saves the check-in entry to the store.
 */

import { NextRequest, NextResponse } from "next/server";
import { processCheckin } from "@/lib/claude";
import { ensureUser, createCheckin, updateUser } from "@/lib/repository";
import { getUserIdFromRequest } from "@/lib/requestUser";
import { ChatMessage } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      message,
      userId: bodyUserId,
      sessionId,
      history = [] as ChatMessage[],
      /** Optional: from /api/canvas/context — workload only, not grades */
      workloadContext,
    } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }

    const userId = getUserIdFromRequest(req, bodyUserId);

    const extraction = await processCheckin(message, history, {
      workloadContext:
        typeof workloadContext === "string" ? workloadContext : undefined,
    });

    await ensureUser(userId);

    const checkin = await createCheckin({
      user_id: userId,
      session_id:
        typeof sessionId === "string" && sessionId.trim()
          ? sessionId.trim()
          : null,
      created_at: new Date().toISOString(),
      user_text: message,
      ai_response: extraction.ai_response,
      sentiment_score: extraction.sentiment_score,
      tags: extraction.tags,
      crisis_flag: extraction.crisis_flag,
    });

    await updateUser(userId, { last_checkin_at: new Date().toISOString() });

    return NextResponse.json({
      response: extraction.ai_response,
      checkin,
      crisis: extraction.crisis_flag,
    });
  } catch (err) {
    console.error("[/api/chat]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
