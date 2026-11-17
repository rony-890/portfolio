const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5500/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Find the about section scroll range
  const aboutInfo = await page.evaluate(() => {
    const about = document.getElementById('about');
    if (!about) return null;
    const rect = about.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      bottom: rect.bottom + window.scrollY,
      height: rect.height
    };
  });
  
  console.log('About section:', aboutInfo);
  
  // Test scrolling through the about section slowly
  const startY = aboutInfo.top - 500;
  const endY = aboutInfo.bottom + 500;
  const steps = 20;
  
  for (let i = 0; i <= steps; i++) {
    const y = startY + (endY - startY) * (i / steps);
    await page.evaluate(sy => window.scrollTo(0, sy), y);
    await page.waitForTimeout(300);
    
    const state = await page.evaluate(() => {
      const poses = document.querySelectorAll('.ab-fig.pose img');
      return Array.from(poses).map((img, i) => ({
        index: i,
        visible: img.classList.contains('on')
      }));
    });
    
    const visible = state.find(s => s.visible)?.index;
    console.log(`Scroll ${Math.round(y)}: pose ${visible} visible`);
    
    if (i % 4 === 0) {
      await page.screenshot({ path: `qa/pose_cycle_${i}.png`, fullPage: false });
    }
  }
  
  await browser.close();
  console.log('Errors:', errors);
}

run().catch(console.error);