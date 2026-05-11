import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "hotkey-lookup:theme";

const initialTheme = (): Theme => {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = window.localStorage?.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // ignore
  }
  return "dark";
};

export function useTheme(): { theme: Theme; toggle: () => void } {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    // Keep .dark class in sync for any remaining Tailwind dark: utilities
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, toggle };
}
