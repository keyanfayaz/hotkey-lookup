import type { App } from "../lib/types";

export const APPS: App[] = [
  {
    id: "system-macos",
    name: "macOS",
    icon: "🍎",
    supportedOS: ["macos"],
    category: "system",
    blurb: "System-wide shortcuts on macOS.",
  },
  {
    id: "system-windows",
    name: "Windows",
    icon: "🪟",
    supportedOS: ["windows"],
    category: "system",
    blurb: "System-wide shortcuts on Windows.",
  },
  {
    id: "system-linux",
    name: "Linux (GNOME)",
    icon: "🐧",
    supportedOS: ["linux"],
    category: "system",
    blurb: "GNOME desktop defaults — close to most distros.",
  },
  {
    id: "chrome",
    name: "Chrome",
    icon: "🌐",
    supportedOS: ["macos", "windows", "linux"],
    category: "browser",
  },
  {
    id: "firefox",
    name: "Firefox",
    icon: "🦊",
    supportedOS: ["macos", "windows", "linux"],
    category: "browser",
  },
  {
    id: "safari",
    name: "Safari",
    icon: "🧭",
    supportedOS: ["macos"],
    category: "browser",
  },
  {
    id: "vscode",
    name: "VS Code",
    icon: "🧩",
    supportedOS: ["macos", "windows", "linux"],
    category: "editor",
  },
  {
    id: "slack",
    name: "Slack",
    icon: "💬",
    supportedOS: ["macos", "windows", "linux"],
    category: "productivity",
  },
  {
    id: "figma",
    name: "Figma",
    icon: "🎨",
    supportedOS: ["macos", "windows", "linux"],
    category: "design",
  },
  {
    id: "google-docs",
    name: "Google Docs",
    icon: "📝",
    supportedOS: ["macos", "windows", "linux"],
    category: "office",
  },
];

export const APP_BY_ID: Record<string, App> = Object.fromEntries(
  APPS.map((a) => [a.id, a]),
);
