import { useEffect, useMemo } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";
import { APP_BY_ID } from "../data";
import { findShortcutBySlug, shortcutPath } from "../lib/slugs";
import { Keyboard, comboToKeySet } from "../components/Keyboard";
import { KeyCombo } from "../components/KeyCombo";
import { AppGlyph } from "../components/AppIcon";
import { RecommendedGear } from "../components/RecommendedGear";
import { CarbonAd } from "../components/CarbonAd";
import { Seo } from "../components/Seo";
import { NotFoundContent } from "./NotFound";
import { getRelated } from "../data/_generated/related";
import { SHORTCUTS } from "../data";
import type { OS, Shortcut } from "../lib/types";
import type { LayoutContext } from "../components/Layout";

const OS_LABELS: Record<OS, string> = {
  macos: "macOS",
  windows: "Windows",
  linux: "Linux",
};

const OS_VALID: OS[] = ["macos", "windows", "linux"];

export function Component() {
  const { appSlug, actionSlug } = useParams<{ appSlug: string; actionSlug: string }>();
  const { os } = useOutletContext<LayoutContext>();

  const shortcut = appSlug && actionSlug ? findShortcutBySlug(appSlug, actionSlug) : null;

  // Hooks must be called unconditionally
  const app = shortcut ? APP_BY_ID[shortcut.appId] : undefined;
  const supportedOS = useMemo<OS[]>(() => {
    if (!shortcut) return [];
    return OS_VALID.filter((o) => (shortcut.combos[o] ?? []).length > 0);
  }, [shortcut]);
  const displayOS: OS = supportedOS.includes(os) ? os : (supportedOS[0] ?? "macos");
  const currentCombos = shortcut?.combos[displayOS] ?? [];
  const highlighted = useMemo(() => {
    if (currentCombos.length === 0) return new Set<string>();
    return comboToKeySet(currentCombos[0]);
  }, [currentCombos]);
  const related = useMemo<Shortcut[]>(() => {
    if (!shortcut) return [];
    return getRelated(shortcut.id)
      .map((id) => SHORTCUTS.find((s) => s.id === id))
      .filter(Boolean) as Shortcut[];
  }, [shortcut]);

  useEffect(() => {
    if (typeof document !== "undefined" && shortcut) {
      // noop, kept to ensure consistent hook order under SSR
    }
  }, [shortcut]);

  if (!shortcut || !app) return <NotFoundContent label="Shortcut not found" />;

  const title = `${shortcut.function} — ${app.name} keyboard shortcut${supportedOS.length === 1 ? ` (${OS_LABELS[supportedOS[0]]})` : " (Mac, Windows, Linux)"} | Hotkey Lookup`;
  const description = `${shortcut.function} in ${app.name}: ${currentCombos[0] ?? "no shortcut"} on ${OS_LABELS[displayOS]}.${supportedOS.length > 1 ? ` See the ${app.name} keyboard shortcut on macOS, Windows, and Linux.` : ""} ${shortcut.description ?? ""}`.trim();
  const keywords = [
    `${shortcut.function} ${app.name}`,
    `${app.name} ${shortcut.function} shortcut`,
    `${app.name} keyboard shortcuts`,
    ...supportedOS.map((o) => `${shortcut.function} ${app.name} ${OS_LABELS[o]}`),
    `${app.name} hotkeys`,
    "keyboard shortcuts",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to: ${shortcut.function} in ${app.name}`,
    description,
    step: supportedOS.map((o) => ({
      "@type": "HowToStep",
      name: `On ${OS_LABELS[o]}`,
      text: (shortcut.combos[o] ?? []).join(" or "),
    })),
  };

  return (
    <>
      <Seo
        title={title}
        description={description}
        path={shortcutPath(shortcut)}
        jsonLd={jsonLd}
        keywords={keywords}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: app.name, path: `/apps/${app.id}` },
          { name: OS_LABELS[displayOS], path: `/apps/${app.id}/${displayOS}` },
          { name: shortcut.function, path: shortcutPath(shortcut) },
        ]}
      />
      <div className="page">
        <Link className="back-btn" to={`/apps/${app.id}/${displayOS}`}>← {app.name}</Link>

        <div className="cheat-hero">
          <AppGlyph appId={app.id} name={app.name} size="lg" />
          <div className="cheat-hero-text">
            <h1>{shortcut.function}</h1>
            <p className="page-lede">
              {app.name}
              {shortcut.category && <> · {shortcut.category}</>}
            </p>
          </div>
        </div>

        <section className="cheat-section">
          <h2>Shortcut on {OS_LABELS[displayOS]}</h2>
          <div className="smodal-combos">
            {currentCombos.length > 0 ? (
              currentCombos.map((c) => <KeyCombo key={c} combo={c} os={displayOS} />)
            ) : (
              <span className="keys-na">No shortcut on {OS_LABELS[displayOS]}</span>
            )}
          </div>
          <Keyboard os={displayOS} highlighted={highlighted} scale={0.85} />
        </section>

        {supportedOS.length > 1 && (
          <section className="cheat-section">
            <h2>Across operating systems</h2>
            <div className="smodal-cross-os">
              {supportedOS.map((o) => (
                <div key={o} className="smodal-os-col">
                  <div className="smodal-os-label">{OS_LABELS[o]}</div>
                  {(shortcut.combos[o] ?? []).map((c) => (
                    <KeyCombo key={c} combo={c} os={o} />
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {shortcut.description && (
          <section className="cheat-section">
            <h2>About</h2>
            <p>{shortcut.description}</p>
          </section>
        )}

        {related.length > 0 && (
          <section className="cheat-section">
            <h2>Related shortcuts</h2>
            <div className="cheat-list">
              {related.map((r) => {
                const ra = APP_BY_ID[r.appId];
                const combos = r.combos[displayOS] ?? Object.values(r.combos)[0] ?? [];
                return (
                  <Link key={r.id} to={shortcutPath(r)} className="cheat-row">
                    <span className="cheat-name">
                      <AppGlyph appId={r.appId} name={ra?.name ?? r.appId} />
                      {r.function}
                      {ra && <span className="related-app"> · {ra.name}</span>}
                    </span>
                    <span>
                      {combos.length > 0 ? (
                        <KeyCombo combo={combos[0]} os={displayOS} />
                      ) : (
                        <span className="keys-na">—</span>
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <CarbonAd placement="footer" />
        <RecommendedGear appId={app.id} os={displayOS} />
      </div>
    </>
  );
}

export default Component;
