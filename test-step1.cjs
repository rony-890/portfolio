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
  await page.waitForTimeout(3000);
  
  // Screenshot at load
  await page.screenshot({ path: 'qa/step1_load.png', fullPage: false });
  
  // Scroll to 30%
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'qa/step1_30.png', fullPage: false });
  
  // Scroll to 60%
  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'qa/step1_60.png', fullPage: false });
  
  // Scroll to 90%
  await page.evaluate(() => window.scrollTo(0, 4500));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'qa/step1_90.png', fullPage: false });
  
  // Check garden state
  const garden = await page.evaluate(() => window.__garden);
  
  await browser.close();
  
  console.log('Errors:', errors);
  console.log('Garden:', garden ? { S: garden.S, letters: garden.letters.map(l => ({ch: l.ch, x: l.x, y: l.y})) } : 'null');
}

run().catch(console.error);