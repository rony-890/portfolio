const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:3000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Scroll to about section
  await page.evaluate(() => window.scrollTo(0, 2500));
  await page.waitForTimeout(1000);
  
  // Get pose figure dimensions and styles
  const poseInfo = await page.evaluate(() => {
    const figure = document.querySelector('.ab-fig.pose');
    const poses = figure.querySelectorAll('img');
    
    const figureStyle = window.getComputedStyle(figure);
    const figureRect = figure.getBoundingClientRect();
    
    const poseRects = Array.from(poses).map((img, i) => {
      const style = window.getComputedStyle(img);
      const rect = img.getBoundingClientRect();
      return {
        index: i,
        class: img.className,
        src: img.src.split('/').pop(),
        rect: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
        style: {
          position: style.position,
          inset: style.inset,
          width: style.width,
          height: style.height,
          objectFit: style.objectFit,
          display: style.display,
          transform: style.transform
        }
      };
    });
    
    return {
      figure: {
        width: figureRect.width,
        height: figureRect.height,
        left: figureRect.left,
        top: figureRect.top,
        aspectRatio: figureStyle.aspectRatio,
        overflow: figureStyle.overflow,
        position: figureStyle.position
      },
      poses: poseRects
    };
  });
  
  await browser.close();
  
  console.log('=== FIGURE ===');
  console.log(JSON.stringify(poseInfo.figure, null, 2));
  
  console.log('\n=== POSES ===');
  poseInfo.poses.forEach(p => {
    console.log(`Pose ${p.index} (${p.src}):`);
    console.log(`  class: ${p.class}`);
    console.log(`  rect: ${p.rect.left.toFixed(0)}, ${p.rect.top.toFixed(0)} ${p.rect.width.toFixed(0)}x${p.rect.height.toFixed(0)}`);
    console.log(`  display: ${p.style.display}`);
    console.log(`  object-fit: ${p.style.objectFit}`);
    console.log(`  inset: ${p.style.inset}`);
  });
  
  console.log('\nErrors:', errors);
}

run().catch(console.error);