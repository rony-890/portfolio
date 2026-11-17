const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Debug getLetterPositions
  const debugInfo = await page.evaluate(() => {
    const garden = window.__garden;
    const heroEl = document.querySelector('#hero .el');
    const gardenCanvas = document.getElementById('garden-canvas');
    
    if (!garden || !garden.letters) return { error: 'no garden' };
    if (!heroEl || !gardenCanvas) return { error: 'no hero elements' };
    
    const letters = garden.letters.filter(l => l.ch !== ' ' && l.els);
    console.log('Letters:', letters.map(l => ({ ch: l.ch, x: l.x, y: l.y, tw: l.tw })));
    
    const heroRect = heroEl.getBoundingClientRect();
    const canvasRect = gardenCanvas.getBoundingClientRect();
    
    const scaleX = canvasRect.width / garden.W;
    const scaleY = canvasRect.height / garden.H;
    
    const sLetter = letters[0];
    const uLetter = letters[4];
    
    const sTop = sLetter.y - garden.S * 0.75;
    const uBaseline = uLetter.y + garden.S * 0.1;
    const uBottom = uBaseline + garden.S * 0.1 * 0.10;
    
    return {
      garden: { W: garden.W, H: garden.H, S: garden.S },
      heroRect: { left: heroRect.left, top: heroRect.top, width: heroRect.width, height: heroRect.height },
      canvasRect: { left: canvasRect.left, top: canvasRect.top, width: canvasRect.width, height: canvasRect.height },
      scaleX, scaleY,
      sLetter: { x: sLetter.x, y: sLetter.y, tx: sLetter.tx, ty: sLetter.ty },
      uLetter: { x: uLetter.x, y: uLetter.y, tx: uLetter.tx, ty: uLetter.ty },
      sTop, uBaseline, uBottom,
      sX: canvasRect.left + sLetter.x * scaleX,
      sY: canvasRect.top + sTop * scaleY,
      uX: canvasRect.left + uLetter.x * scaleX,
      uY: canvasRect.top + uBottom * scaleY,
    };
  });
  
  await browser.close();
  
  console.log('Errors:', errors);
  console.log('Debug:', JSON.stringify(debugInfo, null, 2));
}

run().catch(console.error);