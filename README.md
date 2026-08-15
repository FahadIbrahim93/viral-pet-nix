# Nix — Timeline Dodge

**Skill-based viral pet.** Dodge the timeline. Survive. Collect hearts. Evolve Nix.

**Live:** [https://viral-pet-nix.vercel.app](https://viral-pet-nix.vercel.app)  
**Version:** 2.2

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Single File](https://img.shields.io/badge/Single%20File-HTML-brightgreen)](index.html)

---

## Play in 10 seconds

1. Open the [live demo](https://viral-pet-nix.vercel.app) or open `index.html` locally
2. Tap **Start Run**
3. Tap left / right half of the card (or arrow keys) to change lanes
4. Dodge posts · grab hearts · near-miss for **CLEAN**
5. After the run → **Give Nix +score** and watch the pet react

No install. No build. Works offline after first load.

---

## Core loop

| Action | Effect |
|--------|--------|
| Dodge posts | Survive |
| Near-miss (CLEAN) | Score + streak + multiplier |
| Collect hearts | Score × mult (gold = risk, higher reward) |
| Streak ×8 | Temporary shield |
| Blue Check | Rare slow-mo |
| Run ends | Spend score to power Nix · challenge a friend |

---

## Care panel

- Larger living pet with spinning stage ring
- Stage XP bar + progress dots
- Floating +Att / +Ene / +Mood pops
- Heart particle burst on feed
- Glowing “Give Nix +score” button
- Personality reaction lines

Stages: Egg → Hatchling → Timeline Cub → Thread Beast → Viral Legend

---

## Controls

- **Touch:** tap left half → left lane · right half → right lane
- **Keyboard:** `←` `→` or `A` `D`
- Built for a narrow post-card frame

---

## What’s included

- Single `index.html` — zero dependencies
- Near-miss scoring, streak shield, risk hearts, slow-mo
- Pattern waves + speed bands
- Free-list particle pool + canvas optimisations
- WebAudio feedback
- Local high score + care/evolution progression
- Challenge-a-friend text copy

---

## Design constraints

See [DESIGN.md](DESIGN.md).

- Feels native inside an X-style card (~320–400px)
- Short skill sessions (15–60s)
- **Single file** — no bundler, no framework, no backend
- No external image/audio assets

---

## Share on X

1. Share the live link
2. Attach a short vertical clip or screenshot of a high-score run
3. Caption example:

```
I scored [N] on Nix Timeline Dodge

Near-miss for style. Streak for shield.
Beat me → https://viral-pet-nix.vercel.app
#ViralPet #Nix
```

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
