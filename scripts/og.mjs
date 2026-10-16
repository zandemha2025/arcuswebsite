// Renders a 1200x630 share image for every built page into public/og/.
// Run after a build: `npm run build && npm run og && npm run build`.
// OG_ONLY=library-meta-what-worked,compare renders only the images whose name starts with one of those prefixes.
import fs from 'node:fs';
import path from 'node:path';
const pw = await import(process.env.PLAYWRIGHT_PATH || 'playwright');
const { chromium } = pw.default || pw;
const dist = 'dist', out = 'public/og';
const only = (process.env.OG_ONLY || '').split(',').map((s) => s.trim()).filter(Boolean);
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
  // Line spans sit flush ("<span>Dead data.</span><span>Dead spend.</span>"), so a space goes between them before the tags come off.
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] || 'Arcus').replace(/<\/(span|div|p)>\s*<(span|div|p|br)\b/gi, '</$1> <$2').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/&#39;|&#x27;/g, '’').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  const rel = path.relative(dist, path.dirname(file)).replace(/\\/g, '/');
  const name = rel ? rel.replace(/\//g, '-') : 'home';
  if (only.length && !only.some((o) => name.startsWith(o))) continue;
  const len = h1.length, size = len < 28 ? 120 : len < 50 ? 96 : len < 80 ? 76 : 62;
  // Arcus palette v2: navy ink on warm paper, the periwinkle logo dot and the periwinkle primary (white label 5.34),
  // with the button's material: a lit top edge and a short navy-tinted drop.
  await pg.setContent(`<html><head><style>
    @font-face{font-family:A;src:url(${font('anton.woff2')})}@font-face{font-family:G;src:url(${font('geist.woff2')})}
    body{margin:0;width:1200px;height:630px;background:#F7F6F2;font-family:G;color:#1B2036;display:flex;flex-direction:column;justify-content:space-between;padding:64px 72px;box-sizing:border-box;position:relative;overflow:hidden}
    h1{font-family:A;font-weight:400;font-size:${size}px;line-height:.98;letter-spacing:-.005em;margin:0;max-width:1000px;text-wrap:balance}
    .l{font-family:A;font-size:44px;display:flex;align-items:center;gap:4px}.l i{width:12px;height:12px;border-radius:50%;background:#5B67A6;margin-top:12px}
    .f{display:flex;justify-content:space-between;align-items:center;font-size:24px;font-weight:600}
    .f b{display:inline-flex;align-items:center;gap:12px;font-weight:600;background:#5B67A6;color:#FFFFFF;border-radius:999px;padding:16px 28px;box-shadow:inset 0 1px 0 #FFFFFF2E,0 1px 2px #1B203624,0 6px 14px -6px #2B325266}
  </style></head><body><div class="l">arcus<i></i></div><h1>${esc(h1)}</h1><div class="f"><span>usearcus.ai</span><b>Try it out for free<svg width="22" height="22" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg></b></div></body></html>`);
  await pg.waitForTimeout(60);
  await pg.screenshot({ path: path.join(out, `${name}.png`) });
}
await b.close();
console.log('og images:', fs.readdirSync(out).length);
