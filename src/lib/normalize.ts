import type { KeyCombo, Modifier, OS } from "./types";

const MOD_ALIASES: Record<string, Modifier> = {
  ctrl: "ctrl",
  control: "ctrl",
  "⌃": "ctrl",
  alt: "alt",
  option: "alt",
  opt: "alt",
  "⌥": "alt",
  shift: "shift",
  "⇧": "shift",
  cmd: "meta",
  command: "meta",
  "⌘": "meta",
  win: "meta",
  windows: "meta",
  super: "meta",
  meta: "meta",
};

const KEY_ALIASES: Record<string, string> = {
  esc: "escape",
  escape: "escape",
  return: "enter",
  enter: "enter",
  del: "delete",
  delete: "delete",
  ins: "insert",
  insert: "insert",
  pgup: "pageup",
  pgdn: "pagedown",
  pageup: "pageup",
  pagedown: "pagedown",
  home: "home",
  end: "end",
  space: "space",
  spacebar: "space",
  tab: "tab",
  backspace: "backspace",
  bksp: "backspace",
  up: "arrowup",
  down: "arrowdown",
  left: "arrowleft",
  right: "arrowright",
  arrowup: "arrowup",
  arrowdown: "arrowdown",
  arrowleft: "arrowleft",
  arrowright: "arrowright",
};

const MOD_ORDER: Modifier[] = ["ctrl", "alt", "shift", "meta"];

const sortMods = (mods: Modifier[]): Modifier[] => {
  const set = new Set(mods);
  return MOD_ORDER.filter((m) => set.has(m));
};

const normalizeToken = (raw: string): { kind: "mod" | "key"; value: string } => {
  const t = raw.trim().toLowerCase();
  if (MOD_ALIASES[t]) return { kind: "mod", value: MOD_ALIASES[t] };
  if (KEY_ALIASES[t]) return { kind: "key", value: KEY_ALIASES[t] };
  if (/^f\d{1,2}$/.test(t)) return { kind: "key", value: t };
  return { kind: "key", value: t };
};

export function parseCombo(input: string): KeyCombo | null {
  const tokens = input
    .split(/\s*\+\s*|\s+then\s+|\s*,\s*/i)
    .filter((t) => t.length > 0);
  if (tokens.length === 0) return null;
  const mods: Modifier[] = [];
  let key: string | null = null;
  for (const tok of tokens) {
    const norm = normalizeToken(tok);
    if (norm.kind === "mod") mods.push(norm.value as Modifier);
    else key = norm.value;
  }
  if (!key) return null;
  return { mods: sortMods(mods), key };
}

const PRETTY_MAC: Record<Modifier, string> = {
  ctrl: "⌃",
  alt: "⌥",
  shift: "⇧",
  meta: "⌘",
};

const PRETTY_PC: Record<Modifier, string> = {
  ctrl: "Ctrl",
  alt: "Alt",
  shift: "Shift",
  meta: "Win",
};

const PRETTY_KEY: Record<string, string> = {
  enter: "Enter",
  escape: "Esc",
  tab: "Tab",
  backspace: "⌫",
  delete: "Del",
  insert: "Ins",
  space: "Space",
  arrowup: "↑",
  arrowdown: "↓",
  arrowleft: "←",
  arrowright: "→",
  pageup: "PgUp",
  pagedown: "PgDn",
  home: "Home",
  end: "End",
};

export function prettyKey(key: string): string {
  if (PRETTY_KEY[key]) return PRETTY_KEY[key];
  if (/^f\d{1,2}$/.test(key)) return key.toUpperCase();
  if (key.length === 1) return key.toUpperCase();
  return key.charAt(0).toUpperCase() + key.slice(1);
}

export function comboTokens(
  combo: KeyCombo,
  os: OS,
): { type: "mod" | "key"; label: string }[] {
  const macStyle = os === "macos";
  const modMap = macStyle ? PRETTY_MAC : PRETTY_PC;
  const tokens: { type: "mod" | "key"; label: string }[] = [];
  for (const m of combo.mods) {
    let label = modMap[m];
    if (m === "meta" && os === "linux") label = "Super";
    if (m === "alt" && os === "linux") label = "Alt";
    tokens.push({ type: "mod", label });
  }
  tokens.push({ type: "key", label: prettyKey(combo.key) });
  return tokens;
}

export function comboKey(combo: KeyCombo): string {
  return [...combo.mods, combo.key].join("+");
}
