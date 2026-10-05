// Accessibility check: runs axe on every built page (desktop) and fails on serious or critical issues.
// Usage: npm run build && node scripts/a11y.mjs   (serves dist on :4399)
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
const pw = await import(process.env.PLAYWRIGHT_PATH || 'playwright');
const { chromium } = pw.default || pw;
const axe = fs.readFileSync(path.resolve('node_modules/axe-core/axe.min.js'), 'utf8');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp', '.png': 'image/png', '.avif': 'image/avif' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let f = path.join('dist', p);
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
}).listen(4399);
const pages = [];
const only = process.env.A11Y_PAGES ? process.env.A11Y_PAGES.split(',') : null;
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f === 'index.html' && !fs.readFileSync(p, 'utf8').includes('http-equiv="refresh"')) pages.push('/' + path.relative('dist', path.dirname(p)).replace(/\\/g, '/')); } })('dist');
if (only) pages.splice(0, pages.length, ...only);
const browser = await chromium.launch();
const ctx = await browser.newContext({ reducedMotion: 'reduce' });
await ctx.addInitScript(() => { try { localStorage.setItem('arcus_consent', 'necessary'); } catch {} });
let bad = 0;
for (const url of pages) {
  const page = await ctx.newPage();
  await page.goto(`http://localhost:4399${url === '/' ? '/' : url + '/'}`, { waitUntil: 'load' });
  await page.addScriptTag({ content: axe });
  const r = await page.evaluate(async () => await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] }));
  const serious = r.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
  if (serious.length) { bad += serious.length; serious.forEach((v) => { console.log(`✗ ${url}: ${v.id} (${v.nodes.length}) ${v.help}`); if (process.env.A11Y_DETAIL) v.nodes.slice(0, 8).forEach((n) => console.log('   ', n.target.join(' '), '|', (n.any[0]?.message || '').slice(0, 120))); }); }
  await page.close();
}
await browser.close(); server.close();
console.log(`${pages.length} pages checked. ${bad ? `${bad} serious issues` : 'No serious accessibility issues'}`);
process.exit(bad ? 1 : 0);
