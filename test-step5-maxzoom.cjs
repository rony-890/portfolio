const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Test at key scroll positions from keyframes
  const scrollPositions = [0, 200, 800, 1400, 2000, 3000];
  
  for (const scrollY of scrollPositions) {
    await page.evaluate(y => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(500);
    
    const info = await page.evaluate(() => {
      const heroEl = document.querySelector('#hero .el');
      return {
        scrollY: window.scrollY,
        transform: heroEl.style.transform,
        transformOrigin: heroEl.style.transformOrigin,
      };
    });
    
    console.log(`Scroll ${scrollY}: scale=${info.transform.match(/scale\(([\d.]+)\)/)?.[1]}, translateY=${info.transform.match(/translate3d\([^,]+,\s*([\d.]+)\)/)?.[1]}, origin=${info.transformOrigin}`);
  }
  
  // Screenshot at max zoom (1400)
  await page.evaluate(() => window.scrollTo(0, 1400));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'qa/step5_maxzoom.png', fullPage: false });
  
  // Screenshot at 2000
  await page.evaluate(() => window.scrollTo(0, 2000));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'qa/step5_2000.png', fullPage: false });
  
  await browser.close();
  
  console.log('Errors:', errors);
}

run().catch(console.error);