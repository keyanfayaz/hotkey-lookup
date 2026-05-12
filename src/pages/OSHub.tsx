import { Link, useParams } from "react-router-dom";
import { APPS, SHORTCUTS } from "../data";
import { AppGlyph, OSIcon } from "../components/AppIcon";
import { CarbonAd } from "../components/CarbonAd";
import { Seo } from "../components/Seo";
import { NotFoundContent } from "./NotFound";
import type { OS } from "../lib/types";

const OS_LABELS: Record<OS, string> = {
  macos: "macOS",
  windows: "Windows",
  linux: "Linux",
};

const OS_VALID: OS[] = ["macos", "windows", "linux"];

export function Component() {
  const { os: osParam } = useParams<{ os: string }>();
  const os = OS_VALID.includes(osParam as OS) ? (osParam as OS) : null;
  if (!os) return <NotFoundContent label="OS not found" />;

  const systemAppId = `system-${os}`;
  const apps = APPS.filter((a) => a.supportedOS.includes(os));
  const totalShortcuts = SHORTCUTS.filter((s) =>
    APPS.find((a) => a.id === s.appId)?.supportedOS.includes(os),
  ).length;

  return (
    <>
      <Seo
        title={`${OS_LABELS[os]} Keyboard Shortcuts — System + App Cheatsheets | Hotkey Lookup`}
        description={`The complete ${OS_LABELS[os]} keyboard shortcuts guide — system hotkeys plus VS Code, Chrome, Figma, Slack, Notion, and more. ${totalShortcuts} shortcuts across ${apps.length} apps. Free, searchable, no signup.`}
        path={`/os/${os}`}
        keywords={[
          `${OS_LABELS[os]} keyboard shortcuts`,
          `${OS_LABELS[os]} hotkeys`,
          `${OS_LABELS[os]} shortcuts`,
          `${OS_LABELS[os]} cheatsheet`,
          `${OS_LABELS[os]} system shortcuts`,
          `${OS_LABELS[os]} keybindings`,
          ...apps.slice(0, 8).map((a) => `${a.name} shortcuts ${OS_LABELS[os]}`),
          "keyboard shortcuts",
          "hotkeys",
        ]}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: OS_LABELS[os], path: `/os/${os}` },
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${OS_LABELS[os]} keyboard shortcuts`,
          description: `Keyboard shortcut cheatsheets for ${OS_LABELS[os]} apps and the system itself.`,
          url: `https://hotkeylookup.com/os/${os}`,
        }}
      />
      <div className="page">
        <div className="cheat-hero">
          <OSIcon os={os} size={48} />
          <div className="cheat-hero-text">
            <h1>{OS_LABELS[os]} keyboard shortcuts</h1>
            <p className="page-lede">
              {totalShortcuts} shortcuts across {apps.length} apps and the system itself.
            </p>
            <p className="page-intro">
              Every {OS_LABELS[os]} keyboard shortcut in one place — system-wide hotkeys plus per-app cheatsheets for VS Code, Chrome, Figma, Slack, Notion, Linear, and more. Pick an app for its full {OS_LABELS[os]} shortcut list.
            </p>
            <p className="cheat-os-toggle">
              <Link to={`/apps/${systemAppId}/${os}`}>System shortcuts →</Link>
              {" · "}
              <Link to={`/os/${os}/cheatsheet`}>Printable cheatsheet →</Link>
            </p>
          </div>
        </div>

        <CarbonAd placement="footer" />

        <h2 style={{ marginTop: "32px" }}>Apps that work on {OS_LABELS[os]}</h2>
        <div className="app-grid">
          {apps.map((app) => {
            const count = SHORTCUTS.filter((s) => s.appId === app.id).length;
            return (
              <Link key={app.id} to={`/apps/${app.id}/${os}`} className="app-card">
                <div className="app-card-top">
                  <AppGlyph appId={app.id} name={app.name} />
                  <span className="app-card-count">{String(count).padStart(2, "0")}</span>
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
