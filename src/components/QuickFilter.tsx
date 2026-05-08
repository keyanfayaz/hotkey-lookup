import { useEffect, useState } from "react";
import type { App, OS } from "../lib/types";

interface Props {
  apps: App[];
  selected: Set<string>;
  onSetAll: (ids: string[]) => void;
  os: OS | null;
}

const POPULAR_BY_OS: Record<OS, string[]> = {
  macos: ["system-macos", "chrome", "vscode", "slack", "figma"],
  windows: ["system-windows", "chrome", "vscode", "slack", "figma"],
  linux: ["system-linux", "firefox", "vscode", "chrome", "slack"],
};

const POPULAR_ALL = ["chrome", "vscode", "slack", "figma", "google-docs"];

export function QuickFilter({ apps, selected, onSetAll, os }: Props) {
  const [expanded, setExpanded] = useState(false);

  // Collapse when the OS changes — popular set is about to change too.
  useEffect(() => {
    setExpanded(false);
  }, [os]);

  const popularIds = os ? POPULAR_BY_OS[os] : POPULAR_ALL;
  const popular = popularIds
    .map((id) => apps.find((a) => a.id === id))
    .filter((a): a is App => Boolean(a));

  if (popular.length === 0) return null;

  const isOnly = (id: string) => selected.size === 1 && selected.has(id);
  const allIds = apps.map((a) => a.id);

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-label="Quick filter to popular apps"
        title={
          expanded ? "Hide quick filters" : "Quick filter to popular apps"
        }
        className={`-ml-1.5 z-0 inline-flex items-center gap-1 pl-3 pr-2 py-1.5 rounded-r-lg border border-l-0 text-xs font-medium transition-colors
          ${
            expanded
              ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/40 dark:text-indigo-300"
              : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:bg-slate-900/60 dark:border-slate-800 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800"
          }`}
      >
        <span aria-hidden="true">⚡</span>
        <span className="hidden sm:inline">Quick</span>
      </button>

      <div
        aria-hidden={!expanded}
        className={`flex items-center gap-1.5 overflow-hidden transition-all duration-200 ease-out
          ${expanded ? "max-w-[60rem] ml-2 opacity-100" : "max-w-0 ml-0 opacity-0 pointer-events-none"}`}
      >
        {popular.map((app) => {
          const active = isOnly(app.id);
          return (
            <button
              key={app.id}
              type="button"
              onClick={() => onSetAll(active ? allIds : [app.id])}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap transition-colors
                ${
                  active
                    ? "bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 dark:hover:border-slate-700"
                }`}
            >
              <span aria-hidden="true">{app.icon}</span>
              <span>{app.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
