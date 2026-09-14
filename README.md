# Nix — Timeline Dodge

**Nix** is a short, skill-based viral pet game: dodge the timeline, land near-misses, and evolve your pet.

**Live:** <https://viral-pet-nix.vercel.app>
**Version:** 2.5.0

[![CI](https://github.com/FahadIbrahim93/viral-pet-nix/actions/workflows/gauntlet.yml/badge.svg)](https://github.com/FahadIbrahim93/viral-pet-nix/actions/workflows/gauntlet.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Play

Open the [live demo](https://viral-pet-nix.vercel.app), or open `index.html` in a browser. Tap **Start Run**, then use the left and right halves of the game to change lanes. Keyboard players can use `A`/`D` or the arrow keys. Dodge posts, collect hearts, and use near-misses to build a multiplier.

The game is deliberately a single static HTML file. There is no account, backend, build step, or external game asset. Progress is stored locally in the browser and the game remains playable offline after its first load.

## Development

Requires Node.js 20 or newer.

```bash
git clone https://github.com/FahadIbrahim93/viral-pet-nix.git
cd viral-pet-nix
npm ci

# Fast static invariants
npm run lint:static

# Deterministic Jest tests
npm test

# Chromium end-to-end tests
npm run test:e2e

# All local quality gates
npm run gauntlet
```

For a local browser session, use any static server (for example `npx serve .`) and visit the URL it prints. The Playwright suite starts its own test server.

## Deployment

Production is deployed by Vercel from the `main` branch at <https://viral-pet-nix.vercel.app>. Vercel should be connected to this GitHub repository with:

| Setting | Value |
| --- | --- |
| Framework preset | Other |
| Build command | None |
| Output directory | `.` |
| Install command | None |
| Production branch | `main` |

Every pull request receives a Vercel preview deployment. Merge only after the required `gauntlet` workflow passes; merging to `main` then promotes the repository state to production. `vercel.json` supplies the production security and cache headers. A manual deploy is an emergency fallback only:

```bash
npx vercel --prod
```

Do not commit `.vercel` metadata or deployment tokens. For rollback, use Vercel's deployment history to promote the last known-good deployment, then follow up with a corrective commit.

## Repository map

| Path | Purpose |
| --- | --- |
| `index.html` | Canonical game runtime, styles, and markup |
| `test/game-logic.test.js` | Jest unit and integration tests |
| `test/e2e/gameplay.spec.js` | Browser gameplay and accessibility coverage |
| `test/static-checks.js` | Security, accessibility, and implementation invariants |
| `.github/workflows/gauntlet.yml` | Required CI quality gates |
| `vercel.json` | Static hosting headers and deployment behavior |
| `DESIGN.md` | Product and technical design notes |
| `CHANGELOG.md` | Release history |

The compact `game-a.js`, `game-a1.js`, and `game-b.js` files are legacy reference artifacts. They are not loaded by `index.html`; edit the inline runtime in `index.html`.

## Release process

1. Make a focused change and update tests or documentation with it.
2. Run `npm run gauntlet` and `npm run verify:version` locally.
3. Update `package.json`, `package-lock.json`, `DESIGN.md`, and `CHANGELOG.md` together for a release.
4. Open a pull request and verify its Vercel preview.
5. Merge to `main` after CI passes and verify the production URL.

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution standards and [SECURITY.md](SECURITY.md) for responsible vulnerability reports.

## License

MIT — see [LICENSE](LICENSE).
