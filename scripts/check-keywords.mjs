// Keyword map check: every indexable page has one target query, and no two pages share a primary query.
import fs from 'node:fs';
import path from 'node:path';
import { KEYWORDS, UNMAPPED_OK } from '../src/data/keywords.js';
const norm = (q) => q.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
const seen = new Map(); let bad = 0;
for (const [url, k] of Object.entries(KEYWORDS)) {
  const q = norm(k.primary || '');
  if (!q) { console.log(`✗ ${url}: no primary query`); bad++; continue; }
  if (seen.has(q)) { console.log(`✗ "${k.primary}" is the primary for both ${seen.get(q)} and ${url}`); bad++; }
  seen.set(q, url);
}
const built = [];
if (fs.existsSync('dist')) (function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f === 'index.html') { const h = fs.readFileSync(p, 'utf8'); if (!/noindex|http-equiv="refresh"/.test(h)) built.push('/' + path.relative('dist', path.dirname(p)).replace(/\\/g, '/')); } } })('dist');
const missing = built.map((u) => (u === '/' ? '/' : u.replace(/\/$/, ''))).filter((u) => !KEYWORDS[u] && !KEYWORDS[u + '/'] && !UNMAPPED_OK.some((x) => u.startsWith(x)));
if (missing.length) console.log(`! ${missing.length} pages have no target query yet (warning): ${missing.slice(0, 12).join(', ')}${missing.length > 12 ? '…' : ''}`);
console.log(`${Object.keys(KEYWORDS).length} pages mapped. ${bad ? `${bad} conflicts` : 'No conflicts'}`);
process.exit(bad ? 1 : 0);
