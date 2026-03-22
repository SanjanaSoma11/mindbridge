"use client";

import { CRISIS_RESOURCES } from "@/lib/crisis";

interface CrisisOverlayProps {
  onDismiss: () => void;
}

export default function CrisisOverlay({ onDismiss }: CrisisOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-900/85 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="crisis-dialog-title"
    >
      <div className="bg-white border border-brand-200 rounded-2xl shadow-card max-w-md w-full p-8 text-center">
        {/* Header */}
        <div className="text-4xl mb-4" aria-hidden>
          🫂
        </div>
        <h2
          id="crisis-dialog-title"
          className="text-xl font-semibold text-brand-600 uppercase tracking-wide mb-3"
        >
          You don't have to hold this alone
        </h2>
        <p className="text-brand-600/80 mb-6 leading-relaxed text-sm normal-case tracking-normal">
          What you shared matters. There are people available right now who are
          trained to help — and they want to hear from you.
        </p>

        {/* Crisis resources */}
        <div className="space-y-3 mb-6">
          {CRISIS_RESOURCES.filter((r) => r.primary).map((resource) => (
            <a
              key={resource.url}
              href={resource.url}
              className="flex items-center justify-between w-full px-5 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-semibold transition-colors"
            >
              <span>{resource.title}</span>
              <span className="text-sm font-normal opacity-90">
                {resource.subtitle}
              </span>
            </a>
          ))}
          {CRISIS_RESOURCES.filter((r) => !r.primary).map((resource) => (
            <a
              key={resource.url}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-5 py-3 bg-brand-200/60 hover:bg-brand-200/75 border border-rose-400/40 text-rose-800 rounded-2xl text-sm font-medium transition-colors"
            >
              {resource.title}
            </a>
          ))}
        </div>

        {/* Safe dismiss */}
        <button
          type="button"
          onClick={onDismiss}
          className="text-xs text-brand-600/50 hover:text-brand-600 uppercase tracking-wide transition-colors underline underline-offset-2"
        >
          I'm safe — continue check-in
        </button>
      </div>
    </div>
  );
}
