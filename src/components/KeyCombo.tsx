import { Fragment } from "react";
import { comboTokens, parseCombo } from "../lib/normalize";
import type { OS } from "../lib/types";

interface Props {
  combo: string;
  os: OS;
  dim?: boolean;
  pulse?: boolean;
}

const WIDE_KEYS = new Set([
  "shift", "return", "enter", "space", "tab", "backspace",
  "esc", "escape", "delete", "del",
]);

export function KeyCombo({ combo, os, dim, pulse }: Props) {
  const segments = combo.trim().split(/\s+/);
  return (
    <span className="keycombo">
      {segments.map((seg, segIdx) => {
        const parsed = parseCombo(seg);
        if (!parsed) {
          return (
            <kbd key={segIdx} className={`keychip${dim ? " dim" : ""}${pulse ? " animate-pulseKey" : ""}`}>
              {seg}
            </kbd>
          );
        }
        const tokens = comboTokens(parsed, os);
        return (
          <Fragment key={segIdx}>
            {segIdx > 0 && (
              <span style={{ color: "var(--fg-4)", fontSize: "11px", fontFamily: "var(--font-mono)", margin: "0 4px" }}>
                then
              </span>
            )}
            <span className="keycombo">
              {tokens.map((t, i) => {
                const isWide = WIDE_KEYS.has(t.label.toLowerCase());
                return (
                  <Fragment key={i}>
                    {i > 0 && <span className="kc-sep">+</span>}
                    <kbd
                      className={[
                        "keychip",
                        dim ? "dim" : "",
                        isWide ? "wide" : "",
                        pulse ? "animate-pulseKey" : "",
                      ].filter(Boolean).join(" ")}
                    >
                      {t.label}
                    </kbd>
                  </Fragment>
                );
              })}
            </span>
          </Fragment>
        );
      })}
    </span>
  );
}
