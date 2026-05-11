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
        title="Browse Keyboard Shortcuts by App, Action, or OS | Hotkey Lookup"
        description="Browse every keyboard shortcut across all supported apps. Filter by app, see every action in one list, or compare side by side across macOS, Windows, and Linux."
        path="/browse"
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
