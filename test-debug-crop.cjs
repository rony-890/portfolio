const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Check at multiple scroll positions
  const positions = [0, 200, 800, 1400, 2000];
  
  for (const scrollY of positions) {
    await page.evaluate(sy => window.scrollTo(0, sy), scrollY);
    await page.waitForTimeout(500);
    
    const info = await page.evaluate(() => {
      const garden = window.__garden;
      const heroEl = document.querySelector('#hero .el');
      if (!garden || !heroEl) return null;
      
      const transform = heroEl.style.transform;
      const scaleMatch = transform.match(/scale\(([\d.]+)\)/);
      
      // Check canvas for cropping
      const canvas = document.getElementById('garden-canvas');
      const ctx = canvas.getContext('2d');
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const w = canvas.width, h = canvas.height;
      let leftCrop = 0, rightCrop = 0;
      const edgeThickness = 20;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < edgeThickness; x++) {
          if (data.data[(y * w + x) * 4 + 3] > 0) leftCrop++;
        }
        for (let x = w - edgeThickness; x < w; x++) {
          if (data.data[(y * w + x) * 4 + 3] > 0) rightCrop++;
        }
      }
      
      return {
        scale: scaleMatch ? parseFloat(scaleMatch[1]) : null,
        S: garden.S,
        slideShift: garden._slideShift,
        opacity: garden._globalOpacity,
        progress: garden._scrollProgress,
        seedFit: garden._seedFit,
        leftCrop,
        rightCrop,
      };
    });
    
    console.log(`Y=${scrollY}: scale=${info.scale}, S=${info.S.toFixed(1)}, opacity=${info.opacity?.toFixed(3)}, slideShift=${info.slideShift?.toFixed(1)}, crop L=${info.leftCrop} R=${info.rightCrop}, seedFit=${info.seedFit}`);
  }
  
  await browser.close();
  console.log('Errors:', errors);
}

run().catch(console.error);