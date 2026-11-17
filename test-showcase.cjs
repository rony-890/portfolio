const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5500/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  console.log('=== CAPTURING SCREENSHOTS ===');
  
  // 1. Hero load
  await page.screenshot({ path: 'qa/showcase_01_hero_load.png', fullPage: false });
  console.log('1. Hero load captured');
  
  // 2. Hero scroll 200 (slide-door starting)
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'qa/showcase_02_hero_200.png', fullPage: false });
  console.log('2. Hero scroll 200 captured');
  
  // 3. Hero scroll 400 (slide-door wider)
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'qa/showcase_03_hero_400.png', fullPage: false });
  console.log('3. Hero scroll 400 captured');
  
  // 4. Hero max zoom (600)
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'qa/showcase_04_hero_maxzoom.png', fullPage: false });
  console.log('4. Hero max zoom captured');
  
  // 5. About section start (2300)
  await page.evaluate(() => window.scrollTo(0, 2300));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'qa/showcase_05_about_start.png', fullPage: false });
  console.log('5. About section start captured');
  
  // 6. About section mid (2500)
  await page.evaluate(() => window.scrollTo(0, 2500));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'qa/showcase_06_about_mid.png', fullPage: false });
  console.log('6. About section mid captured');
  
  // 7. About section end (2900)
  await page.evaluate(() => window.scrollTo(0, 2900));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'qa/showcase_07_about_end.png', fullPage: false });
  console.log('7. About section end captured');
  
  // 8. Beyond design section
  await page.evaluate(() => window.scrollTo(0, 4000));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'qa/showcase_08_beyond_design.png', fullPage: false });
  console.log('8. Beyond design captured');
  
  await browser.close();
  console.log('\n✅ All screenshots captured!');
  console.log('Errors:', errors);
}

run().catch(console.error);