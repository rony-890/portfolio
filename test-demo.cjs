const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5500/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Screenshot at load (0%)
  await page.screenshot({ path: 'qa/demo_load.png', fullPage: false });
  
  // Scroll to 200
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'qa/demo_200.png', fullPage: false });
  
  // Scroll to 400
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'qa/demo_400.png', fullPage: false });
  
  // Scroll to 600 (max zoom)
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'qa/demo_600_maxzoom.png', fullPage: false });
  
  // Scroll to 800
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'qa/demo_800.png', fullPage: false });
  
  // Get final state
  const info = await page.evaluate(() => {
    const garden = window.__garden;
    const heroEl = document.querySelector('#hero .el');
    return {
      title: document.title,
      headerWordmark: document.querySelector('.mark')?.textContent?.trim(),
      heroEyebrow: document.querySelector('.h-cap .mono')?.textContent?.trim(),
      heroLede: document.querySelector('.h-cap .lede')?.textContent?.trim(),
      transform: heroEl?.style.transform,
      transformOrigin: heroEl?.style.transformOrigin,
      garden: garden ? { S: garden.S, opacity: garden._globalOpacity, slideShift: garden._slideShift, progress: garden._scrollProgress } : null,
    };
  });
  
  await browser.close();
  
  console.log('=== DEMO STATE ===');
  console.log(JSON.stringify(info, null, 2));
  console.log('Errors:', errors);
}

run().catch(console.error);