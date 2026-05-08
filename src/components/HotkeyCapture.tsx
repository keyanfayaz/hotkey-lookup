import { useMemo } from "react";
import { SHORTCUTS } from "../data";
import { useKeyCapture } from "../hooks/useKeyCapture";
import { activeOS, type OSChoice } from "../hooks/useOS";
import { comboTokens } from "../lib/normalize";
import { shortcutMatchesCombo } from "../lib/match";
import type { OS } from "../lib/types";
import { ShortcutCard } from "./ShortcutCard";

interface Props {
  osChoice: OSChoice;
}

const displayOS = (osChoice: OSChoice): OS =>
  osChoice === "all" ? "macos" : osChoice;

export function HotkeyCapture({ osChoice }: Props) {
  const { combo, active, setActive, clear } = useKeyCapture();
  const os = activeOS(osChoice);

  const matches = useMemo(() => {
    if (!combo) return [];
    return SHORTCUTS.filter((s) => shortcutMatchesCombo(s, combo, os));
  }, [combo, os]);

  const previewOS = displayOS(osChoice);
  const tokens = combo ? comboTokens(combo, previewOS) : null;

  return (
    <div className="space-y-5">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setActive(true)}
        onBlur={() => setActive(false)}
        onFocus={() => setActive(true)}
        className={`card p-8 text-center cursor-text outline-none
          ${active ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-950" : ""}`}
        aria-label="Press a keyboard shortcut to identify it"
      >
        {!combo && (
          <>
            <div className="text-3xl mb-2">⌨️</div>
            <div className="font-semibold text-slate-700 dark:text-slate-200">
              {active ? "Listening… press any combo." : "Click here, then press a shortcut"}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              We'll show every app that uses it. <kbd className="kbd kbd-mod">Esc</kbd> to clear.
            </div>
          </>
        )}
        {combo && tokens && (
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              You pressed
            </div>
            <div className="flex justify-center items-center gap-1.5 flex-wrap">
              {tokens.map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1.5">
                  {i > 0 && <span className="kbd-plus">+</span>}
                  <kbd
                    className={`kbd ${t.type === "mod" ? "kbd-mod" : ""} animate-pulseKey text-base`}
                  >
                    {t.label}
                  </kbd>
                </span>
              ))}
            </div>
            <div className="flex justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  clear();
                  setActive(true);
                }}
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Try another
              </button>
            </div>
          </div>
        )}
      </div>

      {!active && !combo && (
        <div className="text-xs text-center text-slate-400 dark:text-slate-500">
          Tip: some combos like <kbd className="kbd kbd-mod">⌘</kbd>+
          <kbd className="kbd">Q</kbd> are intercepted by your OS before the
          browser sees them — search by name in the other tab if capture won't
          stick.
        </div>
      )}

      {combo && (
        <div>
          {matches.length === 0 ? (
            <div className="card p-8 text-center text-slate-500 dark:text-slate-400">
              <div className="text-2xl mb-2">🕵️</div>
              <div className="font-medium text-slate-700 dark:text-slate-300">
                No known matches.
              </div>
              <div className="text-sm mt-1">
                Either nothing in the catalog uses that combo, or it's app-specific
                and we don't have it yet — contributions welcome!
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {matches.length} match{matches.length === 1 ? "" : "es"}
                {os ? ` on ${os === "macos" ? "macOS" : os === "windows" ? "Windows" : "Linux"}` : " across all OSes"}
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {matches.map((s) => (
                  <ShortcutCard key={s.id} shortcut={s} os={os} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
