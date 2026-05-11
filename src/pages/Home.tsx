import { useMemo, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Palette } from "../components/Palette";
import { Keyboard, comboToKeySet } from "../components/Keyboard";
import { Seo } from "../components/Seo";
import type { Shortcut } from "../lib/types";
import type { LayoutContext } from "../components/Layout";

export function Component() {
  const ctx = useOutletContext<LayoutContext>();
  const { os, setSelectedShortcut } = ctx;
  const navigate = useNavigate();
  const [focused, setFocused] = useState<Shortcut | null>(null);

  const highlighted = useMemo(() => {
    if (!focused) return new Set<string>();
    const combos = focused.combos[os] ?? [];
    if (combos.length === 0) return new Set<string>();
    return comboToKeySet(combos[0]);
  }, [focused, os]);

  return (
    <>
      <Seo
        title="Hotkey Lookup — Keyboard Shortcuts for macOS, Windows & Linux"
        description="Search keyboard shortcuts across macOS, Windows, and Linux — system-wide and for the apps you use every day. Or press a combo and see what it does everywhere."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Hotkey Lookup",
            url: "https://hotkeylookup.com/",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "macOS, Windows, Linux",
            isAccessibleForFree: true,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is Hotkey Lookup?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A free web tool for searching and comparing keyboard shortcuts across macOS, Windows, and Linux — both system-wide and for popular apps like Chrome, VS Code, Figma, Slack, Notion, and more.",
                },
              },
              {
                "@type": "Question",
                name: "Is Hotkey Lookup free?",
                acceptedAnswer: { "@type": "Answer", text: "Yes — completely free, no account required." },
              },
              {
                "@type": "Question",
                name: "Can I look up what a key combination does?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Listen mode lets you press a key combination and see what it does across macOS, Windows, Linux, and the apps you use.",
                },
              },
            ],
          },
        ]}
      />
      <div className="home">
        <div className="home-header">
          <h1 className="home-title">Every shortcut, every OS.</h1>
          <p className="home-sub">Search by name, browse by app, or press a combo to identify it.</p>
        </div>

        <Palette
          os={os}
          onPick={setSelectedShortcut}
          onPickApp={(appId) => navigate(`/apps/${appId}/${os}`)}
          onFocusedShortcut={setFocused}
          autoFocus
        />

        <div className="hero-kb">
          <Keyboard os={os} highlighted={highlighted} />
          <div className="kb-caption">
            {focused ? (
              <>
                highlighted: <span className="kb-cap-name">{focused.function}</span>
              </>
            ) : (
              "type to search — keys light up below"
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Component;
