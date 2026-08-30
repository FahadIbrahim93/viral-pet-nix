# Viral Pet (Nix) — Design Doc

**Version:** 2.4.1  
**Date:** 2026-08-30  
**Status:** Timeline Dodge + running pet + care + share + hardened

## Goal

Skill/reaction first 15–20s. Near-miss mastery, pattern variety, strong feedback. Care/evolution fueled by runs. Easy challenge sharing while X in-feed play matures.

## Core Loop

Start Run → dodge posts (3 lanes) → collect hearts → multiplier/streak → survive → results → spend score on Nix / challenge / score card / retry.

## Features (v2.4.1)

- Near-miss CLEAN (window 34px) + stronger juice
- Pattern waves, risk hearts, streak shield (×8), Blue Check slow-mo
- Smoother speed bands (3 bands: 2.6–3.3–4.0–7.8), hit intensity scales with speed
- Free-list particle pool (64 particles) + canvas render
- WebAudio feedback, local best
- **Running pet:** side-view legs cycle with speed (all stages), arms at Stage 2+, motion dust at high speed
- **Care panel:** large living pet, stage ring + dots, XP bar, floating +stat pops, heart burst, personality reactions
- **Share:** one-tap challenge text (native share when available, clipboard fallback with textarea) + Canvas score card (native share with file, or download fallback)
- **Accessibility:** aria-live HUD, aria-label on all controls, visible focus indicators, prefers-reduced-motion (CSS + runtime), semantic roles, sr-only utility
- **Security:** CSP meta tag, localStorage validation + clamping, safe DOM manipulation (no innerHTML with untrusted data), no remote script dependencies
- **Performance:** bounded timestep (max 45ms), bounded particle pool, no allocations in hot loop, resize/DPR correctness
- Deterministic tests via Jest + jsdom (94+ tests), static invariant checks, CI gauntlet

## Stages

Egg → Hatchling → Timeline Cub → Thread Beast → Viral Legend

## Non-Goals

Single file. No external assets. No backend. No multi-file architecture.

## Success

Fair deaths, "one more run", readable skill expression, satisfying spend-score moment, easy challenge on X.

## Architecture

```
index.html (single file)
├── <style> — CSS with reduced-motion media query, focus-visible, sr-only
├── <div> DOM — canvas (aria-hidden), HUD (aria-live), overlays, care panel, buttons
└── <script> — single IIFE
    ├── Pure functions (testable via window.__nix)
    ├── Constants (all configurable, named)
    ├── Canvas + audio setup
    ├── localStorage persistence (validated + clamped)
    ├── State variables
    ├── Particle pool (64 particles, free-list, no hot-loop allocs)
    ├── Input handlers (pointerdown, keydown)
    ├── Wave system (WAVES array, always safe-lane)
    ├── Game lifecycle (startRun, endRun — full state reset)
    ├── Care system (spendCare, refreshCareUI, animations)
    ├── Viral loop (challenge share, score card)
    ├── Update loop (physics, collision, scoring)
    ├── Draw loop (pet with running limbs, posts, hearts, particles)
    ├── Main loop (rAF, bounded dt)
    ├── Self-tests (32+ assertions)
    └── window.__nix exposure (for testing)

test/
├── static-checks.js — CSP, a11y, security, doc consistency (36 checks)
└── game-logic.test.js — Jest + jsdom (94 tests)

.github/workflows/
└── gauntlet.yml — CI: static checks + Jest tests + syntax + security
```

## Version History

- **1.x** — Idle care prototype
- **2.0** — Timeline Dodge redesign
- **2.1** — Depth + juice
- **2.2** — Near-miss tune, feedback cues, hit particles, pool + render polish, care panel juice
- **2.3** — Feel polish, care personality, challenge text + score card
- **2.3.1** — Expanded tests, reduced-motion, a11y, CSP, CI integrity
- **2.4** — Side-view running Nix with arms/legs, motion dust, start fix
- **2.4.1** — Hardening: CSP, a11y (aria-live, focus-visible, reduced-motion), security (safe DOM, localStorage validation), running pet limbs, 94+ tests, CI gauntlet, dead code removal, viral loop improvements, documentation reconciliation
