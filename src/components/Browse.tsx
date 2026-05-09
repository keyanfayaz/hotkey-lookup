import { useState } from "react";
import { APPS, SHORTCUTS } from "../data";
import { AppGlyph } from "./AppIcon";
import { Compare } from "./Compare";

type Mode = "by-app" | "by-action";

interface Props {
  onSelect: (appId: string) => void;
}

export function Browse({ onSelect }: Props) {
  const [mode, setMode] = useState<Mode>("by-app");

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Browse</h1>
          <p className="page-lede">
            {mode === "by-app"
              ? "Pick a surface. Get the cheatsheet."
              : "Same action. Three keyboards. One row."}
          </p>
        </div>
        <div className="page-meta">
          {APPS.length} surfaces · {SHORTCUTS.length} bindings
        </div>
      </div>

      <div className="browse-tabs" role="tablist" aria-label="Browse mode">
        <button
          role="tab"
          aria-selected={mode === "by-app"}
          className={`browse-tab${mode === "by-app" ? " on" : ""}`}
          onClick={() => setMode("by-app")}
        >
          By app
        </button>
        <button
          role="tab"
          aria-selected={mode === "by-action"}
          className={`browse-tab${mode === "by-action" ? " on" : ""}`}
          onClick={() => setMode("by-action")}
        >
          By action
        </button>
      </div>

      {mode === "by-app" ? (
        <div className="app-grid">
          {APPS.map((app) => {
            const count = SHORTCUTS.filter((s) => s.appId === app.id).length;
            return (
              <button
                key={app.id}
                className="app-card"
                onClick={() => onSelect(app.id)}
              >
                <div className="app-card-top">
                  <AppGlyph appId={app.id} name={app.name} />
                  <span className="app-card-count">
                    {String(count).padStart(2, "0")}
                  </span>
                </div>
                <div className="app-card-name">{app.name}</div>
                {app.hint && (
                  <div className="app-card-hint">{app.hint}</div>
                )}
                <div className="app-card-arrow">→</div>
              </button>
            );
          })}
        </div>
      ) : (
        <Compare embedded onSelectApp={onSelect} />
      )}
    </div>
  );
}
