# Changelog

All notable changes to **Nix Timeline Dodge** are documented here.

## [2.5.0] — 2026-09-14

### Fixed
- **Start Run stuck on main menu:** entire IIFE failed to parse because of mixed `??` / `||` without parentheses. Script never bound Start; menu stayed forever.
- Dual binding restored: `pointerup` + `click` with lock, Enter/Space, `window.__nixStart`.
- Phase-based menu/results; canvas `pointer-events: none` while menu is up.
- Results score now floors to integer.
- Restored pure single-file `index.html` (inline script). External game-a/b.js are legacy and not required for play.

### Deploy
- Push to `main` deploys to https://viral-pet-nix.vercel.app via Vercel.
- Added documented CI gates, release metadata checks, Vercel security headers, contribution guidance, and private vulnerability reporting.

## [2.4.2] — 2026-09-14

### Fixed
- Mobile Start Run / touch-action notes (superseded by 2.5.0 full rewrite of the start path).

Older history: see git log and previous CHANGELOG commits.
