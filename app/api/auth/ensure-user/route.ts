import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ensureUser } from "@/lib/repository";

/**
 * POST /api/auth/ensure-user
 * Authorization: Bearer <supabase_access_token>
 * Creates the MindBridge `users` row for this auth user id (demo memory or Supabase DB).
 */
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token =
    authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : null;
  if (!token) {
    return NextResponse.json({ error: "Missing bearer token" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !anonKey) {
    return NextResponse.json(
      { error: "Supabase is not configured on the server" },
      { status: 503 }
    );
  }

  const supabase = createClient(url, anonKey);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 });
  }

  const meta = user.user_metadata as { full_name?: string } | undefined;
  const fullName =
    typeof meta?.full_name === "string" && meta.full_name.trim() !== ""
      ? meta.full_name.trim()
      : null;

  try {
    await ensureUser(user.id, 2, { full_name: fullName });
  } catch (e) {
    console.error("[ensure-user]", e);
    return NextResponse.json(
      { error: "Could not create user profile" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    userId: user.id,
    email: user.email ?? null,
  });
}
