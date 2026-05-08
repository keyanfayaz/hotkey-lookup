import type { OSChoice } from "../hooks/useOS";
import type { OS } from "../lib/types";

interface Props {
  value: OSChoice;
  onChange: (next: OSChoice) => void;
  detected: OS | null;
}

const OPTIONS: { id: OSChoice; label: string; icon: string; short: string }[] = [
  { id: "macos", label: "macOS", icon: "🍎", short: "Mac" },
  { id: "windows", label: "Windows", icon: "🪟", short: "Win" },
  { id: "linux", label: "Linux", icon: "🐧", short: "Linux" },
  { id: "all", label: "All OSes", icon: "✨", short: "All" },
];

export function OSSelector({ value, onChange, detected }: Props) {
  return (
    <div
      role="radiogroup"
      aria-label="Operating system"
      className="inline-flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
    >
      {OPTIONS.map((opt) => {
        const isActive = value === opt.id;
        const isDetected = opt.id !== "all" && detected === opt.id;
        const tooltip = isDetected ? `${opt.label} (detected)` : opt.label;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(opt.id)}
            title={tooltip}
            className={`relative inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md text-sm font-medium transition-colors
              ${
                isActive
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-100"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
          >
            <span aria-hidden="true" className="text-base leading-none">
              {opt.icon}
            </span>
            <span className="hidden sm:inline">{opt.short}</span>
            {isDetected && !isActive && (
              <span
                aria-hidden="true"
                className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
