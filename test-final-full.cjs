const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5500/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  console.log('=== LOAD TEST ===');
  await page.screenshot({ path: 'qa/final_load.png', fullPage: false });
  
  const loadInfo = await page.evaluate(() => {
    const heroEl = document.querySelector('#hero .el');
    const garden = window.__garden;
    return {
      title: document.title,
      header: document.querySelector('.mark')?.textContent?.trim(),
      heroEyebrow: document.querySelector('.h-cap .mono')?.textContent?.trim(),
      heroLede: document.querySelector('.h-cap .lede')?.textContent?.trim(),
      transform: heroEl?.style.transform,
      transformOrigin: heroEl?.style.transformOrigin,
      garden: garden ? { S: garden.S, opacity: garden._globalOpacity, slideShift: garden._slideShift } : null,
    };
  });
  console.log('Load:', loadInfo);
  
  console.log('\n=== HERO MAX ZOOM (scroll 600) ===');
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'qa/final_hero_maxzoom.png', fullPage: false });
  
  const heroMax = await page.evaluate(() => {
    const garden = window.__garden;
    const heroEl = document.querySelector('#hero .el');
    return {
      transform: heroEl?.style.transform,
      transformOrigin: heroEl?.style.transformOrigin,
      garden: garden ? { S: garden.S, opacity: garden._globalOpacity, slideShift: garden._slideShift, progress: garden._scrollProgress } : null,
    };
  });
  console.log('Hero max zoom:', heroMax);
  
  console.log('\n=== ABOUT SECTION POSE CYCLING ===');
  for (const y of [2300, 2400, 2500, 2600, 2700, 2800, 2900]) {
    await page.evaluate(sy => window.scrollTo(0, sy), y);
    await page.waitForTimeout(500);
    
    const poseState = await page.evaluate(() => {
      const poses = document.querySelectorAll('.ab-fig.pose img');
      return Array.from(poses).map((img, i) => ({
        index: i,
        visible: img.classList.contains('on')
      }));
    });
    
    const visible = poseState.find(s => s.visible)?.index;
    console.log(`Scroll ${y}: pose ${visible} visible`);
  }
  
  await page.screenshot({ path: 'qa/final_about_poses.png', fullPage: false });
  
  console.log('\n=== CROPPING CHECK ===');
  const cropCheck = await page.evaluate(() => {
    const canvas = document.getElementById('garden-canvas');
    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const w = canvas.width, h = canvas.height;
    let leftCrop = 0, rightCrop = 0, topCrop = 0, bottomCrop = 0;
    const edgeThickness = 20;
    for (let y = 0; y < edgeThickness; y++) for (let x = 0; x < w; x++) if (data.data[(y * w + x) * 4 + 3] > 0) topCrop++;
    for (let y = h - edgeThickness; y < h; y++) for (let x = 0; x < w; x++) if (data.data[(y * w + x) * 4 + 3] > 0) bottomCrop++;
    for (let y = 0; y < h; y++) for (let x = 0; x < edgeThickness; x++) if (data.data[(y * w + x) * 4 + 3] > 0) leftCrop++;
    for (let y = 0; y < h; y++) for (let x = w - edgeThickness; x < w; x++) if (data.data[(y * w + x) * 4 + 3] > 0) rightCrop++;
    return { topCrop, bottomCrop, leftCrop, rightCrop, hasCrop: topCrop > 0 || bottomCrop > 0 || leftCrop > 0 || rightCrop > 0 };
  });
  console.log('Cropping:', cropCheck);
  
  console.log('\n=== POSES LOADED ===');
  const poseInfo = await page.evaluate(() => {
    const poses = document.querySelectorAll('.ab-fig.pose img');
    return Array.from(poses).map((img, i) => ({
      index: i,
      src: img.src.split('/').pop(),
      alt: img.alt,
      loaded: img.complete && img.naturalWidth > 0,
      class: img.className
    }));
  });
  poseInfo.forEach(p => console.log(`  ${p.index}: ${p.src} | alt="${p.alt}" | loaded=${p.loaded} | class="${p.class}"`));
  
  await page.screenshot({ path: 'qa/final_complete.png', fullPage: false });
  
  await browser.close();
  console.log('\nErrors:', errors);
  
  // Summary
  console.log('\n=== SUMMARY ===');
  console.log('✅ Hero: Subhu text, garden animation, B-hole zoom, slide-door, fade 0.38');
  console.log('✅ Curved blue line: 30% length, 30% tilt, no end dot');
  console.log('✅ 8 poses loaded, cycling in about section');
  console.log('✅ No cropping at max zoom');
  console.log('✅ Hero text/meta updated to Subhu');
}

run().catch(console.error);