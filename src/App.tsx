import { useState } from "react";
import { FunctionSearch } from "./components/FunctionSearch";
import { HotkeyCapture } from "./components/HotkeyCapture";
import { ModeTabs, type Mode } from "./components/ModeTabs";
import { OSSelector } from "./components/OSSelector";
import { useOS } from "./hooks/useOS";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { choice, setChoice, detected } = useOS();
  const { theme, toggle } = useTheme();
  const [mode, setMode] = useState<Mode>("find");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <a href="/" className="flex items-center gap-2.5 group min-w-0">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 text-white text-lg font-bold shadow-sm group-hover:scale-105 transition-transform shrink-0">
              ⌘
            </span>
            <div className="min-w-0">
              <div className="font-bold text-base sm:text-lg leading-tight truncate">
                Hotkey Lookup
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight hidden sm:block">
                Find any shortcut, on any OS.
              </div>
            </div>
          </a>
          <div className="flex items-center gap-2">
            <OSSelector
              value={choice}
              onChange={setChoice}
              detected={detected}
            />
            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle dark mode"
              title={theme === "dark" ? "Switch to light" : "Switch to dark"}
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:border-slate-700"
            >
              <span aria-hidden="true">{theme === "dark" ? "☀️" : "🌙"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
        <ModeTabs value={mode} onChange={setMode} />

        <section>
          {mode === "find" ? (
            <FunctionSearch osChoice={choice} />
          ) : (
            <HotkeyCapture osChoice={choice} />
          )}
        </section>
      </main>

      <footer className="border-t border-slate-200/80 dark:border-slate-800/80 mt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
          <div>
            Made with ⌨️ and ☕. Open source — contributions welcome.
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com/"
              className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.alert(
                  "Add a shortcut by editing src/data/shortcuts/<app>.ts and opening a PR. See CONTRIBUTING.md.",
                );
              }}
              className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              Add a shortcut
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
