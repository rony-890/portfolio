const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Test at different scroll positions
  const positions = [0, 200, 800, 1400, 2000];
  
  for (const scrollY of positions) {
    await page.evaluate(y => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(800);
    
    const info = await page.evaluate(() => {
      const heroEl = document.querySelector('#hero .el');
      const garden = window.__garden;
      if (!heroEl || !garden) return null;
      
      const transform = heroEl.style.transform;
      const scaleMatch = transform.match(/scale\(([\d.]+)\)/);
      const translateMatch = transform.match(/translate3d\(([^,]+),\s*([\d.]+)px/);
      
      // Get letter positions with slide-door applied
      const letters = garden.letters.map(l => ({
        ch: l.ch,
        x: l.x,
        y: l.y,
        idx: garden.letters.indexOf(l)
      }));
      
      return {
        scrollY: window.scrollY,
        scale: scaleMatch ? parseFloat(scaleMatch[1]) : null,
        translateX: translateMatch ? parseFloat(translateMatch[1]) : null,
        translateY: translateMatch ? parseFloat(translateMatch[2]) : null,
        transformOrigin: heroEl.style.transformOrigin,
        letters,
        slideShift: garden._slideShift,
        globalOpacity: garden._globalOpacity,
        scrollProgress: garden._scrollProgress,
      };
    });
    
    console.log(`Scroll ${scrollY}: scale=${info.scale}, slideShift=${info.slideShift}, opacity=${info.globalOpacity.toFixed(3)}, progress=${info.scrollProgress.toFixed(3)}`);
    console.log(`  Letters:`, info.letters.map(l => `${l.ch}(${l.x.toFixed(1)})`).join(', '));
    
    // Screenshot
    await page.screenshot({ path: `qa/step6_${scrollY}.png`, fullPage: false });
  }
  
  await browser.close();
  console.log('Errors:', errors);
}

run().catch(console.error);