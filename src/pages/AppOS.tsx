import { Link, useParams, useOutletContext } from "react-router-dom";
import { APP_BY_ID, APPS, SHORTCUTS } from "../data";
import { AppGlyph } from "../components/AppIcon";
import { KeyCombo } from "../components/KeyCombo";
import { CarbonAd } from "../components/CarbonAd";
import { RecommendedGear } from "../components/RecommendedGear";
import { Seo } from "../components/Seo";
import { NotFoundContent } from "./NotFound";
import { shortcutPath } from "../lib/slugs";
import type { OS } from "../lib/types";
import type { LayoutContext } from "../components/Layout";

const OS_LABELS: Record<OS, string> = {
  macos: "macOS",
  windows: "Windows",
  linux: "Linux",
};

const OS_VALID: OS[] = ["macos", "windows", "linux"];

export function Component() {
  const { appSlug, os: osParam } = useParams<{ appSlug: string; os: string }>();
  const { setSelectedShortcut } = useOutletContext<LayoutContext>();

  const app = appSlug ? APP_BY_ID[appSlug] : undefined;
  const os = OS_VALID.includes(osParam as OS) ? (osParam as OS) : null;

  if (!app || !os) return <NotFoundContent label="Page not found" />;
  if (!app.supportedOS.includes(os)) {
    return (
      <NotFoundContent
        label={`${app.name} is not supported on ${OS_LABELS[os]}`}
      />
    );
  }

  const items = SHORTCUTS.filter((s) => s.appId === app.id);
  const cats = [...new Set(items.map((s) => s.category).filter(Boolean))] as string[];

  const sidebarApps = app.id.startsWith("system-")
    ? APPS.filter((a) => !a.id.startsWith("system-") && a.supportedOS.includes(os))
    : [];

  const title = `${app.name} Keyboard Shortcuts for ${OS_LABELS[os]} | Hotkey Lookup`;
  const description = `Complete list of ${app.name} keyboard shortcuts on ${OS_LABELS[os]}. ${items.length} shortcuts organized by category. Free, no signup, mobile-friendly.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${app.name} keyboard shortcuts on ${OS_LABELS[os]}`,
    numberOfItems: items.length,
    itemListElement: items.slice(0, 50).map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.function,
      url: `https://hotkeylookup.com${shortcutPath(s)}`,
    })),
  };

  const shortcuts = (
    <div className="cheat-grid">
      {cats.map((cat) => {
        const inCat = items.filter((s) => s.category === cat);
        if (inCat.length === 0) return null;
        return (
          <section key={cat} className="cheat-section">
            <h2>{cat}</h2>
            <div className="cheat-list">
              {inCat.map((s) => {
                const combos = s.combos[os] ?? [];
                return (
                  <button key={s.id} className="cheat-row" onClick={() => setSelectedShortcut(s)}>
                    <span className="cheat-name">{s.function}</span>
                    <span>
                      {combos.length > 0 ? (
                        <KeyCombo combo={combos[0]} os={os} />
                      ) : (
                        <span className="keys-na">—</span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
      {cats.length === 0 && items.length > 0 && (
        <div className="cheat-list">
          {items.map((s) => {
            const combos = s.combos[os] ?? [];
            return (
              <button key={s.id} className="cheat-row" onClick={() => setSelectedShortcut(s)}>
                <span className="cheat-name">{s.function}</span>
                <span>
                  {combos.length > 0 ? (
                    <KeyCombo combo={combos[0]} os={os} />
                  ) : (
                    <span className="keys-na">—</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      )}
      {items.length === 0 && (
        <p style={{ color: "var(--fg-3)", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
          No shortcuts for this app yet.
        </p>
      )}

      {/* Hidden anchor list for crawler discovery of shortcut detail pages */}
      <div className="sr-only" aria-hidden>
        {items.map((s) => (
          <a key={s.id} href={shortcutPath(s)}>{s.function}</a>
        ))}
      </div>
    </div>
  );

  const otherOSes = app.supportedOS.filter((o) => o !== os);

  return (
    <>
      <Seo title={title} description={description} path={`/apps/${app.id}/${os}`} jsonLd={jsonLd} />
      <div className="page">
        <Link className="back-btn" to={`/apps/${app.id}`}>← {app.name}</Link>
        <div className="cheat-hero">
          <AppGlyph appId={app.id} name={app.name} size="lg" />
          <div className="cheat-hero-text">
            <h1>{app.name} shortcuts for {OS_LABELS[os]}</h1>
            <p className="page-lede">
              {items.length} shortcuts{cats.length > 0 ? ` · ${cats.length} categories` : ""}
              {app.hint && <> · {app.hint}</>}
            </p>
            {otherOSes.length > 0 && (
              <p className="cheat-os-toggle">
                Also available:{" "}
                {otherOSes.map((o, i) => (
                  <span key={o}>
                    {i > 0 && " · "}
                    <Link to={`/apps/${app.id}/${o}`}>{OS_LABELS[o]}</Link>
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>

        {sidebarApps.length > 0 ? (
          <div className="cheat-with-sidebar">
            <div className="cheat-main">{shortcuts}</div>
            <aside className="cheat-sidebar">
              <CarbonAd placement="sidebar" />
              <div className="cheat-sidebar-head">Apps for {app.name}</div>
              <div className="cheat-sidebar-list">
                {sidebarApps.map((a) => (
                  <Link
                    key={a.id}
                    to={`/apps/${a.id}/${os}`}
                    className="cheat-sidebar-row"
                  >
                    <AppGlyph appId={a.id} name={a.name} />
                    <div className="cheat-sidebar-text">
                      <div className="cheat-sidebar-name">{a.name}</div>
                      {a.hint && <div className="cheat-sidebar-hint">{a.hint}</div>}
                    </div>
                    <span className="cheat-sidebar-arrow">→</span>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        ) : (
          <div className="cheat-with-sidebar">
            <div className="cheat-main">{shortcuts}</div>
            <aside className="cheat-sidebar">
              <CarbonAd placement="sidebar" />
            </aside>
          </div>
        )}

        <RecommendedGear appId={app.id} os={os} />
      </div>
    </>
  );
}

export default Component;
