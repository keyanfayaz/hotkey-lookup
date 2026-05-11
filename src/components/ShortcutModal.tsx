import { useEffect, useMemo } from "react";
import { APP_BY_ID } from "../data";
import { comboToKeySet } from "./Palette";
import type { OS, Shortcut } from "../lib/types";
import { KeyCombo } from "./KeyCombo";
import { Keyboard } from "./Keyboard";
import { AppGlyph } from "./AppIcon";

const OS_LABELS: Record<OS, string> = {
  macos: "macOS",
  windows: "Windows",
  linux: "Linux",
};

interface Props {
  shortcut: Shortcut;
  os: OS;
  onClose: () => void;
  onNavigateToApp?: (appId: string) => void;
  onOpenDetail?: (s: Shortcut) => void;
}

export function ShortcutModal({ shortcut, os, onClose, onNavigateToApp, onOpenDetail }: Props) {
  const app = APP_BY_ID[shortcut.appId];

  const currentCombos = shortcut.combos[os] ?? [];

  const highlighted = useMemo(() => {
    if (currentCombos.length === 0) return new Set<string>();
    return comboToKeySet(currentCombos[0]);
  }, [currentCombos]);

  const osCount = (["macos", "windows", "linux"] as OS[]).filter(
    (o) => (shortcut.combos[o] ?? []).length > 0
  ).length;
  const showCrossOs = osCount > 1;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handler, { capture: true });
    return () => window.removeEventListener("keydown", handler, { capture: true });
  }, [onClose]);

  return (
    <div
      className="smodal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={shortcut.function}
    >
      <div className="smodal" onClick={(e) => e.stopPropagation()}>
        <div className="smodal-head">
          <div className="smodal-identity">
            <AppGlyph
              appId={shortcut.appId}
              name={app?.name ?? shortcut.appId}
              onClick={onNavigateToApp}
              title={app ? `Open ${app.name} cheatsheet` : undefined}
            />
            <div>
              <div className="smodal-title">{shortcut.function}</div>
              <div className="smodal-meta">
                {app?.name ?? shortcut.appId}
                {shortcut.category && (
                  <>
                    <span className="dot-sep">·</span>
                    {shortcut.category}
                  </>
                )}
              </div>
            </div>
          </div>
          <button className="smodal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>

        <div className="smodal-body">
          {currentCombos.length > 0 ? (
            <div className="smodal-combos">
              {currentCombos.map((c) => (
                <KeyCombo key={c} combo={c} os={os} />
              ))}
            </div>
          ) : (
            <div className="smodal-no-combo">No hotkey for {OS_LABELS[os]}</div>
          )}

          <Keyboard os={os} highlighted={highlighted} scale={0.85} />

          {showCrossOs && (
            <div className="smodal-cross-os">
              {(["macos", "windows", "linux"] as OS[]).map((o) => {
                const combos = shortcut.combos[o] ?? [];
                return (
                  <div key={o} className="smodal-os-col">
                    <div className="smodal-os-label">{OS_LABELS[o]}</div>
                    {combos.length > 0 ? (
                      <KeyCombo combo={combos[0]} os={o} />
                    ) : (
                      <span className="keys-na">—</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {shortcut.description && (
            <p className="smodal-desc">{shortcut.description}</p>
          )}

          {onOpenDetail && (
            <button className="smodal-detail-link" onClick={() => onOpenDetail(shortcut)}>
              Open detail page →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
