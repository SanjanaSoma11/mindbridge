"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import BrandIcon from "@/components/BrandIcon";
import PageHeader from "@/components/PageHeader";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

function LoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const sb = getSupabaseBrowserClient();
    if (!sb) return;
    setLoading(true);
    try {
      const { error: err } = await sb.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (err) {
        setError(err.message);
        return;
      }
      const next = searchParams.get("redirect");
      const safe =
        next && next.startsWith("/") && !next.startsWith("//")
          ? next
          : "/check-in";
      router.replace(safe);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-lg space-y-10">
      <div className="text-center">
        <div className="flex justify-center" aria-hidden>
          <BrandIcon size="auth" />
        </div>
        <PageHeader
          centered
          title="Log in"
          subtitle="Use the email and password you registered with."
        />
      </div>

      <form onSubmit={onSubmit} className="surface-card space-y-5 px-2 sm:px-0">
        {error && (
          <p
            className="rounded-lg bg-rose-100/50 px-3 py-2 text-xs text-rose-800"
            role="alert"
          >
            {error}
          </p>
        )}
        <div>
          <label
            htmlFor="login-email"
            className="mb-2 block text-xs font-semibold text-brand-600/80"
          >
            Email
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-cocina"
          />
        </div>
        <div>
          <label
            htmlFor="login-password"
            className="mb-2 block text-xs font-semibold text-brand-600/80"
          >
            Password
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-cocina"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-solid-cocina w-full rounded-lg py-3 text-center disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Log in"}
        </button>
        <p className="text-center text-xs text-brand-600/60">
          No account?{" "}
          <Link
            href={`/register${searchParams.get("redirect") ? `?redirect=${encodeURIComponent(searchParams.get("redirect")!)}` : ""}`}
            className="font-semibold text-accent underline underline-offset-2"
          >
            Create one
          </Link>
        </p>
        <p className="text-center text-[10px] text-brand-600/45">
          <Link href="/" className="underline underline-offset-2">
            ← Back to home
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-lg py-12 text-center text-base text-brand-600/60">
          Loading…
        </div>
      }
    >
      <LoginInner />
    </Suspense>
  );
}
