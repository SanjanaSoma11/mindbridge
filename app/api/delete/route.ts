/**
 * DELETE /api/delete
 * Permanently deletes all data for a user.
 */

import { NextRequest, NextResponse } from "next/server";
import { deleteAllUserData } from "@/lib/repository";
import { getUserIdFromRequest } from "@/lib/requestUser";

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const userId = getUserIdFromRequest(req, body.userId);

    await deleteAllUserData(userId);

    return NextResponse.json({
      ok: true,
      message: "All data deleted. Nothing is retained.",
    });
  } catch (err) {
    console.error("[/api/delete]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
