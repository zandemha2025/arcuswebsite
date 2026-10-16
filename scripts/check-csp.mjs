// CSP check: every inline <script> that runs (not JSON data) in the built pages must be allowed by its sha256 hash in
// vercel.json's Content-Security-Policy, or the browser blocks it. Today that is one script: the head line in
// layouts/Site.astro that sets html.js (and html.still for ?still).
// Usage: npm run build && node scripts/check-csp.mjs
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const csp = (JSON.parse(fs.readFileSync('vercel.json', 'utf8')).headers || []).flatMap((h) => h.headers || []).find((h) => h.key === 'Content-Security-Policy')?.value || '';
const scriptSrc = (csp.match(/script-src([^;]*)/) || [, ''])[1];
const allowed = new Set([...scriptSrc.matchAll(/'sha256-([^']+)'/g)].map((m) => m[1]));
const seen = new Map();
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) {
      const html = fs.readFileSync(p, 'utf8');
      for (const m of html.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
        const attrs = m[1] || '', body = m[2];
        if (/\ssrc=/.test(attrs) || /type="application\/(ld\+)?json"/.test(attrs) || !body.trim()) continue;
        if (/type="module"/.test(attrs)) continue; // Astro bundles module scripts to files; an inline one would show here
        const h = crypto.createHash('sha256').update(body, 'utf8').digest('base64');
        if (!seen.has(h)) seen.set(h, p);
      }
    }
  }
})('dist');
let bad = 0;
for (const [h, p] of seen) if (!allowed.has(h)) { bad++; console.log(`✗ inline script in ${p} is not in the CSP: add 'sha256-${h}' to script-src in vercel.json`); }
console.log(bad ? `${bad} inline script(s) the CSP would block` : `CSP: ${seen.size} inline script(s), all allowed by hash`);
process.exit(bad ? 1 : 0);
