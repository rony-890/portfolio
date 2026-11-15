const { chromium } = require('playwright');

const BASE = 'http://localhost:5001';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push('PAGEERROR: ' + err.message));

  await page.goto(BASE);
  await page.waitForTimeout(5000);

  console.log('CONSOLE ERRORS: ' + errors.length);
  errors.forEach(e => console.log('  - ' + e));

  await browser.close();
})();
