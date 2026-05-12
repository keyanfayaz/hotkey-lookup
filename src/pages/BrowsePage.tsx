import { useNavigate, useOutletContext } from "react-router-dom";
import { Browse } from "../components/Browse";
import { Seo } from "../components/Seo";
import type { LayoutContext } from "../components/Layout";

export function Component() {
  const { os, setSelectedShortcut } = useOutletContext<LayoutContext>();
  const navigate = useNavigate();

  return (
    <>
      <Seo
        title="Browse All Keyboard Shortcuts — by App, Action, or OS | Hotkey Lookup"
        description="Browse every keyboard shortcut across every supported app. Filter by app or action, see hotkeys in one list, or compare them side by side across macOS, Windows, and Linux."
        path="/browse"
        keywords={[
          "browse keyboard shortcuts",
          "all keyboard shortcuts list",
          "keyboard shortcuts directory",
          "hotkeys list",
          "shortcuts by app",
          "shortcuts macOS Windows Linux",
        ]}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Browse", path: "/browse" },
        ]}
      />
      <Browse
        os={os}
        onSelect={(appId) => navigate(`/apps/${appId}/${os}`)}
        onSelectShortcut={setSelectedShortcut}
      />
    </>
  );
}

export default Component;
