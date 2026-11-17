const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  
  // Track positions over time on a SINGLE load
  const positions = [];
  for (let t = 0; t < 10; t++) {
    await page.waitForTimeout(500);
    const garden = await page.evaluate(() => window.__garden);
    if (garden) {
      positions.push(garden.letters.map(l => ({ch: l.ch, x: l.x, y: l.y})));
    }
  }
  
  await browser.close();
  
  console.log('Errors:', errors);
  console.log('\nPositions over time (single load):');
  positions.forEach((pos, i) => {
    console.log(`  t=${(i+1)*0.5}s:`, pos.map(l => `${l.ch}(${l.x.toFixed(1)},${l.y.toFixed(1)})`).join(' '));
  });
  
  // Check stability
  if (positions.length > 1) {
    const first = positions[0];
    const last = positions[positions.length - 1];
    console.log('\nDrift from t=0.5s to t=5s:');
    for (let i = 0; i < 5; i++) {
      const dx = Math.abs(first[i].x - last[i].x);
      const dy = Math.abs(first[i].y - last[i].y);
      console.log(`  ${first[i].ch}: dx=${dx.toFixed(2)} dy=${dy.toFixed(2)}`);
    }
  }
}

run().catch(console.error);