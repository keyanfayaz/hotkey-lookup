import type { Shortcut } from "../lib/types";
import { APPS, APP_BY_ID } from "./apps";
import { SHORTCUTS as SYS_MAC } from "./shortcuts/system-macos";
import { SHORTCUTS as SYS_WIN } from "./shortcuts/system-windows";
import { SHORTCUTS as SYS_LIN } from "./shortcuts/system-linux";
import { SHORTCUTS as CHROME } from "./shortcuts/chrome";
import { SHORTCUTS as FIREFOX } from "./shortcuts/firefox";
import { SHORTCUTS as SAFARI } from "./shortcuts/safari";
import { SHORTCUTS as VSCODE } from "./shortcuts/vscode";
import { SHORTCUTS as SLACK } from "./shortcuts/slack";
import { SHORTCUTS as FIGMA } from "./shortcuts/figma";
import { SHORTCUTS as GDOCS } from "./shortcuts/google-docs";

export const SHORTCUTS: Shortcut[] = [
  ...SYS_MAC,
  ...SYS_WIN,
  ...SYS_LIN,
  ...CHROME,
  ...FIREFOX,
  ...SAFARI,
  ...VSCODE,
  ...SLACK,
  ...FIGMA,
  ...GDOCS,
];

export { APPS, APP_BY_ID };
