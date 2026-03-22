"use client";

import { useState } from "react";
import { nudgeMessage } from "@/lib/threshold";
import Link from "next/link";
import ThresholdExplainCard from "@/components/ThresholdExplainCard";

interface ThresholdNudgeProps {
  reason: string | null;
  urgency: "soft" | "standard" | "crisis";
}

export default function ThresholdNudge({ reason, urgency }: ThresholdNudgeProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const message = nudgeMessage(reason);

  const isCrisis = urgency === "crisis";

  return (
    <div
      className={`rounded-2xl p-6 border ${
        isCrisis
          ? "bg-brand-200/55 border-rose-400/50"
          : "bg-brand-200/55 border-brand-600/20"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="text-2xl mt-0.5">{isCrisis ? "🚨" : "🌱"}</div>
        <div className="flex-1">
          <h3
            className={`font-semibold text-sm uppercase tracking-wide mb-1 ${
              isCrisis ? "text-rose-800" : "text-brand-600"
            }`}
          >
            {isCrisis ? "Please reach out" : "A gentle nudge"}
          </h3>
          <p
            className={`text-sm leading-relaxed mb-4 normal-case tracking-normal ${
              isCrisis ? "text-rose-700" : "text-brand-600/85"
            }`}
          >
            {message}
          </p>

          <div className="flex flex-wrap gap-2">
            {isCrisis ? (
              <>
                <a
                  href="tel:988"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold uppercase tracking-wide rounded-xl transition-colors"
                >
                  Call 988
                </a>
                <a
                  href="https://988lifeline.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-rose-500 bg-transparent text-rose-800 text-xs font-semibold uppercase tracking-wide rounded-xl transition-colors hover:bg-rose-100/40"
                >
                  Chat online
                </a>
              </>
            ) : (
              <Link
                href="/resources"
                className="btn-solid-cocina inline-block rounded-xl text-xs normal-case tracking-normal"
              >
                See support options
              </Link>
            )}
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="px-4 py-2 text-xs font-medium uppercase tracking-wide text-brand-600/60 hover:text-brand-600 transition-colors"
            >
              Dismiss
            </button>
          </div>
          <ThresholdExplainCard reason={reason} />
        </div>
      </div>
    </div>
  );
}
