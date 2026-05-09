import type { Shortcut } from "../../lib/types";

export const SHORTCUTS: Shortcut[] = [
  {
    id: "finder.new-folder",
    appId: "finder",
    function: "New folder",
    category: "Files",
    combos: { macos: ["Cmd+Shift+N"], windows: ["Ctrl+Shift+N"], linux: ["Ctrl+Shift+N"] },
  },
  {
    id: "finder.rename",
    appId: "finder",
    function: "Rename",
    description: "Rename the selected file or folder.",
    category: "Files",
    combos: { macos: ["Return"], windows: ["F2"], linux: ["F2"] },
  },
  {
    id: "finder.delete",
    appId: "finder",
    function: "Delete / Move to trash",
    category: "Files",
    combos: { macos: ["Cmd+Backspace"], windows: ["Delete"], linux: ["Delete"] },
  },
  {
    id: "finder.get-info",
    appId: "finder",
    function: "Get info / Properties",
    category: "Files",
    combos: { macos: ["Cmd+I"], windows: ["Alt+Return"], linux: ["Alt+Return"] },
  },
  {
    id: "finder.copy",
    appId: "finder",
    function: "Copy",
    category: "Files",
    combos: { macos: ["Cmd+C"], windows: ["Ctrl+C"], linux: ["Ctrl+C"] },
  },
  {
    id: "finder.paste",
    appId: "finder",
    function: "Paste / Move here",
    category: "Files",
    combos: { macos: ["Cmd+V"], windows: ["Ctrl+V"], linux: ["Ctrl+V"] },
  },
  {
    id: "finder.go-up",
    appId: "finder",
    function: "Go to parent folder",
    category: "Navigation",
    combos: { macos: ["Cmd+Up"], windows: ["Alt+Up"], linux: ["Alt+Up"] },
  },
  {
    id: "finder.open",
    appId: "finder",
    function: "Open selected item",
    category: "Navigation",
    combos: { macos: ["Cmd+Down"], windows: ["Return"], linux: ["Return"] },
  },
  {
    id: "finder.show-hidden",
    appId: "finder",
    function: "Show hidden files",
    category: "View",
    combos: { macos: ["Cmd+Shift+."], windows: ["Ctrl+H"], linux: ["Ctrl+H"] },
  },
];
