"use client";

import { useState, useEffect } from "react";
import MoodTrend from "@/components/MoodTrend";
import WeeklySummary from "@/components/WeeklySummary";
import ThresholdNudge from "@/components/ThresholdNudge";
import PatternCard from "@/components/PatternCard";
import FollowUpCard from "@/components/FollowUpCard";
import JudgeTourBanner from "@/components/JudgeTourBanner";
import PageHeader from "@/components/PageHeader";
import { useMindBridgeUser } from "@/hooks/useMindBridgeUser";
import {
  Checkin,
  WeeklySummary as WeeklySummaryType,
  ThresholdResult,
  Followup,
} from "@/types";

export default function PatternsPage() {
  const { userId, ready, isJudgeDemo, authHeaders, startFreshSession } =
    useMindBridgeUser();
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [summaries, setSummaries] = useState<WeeklySummaryType[]>([]);
  const [threshold, setThreshold] = useState<ThresholdResult | null>(null);
  const [followup, setFollowup] = useState<Followup | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [showAllCheckins, setShowAllCheckins] = useState(false);

  useEffect(() => {
    if (!ready || !userId) return;
    loadData();
  }, [ready, userId]);

  async function loadData() {
    if (!userId) return;
    setLoading(true);
    try {
      const [patternsRes, followupRes] = await Promise.all([
        fetch(`/api/patterns?userId=${encodeURIComponent(userId)}`, {
          headers: authHeaders(),
        }),
        fetch(`/api/followup?userId=${encodeURIComponent(userId)}`, {
          headers: authHeaders(),
        }),
      ]);

      const patterns = await patternsRes.json();
      setCheckins(patterns.checkins ?? []);
      setSummaries(patterns.summaries ?? []);
      setThreshold(patterns.threshold ?? null);

      const followupData = await followupRes.json();
      if (followupData.due && followupData.followup) {
        setFollowup(followupData.followup);
      } else {
        setFollowup(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function generateSummary() {
    if (!userId) return;
    setGeneratingSummary(true);
    try {
      const res = await fetch("/api/patterns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.summary) {
        setSummaries((prev) => [data.summary, ...prev]);
        setThreshold(data.threshold);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingSummary(false);
    }
  }

  async function handleFollowupResponse(id: string, response: "yes" | "no") {
    await fetch("/api/followup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      body: JSON.stringify({ followupId: id, response }),
    });
    setFollowup((f) => (f ? { ...f, response } : f));
  }

  const visibleCheckins = showAllCheckins ? checkins : checkins.slice(-7);
  const latestSummary = summaries[0] ?? null;

  if (!ready || !userId) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-brand-600/55">
        Loading your patterns…
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-pulse text-sm text-brand-600/50">Loading patterns…</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isJudgeDemo && (
        <JudgeTourBanner onExit={startFreshSession} />
      )}

      <PageHeader
        title="Patterns"
        subtitle={`${checkins.length} check-in${checkins.length !== 1 ? "s" : ""} total`}
        end={
          <span className="text-3xl leading-none opacity-90" aria-hidden>
            📈
          </span>
        }
      />

      {threshold?.nudge && (
        <ThresholdNudge reason={threshold.reason} urgency={threshold.urgency} />
      )}

      {followup && !followup.response && (
        <FollowUpCard followup={followup} onRespond={handleFollowupResponse} />
      )}

      <MoodTrend checkins={checkins} />

      {latestSummary ? (
        <WeeklySummary summary={latestSummary} />
      ) : (
        <div className="surface-card p-6 text-center">
          <p className="text-sm text-brand-600/70 mb-4">
            No weekly summary yet. Generate one from your recent check-ins.
          </p>
          <button
            type="button"
            onClick={generateSummary}
            disabled={generatingSummary || checkins.length < 2}
            className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
          >
            {generatingSummary ? "Generating…" : "Generate summary"}
          </button>
        </div>
      )}

      {latestSummary && (
        <button
          type="button"
          onClick={generateSummary}
          disabled={generatingSummary}
          className="w-full py-2.5 bg-brand-200/55 hover:bg-brand-200/75 border border-brand-600/15 text-brand-600 text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
        >
          {generatingSummary ? "Generating…" : "Regenerate summary"}
        </button>
      )}

      {checkins.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-brand-600/65">
              Recent check-ins
            </h2>
            {checkins.length > 7 && (
              <button
                type="button"
                onClick={() => setShowAllCheckins((v) => !v)}
                className="text-xs text-brand-600 hover:text-brand-700 font-medium"
              >
                {showAllCheckins ? "Show less" : `Show all ${checkins.length}`}
              </button>
            )}
          </div>
          <div className="space-y-2">
            {[...visibleCheckins].reverse().map((c) => (
              <PatternCard key={c.id} checkin={c} />
            ))}
          </div>
        </div>
      )}

      {checkins.length === 0 && (
        <div className="text-center py-12">
          <p className="text-brand-600/55 text-sm">
            No check-ins yet.{" "}
            <a href="/check-in" className="text-brand-600 underline">
              Start your first one →
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
