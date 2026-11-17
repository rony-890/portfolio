const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Check canvas pixel data at load
  const pixelDataLoad = await page.evaluate(() => {
    const canvas = document.getElementById('curved-guide-line');
    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let nonTransparent = 0;
    for (let i = 3; i < data.data.length; i += 4) {
      if (data.data[i] > 0) nonTransparent++;
    }
    return { nonTransparentPixels: nonTransparent, totalPixels: canvas.width * canvas.height };
  });
  
  // Scroll to 30%
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(1000);
  
  const pixelData30 = await page.evaluate(() => {
    const canvas = document.getElementById('curved-guide-line');
    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let nonTransparent = 0;
    for (let i = 3; i < data.data.length; i += 4) {
      if (data.data[i] > 0) nonTransparent++;
    }
    return { nonTransparentPixels: nonTransparent, totalPixels: canvas.width * canvas.height };
  });
  
  // Scroll to 60%
  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.waitForTimeout(1000);
  
  const pixelData60 = await page.evaluate(() => {
    const canvas = document.getElementById('curved-guide-line');
    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let nonTransparent = 0;
    for (let i = 3; i < data.data.length; i += 4) {
      if (data.data[i] > 0) nonTransparent++;
    }
    return { nonTransparentPixels: nonTransparent, totalPixels: canvas.width * canvas.height };
  });
  
  await browser.close();
  
  console.log('Errors:', errors);
  console.log('Load:', pixelDataLoad);
  console.log('30%:', pixelData30);
  console.log('60%:', pixelData60);
}

run().catch(console.error);