const { chromium } = require('playwright');
const path = require('path');

const BASE = 'http://localhost:5001';
const QA = 'D:/PROTFOLIO WEBSITE/subhu-jb-portfolio/qa';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  await page.goto(BASE);
  await page.waitForTimeout(0);
  await page.screenshot({ path: path.join(QA, 't0.png') });
  console.log('t0.png saved');

  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(QA, 't0.8.png') });
  console.log('t0.8.png saved');

  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(QA, 't1.6.png') });
  console.log('t1.6.png saved');

  await page.waitForTimeout(1400);
  await page.screenshot({ path: path.join(QA, 't3.png') });
  console.log('t3.png saved');

  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(QA, 't5.png') });
  console.log('t5.png saved');

  await page.reload();
  await page.waitForTimeout(5000);
  await page.screenshot({ path: path.join(QA, 'hard-refresh.png') });
  console.log('hard-refresh.png saved');

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(QA, 'scroll-0.png') });
  console.log('scroll-0.png saved');

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.3));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(QA, 'scroll-30.png') });
  console.log('scroll-30.png saved');

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.6));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(QA, 'scroll-60.png') });
  console.log('scroll-60.png saved');

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.9));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(QA, 'scroll-90.png') });
  console.log('scroll-90.png saved');

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.mouse.move(640, 400);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(QA, 'mouse-near-rose.png') });
  console.log('mouse-near-rose.png saved');

  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(QA, 'mobile-375.png') });
  console.log('mobile-375.png saved');

  const rmContext = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
  const rmPage = await rmContext.newPage();
  await rmPage.goto(BASE);
  await rmPage.waitForTimeout(2000);
  await rmPage.screenshot({ path: path.join(QA, 'reduced-motion.png') });
  console.log('reduced-motion.png saved');
  await rmContext.close();

  await browser.close();
  console.log('All screenshots done!');
})();
