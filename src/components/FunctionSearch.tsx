import { useEffect, useMemo, useState } from "react";
import { APPS, SHORTCUTS } from "../data";
import { activeOS, type OSChoice } from "../hooks/useOS";
import { buildSearchIndex } from "../lib/search";
import type { Shortcut } from "../lib/types";
import { AppFilter } from "./AppFilter";
import { ShortcutCard } from "./ShortcutCard";

interface Props {
  osChoice: OSChoice;
}

const visibleAppsFor = (osChoice: OSChoice) => {
  const os = activeOS(osChoice);
  return APPS.filter((a) => !os || a.supportedOS.includes(os));
};

const filterShortcuts = (
  shortcuts: Shortcut[],
  osChoice: OSChoice,
  selectedApps: Set<string>,
): Shortcut[] => {
  const os = activeOS(osChoice);
  return shortcuts.filter((s) => {
    if (!selectedApps.has(s.appId)) return false;
    if (!os) return true;
    return Boolean(s.combos[os]?.length);
  });
};

const groupByApp = (items: Shortcut[]): [string, Shortcut[]][] => {
  const map = new Map<string, Shortcut[]>();
  for (const s of items) {
    const arr = map.get(s.appId) ?? [];
    arr.push(s);
    map.set(s.appId, arr);
  }
  return [...map.entries()];
};

export function FunctionSearch({ osChoice }: Props) {
  const visibleApps = useMemo(() => visibleAppsFor(osChoice), [osChoice]);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [selectedApps, setSelectedApps] = useState<Set<string>>(
    () => new Set(visibleApps.map((a) => a.id)),
  );

  useEffect(() => {
    setSelectedApps(new Set(visibleApps.map((a) => a.id)));
  }, [visibleApps]);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(query), 120);
    return () => window.clearTimeout(id);
  }, [query]);

  const fuse = useMemo(() => buildSearchIndex(SHORTCUTS), []);

  const results = useMemo(() => {
    const base = debounced.trim()
      ? fuse.search(debounced).map((r) => r.item)
      : SHORTCUTS;
    return filterShortcuts(base, osChoice, selectedApps);
  }, [debounced, fuse, osChoice, selectedApps]);

  const grouped = useMemo(() => groupByApp(results), [results]);

  const toggleApp = (id: string) =>
    setSelectedApps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="space-y-5">
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try ‘copy’, ‘command palette’, ‘screenshot region’…"
          className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 bg-white
                     text-base placeholder:text-slate-400
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                     dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100
                     dark:placeholder:text-slate-500"
          autoFocus
        />
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
          🔎
        </span>
      </div>

      <AppFilter
        apps={visibleApps}
        selected={selectedApps}
        onToggle={toggleApp}
        onSetAll={(ids) => setSelectedApps(new Set(ids))}
      />

      {results.length === 0 ? (
        <div className="card p-8 text-center text-slate-500 dark:text-slate-400">
          <div className="text-3xl mb-2">🤷</div>
          <div className="font-medium text-slate-700 dark:text-slate-300">
            No matches.
          </div>
          <div className="text-sm mt-1">
            Try <span className="font-mono">paste</span>,{" "}
            <span className="font-mono">screenshot</span>, or{" "}
            <span className="font-mono">command palette</span>.
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {grouped.map(([appId, items]) => (
            <section key={appId} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                {items.map((s) => (
                  <ShortcutCard
                    key={s.id}
                    shortcut={s}
                    os={activeOS(osChoice)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <div className="text-xs text-slate-400 dark:text-slate-500 pt-2">
        {results.length} result{results.length === 1 ? "" : "s"}
        {debounced && ` for “${debounced}”`}
      </div>
    </div>
  );
}
