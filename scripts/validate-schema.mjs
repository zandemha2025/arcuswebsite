// Checks the JSON-LD on every built page: parses, and has the fields Google needs for each type.
// Usage: npm run build && node scripts/validate-schema.mjs   (exits 1 on any error)
import fs from 'node:fs';
import path from 'node:path';
const need = {
  Organization: ['name', 'url', 'logo'], WebSite: ['name', 'url'], BreadcrumbList: ['itemListElement'], FAQPage: ['mainEntity'],
  Article: ['headline', 'author', 'datePublished'], Person: ['name'], DefinedTerm: ['name', 'description'], DefinedTermSet: ['name', 'hasDefinedTerm'],
  HowTo: ['name', 'step'], Service: ['name', 'provider'], Offer: ['price', 'priceCurrency'], Dataset: ['name', 'description', 'creator', 'license'],
  Event: ['name', 'startDate', 'location'], VideoObject: ['name', 'description', 'thumbnailUrl', 'uploadDate'], WebApplication: ['name', 'applicationCategory'],
};
let pages = 0, errors = 0, types = {};
const check = (node, file) => {
  if (Array.isArray(node)) return node.forEach((n) => check(n, file));
  if (!node || typeof node !== 'object') return;
  const t = node['@type'];
  if (t) {
    types[t] = (types[t] || 0) + 1;
    (need[t] || []).forEach((k) => { if (node[k] === undefined || node[k] === '' || (Array.isArray(node[k]) && !node[k].length)) { errors++; console.log(`✗ ${file}: ${t} missing ${k}`); } });
    if (t === 'FAQPage') (node.mainEntity || []).forEach((q) => { if (/\[/.test(q.acceptedAnswer?.text || '')) { errors++; console.log(`✗ ${file}: FAQ answer has an unconfirmed [bracket]: ${q.name}`); } });
  }
  Object.values(node).forEach((v) => typeof v === 'object' && check(v, file));
};
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) { walk(p); continue; }
    if (!f.endsWith('.html')) continue;
    pages++;
    const html = fs.readFileSync(p, 'utf8');
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try { check(JSON.parse(m[1]), p.replace('dist/', '/')); } catch (e) { errors++; console.log(`✗ ${p}: invalid JSON-LD (${e.message})`); }
    }
  }
})('dist');
console.log(`\n${pages} pages, ${Object.entries(types).map(([k, v]) => `${k} ${v}`).join(', ')}`);
console.log(errors ? `${errors} problems` : 'Structured data OK');
process.exit(errors ? 1 : 0);
