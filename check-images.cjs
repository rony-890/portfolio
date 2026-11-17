const fs = require('fs');
const path = require('path');

// Check original pose dimensions
const origDir = path.join(__dirname, 'img');
const myAssetsDir = path.join(__dirname, 'img', 'my assets');

console.log('=== ORIGINAL POSES ===');
for (let i = 0; i <= 5; i++) {
  const f = path.join(origDir, `pose${i}.webp`);
  if (fs.existsSync(f)) {
    const stats = fs.statSync(f);
    console.log(`pose${i}.webp: ${(stats.size/1024).toFixed(0)} KB`);
  }
}

console.log('\n=== YOUR ASSETS (pose_1-8.png) ===');
for (let i = 1; i <= 8; i++) {
  const f = path.join(myAssetsDir, `pose_${i}.png`);
  if (fs.existsSync(f)) {
    const stats = fs.statSync(f);
    console.log(`pose_${i}.png: ${(stats.size/1024).toFixed(0)} KB`);
  }
}

// Try to read PNG dimensions
const { PNG } = require('pngjs');
for (let i = 1; i <= 8; i++) {
  const f = path.join(myAssetsDir, `pose_${i}.png`);
  if (fs.existsSync(f)) {
    const data = fs.readFileSync(f);
    const png = PNG.sync.read(data);
    console.log(`pose_${i}.png: ${png.width}x${png.height}px, ${png.colorType === 6 ? 'RGBA' : png.colorType === 2 ? 'RGB' : 'Other'}`);
  }
}