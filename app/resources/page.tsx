import PageHeader from "@/components/PageHeader";
import { RESOURCE_MAP, UNIVERSAL_RESOURCES } from "@/lib/resources";

const CATEGORIES = [
  { key: "academic", label: "Academic stress", emoji: "📚" },
  { key: "loneliness", label: "Loneliness & connection", emoji: "🤝" },
  { key: "sleep", label: "Sleep & rest", emoji: "😴" },
  { key: "overwhelm", label: "Overwhelm & anxiety", emoji: "🌊" },
  { key: "family", label: "Family & home", emoji: "🏡" },
  { key: "financial", label: "Financial stress", emoji: "💰" },
  { key: "career", label: "Career & future", emoji: "🎯" },
  { key: "identity", label: "Identity & belonging", emoji: "🌈" },
  { key: "grief", label: "Grief & loss", emoji: "🕊️" },
  { key: "health", label: "Physical health", emoji: "💚" },
] as const;

function SourceBadge({ source }: { source?: string }) {
  if (!source) return null;
  return (
    <span className="inline-flex shrink-0 rounded-md bg-brand-200/60 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-brand-600/80">
      {source}
    </span>
  );
}

export default function ResourcesPage() {
  return (
    <div className="space-y-10 pb-8">
      <PageHeader
        className="max-w-5xl space-y-3"
        title="Resources"
        subtitle={
          <>
            Trusted links from the{" "}
            <strong className="font-semibold text-brand-600">APA</strong>,{" "}
            <strong className="font-semibold text-brand-600">JED Foundation</strong>,{" "}
            <strong className="font-semibold text-brand-600">ASU</strong>,{" "}
            <strong className="font-semibold text-brand-600">CDC</strong>, and{" "}
            <strong className="font-semibold text-brand-600">SAMHSA</strong>. MindBridge
            does not replace a counselor or clinician.
          </>
        }
        subtitleClassName="max-w-none text-[0.9375rem] leading-relaxed"
      />

      <section
        aria-labelledby="crisis-heading"
        className="space-y-4 rounded-2xl bg-rose-100/35 p-5 md:p-6"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl" aria-hidden>
            🚨
          </span>
          <div>
            <h2
              id="crisis-heading"
              className="font-display text-base font-semibold tracking-tight text-rose-900"
            >
              In crisis right now?
            </h2>
            <p className="text-xs text-rose-900/80 mt-1 normal-case leading-relaxed">
              If you or someone else may be in immediate danger, call{" "}
              <strong className="font-semibold">911</strong> (or your local emergency
              number). These services are free and confidential.
            </p>
          </div>
        </div>
        <ul className="space-y-3 list-none p-0 m-0">
          {UNIVERSAL_RESOURCES.map((r) => (
            <li key={r.url}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full rounded-xl bg-rose-600 px-4 py-3.5 text-left text-white shadow-sm transition-colors hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-100"
              >
                <span className="font-semibold text-sm">{r.title}</span>
                <span className="text-xs text-white/90 sm:text-right sm:max-w-[55%] leading-snug">
                  {r.description}
                </span>
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="topics-heading" className="space-y-5">
        <h2
          id="topics-heading"
          className="font-display text-base font-semibold tracking-tight text-brand-600"
        >
          By topic
        </h2>
        <div className="space-y-5">
          {CATEGORIES.map(({ key, label, emoji }) => {
            const resources = RESOURCE_MAP[key];
            if (!resources?.length) return null;
            return (
              <div key={key} className="surface-card p-5 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl" aria-hidden>
                    {emoji}
                  </span>
                  <h3 className="font-display text-base font-semibold tracking-tight text-brand-600">
                    {label}
                  </h3>
                </div>
                <ul className="space-y-2 list-none p-0 m-0">
                  {resources.map((r) => (
                    <li key={r.url}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between gap-x-4 p-3 rounded-xl border border-brand-600/12 bg-brand-200/40 hover:bg-brand-200/70 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/30"
                      >
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          <span
                            className="text-brand-600/40 mt-0.5 text-sm shrink-0"
                            aria-hidden
                          >
                            →
                          </span>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-medium text-brand-600 group-hover:text-brand-800">
                                {r.title}
                              </p>
                              <SourceBadge source={r.source} />
                            </div>
                            {r.description && (
                              <p className="text-xs text-brand-600/60 mt-1 leading-relaxed">
                                {r.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <span className="sr-only">Opens in new tab</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="rounded-xl border border-brand-600/10 bg-brand-200/30 px-4 py-4">
        <p className="text-center text-xs leading-relaxed text-brand-600/60">
          Not medical advice. If you need ongoing care, contact your campus health or
          counseling center or a licensed professional.
        </p>
      </footer>
    </div>
  );
}
