import { useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import { SHORTCUTS, APPS, APP_BY_ID } from "../data";
import { parseCombo } from "../lib/normalize";
import type { App, OS, Shortcut } from "../lib/types";
import { KeyCombo } from "./KeyCombo";
import { AppGlyph } from "./AppIcon";

const CLASSICS = [
  "Screenshot a region",
  "Force quit applications",
  "Open Mission Control",
  "Go to definition",
  "Format document",
  "Toggle Zen Mode",
  "Search history",
  "Open AI chat",
  "Inline edit (Cmd-K)",
  "Reopen last closed tab",
  "Open DevTools",
  "Create issue",
];

const shortcutFuse = new Fuse(SHORTCUTS, {
  keys: [
    { name: "function", weight: 0.6 },
    { name: "description", weight: 0.25 },
    { name: "category", weight: 0.1 },
    { name: "appId", weight: 0.05 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  includeScore: true,
  minMatchCharLength: 2,
});

const appFuse = new Fuse(APPS, {
  keys: [
    { name: "name", weight: 0.7 },
    { name: "category", weight: 0.2 },
    { name: "hint", weight: 0.1 },
  ],
  threshold: 0.3,
  ignoreLocation: true,
  includeScore: true,
  minMatchCharLength: 2,
});

type PaletteResult =
  | { kind: "app"; app: App; count: number }
  | { kind: "shortcut"; shortcut: Shortcut };

function buildResults(query: string): PaletteResult[] {
  const q = query.trim();
  if (!q) {
    return (
      CLASSICS.map((n) => SHORTCUTS.find((s) => s.function === n)).filter(
        Boolean,
      ) as Shortcut[]
    ).map((s) => ({ kind: "shortcut", shortcut: s }));
  }

  const appMatches = appFuse.search(q, { limit: 3 }).map((r) => ({
    kind: "app" as const,
    app: r.item,
    count: SHORTCUTS.filter((s) => s.appId === r.item.id).length,
  }));

  const shortcutMatches = shortcutFuse
    .search(q, { limit: 10 })
    .map((r) => ({ kind: "shortcut" as const, shortcut: r.item }));

  return [...appMatches, ...shortcutMatches];
}

export function comboToKeySet(combo: string): Set<string> {
  const set = new Set<string>();
  const parsed = parseCombo(combo);
  if (!parsed) return set;
  for (const m of parsed.mods) {
    set.add(m === "meta" ? "mod" : m);
  }
  const k = parsed.key.toLowerCase();
  const arrowMap: Record<string, string> = {
    arrowup: "up", arrowdown: "down", arrowleft: "left", arrowright: "right",
  };
  set.add(arrowMap[k] ?? k);
  return set;
}

interface Props {
  os: OS;
  onPick: (s: Shortcut) => void;
  onPickApp: (appId: string) => void;
  onFocusedShortcut?: (s: Shortcut | null) => void;
  autoFocus?: boolean;
}

export function Palette({ os, onPick, onPickApp, onFocusedShortcut, autoFocus }: Props) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const results = useMemo(() => buildResults(query), [query]);

  const clampedFocused = Math.min(focused, Math.max(0, results.length - 1));

  useEffect(() => {
    const r = results[clampedFocused];
    onFocusedShortcut?.(r?.kind === "shortcut" ? r.shortcut : null);
  }, [clampedFocused, results, onFocusedShortcut]);

  const pick = (r: PaletteResult) => {
    if (r.kind === "app") onPickApp(r.app.id);
    else onPick(r.shortcut);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocused((f) => Math.min(results.length - 1, f + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocused((f) => Math.max(0, f - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[clampedFocused];
      if (r) pick(r);
    }
  };

  return (
    <div className="palette">
      <div className="palette-input">
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden
        >
          <circle cx="11" cy="11" r="6.5" />
          <path d="m20 20-4-4" />
        </svg>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setFocused(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search shortcuts… (try 'paste', 'screenshot', 'command palette')"
          spellCheck={false}
          autoComplete="off"
        />
        <span className="palette-hint">
          <kbd className="keychip dim">↑</kbd>
          <kbd className="keychip dim">↓</kbd>
          <span className="palette-hint-text">navigate</span>
          <kbd className="keychip dim">↵</kbd>
          <span className="palette-hint-text">select</span>
        </span>
      </div>

      <div className="palette-list">
        {results.length === 0 && (
          <div className="palette-empty">
            <span className="palette-empty-code">no_match</span>
            <span>
              Try a more general term, or press{" "}
              <kbd className="keychip dim">L</kbd> to listen for keys.
            </span>
          </div>
        )}
        {results.map((r, i) => {
          const isFocused = i === clampedFocused;
          if (r.kind === "app") {
            const { app, count } = r;
            return (
              <button
                key={`app:${app.id}`}
                className={`palette-row${isFocused ? " focused" : ""}`}
                onMouseEnter={() => setFocused(i)}
                onClick={() => pick(r)}
              >
                <AppGlyph appId={app.id} name={app.name} />
                <div className="prow-text">
                  <div className="prow-name">{app.name}</div>
                  <div className="prow-meta">
                    <span>{app.hint ?? app.category}</span>
                  </div>
                </div>
                <div className="prow-app-meta">
                  <span className="prow-app-count">{count} shortcuts</span>
                  <span className="prow-app-arrow">→</span>
                </div>
              </button>
            );
          }

          const { shortcut: s } = r;
          const app = APP_BY_ID[s.appId];
          const combos = s.combos[os] ?? [];
          return (
            <div
              key={s.id}
              role="button"
              tabIndex={-1}
              className={`palette-row${isFocused ? " focused" : ""}`}
              onMouseEnter={() => setFocused(i)}
              onClick={() => pick(r)}
            >
              <AppGlyph
                appId={s.appId}
                name={app?.name ?? s.appId}
                onClick={onPickApp}
                title={app ? `Open ${app.name} cheatsheet` : undefined}
              />
              <div className="prow-text">
                <div className="prow-name">{s.function}</div>
                <div className="prow-meta">
                  <span>{app?.name ?? s.appId}</span>
                  {s.category && (
                    <>
                      <span className="dot-sep">·</span>
                      <span>{s.category}</span>
                    </>
                  )}
                </div>
              </div>
              <div>
                {combos.length > 0 ? (
                  <KeyCombo combo={combos[0]} os={os} />
                ) : (
                  <span className="keys-na">—</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
