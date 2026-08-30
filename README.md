# Nix — Timeline Dodge

**Skill-based viral pet.** Dodge the timeline. Survive. Collect hearts. Evolve Nix.

**Live:** [https://viral-pet-nix.vercel.app](https://viral-pet-nix.vercel.app)  
**Version:** 2.4.1

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Single File](https://img.shields.io/badge/Single%20File-HTML-brightgreen)](index.html)

---

## Play in 10 seconds

1. Open the [live demo](https://viral-pet-nix.vercel.app) or open `index.html` locally
2. Tap **Start Run**
3. Tap left / right half of the card (or arrow keys) to change lanes
4. Dodge posts · grab hearts · near-miss for **CLEAN**
5. After the run → **Give Nix +score**, **Challenge Friend**, or **Score Card**

No install. No build. Works offline after first load.

---

## Core loop

| Action | Effect |
|--------|--------|
| Dodge posts | Survive |
| Near-miss (CLEAN) | Score + streak + multiplier |
| Collect hearts | Score × mult (gold = risk hearts) |
| Streak ×8 | Temporary shield |
| Blue Check (power heart) | Rare slow-mo |
| Run ends | Feed Nix · challenge text · score card image |

---

## Running Nix

- Side-view pet with animated legs (cycle scales with speed)
- Arms visible at Stage 2+ (Timeline Cub)
- Motion dust particles at high speed
- Eyes track lane direction
- Expression reacts to lives, multiplier, and streak
- Reduced-motion: all animations disabled, pet rendered statically

---

## Care panel

- Larger living pet with spinning stage ring
- Stage XP bar + progress dots
- Floating +Att / +Ene / +Mood pops
- Heart particle burst on feed
- Personality reaction lines

Stages: Egg → Hatchling → Timeline Cub → Thread Beast → Viral Legend

---

## Share on X

- **Challenge Friend** — copies a ready-to-paste challenge (native share sheet on mobile, clipboard fallback)
- **Score Card** — generates a shareable PNG image (native share with file, or download fallback)

Example text:

```
I scored 1840 on Nix Timeline Dodge
12 CLEANs · ×4.2 · Nix is Timeline Cub
Beat me → https://viral-pet-nix.vercel.app
#ViralPet #Nix
```

---

## Controls

- **Touch:** tap left half → left lane · right half → right lane
- **Keyboard:** `←` `→` or `A` `D`
- All buttons are keyboard-focusable with visible focus indicators

---

## Accessibility

- `aria-live` region announces score/HUD changes to screen readers
- Canvas has `aria-hidden="true"`, game container has `role="application"`
- Buttons have descriptive `aria-label` attributes
- Visible `:focus-visible` indicators on all interactive elements
- `prefers-reduced-motion`: disables all animations and canvas effects
- Touch targets are ≥48px minimum
- Score card fallback via `<textarea>` + `document.execCommand('copy')` for older browsers

---

## Security

- Content Security Policy: `default-src 'none'`, `script-src 'unsafe-inline'`, `style-src 'unsafe-inline' https://fonts.googleapis.com`
- localStorage data validated and clamped on load (no trust in stored values)
- No `innerHTML` with untrusted data — all DOM manipulation uses `createElement`/`textContent`
- No external script dependencies — single self-contained file
- Clipboard share uses `navigator.clipboard` → `execCommand('copy')` fallback chain

---

## Testing & CI

```bash
npm install
npm test          # Run all 94+ game logic tests
npm run lint:static  # Run static invariant checks
npm run gauntlet  # Run full CI gauntlet (static + tests)
```

---

## Design constraints

See [DESIGN.md](DESIGN.md).

- Feels native inside an X-style card (~320–400px)
- Short skill sessions
- **Single file** — no bundler, no framework, no backend
- No external image/audio assets
- Bounded particle pool (64 particles, free-list)
- Bounded timestep (max 45ms) for stable physics

---

## Local

```bash
git clone https://github.com/FahadIbrahim93/viral-pet-nix.git
cd viral-pet-nix
open index.html
```

## License

MIT — see [LICENSE](LICENSE).

Built for **X — the future super app**.
