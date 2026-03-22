import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import LandingActions from "@/components/LandingActions";
import { whyMindBridgeIsDifferent } from "@/lib/thresholdExplain";

const STEPS = [
  {
    icon: "💬",
    title: "Check in",
    description:
      "Write how you're feeling in your own words — no rigid forms. Empathetic reflection + structured signals for your patterns.",
  },
  {
    icon: "📈",
    title: "See your patterns",
    description:
      "Mood over time, recurring themes, weekly summary — and explainable thresholds when extra support might help.",
  },
  {
    icon: "🌱",
    title: "Nudge & follow-up",
    description:
      "Gentle, optional nudges toward vetted resources — plus a 2-week check-in so support isn't a one-off moment.",
  },
];

const PRINCIPLES = [
  {
    icon: "🔒",
    text: "Check-ins aren’t graded or sent to instructors; Canvas can optionally share due dates only for gentler support",
  },
  { icon: "🗑️", text: "Delete everything, anytime, with one button" },
  { icon: "🎛️", text: "You control how often you're reminded" },
  { icon: "🌡️", text: "We're a thermometer, not medicine — not diagnosis or therapy" },
];

export default function LandingPage() {
  const pillars = whyMindBridgeIsDifferent();

  return (
    <div className="space-y-0">
      <section className="surface-card relative overflow-hidden pb-12 pt-6 text-center md:pb-16 md:pt-10">
        <div className="relative mb-6 flex justify-center md:mb-8" aria-hidden>
          <BrandIcon size="hero" />
        </div>
        <h1 className="font-display text-display-sm font-medium tracking-tight text-brand-600 md:text-display-md">
          MindBridge
        </h1>
        <p className="mx-auto mt-4 max-w-4xl text-lg font-medium leading-relaxed text-brand-600/85 md:mt-5 md:text-xl">
          Private student check-ins · Trend-aware support · Explainable nudges
        </p>
        <p className="prose-calm mx-auto mt-6 max-w-4xl text-balance md:mt-8">
          A calm companion for how you&apos;re really doing — built for demos, Canvas embeds, and your wellbeing team.
        </p>
        <LandingActions />
      </section>

      <section className="section-divider surface-card space-y-6">
        <div className="text-left">
          <p className="section-eyebrow">For schools &amp; teams</p>
          <h2 className="font-display mt-2 text-xl font-semibold tracking-tight text-brand-600 md:text-2xl">
            Canvas-ready embed
          </h2>
        </div>
        <p className="prose-calm max-w-5xl text-left">
          Add MindBridge as an <strong className="font-semibold text-brand-600">LTI / external tool</strong> so students always have support beside coursework.
          Due dates can shape tone — <strong className="font-semibold text-brand-600">never</strong> journal text to teachers.{" "}
          <a
            href="/docs/CANVAS_INTEGRATION.md"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent underline decoration-accent/40 underline-offset-[3px] transition-opacity hover:opacity-90"
          >
            Canvas setup guide for your school →
          </a>{" "}
          <a
            href="/demo/canvas"
            className="ml-1 font-semibold text-brand-600 underline decoration-brand-600/30 underline-offset-[3px] transition-opacity hover:opacity-90"
          >
            See a full-screen Canvas-style demo →
          </a>
        </p>
        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
          <Link href="/embed" className="btn-solid-cocina inline-flex rounded-xl normal-case">
            Open embed preview
          </Link>
          <a
            href="/docs/CANVAS_INTEGRATION.md"
            className="text-center text-base font-semibold text-brand-600/80 underline decoration-brand-600/25 underline-offset-[3px] sm:text-left"
          >
            Integration doc (IT)
          </a>
        </div>
      </section>

      <section className="section-divider space-y-8">
        <div className="text-left">
          <p className="section-eyebrow">Product principles</p>
          <h2 className="font-display mt-2 text-xl font-semibold tracking-tight text-brand-600 md:text-2xl">
            Why it&apos;s different
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="surface-card border-l-2 border-brand-600/15 pl-6 text-left">
              <h3 className="font-display text-lg font-semibold tracking-tight text-brand-600 md:text-xl">
                {p.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-brand-600/75 md:text-lg">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-divider space-y-8">
        <div className="text-left">
          <p className="section-eyebrow">Journey</p>
          <h2 className="font-display mt-2 text-xl font-semibold tracking-tight text-brand-600 md:text-2xl">
            How it works
          </h2>
        </div>
        <ol className="space-y-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:border-0 lg:pt-0">
          {STEPS.map((step, i) => (
            <li
              key={i}
              className="surface-card flex gap-6 border-b border-brand-600/10 py-8 first:pt-0 last:border-b-0 last:pb-0 lg:flex-col lg:border-0 lg:py-0"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-200/50 text-2xl" aria-hidden>
                {step.icon}
              </div>
              <div className="min-w-0 pt-0.5">
                <h3 className="font-display text-lg font-semibold tracking-tight text-brand-600 md:text-xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-brand-600/80 md:text-lg">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section-divider surface-card space-y-6">
        <div className="text-left">
          <p className="section-eyebrow">Trust</p>
          <h2 className="font-display mt-2 text-xl font-semibold tracking-tight text-brand-600 md:text-2xl">
            Your privacy, always
          </h2>
        </div>
        <ul className="m-0 list-none space-y-5 p-0 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-5 md:space-y-0">
          {PRINCIPLES.map((p, i) => (
            <li key={i} className="flex gap-4 text-left text-base leading-relaxed text-brand-600/85 md:text-lg">
              <span className="mt-0.5 text-lg leading-none" aria-hidden>
                {p.icon}
              </span>
              <span>{p.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-divider pb-8 text-center">
        <p className="text-sm font-medium text-brand-600/55 md:text-base">
          If you&apos;re in crisis right now, please reach out immediately.
        </p>
        <a
          href="https://988lifeline.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-base font-semibold text-rose-700 underline decoration-rose-300/60 underline-offset-[3px] transition-colors hover:text-rose-800 md:text-lg"
        >
          988 Lifeline — call, text, or chat (24/7)
        </a>
      </section>
    </div>
  );
}
