# MindBridge — what to do before & during judging

## Before the hackathon (you)

1. **Run locally:** `cd mindbridge/mindbridge && npm install && npm run dev`
2. **Optional wow factor:** Add `ANTHROPIC_API_KEY` in `.env.local` for real Claude replies.
3. **Optional production story:** Supabase project + SQL from `lib/supabase.ts` + `SUPABASE_SERVICE_ROLE_KEY` + `NEXT_PUBLIC_DEMO_MODE=false`.
4. **Deploy:** Vercel with the same env vars; set `CRON_SECRET` for cron auth.
5. **Rehearse** the script below out loud twice (time yourself ≤ 3 min).

## 90-second live demo script

1. **Home** — “Private check-ins; **explainable** thresholds, not a black-box chatbot.”
2. Click **Judge demo** → **Patterns** — scroll: 14-day arc, chart, **nudge** → expand **“Why did this nudge appear?”**
3. **Impact** — “Here’s the **Bridge score** and themes — transparency for admins and students.”
4. **Check-in** — one real sentence; show resources strip if tags match.
5. **Settings** — mention **delete all data** + pseudonymous ID.

## If something breaks

- **No API key:** Say “fallback mode is intentional for safety demos” — heuristics still work.
- **Empty patterns:** Use **Judge demo** link (`/patterns?judge=1`) or clear site data and try again.
- **Supabase errors:** Fall back to `NEXT_PUBLIC_DEMO_MODE=true` for the pitch.

## Winning angles (say these words)

- **Preventive** (trends before crisis) · **Explainable** (threshold reasons) · **Student-owned** (delete + no Canvas) · **Measurable** (Impact dashboard)

Good luck 🌉
