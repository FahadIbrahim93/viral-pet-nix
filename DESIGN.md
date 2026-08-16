# Viral Pet (Nix) — Design Doc

**Version:** 2.3.1  
**Date:** 2026-08-17  
**Status:** Timeline Dodge + care panel + share card — polished + hardened

## Goal

Skill/reaction first 15–20s. Near-miss mastery, pattern variety, strong feedback. Care/evolution fueled by runs. Easy challenge sharing while X in-feed play matures.

## Core Loop

Start Run → dodge posts (3 lanes) → collect hearts → multiplier/streak → survive → results → spend score on Nix / challenge / score card / retry.

## Features (v2.3.1)

- Near-miss CLEAN (window 34px) + stronger juice
- Pattern waves, risk hearts, streak shield (×8), Blue Check slow-mo
- Smoother speed bands, hit intensity scales with speed
- Free-list particle pool + canvas render opts
- WebAudio feedback, local best
- **Care panel:** large living pet, stage ring + dots, XP bar, floating +stat pops, heart burst, personality reactions
- **Share:** one-tap challenge text (native share when available) + Canvas score card
- Expanded self-tests, prefers-reduced-motion, aria-label, CSP meta, CI integrity workflow

## Stages

Egg → Hatchling → Timeline Cub → Thread Beast → Viral Legend

## Non-Goals

Single file. No external assets. No backend. No multi-file architecture.

## Success

Fair deaths, “one more run”, readable skill expression, satisfying spend-score moment, easy challenge on X.

## Version History

- **1.x** — Idle care prototype
- **2.0** — Timeline Dodge redesign
- **2.1** — Depth + juice
- **2.2** — Near-miss tune, feedback cues, hit particles, pool + render polish, care panel juice
- **2.3** — Feel polish, care personality, challenge text + score card
- **2.3.1** — Expanded tests, reduced-motion, a11y, CSP, CI integrity
