// Verifies that every local link and asset reference points at a real file
// with exactly matching case, which GitHub Pages (Linux) requires.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pages = ['index.html', '404.html'];
const errors = [];

function existsExact(rel) {
  let dir = root;
  for (const part of rel.split('/')) {
    if (!part || part === '.') continue;
    let names;
    try {
      names = fs.readdirSync(dir);
    } catch {
      return false;
    }
    if (!names.includes(part)) return false;
    dir = path.join(dir, part);
  }
  return fs.existsSync(dir);
}

const ids = new Set();
for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  for (const m of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
    const raw = m[1].trim();
    if (/^(https?:|mailto:|tel:|data:|javascript:|\/\/|#)/i.test(raw)) {
      if (raw.startsWith('#') && raw.length > 1) ids.add(raw.slice(1));
      continue;
    }
    // Root-absolute links are only allowed for the /portfolio/ subpath
    // (used by 404.html, which is served from any URL depth).
    if (raw.startsWith('/')) {
      const rel = raw.replace(/^\/portfolio\/?/, '').split('?')[0].split('#')[0];
      const target = rel === '' ? 'index.html' : rel;
      if (!existsExact(target)) errors.push(`${page}: bad absolute path -> ${raw}`);
      continue;
    }
    const clean = raw.split('?')[0].split('#')[0];
    if (!clean) continue;
    if (!existsExact(clean)) errors.push(`${page}: missing or wrong case -> ${raw}`);
  }
  for (const m of html.matchAll(/\sid="([^"]+)"/g)) ids.add(m[1]);
}

for (const id of ids) {
  const html = pages.map((p) => fs.readFileSync(path.join(root, p), 'utf8')).join('\n');
  if (!new RegExp(`id="${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(html)) {
    errors.push(`anchor target missing -> #${id}`);
  }
}

for (const extra of ['sitemap.xml', 'robots.txt', '.nojekyll']) {
  if (!existsExact(extra)) errors.push(`missing file -> ${extra}`);
}

if (errors.length) {
  console.error('Link check failed:');
  for (const e of [...new Set(errors)]) console.error(' - ' + e);
  process.exit(1);
}
console.log('Link check passed.');
