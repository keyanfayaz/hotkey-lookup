import { useMemo, useState } from "react";
import { APPS, SHORTCUTS, APP_BY_ID } from "../data";
import type { OS, Shortcut } from "../lib/types";
import { KeyCombo } from "./KeyCombo";
import { AppGlyph } from "./AppIcon";

type Mode = "by-app" | "by-action" | "by-os";

const MODE_LEDE: Record<Mode, string> = {
  "by-app":    "Pick an app. Get the cheatsheet.",
  "by-action": "Every shortcut, every app — one list.",
  "by-os":     "Same action. Three keyboards. One row.",
};

interface Props {
  os: OS;
  onSelect: (appId: string) => void;
  onSelectShortcut: (s: Shortcut) => void;
}

export function Browse({ os, onSelect, onSelectShortcut }: Props) {
  const [mode, setMode] = useState<Mode>("by-app");
  const [filter, setFilter] = useState("");

  const filteredShortcuts = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return SHORTCUTS;
    return SHORTCUTS.filter((s) =>
      (s.function + " " + (s.category ?? "") + " " + (APP_BY_ID[s.appId]?.name ?? ""))
        .toLowerCase()
        .includes(q)
    );
  }, [filter]);

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Browse</h1>
          <p className="page-lede">{MODE_LEDE[mode]}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {mode !== "by-app" && (
            <input
              className="page-filter"
              placeholder="filter…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          )}
          <div className="page-meta">{APPS.length} apps · {SHORTCUTS.length} hotkeys</div>
        </div>
      </div>

      <div className="browse-tabs" role="tablist" aria-label="Browse mode">
        {(["by-app", "by-action", "by-os"] as Mode[]).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            className={`browse-tab${mode === m ? " on" : ""}`}
            onClick={() => { setMode(m); setFilter(""); }}
          >
            {m === "by-app" ? "By app" : m === "by-action" ? "By action" : "By OS"}
          </button>
        ))}
      </div>

      {mode === "by-app" && (
        <div className="app-grid">
          {APPS.map((app) => {
            const count = SHORTCUTS.filter((s) => s.appId === app.id).length;
            return (
              <button key={app.id} className="app-card" onClick={() => onSelect(app.id)}>
                <div className="app-card-top">
                  <AppGlyph appId={app.id} name={app.name} />
                  <span className="app-card-count">{String(count).padStart(2, "0")}</span>
                </div>
                <div className="app-card-name">{app.name}</div>
                {app.hint && <div className="app-card-hint">{app.hint}</div>}
                <div className="app-card-arrow">→</div>
              </button>
            );
          })}
        </div>
      )}

      {mode === "by-action" && (
        <div className="browse-table">
          <div className="browse-head browse-head-action">
            <span>Action</span>
            <span>App</span>
            <span>Combo</span>
          </div>
          <div className="browse-body">
            {filteredShortcuts.map((s) => {
              const app = APP_BY_ID[s.appId];
              const combos = s.combos[os] ?? [];
              return (
                <button key={s.id} className="browse-row" onClick={() => onSelectShortcut(s)}>
                  <span className="browse-action">{s.function}</span>
                  <span className="browse-app">
                    <AppGlyph
                      appId={s.appId}
                      name={app?.name ?? s.appId}
                      onClick={onSelect}
                      title={app ? `Open ${app.name} cheatsheet` : undefined}
                    />
                    <span className="browse-app-name">{app?.name ?? s.appId}</span>
                  </span>
                  <span className="browse-combo">
                    {combos.length > 0 ? (
                      <KeyCombo combo={combos[0]} os={os} />
                    ) : (
                      <span className="keys-na">—</span>
                    )}
                  </span>
                </button>
              );
            })}
            {filteredShortcuts.length === 0 && (
              <div className="browse-empty">no_match</div>
            )}
          </div>
        </div>
      )}

      {mode === "by-os" && (
        <div className="browse-table">
          <div className="browse-head browse-head-os">
            <span>Action</span>
            <span>macOS</span>
            <span>Windows</span>
            <span>Linux</span>
          </div>
          <div className="browse-body">
            {filteredShortcuts.map((s) => {
              const app = APP_BY_ID[s.appId];
              return (
                <button key={s.id} className="browse-row browse-row-os" onClick={() => onSelectShortcut(s)}>
                  <span className="browse-action">
                    <AppGlyph
                      appId={s.appId}
                      name={app?.name ?? s.appId}
                      onClick={onSelect}
                      title={app ? `Open ${app.name} cheatsheet` : undefined}
                    />
                    {s.function}
                  </span>
                  {(["macos", "windows", "linux"] as OS[]).map((o) => {
                    const combos = s.combos[o] ?? [];
                    return (
                      <span key={o}>
                        {combos.length > 0 ? (
                          <KeyCombo combo={combos[0]} os={o} />
                        ) : (
                          <span className="keys-na">—</span>
                        )}
                      </span>
                    );
                  })}
                </button>
              );
            })}
            {filteredShortcuts.length === 0 && (
              <div className="browse-empty">no_match</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
