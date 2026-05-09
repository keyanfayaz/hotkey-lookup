import { SHORTCUTS, APP_BY_ID } from "../data";
import type { OS, Shortcut } from "../lib/types";
import { KeyCombo } from "./KeyCombo";
import { AppGlyph } from "./AppIcon";

interface Props {
  appId: string;
  os: OS;
  onBack: () => void;
  onSelectShortcut: (s: Shortcut) => void;
}

export function Cheatsheet({ appId, os, onBack, onSelectShortcut }: Props) {
  const app = APP_BY_ID[appId];
  const items = SHORTCUTS.filter((s) => s.appId === appId);
  const cats = [...new Set(items.map((s) => s.category).filter(Boolean))] as string[];

  if (!app) {
    return (
      <div className="page">
        <button className="back-btn" onClick={onBack}>← Browse</button>
        <p style={{ color: "var(--fg-3)" }}>App not found.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <button className="back-btn" onClick={onBack}>← Browse</button>
      <div className="cheat-hero">
        <AppGlyph appId={app.id} name={app.name} size="lg" />
        <div className="cheat-hero-text">
          <h1>{app.name}</h1>
          <p className="page-lede">
            {items.length} shortcuts · {cats.length} categories
            {app.hint && <> · {app.hint}</>}
          </p>
        </div>
        <span className="os-chip" aria-label={`OS ${os}`}>{os.toUpperCase()}</span>
      </div>

      <div className="cheat-grid">
        {cats.map((cat) => {
          const inCat = items.filter((s) => s.category === cat);
          if (inCat.length === 0) return null;
          return (
            <section key={cat} className="cheat-section">
              <h2>{cat}</h2>
              <div className="cheat-list">
                {inCat.map((s) => {
                  const combos = s.combos[os] ?? [];
                  return (
                    <button key={s.id} className="cheat-row" onClick={() => onSelectShortcut(s)}>
                      <span className="cheat-name">{s.function}</span>
                      <span>
                        {combos.length > 0 ? (
                          <KeyCombo combo={combos[0]} os={os} />
                        ) : (
                          <span className="keys-na">—</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}

        {cats.length === 0 && (
          <p style={{ color: "var(--fg-3)", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
            No shortcuts for this app yet.
          </p>
        )}
      </div>
    </div>
  );
}
