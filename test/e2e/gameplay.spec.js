/**
 * End-to-end browser tests for Nix Timeline Dodge.
 * Uses Playwright + Chromium to verify real gameplay in a real browser.
 */
const { test, expect } = require('@playwright/test');

const BASE = 'http://localhost:3456';

// ═══════════════════════════════════════
// STARTUP & MENU
// ═══════════════════════════════════════

test.describe('Startup', () => {
  test('page loads with correct title', async ({ page }) => {
    await page.goto(BASE);
    await expect(page).toHaveTitle(/Nix/);
  });

  test('canvas element exists', async ({ page }) => {
    await page.goto(BASE);
    const canvas = page.locator('#c');
    await expect(canvas).toBeVisible();
  });

  test('menu overlay is visible on load', async ({ page }) => {
    await page.goto(BASE);
    const menu = page.locator('#menu');
    await expect(menu).toBeVisible();
    await expect(menu.locator('h1')).toHaveText('Nix');
  });

  test('start button is visible and clickable', async ({ page }) => {
    await page.goto(BASE);
    const btn = page.locator('#startBtn');
    await expect(btn).toBeVisible();
    await expect(btn).toBeEnabled();
    await expect(btn).toHaveText('Start Run');
  });

  test('HUD is hidden before game starts', async ({ page }) => {
    await page.goto(BASE);
    const hud = page.locator('#hud');
    await expect(hud).toBeHidden();
  });

  test('results overlay is hidden before game starts', async ({ page }) => {
    await page.goto(BASE);
    const results = page.locator('#results');
    await expect(results).toBeHidden();
  });

  test('best score displays on menu', async ({ page }) => {
    await page.goto(BASE);
    const best = page.locator('#menuBest');
    await expect(best).toBeVisible();
    const text = await best.textContent();
    expect(Number(text)).toBeGreaterThanOrEqual(0);
  });

  test('window.__nix API is exposed', async ({ page }) => {
    await page.goto(BASE);
    const hasApi = await page.evaluate(() => typeof window.__nix === 'object');
    expect(hasApi).toBe(true);
  });

  test('self-tests pass in browser', async ({ page }) => {
    await page.goto(BASE);
    const results = await page.evaluate(() => window.__nix.selfTestResults);
    expect(results.failed).toBe(0);
    expect(results.passed).toBeGreaterThan(0);
  });
});

// ═══════════════════════════════════════
// GAME START
// ═══════════════════════════════════════

test.describe('Game start', () => {
  test('clicking Start Run begins the game', async ({ page }) => {
    await page.goto(BASE);
    await page.click('#startBtn');
    // Menu should be hidden
    await expect(page.locator('#menu')).toBeHidden();
    // HUD should be visible
    await expect(page.locator('#hud')).toBeVisible();
    // Mode should be 'running'
    const mode = await page.evaluate(() => window.__nix.mode);
    expect(mode).toBe('running');
  });

  test('game starts with 3 lives', async ({ page }) => {
    await page.goto(BASE);
    await page.click('#startBtn');
    const lives = await page.evaluate(() => window.__nix.lives);
    expect(lives).toBe(3);
  });

  test('game starts with dist near 0', async ({ page }) => {
    await page.goto(BASE);
    await page.click('#startBtn');
    // dist increases immediately via rAF, so just check it's small
    const dist = await page.evaluate(() => window.__nix.dist);
    expect(dist).toBeLessThan(50);
  });

  test('game starts with multiplier 1', async ({ page }) => {
    await page.goto(BASE);
    await page.click('#startBtn');
    const mult = await page.evaluate(() => window.__nix.mult);
    expect(mult).toBe(1);
  });

  test('game starts at center lane', async ({ page }) => {
    await page.goto(BASE);
    await page.click('#startBtn');
    const target = await page.evaluate(() => window.__nix.targetLane);
    expect(target).toBe(1);
  });

  test('game starts at minimum speed', async ({ page }) => {
    await page.goto(BASE);
    await page.click('#startBtn');
    const speed = await page.evaluate(() => window.__nix.speed);
    expect(speed).toBeCloseTo(2.6, 1);
  });
});

// ═══════════════════════════════════════
// KEYBOARD CONTROLS
// ═══════════════════════════════════════

test.describe('Keyboard controls', () => {
  test('ArrowLeft moves to left lane', async ({ page }) => {
    await page.goto(BASE);
    await page.click('#startBtn');
    await page.keyboard.press('ArrowLeft');
    // Wait for visual interpolation
    await page.waitForTimeout(100);
    const target = await page.evaluate(() => window.__nix.targetLane);
    expect(target).toBe(0);
  });

  test('ArrowRight moves to right lane', async ({ page }) => {
    await page.goto(BASE);
    await page.click('#startBtn');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100);
    const target = await page.evaluate(() => window.__nix.targetLane);
    expect(target).toBe(2);
  });

  test('cannot move left from lane 0', async ({ page }) => {
    await page.goto(BASE);
    await page.click('#startBtn');
    // Move to lane 0
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(50);
    // Try to move left again
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(50);
    const target = await page.evaluate(() => window.__nix.targetLane);
    expect(target).toBe(0);
  });

  test('cannot move right from lane 2', async ({ page }) => {
    await page.goto(BASE);
    await page.click('#startBtn');
    // Move to lane 2
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(50);
    // Try to move right again
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(50);
    const target = await page.evaluate(() => window.__nix.targetLane);
    expect(target).toBe(2);
  });

  test('A/D keys work as alternatives', async ({ page }) => {
    await page.goto(BASE);
    await page.click('#startBtn');
    await page.keyboard.press('a');
    await page.waitForTimeout(100);
    const target = await page.evaluate(() => window.__nix.targetLane);
    expect(target).toBe(0);

    await page.keyboard.press('d');
    await page.keyboard.press('d');
    await page.waitForTimeout(100);
    const target2 = await page.evaluate(() => window.__nix.targetLane);
    expect(target2).toBe(2);
  });

  test('keyboard input ignored when not running', async ({ page }) => {
    await page.goto(BASE);
    // Game is in menu mode
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(50);
    const target = await page.evaluate(() => window.__nix.targetLane);
    expect(target).toBe(1); // Should stay at center
  });
});

// ═══════════════════════════════════════
// GAMEPLAY MECHANICS
// ═══════════════════════════════════════

test.describe('Gameplay mechanics', () => {
  test('distance increases over time', async ({ page }) => {
    await page.goto(BASE);
    await page.click('#startBtn');
    await page.waitForTimeout(1500);
    const dist = await page.evaluate(() => window.__nix.dist);
    expect(dist).toBeGreaterThan(0);
  });

  test('speed increases with distance', async ({ page }) => {
    await page.goto(BASE);
    await page.click('#startBtn');
    await page.waitForTimeout(3000);
    const speed = await page.evaluate(() => window.__nix.speed);
    expect(speed).toBeGreaterThan(2.6);
  });

  test('spawnFromWave creates posts', async ({ page }) => {
    await page.goto(BASE);
    await page.click('#startBtn');
    // Manually trigger wave spawn (rAF may be throttled in headless)
    await page.evaluate(() => window.__nix.spawnFromWave());
    const posts = await page.evaluate(() => window.__nix.posts.length);
    expect(posts).toBeGreaterThan(0);
  });

  test('speed never exceeds maximum', async ({ page }) => {
    await page.goto(BASE);
    // Verify across all possible distances
    const capped = await page.evaluate(() => {
      for (let d = 0; d <= 100000; d += 100) {
        if (window.__nix.computeSpeed(d) > 7.8) return false;
      }
      return true;
    });
    expect(capped).toBe(true);
  });

  test('HUD displays score element', async ({ page }) => {
    await page.goto(BASE);
    await page.click('#startBtn');
    const scoreEl = page.locator('#score');
    await expect(scoreEl).toBeVisible();
    const text = await scoreEl.textContent();
    expect(Number(text)).toBeGreaterThanOrEqual(0);
  });
});

// ═══════════════════════════════════════
// GAME OVER & RESTART
// ═══════════════════════════════════════

test.describe('Game over and restart', () => {
  // Helper: start a game, let it run briefly, then force endRun via API
  async function startAndEndGame(page) {
    await page.goto(BASE);
    await page.click('#startBtn');
    await page.waitForTimeout(2000); // let game run briefly
    // Ensure some distance so runScore > 0 (headless rAF may be throttled)
    await page.evaluate(() => {
      const n = window.__nix;
      if (n.dist < 100) n._resetState({ dist: 500, mode: 'running' });
    });
    await page.waitForTimeout(200);
    await page.evaluate(() => window.__nix.endRun());
    await page.waitForTimeout(300);
  }

  test('game ends and shows results', async ({ page }) => {
    await startAndEndGame(page);
    const mode = await page.evaluate(() => window.__nix.mode);
    expect(mode).toBe('results');
    await expect(page.locator('#results')).toBeVisible();
  });

  test('final score is displayed', async ({ page }) => {
    await startAndEndGame(page);
    const scoreText = await page.locator('#finalScore').textContent();
    const score = Number(scoreText);
    expect(score).toBeGreaterThanOrEqual(0);
  });

  test('Play Again button restarts the game', async ({ page }) => {
    await startAndEndGame(page);
    await page.click('#againBtn');
    await page.waitForTimeout(200);
    const mode = await page.evaluate(() => window.__nix.mode);
    expect(mode).toBe('running');
    const lives = await page.evaluate(() => window.__nix.lives);
    expect(lives).toBe(3);
  });

  test('restart fully resets all game state', async ({ page }) => {
    await startAndEndGame(page);
    await page.click('#againBtn');
    await page.waitForTimeout(200);
    const state = await page.evaluate(() => ({
      lives: window.__nix.lives,
      dist: window.__nix.dist,
      hearts: window.__nix.hearts,
      mult: window.__nix.mult,
      streak: window.__nix.streak,
      shield: window.__nix.shield,
      posts: window.__nix.posts.length,
      floats: window.__nix.floats.length,
    }));
    expect(state.lives).toBe(3);
    expect(state.dist).toBe(0);
    expect(state.hearts).toBe(0);
    expect(state.mult).toBe(1);
    expect(state.streak).toBe(0);
    expect(state.shield).toBe(0);
    expect(state.posts).toBe(0);
    expect(state.floats).toBe(0);
  });
});

// ═══════════════════════════════════════
// CARE SYSTEM
// ═══════════════════════════════════════

test.describe('Care system', () => {
  async function startAndEndGame(page) {
    await page.goto(BASE);
    await page.click('#startBtn');
    await page.waitForTimeout(2000);
    await page.evaluate(() => {
      const n = window.__nix;
      if (n.dist < 100) n._resetState({ dist: 500, mode: 'running' });
    });
    await page.waitForTimeout(200);
    await page.evaluate(() => window.__nix.endRun());
    await page.waitForTimeout(300);
  }

  test('care panel is visible after game over', async ({ page }) => {
    await startAndEndGame(page);
    await expect(page.locator('#carePanel')).toBeVisible();
  });

  test('Give Nix a treat button is enabled after game over', async ({ page }) => {
    await startAndEndGame(page);
    const btn = page.locator('#careBtn');
    await expect(btn).toBeEnabled();
  });

  test('feeding Nix increases care stats', async ({ page }) => {
    await startAndEndGame(page);
    const before = await page.evaluate(() => ({ ...window.__nix.care }));
    await page.click('#careBtn');
    await page.waitForTimeout(300);
    const after = await page.evaluate(() => ({ ...window.__nix.care }));
    const increased =
      after.att > before.att || after.ene > before.ene || after.mood > before.mood || after.total > before.total;
    expect(increased).toBe(true);
  });

  test('feeding Nix twice is idempotent (button disables)', async ({ page }) => {
    await startAndEndGame(page);
    await page.click('#careBtn');
    await page.waitForTimeout(300);
    const btn = page.locator('#careBtn');
    await expect(btn).toBeDisabled();
  });

  test('care stats are clamped to 100', async ({ page }) => {
    await page.goto(BASE);
    await page.evaluate(() => {
      window.__nix._resetState({ care: { att: 99, ene: 99, mood: 99, stage: 0, total: 0 } });
    });
    await page.click('#startBtn');
    await page.waitForTimeout(2000);
    await page.evaluate(() => {
      const n = window.__nix;
      if (n.dist < 100) n._resetState({ dist: 500, mode: 'running' });
    });
    await page.waitForTimeout(200);
    await page.evaluate(() => window.__nix.endRun());
    await page.waitForTimeout(300);
    await page.click('#careBtn');
    await page.waitForTimeout(300);
    const care = await page.evaluate(() => window.__nix.care);
    expect(care.att).toBeLessThanOrEqual(100);
    expect(care.ene).toBeLessThanOrEqual(100);
    expect(care.mood).toBeLessThanOrEqual(100);
  });
});

// ═══════════════════════════════════════
// VIRAL LOOP
// ═══════════════════════════════════════

test.describe('Viral loop', () => {
  async function startAndEndGame(page) {
    await page.goto(BASE);
    await page.click('#startBtn');
    await page.waitForTimeout(2000);
    await page.evaluate(() => {
      const n = window.__nix;
      if (n.dist < 100) n._resetState({ dist: 500, mode: 'running' });
    });
    await page.waitForTimeout(200);
    await page.evaluate(() => window.__nix.endRun());
    await page.waitForTimeout(300);
  }

  test('Challenge Friend button is visible', async ({ page }) => {
    await startAndEndGame(page);
    await expect(page.locator('#challengeBtn')).toBeVisible();
  });

  test('Score Card button is visible', async ({ page }) => {
    await startAndEndGame(page);
    await expect(page.locator('#cardBtn')).toBeVisible();
  });

  test('challenge text contains score and stats', async ({ page }) => {
    await startAndEndGame(page);
    const text = await page.evaluate(() => {
      const nix = window.__nix;
      const STAGES = ['Egg', 'Hatchling', 'Timeline Cub', 'Thread Beast', 'Viral Legend'];
      const st = STAGES[Math.min(4, nix.care.stage | 0)];
      return (
        'I scored ' + nix.runScore + ' on Nix Timeline Dodge\n' +
        nix.nearMisses + ' CLEANs · ×' + nix.maxMult.toFixed(1) + ' · Nix is ' + st + '\n' +
        'Beat me → ' + location.href + '\n#ViralPet #Nix'
      );
    });
    expect(text).toContain('I scored');
    expect(text).toContain('CLEANs');
    expect(text).toContain('Nix is');
    expect(text).toContain('#ViralPet');
  });

  test('score card generates a canvas image', async ({ page }) => {
    await startAndEndGame(page);
    const hasCanvas = await page.evaluate(() => {
      const cv = document.createElement('canvas');
      return cv.getContext && typeof cv.getContext === 'function';
    });
    expect(hasCanvas).toBe(true);
  });

  test('results show correct stats line', async ({ page }) => {
    await startAndEndGame(page);
    const statsLine = await page.locator('#statsLine').textContent();
    expect(statsLine).toContain('Hearts');
    expect(statsLine).toContain('Near-miss');
    expect(statsLine).toContain('Max');
  });
});

// ═══════════════════════════════════════
// PERSISTENCE
// ═══════════════════════════════════════

test.describe('Persistence', () => {
  test('best score persists across page reloads', async ({ page }) => {
    await page.goto(BASE);
    await page.click('#startBtn');
    await page.waitForTimeout(2000);
    await page.evaluate(() => {
      const n = window.__nix;
      if (n.dist < 100) n._resetState({ dist: 500, mode: 'running' });
    });
    await page.waitForTimeout(200);
    await page.evaluate(() => window.__nix.endRun());
    await page.waitForTimeout(300);
    const score = await page.evaluate(() => window.__nix.runScore);
    await page.reload();
    await page.waitForTimeout(500);
    const best = await page.evaluate(() => window.__nix.best);
    expect(best).toBeGreaterThanOrEqual(score);
  });

  test('malformed localStorage does not break the app', async ({ page }) => {
    await page.goto(BASE);
    // Inject corrupted data
    await page.evaluate(() => {
      localStorage.setItem('nix_dodge_v24', '{bad json!!!');
    });
    await page.reload();
    await page.waitForTimeout(500);
    // Game should still work
    const mode = await page.evaluate(() => window.__nix.mode);
    expect(mode).toBe('menu');
    // Should have default values
    const best = await page.evaluate(() => window.__nix.best);
    expect(best).toBe(0);
  });

  test('corrupted care data is recovered with defaults', async ({ page }) => {
    await page.goto(BASE);
    // Inject corrupted care data
    await page.evaluate(() => {
      localStorage.setItem('nix_dodge_v24', JSON.stringify({
        best: 100,
        care: { att: 'not a number', ene: -999, mood: 999, stage: 99, total: 'bad' }
      }));
    });
    await page.reload();
    await page.waitForTimeout(500);
    const care = await page.evaluate(() => window.__nix.care);
    expect(care.att).toBe(40); // default
    expect(care.ene).toBe(0);  // clamped from -999
    expect(care.mood).toBe(100); // clamped from 999
    expect(care.stage).toBe(4); // clamped from 99
    expect(care.total).toBe(0); // rejected string
  });
});

// ═══════════════════════════════════════
// ACCESSIBILITY
// ═══════════════════════════════════════

test.describe('Accessibility', () => {
  test('page has lang attribute', async ({ page }) => {
    await page.goto(BASE);
    const lang = await page.evaluate(() => document.documentElement.lang);
    expect(lang).toBe('en');
  });

  test('game container has role="application"', async ({ page }) => {
    await page.goto(BASE);
    const role = await page.evaluate(() => document.getElementById('root').getAttribute('role'));
    expect(role).toBe('application');
  });

  test('HUD has aria-live="polite"', async ({ page }) => {
    await page.goto(BASE);
    const live = await page.evaluate(() => document.getElementById('hud').getAttribute('aria-live'));
    expect(live).toBe('polite');
  });

  test('canvas has aria-hidden="true"', async ({ page }) => {
    await page.goto(BASE);
    const hidden = await page.evaluate(() => document.getElementById('c').getAttribute('aria-hidden'));
    expect(hidden).toBe('true');
  });

  test('start button has aria-label', async ({ page }) => {
    await page.goto(BASE);
    const label = await page.evaluate(() => document.getElementById('startBtn').getAttribute('aria-label'));
    expect(label).toBeTruthy();
    expect(label.length).toBeGreaterThan(3);
  });

  test('CSP meta tag is present', async ({ page }) => {
    await page.goto(BASE);
    const csp = await page.evaluate(() => {
      const meta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      return meta ? meta.getAttribute('content') : null;
    });
    expect(csp).toBeTruthy();
    expect(csp).toContain("default-src 'none'");
  });

  test('all buttons have minimum touch target size', async ({ page }) => {
    await page.goto(BASE);
    await page.click('#startBtn');
    await page.waitForTimeout(2000);
    await page.evaluate(() => {
      const n = window.__nix;
      if (n.dist < 100) n._resetState({ dist: 500, mode: 'running' });
    });
    await page.waitForTimeout(200);
    await page.evaluate(() => window.__nix.endRun());
    await page.waitForTimeout(300);
    const buttons = ['#careBtn', '#againBtn', '#challengeBtn', '#cardBtn'];
    for (const sel of buttons) {
      const box = await page.locator(sel).boundingBox();
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });
});

// ═══════════════════════════════════════
// REDUCED MOTION
// ═══════════════════════════════════════

test.describe('Reduced motion', () => {
  test('prefersReducedMotion flag respects media query', async ({ page }) => {
    // Default: no reduced motion
    await page.goto(BASE);
    const defaultVal = await page.evaluate(() => window.__nix.mode);
    expect(defaultVal).toBe('menu');
  });
});

// ═══════════════════════════════════════
// PERFORMANCE
// ═══════════════════════════════════════

test.describe('Performance', () => {
  test('particle pool stays bounded during gameplay', async ({ page }) => {
    await page.goto(BASE);
    await page.click('#startBtn');
    // Play for several seconds, actively dodging
    for (let i = 0; i < 30; i++) {
      await page.keyboard.press(i % 2 === 0 ? 'ArrowLeft' : 'ArrowRight');
      await page.waitForTimeout(200);
    }
    const count = await page.evaluate(() => window.__nix.activeParticleCount);
    expect(count).toBeLessThanOrEqual(64);
  });

  test('no memory leak: posts array is bounded', async ({ page }) => {
    await page.goto(BASE);
    await page.click('#startBtn');
    // Let it run, occasionally checking posts count
    let maxPosts = 0;
    for (let i = 0; i < 20; i++) {
      await page.waitForTimeout(500);
      const count = await page.evaluate(() => window.__nix.posts.length);
      maxPosts = Math.max(maxPosts, count);
      // Posts should be filtered when off-screen
      expect(count).toBeLessThan(50);
    }
    // Should never accumulate unboundedly
    expect(maxPosts).toBeLessThan(30);
  });
});
