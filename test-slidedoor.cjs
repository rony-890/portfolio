const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Test at multiple scroll positions
  const positions = [0, 200, 400, 600, 800, 1000];
  
  for (const scrollY of positions) {
    await page.evaluate(sy => window.scrollTo(0, sy), scrollY);
    await page.waitForTimeout(500);
    
    const info = await page.evaluate(() => {
      const garden = window.__garden;
      if (!garden) return null;
      
      // Get letter positions with slide-door applied
      const letters = garden.letters.map((l, idx) => ({
        idx,
        ch: l.ch,
        x: l.x,
        baseX: l.tx,
      }));
      
      return {
        slideShift: garden._slideShift,
        opacity: garden._globalOpacity,
        progress: garden._scrollProgress,
        letters,
      };
    });
    
    if (info) {
      const leftGroup = info.letters.filter(l => l.idx <= 1);
      const rightGroup = info.letters.filter(l => l.idx >= 2);
      
      const leftSlide = leftGroup.reduce((sum, l) => sum + (l.baseX - l.x), 0) / leftGroup.length;
      const rightSlide = rightGroup.reduce((sum, l) => sum + (l.x - l.baseX), 0) / rightGroup.length;
      
      console.log(`Y=${scrollY}: shift=${info.slideShift}, opacity=${info.opacity.toFixed(3)}, progress=${info.progress.toFixed(3)}`);
      console.log(`  Left group avg slide (left): ${leftSlide.toFixed(1)}px`);
      console.log(`  Right group avg slide (right): ${rightSlide.toFixed(1)}px`);
      console.log(`  Equal? ${Math.abs(leftSlide - rightSlide) < 1 ? 'YES' : 'NO'}`);
    }
  }
  
  await browser.close();
  console.log('Errors:', errors);
}

run().catch(console.error);