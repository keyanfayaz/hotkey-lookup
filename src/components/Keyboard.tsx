import type { OS } from "../lib/types";
import { parseCombo } from "../lib/normalize";

const KB_ROWS_MAC = [
  ["esc","f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12"],
  ["`","1","2","3","4","5","6","7","8","9","0","-","=","backspace"],
  ["tab","q","w","e","r","t","y","u","i","o","p","[","]","\\"],
  ["caps","a","s","d","f","g","h","j","k","l",";","'","return"],
  ["shift","z","x","c","v","b","n","m",",",".","/","shift"],
  ["fn","ctrl","alt","mod","space","mod","alt","left","up","down","right"],
];

const KB_ROWS_WIN = [
  ["esc","f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12"],
  ["`","1","2","3","4","5","6","7","8","9","0","-","=","backspace"],
  ["tab","q","w","e","r","t","y","u","i","o","p","[","]","\\"],
  ["caps","a","s","d","f","g","h","j","k","l",";","'","return"],
  ["shift","z","x","c","v","b","n","m",",",".","/","shift"],
  ["ctrl","win","alt","space","alt","win","ctrl","left","up","down","right"],
];

const SPECIAL_W: Record<string, number> = {
  backspace: 1.6, tab: 1.4, caps: 1.7, return: 1.8,
  shift: 2.2, ctrl: 1.2, alt: 1.1, mod: 1.2, win: 1.2,
  fn: 1, space: 5.6, esc: 1.1,
};

const MOD_KEYS = new Set(["esc","tab","caps","return","shift","ctrl","alt","mod","fn","win","backspace","space","left","right","up","down"]);

function glyphFor(token: string, os: OS): string {
  const t = token.toLowerCase();
  if (os === "macos") {
    const m: Record<string, string> = {
      mod: "⌘", ctrl: "⌃", alt: "⌥", shift: "⇧", return: "↵", enter: "↵",
      tab: "⇥", esc: "esc", backspace: "⌫", space: "space",
      fn: "fn", left: "←", right: "→", up: "↑", down: "↓", caps: "caps",
    };
    return m[t] ?? t.toUpperCase();
  }
  const m: Record<string, string> = {
    mod: "Ctrl", ctrl: "Ctrl", alt: "Alt", shift: "Shift", win: "⊞",
    return: "↵", enter: "↵", tab: "Tab", esc: "Esc", backspace: "⌫",
    space: "Space", fn: "Fn", left: "←", right: "→", up: "↑", down: "↓", caps: "Caps",
  };
  return m[t] ?? t.toUpperCase();
}

export function comboToKeySet(comboStr: string): Set<string> {
  const set = new Set<string>();
  const parsed = parseCombo(comboStr);
  if (!parsed) return set;
  for (const m of parsed.mods) {
    set.add(m === "meta" ? "mod" : m);
  }
  const k = parsed.key.toLowerCase();
  const arrowMap: Record<string, string> = {
    arrowup: "up", arrowdown: "down", arrowleft: "left", arrowright: "right",
  };
  set.add(arrowMap[k] ?? k);
  return set;
}

interface Props {
  os: OS;
  highlighted?: Set<string>;
  scale?: number;
}

export function Keyboard({ os, highlighted = new Set(), scale = 1 }: Props) {
  const rows = os === "macos" ? KB_ROWS_MAC : KB_ROWS_WIN;

  return (
    <div className="kb" style={{ "--kb-scale": scale } as React.CSSProperties}>
      {rows.map((row, ri) => (
        <div key={ri} className={`kb-row r${ri}`}>
          {row.map((k, ki) => {
            const w = SPECIAL_W[k] ?? 1;
            const isHi = highlighted.has(k.toLowerCase());
            const isMod = MOD_KEYS.has(k.toLowerCase());
            return (
              <div
                key={ki}
                className={["kb-key", isMod ? "is-mod" : "", isHi ? "hi" : ""].filter(Boolean).join(" ")}
                style={{ "--w": w } as React.CSSProperties}
              >
                <span>{glyphFor(k, os)}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
