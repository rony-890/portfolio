const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Check hero transform at load
  const transformLoad = await page.evaluate(() => {
    const heroEl = document.querySelector('#hero .el');
    return heroEl ? heroEl.style.transform : 'no hero';
  });
  
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(1000);
  
  const transform30 = await page.evaluate(() => {
    const heroEl = document.querySelector('#hero .el');
    return heroEl ? heroEl.style.transform : 'no hero';
  });
  
  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.waitForTimeout(1000);
  
  const transform60 = await page.evaluate(() => {
    const heroEl = document.querySelector('#hero .el');
    return heroEl ? heroEl.style.transform : 'no hero';
  });
  
  // Check all --k, --fp, --dp, --sp values
  const varsLoad = await page.evaluate(() => {
    const heroEl = document.querySelector('#hero .el');
    if (!heroEl) return 'no hero';
    const style = heroEl.style;
    return {
      k: style.getPropertyValue('--k'),
      fp: style.getPropertyValue('--fp'),
      dp: style.getPropertyValue('--dp'),
      sp: style.getPropertyValue('--sp'),
    };
  });
  
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(1000);
  
  const vars30 = await page.evaluate(() => {
    const heroEl = document.querySelector('#hero .el');
    if (!heroEl) return 'no hero';
    const style = heroEl.style;
    return {
      k: style.getPropertyValue('--k'),
      fp: style.getPropertyValue('--fp'),
      dp: style.getPropertyValue('--dp'),
      sp: style.getPropertyValue('--sp'),
    };
  });
  
  await browser.close();
  
  console.log('Errors:', errors);
  console.log('Transform load:', transformLoad);
  console.log('Transform 30%:', transform30);
  console.log('Transform 60%:', transform60);
  console.log('Vars load:', varsLoad);
  console.log('Vars 30%:', vars30);
}

run().catch(console.error);