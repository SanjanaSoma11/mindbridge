"use client";

interface FrequencyPickerProps {
  value: number;
  onChange: (days: number) => void;
  disabled?: boolean;
}

const OPTIONS = [
  { days: 1, label: "Every day", description: "A daily habit" },
  { days: 2, label: "Every 2 days", description: "Recommended" },
  { days: 3, label: "Every 3 days", description: "Lighter check-in" },
];

export default function FrequencyPicker({
  value,
  onChange,
  disabled = false,
}: FrequencyPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      {OPTIONS.map((opt) => {
        const selected = value === opt.days;
        return (
          <button
            key={opt.days}
            type="button"
            onClick={() => onChange(opt.days)}
            disabled={disabled}
            className={`flex items-center justify-between px-5 py-4 rounded-xl text-left transition-all ${
              selected
                ? "bg-brand-200/80"
                : "bg-brand-200/35 hover:bg-brand-200/55"
            } disabled:opacity-50`}
          >
            <div>
              <p
                className={`text-sm font-semibold ${
                  selected ? "text-brand-600" : "text-brand-600/85"
                }`}
              >
                {opt.label}
              </p>
              <p className="text-xs text-brand-600/50 mt-0.5">{opt.description}</p>
            </div>
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full ${
                selected ? "bg-accent" : "bg-brand-200/90"
              }`}
            >
              {selected && (
                <div className="h-2 w-2 rounded-full bg-brand-50" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
