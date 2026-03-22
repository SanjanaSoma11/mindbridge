"use client";

import { Suspense } from "react";
import AppShell from "@/components/AppShell";
import CookieBanner from "@/components/CookieBanner";
import { AuthGate } from "@/components/AuthGate";
import { MindBridgeUserProvider } from "@/components/MindBridgeUserProvider";

function ShellFallback({ children }: { children: React.ReactNode }) {
  return (
    <main className="page-shell min-h-screen bg-brand-100 text-brand-600">
      {children}
    </main>
  );
}

export function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <MindBridgeUserProvider>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-brand-100 text-sm text-brand-600/60">
            Loading…
          </div>
        }
      >
        <AuthGate>
          <Suspense fallback={<ShellFallback>{children}</ShellFallback>}>
            <AppShell>{children}</AppShell>
          </Suspense>
          <CookieBanner />
        </AuthGate>
      </Suspense>
    </MindBridgeUserProvider>
  );
}
