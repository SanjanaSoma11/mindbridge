import { WeeklySummary as WeeklySummaryType } from "@/types";

interface WeeklySummaryProps {
  summary: WeeklySummaryType;
}

const TREND_CONFIG = {
  improving: {
    emoji: "↗️",
    label: "Improving",
    color: "text-brand-600 bg-brand-200/70 border border-brand-600/15",
  },
  stable: {
    emoji: "→",
    label: "Stable",
    color: "text-brand-600/85 bg-brand-200/55 border border-brand-600/15",
  },
  declining: {
    emoji: "↘️",
    label: "Declining",
    color: "text-brand-600 bg-brand-200/60 border border-brand-600/20",
  },
};

function SentimentDot({ score }: { score: number }) {
  const colors = [
    "",
    "bg-brand-900",
    "bg-brand-700",
    "bg-brand-500",
    "bg-brand-300",
    "bg-brand-200",
  ];
  return (
    <span
      className={`inline-block w-2.5 h-2.5 rounded-full ${colors[Math.round(score)] ?? "bg-brand-300"}`}
    />
  );
}

export default function WeeklySummary({ summary }: WeeklySummaryProps) {
  const trend = TREND_CONFIG[summary.trend];
  const weekStart = new Date(summary.week_start).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const weekEnd = new Date(summary.week_end).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="surface-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-semibold text-brand-600/55">
            Weekly summary
          </p>
          <p className="text-sm text-brand-600/70 mt-0.5">
            {weekStart} – {weekEnd}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <SentimentDot score={summary.avg_sentiment} />
          <span className="text-sm font-semibold text-brand-600">
            {summary.avg_sentiment.toFixed(1)}
            <span className="text-brand-600/45 font-normal">/5</span>
          </span>
          <span
            className={`ml-2 rounded-full px-2.5 py-1 text-[11px] font-medium ${trend.color}`}
          >
            {trend.emoji} {trend.label}
          </span>
        </div>
      </div>

      <p className="text-sm text-brand-600/90 leading-relaxed mb-4 normal-case">
        {summary.summary_text}
      </p>

      {summary.top_tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {summary.top_tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2.5 py-1 bg-brand-200/60 text-brand-600 border border-brand-600/12 rounded-full capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
