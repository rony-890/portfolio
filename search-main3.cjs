const fs = require('fs');
const content = fs.readFileSync('js/main.js', 'utf8');

// Find the ct and ut arrays
const ctMatch = content.match(/var ct=\[[^\]]+\]/);
console.log('ct:', ctMatch);

const utMatch = content.match(/var ut=\[[^\]]+\]/);
console.log('ut:', utMatch);

// Find the It function and extract key numeric constants
const itStart = content.indexOf('function It(e)');
const itEnd = content.indexOf('function Rt(e)');
const itFunc = content.substring(itStart, itEnd);

console.log('\n--- It function key numbers ---');
// Find all numbers in the It function
const numbers = itFunc.match(/-?\d+\.?\d*/g);
console.log('Numbers:', numbers?.slice(0, 50));

// Find where ge is populated
const geMatch = content.match(/ge\s*=\s*\[/);
console.log('\nge array:', geMatch);

const gePush = content.match(/\.push\(.*ge/);
console.log('ge push:', gePush);

// Find the M function
const mFunc = content.match(/function M\([^)]*\)\{[^}]+\}/);
console.log('\nM function:', mFunc);