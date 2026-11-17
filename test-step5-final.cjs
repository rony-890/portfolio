const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Screenshots at key scroll positions
  const positions = [
    { y: 0, name: '0' },
    { y: 200, name: '200' },
    { y: 800, name: '800_maxzoom' },
    { y: 1400, name: '1400' },
    { y: 2000, name: '2000' },
  ];
  
  for (const pos of positions) {
    await page.evaluate(y => window.scrollTo(0, y), pos.y);
    await page.waitForTimeout(800);
    await page.screenshot({ path: `qa/step5_${pos.name}.png`, fullPage: false });
    
    const info = await page.evaluate(() => {
      const heroEl = document.querySelector('#hero .el');
      const transform = heroEl.style.transform;
      const scaleMatch = transform.match(/scale\(([\d.]+)\)/);
      const translate3dMatch = transform.match(/translate3d\([^,]+,\s*([\d.]+)px/);
      return {
        scrollY: window.scrollY,
        scale: scaleMatch ? parseFloat(scaleMatch[1]) : null,
        translateY: translate3dMatch ? parseFloat(translate3dMatch[1]) : null,
        transformOrigin: heroEl.style.transformOrigin,
      };
    });
    
    console.log(`Scroll ${pos.y}: scale=${info.scale}, translateY=${info.translateY}, origin=${info.transformOrigin}`);
  }
  
  await browser.close();
  console.log('Errors:', errors);
}

run().catch(console.error);