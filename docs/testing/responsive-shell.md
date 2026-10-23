# Shared header and footer regression checks

Run `npm run dev`, then open `/browse` and `/os/macos` in a browser.

Check both pages at 320, 375, 390, 768, and 1280 CSS pixels wide. Also check
480/481, 720/721, and 760/761 to cover the layout boundaries.

- The document has no horizontal overflow on these pages:
  `document.documentElement.scrollWidth <= window.innerWidth`.
- Brand, Search, Browse, Listen, all three operating systems, and theme controls
  remain visible. No labels are hidden to make the header fit.
- At 480px and below, the header stacks brand, navigation, and OS/theme controls.
  From 481px through 760px, navigation occupies the second row. At larger widths,
  the header keeps its desktop layout.
- Attribution, email signup, and keyboard hints wrap into footer rows as needed.
  The email field and submit button stay fully inside the viewport.
- On `/os/macos`, the sponsor slot keeps its 100px minimum height and the same
  content width. Sponsor content and links are unchanged.
- Tab through the header and footer. Focus must remain visible and within the
  horizontal viewport. Activate navigation and OS controls with Enter, theme and
  Listen with Space, and close Listen with Escape.
- Focus the email input and submit button without submitting the form or opening
  external links. This check does not send subscriptions.

The original defect can be reproduced at main commit
`0c6c49af59e2b53173ef855edd1f63fcff59d59a`: `/browse` is 518px wide at
320/375/390px viewports. The header controls share a row wider than the available
grid space, and the footer cannot wrap its signup and keyboard-hint groups.
