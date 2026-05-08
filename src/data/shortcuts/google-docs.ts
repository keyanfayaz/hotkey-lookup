import type { Shortcut } from "../../lib/types";

const APP = "google-docs";
const id = (slug: string): string => `${APP}.${slug}`;

export const SHORTCUTS: Shortcut[] = [
  {
    id: id("bold"),
    appId: APP,
    function: "Bold",
    category: "Formatting",
    combos: { macos: ["Cmd+B"], windows: ["Ctrl+B"], linux: ["Ctrl+B"] },
  },
  {
    id: id("italic"),
    appId: APP,
    function: "Italic",
    category: "Formatting",
    combos: { macos: ["Cmd+I"], windows: ["Ctrl+I"], linux: ["Ctrl+I"] },
  },
  {
    id: id("underline"),
    appId: APP,
    function: "Underline",
    category: "Formatting",
    combos: { macos: ["Cmd+U"], windows: ["Ctrl+U"], linux: ["Ctrl+U"] },
  },
  {
    id: id("strikethrough"),
    appId: APP,
    function: "Strikethrough",
    category: "Formatting",
    combos: {
      macos: ["Cmd+Shift+X"],
      windows: ["Alt+Shift+5"],
      linux: ["Alt+Shift+5"],
    },
  },
  {
    id: id("clear-formatting"),
    appId: APP,
    function: "Clear formatting",
    category: "Formatting",
    combos: { macos: ["Cmd+\\"], windows: ["Ctrl+\\"], linux: ["Ctrl+\\"] },
  },
  {
    id: id("heading-1"),
    appId: APP,
    function: "Apply heading 1",
    category: "Formatting",
    combos: {
      macos: ["Cmd+Option+1"],
      windows: ["Ctrl+Alt+1"],
      linux: ["Ctrl+Alt+1"],
    },
  },
  {
    id: id("heading-2"),
    appId: APP,
    function: "Apply heading 2",
    category: "Formatting",
    combos: {
      macos: ["Cmd+Option+2"],
      windows: ["Ctrl+Alt+2"],
      linux: ["Ctrl+Alt+2"],
    },
  },
  {
    id: id("normal-text"),
    appId: APP,
    function: "Apply normal text style",
    category: "Formatting",
    combos: {
      macos: ["Cmd+Option+0"],
      windows: ["Ctrl+Alt+0"],
      linux: ["Ctrl+Alt+0"],
    },
  },
  {
    id: id("link"),
    appId: APP,
    function: "Insert / edit link",
    category: "Insert",
    combos: { macos: ["Cmd+K"], windows: ["Ctrl+K"], linux: ["Ctrl+K"] },
  },
  {
    id: id("comment"),
    appId: APP,
    function: "Insert comment",
    category: "Insert",
    combos: {
      macos: ["Cmd+Option+M"],
      windows: ["Ctrl+Alt+M"],
      linux: ["Ctrl+Alt+M"],
    },
  },
  {
    id: id("footnote"),
    appId: APP,
    function: "Insert footnote",
    category: "Insert",
    combos: {
      macos: ["Cmd+Option+F"],
      windows: ["Ctrl+Alt+F"],
      linux: ["Ctrl+Alt+F"],
    },
  },
  {
    id: id("bulleted-list"),
    appId: APP,
    function: "Bulleted list",
    category: "Lists",
    combos: {
      macos: ["Cmd+Shift+8"],
      windows: ["Ctrl+Shift+8"],
      linux: ["Ctrl+Shift+8"],
    },
  },
  {
    id: id("numbered-list"),
    appId: APP,
    function: "Numbered list",
    category: "Lists",
    combos: {
      macos: ["Cmd+Shift+7"],
      windows: ["Ctrl+Shift+7"],
      linux: ["Ctrl+Shift+7"],
    },
  },
  {
    id: id("checklist"),
    appId: APP,
    function: "Checklist",
    category: "Lists",
    combos: {
      macos: ["Cmd+Shift+9"],
      windows: ["Ctrl+Shift+9"],
      linux: ["Ctrl+Shift+9"],
    },
  },
  {
    id: id("find"),
    appId: APP,
    function: "Find in document",
    category: "Navigation",
    combos: { macos: ["Cmd+F"], windows: ["Ctrl+F"], linux: ["Ctrl+F"] },
  },
  {
    id: id("find-replace"),
    appId: APP,
    function: "Find and replace",
    category: "Navigation",
    combos: {
      macos: ["Cmd+Shift+H"],
      windows: ["Ctrl+H"],
      linux: ["Ctrl+H"],
    },
  },
  {
    id: id("word-count"),
    appId: APP,
    function: "Show word count",
    category: "Tools",
    combos: {
      macos: ["Cmd+Shift+C"],
      windows: ["Ctrl+Shift+C"],
      linux: ["Ctrl+Shift+C"],
    },
  },
  {
    id: id("voice-typing"),
    appId: APP,
    function: "Start voice typing",
    category: "Tools",
    combos: {
      macos: ["Cmd+Shift+S"],
      windows: ["Ctrl+Shift+S"],
      linux: ["Ctrl+Shift+S"],
    },
  },
  {
    id: id("keyboard-shortcuts-help"),
    appId: APP,
    function: "Show keyboard shortcuts help",
    category: "Help",
    combos: { macos: ["Cmd+/"], windows: ["Ctrl+/"], linux: ["Ctrl+/"] },
  },
];
