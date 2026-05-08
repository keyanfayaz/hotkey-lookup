import { Fragment } from "react";
import { comboTokens, parseCombo } from "../lib/normalize";
import type { OS } from "../lib/types";

interface Props {
  combo: string;
  os: OS;
  pulse?: boolean;
}

export function KeyCombo({ combo, os, pulse }: Props) {
  // Combos like "Cmd+K Z" are "chord" sequences — split on space.
  const segments = combo.trim().split(/\s+/);
  return (
    <span className="inline-flex items-center gap-1.5 flex-wrap">
      {segments.map((seg, segIdx) => {
        const parsed = parseCombo(seg);
        if (!parsed) {
          return (
            <span key={segIdx} className="kbd">
              {seg}
            </span>
          );
        }
        const tokens = comboTokens(parsed, os);
        return (
          <Fragment key={segIdx}>
            {segIdx > 0 && (
              <span className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                then
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              {tokens.map((t, i) => (
                <Fragment key={i}>
                  {i > 0 && <span className="kbd-plus">+</span>}
                  <kbd
                    className={`kbd ${t.type === "mod" ? "kbd-mod" : ""} ${
                      pulse ? "animate-pulseKey" : ""
                    }`}
                  >
                    {t.label}
                  </kbd>
                </Fragment>
              ))}
            </span>
          </Fragment>
        );
      })}
    </span>
  );
}
