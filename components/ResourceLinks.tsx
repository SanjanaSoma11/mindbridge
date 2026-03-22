import { Resource } from "@/types";

interface ResourceLinksProps {
  resources: Resource[];
  compact?: boolean;
}

function isExternalWeb(url: string) {
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("tel:") ||
    url.startsWith("sms:")
  );
}

export default function ResourceLinks({
  resources,
  compact = false,
}: ResourceLinksProps) {
  if (resources.length === 0) return null;

  return (
    <div className={`${compact ? "mt-2" : "mt-4"}`}>
      <p className="text-[10px] font-semibold text-brand-600/50 uppercase tracking-wide mb-2">
        You might find these helpful
      </p>
      <ul className="flex flex-col gap-2 list-none p-0 m-0">
        {resources.map((r) => {
          const external = isExternalWeb(r.url);
          return (
            <li key={r.url}>
              <a
                href={r.url}
                target={
                  r.url.startsWith("tel:") || r.url.startsWith("sms:")
                    ? "_self"
                    : "_blank"
                }
                rel={external ? "noopener noreferrer" : undefined}
                className="flex items-start gap-3 px-4 py-3 border border-brand-600/12 bg-brand-200/50 hover:bg-brand-200/80 rounded-xl transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/25"
              >
                <span className="text-brand-600/50 mt-0.5 shrink-0" aria-hidden>
                  →
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 gap-y-1">
                    <p className="text-sm font-medium text-brand-600 group-hover:text-brand-800">
                      {r.title}
                    </p>
                    {r.source && (
                      <span className="inline-flex rounded border border-brand-600/12 bg-brand-200/50 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-brand-600/70">
                        {r.source}
                      </span>
                    )}
                  </div>
                  {r.description && (
                    <p className="text-xs text-brand-600/55 mt-0.5 leading-snug">
                      {r.description}
                    </p>
                  )}
                </div>
                {r.url.startsWith("http") && (
                  <span className="sr-only">Opens in new tab</span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
