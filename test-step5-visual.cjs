const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Screenshot at load (0%)
  await page.screenshot({ path: 'qa/step5_0.png', fullPage: false });
  
  // Scroll to 30% (~1500px)
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'qa/step5_30.png', fullPage: false });
  
  // Scroll to 60% (~3000px)
  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'qa/step5_60.png', fullPage: false });
  
  // Scroll to 90% (~4500px)
  await page.evaluate(() => window.scrollTo(0, 4500));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'qa/step5_90.png', fullPage: false });
  
  // Also check B-hole screen position at max zoom
  const maxZoomInfo = await page.evaluate(() => {
    const heroEl = document.querySelector('#hero .el');
    const garden = window.__garden;
    if (!heroEl || !garden) return null;
    
    const bIdx = garden.letters.findIndex(l => l.ch.toLowerCase() === 'b');
    const bLetter = garden.letters[bIdx];
    
    // Get garden canvas position
    const gardenCanvas = document.getElementById('garden-canvas');
    const canvasRect = gardenCanvas.getBoundingClientRect();
    
    // B-hole in garden coordinates (canvas space)
    const holeScale = garden.S * 0.5;
    // We need the hole offset from B center
    // From computeAndSetBHoleFocalPoint: holeCanvasX = bLetter.tx + hole.x * holeScale
    // But we don't have hole.x here. Let's compute from transform-origin.
    const transformOrigin = heroEl.style.transformOrigin;
    const [ox, oy] = transformOrigin.split(' ').map(s => parseFloat(s) / 100);
    
    // B-hole in canvas coordinates
    const holeX = ox * garden.W;
    const holeY = oy * garden.H;
    
    // Viewport center
    const vpCenterX = window.innerWidth / 2;
    const vpCenterY = window.innerHeight / 2;
    
    return {
      transformOrigin,
      holeCanvas: { x: holeX, y: holeY },
      viewportCenter: { x: vpCenterX, y: vpCenterY },
      canvasRect: { left: canvasRect.left, top: canvasRect.top, width: canvasRect.width, height: canvasRect.height },
      heroTransform: heroEl.style.transform,
    };
  });
  
  await browser.close();
  
  console.log('Errors:', errors);
  console.log('Max zoom info:', JSON.stringify(maxZoomInfo, null, 2));
}

run().catch(console.error);