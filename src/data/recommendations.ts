import type { OS, AppCategory } from "../lib/types";

export interface Recommendation {
  id: string;
  scope: { appId?: string; os?: OS; category?: AppCategory };
  title: string;
  vendor: string;
  href: string;
  blurb: string;
  priority: number;
}

const AMAZON_TAG = "hotkeylookup-20";
const amz = (asin: string) => `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}`;

export const RECOMMENDATIONS: Recommendation[] = [
  // Mac-focused
  {
    id: "raycast",
    scope: { os: "macos" },
    title: "Raycast",
    vendor: "raycast.com",
    href: "https://raycast.com/?via=hotkeylookup",
    blurb: "Faster Spotlight replacement with shortcuts, snippets, AI, and clipboard history.",
    priority: 100,
  },
  {
    id: "magnet",
    scope: { os: "macos" },
    title: "Magnet — window manager",
    vendor: "Mac App Store",
    href: "https://apps.apple.com/app/magnet/id441258766?mt=12",
    blurb: "Snap windows with keyboard shortcuts on macOS.",
    priority: 80,
  },
  {
    id: "keychron-q1",
    scope: { os: "macos", category: "editor" },
    title: "Keychron Q1 mechanical keyboard",
    vendor: "Amazon",
    href: amz("B0B43QPVL2"),
    blurb: "Hot-swap mechanical with Mac-friendly layout — popular with developers.",
    priority: 70,
  },

  // Windows-focused
  {
    id: "powertoys",
    scope: { os: "windows" },
    title: "Microsoft PowerToys",
    vendor: "Microsoft",
    href: "https://learn.microsoft.com/en-us/windows/powertoys/",
    blurb: "Free FancyZones, PowerRename, and a Spotlight-like Run launcher for Windows.",
    priority: 100,
  },
  {
    id: "autohotkey",
    scope: { os: "windows" },
    title: "AutoHotkey",
    vendor: "autohotkey.com",
    href: "https://www.autohotkey.com/",
    blurb: "Script your own keyboard shortcuts and remaps on Windows.",
    priority: 80,
  },

  // Cross-platform productivity
  {
    id: "stream-deck",
    scope: {},
    title: "Elgato Stream Deck MK.2",
    vendor: "Amazon",
    href: amz("B09738CV2G"),
    blurb: "Programmable keys for shortcuts, macros, and app launches.",
    priority: 60,
  },
  {
    id: "logi-mx-keys",
    scope: {},
    title: "Logitech MX Keys",
    vendor: "Amazon",
    href: amz("B07WCJ54FY"),
    blurb: "Wireless keyboard with backlight and great cross-OS support.",
    priority: 55,
  },

  // Editor-focused
  {
    id: "kinesis-advantage",
    scope: { category: "editor" },
    title: "Kinesis Advantage 360",
    vendor: "Amazon",
    href: amz("B09Q5W2P5K"),
    blurb: "Split, contoured ergonomic keyboard loved by heavy-shortcut users.",
    priority: 50,
  },
  {
    id: "vim-adventures",
    scope: { appId: "vscode" },
    title: "Vim Adventures",
    vendor: "vim-adventures.com",
    href: "https://vim-adventures.com/",
    blurb: "Learn Vim motions through a game — pairs well with VS Code's Vim extension.",
    priority: 40,
  },

  // Designer-focused
  {
    id: "figma-keyboard-cheat",
    scope: { appId: "figma" },
    title: "Logitech MX Master 3S",
    vendor: "Amazon",
    href: amz("B09HM94VDS"),
    blurb: "Designer-favorite mouse with thumb gestures that pair with Figma shortcuts.",
    priority: 60,
  },

  // Linux
  {
    id: "kde-tutorial",
    scope: { os: "linux" },
    title: "KDE Plasma keyboard reference",
    vendor: "kde.org",
    href: "https://userbase.kde.org/Plasma/Tips#Keyboard",
    blurb: "Official keyboard tips for KDE Plasma — many shortcuts apply across distros.",
    priority: 40,
  },
];

export function recommendationsFor(opts: { appId?: string; os?: OS; category?: AppCategory }): Recommendation[] {
  return RECOMMENDATIONS.filter((r) => {
    if (r.scope.appId && r.scope.appId !== opts.appId) return false;
    if (r.scope.os && r.scope.os !== opts.os) return false;
    if (r.scope.category && r.scope.category !== opts.category) return false;
    return true;
  })
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3);
}
