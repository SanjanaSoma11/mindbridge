# Google Calendar demo (instead of school Canvas)

MindBridge’s **Canvas path** reads assignment due dates and turns them into a **workload signal** for the check-in. If you don’t have a school Canvas account, you can use **your own Google Calendar** for a judge demo: add a few timed events in the next week, then load them into the embed.

## What gets wired

1. Server calls **Google Calendar API** (`events.list`) for upcoming events.
2. Events are mapped to the same `CanvasAssignmentInput` shape as assignments.
3. Existing `/api/canvas/context` logic (`analyzeWorkload`) produces the same **headline + AI context** as Canvas.

## One-time Google Cloud setup

1. Open [Google Cloud Console](https://console.cloud.google.com/) → create or pick a project.
2. **APIs & Services → Library** → enable **Google Calendar API**.
3. **APIs & Services → Credentials → Create credentials → OAuth client ID**.
   - Application type: **Web application**.
   - Authorized redirect URIs: add `https://developers.google.com/oauthplayground` if you use OAuth Playground below (or your own redirect for a custom script).
4. Note **Client ID** and **Client Secret**.

## Get a refresh token (demo account)

Use [OAuth 2.0 Playground](https://developers.google.com/oauthplayground):

1. Click the gear icon → check **Use your own OAuth credentials** → paste Client ID / Secret.
2. In the left list, find **Google Calendar API v3** → select scope  
   `https://www.googleapis.com/auth/calendar.readonly`
3. **Authorize APIs** → sign in with the Google account whose calendar you want to demo.
4. **Exchange authorization code for tokens** → copy the **Refresh token**.

## MindBridge `.env.local`

Add:

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REFRESH_TOKEN=the-refresh-token-from-playground
# Optional — default is your primary calendar
# GOOGLE_CALENDAR_ID=primary
```

Restart `npm run dev`.

## Judge demo flow

1. In **Google Calendar**, add several events with start/end times in the **next 7–14 days** (like fake “assignments”).
2. Open **`/embed`** (or the Canvas mock at **`/demo/canvas`** with the iframe).
3. Click **Load Google Calendar (demo)**.
4. You should see the workload strip and a check-in welcome that references a busy schedule — same behavior as Canvas-backed due dates.
5. When the workload rules flag a **busy stretch** (`suggestProactiveCheckin` in code), a **modal pops up** on top of the embed (“A lot is coming due”) so judges can see proactive outreach without hunting for it. Use **Simulate busy week** or a heavy calendar week to trigger it; **Not now** dismisses until the workload snapshot changes.

## Security note

The refresh token in `.env` is tied to **one** Google account and is **server-side only**. For production you’d use per-user OAuth and encrypted token storage; this setup is for **local / hackathon demos** only.
