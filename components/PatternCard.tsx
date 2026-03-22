import { Checkin } from "@/types";

interface PatternCardProps {
  checkin: Checkin;
}

const SENTIMENT_CONFIG: Record<
  number,
  { label: string; color: string; dot: string }
> = {
  1: { label: "Very low", color: "text-brand-600", dot: "bg-brand-900" },
  2: { label: "Low", color: "text-brand-600/90", dot: "bg-brand-700" },
  3: { label: "Okay", color: "text-brand-600/80", dot: "bg-brand-500" },
  4: { label: "Good", color: "text-brand-600/75", dot: "bg-brand-400" },
  5: { label: "Great", color: "text-brand-600/70", dot: "bg-brand-300" },
};

export default function PatternCard({ checkin }: PatternCardProps) {
  const sentiment = SENTIMENT_CONFIG[checkin.sentiment_score] ?? SENTIMENT_CONFIG[3];
  const date = new Date(checkin.created_at).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="surface-card px-4 py-3 flex items-start gap-3">
      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${sentiment.dot}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-brand-600/50">{date}</span>
          <span className={`text-xs font-medium ${sentiment.color}`}>
            {sentiment.label}
          </span>
          {checkin.crisis_flag && (
            <span className="text-xs font-medium text-rose-700 bg-brand-200/60 border border-rose-400/35 px-2 py-0.5 rounded-full">
              crisis flag
            </span>
          )}
        </div>
        <p className="text-sm text-brand-600/90 leading-relaxed truncate normal-case">
          {checkin.user_text}
        </p>
        {checkin.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {checkin.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-brand-600 bg-brand-200/60 border border-brand-600/12 px-2 py-0.5 rounded-full capitalize"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
