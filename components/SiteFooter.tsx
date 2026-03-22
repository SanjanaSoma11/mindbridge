"use client";

import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-brand-600/10 pt-8 pb-8 text-center text-xs text-brand-600/60 md:text-sm">
      <div className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <Link
          href="/privacy"
          className="font-semibold text-brand-600/80 underline-offset-2 hover:text-brand-600 hover:underline"
        >
          Privacy Policy
        </Link>
        <span className="text-brand-600/30" aria-hidden>
          ·
        </span>
        <Link
          href="/privacy#cookies"
          className="font-semibold text-brand-600/80 underline-offset-2 hover:text-brand-600 hover:underline"
        >
          Cookies
        </Link>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-brand-600/45">
        MindBridge is not a substitute for emergency services or a licensed
        clinician.
      </p>
    </footer>
  );
}
