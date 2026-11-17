const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Find max scale by scrolling to bottom
  await page.evaluate(() => window.scrollTo(0, 50000));
  await page.waitForTimeout(2000);
  
  const info = await page.evaluate(() => {
    const heroEl = document.querySelector('#hero .el');
    const garden = window.__garden;
    if (!heroEl || !garden) return null;
    
    const transform = heroEl.style.transform;
    const scaleMatch = transform.match(/scale\(([\d.]+)\)/);
    
    return {
      scrollY: window.scrollY,
      scale: scaleMatch ? parseFloat(scaleMatch[1]) : null,
      slideShift: garden._slideShift,
      globalOpacity: garden._globalOpacity,
      scrollProgress: garden._scrollProgress,
    };
  });
  
  console.log('Max scroll info:', info);
  
  // Also check at various positions
  const positions = [0, 200, 800, 1400, 2000, 3000, 5000, 10000];
  for (const y of positions) {
    await page.evaluate(sy => window.scrollTo(0, sy), y);
    await page.waitForTimeout(300);
    
    const data = await page.evaluate(() => {
      const heroEl = document.querySelector('#hero .el');
      const garden = window.__garden;
      if (!heroEl || !garden) return null;
      const transform = heroEl.style.transform;
      const scaleMatch = transform.match(/scale\(([\d.]+)\)/);
      return {
        y: window.scrollY,
        scale: scaleMatch ? parseFloat(scaleMatch[1]) : null,
        opacity: garden._globalOpacity,
        progress: garden._scrollProgress,
      };
    });
    console.log(`Y=${y}: scale=${data.scale}, opacity=${data.opacity?.toFixed(3)}, progress=${data.progress?.toFixed(3)}`);
  }
  
  await browser.close();
  console.log('Errors:', errors);
}

run().catch(console.error);