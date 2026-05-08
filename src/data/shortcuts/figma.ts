import type { Shortcut } from "../../lib/types";

const APP = "figma";
const id = (slug: string): string => `${APP}.${slug}`;

export const SHORTCUTS: Shortcut[] = [
  {
    id: id("frame"),
    appId: APP,
    function: "Frame tool",
    category: "Tools",
    combos: { macos: ["F"], windows: ["F"], linux: ["F"] },
  },
  {
    id: id("rectangle"),
    appId: APP,
    function: "Rectangle tool",
    category: "Tools",
    combos: { macos: ["R"], windows: ["R"], linux: ["R"] },
  },
  {
    id: id("text"),
    appId: APP,
    function: "Text tool",
    category: "Tools",
    combos: { macos: ["T"], windows: ["T"], linux: ["T"] },
  },
  {
    id: id("pen"),
    appId: APP,
    function: "Pen tool",
    category: "Tools",
    combos: { macos: ["P"], windows: ["P"], linux: ["P"] },
  },
  {
    id: id("hand"),
    appId: APP,
    function: "Hand tool (pan)",
    category: "Tools",
    combos: { macos: ["H"], windows: ["H"], linux: ["H"] },
  },
  {
    id: id("comment"),
    appId: APP,
    function: "Comment tool",
    category: "Tools",
    combos: { macos: ["C"], windows: ["C"], linux: ["C"] },
  },
  {
    id: id("group"),
    appId: APP,
    function: "Group selection",
    category: "Layers",
    combos: { macos: ["Cmd+G"], windows: ["Ctrl+G"], linux: ["Ctrl+G"] },
  },
  {
    id: id("ungroup"),
    appId: APP,
    function: "Ungroup",
    category: "Layers",
    combos: {
      macos: ["Cmd+Shift+G"],
      windows: ["Ctrl+Shift+G"],
      linux: ["Ctrl+Shift+G"],
    },
  },
  {
    id: id("create-component"),
    appId: APP,
    function: "Create component",
    category: "Components",
    combos: {
      macos: ["Cmd+Option+K"],
      windows: ["Ctrl+Alt+K"],
      linux: ["Ctrl+Alt+K"],
    },
  },
  {
    id: id("detach-instance"),
    appId: APP,
    function: "Detach instance",
    category: "Components",
    combos: {
      macos: ["Cmd+Option+B"],
      windows: ["Ctrl+Alt+B"],
      linux: ["Ctrl+Alt+B"],
    },
  },
  {
    id: id("auto-layout"),
    appId: APP,
    function: "Add auto layout",
    category: "Layout",
    combos: {
      macos: ["Shift+A"],
      windows: ["Shift+A"],
      linux: ["Shift+A"],
    },
  },
  {
    id: id("zoom-fit"),
    appId: APP,
    function: "Zoom to fit",
    category: "View",
    combos: { macos: ["Shift+1"], windows: ["Shift+1"], linux: ["Shift+1"] },
  },
  {
    id: id("zoom-100"),
    appId: APP,
    function: "Zoom to 100%",
    category: "View",
    combos: { macos: ["Shift+0"], windows: ["Shift+0"], linux: ["Shift+0"] },
  },
  {
    id: id("zoom-selection"),
    appId: APP,
    function: "Zoom to selection",
    category: "View",
    combos: { macos: ["Shift+2"], windows: ["Shift+2"], linux: ["Shift+2"] },
  },
  {
    id: id("toggle-ui"),
    appId: APP,
    function: "Show/hide UI",
    category: "View",
    combos: { macos: ["Cmd+\\"], windows: ["Ctrl+\\"], linux: ["Ctrl+\\"] },
  },
  {
    id: id("layers-panel"),
    appId: APP,
    function: "Toggle layers panel",
    category: "View",
    combos: {
      macos: ["Option+1"],
      windows: ["Alt+1"],
      linux: ["Alt+1"],
    },
  },
  {
    id: id("dev-mode"),
    appId: APP,
    function: "Toggle Dev Mode",
    category: "View",
    combos: {
      macos: ["Shift+D"],
      windows: ["Shift+D"],
      linux: ["Shift+D"],
    },
  },
  {
    id: id("quick-actions"),
    appId: APP,
    function: "Open Quick Actions",
    category: "Navigation",
    combos: { macos: ["Cmd+/"], windows: ["Ctrl+/"], linux: ["Ctrl+/"] },
  },
];
