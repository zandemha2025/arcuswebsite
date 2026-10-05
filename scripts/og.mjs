// Renders a 1200x630 share image for every built page into public/og/.
// Run after a build: `npm run build && npm run og && npm run build`.
import fs from 'node:fs';
import path from 'node:path';
const pw = await import(process.env.PLAYWRIGHT_PATH || 'playwright');
const { chromium } = pw.default || pw;
const dist = 'dist', out = 'public/og';
fs.mkdirSync(out, { recursive: true });
const pages = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) { if (f !== 'og' && f !== '_astro') walk(p); } else if (f === 'index.html') pages.push(p); } })(dist);
const font = (f) => `data:font/woff2;base64,${fs.readFileSync(`public/fonts/${f}`).toString('base64')}`;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1200, height: 630 } });
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  if (/noindex/.test(html.match(/<meta name="robots"[^>]*>/)?.[0] || '')) continue;
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] || 'Arcus').replace(/<[^>]+>/g, '').replace(/Caught/i, '').replace(/\s+/g, ' ').trim();
  const rel = path.relative(dist, path.dirname(file)).replace(/\\/g, '/');
  const name = rel ? rel.replace(/\//g, '-') : 'home';
  const len = h1.length, size = len < 28 ? 120 : len < 50 ? 96 : len < 80 ? 76 : 62;
  await pg.setContent(`<html><head><style>
    @font-face{font-family:A;src:url(${font('anton.woff2')})}@font-face{font-family:G;src:url(${font('geist.woff2')})}
    body{margin:0;width:1200px;height:630px;background:#F4F4F4;font-family:G;color:#212121;display:flex;flex-direction:column;justify-content:space-between;padding:64px 72px;box-sizing:border-box;position:relative;overflow:hidden}
    h1{font-family:A;font-weight:400;text-transform:uppercase;font-size:${size}px;line-height:.92;margin:0;max-width:880px}
    .l{font-family:A;font-size:44px;display:flex;align-items:center;gap:4px}.l i{width:12px;height:12px;border-radius:50%;background:#FF5A1F;margin-top:12px}
    .f{display:flex;justify-content:space-between;align-items:center;font-size:24px;font-weight:600}
    .s{position:absolute;right:70px;top:70px;font-family:A;color:#FF5A1F;border:5px solid #FF5A1F;border-radius:8px;padding:6px 16px 2px;font-size:40px;transform:rotate(-8deg)}
  </style></head><body><div class="l">arcus<i></i></div><h1>${esc(h1)}</h1><div class="f"><span>usearcus.ai</span><span>Get a free report →</span></div><div class="s">CHECKED</div></body></html>`);
  await pg.waitForTimeout(60);
  await pg.screenshot({ path: path.join(out, `${name}.png`) });
}
await b.close();
console.log('og images:', fs.readdirSync(out).length);
