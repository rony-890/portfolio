const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { 
    if (msg.type() === 'error') errors.push(msg.text());
    else console.log('BROWSER LOG:', msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5500/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Check if pose patch script loaded
  const scriptLoaded = await page.evaluate(() => {
    return typeof window.__posePatch !== 'undefined';
  });
  
  console.log('Pose patch script loaded:', scriptLoaded);
  
  // Check if init was called
  const patchState = await page.evaluate(() => {
    return window.__posePatch ? {
      active: window.__posePatch.getActive(),
      elements: window.__posePatch.getElements()?.length
    } : 'not found';
  });
  
  console.log('Pose patch state:', patchState);
  
  await browser.close();
  console.log('Errors:', errors);
}

run().catch(console.error);