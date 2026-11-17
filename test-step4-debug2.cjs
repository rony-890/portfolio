const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Check scroll progress at different positions
  const progressLoad = await page.evaluate(() => {
    const heroEl = document.querySelector('#hero .el');
    return heroEl ? parseFloat(heroEl.style.getPropertyValue('--k')) || 0 : 'no hero';
  });
  
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(1000);
  
  const progress30 = await page.evaluate(() => {
    const heroEl = document.querySelector('#hero .el');
    return heroEl ? parseFloat(heroEl.style.getPropertyValue('--k')) || 0 : 'no hero';
  });
  
  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.waitForTimeout(1000);
  
  const progress60 = await page.evaluate(() => {
    const heroEl = document.querySelector('#hero .el');
    return heroEl ? parseFloat(heroEl.style.getPropertyValue('--k')) || 0 : 'no hero';
  });
  
  // Also check the patch script's getScrollProgress
  const patchProgress = await page.evaluate(() => {
    if (window.__curvedLineConfig) {
      const heroEl = document.querySelector('#hero .el');
      const k = parseFloat(heroEl.style.getPropertyValue('--k')) || 0;
      return k;
    }
    return 'no config';
  });
  
  await browser.close();
  
  console.log('Errors:', errors);
  console.log('Progress load:', progressLoad);
  console.log('Progress 30%:', progress30);
  console.log('Progress 60%:', progress60);
  console.log('Patch progress:', patchProgress);
}

run().catch(console.error);