import type { Shortcut } from "../../lib/types";

const APP = "firefox";
const id = (slug: string): string => `${APP}.${slug}`;

export const SHORTCUTS: Shortcut[] = [
  {
    id: id("new-tab"),
    appId: APP,
    function: "New tab",
    category: "Tabs",
    combos: { macos: ["Cmd+T"], windows: ["Ctrl+T"], linux: ["Ctrl+T"] },
  },
  {
    id: id("close-tab"),
    appId: APP,
    function: "Close tab",
    category: "Tabs",
    combos: { macos: ["Cmd+W"], windows: ["Ctrl+W"], linux: ["Ctrl+W"] },
  },
  {
    id: id("reopen-tab"),
    appId: APP,
    function: "Reopen last closed tab",
    category: "Tabs",
    combos: {
      macos: ["Cmd+Shift+T"],
      windows: ["Ctrl+Shift+T"],
      linux: ["Ctrl+Shift+T"],
    },
  },
  {
    id: id("focus-address"),
    appId: APP,
    function: "Focus address bar",
    category: "Navigation",
    combos: { macos: ["Cmd+L"], windows: ["Ctrl+L"], linux: ["Ctrl+L"] },
  },
  {
    id: id("focus-search"),
    appId: APP,
    function: "Focus search bar",
    category: "Navigation",
    combos: { macos: ["Cmd+K"], windows: ["Ctrl+K"], linux: ["Ctrl+K"] },
  },
  {
    id: id("find"),
    appId: APP,
    function: "Find on page",
    category: "Navigation",
    combos: { macos: ["Cmd+F"], windows: ["Ctrl+F"], linux: ["Ctrl+F"] },
  },
  {
    id: id("quick-find"),
    appId: APP,
    function: "Quick find (link search)",
    category: "Navigation",
    combos: { macos: ["'"], windows: ["'"], linux: ["'"] },
  },
  {
    id: id("history"),
    appId: APP,
    function: "Open History sidebar",
    category: "Navigation",
    combos: {
      macos: ["Cmd+Shift+H"],
      windows: ["Ctrl+Shift+H"],
      linux: ["Ctrl+Shift+H"],
    },
  },
  {
    id: id("downloads"),
    appId: APP,
    function: "Open Downloads",
    category: "Navigation",
    combos: {
      macos: ["Cmd+Shift+Y"],
      windows: ["Ctrl+J"],
      linux: ["Ctrl+Shift+Y"],
    },
  },
  {
    id: id("bookmark"),
    appId: APP,
    function: "Bookmark current page",
    category: "Navigation",
    combos: { macos: ["Cmd+D"], windows: ["Ctrl+D"], linux: ["Ctrl+D"] },
  },
  {
    id: id("devtools"),
    appId: APP,
    function: "Open DevTools",
    category: "Developer",
    combos: {
      macos: ["Cmd+Option+I", "F12"],
      windows: ["Ctrl+Shift+I", "F12"],
      linux: ["Ctrl+Shift+I", "F12"],
    },
  },
  {
    id: id("inspect"),
    appId: APP,
    function: "Inspect element (picker)",
    category: "Developer",
    combos: {
      macos: ["Cmd+Shift+C"],
      windows: ["Ctrl+Shift+C"],
      linux: ["Ctrl+Shift+C"],
    },
  },
  {
    id: id("hard-reload"),
    appId: APP,
    function: "Hard reload (bypass cache)",
    category: "Developer",
    combos: {
      macos: ["Cmd+Shift+R"],
      windows: ["Ctrl+F5", "Ctrl+Shift+R"],
      linux: ["Ctrl+F5", "Ctrl+Shift+R"],
    },
  },
  {
    id: id("private"),
    appId: APP,
    function: "Open Private window",
    category: "Window",
    combos: {
      macos: ["Cmd+Shift+P"],
      windows: ["Ctrl+Shift+P"],
      linux: ["Ctrl+Shift+P"],
    },
  },
  {
    id: id("zoom-in"),
    appId: APP,
    function: "Zoom in",
    category: "View",
    combos: { macos: ["Cmd++"], windows: ["Ctrl++"], linux: ["Ctrl++"] },
  },
  {
    id: id("zoom-out"),
    appId: APP,
    function: "Zoom out",
    category: "View",
    combos: { macos: ["Cmd+-"], windows: ["Ctrl+-"], linux: ["Ctrl+-"] },
  },
  {
    id: id("reader-view"),
    appId: APP,
    function: "Toggle reader view",
    category: "View",
    combos: {
      macos: ["Cmd+Option+R"],
      windows: ["F9"],
      linux: ["Ctrl+Alt+R"],
    },
  },
];
