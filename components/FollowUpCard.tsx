"use client";

import { useState } from "react";
import { Followup } from "@/types";

interface FollowUpCardProps {
  followup: Followup;
  onRespond: (id: string, response: "yes" | "no") => Promise<void>;
}

export default function FollowUpCard({ followup, onRespond }: FollowUpCardProps) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  if (followup.response || done) {
    return (
      <div className="surface-card p-5 text-center">
        <p className="text-sm text-brand-600/85 font-medium normal-case">
          Thanks for letting us know. 💚
        </p>
      </div>
    );
  }

  async function handle(response: "yes" | "no") {
    setLoading(true);
    await onRespond(followup.id, response);
    setDone(true);
    setLoading(false);
  }

  return (
    <div className="surface-card p-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">🤝</span>
        <h3 className="font-display text-base font-semibold tracking-tight text-brand-600">
          A quick check-in
        </h3>
      </div>
      <p className="text-sm text-brand-600/80 leading-relaxed mb-5 normal-case tracking-normal">
        A couple of weeks ago, we suggested connecting with a counselor or
        someone you trust. Did you get a chance to do that?
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => handle("yes")}
          disabled={loading}
          className="flex-1 py-2.5 btn-solid-cocina rounded-xl text-xs normal-case tracking-normal disabled:opacity-50"
        >
          Yes, I did 👍
        </button>
        <button
          type="button"
          onClick={() => handle("no")}
          disabled={loading}
          className="flex-1 rounded-xl bg-brand-200/40 py-2.5 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-200/60 disabled:opacity-50"
        >
          Not yet
        </button>
      </div>
      <p className="mt-4 text-center text-xs text-brand-600/50">
        Your answer is private and never shared with anyone.
      </p>
    </div>
  );
}
