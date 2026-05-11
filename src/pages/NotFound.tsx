import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";

export function NotFoundContent({ label = "Page not found" }: { label?: string }) {
  return (
    <>
      <Seo
        title="Not Found | Hotkey Lookup"
        description="The page you were looking for could not be found."
        path="/404"
        noindex
      />
      <div className="page">
        <h1>404</h1>
        <p className="page-lede">{label}</p>
        <p>
          <Link to="/">← Home</Link>
          {" · "}
          <Link to="/apps">All apps</Link>
          {" · "}
          <Link to="/browse">Browse</Link>
        </p>
      </div>
    </>
  );
}

export function Component() {
  return <NotFoundContent />;
}

export default Component;
