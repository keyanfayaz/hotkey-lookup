import type { Shortcut } from "../../lib/types";

const APP = "slack";
const id = (slug: string): string => `${APP}.${slug}`;

export const SHORTCUTS: Shortcut[] = [
  {
    id: id("quick-switcher"),
    appId: APP,
    function: "Open channel switcher",
    description: "Jump to a channel or DM by name.",
    category: "Navigation",
    combos: { macos: ["Cmd+K"], windows: ["Ctrl+K"], linux: ["Ctrl+K"] },
  },
  {
    id: id("search"),
    appId: APP,
    function: "Search Slack",
    category: "Navigation",
    combos: { macos: ["Cmd+G"], windows: ["Ctrl+G"], linux: ["Ctrl+G"] },
  },
  {
    id: id("preferences"),
    appId: APP,
    function: "Open preferences",
    category: "Navigation",
    combos: { macos: ["Cmd+,"], windows: ["Ctrl+,"], linux: ["Ctrl+,"] },
  },
  {
    id: id("mark-all-read"),
    appId: APP,
    function: "Mark all messages as read",
    category: "Reading",
    combos: {
      macos: ["Shift+Esc"],
      windows: ["Shift+Esc"],
      linux: ["Shift+Esc"],
    },
  },
  {
    id: id("mark-channel-read"),
    appId: APP,
    function: "Mark channel as read",
    category: "Reading",
    combos: { macos: ["Esc"], windows: ["Esc"], linux: ["Esc"] },
  },
  {
    id: id("next-unread"),
    appId: APP,
    function: "Next unread channel",
    category: "Reading",
    combos: {
      macos: ["Option+Shift+ArrowDown"],
      windows: ["Alt+Shift+ArrowDown"],
      linux: ["Alt+Shift+ArrowDown"],
    },
  },
  {
    id: id("prev-unread"),
    appId: APP,
    function: "Previous unread channel",
    category: "Reading",
    combos: {
      macos: ["Option+Shift+ArrowUp"],
      windows: ["Alt+Shift+ArrowUp"],
      linux: ["Alt+Shift+ArrowUp"],
    },
  },
  {
    id: id("threads"),
    appId: APP,
    function: "Open Threads view",
    category: "Navigation",
    combos: {
      macos: ["Cmd+Shift+T"],
      windows: ["Ctrl+Shift+T"],
      linux: ["Ctrl+Shift+T"],
    },
  },
  {
    id: id("dms"),
    appId: APP,
    function: "Open Direct Messages",
    category: "Navigation",
    combos: {
      macos: ["Cmd+Shift+K"],
      windows: ["Ctrl+Shift+K"],
      linux: ["Ctrl+Shift+K"],
    },
  },
  {
    id: id("activity"),
    appId: APP,
    function: "Open Activity (mentions & reactions)",
    category: "Navigation",
    combos: {
      macos: ["Cmd+Shift+M"],
      windows: ["Ctrl+Shift+M"],
      linux: ["Ctrl+Shift+M"],
    },
  },
  {
    id: id("edit-last"),
    appId: APP,
    function: "Edit last message",
    category: "Composing",
    combos: {
      macos: ["ArrowUp"],
      windows: ["ArrowUp"],
      linux: ["ArrowUp"],
    },
  },
  {
    id: id("react"),
    appId: APP,
    function: "Add emoji reaction",
    category: "Composing",
    combos: {
      macos: ["Cmd+Shift+\\"],
      windows: ["Ctrl+Shift+\\"],
      linux: ["Ctrl+Shift+\\"],
    },
  },
  {
    id: id("bold"),
    appId: APP,
    function: "Bold text",
    category: "Composing",
    combos: { macos: ["Cmd+B"], windows: ["Ctrl+B"], linux: ["Ctrl+B"] },
  },
  {
    id: id("italic"),
    appId: APP,
    function: "Italic text",
    category: "Composing",
    combos: { macos: ["Cmd+I"], windows: ["Ctrl+I"], linux: ["Ctrl+I"] },
  },
  {
    id: id("code"),
    appId: APP,
    function: "Inline code",
    category: "Composing",
    combos: {
      macos: ["Cmd+Shift+C"],
      windows: ["Ctrl+Shift+C"],
      linux: ["Ctrl+Shift+C"],
    },
  },
  {
    id: id("upload"),
    appId: APP,
    function: "Upload file",
    category: "Composing",
    combos: { macos: ["Cmd+U"], windows: ["Ctrl+U"], linux: ["Ctrl+U"] },
  },
];
