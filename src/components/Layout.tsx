import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useOS } from "../hooks/useOS";
import { useTheme } from "../hooks/useTheme";
import { SHORTCUTS, APPS } from "../data";
import type { OS, Shortcut } from "../lib/types";
import { OSIcon } from "./AppIcon";
import { ListenOverlay } from "./ListenOverlay";
import { ShortcutModal } from "./ShortcutModal";
import { EmailSignup } from "./EmailSignup";
import { shortcutPath } from "../lib/slugs";

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

export default function Layout() {
  const { choice: os, setChoice: setOs } = useOS();
  const { theme, toggle: toggleTheme } = useTheme();
  const [listen, setListen] = useState(false);
  const [selectedShortcut, setSelectedShortcut] = useState<Shortcut | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!document.documentElement.dataset.accent) {
      document.documentElement.dataset.accent = "amber";
    }
  }, []);

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

  const browseActive = location.pathname.startsWith("/browse") ||
    location.pathname.startsWith("/apps");
  const homeActive = location.pathname === "/";

  const onOSClick = useCallback(
    (o: OS) => {
      setOs(o);
      navigate(`/os/${o}`);
    },
    [navigate, setOs],
  );

  return (
    <>
      <header className="topbar">
        <Link className="brand" to="/">
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
        </Link>

        <nav className="topnav">
          <NavLink to="/" className={`topnav-btn${homeActive ? " on" : ""}`}>
            Search
          </NavLink>
          <NavLink to="/browse" className={`topnav-btn${browseActive ? " on" : ""}`}>
            Browse
          </NavLink>
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
                onClick={() => onOSClick(o)}
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

      <main style={{ flex: 1 }}>
        <Outlet context={{ os, setSelectedShortcut, setListen }} />
      </main>

      <footer className="foot">
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-3)" }}>
          hotkey.lookup · {SHORTCUTS.length} hotkeys · {APPS.length} apps
          <span className="dot-sep" style={{ margin: "0 8px" }}>·</span>
          an app by{" "}
          <a
            href="https://kfayaz.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            Keyan Fayaz
          </a>
        </span>
        <EmailSignup />
        <span className="foot-keys">
          <kbd className="keychip dim">L</kbd>
          <span style={{ color: "var(--fg-3)" }}>listen</span>
          <span className="dot-sep">·</span>
          <kbd className="keychip dim">/</kbd>
          <span style={{ color: "var(--fg-3)" }}>search</span>
        </span>
      </footer>

      {listen && (
        <ListenOverlay
          os={os}
          onClose={() => setListen(false)}
          onSelectApp={(appId) => {
            setListen(false);
            navigate(`/apps/${appId}/${os}`);
          }}
        />
      )}

      {selectedShortcut && (
        <ShortcutModal
          shortcut={selectedShortcut}
          os={os}
          onClose={() => setSelectedShortcut(null)}
          onNavigateToApp={(appId) => {
            setSelectedShortcut(null);
            navigate(`/apps/${appId}/${os}`);
          }}
          onOpenDetail={(s) => {
            setSelectedShortcut(null);
            navigate(shortcutPath(s));
          }}
        />
      )}
    </>
  );
}

export interface LayoutContext {
  os: OS;
  setSelectedShortcut: (s: Shortcut | null) => void;
  setListen: (b: boolean) => void;
}
