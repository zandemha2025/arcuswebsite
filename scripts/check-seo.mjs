// Checks every built page for the basics search and share need. Usage: npm run build && node scripts/check-seo.mjs
// Fails (exit 1) on: a missing or duplicate <title> or description, not exactly one H1, a canonical that isn't the
// page's own production URL (print pages name the screen page they print), a sitemap that lists a noindex page, leaves
// out an indexable one or uses a URL that redirects (trailing slash), an og:image missing from dist, a missing
// twitter:card, an <img> without alt, an internal link to a redirect or a missing page, and an indexable page that no
// other indexable page links to. Warns on a title over 60 characters or a description over 160.
import fs from 'node:fs';
import path from 'node:path';
const SITE = 'https://usearcus.ai';
const DIST = 'dist';
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f.endsWith('.html')) files.push(p); } })(DIST);
const urlOf = (p) => { const u = '/' + path.relative(DIST, p).replace(/\\/g, '/').replace(/index\.html$/, '').replace(/\.html$/, ''); return u === '/' ? u : u.replace(/\/$/, ''); };
const dec = (s = '') => s.replace(/&#39;|&#x27;/g, '’').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
const pages = {}, stubs = new Set();
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8'), u = urlOf(f);
  if (/http-equiv="refresh"/.test(html) && html.length < 2000) { stubs.add(u); continue; }
  const get = (re) => html.match(re)?.[1];
  pages[u] = {
    title: dec(get(/<title>([^<]*)<\/title>/)), desc: dec(get(/<meta name="description" content="([^"]*)"/)),
    canonical: get(/<link rel="canonical" href="([^"]*)"/), noindex: /noindex/.test(get(/<meta name="robots" content="([^"]*)"/) || ''),
    og: get(/<meta property="og:image" content="([^"]*)"/), twitter: get(/<meta name="twitter:card" content="([^"]*)"/),
    h1: (html.match(/<h1[\s>]/g) || []).length, print: u.startsWith('/print/'),
    noAlt: (html.match(/<img\b[^>]*>/g) || []).filter((t) => !/\salt(=|[\s>])/.test(t)).length,
    links: [...html.matchAll(/<a\b[^>]*\shref="(\/[^"#?]*)/g)].map((m) => m[1]).filter((h) => !h.startsWith('//')),
  };
}
const sitemap = new Set(fs.readdirSync(DIST).filter((f) => /^sitemap-\d+\.xml$/.test(f)).flatMap((f) => [...fs.readFileSync(path.join(DIST, f), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])));
let errors = 0, warnings = 0;
const err = (m) => { errors++; console.log(`✗ ${m}`); };
const warn = (m) => { warnings++; console.log(`! ${m}`); };
const seen = { title: {}, desc: {} };
const linked = {};
for (const [u, p] of Object.entries(pages)) {
  const own = SITE + u;
  if (!p.title) err(`${u}: no <title>`); else { (seen.title[p.title] ||= []).push(u); if (p.title.length > 60 && !p.noindex) warn(`${u}: title is ${p.title.length} characters`); }
  if (!p.desc) err(`${u}: no meta description`); else { (seen.desc[p.desc] ||= []).push(u); if (p.desc.length > 160 && !p.noindex) warn(`${u}: description is ${p.desc.length} characters`); }
  if (p.h1 !== 1) err(`${u}: ${p.h1} H1s`);
  if (!p.print && p.canonical !== own) err(`${u}: canonical ${p.canonical}, expected ${own}`);
  if (p.print && !(p.canonical || '').startsWith(SITE)) err(`${u}: print page without a canonical to its screen page`);
  if (p.noAlt) err(`${u}: ${p.noAlt} <img> without alt`);
  if (!p.print) {
    if (!p.twitter) err(`${u}: no twitter:card`);
    if (!p.og) err(`${u}: no og:image`); else if (!fs.existsSync(path.join(DIST, p.og.replace(SITE, '')))) err(`${u}: og:image ${p.og} is not in dist`);
  }
  const inMap = sitemap.has(own);
  if (sitemap.has(`${own}/`) && u !== '/') err(`${u}: the sitemap lists it with a trailing slash (a redirect)`);
  if (p.noindex && (inMap || sitemap.has(`${own}/`))) err(`${u}: noindex but in the sitemap`);
  if (!p.noindex && !inMap) err(`${u}: indexable but not in the sitemap`);
  for (const l of p.links) {
    const t = l === '/' ? '/' : l.replace(/\/$/, '');
    if (/\.[a-z0-9]+$/i.test(t)) { if (!fs.existsSync(path.join(DIST, t))) err(`${u}: link to missing file ${l}`); continue; }
    if (stubs.has(t)) err(`${u}: link to a redirect ${l}`);
    else if (!pages[t]) err(`${u}: link to a missing page ${l}`);
    if (!p.noindex && t !== u) (linked[t] ||= new Set()).add(u);
  }
}
for (const [k, list] of Object.entries(seen)) for (const [v, us] of Object.entries(list)) if (us.length > 1) err(`same ${k} on ${us.join(', ')}: ${v.slice(0, 70)}`);
for (const s of sitemap) { const u = new URL(s).pathname.replace(/(.)\/$/, '$1'); if (!pages[u]) err(`sitemap lists ${s}, which is not a page`); }
for (const [u, p] of Object.entries(pages)) if (!p.noindex && u !== '/' && !linked[u]) err(`${u}: no indexable page links to it`);
const robots = fs.readFileSync(path.join(DIST, 'robots.txt'), 'utf8');
if (!/^Sitemap: https:\/\/usearcus\.ai\/sitemap-index\.xml$/m.test(robots)) err('robots.txt does not point at the sitemap');
console.log(`${Object.keys(pages).length} pages, ${stubs.size} redirect stubs, ${sitemap.size} in the sitemap. ${errors ? `${errors} problems` : 'SEO OK'}${warnings ? `, ${warnings} warnings` : ''}`);
process.exit(errors ? 1 : 0);
