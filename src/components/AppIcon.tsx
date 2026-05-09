import type { OS } from "../lib/types";

interface IconProps {
  appId: string;
  size?: number;
}

export function AppIcon({ appId, size = 16 }: IconProps) {
  const s = size;
  const stroke = {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (appId) {
    case "system-macos":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.05 12.5c-.03-2.9 2.37-4.3 2.48-4.36-1.35-1.97-3.45-2.24-4.2-2.27-1.78-.18-3.49 1.05-4.4 1.05-.92 0-2.32-1.02-3.82-1-2 .03-3.78 1.14-4.79 2.89-2.04 3.54-.52 8.78 1.47 11.66.97 1.4 2.13 2.98 3.65 2.93 1.46-.06 2.02-.94 3.78-.94 1.76 0 2.27.94 3.81.92 1.58-.03 2.58-1.43 3.54-2.85 1.12-1.62 1.57-3.21 1.6-3.3-.04-.01-3.06-1.17-3.12-4.63zM14.18 4.5c.81-.99 1.36-2.36 1.21-3.72-1.17.05-2.6.78-3.43 1.76-.74.87-1.4 2.27-1.22 3.6 1.3.1 2.63-.66 3.44-1.64z" />
        </svg>
      );

    case "system-windows":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <rect x="3" y="3" width="8.5" height="8.5" rx="0.6" />
          <rect x="12.5" y="3" width="8.5" height="8.5" rx="0.6" />
          <rect x="3" y="12.5" width="8.5" height="8.5" rx="0.6" />
          <rect x="12.5" y="12.5" width="8.5" height="8.5" rx="0.6" />
        </svg>
      );

    case "system-linux":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2.5c-2.1 0-3.7 1.7-3.7 4.2 0 1.05.3 1.85.5 2.6.2.7.4 1.3.4 2L7.1 17c-.55 1.05.05 2 .9 2h1.45l-.8 1.85a.7.7 0 0 0 .65 1h5.4a.7.7 0 0 0 .65-1L14.55 19H16c.85 0 1.45-.95.9-2l-2.1-5.7c0-.7.2-1.3.4-2 .2-.75.5-1.55.5-2.6 0-2.5-1.6-4.2-3.7-4.2z" />
          <ellipse cx="10.4" cy="6.7" rx="0.85" ry="1.15" fill="var(--bg)" />
          <ellipse cx="13.6" cy="6.7" rx="0.85" ry="1.15" fill="var(--bg)" />
          <circle cx="10.4" cy="6.9" r="0.4" fill="currentColor" />
          <circle cx="13.6" cy="6.9" r="0.4" fill="currentColor" />
          <path d="M11 9.2c.3.4.7.5 1 .5s.7-.1 1-.5" stroke="var(--bg)" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        </svg>
      );

    case "chrome":
      return (
        <svg {...stroke}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3.4" />
          <path d="M12 8.6h8.2" />
          <path d="M9 13.7 4.9 6.5" />
          <path d="M15 13.7l-4.1 7.2" />
        </svg>
      );

    case "firefox":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M21 11.5c0 5-4 9-9.2 9-5 0-9-3.8-9.3-8.7 0-2.5.85-4.5 2.3-6 .15-.15.4-.05.4.15-.05.5-.05 1.05.1 1.55.05.2.3.25.4.05.6-1.2 1.55-2.05 2.4-2.55.15-.1.35.05.3.25-.15.5-.25 1.1-.1 1.85.05.2.3.25.4.05.95-1.5 2.3-2.4 4.05-2.55.2 0 .25.25.1.35-.7.5-1.4 1.4-1.55 2.65 0 .2.2.35.4.25.85-.5 1.85-.85 2.95-.85.2 0 .25.25.1.35-1.7 1.05-2.6 3.2-1.85 5.5.6 1.85 2.5 3 4.45 2.7.2-.05.35.15.25.3-.65 1-1.6 1.85-2.7 2.4-.15.1-.1.35.1.4 2.95.5 5.5-1.85 5.5-4.7 0-.2.25-.25.35-.1.4.65.7 1.4.85 2.2z" />
        </svg>
      );

    case "safari":
      return (
        <svg {...stroke}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
          <path d="m14.5 9.5-2.5 2.5-2.5 6 5-2.5 2.5-2.5 2.5-6z" fill="currentColor" fillOpacity="0.85" stroke="none" />
          <circle cx="12" cy="12" r="0.9" fill="var(--surface)" stroke="none" />
        </svg>
      );

    case "vscode":
      return (
        <svg {...stroke} strokeWidth={1.8}>
          <path d="m9.5 7.5-5 4.5 5 4.5" />
          <path d="m14.5 7.5 5 4.5-5 4.5" />
          <path d="M13 5.5 11 18.5" strokeWidth={1.4} />
        </svg>
      );

    case "cursor":
      return (
        <svg {...stroke}>
          <path d="M12 3 5 7v10l7 4 7-4V7z" fill="currentColor" fillOpacity="0.18" />
          <path d="M5 7 19 17M12 3v18M19 7 5 17" />
        </svg>
      );

    case "terminal":
      return (
        <svg {...stroke}>
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <path d="m7 9 3 3-3 3" strokeWidth={1.8} />
          <path d="M12 16h5" strokeWidth={1.8} />
        </svg>
      );

    case "slack":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <rect x="9" y="3" width="3" height="9" rx="1.5" />
          <rect x="3" y="12" width="9" height="3" rx="1.5" />
          <rect x="12" y="9" width="9" height="3" rx="1.5" />
          <rect x="12" y="12" width="3" height="9" rx="1.5" />
        </svg>
      );

    case "notion":
      return (
        <svg {...stroke}>
          <rect x="4" y="3.5" width="16" height="17" rx="2" />
          <path d="M9 7.5v9" strokeWidth={1.8} />
          <path d="M9 7.5 15 16.5" strokeWidth={1.8} />
          <path d="M15 7.5v9" strokeWidth={1.8} />
        </svg>
      );

    case "linear":
      return (
        <svg {...stroke}>
          <path d="M4 14 14 4" />
          <path d="M4 18 18 4" />
          <path d="M7 21 21 7" />
          <path d="M11 21 21 11" />
          <path d="M16 21 21 16" />
        </svg>
      );

    case "figma":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2h-4a3 3 0 1 0 0 6h4z" />
          <path d="M12 2h4a3 3 0 1 1 0 6h-4z" fillOpacity="0.75" />
          <path d="M12 8h-4a3 3 0 1 0 0 6h4z" fillOpacity="0.55" />
          <path d="M16 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fillOpacity="0.85" />
          <path d="M12 14h-4a3 3 0 1 0 4 3z" fillOpacity="0.4" />
        </svg>
      );

    case "google-docs":
      return (
        <svg {...stroke}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5" />
          <path d="M8 12h8M8 15h8M8 18h5" strokeWidth={1.4} />
        </svg>
      );

    case "finder":
      return (
        <svg {...stroke}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M9 9v2" strokeWidth={1.8} />
          <path d="M15 9v2" strokeWidth={1.8} />
          <path d="M9 15c.8 1 1.8 1.5 3 1.5s2.2-.5 3-1.5" />
          <path d="M6 7v10" strokeWidth={1.2} opacity="0.5" />
        </svg>
      );

    default:
      return null;
  }
}

export function OSIcon({ os, size = 14 }: { os: OS; size?: number }) {
  const id = os === "macos" ? "system-macos" : os === "windows" ? "system-windows" : "system-linux";
  return <AppIcon appId={id} size={size} />;
}

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

interface GlyphProps {
  appId: string;
  name: string;
  size?: "sm" | "lg";
  onClick?: (appId: string) => void;
  title?: string;
}

export function AppGlyph({ appId, name, size = "sm", onClick, title }: GlyphProps) {
  const px = size === "lg" ? 40 : 18;
  const klass = size === "lg" ? "appdot appdot-xl" : "appdot";
  const inner = <AppIconOrInitials appId={appId} name={name} size={px} />;
  if (onClick) {
    return (
      <button
        type="button"
        className={`${klass} appdot-link`}
        data-app={appId}
        title={title ?? `Open ${name}`}
        aria-label={title ?? `Open ${name}`}
        onClick={(e) => {
          e.stopPropagation();
          onClick(appId);
        }}
      >
        {inner}
      </button>
    );
  }
  return (
    <span className={klass} data-app={appId} aria-hidden>
      {inner}
    </span>
  );
}

function AppIconOrInitials({ appId, name, size }: { appId: string; name: string; size: number }) {
  const icon = AppIcon({ appId, size });
  if (icon) return icon;
  return <span className="appdot-initials">{getInitials(name)}</span>;
}
