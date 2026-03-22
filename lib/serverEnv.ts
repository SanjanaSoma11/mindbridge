/**
 * Server-side runtime flags for health checks and client-safe /api/status.
 */

import { isSupabaseConfigured } from "./supabase";

export type PersistenceMode = "memory" | "supabase";

export function isDemoModePublic(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === "true";
}

export function isGroqConfigured(): boolean {
  return !!process.env.GROQ_API_KEY?.trim();
}

export function isSupabasePersistenceEnabled(): boolean {
  return (
    isSupabaseConfigured() &&
    !!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() &&
    !isDemoModePublic()
  );
}

export function getPersistenceMode(): PersistenceMode {
  return isSupabasePersistenceEnabled() ? "supabase" : "memory";
}

export function getPublicRuntimeStatus() {
  return {
    demoMode: isDemoModePublic(),
    persistence: getPersistenceMode(),
    claude: isGroqConfigured(),
    cronConfigured: !!process.env.CRON_SECRET?.trim(),
    version: "1.0.0-hackathon",
  };
}
