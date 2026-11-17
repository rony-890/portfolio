const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5500/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Hero gap=0, about gap=3.2 (viewport heights)
  // Hero holds for 0.45 of viewport, then about starts
  // Each gap unit = 1 viewport height = 720px
  // Hero height = 700px (clamped), but gap is in viewport units
  
  // Based on data-gap: hero=0, about=3.2
  // So about starts at ~3.2 * 720 = 2304px
  // about hold=0.85, so it stays for 0.85 * 720 = 612px
  
  const startY = 2000;
  const endY = 3500;
  const steps = 30;
  
  for (let i = 0; i <= steps; i++) {
    const y = startY + (endY - startY) * (i / steps);
    await page.evaluate(sy => window.scrollTo(0, sy), y);
    await page.waitForTimeout(400);
    
    const state = await page.evaluate(() => {
      const poses = document.querySelectorAll('.ab-fig.pose img');
      return Array.from(poses).map((img, i) => ({
        index: i,
        visible: img.classList.contains('on')
      }));
    });
    
    const visible = state.find(s => s.visible)?.index;
    console.log(`Scroll ${Math.round(y)}: pose ${visible} visible`);
    
    if (i % 3 === 0) {
      await page.screenshot({ path: `qa/pose_cycle2_${i}.png`, fullPage: false });
    }
  }
  
  await browser.close();
  console.log('Errors:', errors);
}

run().catch(console.error);