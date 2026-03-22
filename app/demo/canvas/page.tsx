import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MindBridge × Canvas — visual demo",
  description:
    "Mock Canvas shell showing how MindBridge appears when your school adds it as an LTI / external tool.",
  robots: { index: false, follow: false },
};

/**
 * Static visual mock only — does not call Canvas APIs.
 * Embeds the real /embed route so you see your actual product UI.
 */
export default function CanvasIntegrationDemoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#2d2d2d] text-neutral-200">
      <a
        href="#embed-panel"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-brand-600"
      >
        Skip to MindBridge embed
      </a>

      {/* Top notice */}
      <div className="border-b border-white/10 bg-[#1a1a1a] px-4 py-2 text-center text-[11px] text-white/70">
        <strong className="text-white/90">Demo preview</strong> — This page imitates
        Canvas layout. It is <strong>not</strong> your real school Canvas. The green
        panel is your live <code className="rounded bg-white/10 px-1">/embed</code>{" "}
        route in an iframe.
        <a
          href="/"
          className="ml-2 underline decoration-white/40 underline-offset-2 hover:text-white"
        >
          ← Back to MindBridge home
        </a>
      </div>

      <div className="flex min-h-0 min-h-[calc(100vh-2.5rem)] flex-1">
        {/* Canvas-style global navigation (decorative) */}
        <aside
          className="flex w-[52px] shrink-0 flex-col items-center gap-5 border-r border-black/30 py-4 md:w-[60px]"
          aria-hidden
        >
          <div className="flex h-9 w-9 items-center justify-center rounded bg-[#8c1d40] text-[10px] font-bold text-white">
            ASU
          </div>
          <DemoNavIcon label="Account" />
          <DemoNavIcon label="Dash" active />
          <DemoNavIcon label="Courses" />
          <DemoNavIcon label="Groups" />
          <DemoNavIcon label="Calendar" />
          <DemoNavIcon label="Inbox" dot />
          <DemoNavIcon label="History" />
          <DemoNavIcon label="Help" dot />
        </aside>

        {/* Main Canvas-like content */}
        <div className="flex min-w-0 flex-1 flex-col bg-white text-neutral-900">
          {/* Fake Canvas header */}
          <header className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 px-4 py-3 md:px-6">
            <h1 className="text-xl font-semibold text-neutral-900 md:text-2xl">
              Dashboard
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
              <span className="rounded border border-neutral-200 px-2 py-1">
                Today
              </span>
              <span className="rounded border border-neutral-200 px-2 py-1">＋</span>
              <span className="relative rounded border border-neutral-200 px-2 py-1">
                🔔
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#8c1d40] text-[9px] font-bold text-white">
                  12
                </span>
              </span>
            </div>
          </header>

          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            {/* Planner-style column (decorative) */}
            <div className="min-h-[200px] flex-1 overflow-y-auto border-b border-neutral-200 p-4 md:p-6 lg:border-b-0 lg:border-r">
              <p className="text-sm font-medium text-neutral-400">Monday, Mar 23</p>
              <p className="mt-1 text-sm text-neutral-500">Nothing planned yet.</p>

              <p className="mt-6 text-sm font-medium text-neutral-400">
                Tuesday, Mar 24
              </p>
              <div className="mt-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-sm">
                <p className="font-semibold text-neutral-800">
                  CAPSTONE II IN PERSON (2026 SPRING C)
                </p>
                <p className="mt-1 text-neutral-700">
                  Module 5: Sprint 9 Stand Up Meeting
                </p>
                <p className="mt-2 text-xs text-neutral-500">
                  100 PTS · Due 11:59 PM
                </p>
              </div>

              <p className="mt-6 text-sm font-medium text-neutral-400">
                Wed – Sun, Mar 25–30
              </p>
              <div className="mt-2 flex h-32 items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-neutral-50 text-sm text-neutral-400">
                Nothing planned yet
              </div>

              <div className="mt-8 rounded-lg border border-accent/25 bg-accent-muted/80 p-4 text-sm text-brand-800">
                <p className="font-semibold text-accent">How MindBridge fits here</p>
                <p className="mt-2 leading-relaxed text-brand-800/90">
                  Your school adds MindBridge as an{" "}
                  <strong>LTI / external tool</strong>. It usually appears as a{" "}
                  <strong>course navigation link</strong> (e.g. “MindBridge”) — not as a
                  new icon in this global bar unless the admin configures that. Students
                  open it from the <strong>course menu</strong>; the panel on the right
                  is what they see inside the tool.
                </p>
              </div>
            </div>

            {/* Embedded product */}
            <section
              id="embed-panel"
              className="flex w-full shrink-0 flex-col bg-[#eef7f1] lg:w-[min(420px,100%)] xl:w-[min(440px,42%)]"
              aria-label="MindBridge embed preview"
            >
              <div className="border-b border-brand-200 bg-white/90 px-3 py-2">
                <p className="text-[10px] font-bold uppercase tracking-wide text-brand-800">
                  External tool · MindBridge
                </p>
                <p className="text-[10px] text-brand-800/60">
                  iframe → <code className="rounded bg-brand-100 px-1">/embed</code>
                </p>
              </div>
              <div className="relative min-h-[520px] flex-1 p-2 md:p-3">
                <iframe
                  title="MindBridge embedded check-in (same app as production embed)"
                  src="/embed"
                  className="h-[min(560px,calc(100vh-12rem))] w-full rounded-xl border border-brand-200 bg-white shadow-card md:h-[min(600px,calc(100vh-10rem))]"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoNavIcon({
  label,
  active,
  dot,
}: {
  label: string;
  active?: boolean;
  dot?: boolean;
}) {
  return (
    <div
      className={`relative flex h-9 w-9 items-center justify-center rounded text-[9px] font-medium ${
        active ? "bg-white/15 text-white" : "text-white/50"
      }`}
      title={label}
    >
      {label.slice(0, 1)}
      {dot && (
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500" />
      )}
    </div>
  );
}
