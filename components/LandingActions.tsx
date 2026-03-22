"use client";

import Link from "next/link";
import { useMindBridgeUser } from "@/components/MindBridgeUserProvider";

export default function LandingActions() {
  const { isAuthenticated, ready, authFullName, authEmail } =
    useMindBridgeUser();

  if (!ready) {
    return (
      <div className="relative mx-auto mt-10 max-w-xl rounded-2xl bg-brand-200/40 px-6 py-5 text-center text-base text-brand-600/55">
        Loading…
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="relative mx-auto mt-10 flex w-full max-w-xl flex-col gap-4 px-2 sm:px-0">
        <p className="text-center text-sm font-medium text-brand-600/55 md:text-base">
          Account required
        </p>
        <Link
          href="/register"
          className="btn-solid-cocina block rounded-2xl py-3.5 text-center"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="btn-outline-cocina block rounded-2xl py-3.5 text-center"
        >
          Log in
        </Link>
      </div>
    );
  }

  const display = authFullName || authEmail || "there";

  return (
    <div className="relative mx-auto mt-10 w-full max-w-xl space-y-5 px-2 sm:px-0">
      <p className="text-center text-base text-brand-600/80 md:text-lg">
        Welcome back,{" "}
        <strong className="font-semibold text-brand-600">{display}</strong>
      </p>
      <Link
        href="/patterns?judge=1"
        className="btn-outline-cocina block rounded-2xl py-3.5 text-center"
      >
        Judge demo (90s)
      </Link>
      <Link
        href="/check-in"
        className="btn-solid-cocina block rounded-2xl py-3.5 text-center"
      >
        Start my check-in
      </Link>
      <p className="text-center text-sm font-medium text-brand-600/60 md:text-base">
        <Link
          href="/impact"
          className="font-semibold text-accent underline decoration-accent/35 underline-offset-[3px]"
        >
          Impact dashboard
        </Link>
      </p>
    </div>
  );
}
