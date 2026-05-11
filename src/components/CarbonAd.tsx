import { useEffect, useRef } from "react";

const CARBON_SERVE_CODE: string | undefined = undefined;

interface Props {
  placement?: "sidebar" | "footer";
}

export function CarbonAd({ placement = "sidebar" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!CARBON_SERVE_CODE || !ref.current) return;
    if (ref.current.querySelector("script[data-carbon]")) return;
    const s = document.createElement("script");
    s.async = true;
    s.id = "_carbonads_js";
    s.dataset.carbon = "true";
    s.src = `//cdn.carbonads.com/carbon.js?serve=${CARBON_SERVE_CODE}&placement=hotkeylookupcom`;
    ref.current.appendChild(s);
  }, []);

  return (
    <div
      ref={ref}
      className={`carbonad-slot carbonad-${placement}`}
      data-pending={CARBON_SERVE_CODE ? undefined : "true"}
    >
      {!CARBON_SERVE_CODE && (
        <a href="mailto:keyan.fayaz@gmail.com?subject=Sponsor%20hotkeylookup.com" className="carbonad-pending">
          Sponsor this slot →
        </a>
      )}
    </div>
  );
}
