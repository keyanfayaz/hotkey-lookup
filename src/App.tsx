import { useCallback, useEffect, useMemo, useState } from "react";
import { useOS } from "./hooks/useOS";
import { useTheme } from "./hooks/useTheme";
import { SHORTCUTS, APPS } from "./data";
import type { OS, Shortcut } from "./lib/types";
import { Palette } from "./components/Palette";
import { Keyboard, comboToKeySet } from "./components/Keyboard";
import { Browse } from "./components/Browse";
import { Cheatsheet } from "./components/Cheatsheet";
import { ListenOverlay } from "./components/ListenOverlay";
import { ShortcutModal } from "./components/ShortcutModal";
import { OSIcon } from "./components/AppIcon";

type View =
  | { kind: "home" }
  | { kind: "browse" }
  | { kind: "cheatsheet"; appId: string };

function ThemeIcon({ theme }: { theme: string }) {
  if (theme === "dark") {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z" />
    </svg>
  );
}

const OS_LABELS: Record<OS, string> = {
  macos: "macOS",
  windows: "Windows",
  linux: "Linux",
};

export default function App() {
  const { choice: os, setChoice: setOs } = useOS();
  const { theme, toggle: toggleTheme } = useTheme();
  const [view, setView] = useState<View>({ kind: "home" });
  const [listen, setListen] = useState(false);
  const [focusedShortcut, setFocusedShortcut] = useState<Shortcut | null>(null);
  const [selectedShortcut, setSelectedShortcut] = useState<Shortcut | null>(null);

  // Apply accent default on mount
  useEffect(() => {
    if (!document.documentElement.dataset.accent) {
      document.documentElement.dataset.accent = "amber";
    }
  }, []);

  // Global "L" key → listen mode
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (listen) return;
      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase() ?? "";
      if (tag === "input" || tag === "textarea") return;
      if (e.key === "l" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        setListen(true);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [listen]);

  const onPick = useCallback(
    (s: Shortcut) => setSelectedShortcut(s),
    [],
  );

  // Keyboard visualizer highlight from focused palette row
  const highlighted = useMemo(() => {
    if (!focusedShortcut) return new Set<string>();
    const combos = focusedShortcut.combos[os] ?? [];
    if (combos.length === 0) return new Set<string>();
    return comboToKeySet(combos[0]);
  }, [focusedShortcut, os]);

  return (
    <>
      {/* Top bar */}
      <header className="topbar">
        <button className="brand" onClick={() => setView({ kind: "home" })}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
            <rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="7" cy="12" r="0.9" fill="currentColor" />
            <circle cx="11" cy="12" r="0.9" fill="currentColor" />
            <circle cx="15" cy="12" r="0.9" fill="currentColor" />
            <rect x="6" y="14.5" width="11" height="1.2" rx="0.3" fill="currentColor" />
          </svg>
          <span className="brand-name">
            hotkey<span className="brand-dot">.</span>lookup
          </span>
        </button>

        <nav className="topnav">
          <button
            className={`topnav-btn${view.kind === "home" ? " on" : ""}`}
            onClick={() => setView({ kind: "home" })}
          >
            Search
          </button>
          <button
            className={`topnav-btn${view.kind === "browse" || view.kind === "cheatsheet" ? " on" : ""}`}
            onClick={() => setView({ kind: "browse" })}
          >
            Browse
          </button>
          <button
            className="topnav-btn topnav-listen"
            onClick={() => setListen(true)}
            title="Press any combo to identify it"
          >
            <span className="rec-dot" /> Listen
          </button>
        </nav>

        <div className="topright">
          <div className="osswitch" role="tablist" aria-label="Operating system">
            {(["macos", "windows", "linux"] as OS[]).map((o) => (
              <button
                key={o}
                role="tab"
                aria-selected={os === o}
                className={`osswitch-btn${os === o ? " on" : ""}`}
                onClick={() => {
                  setOs(o);
                  setView({ kind: "cheatsheet", appId: `system-${o}` });
                }}
                title={`View ${OS_LABELS[o]} system shortcuts`}
              >
                <OSIcon os={o} size={13} />
                {OS_LABELS[o]}
              </button>
            ))}
          </div>
          <button
            className="iconbtn"
            onClick={toggleTheme}
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            <ThemeIcon theme={theme} />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main style={{ flex: 1 }}>
        {view.kind === "home" && (
          <HomeView
            os={os}
            onPick={onPick}
            onPickApp={(appId) => setView({ kind: "cheatsheet", appId })}
            highlighted={highlighted}
            onFocusedShortcut={setFocusedShortcut}
          />
        )}
        {view.kind === "browse" && (
          <Browse
            onSelect={(appId) => setView({ kind: "cheatsheet", appId })}
          />
        )}
        {view.kind === "cheatsheet" && (
          <Cheatsheet
            appId={view.appId}
            os={os}
            onBack={() => setView({ kind: "browse" })}
            onSelectShortcut={setSelectedShortcut}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="foot">
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-3)" }}>
          hotkey.lookup · {SHORTCUTS.length} bindings · {APPS.length} surfaces
        </span>
        <span className="foot-keys">
          <kbd className="keychip dim">L</kbd>
          <span style={{ color: "var(--fg-3)" }}>listen</span>
          <span className="dot-sep">·</span>
          <kbd className="keychip dim">/</kbd>
          <span style={{ color: "var(--fg-3)" }}>search</span>
        </span>
      </footer>

      {/* Listen overlay */}
      {listen && (
        <ListenOverlay
          os={os}
          onClose={() => setListen(false)}
          onSelectApp={(appId) => {
            setListen(false);
            setView({ kind: "cheatsheet", appId });
          }}
        />
      )}

      {/* Shortcut detail modal */}
      {selectedShortcut && (
        <ShortcutModal
          shortcut={selectedShortcut}
          os={os}
          onClose={() => setSelectedShortcut(null)}
          onNavigateToApp={(appId) => {
            setSelectedShortcut(null);
            setView({ kind: "cheatsheet", appId });
          }}
        />
      )}
    </>
  );
}

// ── Home view ──────────────────────────────────────────────────────────────

interface HomeViewProps {
  os: OS;
  onPick: (s: Shortcut) => void;
  onPickApp: (appId: string) => void;
  highlighted: Set<string>;
  onFocusedShortcut: (s: Shortcut | null) => void;
}

function HomeView({
  os,
  onPick,
  onPickApp,
  highlighted,
  onFocusedShortcut,
}: HomeViewProps) {
  const [localFocused, setLocalFocused] = useState<Shortcut | null>(null);

  const handleFocused = (s: Shortcut | null) => {
    setLocalFocused(s);
    onFocusedShortcut(s);
  };

  return (
    <div className="home">
      <div className="home-header">
        <h1 className="home-title">Every shortcut, every OS.</h1>
        <p className="home-sub">Search by name, browse by app, or press a combo to identify it.</p>
      </div>

      <Palette os={os} onPick={onPick} onPickApp={onPickApp} onFocusedShortcut={handleFocused} autoFocus />

      <div className="hero-kb">
        <Keyboard os={os} highlighted={highlighted} />
        <div className="kb-caption">
          {localFocused ? (
            <>
              highlighted:{" "}
              <span className="kb-cap-name">{localFocused.function}</span>
            </>
          ) : (
            "type to search — keys light up below"
          )}
        </div>
      </div>
    </div>
  );
}
