# Viral Pet (Nix) — Design Doc

**Version:** 2.2  
**Date:** 2026-08-16  
**Status:** Timeline Dodge + care panel — polished

## Goal

Skill/reaction first 15–20s. Near-miss mastery, pattern variety, strong feedback. Care/evolution fueled by runs.

## Core Loop

Start Run → dodge posts (3 lanes) → collect hearts → multiplier/streak → survive → results → spend score on Nix / challenge / retry.

## Features (v2.2)

- Near-miss CLEAN (window 34px) + score
- Pattern waves, risk hearts, streak shield (×8), Blue Check slow-mo
- Speed bands, hit particles (pooled), visual cues (flash / lane / rings)
- Free-list particle pool + canvas render opts (cached lanes/gradients)
- WebAudio feedback, local best
- **Care panel:** large living pet, stage ring + dots, XP bar, floating +stat pops, heart burst, juicy feed button, personality reactions

## Stages

Egg → Hatchling → Timeline Cub → Thread Beast → Viral Legend

## Non-Goals

Single file. No external assets. No backend. No multi-file architecture.

## Success

Fair deaths, “one more run”, readable skill expression, satisfying spend-score moment.

## Version History

- **1.x** — Idle care prototype
- **2.0** — Timeline Dodge redesign
- **2.1** — Depth + juice
- **2.2** — Near-miss tune, feedback cues, hit particles, pool + render polish, care panel juice
