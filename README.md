# Nix — Timeline Dodge

**Skill-based viral pet mini-game.** Dodge the timeline. Survive. Collect hearts. Evolve Nix.

**Play:** [https://fahadibrahim93.github.io/viral-pet-nix](https://fahadibrahim93.github.io/viral-pet-nix)  
**Repo:** [FahadIbrahim93/viral-pet-nix](https://github.com/FahadIbrahim93/viral-pet-nix)  
**Version:** 2.2  
**License:** MIT

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Single File](https://img.shields.io/badge/Single%20File-HTML-brightgreen)](index.html)
[![No Dependencies](https://img.shields.io/badge/Dependencies-None-success)](index.html)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-222222?style=for-the-badge&logo=github)](https://fahadibrahim93.github.io/viral-pet-nix)

---

## 🎮 Play in 10 seconds

1. Open the [live demo](https://fahadibrahim93.github.io/viral-pet-nix) or open `index.html` locally
2. Tap **Start Run**
3. Tap left / right half of the card (or arrow keys) to change lanes
4. Dodge posts · grab hearts · near-miss for **CLEAN**
5. After the run → **Give Nix +score** and watch the pet react

No install. No build. Works offline after first load.

---

## ✨ Why this project

- **Single-file delivery:** Entire game in one `index.html`, no bundler, no framework, no backend
- **Viral-loop ready:** Built for social sharing with challenge-a-friend mechanics and score replay hooks
- **Performance-first:** Canvas rendering with free-list particle pool, dynamic speed bands, and WebAudio feedback
- **Accessible input model:** Touch + keyboard support, narrow post-card frame optimized for mobile sharing
- **Persistence without servers:** Local high score + care/evolution progression stored client-side

---

## 🎯 Core loop

| Action | Effect |
|--------|--------|
| Dodge posts | Survive |
| Near-miss (CLEAN) | Score + streak + multiplier |
| Collect hearts | Score × mult (gold = risk, higher reward) |
| Streak ×8 | Temporary shield |
| Blue Check | Rare slow-mo |
| Run ends | Spend score to power Nix · challenge a friend |

---

## 🧬 Care panel

- Larger living pet with spinning stage ring
- Stage XP bar + progress dots
- Floating +Att / +Ene / +Mood pops
- Heart particle burst on feed
- Glowing “Give Nix +score” button
- Personality reaction lines

**Evolution stages:** Egg → Hatchling → Timeline Cub → Thread Beast → Viral Legend

---

## 🕹️ Controls

- **Touch:** tap left half → left lane · right half → right lane
- **Keyboard:** `←` `→` or `A` `D`
- Built for a narrow post-card frame

---

## 🛠️ Tech stack

- Vanilla HTML/CSS/JavaScript
- Canvas 2D rendering
- WebAudio API for feedback
- No external image/audio assets
- Zero dependencies

---

## 📦 What’s included

- Single `index.html` — zero dependencies
- Near-miss scoring, streak shield, risk hearts, slow-mo
- Pattern waves + speed bands
- Free-list particle pool + canvas optimisations
- WebAudio feedback
- Local high score + care/evolution progression
- Challenge-a-friend text copy
- Offline-ready after first load

---

## 📐 Design constraints

See [DESIGN.md](DESIGN.md) for full design notes.

- Feels native inside an X-style card (~320–400px)
- Short skill sessions (15–60s)
- **Single file** — no bundler, no framework, no backend
- No external image/audio assets

---

## 🚀 Local

```bash
git clone https://github.com/FahadIbrahim93/viral-pet-nix.git
cd viral-pet-nix
open index.html
```

---

## 🚢 Deploy / Hosting

- **Preferred:** GitHub Pages at `https://fahadibrahim93.github.io/viral-pet-nix`
- **Alternative:** any static host that serves `index.html` as root

---

## 📣 Share on X

1. Share the live link
2. Attach a short vertical clip or screenshot of a high-score run
3. Caption example:

```
I scored [N] on Nix Timeline Dodge

Near-miss for style. Streak for shield.
Beat me → https://fahadibrahim93.github.io/viral-pet-nix
#ViralPet #Nix
```

---

## 📄 License

MIT — see [LICENSE](LICENSE).

Built for **X — the future super app**.
