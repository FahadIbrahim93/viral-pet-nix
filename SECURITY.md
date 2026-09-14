# Security policy

## Supported versions

Only the latest version on the `main` branch is supported.

## Reporting a vulnerability

Do not open a public issue for a security vulnerability. Report it privately through [GitHub's private vulnerability reporting](https://github.com/FahadIbrahim93/viral-pet-nix/security/advisories/new). Include the affected file or URL, reproduction steps, impact, and any suggested mitigation.

Please allow time for investigation before public disclosure. The project does not collect accounts or server-side player data, but reports involving the deployed site, content security policy, unsafe DOM behavior, dependency supply chain, or deployment configuration are still important.

## Security expectations

Changes must preserve the CSP, avoid untrusted `innerHTML`, validate localStorage data, and keep deployment credentials out of the repository. Dependency updates should be reviewed and tested through the CI gauntlet.
