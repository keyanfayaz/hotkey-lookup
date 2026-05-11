import { Link, useParams } from "react-router-dom";
import { SHORTCUTS } from "../data";
import { KeyCombo } from "../components/KeyCombo";
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
  const items = SHORTCUTS.filter((s) => s.appId === systemAppId);
  const cats = [...new Set(items.map((s) => s.category).filter(Boolean))] as string[];

  return (
    <>
      <Seo
        title={`Printable ${OS_LABELS[os]} Shortcut Cheatsheet | Hotkey Lookup`}
        description={`A printable, printable-friendly cheatsheet of every ${OS_LABELS[os]} system shortcut — organized by category. Free, no signup.`}
        path={`/os/${os}/cheatsheet`}
      />
      <div className="page">
        <Link className="back-btn" to={`/os/${os}`}>← {OS_LABELS[os]}</Link>
        <div className="cheat-hero">
          <div className="cheat-hero-text">
            <h1>{OS_LABELS[os]} cheatsheet</h1>
            <p className="page-lede">{items.length} system shortcuts · printable</p>
          </div>
        </div>

        <div className="cheat-grid">
          {cats.map((cat) => {
            const inCat = items.filter((s) => s.category === cat);
            return (
              <section key={cat} className="cheat-section">
                <h2>{cat}</h2>
                <div className="cheat-list">
                  {inCat.map((s) => {
                    const combos = s.combos[os] ?? [];
                    return (
                      <div key={s.id} className="cheat-row" style={{ cursor: "default" }}>
                        <span className="cheat-name">{s.function}</span>
                        <span>
                          {combos.length > 0 ? (
                            <KeyCombo combo={combos[0]} os={os} />
                          ) : (
                            <span className="keys-na">—</span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Component;
