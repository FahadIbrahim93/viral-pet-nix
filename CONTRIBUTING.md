# Contributing

Thanks for helping improve Nix. Keep changes small, testable, and compatible with the single-file runtime.

## Before opening a pull request

- Use Node.js 20 or newer.
- Run `npm ci` and `npm run gauntlet`.
- Run `npm run verify:version` when changing release metadata.
- Update `CHANGELOG.md` for user-visible behavior.
- Update `DESIGN.md` when changing the game loop, architecture, or constraints.
- Test touch and keyboard controls in a Vercel preview or local browser.

## Pull requests

Use a focused title and explain the player-facing behavior, test coverage, and deployment impact. Keep generated files and unrelated refactors out of the change. Do not add external runtime dependencies, tracking, or backend services without first documenting the tradeoff and security impact.

## Code conventions

`index.html` is the canonical runtime. Prefer existing helpers and bounded data structures. Preserve the content security policy, keyboard accessibility, reduced-motion behavior, safe DOM APIs, localStorage validation, and deterministic test hooks (`window.__nix`).

## Releases

Update `package.json` and `package-lock.json` together, then keep the version in `README.md`, `DESIGN.md`, and `CHANGELOG.md` aligned. Production deploys only from `main` through the repository's Vercel integration.
