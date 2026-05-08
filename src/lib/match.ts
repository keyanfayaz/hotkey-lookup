import { comboKey, parseCombo } from "./normalize";
import type { KeyCombo, OS, Shortcut } from "./types";

export function combosForShortcut(shortcut: Shortcut, os: OS | null): string[] {
  if (os) return shortcut.combos[os] ?? [];
  return Object.values(shortcut.combos).flat().filter(Boolean) as string[];
}

export function shortcutMatchesCombo(
  shortcut: Shortcut,
  target: KeyCombo,
  os: OS | null,
): boolean {
  const combos = combosForShortcut(shortcut, os);
  const targetKey = comboKey(target);
  for (const raw of combos) {
    const parsed = parseCombo(raw);
    if (parsed && comboKey(parsed) === targetKey) return true;
  }
  return false;
}
