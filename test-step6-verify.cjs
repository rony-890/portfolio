const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Test at key positions: 0, 200, 800 (max), 1400
  const positions = [
    { y: 0, name: '0' },
    { y: 200, name: '200' },
    { y: 800, name: '800_max' },
    { y: 1400, name: '1400' },
  ];
  
  for (const pos of positions) {
    await page.evaluate(y => window.scrollTo(0, y), pos.y);
    await page.waitForTimeout(800);
    await page.screenshot({ path: `qa/step6_verify_${pos.name}.png`, fullPage: false });
    
    // Get render info by checking canvas pixels at B-hole area
    const canvasInfo = await page.evaluate(() => {
      const garden = window.__garden;
      const heroEl = document.querySelector('#hero .el');
      if (!garden || !heroEl) return null;
      
      const transform = heroEl.style.transform;
      const scaleMatch = transform.match(/scale\(([\d.]+)\)/);
      const translateMatch = transform.match(/translate3d\(([^,]+),\s*([\d.]+)px/);
      
      // B letter index 2
      const bLetter = garden.letters[2];
      
      return {
        scrollY: window.scrollY,
        scale: scaleMatch ? parseFloat(scaleMatch[1]) : null,
        translateX: translateMatch ? parseFloat(translateMatch[1]) : null,
        translateY: translateMatch ? parseFloat(translateMatch[2]) : null,
        bLetter: bLetter ? { x: bLetter.x, y: bLetter.y } : null,
        slideShift: garden._slideShift,
        globalOpacity: garden._globalOpacity,
        scrollProgress: garden._scrollProgress,
      };
    });
    
    console.log(`${pos.name}: scale=${canvasInfo.scale}, opacity=${canvasInfo.globalOpacity.toFixed(3)}, slideShift=${canvasInfo.slideShift?.toFixed(1)}`);
    console.log(`  B at (${canvasInfo.bLetter.x.toFixed(1)}, ${canvasInfo.bLetter.y.toFixed(1)})`);
  }
  
  await browser.close();
  console.log('Errors:', errors);
}

run().catch(console.error);