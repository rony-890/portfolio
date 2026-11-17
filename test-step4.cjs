const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Screenshot at load
  await page.screenshot({ path: 'qa/step4_load.png', fullPage: false });
  
  // Scroll to 30%
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'qa/step4_30.png', fullPage: false });
  
  // Scroll to 60%
  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'qa/step4_60.png', fullPage: false });
  
  // Check if curved line canvas exists
  const canvasInfo = await page.evaluate(() => {
    const canvas = document.getElementById('curved-guide-line');
    const cvCanvas = document.getElementById('cv');
    return {
      curvedLine: canvas ? { width: canvas.width, height: canvas.height, style: canvas.style.cssText } : null,
      cv: cvCanvas ? { width: cvCanvas.width, height: cvCanvas.height, style: cvCanvas.style.cssText } : null,
    };
  });
  
  await browser.close();
  
  console.log('Errors:', errors);
  console.log('Canvas info:', canvasInfo);
}

run().catch(console.error);