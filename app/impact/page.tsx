"use client";

import { useEffect, useState } from "react";
import { useMindBridgeUser } from "@/hooks/useMindBridgeUser";
import ImpactDashboard from "@/components/ImpactDashboard";
import PageHeader from "@/components/PageHeader";
import JudgeTourBanner from "@/components/JudgeTourBanner";
import type { ImpactMetrics } from "@/lib/impactMetrics";

type ApiResponse = {
  metrics: ImpactMetrics;
  thresholdExplain: { codes: string[]; bullets: string[] };
};

export default function ImpactPage() {
  const {
    userId,
    ready,
    isJudgeDemo,
    authHeaders,
    startFreshSession,
  } = useMindBridgeUser();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ready || !userId) return;
    fetch(`/api/impact?userId=${encodeURIComponent(userId)}`, {
      headers: authHeaders(),
    })
      .then((r) => r.json())
      .then((j) => {
        if (j.error) setError(j.error);
        else setData(j);
      })
      .catch(() => setError("Could not load impact data"));
  }, [ready, userId, authHeaders]);

  if (!ready) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-brand-600/55">
        Preparing your private session…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isJudgeDemo && (
        <JudgeTourBanner onExit={startFreshSession} />
      )}

      <PageHeader
        title="Impact"
        subtitle="Outcomes & patterns — built for transparency"
        end={
          <span className="text-3xl leading-none opacity-90" aria-hidden>
            📊
          </span>
        }
      />

      {error && (
        <p className="text-sm text-rose-600">{error}</p>
      )}

      {data && (
        <>
          {data.thresholdExplain.bullets.length > 0 && (
            <div className="surface-card border-brand-600/25 p-4 text-sm text-brand-600">
              <p className="mb-2 text-xs font-semibold text-brand-600/70">
                Active threshold signals
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs normal-case tracking-normal text-brand-600/85">
                {data.thresholdExplain.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          )}
          <ImpactDashboard metrics={data.metrics} />
        </>
      )}

      {!data && !error && (
        <div className="text-center text-sm text-brand-600/50 py-12">
          Loading metrics…
        </div>
      )}
    </div>
  );
}
