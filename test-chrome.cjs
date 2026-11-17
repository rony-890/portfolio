const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ 
    headless: false,  // Show Chrome window
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  
  const page = await context.newPage();
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') console.log('CONSOLE:', msg.text()); });
  page.on('pageerror', err => console.log('ERROR:', err.message));
  
  console.log('Opening http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Hero section
  await page.screenshot({ path: 'qa/chrome_01_hero.png', fullPage: false });
  console.log('✅ Hero captured');
  
  // Scroll to hero max zoom
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'qa/chrome_02_hero_maxzoom.png', fullPage: false });
  console.log('✅ Hero max zoom captured');
  
  // About section
  await page.evaluate(() => window.scrollTo(0, 2500));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'qa/chrome_03_about.png', fullPage: false });
  console.log('✅ About section captured');
  
  // About mid - pose cycling
  await page.evaluate(() => window.scrollTo(0, 2600));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'qa/chrome_04_about_mid.png', fullPage: false });
  console.log('✅ About mid captured');
  
  // Beyond design
  await page.evaluate(() => window.scrollTo(0, 4000));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'qa/chrome_05_beyond.png', fullPage: false });
  console.log('✅ Beyond design captured');
  
  // Keep browser open for 10 seconds so user can see
  console.log('\n✅ Chrome window open - keeping open for 15 seconds...');
  await page.waitForTimeout(15000);
  
  await browser.close();
  console.log('Done!');
}

run().catch(console.error);