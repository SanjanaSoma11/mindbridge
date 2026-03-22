"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  getSupabaseBrowserClient,
  isBrowserSupabaseConfigured,
} from "@/lib/supabase/browser-client";
import PageHeader from "@/components/PageHeader";
import { useMindBridgeUser } from "@/components/MindBridgeUserProvider";

function isPublicPath(pathname: string): boolean {
  if (pathname === "/") return true;
  if (pathname === "/login" || pathname.startsWith("/login/")) return true;
  if (pathname === "/register" || pathname.startsWith("/register/")) return true;
  if (pathname === "/privacy" || pathname.startsWith("/privacy/")) return true;
  if (pathname.startsWith("/demo/canvas")) return true;
  return false;
}

function SupabaseRequired() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-100 px-6 text-center">
      <div className="surface-card max-w-lg space-y-4 p-8">
        <PageHeader title="Supabase required" />
        <p className="text-base leading-relaxed text-brand-600/80">
          MindBridge uses <strong>mandatory accounts</strong> (email + password).
          Set{" "}
          <code className="rounded bg-brand-200/50 px-1.5 text-sm">
            NEXT_PUBLIC_SUPABASE_URL
          </code>{" "}
          and{" "}
          <code className="rounded bg-brand-200/50 px-1.5 text-sm">
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </code>{" "}
          in <code className="text-sm">.env.local</code>, enable{" "}
          <strong>Email</strong> auth in the Supabase dashboard, then restart the
          dev server.
        </p>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-sm text-brand-600/60">
      Loading…
    </div>
  );
}

export function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ready, userId, isAuthenticated } = useMindBridgeUser();

  const configured = isBrowserSupabaseConfigured();

  useEffect(() => {
    if (!ready || !configured) return;

    const onLoginOrRegister =
      pathname === "/login" || pathname === "/register";

    if (isAuthenticated && onLoginOrRegister) {
      const next = searchParams.get("redirect");
      const safe =
        next && next.startsWith("/") && !next.startsWith("//")
          ? next
          : "/check-in";
      router.replace(safe);
    }
  }, [ready, configured, isAuthenticated, pathname, router, searchParams]);

  useEffect(() => {
    if (!ready || !configured) return;
    if (isPublicPath(pathname)) return;
    if (isAuthenticated) return;

    const q = `?redirect=${encodeURIComponent(pathname || "/check-in")}`;
    router.replace(`/login${q}`);
  }, [ready, configured, pathname, isAuthenticated, router]);

  if (!configured) {
    return <SupabaseRequired />;
  }

  if (!ready) {
    return <LoadingScreen />;
  }

  if (!isPublicPath(pathname) && !isAuthenticated) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
