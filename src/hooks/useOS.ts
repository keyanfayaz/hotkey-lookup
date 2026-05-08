import { useEffect, useState } from "react";
import { detectOS } from "../lib/detectOS";
import type { OS } from "../lib/types";

export type OSChoice = OS | "all";

const STORAGE_KEY = "hotkey-lookup:os";

const isOSChoice = (v: string | null): v is OSChoice =>
  v === "macos" || v === "windows" || v === "linux" || v === "all";

export function useOS(): {
  choice: OSChoice;
  setChoice: (next: OSChoice) => void;
  detected: OS | null;
} {
  const [detected] = useState<OS | null>(() => detectOS());
  const [choice, setChoiceState] = useState<OSChoice>(() => {
    if (typeof localStorage !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isOSChoice(stored)) return stored;
    }
    return detectOS() ?? "all";
  });

  const setChoice = (next: OSChoice) => {
    setChoiceState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.dataset.os = choice;
  }, [choice]);

  return { choice, setChoice, detected };
}

export const activeOS = (choice: OSChoice): OS | null =>
  choice === "all" ? null : choice;
