export type OS = "macos" | "windows" | "linux";

export const ALL_OS: OS[] = ["macos", "windows", "linux"];

export type Modifier = "ctrl" | "alt" | "shift" | "meta";

export interface KeyCombo {
  mods: Modifier[];
  key: string;
}

export type AppCategory =
  | "system"
  | "browser"
  | "editor"
  | "productivity"
  | "design"
  | "office";

export interface App {
  id: string;
  name: string;
  icon: string;
  supportedOS: OS[];
  category: AppCategory;
  blurb?: string;
}

export interface Shortcut {
  id: string;
  appId: string;
  function: string;
  description?: string;
  category?: string;
  combos: Partial<Record<OS, string[]>>;
}
