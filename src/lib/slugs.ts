import slugifyLib from "slugify";
import { SHORTCUTS, APPS, APP_BY_ID } from "../data";
import type { OS, Shortcut } from "./types";

export function slugify(input: string): string {
  return slugifyLib(input, { lower: true, strict: true, trim: true });
}

const SHORTCUT_SLUG: Record<string, string> = {};
const SLUG_LOOKUP: Record<string, string> = {};

(() => {
  const perAppCounts: Record<string, Record<string, number>> = {};
  for (const s of SHORTCUTS) {
    const app = perAppCounts[s.appId] ?? (perAppCounts[s.appId] = {});
    let base = slugify(s.function) || "shortcut";
    let candidate = base;
    let n = 2;
    while (app[candidate]) {
      candidate = `${base}-${n++}`;
    }
    app[candidate] = 1;
    SHORTCUT_SLUG[s.id] = candidate;
    SLUG_LOOKUP[`${s.appId}/${candidate}`] = s.id;
  }
})();

export function shortcutSlug(s: Shortcut): string {
  return SHORTCUT_SLUG[s.id] ?? slugify(s.function);
}

export function shortcutPath(s: Shortcut): string {
  return `/shortcut/${s.appId}/${shortcutSlug(s)}`;
}

export function findShortcutBySlug(appSlug: string, actionSlug: string): Shortcut | null {
  const id = SLUG_LOOKUP[`${appSlug}/${actionSlug}`];
  if (!id) return null;
  return SHORTCUTS.find((s) => s.id === id) ?? null;
}

export function appPath(appId: string, os?: OS): string {
  return os ? `/apps/${appId}/${os}` : `/apps/${appId}`;
}

export function osPath(os: OS): string {
  return `/os/${os}`;
}

export function comparePath(appId?: string): string {
  return appId ? `/compare/${appId}` : `/compare`;
}

export const ALL_APPS = APPS;
export { APP_BY_ID };
