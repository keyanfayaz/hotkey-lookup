import type { RouteRecord } from "vite-react-ssg";
import Layout from "./components/Layout";
import {
  staticAppOSParams,
  staticAppsParams,
  staticCompareParams,
  staticHowtoParams,
  staticOSParams,
  staticShortcutParams,
} from "./lib/routes";

export const routes: RouteRecord[] = [
  {
    path: "/",
    Component: Layout,
    entry: "src/components/Layout.tsx",
    children: [
      {
        index: true,
        lazy: () => import("./pages/Home"),
      },
      {
        path: "apps",
        lazy: () => import("./pages/AppsIndex"),
      },
      {
        path: "apps/:appSlug",
        lazy: () => import("./pages/AppOverview"),
        getStaticPaths: () => staticAppsParams().map((p) => `apps/${p}`),
      },
      {
        path: "apps/:appSlug/:os",
        lazy: () => import("./pages/AppOS"),
        getStaticPaths: () => staticAppOSParams().map((p) => `apps/${p}`),
      },
      {
        path: "os/:os",
        lazy: () => import("./pages/OSHub"),
        getStaticPaths: () => staticOSParams().map((p) => `os/${p}`),
      },
      {
        path: "os/:os/cheatsheet",
        lazy: () => import("./pages/OSCheatsheet"),
        getStaticPaths: () => staticOSParams().map((p) => `os/${p}/cheatsheet`),
      },
      {
        path: "shortcut/:appSlug/:actionSlug",
        lazy: () => import("./pages/ShortcutDetail"),
        getStaticPaths: () => staticShortcutParams().map((p) => `shortcut/${p}`),
      },
      {
        path: "compare",
        lazy: () => import("./pages/Compare"),
      },
      {
        path: "compare/:appSlug",
        lazy: () => import("./pages/Compare"),
        getStaticPaths: () => staticCompareParams().map((p) => `compare/${p}`),
      },
      {
        path: "browse",
        lazy: () => import("./pages/BrowsePage"),
      },
      {
        path: "how-to/:slug",
        lazy: () => import("./pages/HowTo"),
        getStaticPaths: () => staticHowtoParams().map((p) => `how-to/${p}`),
      },
      {
        path: "*",
        lazy: () => import("./pages/NotFound"),
      },
    ],
  },
];

export default routes;
