"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "mindbridge_cookie_ack_v1";

export default function CookieBanner() {
  const pathname = usePathname() ?? "";
  const [visible, setVisible] = useState(false);

  const hideOnRoute =
    pathname.startsWith("/embed") || pathname.startsWith("/demo/canvas");

  useEffect(() => {
    if (hideOnRoute) return;
    try {
      if (typeof window !== "undefined" && !localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, [hideOnRoute]);

  function acknowledge() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible || hideOnRoute) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-brand-600/15 bg-brand-100/98 px-4 py-4 shadow-[0_-4px_24px_rgba(42,61,50,0.08)] backdrop-blur-md md:bottom-6 md:left-auto md:right-6 md:max-w-lg md:rounded-2xl md:border md:py-4"
    >
      <p
        id="cookie-banner-title"
        className="text-sm font-semibold text-brand-600"
      >
        Privacy &amp; cookies
      </p>
      <p className="mt-2 text-xs leading-relaxed text-brand-600/85">
        MindBridge uses essential storage and cookies (for example through your
        browser) so you can sign in and stay secure. We do not use
        third‑party advertising cookies in the default product. For details on
        data use, read our{" "}
        <Link
          href="/privacy"
          className="font-semibold text-accent underline underline-offset-2"
        >
          Privacy Policy
        </Link>
        , including how check-ins and AI features work.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={acknowledge}
          className="btn-solid-cocina rounded-xl px-5 py-2.5 text-sm"
        >
          OK
        </button>
        <Link
          href="/privacy#cookies"
          className="text-xs font-semibold text-brand-600/80 underline underline-offset-2"
        >
          Cookie details
        </Link>
      </div>
    </div>
  );
}
