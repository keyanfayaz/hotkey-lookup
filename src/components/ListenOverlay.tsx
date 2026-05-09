import { useCallback, useEffect, useMemo, useState } from "react";
import { SHORTCUTS, APP_BY_ID } from "../data";
import { parseCombo, comboKey } from "../lib/normalize";
import type { OS, Shortcut } from "../lib/types";
import { KeyCombo } from "./KeyCombo";
import { Keyboard } from "./Keyboard";
import { AppGlyph } from "./AppIcon";

const MODIFIERS = new Set(["shift", "ctrl", "alt", "mod", "meta"]);

// Combos the OS or browser intercepts before our keydown listener fires
type LockedCombo = { combo: string; label: string; danger?: true };

const SYSTEM_LOCKED: Record<OS, LockedCombo[]> = {
  macos: [
    { combo: "⌘Q",      label: "Quit",         danger: true },
    { combo: "⌘W",      label: "Close window", danger: true },
    { combo: "⌘H",      label: "Hide app" },
    { combo: "⌘M",      label: "Minimize" },
    { combo: "⌘Tab",    label: "Switch apps" },
    { combo: "⌘Space",  label: "Spotlight" },
  ],
  windows: [
    { combo: "Alt+F4",       label: "Close",         danger: true },
    { combo: "Win+L",        label: "Lock screen",   danger: true },
    { combo: "Win+D",        label: "Show desktop" },
    { combo: "Ctrl+Alt+Del", label: "Task manager",  danger: true },
    { combo: "Alt+Tab",      label: "Switch apps" },
  ],
  linux: [
    { combo: "Alt+F4",       label: "Close",         danger: true },
    { combo: "Ctrl+Alt+Del", label: "Log out",       danger: true },
    { combo: "Super+L",      label: "Lock screen",   danger: true },
    { combo: "Super+D",      label: "Show desktop" },
    { combo: "Alt+Tab",      label: "Switch apps" },
  ],
};

// Browser-level interceptions (apply to all OS)
const BROWSER_LOCKED: LockedCombo[] = [
  { combo: "⌘T / Ctrl+T", label: "New tab" },
  { combo: "⌘N / Ctrl+N", label: "New window" },
  { combo: "⌘R / Ctrl+R", label: "Reload" },
  { combo: "⌘W / Ctrl+W", label: "Close tab",  danger: true },
];

function normalizeEventKey(e: KeyboardEvent): string {
  const k = e.key;
  if (k === "Control") return "ctrl";
  if (k === "Shift") return "shift";
  if (k === "Alt") return "alt";
  if (k === "Meta") return "mod";
  if (k === " ") return "space";
  if (k === "Escape") return "esc";
  if (k === "Enter") return "enter";
  if (k === "Backspace") return "backspace";
  if (k === "Tab") return "tab";
  if (k === "ArrowUp") return "up";
  if (k === "ArrowDown") return "down";
  if (k === "ArrowLeft") return "left";
  if (k === "ArrowRight") return "right";
  return k.toLowerCase();
}

function tokenToComboStr(tokens: Set<string>): string {
  const mods: string[] = [];
  let key = "";
  for (const t of tokens) {
    if (MODIFIERS.has(t)) mods.push(t);
    else key = t;
  }
  const modStrs = mods.map((m) => {
    if (m === "mod" || m === "meta") return "Cmd";
    if (m === "ctrl") return "Ctrl";
    if (m === "alt") return "Alt";
    if (m === "shift") return "Shift";
    return m;
  });
  const keyStr =
    key === "up" ? "Up" :
    key === "down" ? "Down" :
    key === "left" ? "Left" :
    key === "right" ? "Right" :
    key;
  return [...modStrs, keyStr].join("+");
}

function matchShortcuts(tokens: Set<string>, os: OS): Shortcut[] {
  if (tokens.size === 0) return [];
  const comboStr = tokenToComboStr(tokens);
  const parsed = parseCombo(comboStr);
  if (!parsed) return [];
  const targetKey = comboKey(parsed);
  return SHORTCUTS.filter((sc) => {
    const combos = sc.combos[os] ?? [];
    return combos.some((raw) => {
      const p = parseCombo(raw);
      return p && comboKey(p) === targetKey;
    });
  });
}

function pressedToDisplayStr(tokens: Set<string>, os: OS): string {
  const mods: string[] = [];
  let key = "";
  for (const t of tokens) {
    if (MODIFIERS.has(t)) mods.push(t);
    else key = t;
  }
  const modStrs = mods.map((m) => {
    if (m === "mod" || m === "meta") return os === "macos" ? "Cmd" : "Ctrl";
    if (m === "ctrl") return "Ctrl";
    if (m === "alt") return "Alt";
    if (m === "shift") return "Shift";
    return m;
  });
  const keyPart = key === "up" ? "Up" : key === "down" ? "Down" : key === "left" ? "Left" : key === "right" ? "Right" : key;
  return [...modStrs, keyPart].filter(Boolean).join("+");
}

interface Props {
  os: OS;
  onClose: () => void;
  onSelectApp?: (appId: string) => void;
}

export function ListenOverlay({ os, onClose, onSelectApp }: Props) {
  // "idle"   — awaiting first keypress
  // "pressing" — modifier(s) held, waiting for a non-modifier key
  // "locked" — combo captured; results shown; click anywhere to re-arm
  const [phase, setPhase] = useState<"idle" | "pressing" | "locked">("idle");
  const [pressed, setPressed] = useState<Set<string>>(new Set());
  const [locked, setLocked] = useState<Set<string> | null>(null);

  const reset = useCallback(() => {
    setPhase("idle");
    setPressed(new Set());
    setLocked(null);
  }, []);

  const handleDown = useCallback(
    (e: KeyboardEvent) => {
      // Esc with no modifiers always closes
      if (e.key === "Escape" && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        return;
      }
      e.preventDefault();
      e.stopPropagation();

      // While locked, any keypress re-arms (same as clicking)
      if (phase === "locked") {
        reset();
        return;
      }

      if (e.repeat) return;
      const tok = normalizeEventKey(e);

      setPressed((prev) => {
        const next = new Set(prev);
        next.add(tok);
        return next;
      });

      if (!MODIFIERS.has(tok)) {
        // Non-modifier pressed — lock the combo immediately
        setPressed((prev) => {
          const snap = new Set(prev);
          snap.add(tok);
          setLocked(snap);
          setPhase("locked");
          return snap;
        });
      } else {
        setPhase("pressing");
      }
    },
    [phase, onClose, reset],
  );

  const handleUp = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (phase === "locked") return;
      const tok = normalizeEventKey(e);
      setPressed((prev) => {
        const next = new Set(prev);
        next.delete(tok);
        return next;
      });
    },
    [phase],
  );

  useEffect(() => {
    const opts = { capture: true } as AddEventListenerOptions;
    window.addEventListener("keydown", handleDown, opts);
    window.addEventListener("keyup", handleUp, opts);
    const onBlur = () => { if (phase !== "locked") setPressed(new Set()); };
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", handleDown, opts);
      window.removeEventListener("keyup", handleUp, opts);
      window.removeEventListener("blur", onBlur);
    };
  }, [handleDown, handleUp, phase]);

  const active = phase === "locked" ? locked : pressed;
  const matches = useMemo(() => (active && active.size > 0 ? matchShortcuts(active, os) : []), [active, os]);
  const displayStr = active && active.size > 0 ? pressedToDisplayStr(active, os) : "";

  const kbHighlighted = useMemo(() => {
    const set = new Set<string>();
    if (active) {
      for (const t of active) {
        set.add(t === "mod" || t === "meta" ? "mod" : t);
      }
    }
    return set;
  }, [active]);

  return (
    <div
      className="listen-overlay"
      role="dialog"
      aria-modal
      aria-label="Listen mode"
      onClick={phase === "locked" ? reset : undefined}
    >
      <div className="listen-head" onClick={(e) => e.stopPropagation()}>
        <div className="listen-title">
          <span className="rec-dot rec-dot-lg" />
          {phase === "locked" ? "Identified" : "Listening"}
        </div>
        <button className="ghost-btn" onClick={onClose}>
          <span>Stop</span>
          <kbd className="keychip dim">Esc</kbd>
        </button>
      </div>

      <div className="listen-body" onClick={(e) => e.stopPropagation()}>
        <div className="listen-prompt">
          {phase === "idle" ? (
            <span>Press any keyboard combo. We'll tell you what it does — everywhere.</span>
          ) : displayStr ? (
            <KeyCombo combo={displayStr} os={os} />
          ) : null}
        </div>

        <div className="listen-results">
          {phase === "idle" && (
            <div className="listen-placeholder">awaiting_keys…</div>
          )}
          {phase === "pressing" && (
            <div className="listen-placeholder">waiting for key…</div>
          )}
          {phase === "locked" && matches.length === 0 && (
            <div className="listen-placeholder">
              no_known_hotkey for this combo on {os.toUpperCase()}
            </div>
          )}
          {matches.map((s) => {
            const app = APP_BY_ID[s.appId];
            return (
              <div key={s.id} className="match-row">
                <AppGlyph
                  appId={s.appId}
                  name={app?.name ?? s.appId}
                  onClick={onSelectApp}
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
              </div>
            );
          })}
        </div>

        {phase === "locked" && (
          <div className="listen-try-again">
            press any key or click to try another
          </div>
        )}

        <Keyboard os={os} highlighted={kbHighlighted} scale={0.85} />

        {phase !== "locked" && (
          <div className="listen-notice">
            <div className="ln-header">
              <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <circle cx="8" cy="8" r="6.5" />
                <path d="M8 5v3.5M8 11h.01" strokeLinecap="round" />
              </svg>
              Some combos can't be detected — the OS or browser captures them first
            </div>
            <div className="ln-groups">
              <div className="ln-group">
                <span className="ln-group-label">{os === "macos" ? "macOS" : os === "windows" ? "Windows" : "Linux"}</span>
                <div className="ln-chips">
                  {SYSTEM_LOCKED[os].map((c) => (
                    <span key={c.combo} className={`ln-chip${c.danger ? " danger" : ""}`}>
                      <span className="ln-combo">{c.combo}</span>
                      <span className="ln-label">{c.label}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="ln-group">
                <span className="ln-group-label">Browser</span>
                <div className="ln-chips">
                  {BROWSER_LOCKED.map((c) => (
                    <span key={c.combo} className={`ln-chip${c.danger ? " danger" : ""}`}>
                      <span className="ln-combo">{c.combo}</span>
                      <span className="ln-label">{c.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
