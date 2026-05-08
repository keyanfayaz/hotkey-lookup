# Contributing

Thanks for adding a shortcut! The whole point of this project is that the data
grows. PRs that fix a wrong combo, add a missing one, or add a whole new app are
all welcome.

## Add a shortcut to an existing app

1. Open `src/data/shortcuts/<app>.ts`.
2. Add a new entry to the exported `SHORTCUTS` array. Example:

   ```ts
   {
     id: id("toggle-sidebar"),
     appId: APP,
     function: "Toggle sidebar",
     category: "Panels",
     combos: { macos: ["Cmd+B"], windows: ["Ctrl+B"], linux: ["Ctrl+B"] },
   }
   ```

3. Commit and open a PR.

### Combo formatting

Use the human-readable form. The app normalizes everything at runtime, so all
of these parse the same way:

- `Cmd+Shift+P` · `⌘+⇧+P` · `Command+Shift+P` · `Meta+Shift+P`
- `Ctrl+/` · `Control+/`
- `Win+V` · `Super+V` · `Meta+V`
- `Option+Cmd+I` · `Alt+Cmd+I` · `⌥+⌘+I`

For sequences (chords like VS Code's "Ctrl+K then Z"), separate with a space:
`Cmd+K Z`.

If a single function has more than one valid combo on the same OS, list both:

```ts
combos: { macos: ["Cmd+Option+I", "F12"] }
```

## Add a brand-new app

1. Create `src/data/shortcuts/<app-id>.ts`. Use an existing file as a template.
2. Register the app in `src/data/apps.ts`:

   ```ts
   {
     id: "obsidian",
     name: "Obsidian",
     icon: "🪨",
     supportedOS: ["macos", "windows", "linux"],
     category: "productivity",
   }
   ```

3. Import and spread your shortcut array in `src/data/index.ts`.
4. Open a PR.

## Style guide for entries

- **`function`**: imperative or noun phrase, sentence case — "Open Command
  Palette", "Toggle sidebar", "Bookmark current page".
- **`description`**: optional, only when the function name isn't enough.
- **`category`**: free-text, but try to reuse what's already in the file.
- **`id`**: kebab-case, descriptive. Stable across PRs.

## Run the app locally

```bash
npm install
npm run dev
```

Then click around to make sure your new entries look right in both **Find** and
**Identify** modes.

## Reporting incorrect shortcuts

Open an issue with the OS, app, and the combo we currently show. Bonus points
for a link to the official keybindings docs.
