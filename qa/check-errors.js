const { chromium } = require('playwright');

const BASE = 'http://localhost:5001';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const errors = [];
  const requests = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('request', req => requests.push(req.url()));

  await page.goto(BASE);
  await page.waitForTimeout(5000);

  console.log('=== CONSOLE ERRORS ===');
  console.log(errors.length === 0 ? 'NONE' : errors.join('\n'));
  console.log('=== NETWORK REQUESTS ===');
  const unique = [...new Set(requests)];
  unique.forEach(r => console.log(r));
  console.log('Total unique requests:', unique.length);

  await browser.close();
})();
