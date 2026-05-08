import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyCombo, Modifier } from "../lib/types";

const MOD_KEYS = new Set([
  "Control",
  "Shift",
  "Alt",
  "Meta",
  "OS",
  "Hyper",
  "Super",
]);

const normalizeEventKey = (e: KeyboardEvent): string => {
  const k = e.key;
  if (k === " ") return "space";
  if (k.length === 1) return k.toLowerCase();
  return k.toLowerCase();
};

const collectMods = (e: KeyboardEvent): Modifier[] => {
  const mods: Modifier[] = [];
  if (e.ctrlKey) mods.push("ctrl");
  if (e.altKey) mods.push("alt");
  if (e.shiftKey) mods.push("shift");
  if (e.metaKey) mods.push("meta");
  return mods;
};

export function useKeyCapture(): {
  combo: KeyCombo | null;
  active: boolean;
  setActive: (v: boolean) => void;
  clear: () => void;
  ref: React.RefObject<HTMLDivElement>;
} {
  const [combo, setCombo] = useState<KeyCombo | null>(null);
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const clear = useCallback(() => setCombo(null), []);

  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        setCombo(null);
        setActive(false);
        return;
      }
      if (MOD_KEYS.has(e.key)) return;
      const mods = collectMods(e);
      const key = normalizeEventKey(e);
      if (key.length === 0) return;
      e.preventDefault();
      e.stopPropagation();
      setCombo({ mods, key });
    };
    window.addEventListener("keydown", handler, { capture: true });
    return () => window.removeEventListener("keydown", handler, { capture: true });
  }, [active]);

  return { combo, active, setActive, clear, ref };
}
