import type { Shortcut } from "../../lib/types";

const APP = "chrome";
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
    id: id("next-tab"),
    appId: APP,
    function: "Next tab",
    category: "Tabs",
    combos: {
      macos: ["Cmd+Option+ArrowRight", "Ctrl+Tab"],
      windows: ["Ctrl+Tab", "Ctrl+PageDown"],
      linux: ["Ctrl+Tab", "Ctrl+PageDown"],
    },
  },
  {
    id: id("prev-tab"),
    appId: APP,
    function: "Previous tab",
    category: "Tabs",
    combos: {
      macos: ["Cmd+Option+ArrowLeft", "Ctrl+Shift+Tab"],
      windows: ["Ctrl+Shift+Tab", "Ctrl+PageUp"],
      linux: ["Ctrl+Shift+Tab", "Ctrl+PageUp"],
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
    id: id("find"),
    appId: APP,
    function: "Find on page",
    category: "Navigation",
    combos: { macos: ["Cmd+F"], windows: ["Ctrl+F"], linux: ["Ctrl+F"] },
  },
  {
    id: id("history"),
    appId: APP,
    function: "Open History",
    category: "Navigation",
    combos: { macos: ["Cmd+Y"], windows: ["Ctrl+H"], linux: ["Ctrl+H"] },
  },
  {
    id: id("downloads"),
    appId: APP,
    function: "Open Downloads",
    category: "Navigation",
    combos: { macos: ["Cmd+Shift+J"], windows: ["Ctrl+J"], linux: ["Ctrl+J"] },
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
      windows: ["Ctrl+Shift+R", "Ctrl+F5"],
      linux: ["Ctrl+Shift+R", "Ctrl+F5"],
    },
  },
  {
    id: id("incognito"),
    appId: APP,
    function: "Open Incognito window",
    category: "Window",
    combos: {
      macos: ["Cmd+Shift+N"],
      windows: ["Ctrl+Shift+N"],
      linux: ["Ctrl+Shift+N"],
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
    id: id("zoom-reset"),
    appId: APP,
    function: "Reset zoom",
    category: "View",
    combos: { macos: ["Cmd+0"], windows: ["Ctrl+0"], linux: ["Ctrl+0"] },
  },
  {
    id: id("fullscreen"),
    appId: APP,
    function: "Toggle fullscreen",
    category: "View",
    combos: { macos: ["Ctrl+Cmd+F"], windows: ["F11"], linux: ["F11"] },
  },
];
