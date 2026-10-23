import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";
import { act, useState } from "react";
import { renderToString } from "react-dom/server";
import { Link, MemoryRouter, Outlet, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom/server";
import { Browse } from "../src/components/Browse";
import { FavouriteButton } from "../src/components/FavouriteButton";
import { ShortcutModal } from "../src/components/ShortcutModal";
import ShortcutDetail from "../src/pages/ShortcutDetail";
import { FavouritesProvider } from "../src/hooks/useFavourites";
import { FAVOURITES_STORAGE_KEY, parseFavourites, readFavourites, toggleFavourite, writeFavourites } from "../src/lib/favourites";
import { SHORTCUTS } from "../src/data";
import type { OS, Shortcut } from "../src/lib/types";

// Reuse the DOM implementation already required by the SSG build; no test framework dependency.
const { JSDOM } = createRequire(import.meta.resolve("vite-react-ssg"))("jsdom");
const shortcut = SHORTCUTS.find((item) => item.id === "chrome.new-tab")!;

test("storage validates stable IDs, deduplicates, and recovers from malformed data", () => {
  assert.equal(new Set(SHORTCUTS.map((item) => item.id)).size, SHORTCUTS.length);
  for (const value of [null, "not json", "{}", "null", "123", '"chrome.new-tab"']) {
    assert.deepEqual(parseFavourites(value), []);
  }
  assert.deepEqual(parseFavourites(JSON.stringify([shortcut.id, shortcut.id, "unknown.id", null, 42, "__proto__"])), [shortcut.id]);
  const saved = toggleFavourite([], shortcut.id);
  assert.deepEqual(saved, [shortcut.id]);
  assert.deepEqual(toggleFavourite(saved, "unknown.id"), saved);
  assert.deepEqual(toggleFavourite(saved, shortcut.id), []);
});

test("SSR renders safely without a window or storage access", () => {
  assert.equal(typeof window, "undefined");
  assert.deepEqual(readFavourites(), { ids: [], persistent: false });
  assert.equal(writeFavourites([shortcut.id]), false);
  const html = renderToString(<FavouritesProvider><FavouriteButton shortcut={shortcut} compact /></FavouritesProvider>);
  assert.match(html, /aria-pressed="false"/);
  assert.match(html, /disabled=""/);
  assert.match(html, /aria-label="Favourite New tab in Chrome"/);
});

function Harness() {
  const [os, setOs] = useState<OS>("macos");
  const [selected, setSelected] = useState<Shortcut | null>(null);
  return (
    <>
      <Link to="/browse?view=favourites">Saved view</Link>
      <Link to="/shortcut/chrome/new-tab">Detail</Link>
      <button onClick={() => setOs("windows")}>Use Windows</button>
      <Routes>
        <Route element={<Outlet context={{ os, setSelectedShortcut: setSelected }} />}>
          <Route path="/browse" element={<Browse os={os} onSelect={() => {}} onSelectShortcut={setSelected} />} />
          <Route path="/shortcut/:appSlug/:actionSlug" element={<ShortcutDetail />} />
        </Route>
      </Routes>
      {selected && <ShortcutModal shortcut={selected} os={os} onClose={() => setSelected(null)} />}
    </>
  );
}

async function mount(initial: string | null = null, blocked: "get" | "set" | "access" | null = null, serverHtml?: string) {
  const dom = new JSDOM(`<div id="root">${serverHtml ?? ""}</div>`, { url: "https://hotkeylookup.test" });
  const originalGlobals = new Map<string, PropertyDescriptor | undefined>();
  for (const [key, value] of Object.entries({ window: dom.window, document: dom.window.document, navigator: dom.window.navigator, IS_REACT_ACT_ENVIRONMENT: true })) {
    originalGlobals.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
  if (initial !== null) dom.window.localStorage.setItem(FAVOURITES_STORAGE_KEY, initial);
  const readStored = () => dom.window.Storage.prototype.getItem.call(dom.window.localStorage, FAVOURITES_STORAGE_KEY);
  const originalGet = dom.window.Storage.prototype.getItem;
  if (blocked === "access") {
    Object.defineProperty(dom.window, "localStorage", { get() { throw new Error("Storage denied"); } });
  } else if (blocked) {
    dom.window.Storage.prototype[blocked === "get" ? "getItem" : "setItem"] = () => { throw new Error("Storage denied"); };
  }
  const { createRoot, hydrateRoot } = await import("react-dom/client");
  const tree = (
    <MemoryRouter initialEntries={["/browse?view=by-action"]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <HelmetProvider><FavouritesProvider><Harness /></FavouritesProvider></HelmetProvider>
    </MemoryRouter>
  );
  let root!: ReturnType<typeof createRoot>;
  const hydrationErrors: unknown[] = [];
  await act(async () => {
    const container = dom.window.document.getElementById("root")!;
    if (serverHtml === undefined) {
      root = createRoot(container);
      root.render(tree);
    } else root = hydrateRoot(container, tree, { onRecoverableError: (error) => hydrationErrors.push(error) });
  });
  const document = dom.window.document as Document;
  const click = async (element: Element | null) => {
    assert.ok(element, "Expected a control to exist");
    await act(async () => (element as HTMLElement).click());
  };
  const button = () => document.querySelector<HTMLButtonElement>('[aria-label="Favourite New tab in Chrome"]')!;
  const link = (label: string) => [...document.querySelectorAll("a")].find((item) => item.textContent === label)!;
  const close = async () => {
    await act(async () => root.unmount());
    dom.window.close();
    for (const [key, descriptor] of originalGlobals) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
  };
  return { dom, document, click, button, link, close, hydrationErrors, readStored: blocked === "get"
    ? () => originalGet.call(dom.window.localStorage, FAVOURITES_STORAGE_KEY) : readStored };
}

test("add, navigate, change OS, show saved view, reload, and remove", async () => {
  let app = await mount();
  let persisted: string;
  try {
    assert.equal(app.button().tagName, "BUTTON");
    assert.equal(app.button().type, "button");
    assert.equal(app.button().disabled, false);
    app.button().focus();
    assert.equal(app.document.activeElement, app.button());
    await app.click(app.button());
    assert.equal(app.button().getAttribute("aria-pressed"), "true");
    assert.equal(app.document.querySelector('[role="dialog"]'), null, "Saving should not open the shortcut");
    persisted = app.dom.window.localStorage.getItem(FAVOURITES_STORAGE_KEY)!;
    assert.deepEqual(JSON.parse(persisted), [shortcut.id]);

    await app.click(app.link("Detail"));
    assert.equal(app.button().getAttribute("aria-pressed"), "true");
    await app.click([...app.document.querySelectorAll("button")].find((item) => item.textContent === "Use Windows")!);
    assert.match(app.document.body.textContent!, /Shortcut on Windows/);
    assert.equal(app.button().getAttribute("aria-pressed"), "true");
    await app.click(app.link("Saved view"));
    assert.equal(app.document.querySelectorAll(".browse-row").length, 1);
    assert.match(app.document.querySelector(".browse-combo")!.textContent!, /Ctrl/);
    assert.match(app.document.body.textContent!, /1 saved/);

    await app.click(app.document.querySelector(".browse-open"));
    const modalButton = app.document.querySelector('[role="dialog"] .favourite-btn');
    assert.equal(modalButton!.getAttribute("aria-pressed"), "true");
    await app.click(modalButton);
    assert.equal(app.button().getAttribute("aria-pressed"), "false");
    await app.click(modalButton);
    await app.click(app.link("View favourites (1)"));
    assert.equal(app.document.querySelector('[role="dialog"]'), null);
    assert.equal(app.document.querySelectorAll(".browse-row").length, 1);
    assert.equal(app.document.querySelector("button button"), null);
  } finally { await app.close(); }

  app = await mount(persisted!);
  try {
    assert.equal(app.button().getAttribute("aria-pressed"), "true");
    await app.click(app.link("Saved view"));
    await app.click(app.button());
    assert.equal(app.document.querySelectorAll(".browse-row").length, 0);
    assert.match(app.document.body.textContent!, /No favourites yet/);
    assert.deepEqual(JSON.parse(app.dom.window.localStorage.getItem(FAVOURITES_STORAGE_KEY)), []);
  } finally { await app.close(); }
});

test("stored duplicate and unknown IDs produce one known saved shortcut", async () => {
  const app = await mount(JSON.stringify([shortcut.id, shortcut.id, "removed.shortcut", 123]));
  try {
    await app.click(app.link("Saved view"));
    assert.equal(app.document.querySelectorAll(".browse-row").length, 1);
    assert.deepEqual(JSON.parse(app.dom.window.localStorage.getItem(FAVOURITES_STORAGE_KEY)), [shortcut.id]);
  } finally { await app.close(); }
});

test("malformed saved data recovers and allows a new favourite", async () => {
  const app = await mount("{broken json");
  try {
    assert.equal(app.button().getAttribute("aria-pressed"), "false");
    await app.click(app.button());
    assert.deepEqual(JSON.parse(app.dom.window.localStorage.getItem(FAVOURITES_STORAGE_KEY)), [shortcut.id]);
  } finally { await app.close(); }
});

for (const blocked of ["access", "get", "set"] as const) {
  test(`blocked storage (${blocked}) keeps favourites usable for this visit`, async () => {
    const app = await mount(null, blocked);
    try {
      await app.click(app.button());
      assert.equal(app.button().getAttribute("aria-pressed"), "true");
      await app.click(app.link("Saved view"));
      assert.equal(app.document.querySelectorAll(".browse-row").length, 1);
      assert.match(app.document.body.textContent!, /only last for this visit/);
      await app.click(app.link("Detail"));
      assert.match(app.document.body.textContent!, /only last for this visit/);
      await app.click(app.button());
      assert.equal(app.button().getAttribute("aria-pressed"), "false");
    } finally { await app.close(); }
  });
}

test("a failed read never overwrites favourites already stored in this browser", async () => {
  const stored = JSON.stringify(["vscode.command-palette"]);
  const app = await mount(stored, "get");
  try {
    await app.click(app.button());
    assert.equal(app.readStored(), stored);
  } finally { await app.close(); }
});

test("query views hydrate static By app HTML before reading saved favourites", async () => {
  const html = renderToString(
    <StaticRouter location="/browse"><HelmetProvider><FavouritesProvider><Harness /></FavouritesProvider></HelmetProvider></StaticRouter>,
  );
  assert.match(html, /Pick an app/);
  const app = await mount(JSON.stringify([shortcut.id]), null, html);
  try {
    assert.deepEqual(app.hydrationErrors, []);
    assert.equal(app.button().getAttribute("aria-pressed"), "true");
    await app.click(app.link("Saved view"));
    assert.equal(app.document.querySelectorAll(".browse-row").length, 1);
  } finally { await app.close(); }
});
