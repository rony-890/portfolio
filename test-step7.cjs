const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

async function run() {
  const browser = await chromium.launch({ headless: true });
  
  // Ensure qa directory exists
  const qaDir = path.join(__dirname, 'qa');
  if (!fs.existsSync(qaDir)) fs.mkdirSync(qaDir, { recursive: true });
  
  const results = [];
  
  for (let i = 1; i <= 10; i++) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    
    const errors = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', err => errors.push(err.message));
    
    await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    // Check for cropping
    const cropCheck = await page.evaluate(() => {
      const canvas = document.getElementById('garden-canvas');
      const ctx = canvas.getContext('2d');
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const w = canvas.width, h = canvas.height;
      
      // Check edges for non-transparent pixels
      let topCrop = 0, bottomCrop = 0, leftCrop = 0, rightCrop = 0;
      const edgeThickness = 20;
      
      for (let y = 0; y < edgeThickness; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4 + 3;
          if (data.data[idx] > 0) topCrop++;
        }
      }
      for (let y = h - edgeThickness; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4 + 3;
          if (data.data[idx] > 0) bottomCrop++;
        }
      }
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < edgeThickness; x++) {
          const idx = (y * w + x) * 4 + 3;
          if (data.data[idx] > 0) leftCrop++;
        }
      }
      for (let y = 0; y < h; y++) {
        for (let x = w - edgeThickness; x < w; x++) {
          const idx = (y * w + x) * 4 + 3;
          if (data.data[idx] > 0) rightCrop++;
        }
      }
      
      return { topCrop, bottomCrop, leftCrop, rightCrop, hasCrop: topCrop > 0 || bottomCrop > 0 || leftCrop > 0 || rightCrop > 0 };
    });
    
    // Save screenshot
    const filename = `qa/seed_${String(i).padStart(2, '0')}.png`;
    await page.screenshot({ path: filename, fullPage: false });
    
    // Get garden info
    const gardenInfo = await page.evaluate(() => {
      const garden = window.__garden;
      if (!garden) return null;
      return {
        S: garden.S,
        seedFit: garden._seedFit,
        letters: garden.letters.map(l => ({ ch: l.ch, x: l.x, y: l.y })),
      };
    });
    
    results.push({
      iteration: i,
      crop: cropCheck,
      garden: gardenInfo,
      errors,
    });
    
    console.log(`Refresh ${i}: crop=${cropCheck.hasCrop ? 'YES' : 'NO'} (T:${cropCheck.topCrop} B:${cropCheck.bottomCrop} L:${cropCheck.leftCrop} R:${cropCheck.rightCrop}), seedFit=${gardenInfo.seedFit}, S=${gardenInfo.S.toFixed(1)}`);
    
    await page.close();
  }
  
  await browser.close();
  
  // Summary
  const anyCrop = results.some(r => r.crop.hasCrop);
  const allDifferent = results.length === new Set(results.map(r => JSON.stringify(r.garden.letters))).size;
  
  console.log('\n=== STEP 7 SUMMARY ===');
  console.log(`Any cropping: ${anyCrop ? 'YES (FAIL)' : 'NO (PASS)'}`);
  console.log(`All gardens different: ${allDifferent ? 'YES (PASS)' : 'NO (FAIL)'}`);
  console.log(`Seed fit rate: ${results.filter(r => r.garden.seedFit).length}/10`);
  
  return results;
}

run().catch(console.error);