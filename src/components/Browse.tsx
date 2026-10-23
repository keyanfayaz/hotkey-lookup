import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { APPS, SHORTCUTS, APP_BY_ID } from "../data";
import type { OS, Shortcut } from "../lib/types";
import { KeyCombo } from "./KeyCombo";
import { AppGlyph } from "./AppIcon";
import { FavouriteButton } from "./FavouriteButton";
import { useFavourites } from "../hooks/useFavourites";

type Mode = "by-app" | "by-action" | "by-os" | "favourites";

const MODE_LEDE: Record<Mode, string> = {
  "by-app":    "Pick an app. Get the cheatsheet.",
  "by-action": "Every shortcut, every app — one list.",
  "by-os":     "Same action. Three keyboards. One row.",
  "favourites": "Your saved shortcuts, across apps and operating systems.",
};

interface Props {
  os: OS;
  onSelect: (appId: string) => void;
  onSelectShortcut: (s: Shortcut) => void;
}

export function Browse({ os, onSelect, onSelectShortcut }: Props) {
  const [params, setParams] = useSearchParams();
  const view = params.get("view");
  const [filter, setFilter] = useState("");
  const { ids, ready, persistent } = useFavourites();
  // Query views are client-specific, so first match the prerendered By app view.
  const mode: Mode = ready && (view === "by-action" || view === "by-os" || view === "favourites") ? view : "by-app";

  const setMode = (next: Mode) => {
    const nextParams = new URLSearchParams(params);
    if (next === "by-app") nextParams.delete("view");
    else nextParams.set("view", next);
    setParams(nextParams);
    setFilter("");
  };

  const filteredShortcuts = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return SHORTCUTS.filter((s) =>
      (mode !== "favourites" || ids.includes(s.id)) &&
      (s.function + " " + (s.category ?? "") + " " + (APP_BY_ID[s.appId]?.name ?? ""))
        .toLowerCase()
        .includes(q)
    );
  }, [filter, mode, ids]);

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Browse</h1>
          <p className="page-lede">{MODE_LEDE[mode]}</p>
        </div>
        <div className="browse-tools">
          {mode !== "by-app" && (
            <input
              className="page-filter"
              placeholder="filter…"
              aria-label="Filter shortcuts"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          )}
          <div className="page-meta">{APPS.length} apps · {SHORTCUTS.length} hotkeys</div>
        </div>
      </div>

      <div className="browse-tabs" role="group" aria-label="Browse mode">
        {(["by-app", "by-action", "by-os", "favourites"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            className={`browse-tab${mode === m ? " on" : ""}`}
            onClick={() => setMode(m)}
          >
            {m === "by-app" ? "By app" : m === "by-action" ? "By action" : m === "by-os" ? "By OS" : `Favourites (${ids.length})`}
          </button>
        ))}
      </div>

      {mode === "favourites" && (
        <p className="favourites-note" role="status">
          {!ready ? "Loading favourites…" : persistent
            ? `${ids.length} saved. Favourites are stored in this browser on this device.`
            : "Browser storage is unavailable. Favourites will only last for this visit."}
        </p>
      )}

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

      {(mode === "by-action" || mode === "favourites") && (
        <div className="browse-table">
          <div className="browse-head browse-head-action">
            <span>Action</span>
            <span>App</span>
            <span>Combo</span>
            <span className="sr-only">Favourite</span>
          </div>
          <div className="browse-body">
            {filteredShortcuts.map((s) => {
              const app = APP_BY_ID[s.appId];
              const combos = s.combos[os] ?? [];
              return (
                <div key={s.id} className="browse-row">
                  <button type="button" className="browse-action browse-open" onClick={() => onSelectShortcut(s)}>
                    {s.function}
                  </button>
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
                  <FavouriteButton shortcut={s} compact />
                </div>
              );
            })}
            {filteredShortcuts.length === 0 && (
              <div className="browse-empty">
                {mode === "favourites" && !ready ? "Loading favourites…" : mode === "favourites" && ids.length === 0
                  ? "No favourites yet. Save a shortcut with its star button in By action, By OS, or a shortcut detail."
                  : "No shortcuts match your filter."}
              </div>
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
            <span className="sr-only">Favourite</span>
          </div>
          <div className="browse-body">
            {filteredShortcuts.map((s) => {
              const app = APP_BY_ID[s.appId];
              return (
                <div key={s.id} className="browse-row browse-row-os">
                  <span className="browse-action">
                    <AppGlyph
                      appId={s.appId}
                      name={app?.name ?? s.appId}
                      onClick={onSelect}
                      title={app ? `Open ${app.name} cheatsheet` : undefined}
                    />
                    <button type="button" className="browse-open" onClick={() => onSelectShortcut(s)}>{s.function}</button>
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
                  <FavouriteButton shortcut={s} compact />
                </div>
              );
            })}
            {filteredShortcuts.length === 0 && (
              <div className="browse-empty">No shortcuts match your filter.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
