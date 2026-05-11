import { Link, useParams, useOutletContext } from "react-router-dom";
import { APP_BY_ID, SHORTCUTS } from "../data";
import { AppGlyph, OSIcon } from "../components/AppIcon";
import { Seo } from "../components/Seo";
import { NotFoundContent } from "./NotFound";
import type { OS } from "../lib/types";
import type { LayoutContext } from "../components/Layout";

const OS_LABELS: Record<OS, string> = {
  macos: "macOS",
  windows: "Windows",
  linux: "Linux",
};

export function Component() {
  const { appSlug } = useParams<{ appSlug: string }>();
  const { os } = useOutletContext<LayoutContext>();
  const app = appSlug ? APP_BY_ID[appSlug] : undefined;

  if (!app) return <NotFoundContent label="App not found" />;

  const items = SHORTCUTS.filter((s) => s.appId === app.id);
  const supported = app.supportedOS;
  const preferredOS = supported.includes(os) ? os : supported[0];

  return (
    <>
      <Seo
        title={`${app.name} Keyboard Shortcuts | Hotkey Lookup`}
        description={`${items.length} ${app.name} keyboard shortcuts across ${supported.length === 1 ? OS_LABELS[supported[0]] : "macOS, Windows, and Linux"}. Searchable cheatsheet with side-by-side OS combos.`}
        path={`/apps/${app.id}`}
      />
      <div className="page">
        <Link className="back-btn" to="/apps">← All apps</Link>
        <div className="cheat-hero">
          <AppGlyph appId={app.id} name={app.name} size="lg" />
          <div className="cheat-hero-text">
            <h1>{app.name} shortcuts</h1>
            <p className="page-lede">
              {items.length} shortcuts
              {app.hint && <> · {app.hint}</>}
            </p>
          </div>
        </div>

        <div className="os-picker">
          <div className="os-picker-head">Pick your OS</div>
          <div className="os-picker-list">
            {supported.map((o) => (
              <Link
                key={o}
                to={`/apps/${app.id}/${o}`}
                className={`os-picker-card${o === preferredOS ? " on" : ""}`}
              >
                <OSIcon os={o} size={20} />
                <span>{app.name} for {OS_LABELS[o]}</span>
                <span className="os-picker-arrow">→</span>
              </Link>
            ))}
          </div>
          {supported.length > 1 && (
            <Link to={`/compare/${app.id}`} className="compare-link">
              Compare {app.name} shortcuts across all OSes →
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Component;
