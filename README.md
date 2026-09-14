# Nix — Timeline Dodge

**Skill-based viral pet.** Dodge the timeline. Near-miss for CLEAN. Evolve Nix.

**Live:** https://viral-pet-nix.vercel.app  
**Version:** 2.5.0

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Single File](https://img.shields.io/badge/Single%20File-HTML-brightgreen)](index.html)

---

## Play in 10 seconds

1. Open the [live demo](https://viral-pet-nix.vercel.app) or open `index.html` locally
2. Tap **Start Run**
3. Tap left / right half (or `A`/`D` / arrows) to change lanes
4. Dodge posts · grab hearts · near-miss for **CLEAN**
5. After the run → Play Again · Challenge Friend

No install. No build. Works offline after first load.

---

## What 2.5 fixed

- **Start Run stuck on main menu** — root cause was a syntax error that prevented the entire game script from loading. Fixed operator precedence, dual `pointerup`+`click` binding, phase-based menu hide, canvas `pointer-events` only while running.
- Pure **single-file** `index.html` again (no external `game-a.js` / `game-b.js` required for play).
- Floored score display on results.

---

## Core loop

| Action | Effect |
|--------|--------|
| Dodge posts | Survive |
| Near-miss (CLEAN) | Score + streak + multiplier |
| Collect hearts | Restore risk hearts |
| Blue Check | Rare slow-mo + mult boost |
| Streak up to ×8 | High score multiplier |
| Run ends | Challenge text · next run |

Stages: Egg → Hatchling → Timeline Cub → Thread Beast → Viral Legend

---

## Controls

- **Touch / click:** left half → left lane · right half → right lane (or swipe)
- **Keyboard:** `←` `→` or `A` `D` · Enter / Space to start
- Test hooks: `window.__nixStart()`, `window.__controlsTest`

---

## Design constraints

- Card-sized (~320–400 px) for X-style feed / webview
- Short skill sessions, not idle tapping
- **Single file** — no bundler, no framework, no backend
- Bounded particle pool (64), dt cap, localStorage key `nix_dodge_v24`
- Built for **X — the future super app**

---

## Local

```bash
git clone https://github.com/FahadIbrahim93/viral-pet-nix.git
cd viral-pet-nix
open index.html   # or any static server
```

## Deploy

Vercel project linked to this repo. Push to `main` → auto-deploy to https://viral-pet-nix.vercel.app

`vercel.json` sets no-cache headers so the latest game is always served.

## License

MIT — see [LICENSE](LICENSE).
