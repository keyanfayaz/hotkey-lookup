import { useEffect, useRef, useState } from "react";
import type { App, AppCategory } from "../lib/types";

interface Props {
  apps: App[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  onSetAll: (ids: string[]) => void;
  attachedRight?: boolean;
}

const CATEGORY_ORDER: AppCategory[] = [
  "system",
  "browser",
  "editor",
  "productivity",
  "design",
  "office",
];

const CATEGORY_LABEL: Record<AppCategory, string> = {
  system: "System",
  browser: "Browsers",
  editor: "Editors",
  productivity: "Productivity",
  design: "Design",
  office: "Office",
};

const groupByCategory = (apps: App[]): [AppCategory, App[]][] => {
  const map = new Map<AppCategory, App[]>();
  for (const a of apps) {
    const arr = map.get(a.category) ?? [];
    arr.push(a);
    map.set(a.category, arr);
  }
  return CATEGORY_ORDER.filter((c) => map.has(c)).map((c) => [c, map.get(c)!]);
};

const summary = (apps: App[], selected: Set<string>): string => {
  if (selected.size === 0) return "No apps";
  if (selected.size === apps.length) return "All apps";
  if (selected.size <= 2) {
    return apps
      .filter((a) => selected.has(a.id))
      .map((a) => a.name)
      .join(", ");
  }
  return `${selected.size} of ${apps.length}`;
};

export function AppFilter({
  apps,
  selected,
  onToggle,
  onSetAll,
  attachedRight,
}: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const allIds = apps.map((a) => a.id);
  const allSelected = allIds.every((id) => selected.has(id));
  const groups = groupByCategory(apps);

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`relative z-10 inline-flex items-center gap-2 px-3 py-1.5 border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:border-slate-300 transition-colors dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 dark:hover:border-slate-700 ${
          attachedRight ? "rounded-l-lg rounded-r-none" : "rounded-lg"
        }`}
      >
        <span className="text-slate-400 dark:text-slate-500">Apps:</span>
        <span className="truncate max-w-[14rem]">{summary(apps, selected)}</span>
        <svg
          aria-hidden="true"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute z-20 mt-2 w-72 sm:w-80 max-h-[24rem] overflow-y-auto card shadow-lg p-3 left-0"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Filter by app
            </span>
            <button
              type="button"
              onClick={() => onSetAll(allSelected ? [] : allIds)}
              className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {allSelected ? "Clear all" : "Select all"}
            </button>
          </div>

          <div className="space-y-3">
            {groups.map(([cat, list]) => (
              <div key={cat}>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  {CATEGORY_LABEL[cat]}
                </div>
                <div className="space-y-0.5">
                  {list.map((app) => {
                    const checked = selected.has(app.id);
                    return (
                      <label
                        key={app.id}
                        className="flex items-center gap-2.5 px-2 py-1.5 rounded-md cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => onToggle(app.id)}
                          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800"
                        />
                        <span aria-hidden="true">{app.icon}</span>
                        <span className="text-sm text-slate-700 dark:text-slate-200">
                          {app.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
