import { NextResponse } from "next/server";
import { getPublicRuntimeStatus } from "@/lib/serverEnv";

export async function GET() {
  const status = getPublicRuntimeStatus();
  return NextResponse.json({
    ok: true,
    ...status,
    timestamp: new Date().toISOString(),
  });
}
