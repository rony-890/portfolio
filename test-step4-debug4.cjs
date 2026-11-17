const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Check html class
  const htmlClass = await page.evaluate(() => document.documentElement.className);
  
  // Check cv canvas visibility
  const cvStyle = await page.evaluate(() => {
    const cv = document.getElementById('cv');
    return cv ? window.getComputedStyle(cv).display : 'no cv';
  });
  
  // Check if cv canvas has any drawing
  const cvPixels = await page.evaluate(() => {
    const cv = document.getElementById('cv');
    const ctx = cv.getContext('2d');
    const data = ctx.getImageData(0, 0, cv.width, cv.height);
    let nonTransparent = 0;
    for (let i = 3; i < data.data.length; i += 4) {
      if (data.data[i] > 0) nonTransparent++;
    }
    return { nonTransparentPixels: nonTransparent, totalPixels: cv.width * cv.height };
  });
  
  await browser.close();
  
  console.log('Errors:', errors);
  console.log('HTML class:', htmlClass);
  console.log('CV display:', cvStyle);
  console.log('CV pixels:', cvPixels);
}

run().catch(console.error);