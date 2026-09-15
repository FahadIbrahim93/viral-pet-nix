# Nix — Timeline Dodge

**Nix** is a short, skill-based viral pet game: dodge the timeline, land near-misses, jump low posts.

**Live:** <https://viral-pet-nix.vercel.app>  
**Version:** 3.0.0

## Play

Open the [live demo](https://viral-pet-nix.vercel.app). Tap **Start Run**, then:

| Input | Action |
| --- | --- |
| Tap left / right or **A / D** | Change lane |
| Tap upper third or **↑ / W** | Jump low posts |
| Near-miss a post | **CLEAN** multiplier |

Single static HTML. No account, backend, or external assets. Best score in `localStorage`.

## Features (production)

- 3-lane perspective runner
- Jump over low posts
- Near-miss CLEAN scoring
- Running pet with limbs
- Dual Start binding (pointerup + click) — no stuck menu
- Enter / Space to start

## Full AAA build (local)

Complete Claude v3.0 (Viral Surge, care panel, fairness pause, generative audio, combo callouts, self-tests) is in the workspace at `artifacts/viral-pet/index.html` (~71 KB).

## License

MIT
