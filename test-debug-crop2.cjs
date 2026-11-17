const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Scroll to max zoom
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(1000);
  
  const info = await page.evaluate(() => {
    const garden = window.__garden;
    const heroEl = document.querySelector('#hero .el');
    if (!garden || !heroEl) return null;
    
    const heroTransform = heroEl.style.transform;
    const scaleMatch = heroTransform.match(/scale\(([\d.]+)\)/);
    const translateMatch = heroTransform.match(/translate3d\(([^,]+),\s*([\d.]+)px/);
    
    const gardenCanvas = document.getElementById('garden-canvas');
    
    // Compute focal compensation shift manually
    const scale = parseFloat(scaleMatch[1]);
    const translateX = parseFloat(translateMatch[1]);
    const translateY = parseFloat(translateMatch[2]);
    
    const vpCenterX = window.innerWidth / 2;
    const vpCenterY = window.innerHeight / 2;
    const heroCenterX = translateX;
    const heroCenterY = translateY;
    const slideShift = garden._slideShift || 0;
    const bHoleShiftX = slideShift;
    const bHoleHeroElX = garden.W / 2 + slideShift;
    const bHoleHeroElY = garden.H / 2;
    const bHoleVpX = heroCenterX + (bHoleHeroElX - garden.W / 2) * scale;
    const bHoleVpY = heroCenterY + (bHoleHeroElY - garden.H / 2) * scale;
    const shiftVpX = vpCenterX - bHoleVpX;
    const shiftVpY = vpCenterY - bHoleVpY;
    const shiftCanvasX = shiftVpX / scale;
    const shiftCanvasY = shiftVpY / scale;
    const pad = Math.max(150, garden.W * 0.12);
    const clampedShiftX = Math.max(-pad, Math.min(pad, shiftVpX / scale));
    const clampedShiftY = Math.max(-pad, Math.min(pad, shiftVpY / scale));
    
    // Canvas info
    const gc = document.getElementById('garden-canvas');
    const canvasWidth = gc.width;
    const canvasHeight = gc.height;
    
    // Check cropping
    const ctx = gc.getContext('2d');
    const data = ctx.getImageData(0, 0, gc.width, gc.height);
    const w = gc.width, h = gc.height;
    let leftCrop = 0, rightCrop = 0;
    const edgeThickness = 20;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < 20; x++) {
        if (data.data[(y * w + x) * 4 + 3] > 0) leftCrop++;
      }
      for (let x = w - 20; x < w; x++) {
        if (data.data[(y * w + x) * 4 + 3] > 0) rightCrop++;
      }
    }
    
    return {
      scale: scale,
      translateX,
      translateY,
      gardenW: garden.W,
      gardenH: garden.H,
      dpr: garden.dpr,
      canvasWidth: gc.width,
      canvasHeight: gc.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      shiftVpX: (window.innerWidth / 2) - (translateX + (garden.W / 2 + garden._slideShift - garden.W / 2) * scale),
      shiftCanvasX: ((window.innerWidth / 2) - (translateX + (garden.W / 2 + garden._slideShift - garden.W / 2) * scale)) / scale,
      pad: Math.max(150, garden.W * 0.12),
      leftCrop,
      rightCrop,
      canvasWidth: gc.width,
      canvasHeight: gc.height,
      dpr: garden.dpr,
    };
  });
  
  await page.screenshot({ path: 'qa/debug_crop_max.png', fullPage: false });
  
  await browser.close();
  
  console.log('Info:', JSON.stringify(info, null, 2));
  console.log('Errors:', errors);
}

run().catch(console.error);