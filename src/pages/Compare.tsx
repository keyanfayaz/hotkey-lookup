import { Link, useParams } from "react-router-dom";
import { Compare as CompareView } from "../components/Compare";
import { Seo } from "../components/Seo";
import { APP_BY_ID } from "../data";

export function Component() {
  const { appSlug } = useParams<{ appSlug?: string }>();
  const app = appSlug ? APP_BY_ID[appSlug] : undefined;

  if (appSlug && !app) {
    return (
      <div className="page">
        <p>App not found.</p>
      </div>
    );
  }

  const title = app
    ? `${app.name} Shortcuts — Mac vs Windows vs Linux Compared | Hotkey Lookup`
    : "Compare Keyboard Shortcuts: macOS vs Windows vs Linux | Hotkey Lookup";
  const description = app
    ? `${app.name} keyboard shortcuts compared side by side across macOS, Windows, and Linux. See how every ${app.name} hotkey maps from Mac to PC to Linux.`
    : "Compare keyboard shortcuts across macOS, Windows, and Linux. Side-by-side cheatsheet of system hotkeys and shortcuts for popular apps like VS Code, Chrome, Figma, Slack, and Notion.";
  const path = app ? `/compare/${app.id}` : "/compare";
  const keywords = app
    ? [
        `${app.name} shortcuts Mac vs Windows`,
        `${app.name} keyboard shortcuts macOS Windows Linux`,
        `${app.name} cross-platform hotkeys`,
        `${app.name} keybindings comparison`,
        "keyboard shortcuts comparison",
      ]
    : [
        "Mac vs Windows keyboard shortcuts",
        "macOS Windows Linux shortcuts",
        "keyboard shortcuts comparison",
        "cross-platform hotkeys",
        "Mac to PC shortcut conversion",
      ];

  return (
    <>
      <Seo
        title={title}
        description={description}
        path={path}
        keywords={keywords}
        breadcrumbs={
          app
            ? [
                { name: "Home", path: "/" },
                { name: app.name, path: `/apps/${app.id}` },
                { name: "Compare", path: `/compare/${app.id}` },
              ]
            : [
                { name: "Home", path: "/" },
                { name: "Compare", path: "/compare" },
              ]
        }
      />
      <div className="page">
        <div className="page-head">
          <div>
            <h1>{app ? `${app.name}: macOS vs Windows vs Linux` : "Compare across OSes"}</h1>
            <p className="page-lede">Same action. Three keyboards. One row.</p>
          </div>
          {app && <Link to={`/apps/${app.id}`}>← {app.name}</Link>}
        </div>
        <CompareView embedded />
      </div>
    </>
  );
}

export default Component;
