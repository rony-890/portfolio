const fs = require('fs');
const path = require('path');

const mainJsPath = path.join(__dirname, 'js', 'main.js');
let content = fs.readFileSync(mainJsPath, 'utf8');

// The pose cycling logic in minified form likely looks like:
// t.pose.length-1 or similar
// We need to find where it calculates the pose index

// Search for patterns that might be the pose cycling
const patterns = [
  /t\.pose\.length-1/g,
  /t\.pose\.length/g,
  /pose\.length-1/g,
  /pose\.length/g,
  /Math\.round\([^)]*\.length-1/g,
  /Math\.round\([^)]*\.length/g,
];

console.log('Searching for pose cycling patterns...');
patterns.forEach((pattern, i) => {
  const matches = content.match(pattern);
  if (matches) {
    console.log(`Pattern ${i}: ${matches.length} matches`);
    matches.forEach(m => console.log(`  ${m}`));
  }
});

// Also look for the specific pose cycling code from the earlier search
// It was something like: t.pose=Math.round(M((-o+.04*p)/(.42*p),0,1)*(t.pose.length-1))
const poseCycleMatch = content.match(/t\.pose\s*=\s*Math\.round\([^)]*\.length\s*-\s*1\)/);
if (poseCycleMatch) {
  console.log('\nFound pose cycle:', poseCycleMatch[0]);
}

// Search for M((-o
const mMatch = content.match(/M\(\(-o/);
if (mMatch) {
  console.log('\nFound M((-o pattern at:', mMatch.index);
  // Show context
  const start = Math.max(0, mMatch.index - 100);
  const end = Math.min(content.length, mMatch.index + 200);
  console.log('Context:', content.substring(start, end));
}

// Also search for .pose.length
const poseLenMatches = content.match(/\.pose\.length/g);
if (poseLenMatches) {
  console.log(`\n.pose.length appears ${poseLenMatches.length} times`);
  poseLenMatches.forEach((m, i) => {
    const idx = content.indexOf(m, i === 0 ? 0 : content.indexOf(m, content.indexOf(m) + 1));
    const start = Math.max(0, idx - 50);
    const end = Math.min(content.length, idx + 50);
    console.log(`  Context ${i}: ...${content.substring(start, end)}...`);
  });
}

// Search for pose.length-1
const poseLenMinus1 = content.match(/pose\.length\s*-\s*1/g);
if (poseLenMatches) {
  console.log(`\npose.length-1 appears ${poseLenMatches.length} times`);
}

// Search for the specific pattern from earlier search
// t.pose=Math.round(M((-o+.04*p)/(.42*p),0,1)*(t.pose.length-1))
const fullMatch = content.match(/t\.pose\s*=\s*Math\.round\(M\(\(-o/);
if (fullMatch) {
  console.log('\nFound full pose cycle match at:', fullMatch.index);
  const start = Math.max(0, fullMatch.index - 50);
  const end = Math.min(content.length, fullMatch.index + 150);
  console.log('Context:', content.substring(start, end));
}