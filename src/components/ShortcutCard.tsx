import { APP_BY_ID } from "../data";
import { ALL_OS, type OS, type Shortcut } from "../lib/types";
import { KeyCombo } from "./KeyCombo";

interface Props {
  shortcut: Shortcut;
  os: OS | null;
}

const OS_LABEL: Record<OS, string> = {
  macos: "macOS",
  windows: "Windows",
  linux: "Linux",
};

export function ShortcutCard({ shortcut, os }: Props) {
  const app = APP_BY_ID[shortcut.appId];
  const osList = os
    ? [os]
    : ALL_OS.filter(
        (o) => app?.supportedOS.includes(o) && (shortcut.combos[o]?.length ?? 0) > 0,
      );

  return (
    <div className="card p-4 sm:p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 inline-flex items-center gap-1.5">
              <span aria-hidden="true">{app?.icon ?? "•"}</span>
              {app?.name ?? shortcut.appId}
            </span>
            {shortcut.category && (
              <span className="text-[11px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {shortcut.category}
              </span>
            )}
          </div>
          <div className="font-semibold text-slate-900 dark:text-slate-100 leading-snug">
            {shortcut.function}
          </div>
          {shortcut.description && (
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {shortcut.description}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        {osList.map((curOS) => {
          const combos = shortcut.combos[curOS];
          if (!combos || combos.length === 0) return null;
          return (
            <div key={curOS} className="flex items-center gap-3 flex-wrap">
              <span className="w-20 shrink-0 text-xs uppercase tracking-wider font-medium text-slate-500 dark:text-slate-400">
                {OS_LABEL[curOS]}
              </span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                {combos.map((c, i) => (
                  <KeyCombo key={i} combo={c} os={curOS} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
