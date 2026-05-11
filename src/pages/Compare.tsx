import { Link, useParams } from "react-router-dom";
import { Compare as CompareView } from "../components/Compare";
import { Seo } from "../components/Seo";
import { APP_BY_ID } from "../data";

export function Component() {
  const { appSlug } = useParams<{ appSlug?: string }>();
  const app = appSlug ? APP_BY_ID[appSlug] : undefined;

  if (appSlug && !app) {
    return (
      <div className="page">
        <p>App not found.</p>
      </div>
    );
  }

  const title = app
    ? `${app.name}: Mac vs Windows vs Linux Shortcuts | Hotkey Lookup`
    : "Compare Keyboard Shortcuts: macOS vs Windows vs Linux | Hotkey Lookup";
  const description = app
    ? `${app.name} keyboard shortcuts compared side by side across macOS, Windows, and Linux. Same action, three keyboards.`
    : "Compare keyboard shortcuts across macOS, Windows, and Linux. Side-by-side cheatsheet for system shortcuts and popular apps.";
  const path = app ? `/compare/${app.id}` : "/compare";

  return (
    <>
      <Seo title={title} description={description} path={path} />
      <div className="page">
        <div className="page-head">
          <div>
            <h1>{app ? `${app.name}: macOS vs Windows vs Linux` : "Compare across OSes"}</h1>
            <p className="page-lede">Same action. Three keyboards. One row.</p>
          </div>
          {app && <Link to={`/apps/${app.id}`}>← {app.name}</Link>}
        </div>
        <CompareView embedded />
      </div>
    </>
  );
}

export default Component;
