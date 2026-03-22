/**
 * GET /api/cron/notify
 * Protected by CRON_SECRET. Lists users due for a reminder (production: send push/email).
 */

import { NextRequest, NextResponse } from "next/server";
import { listUsersForCron } from "@/lib/repository";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = Date.now();
  const notified: string[] = [];

  try {
    const users = await listUsersForCron();
    for (const user of users) {
      if (!user.last_checkin_at) continue;

      const lastCheckin = new Date(user.last_checkin_at).getTime();
      const dueAt = lastCheckin + user.frequency_days * 24 * 60 * 60 * 1000;

      if (now >= dueAt) {
        console.log(`[cron] Reminder due for user ${user.id}`);
        notified.push(user.id);
      }
    }
  } catch (e) {
    console.error("[cron]", e);
    return NextResponse.json({ error: "Cron failed" }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    notified: notified.length,
    userIds: notified,
    timestamp: new Date().toISOString(),
  });
}
