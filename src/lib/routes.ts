import { APPS, SHORTCUTS } from "../data";
import { shortcutSlug } from "./slugs";
import { HOWTOS } from "../data/howtos";
import type { OS } from "./types";

const OS_LIST: OS[] = ["macos", "windows", "linux"];

export interface RouteSpec {
  path: string;
  changefreq?: "weekly" | "monthly" | "daily";
  priority?: number;
}

export function enumerateRoutes(): RouteSpec[] {
  const out: RouteSpec[] = [];

  out.push({ path: "/", changefreq: "weekly", priority: 1.0 });
  out.push({ path: "/apps", changefreq: "weekly", priority: 0.9 });
  out.push({ path: "/browse", changefreq: "weekly", priority: 0.7 });
  out.push({ path: "/compare", changefreq: "weekly", priority: 0.7 });

  for (const o of OS_LIST) {
    out.push({ path: `/os/${o}`, changefreq: "weekly", priority: 0.9 });
    out.push({ path: `/os/${o}/cheatsheet`, changefreq: "monthly", priority: 0.6 });
  }

  for (const app of APPS) {
    out.push({ path: `/apps/${app.id}`, changefreq: "weekly", priority: 0.8 });
    if (app.supportedOS.length > 1) {
      out.push({ path: `/compare/${app.id}`, changefreq: "weekly", priority: 0.7 });
    }
    for (const o of app.supportedOS) {
      out.push({ path: `/apps/${app.id}/${o}`, changefreq: "weekly", priority: 0.9 });
    }
  }

  for (const s of SHORTCUTS) {
    out.push({
      path: `/shortcut/${s.appId}/${shortcutSlug(s)}`,
      changefreq: "monthly",
      priority: 0.5,
    });
  }

  for (const ht of HOWTOS) {
    out.push({ path: `/how-to/${ht.slug}`, changefreq: "monthly", priority: 0.7 });
  }

  return out;
}

// Path lists used by vite-react-ssg getStaticPaths (strip leading slash, only the dynamic segment)
export function staticAppsParams(): string[] {
  return APPS.map((a) => a.id);
}

export function staticAppOSParams(): string[] {
  const out: string[] = [];
  for (const a of APPS) for (const o of a.supportedOS) out.push(`${a.id}/${o}`);
  return out;
}

export function staticOSParams(): string[] {
  return OS_LIST;
}

export function staticShortcutParams(): string[] {
  return SHORTCUTS.map((s) => `${s.appId}/${shortcutSlug(s)}`);
}

export function staticHowtoParams(): string[] {
  return HOWTOS.map((h) => h.slug);
}

export function staticCompareParams(): string[] {
  return APPS.filter((a) => a.supportedOS.length > 1).map((a) => a.id);
}
