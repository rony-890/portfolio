const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  
  // Screenshot at 0.1s
  await page.waitForTimeout(100);
  await page.screenshot({ path: 'qa/step2_01s.png', fullPage: false });
  
  // Screenshot at 1s
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'qa/step2_1s.png', fullPage: false });
  
  // Screenshot at 5s
  await page.waitForTimeout(4000);
  await page.screenshot({ path: 'qa/step2_5s.png', fullPage: false });
  
  // Get rects for comparison
  const rects = await page.evaluate(() => {
    const el = document.querySelector('.el');
    const canvas = document.getElementById('garden-canvas');
    const viewport = { width: window.innerWidth, height: window.innerHeight };
    
    if (!el || !canvas) return { error: 'elements not found' };
    
    const elRect = el.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    
    return {
      el: { left: elRect.left, top: elRect.top, width: elRect.width, height: elRect.height, centerX: elRect.left + elRect.width/2, centerY: elRect.top + elRect.height/2 },
      canvas: { left: canvasRect.left, top: canvasRect.top, width: canvasRect.width, height: canvasRect.height, centerX: canvasRect.left + canvasRect.width/2, centerY: canvasRect.top + canvasRect.height/2 },
      viewport: { centerX: viewport.width/2, centerY: viewport.height/2 }
    };
  });
  
  await browser.close();
  
  console.log('Errors:', errors);
  console.log('Rects:', JSON.stringify(rects, null, 2));
}

run().catch(console.error);