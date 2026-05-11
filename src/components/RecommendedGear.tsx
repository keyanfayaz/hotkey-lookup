import { APP_BY_ID } from "../data";
import { recommendationsFor } from "../data/recommendations";
import type { OS } from "../lib/types";

interface Props {
  appId?: string;
  os?: OS;
}

export function RecommendedGear({ appId, os }: Props) {
  const app = appId ? APP_BY_ID[appId] : undefined;
  const recs = recommendationsFor({ appId, os, category: app?.category });
  if (recs.length === 0) return null;

  return (
    <section className="cheat-section gear">
      <h2>Recommended gear</h2>
      <p className="page-lede">Hand-picked tools that complement these shortcuts. Affiliate links — supports the site at no extra cost.</p>
      <div className="gear-grid">
        {recs.map((r) => (
          <a key={r.id} href={r.href} target="_blank" rel="sponsored noopener noreferrer" className="gear-card">
            <div className="gear-title">{r.title}</div>
            <div className="gear-vendor">{r.vendor}</div>
            <div className="gear-blurb">{r.blurb}</div>
            <div className="gear-arrow">↗</div>
          </a>
        ))}
      </div>
    </section>
  );
}
