import { NextResponse } from "next/server";
import { getPublicRuntimeStatus } from "@/lib/serverEnv";

/** Safe for the browser — no secrets */
export async function GET() {
  return NextResponse.json(getPublicRuntimeStatus());
}
