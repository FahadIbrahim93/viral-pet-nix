# Changelog

All notable changes to **Nix Timeline Dodge** are documented here.

## [2.4.1] — 2026-08-30

### Major Features

- **Running pet animation** — Nix now has animated legs and arms that move with a natural running gait (2–5 Hz cadence), with knee/elbow joint bends and opposition-phase arms
- **Playwright E2E test suite** — 53 browser integration tests covering startup, gameplay, keyboard controls, care system, viral loop, persistence, accessibility, and performance
- **CI gauntlet** — 7-gate GitHub Actions workflow replacing the old integrity-only check

### Bug Fixes

- **`stageThreshold(0)` returned 9999** — `|| 9999` treated `0` as falsy; replaced with nullish coalescing (`?? 9999`)
- **`care` object corruption** — malformed localStorage could set `care` to `null`, crashing `_resetState`; now validated and defaulted before use
- **`validateCareData(null)` returned `null`** — now returns safe defaults instead of propagating `null`
- **`refreshCareUI` crashed on null DOM elements** — added null guards for when called outside results mode
- **`endRun` crashed when care elements were null** — wrapped `querySelector` calls in null checks
- **`addPop` crashed when `canvas`/`ctx` were null** — added early return guard
- **`resize()` crashed in jsdom** — added null checks for `getContext` return
- **Button handlers crashed when elements were null** — wrapped `$('startBtn')` and `$('playAgainBtn')` in null checks
- **Running pet legs were invisible** — animation used `performance.now()` (ms) directly in `sin()`, producing 25–75 Hz blur; converted to seconds for 2–5 Hz natural gait

### Security

- **Added Content Security Policy** meta tag (`default-src 'self'`)
- **Replaced `innerHTML`** in `spawnCareBurst` with safe DOM creation (`textContent`)
- **Removed `prompt()` clipboard fallback** — replaced with non-interactive fallback (copy to clipboard only, no modal)
- **Safe localStorage recovery** — wrapped `JSON.parse` in try/catch with type validation

### Accessibility

- **`aria-live="polite"` on HUD** — score/lives changes announced to screen readers
- **`prefers-reduced-motion`** — CSS `@media` query disables animations; runtime flag `prefersReducedMotion` disables particles, dust, and shaking
- **`:focus-visible` outlines** — keyboard-only focus indicators on all interactive elements
- **`role="application"` on game container** — signals interactive app to assistive tech
- **`aria-hidden="true"` on canvas** — decorative element hidden from screen readers
- **`aria-label` on buttons** — "Start Run" and "Play Again" buttons have descriptive labels
- **Touch targets ≥ 44×44px** — all buttons meet minimum size requirements

### Performance

- **Bounded particle pool** — fixed array of 120 particles with acquire/release, never grows
- **Bounded posts array** — capped at 40 obstacles, oldest recycled when full
- **Bounded floats array** — capped at 30, oldest recycled when full
- **`requestAnimationFrame` with bounded timestep** — `dt` capped at 50ms to prevent spiral of death
- **Reduced-motion mode skips particles/dust/shake** — zero allocations in those paths

### Testing

- **99 Jest unit tests** — lane calculation, collision detection, score calculation, stage thresholds, power/clamp, particle pool, lifecycle, speed/spawn progression, storage validation, red-team fairness, and animation timing
- **53 Playwright E2E tests** — startup, game start, keyboard controls, gameplay mechanics, game over/restart, care system, viral loop, persistence, accessibility, reduced motion, performance
- **36 static invariant checks** — CSP presence, aria attributes, semantic HTML, documentation consistency, no dangerous patterns
- **35 built-in self-tests** — `runSelfTests()` runs in-browser and in Jest, verifying core logic

### CI/CD

- **7-gate gauntlet** (`gauntlet.yml`):
  1. Static invariant checks (36)
  2. JavaScript syntax check (`node --check`)
  3. Deterministic game logic tests (Jest)
  4. HTML structure validity
  5. Documentation consistency (version matching)
  6. Browser E2E tests (Playwright + Chromium)
  7. File integrity (existence + function presence)
- **Removed old `integrity.yml`** — replaced by comprehensive gauntlet

### Documentation

- **Reconciled README and DESIGN.md** — both now say v2.4.1
- **Removed false "running pet arms/legs" claim from v2.4** — feature now actually implemented and tested
- **Added `npm test` and `npm run test:e2e` instructions** to README
- **SESSION.md** — full engineering session record with decisions, defects, and certification

---

## [2.4] — 2026-08-18

- Running pet arms/legs (claimed, not implemented — fixed in 2.4.1)
- Reduced-motion media query (CSS only — extended with runtime in 2.4.1)
- Expanded self-tests to 35

## [2.3.1] — 2026-08-17

- CI integrity check workflow
- Reduced-motion CSS media query
- Expanded test assertions
- Accessibility and CSP improvements

## [2.3] — 2026-08-16

- Feel polish, care personality, challenge text + score card
- Documentation rewrite

## [2.2] — 2026-08-16

- Full Timeline Dodge gameplay
- Care panel with pet evolution
- Single-file architecture

## [2.1] — 2026-08-16

- Initial care system
- Badges and tech stack docs

## [1.0] — 2026-08-16

- Initial commit
