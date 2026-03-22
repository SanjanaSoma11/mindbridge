# Dev server never shows “Ready” / browser spins forever (Windows)

## What we changed in this repo

- **`npm run dev` uses Turbopack (`--turbo`) by default** — on **OneDrive**, webpack dev often **never prints “Ready”** and stays on **“Starting…”** forever. Turbopack usually works.
- Polling env vars are still set for tools that respect them.
- **Google Fonts** load via a normal `<link>` in the layout (not `next/font/google`).
- **`next.config.mjs`** webpack `watchOptions.poll` applies to **`npm run dev:webpack`** only (not Turbopack).

## Most common cause: **OneDrive / Desktop**

If the project is under `...\OneDrive\...`, **webpack** file watching + first compile often **stalls** after **“Starting…”**.

### Fix A — You’re already on the default: `npm run dev` (Turbopack)

If you changed scripts or use an old clone, run:

```powershell
npm run dev
```

### Fix B — OneDrive helper script (Turbopack + polling)

```powershell
.\scripts\dev-onedrive.ps1
```

### Fix B2 — Force webpack (only if you need it and Turbopack breaks)

```powershell
npm run dev:webpack
```

### Fix C — Move the project off OneDrive

Copy the whole `MindBridge` folder to e.g. `C:\dev\MindBridge`, then:

```powershell
cd C:\dev\MindBridge\mindbridge\mindbridge
npm install
npm run dev
```

### Fix D — Use production mode (no file watcher)

```powershell
npm run build
npm run start
```

Open **http://localhost:3000**. If this works but `npm run dev` does not, it confirms a **watcher / OneDrive** issue.

### Other checks

1. **Close** other terminals using the same folder; **pause OneDrive** sync for a few minutes.
2. **Delete** `.next` and retry: `Remove-Item -Recurse -Force .next`
3. **Port in use:** `netstat -ano | findstr :3000` — kill the process or use `npx next dev -p 3001` and open port **3001**.
4. Try **http://127.0.0.1:3000** and **http://localhost:3000** (some setups differ).

### Still stuck?

Copy the **full terminal output** from `npm run dev` (from the first line until it stops) — look for `Error`, `EADDRINUSE`, or `EPERM`.
