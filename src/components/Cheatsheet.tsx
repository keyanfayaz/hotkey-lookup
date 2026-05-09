import { SHORTCUTS, APP_BY_ID, APPS } from "../data";
import type { OS, Shortcut } from "../lib/types";
import { KeyCombo } from "./KeyCombo";
import { AppGlyph } from "./AppIcon";

interface Props {
  appId: string;
  os: OS;
  onBack: () => void;
  onSelectShortcut: (s: Shortcut) => void;
  onSelectApp?: (appId: string) => void;
}

function platformOs(appId: string): OS | null {
  if (appId === "system-macos") return "macos";
  if (appId === "system-windows") return "windows";
  if (appId === "system-linux") return "linux";
  return null;
}

export function Cheatsheet({ appId, os, onBack, onSelectShortcut, onSelectApp }: Props) {
  const app = APP_BY_ID[appId];
  const items = SHORTCUTS.filter((s) => s.appId === appId);
  const cats = [...new Set(items.map((s) => s.category).filter(Boolean))] as string[];
  const platform = platformOs(appId);

  const sidebarApps = platform
    ? APPS.filter((a) => !a.id.startsWith("system-") && a.supportedOS.includes(platform))
    : [];

  if (!app) {
    return (
      <div className="page">
        <button className="back-btn" onClick={onBack}>← Browse</button>
        <p style={{ color: "var(--fg-3)" }}>App not found.</p>
      </div>
    );
  }

  const shortcuts = (
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
      {cats.length === 0 && items.length > 0 && (
        <div className="cheat-list">
          {items.map((s) => {
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
      )}
      {items.length === 0 && (
        <p style={{ color: "var(--fg-3)", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
          No shortcuts for this app yet.
        </p>
      )}
    </div>
  );

  return (
    <div className="page">
      <button className="back-btn" onClick={onBack}>← Browse</button>
      <div className="cheat-hero">
        <AppGlyph appId={app.id} name={app.name} size="lg" />
        <div className="cheat-hero-text">
          <h1>{app.name}</h1>
          <p className="page-lede">
            {items.length} shortcuts{cats.length > 0 ? ` · ${cats.length} categories` : ""}
            {app.hint && <> · {app.hint}</>}
          </p>
        </div>
      </div>

      {sidebarApps.length > 0 ? (
        <div className="cheat-with-sidebar">
          <div className="cheat-main">{shortcuts}</div>
          <aside className="cheat-sidebar">
            <div className="cheat-sidebar-head">Apps for {app.name}</div>
            <div className="cheat-sidebar-list">
              {sidebarApps.map((a) => (
                <button
                  key={a.id}
                  className="cheat-sidebar-row"
                  onClick={() => onSelectApp?.(a.id)}
                >
                  <AppGlyph appId={a.id} name={a.name} />
                  <div className="cheat-sidebar-text">
                    <div className="cheat-sidebar-name">{a.name}</div>
                    {a.hint && <div className="cheat-sidebar-hint">{a.hint}</div>}
                  </div>
                  <span className="cheat-sidebar-arrow">→</span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      ) : shortcuts}
    </div>
  );
}
