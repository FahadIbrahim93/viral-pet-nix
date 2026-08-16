# Nix — Timeline Dodge

**Skill-based viral pet.** Dodge the timeline. Survive. Collect hearts. Evolve Nix.

**Live:** [https://viral-pet-nix.vercel.app](https://viral-pet-nix.vercel.app)  
**Version:** 2.3

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
| Collect hearts | Score × mult (gold = risk) |
| Streak ×8 | Temporary shield |
| Blue Check | Rare slow-mo |
| Run ends | Feed Nix · challenge text · score card image |

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

- **Challenge Friend** — copies a ready-to-paste challenge (native share sheet on mobile)
- **Score Card** — generates a simple image you can download or share

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

---

## Design constraints

See [DESIGN.md](DESIGN.md).

- Feels native inside an X-style card (~320–400px)
- Short skill sessions
- **Single file** — no bundler, no framework, no backend
- No external image/audio assets

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
