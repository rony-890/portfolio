const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Check meta tags
  const meta = await page.evaluate(() => {
    return {
      title: document.title,
      ogTitle: document.querySelector('meta[property="og:title"]')?.content,
      ogSiteName: document.querySelector('meta[property="og:site_name"]')?.content,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      headerWordmark: document.querySelector('.mark')?.textContent?.trim(),
      heroEyebrow: document.querySelector('.h-cap .mono')?.textContent?.trim(),
      heroLede: document.querySelector('.h-cap .lede')?.textContent?.trim(),
    };
  });
  
  // Check garden at load
  const gardenLoad = await page.evaluate(() => window.__garden);
  
  // Scroll to max zoom
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(1000);
  
  const gardenMax = await page.evaluate(() => window.__garden);
  const heroInfo = await page.evaluate(() => {
    const heroEl = document.querySelector('#hero .el');
    return {
      transform: heroEl.style.transform,
      transformOrigin: heroEl.style.transformOrigin,
    };
  });
  
  // Check curved line canvas
  const curvedLine = await page.evaluate(() => {
    const canvas = document.getElementById('curved-guide-line');
    return canvas ? { width: canvas.width, height: canvas.height } : null;
  });
  
  // Check for cropping
  const cropCheck = await page.evaluate(() => {
    const canvas = document.getElementById('garden-canvas');
    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const w = canvas.width, h = canvas.height;
    let topCrop = 0, bottomCrop = 0, leftCrop = 0, rightCrop = 0;
    const edgeThickness = 20;
    for (let y = 0; y < edgeThickness; y++) for (let x = 0; x < w; x++) if (data.data[(y * w + x) * 4 + 3] > 0) topCrop++;
    for (let y = h - edgeThickness; y < h; y++) for (let x = 0; x < w; x++) if (data.data[(y * w + x) * 4 + 3] > 0) bottomCrop++;
    for (let y = 0; y < h; y++) for (let x = 0; x < edgeThickness; x++) if (data.data[(y * w + x) * 4 + 3] > 0) leftCrop++;
    for (let y = 0; y < h; y++) for (let x = w - edgeThickness; x < w; x++) if (data.data[(y * w + x) * 4 + 3] > 0) rightCrop++;
    return { topCrop, bottomCrop, leftCrop, rightCrop, hasCrop: topCrop > 0 || bottomCrop > 0 || leftCrop > 0 || rightCrop > 0 };
  });
  
  await page.screenshot({ path: 'qa/final_verification.png', fullPage: false });
  
  await browser.close();
  
  console.log('=== FINAL VERIFICATION ===');
  console.log('Meta:', meta);
  console.log('Garden Load:', gardenLoad ? { S: gardenLoad.S, letters: gardenLoad.letters.length } : 'null');
  console.log('Garden Max Zoom:', gardenMax ? { S: gardenMax.S, opacity: gardenMax._globalOpacity, slideShift: gardenMax._slideShift, progress: gardenMax._scrollProgress } : 'null');
  console.log('Hero Transform:', heroInfo.transform);
  console.log('Hero Transform-Origin:', heroInfo.transformOrigin);
  console.log('Curved Line Canvas:', curvedLine);
  console.log('Crop Check:', cropCheck);
  console.log('Errors:', errors);
  
  // PASS/FAIL criteria
  const checks = {
    'Title updated': meta.title.includes('Subhu') && !meta.title.includes('John'),
    'OG tags updated': meta.ogTitle.includes('Subhu') && !meta.ogTitle.includes('John'),
    'Header wordmark': meta.headerWordmark === 'Subhu',
    'Hero eyebrow': meta.heroEyebrow.includes('React'),
    'Hero lede': meta.heroLede.includes('Junior frontend'),
    'Canonical empty': meta.canonical === '' || meta.canonical === 'http://localhost:5000/',
    'Garden loads': gardenLoad && gardenLoad.letters === 5,
    'No cropping': !cropCheck.hasCrop,
    'B-hole transform-origin': heroInfo.transformOrigin === '50% 50%',
    'Curved line canvas exists': curvedLine !== null,
    'Slide-door at max zoom': gardenMax && gardenMax._slideShift > 50,
    'Opacity at max zoom': gardenMax && gardenMax._globalOpacity <= 0.4,
    'B-hole centered': heroInfo.transformOrigin === '50% 50%',
    'No JS errors': errors.filter(e => !e.includes('404')).length === 0,
  };
  
  console.log('\n=== CHECKLIST ===');
  for (const [name, pass] of Object.entries(checks)) {
    console.log(`${pass ? '✅ PASS' : '❌ FAIL'}: ${name}`);
  }
  
  const allPass = Object.values(checks).every(v => v);
  console.log(`\nOverall: ${allPass ? '✅ ALL PASS' : '❌ SOME FAIL'}`);
}

run().catch(console.error);