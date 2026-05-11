import { useEffect, useState } from "react";
import { detectOS } from "../lib/detectOS";
import type { OS } from "../lib/types";

const STORAGE_KEY = "hotkey-lookup:os";

const isOS = (v: string | null): v is OS =>
  v === "macos" || v === "windows" || v === "linux";

export function useOS(): {
  choice: OS;
  setChoice: (next: OS) => void;
  detected: OS | null;
} {
  const [detected] = useState<OS | null>(() => detectOS());
  const [choice, setChoiceState] = useState<OS>(() => {
    try {
      if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (isOS(stored)) return stored;
      }
    } catch {
      // ignore
    }
    return detectOS() ?? "macos";
  });

  const setChoice = (next: OS) => {
    setChoiceState(next);
    try {
      if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.os = choice;
    }
  }, [choice]);

  return { choice, setChoice, detected };
}
