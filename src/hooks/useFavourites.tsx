import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { FAVOURITES_STORAGE_KEY, readFavourites, toggleFavourite, writeFavourites } from "../lib/favourites";

interface FavouritesContext {
  ids: readonly string[];
  ready: boolean;
  persistent: boolean;
  toggle: (id: string) => void;
}

const Context = createContext<FavouritesContext | null>(null);

export function FavouritesProvider({ children }: { children: ReactNode }) {
  // Match the static HTML on the first client render; read storage after hydration.
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [persistent, setPersistent] = useState(true);
  const currentIds = useRef<string[]>([]);
  const storageAvailable = useRef(false);

  useEffect(() => {
    const saved = readFavourites();
    currentIds.current = saved.ids;
    storageAvailable.current = saved.persistent;
    setIds(saved.ids);
    setPersistent(saved.persistent);
    setReady(true);

    const onStorage = (event: StorageEvent) => {
      if (event.key !== FAVOURITES_STORAGE_KEY && event.key !== null) return;
      if (!storageAvailable.current) return;
      try {
        if (event.storageArea !== window.localStorage) return;
      } catch {
        storageAvailable.current = false;
        setPersistent(false);
        return;
      }
      // Queued events can be stale: read the current value, never write it back.
      const latest = readFavourites();
      storageAvailable.current = latest.persistent;
      setPersistent(latest.persistent);
      if (latest.persistent) {
        currentIds.current = latest.ids;
        setIds(latest.ids);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = (id: string) => {
    const shouldSave = !currentIds.current.includes(id);
    let saved = currentIds.current;
    if (storageAvailable.current) {
      // Another tab may have changed storage before its event reaches this tab.
      const latest = readFavourites();
      storageAvailable.current = latest.persistent;
      if (latest.persistent) saved = latest.ids;
    }
    // Apply the visible button's intent to the latest list. Two stale Save
    // buttons must not toggle each other's addition off (or revive a removal).
    const next = saved.includes(id) === shouldSave ? saved : toggleFavourite(saved, id);
    if (storageAvailable.current) storageAvailable.current = writeFavourites(next);
    // Refs also preserve rapid toggles before React commits the next render.
    currentIds.current = next;
    setIds(next);
    setPersistent(storageAvailable.current);
  };

  return (
    <Context.Provider value={{ ids, ready, persistent, toggle }}>
      {children}
    </Context.Provider>
  );
}

export function useFavourites(): FavouritesContext {
  const favourites = useContext(Context);
  if (!favourites) throw new Error("useFavourites requires FavouritesProvider");
  return favourites;
}
