/**
 * GET /api/cron/notify
 * Protected by CRON_SECRET. Lists users due for a reminder (production: send push/email).
 */

import { NextRequest, NextResponse } from "next/server";
import { listUsersForCron, updateUser } from "@/lib/repository";

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
      const lastNudge = user.nudge_shown_at ? new Date(user.nudge_shown_at).getTime() : 0;
      
      const lastActivity = Math.max(lastCheckin, lastNudge);
      const dueAt = lastActivity + user.frequency_days * 24 * 60 * 60 * 1000;

      if (now >= dueAt) {
        console.log(`[cron] Reminder due for user ${user.id}`);
        // In a real app, send actual push/email here
        notified.push(user.id);
        
        // Update nudge_shown_at right away to prevent spamming on subsequent cron runs
        await updateUser(user.id, { nudge_shown_at: new Date().toISOString() }).catch(e => {
          console.error(`[cron] Failed to update nudge_shown_at for user ${user.id}`, e);
        });
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
