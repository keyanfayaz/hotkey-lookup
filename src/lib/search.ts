import Fuse from "fuse.js";
import type { Shortcut } from "./types";

export function buildSearchIndex(shortcuts: Shortcut[]): Fuse<Shortcut> {
  return new Fuse(shortcuts, {
    keys: [
      { name: "function", weight: 0.6 },
      { name: "description", weight: 0.25 },
      { name: "category", weight: 0.1 },
      { name: "appId", weight: 0.05 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
    includeScore: true,
    minMatchCharLength: 2,
  });
}
