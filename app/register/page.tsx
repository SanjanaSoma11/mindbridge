"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import BrandIcon from "@/components/BrandIcon";
import PageHeader from "@/components/PageHeader";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

function RegisterInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);

    const name = fullName.trim();
    if (name.length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    const sb = getSupabaseBrowserClient();
    if (!sb) return;
    setLoading(true);
    try {
      const { data, error: err } = await sb.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            full_name: name,
          },
        },
      });
      if (err) {
        setError(err.message);
        return;
      }
      if (data.user && !data.session) {
        setInfo(
          "Check your email to confirm your account, then log in here."
        );
        return;
      }
      if (data.session) {
        const next = searchParams.get("redirect");
        const safe =
          next && next.startsWith("/") && !next.startsWith("//")
            ? next
            : "/check-in";
        router.replace(safe);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  const redirectQ = searchParams.get("redirect")
    ? `?redirect=${encodeURIComponent(searchParams.get("redirect")!)}`
    : "";

  return (
    <div className="w-full max-w-lg space-y-10">
      <div className="text-center">
        <div className="flex justify-center" aria-hidden>
          <BrandIcon size="auth" />
        </div>
        <PageHeader
          centered
          title="Create account"
          subtitle="Full name, email, and password — same as most websites."
        />
      </div>

      <form onSubmit={onSubmit} className="surface-card space-y-5 px-2 sm:px-0">
        {info && (
          <p
            className="rounded-lg bg-brand-200/55 px-3 py-2 text-xs text-brand-800"
            role="status"
          >
            {info}
          </p>
        )}
        {error && (
          <p
            className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800"
            role="alert"
          >
            {error}
          </p>
        )}
        <div>
          <label
            htmlFor="reg-full"
            className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-brand-600/70"
          >
            Full name
          </label>
          <input
            id="reg-full"
            type="text"
            autoComplete="name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="input-cocina"
            placeholder="Alex Johnson"
          />
        </div>
        <div>
          <label
            htmlFor="reg-email"
            className="mb-2 block text-xs font-semibold text-brand-600/80"
          >
            Email
          </label>
          <input
            id="reg-email"
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
            htmlFor="reg-pass"
            className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-brand-600/70"
          >
            Password (8+ characters)
          </label>
          <input
            id="reg-pass"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-cocina"
          />
        </div>
        <div>
          <label
            htmlFor="reg-confirm"
            className="mb-2 block text-xs font-semibold text-brand-600/80"
          >
            Confirm password
          </label>
          <input
            id="reg-confirm"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="input-cocina"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-solid-cocina w-full rounded-lg py-3 text-center disabled:opacity-50"
        >
          {loading ? "Creating account…" : "Register"}
        </button>
        <p className="text-center text-xs text-brand-600/60">
          Already have an account?{" "}
          <Link
            href={`/login${redirectQ}`}
            className="font-semibold text-accent underline underline-offset-2"
          >
            Log in
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

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-lg py-12 text-center text-base text-brand-600/60">
          Loading…
        </div>
      }
    >
      <RegisterInner />
    </Suspense>
  );
}
