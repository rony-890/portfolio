const fs = require('fs');
const content = fs.readFileSync('js/main.js', 'utf8');

// Find Ae and Ce constants
const aeMatch = content.match(/var ae=\[[^\]]+\]/);
console.log('ae:', aeMatch);

const AeMatch = content.match(/var Ae=[^;,]+/);
console.log('Ae:', AeMatch);

const CeMatch = content.match(/var Ce=[^;,]+/);
console.log('Ce:', CeMatch);

const pMatch = content.match(/var p=[^;,]+/);
console.log('p:', pMatch);

// Find where ge is populated
const geStart = content.indexOf('ge=[');
if (geStart >= 0) {
  console.log('\nge array start at:', geStart);
  console.log(content.substring(geStart, geStart + 500));
}

// Find the M function usage in It
const itStart = content.indexOf('function It(e)');
const itEnd = content.indexOf('function Rt(e)');
const itFunc = content.substring(itStart, itEnd);

// Find M calls
const mCalls = itFunc.match(/M\([^)]+\)/g);
console.log('\nM calls in It:', mCalls);

// Find the line width and dot size calculations
const lineWidthMatch = itFunc.match(/\.lineWidth\s*=\s*[^;]+/g);
console.log('\nlineWidth:', lineWidthMatch);

const globalAlphaMatch = itFunc.match(/globalAlpha\s*=\s*[^;]+/g);
console.log('globalAlpha:', globalAlphaMatch);

const arcMatch = itFunc.match(/arc\([^)]+\)/g);
console.log('arc:', arcMatch);