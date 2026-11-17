const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5500/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Check pose images loaded
  const poseInfo = await page.evaluate(() => {
    const poses = document.querySelectorAll('.ab-fig.pose img');
    return Array.from(poses).map((img, i) => ({
      index: i,
      src: img.src,
      alt: img.alt,
      class: img.className,
      loaded: img.complete && img.naturalWidth > 0
    }));
  });
  
  // Scroll to about section
  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.waitForTimeout(2000);
  
  // Check pose cycling
  const poseStates = [];
  for (let i = 0; i < 10; i++) {
    await page.waitForTimeout(500);
    const state = await page.evaluate(() => {
      const poses = document.querySelectorAll('.ab-fig.pose img');
      return Array.from(poses).map((img, i) => ({
        index: i,
        class: img.className,
        visible: img.classList.contains('on')
      }));
    });
    poseStates.push(state);
  }
  
  await page.screenshot({ path: 'qa/poses_test.png', fullPage: false });
  
  await browser.close();
  
  console.log('Pose Images:');
  poseInfo.forEach(p => console.log(`  ${p.index}: ${p.src.split('/').pop()} | alt="${p.alt}" | loaded=${p.loaded} | class="${p.class}"`));
  
  console.log('\nPose Cycling (10 samples):');
  poseStates.forEach((state, i) => {
    const visible = state.find(s => s.visible)?.index;
    console.log(`  Sample ${i+1}: pose ${visible} visible`);
  });
  
  console.log('\nErrors:', errors);
}

run().catch(console.error);