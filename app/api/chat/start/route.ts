import { NextRequest, NextResponse } from "next/server";
import { generateInitialGreeting } from "@/lib/claude";
import { getUserIdFromRequest } from "@/lib/requestUser";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const userId = getUserIdFromRequest(req, body.userId);
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const greeting = await generateInitialGreeting(userId);

    return NextResponse.json({
      response: greeting
    });
  } catch (err) {
    console.error("[/api/chat/start]", err);
    return NextResponse.json(
      { error: "Internal server error", response: "Hey — glad you're here. How are you doing today? No right answer, just whatever's on your mind." },
      { status: 500 }
    );
  }
}
