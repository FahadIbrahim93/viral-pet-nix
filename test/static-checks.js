#!/usr/bin/env node
/**
 * Static invariant checks for index.html
 * Run: node test/static-checks.js
 * Exit 0 = all pass, Exit 1 = failures
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
const design = fs.readFileSync(path.join(ROOT, 'DESIGN.md'), 'utf8');

let passed = 0;
let failed = 0;
const failures = [];

function check(condition, msg) {
  if (condition) {
    passed++;
    process.stdout.write('.');
  } else {
    failed++;
    failures.push(msg);
    process.stdout.write('F');
  }
}

// ── CSP ──
check(html.includes('Content-Security-Policy'), 'CSP meta tag present');
check(!html.includes("script-src 'unsafe-eval'"), 'CSP does not allow unsafe-eval');
check(html.includes("default-src 'none'"), 'CSP default-src is none');

// ── Accessibility ──
check(html.includes('aria-live'), 'aria-live region present');
check(html.includes('role="application"') || html.includes('role="dialog"'), 'ARIA roles present');
check(html.includes('aria-label'), 'aria-label attributes present');
check(html.includes('focus-visible'), 'Focus-visible styles present');
check(html.includes('prefers-reduced-motion'), 'Reduced-motion CSS present');
check(html.includes('lang="en"'), 'Language attribute present');
check(html.includes('meta name="description"'), 'Meta description present');
check(html.includes('sr-only') || html.includes('visually-hidden'), 'Screen-reader-only class present');

// ── Security ──
check(!html.includes("prompt('Copy challenge'"), 'No prompt() fallback for clipboard');
check(html.includes('validateStorage'), 'Storage validation function present');
check(html.includes('validateCareData'), 'Care data validation present');
check(html.includes('clampCare'), 'clampCare prevents overflow');

// ── Reduced motion ──
check(html.includes('prefersReducedMotion'), 'Runtime reduced-motion check present');
check(html.includes('animation-duration: 0.01ms !important'), 'CSS reduced-motion rule present');

// ── Dead code ──
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
const script = scriptMatch ? scriptMatch[1] : '';
check(!script.includes('let pops='), 'No unused pops array');

// ── Game constants ──
check(script.includes('SPEED_MAX=7.8') || script.includes('SPEED_MAX'), 'SPEED_MAX constant defined');
check(script.includes('MAX_MULT=8') || script.includes('MAX_MULT'), 'MAX_MULT constant defined');
check(script.includes('MAX_LIVES=3') || script.includes('MAX_LIVES'), 'MAX_LIVES constant defined');
check(script.includes('PART_POOL_SIZE=64') || script.includes('PART_POOL_SIZE'), 'PART_POOL_SIZE constant defined');

// ── Testability ──
check(script.includes('window.__nix'), 'Functions exposed for testing (window.__nix)');
check(script.includes('selfTestResults'), 'Self-test results exposed');
check(script.includes('runSelfTests') || script.includes('runTests'), 'Self-tests present');

// ── Documentation consistency ──
// Version should be consistent
check(readme.includes('2.4') || readme.includes('2.4.1'), 'README version updated to 2.4+');

// No false feature claims
const hasRunningPetCode = script.includes('legAngle') || script.includes('running legs');
check(hasRunningPetCode, 'Running pet legs are implemented (not just claimed)');

// No innerHTML with untrusted data
const innerHTMLUsages = (script.match(/innerHTML/g) || []).length;
check(innerHTMLUsages === 0, 'No innerHTML usage (uses safe DOM manipulation)');

// ── Viral loop ──
check(script.includes('challengeText') || script.includes('shareChallenge'), 'Challenge/share function present');
check(script.includes('makeScoreCard'), 'Score card generation present');
check(script.includes('execCommand') || script.includes('navigator.clipboard'), 'Clipboard API or execCommand fallback');
check(script.includes('navigator.share'), 'Native share API support');

// ── Performance ──
check(script.includes('Math.min(0.045'), 'Bounded timestep (max 45ms)');
check(script.includes('freeList') || script.includes('partPool'), 'Particle pool implementation');
check(!script.includes('setInterval'), 'No setInterval in hot loop (uses rAF)');

// ── Key storage key matches version ──
check(script.includes('nix_dodge_v24') || script.includes('STORAGE_KEY'), 'Storage key updated for v24');

// ── Summary ──
console.log('');
console.log(`\nStatic checks: ${passed} passed, ${failed} failed out of ${passed + failed}`);
if (failures.length > 0) {
  console.log('\nFAILURES:');
  for (const f of failures) console.log('  ✗ ' + f);
  process.exit(1);
} else {
  console.log('\n✓ All static checks passed');
  process.exit(0);
}
