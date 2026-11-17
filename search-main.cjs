const fs = require('fs');
const content = fs.readFileSync('js/main.js', 'utf8');

// Find all occurrences of cv or canvas drawing
const patterns = [
  /[a-zA-Z_$][a-zA-Z0-9_$]*\.cv/gi,
  /getElementById\(['"]cv['"]\)/gi,
  /querySelector\(['"]#cv['"]\)/gi,
  /getContext/gi,
  /strokeStyle/gi,
  /beginPath/gi,
  /moveTo/gi,
  /lineTo/gi,
  /bezierCurveTo/gi,
  /quadraticCurveTo/gi,
];

patterns.forEach((pattern, i) => {
  const matches = content.match(pattern);
  if (matches) {
    console.log(`Pattern ${i}:`, matches.slice(0, 20));
  }
});

// Also search for the variable that holds the cv canvas
const cvVarMatch = content.match(/[a-zA-Z_$][a-zA-Z0-9_$]*\s*=\s*[a-zA-Z_$][a-zA-Z0-9_$]*\.getElementById\(['"]cv['"]\)/);
console.log('cv var assignment:', cvVarMatch);

// Search for any drawing function
const drawMatches = content.match(/function\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*\([^)]*\)\s*\{[^}]*(?:moveTo|lineTo|bezierCurveTo|strokeStyle|stroke\(\))/g);
console.log('Draw functions:', drawMatches?.slice(0, 5));