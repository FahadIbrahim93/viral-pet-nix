# Changelog

All notable changes to **Nix Timeline Dodge** are documented here.

## [3.0.0] — 2026-09-15

### Added — AAA presentation pass
- **Adaptive generative audio engine:** fully synthesized layered pad + arpeggio (no media files — respects `media-src 'none'` CSP), tempo/intensity scale live with speed and combo, algorithmic convolution reverb, persisted mute toggle with an on-screen button
- **Combo tier callouts:** NICE → GREAT → AMAZING → LEGENDARY animated milestones as multiplier climbs, each with its own chord stinger and haptic pulse
- **Telegraphed obstacles:** dashed "warning ghost" posts beyond distance 1400 give a readable beat before becoming solid — raises the skill ceiling without cheap deaths
- **Parallax starfield + drifting nebula + vignette:** deterministic seeded star layer, additive-glow particles and rim-light on posts, motion afterimage trail at high speed/combo, canvas supernova burst on pet evolution
- **New-best confetti** and `navigator.vibrate` haptic feedback on hits, shields, evolutions, and personal bests
- **True any-device responsive shell:** fills `100dvh`/`100dvw` at any aspect ratio, `safe-area-inset` padding for notched phones, installable via an inline data-URI Web App Manifest + icons (still zero extra files)

### Added — Viral Surge system
- **Hype meter:** builds from near-misses, heart pickups, and streak shields; decays passively; a hit knocks 60% off it, raising the stakes
- **Viral Surge:** at 100% hype, triggers a ~2.5s screen-wide color-grade wash, rotating aura rings on the pet, a widened near-miss window (real gameplay perk, not just cosmetic), a layered chord sting, and a haptic buzz
- Fixed a real bug: the adaptive-music `setTimeout` chain was never cancelled on `endRun()`, so background music kept playing indefinitely after a run ended

### Added — Fairness & presence
- **Visibility pause:** the run pauses automatically (with an explicit Resume prompt) when the tab is hidden or the window loses focus, so a phone call or notification can't cause a cheap death
- **Attract mode:** an idle Nix breathes and blinks on the menu screen; the menu backdrop is now a translucent blurred gradient instead of a flat 90%-opaque panel, so the animated starfield and idle pet are actually visible behind the title text

### Testing
- New `test/manual-render-smoke.js`: jsdom's `canvas.getContext('2d')` returns `null`, so the entire `draw()`/`drawPet()`/`drawPost()` rendering path was never actually executed by the existing Jest suite — only parsed. This harness runs the real game loop through a vm-context canvas mock across ~770 simulated frames (normal play, forced Viral Surge, forced evolution + supernova burst, and real physics-driven collisions through to game over) and asserts zero runtime exceptions. Promoted to CI Gate 6; gauntlet is now 8 gates.
- 10 new Jest cases covering the hype/surge pure functions; 115 unit tests total (up from 105)
- 6 new Jest cases covering the visibility-pause lifecycle; 121 unit tests total (up from 115)

### Testing (combo tiers, same release)
- 6 new Jest cases covering combo tier thresholds; 105 unit tests total (up from 99)

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
