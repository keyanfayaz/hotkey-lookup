import { useMemo, useState } from "react";
import { SHORTCUTS, APP_BY_ID } from "../data";
import { KeyCombo } from "./KeyCombo";
import { AppGlyph } from "./AppIcon";

const COMPARE_APPS = ["system-macos", "system-windows", "system-linux", "chrome", "firefox"];

interface Props {
  onSelectApp?: (appId: string) => void;
  embedded?: boolean;
}

export function Compare({ onSelectApp, embedded = false }: Props) {
  const [filter, setFilter] = useState("");

  const items = useMemo(() => {
    const q = filter.trim().toLowerCase();
    const pool = SHORTCUTS.filter((s) => COMPARE_APPS.includes(s.appId));
    if (!q) return pool;
    return pool.filter((s) =>
      (s.function + " " + (s.category ?? "")).toLowerCase().includes(q),
    );
  }, [filter]);

  const body = (
    <>
      {embedded && (
        <div className="compare-toolbar">
          <input
            className="page-filter"
            placeholder="filter actions…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      )}
      <div className="compare-table">
        <div className="ct-head">
          <div>Action</div>
          <div>macOS</div>
          <div>Windows</div>
          <div>Linux</div>
        </div>
        {items.map((s) => {
          const app = APP_BY_ID[s.appId];
          return (
            <div key={s.id} className="ct-row">
              <div className="ct-name">
                <AppGlyph
                  appId={s.appId}
                  name={app?.name ?? s.appId}
                  onClick={onSelectApp}
                  title={app ? `Open ${app.name} cheatsheet` : undefined}
                />
                <span>{s.function}</span>
              </div>
              <div>
                {(s.combos.macos ?? []).length > 0 ? (
                  <KeyCombo combo={s.combos.macos![0]} os="macos" />
                ) : (
                  <span className="keys-na">—</span>
                )}
              </div>
              <div>
                {(s.combos.windows ?? []).length > 0 ? (
                  <KeyCombo combo={s.combos.windows![0]} os="windows" />
                ) : (
                  <span className="keys-na">—</span>
                )}
              </div>
              <div>
                {(s.combos.linux ?? []).length > 0 ? (
                  <KeyCombo combo={s.combos.linux![0]} os="linux" />
                ) : (
                  <span className="keys-na">—</span>
                )}
              </div>
            </div>
          );
        })}
        {items.length === 0 && (
          <div style={{ padding: "24px 18px", color: "var(--fg-3)", fontFamily: "var(--font-mono)", fontSize: "12px" }}>
            no_match
          </div>
        )}
      </div>
    </>
  );

  if (embedded) return body;

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Compare across OSes</h1>
          <p className="page-lede">Same action. Three keyboards. One row.</p>
        </div>
        <input
          className="page-filter"
          placeholder="filter…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      {body}
    </div>
  );
}
