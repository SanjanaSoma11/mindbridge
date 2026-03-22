"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Checkin } from "@/types";

interface MoodTrendProps {
  checkins: Checkin[];
}

const SENTIMENT_LABELS: Record<number, string> = {
  1: "Very low",
  2: "Low",
  3: "Okay",
  4: "Good",
  5: "Great",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const score = payload[0]?.value as number;
  return (
    <div className="bg-brand-200/55 border border-brand-600/15 rounded-xl px-4 py-3">
      <p className="text-xs text-brand-600/50 mb-1">{label}</p>
      <p className="text-sm font-semibold text-brand-600">
        {score} — {SENTIMENT_LABELS[score] ?? ""}
      </p>
    </div>
  );
}

export default function MoodTrend({ checkins }: MoodTrendProps) {
  const data = checkins.map((c) => ({
    date: formatDate(c.created_at),
    score: c.sentiment_score,
  }));

  if (data.length === 0) {
    return (
      <div className="surface-card p-6 text-center">
        <p className="text-brand-600/55 text-sm">
          Your mood trend will appear here after your first few check-ins.
        </p>
      </div>
    );
  }

  return (
    <div className="surface-card p-6">
      <h3 className="mb-5 font-display text-base font-semibold tracking-tight text-brand-600">
        Mood over time
      </h3>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d8ece0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#5a7062" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[1, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tick={{ fontSize: 11, fill: "#5a7062" }}
            tickLine={false}
            axisLine={false}
          />
          <ReferenceLine y={2.5} stroke="#7fc49a" strokeDasharray="4 4" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#1f7a4d"
            strokeWidth={2.5}
            dot={{ fill: "#1f7a4d", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#1f7a4d" }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-3 text-center text-xs leading-relaxed text-brand-600/50">
        Dashed line = threshold (avg below this triggers a nudge)
      </p>
    </div>
  );
}
