# SESSION — 2026-09-14 Start Run / mobile menu fix

## Problem
Players (especially mobile) reported Nix stuck on the main menu after tapping Start Run. Desktop Chrome could enter `mode=running` but the loop sometimes looked frozen; mobile taps on Start were unreliable.

## Root causes
1. `body { touch-action: none }` competed with overlay button taps.
2. Start relied on `click` only; some mobile browsers need pointer events.
3. An uncaught throw inside `update`/`draw` could stop `requestAnimationFrame`.

## Fix (canonical)
File: `index.html` (single-file game)
- touch-action:manipulation on body/overlay/buttons; touch-action:none on canvas only
- `bindTap(el, fn)` for Start / Play Again
- null-safe HUD + startRun DOM access
- try/catch around update+draw in the rAF loop

## Out of scope / do not ship
Branch `fix/touch-start-menu` briefly experimented with external `game.js` and left a stub — **do not merge that branch**. This session restores the professional single-file layout.

## Deploy
- Git: merge this PR to `main` → Vercel Git auto-deploy
- Manual file deploy used for immediate production while GitHub caught up
- Live: https://viral-pet-nix.vercel.app/

## Verify
- Page source contains `bindTap` and `try{update(dt);draw()}catch`
- No `./game.js` script tag
- Start Run hides menu, HUD shows, distance/posts advance

---

## Prior session

Earlier gauntlet certification (v2.4.1) remains in git history on `main` before this commit.
