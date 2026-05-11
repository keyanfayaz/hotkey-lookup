import type { OS } from "../../lib/types";

export interface HowToCombo {
  os: OS;
  combo: string;
}

export interface HowToStep {
  heading: string;
  body: string;
  combos?: HowToCombo[];
}

export interface HowTo {
  slug: string;
  title: string;
  description: string;
  appId?: string;
  os?: OS;
  steps: HowToStep[];
}

export const HOWTOS: HowTo[] = [
  {
    slug: "screenshot-on-mac",
    title: "How to screenshot on Mac",
    description: "Every keyboard shortcut for taking screenshots on macOS — full screen, window, region, and clipboard.",
    os: "macos",
    steps: [
      {
        heading: "Capture the entire screen",
        body: "Press Shift + Command + 3. The screenshot saves to your desktop by default.",
        combos: [{ os: "macos", combo: "Shift+Cmd+3" }],
      },
      {
        heading: "Capture a selected region",
        body: "Press Shift + Command + 4, then drag to select. Hold Spacebar after pressing to capture a window.",
        combos: [{ os: "macos", combo: "Shift+Cmd+4" }],
      },
      {
        heading: "Open the screenshot toolbar",
        body: "Press Shift + Command + 5 for full controls: full screen, window, region, screen recording, and timer.",
        combos: [{ os: "macos", combo: "Shift+Cmd+5" }],
      },
      {
        heading: "Copy to clipboard instead of saving a file",
        body: "Hold Control while taking the screenshot — for example, Control + Shift + Command + 4.",
        combos: [{ os: "macos", combo: "Ctrl+Shift+Cmd+4" }],
      },
    ],
  },
  {
    slug: "screenshot-on-windows",
    title: "How to screenshot on Windows",
    description: "Every keyboard shortcut for taking screenshots on Windows — Snipping Tool, region, window, and full screen.",
    os: "windows",
    steps: [
      {
        heading: "Open the Snipping Tool",
        body: "Press Windows + Shift + S. Choose a rectangular, freeform, window, or full-screen snip.",
        combos: [{ os: "windows", combo: "Win+Shift+S" }],
      },
      {
        heading: "Capture full screen to file",
        body: "Press Windows + Print Screen. The screenshot saves to Pictures > Screenshots.",
        combos: [{ os: "windows", combo: "Win+PrtScn" }],
      },
      {
        heading: "Capture the active window",
        body: "Press Alt + Print Screen to copy the foreground window to the clipboard.",
        combos: [{ os: "windows", combo: "Alt+PrtScn" }],
      },
    ],
  },
  {
    slug: "force-quit-on-mac",
    title: "How to force quit an app on Mac",
    description: "Force quit a frozen app on macOS using keyboard shortcuts — without losing your other open work.",
    os: "macos",
    steps: [
      {
        heading: "Open Force Quit",
        body: "Press Option + Command + Esc. Select the app, then click Force Quit.",
        combos: [{ os: "macos", combo: "Alt+Cmd+Esc" }],
      },
      {
        heading: "Quit the foreground app instantly",
        body: "Press Shift + Option + Command + Esc and hold for two seconds.",
        combos: [{ os: "macos", combo: "Shift+Alt+Cmd+Esc" }],
      },
    ],
  },
  {
    slug: "open-task-manager-windows",
    title: "How to open Task Manager on Windows",
    description: "All the keyboard shortcuts for opening Task Manager on Windows — direct, secure, and via the security screen.",
    os: "windows",
    steps: [
      {
        heading: "Open Task Manager directly",
        body: "Press Ctrl + Shift + Esc.",
        combos: [{ os: "windows", combo: "Ctrl+Shift+Esc" }],
      },
      {
        heading: "Open via the secure-attention sequence",
        body: "Press Ctrl + Alt + Delete, then choose Task Manager.",
        combos: [{ os: "windows", combo: "Ctrl+Alt+Del" }],
      },
    ],
  },
  {
    slug: "vscode-shortcuts-mac",
    title: "Top 20 VS Code shortcuts for Mac",
    description: "The most useful VS Code keyboard shortcuts on macOS — palette, multi-cursor, navigation, and refactoring.",
    appId: "vscode",
    os: "macos",
    steps: [
      {
        heading: "Run any command",
        body: "The Command Palette is your gateway to every VS Code feature.",
        combos: [{ os: "macos", combo: "Cmd+Shift+P" }],
      },
      {
        heading: "Open a file by name",
        body: "Quick Open jumps to any file in your workspace.",
        combos: [{ os: "macos", combo: "Cmd+P" }],
      },
      {
        heading: "Toggle the terminal",
        body: "Show or hide the integrated terminal panel.",
        combos: [{ os: "macos", combo: "Ctrl+`" }],
      },
      {
        heading: "Go to definition",
        body: "Jump to where a symbol is defined.",
        combos: [{ os: "macos", combo: "F12" }],
      },
    ],
  },
  {
    slug: "vscode-shortcuts-windows",
    title: "Top 20 VS Code shortcuts for Windows",
    description: "Essential VS Code keyboard shortcuts on Windows — palette, multi-cursor, and navigation.",
    appId: "vscode",
    os: "windows",
    steps: [
      {
        heading: "Run any command",
        body: "Open the Command Palette to access every VS Code feature.",
        combos: [{ os: "windows", combo: "Ctrl+Shift+P" }],
      },
      {
        heading: "Open a file by name",
        body: "Quick Open jumps to any file in your workspace.",
        combos: [{ os: "windows", combo: "Ctrl+P" }],
      },
      {
        heading: "Toggle the terminal",
        body: "Show or hide the integrated terminal.",
        combos: [{ os: "windows", combo: "Ctrl+`" }],
      },
    ],
  },
  {
    slug: "chrome-shortcuts-mac",
    title: "Chrome keyboard shortcuts for Mac",
    description: "Every important Chrome keyboard shortcut on macOS — tabs, navigation, dev tools, and more.",
    appId: "chrome",
    os: "macos",
    steps: [
      {
        heading: "Reopen the last closed tab",
        body: "Recover a tab you closed by accident.",
        combos: [{ os: "macos", combo: "Cmd+Shift+T" }],
      },
      {
        heading: "Switch to a tab by number",
        body: "Cmd + 1 through Cmd + 8 jumps to that tab; Cmd + 9 jumps to the last tab.",
        combos: [{ os: "macos", combo: "Cmd+1" }],
      },
      {
        heading: "Open DevTools",
        body: "Open Chrome DevTools instantly.",
        combos: [{ os: "macos", combo: "Cmd+Alt+I" }],
      },
    ],
  },
  {
    slug: "chrome-shortcuts-windows",
    title: "Chrome keyboard shortcuts for Windows",
    description: "Essential Chrome keyboard shortcuts on Windows — tabs, navigation, dev tools, and incognito.",
    appId: "chrome",
    os: "windows",
    steps: [
      {
        heading: "Reopen the last closed tab",
        body: "Recover a tab you closed by accident.",
        combos: [{ os: "windows", combo: "Ctrl+Shift+T" }],
      },
      {
        heading: "Open DevTools",
        body: "Open Chrome DevTools instantly.",
        combos: [{ os: "windows", combo: "Ctrl+Shift+I" }],
      },
      {
        heading: "Open an incognito window",
        body: "Start a new incognito session.",
        combos: [{ os: "windows", combo: "Ctrl+Shift+N" }],
      },
    ],
  },
  {
    slug: "notion-shortcuts",
    title: "Essential Notion keyboard shortcuts",
    description: "The Notion shortcuts power users rely on every day — across blocks, pages, and search.",
    appId: "notion",
    steps: [
      {
        heading: "Quick Find",
        body: "Search anything across your workspace.",
        combos: [
          { os: "macos", combo: "Cmd+P" },
          { os: "windows", combo: "Ctrl+P" },
        ],
      },
      {
        heading: "Toggle dark mode",
        body: "Flip between light and dark.",
        combos: [
          { os: "macos", combo: "Cmd+Shift+L" },
          { os: "windows", combo: "Ctrl+Shift+L" },
        ],
      },
    ],
  },
  {
    slug: "figma-shortcuts",
    title: "Figma keyboard shortcuts cheatsheet",
    description: "The Figma shortcuts designers use most — frames, components, and selection.",
    appId: "figma",
    steps: [
      {
        heading: "Open the shortcuts overlay",
        body: "Figma has a built-in keyboard help overlay.",
        combos: [
          { os: "macos", combo: "Ctrl+Shift+?" },
          { os: "windows", combo: "Ctrl+Shift+?" },
        ],
      },
      {
        heading: "Frame selection",
        body: "Wrap the selection in a frame.",
        combos: [
          { os: "macos", combo: "Cmd+Alt+G" },
          { os: "windows", combo: "Ctrl+Alt+G" },
        ],
      },
    ],
  },
  {
    slug: "slack-shortcuts",
    title: "Slack keyboard shortcuts you should know",
    description: "Slack shortcuts for jumping between channels, threads, and DMs — fast.",
    appId: "slack",
    steps: [
      {
        heading: "Quick Switcher",
        body: "Jump to any channel, DM, or workspace.",
        combos: [
          { os: "macos", combo: "Cmd+K" },
          { os: "windows", combo: "Ctrl+K" },
        ],
      },
      {
        heading: "Mark all as read",
        body: "Clear unreads everywhere.",
        combos: [
          { os: "macos", combo: "Shift+Esc" },
          { os: "windows", combo: "Shift+Esc" },
        ],
      },
    ],
  },
  {
    slug: "cursor-keyboard-shortcuts",
    title: "Cursor keyboard shortcuts",
    description: "Cursor's AI-first shortcuts on top of the VS Code shortcuts you already know.",
    appId: "cursor",
    steps: [
      {
        heading: "Inline edit",
        body: "Edit selected code with AI.",
        combos: [
          { os: "macos", combo: "Cmd+K" },
          { os: "windows", combo: "Ctrl+K" },
        ],
      },
      {
        heading: "Open AI chat",
        body: "Bring up the chat panel for the current file.",
        combos: [
          { os: "macos", combo: "Cmd+L" },
          { os: "windows", combo: "Ctrl+L" },
        ],
      },
    ],
  },
];
