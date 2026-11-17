const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:3000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Scroll to about section and capture poses at different scroll positions
  const positions = [2300, 2400, 2500, 2600, 2700, 2800, 2900];
  
  for (const y of positions) {
    await page.evaluate(sy => window.scrollTo(0, sy), y);
    await page.waitForTimeout(800);
    
    // Check which pose is visible
    const state = await page.evaluate(() => {
      const poses = document.querySelectorAll('.ab-fig.pose img');
      return Array.from(poses).map((img, i) => ({
        index: i,
        visible: img.classList.contains('on'),
        src: img.src.split('/').pop()
      }));
    });
    
    const visible = state.find(s => s.visible)?.index;
    console.log(`Scroll ${y}: pose ${visible} visible`);
    
    await page.screenshot({ path: `qa/pose_final_${y}.png`, fullPage: false });
  }
  
  await browser.close();
  console.log('Errors:', errors);
}

run().catch(console.error);