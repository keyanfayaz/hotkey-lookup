import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { APPS, SHORTCUTS } from "../data";
import { AppGlyph } from "../components/AppIcon";
import { Seo } from "../components/Seo";
import type { LayoutContext } from "../components/Layout";

export function Component() {
  const { os } = useOutletContext<LayoutContext>();

  const counts: Record<string, number> = {};
  for (const s of SHORTCUTS) counts[s.appId] = (counts[s.appId] ?? 0) + 1;

  return (
    <>
      <Seo
        title="All Apps — Keyboard Shortcut Cheatsheets | Hotkey Lookup"
        description="Browse keyboard shortcuts for every supported app: VS Code, Chrome, Figma, Notion, Slack, Linear, and more — across macOS, Windows, and Linux."
        path="/apps"
      />
      <div className="page">
        <div className="page-head">
          <div>
            <h1>All apps</h1>
            <p className="page-lede">Pick an app for its full cheatsheet.</p>
          </div>
          <div className="page-meta">{APPS.length} apps · {SHORTCUTS.length} hotkeys</div>
        </div>
        <div className="app-grid">
          {APPS.map((app) => {
            const target = app.id.startsWith("system-")
              ? `/apps/${app.id}/${app.supportedOS[0]}`
              : `/apps/${app.id}/${os}`;
            return (
              <Link key={app.id} to={target} className="app-card">
                <div className="app-card-top">
                  <AppGlyph appId={app.id} name={app.name} />
                  <span className="app-card-count">{String(counts[app.id] ?? 0).padStart(2, "0")}</span>
                </div>
                <div className="app-card-name">{app.name}</div>
                {app.hint && <div className="app-card-hint">{app.hint}</div>}
                <div className="app-card-arrow">→</div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Component;
