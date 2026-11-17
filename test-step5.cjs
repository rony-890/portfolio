const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Check transform-origin
  const transformOrigin = await page.evaluate(() => {
    const heroEl = document.querySelector('#hero .el');
    return heroEl ? heroEl.style.transformOrigin : 'no hero';
  });
  
  // Check B-hole position at different scroll positions
  const scrollPositions = [0, 1500, 3000, 4500];
  const results = [];
  
  for (const scrollY of scrollPositions) {
    await page.evaluate(y => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(500);
    
    const info = await page.evaluate(() => {
      const heroEl = document.querySelector('#hero .el');
      const garden = window.__garden;
      if (!heroEl || !garden) return null;
      
      const bIdx = garden.letters.findIndex(l => l.ch.toLowerCase() === 'b');
      const bLetter = garden.letters[bIdx];
      
      return {
        scrollY: window.scrollY,
        transformOrigin: heroEl.style.transformOrigin,
        transform: heroEl.style.transform,
        bLetter: bLetter ? { x: bLetter.x, y: bLetter.y, tx: bLetter.tx, ty: bLetter.ty } : null,
        S: garden.S,
        W: garden.W,
        H: garden.H,
      };
    });
    
    results.push(info);
  }
  
  await browser.close();
  
  console.log('Errors:', errors);
  console.log('Transform-origin (initial):', transformOrigin);
  console.log('Results:', JSON.stringify(results, null, 2));
}

run().catch(console.error);