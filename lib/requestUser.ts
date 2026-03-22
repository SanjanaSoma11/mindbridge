import { NextRequest } from "next/server";
import { DEMO_USER_ID } from "@/lib/mockData";

const HEADER = "x-mindbridge-user-id";

/**
 * Resolve user id from header (preferred), query, or JSON body.
 * Falls back to demo user only when explicitly allowed (judge storyline).
 */
export function getUserIdFromRequest(
  req: NextRequest,
  bodyUserId?: string | null,
  queryUserId?: string | null
): string {
  const headerId = req.headers.get(HEADER)?.trim();
  if (headerId) return headerId;

  const q = queryUserId ?? req.nextUrl.searchParams.get("userId");
  if (q?.trim()) return q.trim();

  if (bodyUserId?.trim()) return bodyUserId.trim();

  return DEMO_USER_ID;
}

export { HEADER as MIND_BRIDGE_USER_HEADER };
