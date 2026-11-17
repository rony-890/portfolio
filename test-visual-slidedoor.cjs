const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Take screenshots at different scroll positions
  const positions = [0, 200, 400, 600, 800];
  
  for (const y of positions) {
    await page.evaluate(sy => window.scrollTo(0, sy), y);
    await page.waitForTimeout(800);
    await page.screenshot({ path: `qa/slidedoor_${y}.png`, fullPage: false });
    
    const info = await page.evaluate(() => {
      const garden = window.__garden;
      return {
        shift: garden._slideShift,
        opacity: garden._globalOpacity,
        progress: garden._scrollProgress,
      };
    });
    
    console.log(`Y=${y}: shift=${info.shift.toFixed(1)}, opacity=${info.opacity.toFixed(3)}, progress=${info.progress.toFixed(3)}`);
  }
  
  await browser.close();
  console.log('Errors:', errors);
}

run().catch(console.error);