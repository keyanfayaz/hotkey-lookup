import { SHORTCUTS } from "../data";

export const FAVOURITES_STORAGE_KEY = "hotkey-lookup:favourites";
const knownIds = new Set(SHORTCUTS.map((shortcut) => shortcut.id));

export function parseFavourites(value: string | null): string[] {
  try {
    const ids: unknown = JSON.parse(value ?? "[]");
    if (!Array.isArray(ids)) return [];
    return [...new Set(ids.filter((id): id is string => typeof id === "string" && knownIds.has(id)))];
  } catch {
    return [];
  }
}

export function toggleFavourite(ids: readonly string[], id: string): string[] {
  if (!knownIds.has(id)) return [...ids];
  return ids.includes(id) ? ids.filter((saved) => saved !== id) : [...ids, id];
}

export function readFavourites(): { ids: string[]; persistent: boolean } {
  try {
    if (typeof window !== "undefined") {
      return { ids: parseFavourites(window.localStorage.getItem(FAVOURITES_STORAGE_KEY)), persistent: true };
    }
  } catch {
    // Storage may be blocked. Favourites can still work for this visit.
  }
  return { ids: [], persistent: false };
}

export function writeFavourites(ids: readonly string[]): boolean {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(ids));
      return true;
    }
  } catch {
    // Includes denied storage access and exhausted storage quotas.
  }
  return false;
}
