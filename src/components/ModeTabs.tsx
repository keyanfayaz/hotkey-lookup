export type Mode = "find" | "identify";

interface Props {
  value: Mode;
  onChange: (next: Mode) => void;
}

const TABS: { id: Mode; label: string; sub: string }[] = [
  { id: "find", label: "Find a hotkey", sub: "Search by what it does" },
  { id: "identify", label: "Identify a hotkey", sub: "Press it, see what it means" },
];

export function ModeTabs({ value, onChange }: Props) {
  return (
    <div role="tablist" className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900">
      {TABS.map((t) => {
        const active = value === t.id;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.id)}
            className={`text-left px-4 py-3 rounded-lg transition-all ${
              active
                ? "bg-white shadow-sm dark:bg-slate-800"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <div className="font-semibold">{t.label}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{t.sub}</div>
          </button>
        );
      })}
    </div>
  );
}
