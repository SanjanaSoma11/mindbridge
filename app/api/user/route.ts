import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/requestUser";
import { getUser, updateUser, ensureUser } from "@/lib/repository";

/** GET current user settings */
export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req);
  let user = await getUser(userId);
  if (!user) {
    user = await ensureUser(userId);
  }
  return NextResponse.json({ user });
}

/** PATCH { frequency_days } */
export async function PATCH(req: NextRequest) {
  try {
    const userId = getUserIdFromRequest(req);
    const body = await req.json();
    const days = body.frequency_days;
    if (typeof days !== "number" || days < 1 || days > 7) {
      return NextResponse.json(
        { error: "frequency_days must be 1–7" },
        { status: 400 }
      );
    }
    await ensureUser(userId);
    const updated = await updateUser(userId, { frequency_days: days });
    if (!updated) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user: updated });
  } catch (e) {
    console.error("[PATCH /api/user]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
