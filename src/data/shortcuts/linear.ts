import type { Shortcut } from "../../lib/types";

export const SHORTCUTS: Shortcut[] = [
  {
    id: "linear.create-issue",
    appId: "linear",
    function: "Create issue",
    category: "Issues",
    combos: { macos: ["C"], windows: ["C"], linux: ["C"] },
  },
  {
    id: "linear.command-menu",
    appId: "linear",
    function: "Command menu",
    description: "Open the command palette.",
    category: "Navigation",
    combos: { macos: ["Cmd+K"], windows: ["Ctrl+K"], linux: ["Ctrl+K"] },
  },
  {
    id: "linear.go-inbox",
    appId: "linear",
    function: "Go to inbox",
    category: "Navigation",
    combos: { macos: ["G+I"], windows: ["G+I"], linux: ["G+I"] },
  },
  {
    id: "linear.go-my-issues",
    appId: "linear",
    function: "Go to my issues",
    category: "Navigation",
    combos: { macos: ["G+M"], windows: ["G+M"], linux: ["G+M"] },
  },
  {
    id: "linear.assign-me",
    appId: "linear",
    function: "Assign to me",
    description: "Assign selected issue to yourself.",
    category: "Issues",
    combos: { macos: ["I"], windows: ["I"], linux: ["I"] },
  },
  {
    id: "linear.set-priority",
    appId: "linear",
    function: "Set priority",
    category: "Issues",
    combos: { macos: ["Shift+P"], windows: ["Shift+P"], linux: ["Shift+P"] },
  },
  {
    id: "linear.filter",
    appId: "linear",
    function: "Filter issues",
    category: "Filters",
    combos: { macos: ["F"], windows: ["F"], linux: ["F"] },
  },
  {
    id: "linear.search",
    appId: "linear",
    function: "Search",
    category: "Navigation",
    combos: { macos: ["Cmd+F"], windows: ["Ctrl+F"], linux: ["Ctrl+F"] },
  },
];
