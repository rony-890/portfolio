const fs = require('fs');
const content = fs.readFileSync('js/main.js', 'utf8');

// Find the It function and surrounding context
const idx = content.indexOf('function It(e)');
if (idx >= 0) {
  console.log('Found It function at index:', idx);
  // Print 2000 chars before and after
  const start = Math.max(0, idx - 500);
  const end = Math.min(content.length, idx + 3000);
  console.log('--- CONTEXT ---');
  console.log(content.substring(start, end));
  console.log('--- END ---');
}

// Also find where cv canvas is obtained
const cvIdx = content.indexOf('cv');
if (cvIdx >= 0) {
  console.log('\nFirst cv at:', cvIdx);
  console.log(content.substring(Math.max(0, cvIdx - 100), cvIdx + 100));
}

// Find all occurrences of 'cv' as a variable
const cvVars = content.match(/[a-zA-Z_$][a-zA-Z0-9_$]*\s*=\s*[a-zA-Z_$][a-zA-Z0-9_$]*\.getElementById\(['"]cv['"]\)/g);
console.log('\ncv getElementById:', cvVars);

// Search for the variable that stores the cv canvas context
const ctxMatches = content.match(/[a-zA-Z_$][a-zA-Z0-9_$]*\s*=\s*[a-zA-Z_$][a-zA-Z0-9_$]*\.getContext\(['"]2d['"]\)/g);
console.log('\ngetContext 2d:', ctxMatches);