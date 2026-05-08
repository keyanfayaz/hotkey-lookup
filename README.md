# ⌘ Hotkey Lookup

**Find any keyboard shortcut, on any OS.** A small, fast, public reference for
keyboard shortcuts across **macOS, Windows, and Linux** — for the OS itself and
for the apps you actually use.

Two modes:

1. **Find a hotkey** — search by what you want to do (`copy`, `command palette`,
   `screenshot region`) and get the right combo for your OS / app.
2. **Identify a hotkey** — press a combo and see every app that uses it and
   what it does there.

No backend. No tracking. All data is static and lives in this repo. Adding a
shortcut is one PR away — see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Run it locally

```bash
npm install
npm run dev
```

Open <http://localhost:5173>.

## Build

```bash
npm run build      # type-check + production build → ./dist
npm run preview    # serve the built site locally
```

## Tech

- Vite + React + TypeScript
- Tailwind CSS
- [Fuse.js](https://www.fusejs.io/) for fuzzy search

The whole thing is a static SPA — drop `dist/` on any static host. A GitHub
Actions workflow at [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)
deploys to GitHub Pages on every push to `main`.

## Project layout

```
src/
├── components/   # UI
├── data/
│   ├── apps.ts
│   ├── shortcuts/<app>.ts   # one file per app — drop your contribution here
│   └── index.ts             # aggregates everything
├── hooks/        # OS/theme/key-capture hooks
└── lib/          # types, combo normalization, search, match
```

## License

MIT — see [LICENSE](./LICENSE).
