const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Find max zoom by scanning
  let maxScale = 0;
  let maxScaleY = 0;
  
  for (let y = 0; y <= 3000; y += 200) {
    await page.evaluate(sy => window.scrollTo(0, sy), y);
    await page.waitForTimeout(200);
    
    const info = await page.evaluate(() => {
      const heroEl = document.querySelector('#hero .el');
      const transform = heroEl.style.transform;
      const scaleMatch = transform.match(/scale\(([\d.]+)\)/);
      return scaleMatch ? parseFloat(scaleMatch[1]) : 0;
    });
    
    if (info > maxScale) {
      maxScale = info;
      maxScaleY = y;
    }
    
    console.log(`Y=${y}: scale=${info.toFixed(4)}`);
  }
  
  console.log(`\nMax scale: ${maxScale.toFixed(4)} at Y=${maxScaleY}`);
  
  // Test at max zoom position
  await page.evaluate(y => window.scrollTo(0, y), maxScaleY);
  await page.waitForTimeout(1000);
  
  const maxInfo = await page.evaluate(() => {
    const garden = window.__garden;
    const heroEl = document.querySelector('#hero .el');
    const transform = heroEl.style.transform;
    const scaleMatch = transform.match(/scale\(([\d.]+)\)/);
    const translateMatch = transform.match(/translate3d\(([^,]+),\s*([\d.]+)px/);
    
    const canvas = document.getElementById('garden-canvas');
    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const w = canvas.width, h = canvas.height;
    let leftCrop = 0, rightCrop = 0, topCrop = 0, bottomCrop = 0;
    const edgeThickness = 20;
    for (let y = 0; y < edgeThickness; y++) for (let x = 0; x < w; x++) if (data.data[(y * w + x) * 4 + 3] > 0) topCrop++;
    for (let y = canvas.height - edgeThickness; y < canvas.height; y++) for (let x = 0; x < w; x++) if (data.data[(y * w + x) * 4 + 3] > 0) bottomCrop++;
    for (let y = 0; y < h; y++) for (let x = 0; x < edgeThickness; x++) if (data.data[(y * w + x) * 4 + 3] > 0) leftCrop++;
    for (let y = 0; y < h; y++) for (let x = w - edgeThickness; x < w; x++) if (data.data[(y * w + x) * 4 + 3] > 0) rightCrop++;
    
    return {
      scale: parseFloat(scaleMatch[1]),
      translateX: parseFloat(translateMatch[1]),
      translateY: parseFloat(translateMatch[2]),
      S: window.__garden.S,
      opacity: window.__garden._globalOpacity,
      slideShift: window.__garden._slideShift,
      progress: window.__garden._scrollProgress,
      crop: { topCrop, bottomCrop, leftCrop, rightCrop, hasCrop: topCrop > 0 || bottomCrop > 0 || leftCrop > 0 || rightCrop > 0 },
    };
  });
  
  await page.screenshot({ path: 'qa/final_true_maxzoom.png', fullPage: false });
  
  await browser.close();
  
  console.log('\n=== TRUE MAX ZOOM ===');
  console.log(JSON.stringify(maxInfo, null, 2));
  console.log('Errors:', errors);
}

run().catch(console.error);