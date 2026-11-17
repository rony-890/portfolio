const { chromium } = require('@playwright/test');

async function runTest(iteration) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(100);
  
  const garden = await page.evaluate(() => window.__garden);
  const letters = garden ? garden.letters.map(l => ({ch: l.ch, x: l.x, y: l.y})) : null;
  
  await page.screenshot({ path: `qa/step2_refresh_${iteration}.png`, fullPage: false });
  
  await browser.close();
  return { errors, letters };
}

async function run() {
  const results = [];
  for (let i = 1; i <= 3; i++) {
    console.log(`Hard refresh ${i}/3...`);
    const result = await runTest(i);
    results.push(result);
    console.log(`  Letters:`, result.letters?.map(l => `${l.ch}(${l.x.toFixed(1)},${l.y.toFixed(1)})`).join(' '));
  }
  
  // Compare positions across refreshes
  if (results.length === 3) {
    const first = results[0].letters;
    const second = results[1].letters;
    const third = results[2].letters;
    
    if (first && second && third) {
      console.log('\nPosition comparison across 3 hard refreshes:');
      for (let i = 0; i < 5; i++) {
        const dx12 = Math.abs(first[i].x - second[i].x);
        const dy12 = Math.abs(first[i].y - second[i].y);
        const dx13 = Math.abs(first[i].x - third[i].x);
        const dy13 = Math.abs(first[i].y - third[i].y);
        console.log(`  ${first[i].ch}: refresh1-2 dx=${dx12.toFixed(2)} dy=${dy12.toFixed(2)}, refresh1-3 dx=${dx13.toFixed(2)} dy=${dy13.toFixed(2)}`);
      }
    }
  }
}

run().catch(console.error);