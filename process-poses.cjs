const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'img', 'my assets');
const outputDir = path.join(__dirname, 'img');

const targetWidth = 571;
const targetHeight = 747;

async function processPoses() {
  console.log('Processing poses...');
  
  for (let i = 1; i <= 8; i++) {
    const inputPath = path.join(inputDir, `pose_${i}.png`);
    const outputPath = path.join(outputDir, `pose${i-1}.webp`);
    
    try {
      await sharp(inputPath)
        .resize(571, 747, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      const stats = fs.statSync(outputPath);
      console.log(`✅ pose${i-1}.webp: ${(stats.size/1024).toFixed(0)} KB`);
    } catch (err) {
      console.error(`❌ pose_${i}.png:`, err.message);
    }
  }
  
  console.log('\n✅ All poses processed!');
  console.log('Files created in img/: pose0.webp through pose7.webp');
}

processPoses().catch(console.error);