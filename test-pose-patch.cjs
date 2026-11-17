const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5500/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Check pose patch status
  const patchInfo = await page.evaluate(() => {
    const aboutEl = document.querySelector('#about .el.far');
    const heroEl = document.querySelector('#hero .el');
    
    return {
      aboutEl: aboutEl ? {
        visibility: aboutEl.style.visibility,
        opacity: aboutEl.style.opacity,
        transform: aboutEl.style.transform
      } : null,
      heroEl: heroEl ? {
        k: heroEl.style.getPropertyValue('--k'),
        fp: heroEl.style.getPropertyValue('--fp'),
        dp: heroEl.style.getPropertyValue('--dp'),
        sp: heroEl.style.getPropertyValue('--sp')
      } : null,
      posePatch: window.posePatchActive,
      lastPoseIndex: window.lastPoseIndex
    };
  });
  
  console.log('Patch info at load:', patchInfo);
  
  // Scroll to about section area
  await page.evaluate(() => window.scrollTo(0, 2500));
  await page.waitForTimeout(1000);
  
  const patchInfo2 = await page.evaluate(() => {
    const aboutEl = document.querySelector('#about .el.far');
    const heroEl = document.querySelector('#hero .el');
    
    return {
      aboutEl: aboutEl ? {
        visibility: aboutEl.style.visibility,
        opacity: aboutEl.style.opacity,
        transform: aboutEl.style.transform
      } : null,
      heroEl: heroEl ? {
        k: heroEl.style.getPropertyValue('--k'),
        fp: heroEl.style.getPropertyValue('--fp'),
        dp: heroEl.style.getPropertyValue('--dp'),
        sp: heroEl.style.getPropertyValue('--sp')
      } : null,
    };
  });
  
  console.log('Patch info at scroll 2500:', patchInfo2);
  
  await browser.close();
  console.log('Errors:', errors);
}

run().catch(console.error);