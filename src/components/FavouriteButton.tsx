import { useFavourites } from "../hooks/useFavourites";
import { APP_BY_ID } from "../data";
import type { Shortcut } from "../lib/types";
import { Link } from "react-router-dom";

interface Props {
  shortcut: Shortcut;
  compact?: boolean;
  onViewFavourites?: () => void;
}

export function FavouriteButton({ shortcut, compact = false, onViewFavourites }: Props) {
  const { ids, ready, persistent, toggle } = useFavourites();
  const saved = ids.includes(shortcut.id);
  const label = `Favourite ${shortcut.function} in ${APP_BY_ID[shortcut.appId]?.name ?? shortcut.appId}`;

  const button = (
    <button
      type="button"
      className={`favourite-btn${compact ? " favourite-btn-compact" : ""}`}
      aria-label={label}
      aria-pressed={saved}
      disabled={!ready}
      title={saved ? "Remove from favourites" : "Save to favourites"}
      onClick={() => toggle(shortcut.id)}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z" />
      </svg>
      {!compact && <span>{saved ? "Favourited" : "Favourite"}</span>}
    </button>
  );

  return compact ? button : (
    <div className="favourite-control">
      {button}
      <Link to="/browse?view=favourites" onClick={onViewFavourites}>View favourites ({ids.length})</Link>
      {!persistent && <p className="favourites-note" role="status">Browser storage is unavailable. Favourites will only last for this visit.</p>}
    </div>
  );
}
