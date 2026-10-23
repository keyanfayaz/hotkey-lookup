import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { readFavourites, toggleFavourite, writeFavourites } from "../lib/favourites";

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
  const readableStorage = useRef(false);

  useEffect(() => {
    const saved = readFavourites();
    readableStorage.current = saved.persistent;
    setIds(saved.ids);
    setPersistent(saved.persistent);
    setReady(true);
  }, []);

  useEffect(() => {
    // Never overwrite saved data that this visit was unable to read.
    if (ready && readableStorage.current) setPersistent(writeFavourites(ids));
  }, [ids, ready]);

  return (
    <Context.Provider value={{ ids, ready, persistent, toggle: (id) => setIds((saved) => toggleFavourite(saved, id)) }}>
      {children}
    </Context.Provider>
  );
}

export function useFavourites(): FavouritesContext {
  const favourites = useContext(Context);
  if (!favourites) throw new Error("useFavourites requires FavouritesProvider");
  return favourites;
}
