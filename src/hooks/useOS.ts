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
    if (typeof localStorage !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isOS(stored)) return stored;
    }
    return detectOS() ?? "macos";
  });

  const setChoice = (next: OS) => {
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
