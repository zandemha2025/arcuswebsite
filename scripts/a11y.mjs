// Accessibility check: runs axe on every built page, at desktop width and at phone width (390px, where tables scroll
// sideways and the layout changes), and fails on serious or critical issues.
// Usage: npm run build && node scripts/a11y.mjs   (serves dist on :4399, or on A11Y_PORT when set)
// If the local Playwright's browser isn't installed, point PLAYWRIGHT_PATH at a Playwright whose browser is.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
const pw = await import(process.env.PLAYWRIGHT_PATH || 'playwright');
const { chromium } = pw.default || pw;
const axe = fs.readFileSync(path.resolve('node_modules/axe-core/axe.min.js'), 'utf8');
const PORT = Number(process.env.A11Y_PORT) || 4399;
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp', '.png': 'image/png', '.avif': 'image/avif' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let f = path.join('dist', p);
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
}).listen(PORT);
const pages = [];
const only = process.env.A11Y_PAGES ? process.env.A11Y_PAGES.split(',') : null;
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f === 'index.html' && !fs.readFileSync(p, 'utf8').includes('http-equiv="refresh"')) pages.push('/' + path.relative('dist', path.dirname(p)).replace(/\\/g, '/')); } })('dist');
if (only) pages.splice(0, pages.length, ...only);
const browser = await chromium.launch();
const sizes = [['desktop', { reducedMotion: 'reduce' }], ['phone', { reducedMotion: 'reduce', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }]];
let bad = 0;
for (const [label, opts] of sizes) {
  const ctx = await browser.newContext(opts);
  await ctx.addInitScript(() => { try { localStorage.setItem('arcus_consent', 'necessary'); } catch {} });
  for (const url of pages) {
    const page = await ctx.newPage();
    await page.goto(`http://localhost:${PORT}${url === '/' ? '/' : url + '/'}`, { waitUntil: 'load' });
    await page.addScriptTag({ content: axe });
    const r = await page.evaluate(async () => await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] }));
    const serious = r.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
    if (serious.length) { bad += serious.length; serious.forEach((v) => { console.log(`✗ ${url} (${label}): ${v.id} (${v.nodes.length}) ${v.help}`); if (process.env.A11Y_DETAIL) v.nodes.slice(0, 8).forEach((n) => console.log('   ', n.target.join(' '), '|', (n.any[0]?.message || '').slice(0, 120))); }); }
    await page.close();
  }
  await ctx.close();
}
// The gate above sees every page at rest (reduced motion, consent already chosen, scroll 0). These passes see what it
// can't: the default motion states after a full scroll, the cookie banner on screen, and the header's CTA over
// whatever scrolls under it (its unlit pill once read 1.9:1 over the hero's white slide and passed every check).
const run = async (page) => (await page.evaluate(async () => await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] }))).violations.filter((v) => ['serious', 'critical'].includes(v.impact));
const report = (what, list) => list.forEach((v) => { bad++; console.log(`✗ ${what}: ${v.id} (${v.nodes.length}) ${v.help}`); if (process.env.A11Y_DETAIL) v.nodes.slice(0, 8).forEach((n) => console.log('   ', n.target.join(' '), '|', (n.any[0]?.message || '').slice(0, 120))); });
const url = (u) => `http://localhost:${PORT}${u === '/' ? '/' : u + '/'}`;
const extra = only ? [] : ['/', '/free-report'];
for (const [label, opts] of [['desktop', {}], ['phone', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }]]) {
  // 1. Motion on: scroll the whole page in steps (every reveal, the story, the post), let it settle, then check.
  const ctx = await browser.newContext({ ...opts, reducedMotion: 'no-preference' });
  await ctx.addInitScript(() => { try { localStorage.setItem('arcus_consent', 'necessary'); } catch {} });
  for (const u of extra) {
    const page = await ctx.newPage();
    await page.goto(url(u), { waitUntil: 'load' });
    await page.waitForTimeout(1600);
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 500) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(90); }
    await page.waitForTimeout(1500);
    await page.addScriptTag({ content: axe });
    report(`${u} (${label}, motion, scrolled)`, await run(page));
    await page.close();
  }
  await ctx.close();
  // 2. The cookie banner on screen (no choice made yet): it arrives after the first scroll.
  const c2 = await browser.newContext({ ...opts, reducedMotion: 'reduce' });
  for (const u of extra) {
    const page = await c2.newPage();
    await page.goto(url(u), { waitUntil: 'load' });
    await page.evaluate(() => window.scrollTo(0, 1400)); await page.waitForTimeout(400);
    const shown = await page.evaluate(() => { const b = document.querySelector('[data-consent]'); return !!b && !b.hidden && !b.classList.contains('tuck'); });
    if (!shown) { bad++; console.log(`✗ ${u} (${label}): the cookie banner did not arrive after a scroll`); }
    await page.addScriptTag({ content: axe });
    report(`${u} (${label}, cookie banner open)`, await run(page));
    await page.close();
  }
  await c2.close();
}
// 3. The header's primary over whatever scrolls under it: the label against the pill's real pixels (label hidden for
// the shot), at three widths and four scroll positions. Median contrast must clear 4.5.
if (!only) {
  const lum = ([r, g, b]) => { const f = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
  const dec = await browser.newPage();
  for (const w of [1440, 1280, 390]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w > 900 ? 900 : 844 }, reducedMotion: 'reduce', ...(w <= 900 ? { isMobile: true, hasTouch: true } : {}) });
    await ctx.addInitScript(() => { try { localStorage.setItem('arcus_consent', 'necessary'); } catch {} });
    const page = await ctx.newPage();
    await page.goto(url('/'), { waitUntil: 'load' });
    for (const y of [0, 150, 300, 450]) {
      await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(350);
      const box = await page.evaluate(() => {
        const b = [...document.querySelectorAll('.nav .jb.k')].find((e) => e.offsetParent && e.getBoundingClientRect().width);
        if (!b) return null;
        const lb = b.querySelector('.lb'), col = getComputedStyle(lb).color;
        b.dataset.probe = ''; b.style.setProperty('color', 'transparent', 'important'); b.querySelectorAll('svg').forEach((s) => (s.style.visibility = 'hidden'));
        const r = b.getBoundingClientRect();
        return { x: r.left + 14, y: r.top + 10, width: Math.max(4, r.width - 28), height: Math.max(4, r.height - 20), col };
      });
      if (!box) continue;
      const png = (await page.screenshot({ clip: { x: box.x, y: box.y, width: box.width, height: box.height } })).toString('base64');
      await page.evaluate(() => { const b = document.querySelector('[data-probe]'); if (b) { b.style.removeProperty('color'); b.querySelectorAll('svg').forEach((s) => (s.style.visibility = '')); delete b.dataset.probe; } });
      const px = await dec.evaluate(async (d) => { const im = new Image(); im.src = `data:image/png;base64,${d}`; await im.decode(); const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d'); x.drawImage(im, 0, 0); const a = x.getImageData(0, 0, c.width, c.height).data, out = []; for (let i = 0; i < a.length; i += 16) out.push([a[i], a[i + 1], a[i + 2]]); return out; }, png);
      const fg = (box.col.match(/\d+/g) || [255, 255, 255]).slice(0, 3).map(Number);
      const rs = px.map((p) => ratio(fg, p)).sort((m, n) => m - n), med = rs[Math.floor(rs.length / 2)];
      if (med < 4.5) { bad++; console.log(`✗ header CTA at ${w}px, scroll ${y}: label ${med.toFixed(2)}:1 over the pill (needs 4.5)`); }
    }
    await ctx.close();
  }
  await dec.close();
}
await browser.close(); server.close();
console.log(`${pages.length} pages checked at ${sizes.length} widths, plus motion, cookie-banner and header passes. ${bad ? `${bad} serious issues` : 'No serious accessibility issues'}`);
process.exit(bad ? 1 : 0);
