# MindBridge × Canvas — integration guide for your school

MindBridge is built so **check-in journal text never goes to the gradebook or instructors**.  
Canvas can optionally supply **assignment due dates / workload** so the companion can be **gentler when students are under time pressure**—using **titles and dates only**, not grades.

---

## What you need (roles)

| Who | What they do |
|-----|----------------|
| **You (champion)** | Get IT approval, pilot course, communicate privacy to students. |
| **Canvas admin** | Creates the **LTI 1.3** developer key, adds the **external tool**, sets placements. |
| **Hosting (you or IT)** | Deploy MindBridge (e.g. Vercel) with env vars; provide **HTTPS** URL. |
| **Optional: integrations team** | If your school wants automatic workload sync, they wire **Canvas API** or **postMessage** (below). |

---

## Step 1 — Deploy MindBridge

1. Deploy the Next.js app to a host with **HTTPS** (required for LTI).
2. Set environment variables (see project `README.md` / `.env.local.example`): e.g. `ANTHROPIC_API_KEY`, optional Supabase, demo flags.
3. Confirm the app loads and **`/embed`** works in a normal browser tab.

**Base URL example:** `https://mindbridge.yourschool.edu`  
**Tool / iframe URL:** `https://mindbridge.yourschool.edu/embed`

---

## Step 2 — Register LTI 1.3 in Canvas (admin)

Exact clicks vary by Canvas version; your admin should:

1. Go to **Admin → Developer Keys → + Developer Key → LTI Key** (or **+ LTI Key**).
2. Choose **LTI 1.3**.
3. Set fields similar to:
   - **Target link URI / Launch URL:** `https://your-host/embed`  
   - **Open in:** New tab *or* iframe (iframe is typical for course navigation).
   - **OIDC Login Initiation URL, JWK URL, OAuth2 redirect URIs:** follow your host’s LTI provider docs if you add full LTI later.  
     *If you only add MindBridge as a simple **External URL** tool (no grade passback), some schools start with **Redirect / External App** pointing to `/embed` while IT completes LTI 1.3.*
4. **Placements:** enable at least one of:
   - **Course Navigation** (student-visible tab), or  
   - **Assignment Selection** / **Link Selection** if you only want it in specific modules.
5. **Save** and turn the key **ON** for the right account.
6. In a **course**: **Settings → Apps → + App → By Client ID** (paste the client ID from the developer key) *or* configure **External Tool** with the launch URL.

**Privacy note for the syllabus:**  
> MindBridge is a private check-in space. What you type is not submitted as coursework and is not sent to instructors. Optional workload features may use assignment **due dates** only to adjust tone—not your journal text.

---

## Step 3 — iframe & security (already in this repo)

`next.config.mjs` sets **`Content-Security-Policy: frame-ancestors`** for `/embed` so Canvas (Instructure) can embed the page.

- If your Canvas uses a **custom domain** (e.g. `canvas.yourschool.edu`), ensure it is allowed in `frame-ancestors` or use a pattern your security team approves.
- After changing CSP, **redeploy** and test in Canvas **Student View**.

---

## Step 4 — Workload awareness (optional)

Two supported patterns:

### A) `postMessage` from a page you host (simplest for pilots)

If you can host a **small bridge page on the school domain** that already has access to Canvas context, it loads the MindBridge iframe and sends:

```js
iframe.contentWindow.postMessage(
  {
    type: "MINDBRIDGE_CANVAS_ASSIGNMENTS",
    assignments: [
      { name: "Essay", due_at: "2026-03-25T23:59:00Z", course_name: "ENG 101" },
    ],
  },
  "https://your-mindbridge-host"
);
```

The embed listens and refreshes workload analysis. It also posts `{ type: "MINDBRIDGE_REQUEST_ASSIGNMENTS" }` to the parent so your bridge can respond.

### B) Server API (demo / single-token setups)

- **POST** assignment JSON to **`/api/canvas/context`** and pass the returned `workloadContext` into **`/api/chat`** when chatting, **or**
- **GET** **`/api/canvas/assignments`** with header **`x-mindbridge-canvas-secret`** (see `.env.local.example`) — **server-only**, not for browsers.

Production schools usually replace this with an **LTI launch claim** or **institution-approved** Canvas API token.

---

## Step 5 — Test before go-live

- [ ] Open the tool as a **student** in Canvas (use **Student View**).
- [ ] Complete a check-in; confirm nothing appears in **Grades**.
- [ ] Open **Settings → Delete data** in the full app (linked from Patterns/Resources as applicable).
- [ ] If using iframe, confirm no **CSP** or **mixed content** errors in the browser console.
- [ ] Share **988** / **Crisis Text Line** resources from your syllabus or course home.

---

## Support & scope

MindBridge is **not** therapy, diagnosis, or a medical device.  
**US crisis:** [988](https://988lifeline.org/) · [Crisis Text Line](https://www.crisistextline.org/)

For technical questions about this codebase, see the project **README** and `/api` routes.
