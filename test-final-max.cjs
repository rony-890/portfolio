const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Scroll to true max zoom (1400+)
  await page.evaluate(() => window.scrollTo(0, 1400));
  await page.waitForTimeout(1000);
  
  const info = await page.evaluate(() => {
    const garden = window.__garden;
    const heroEl = document.querySelector('#hero .el');
    if (!garden || !heroEl) return null;
    
    const heroTransform = heroEl.style.transform;
    const scaleMatch = heroTransform.match(/scale\(([\d.]+)\)/);
    const translateMatch = heroTransform.match(/translate3d\(([^,]+),\s*([\d.]+)px/);
    
    const scale = parseFloat(scaleMatch[1]);
    const translateX = parseFloat(translateMatch[1]);
    const translateY = parseFloat(translateMatch[2]);
    
    // Check cropping
    const canvas = document.getElementById('garden-canvas');
    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const w = canvas.width, h = canvas.height;
    let leftCrop = 0, rightCrop = 0, topCrop = 0, bottomCrop = 0;
    const edgeThickness = 20;
    for (let y = 0; y < edgeThickness; y++) for (let x = 0; x < w; x++) if (data.data[(y * w + x) * 4 + 3] > 0) topCrop++;
    for (let y = h - edgeThickness; y < h; y++) for (let x = 0; x < w; x++) if (data.data[(y * w + x) * 4 + 3] > 0) bottomCrop++;
    for (let y = 0; y < h; y++) for (let x = 0; x < edgeThickness; x++) if (data.data[(y * w + x) * 4 + 3] > 0) leftCrop++;
    for (let y = 0; y < h; y++) for (let x = w - edgeThickness; x < w; x++) if (data.data[(y * w + x) * 4 + 3] > 0) rightCrop++;
    
    return {
      scale,
      translateX,
      translateY,
      S: window.__garden.S,
      opacity: window.__garden._globalOpacity,
      slideShift: window.__garden._slideShift,
      progress: window.__garden._scrollProgress,
      crop: { topCrop, bottomCrop, leftCrop, rightCrop, hasCrop: topCrop > 0 || bottomCrop > 0 || leftCrop > 0 || rightCrop > 0 },
    };
  });
  
  await page.screenshot({ path: 'qa/final_maxzoom.png', fullPage: false });
  
  await browser.close();
  
  console.log('Max Zoom Info:', JSON.stringify(info, null, 2));
  console.log('Errors:', errors);
}

run().catch(console.error);