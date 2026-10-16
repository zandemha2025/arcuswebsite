import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { STUDIES } from './src/data/research.js';
import { ISSUES } from './src/data/newsletter.js';

// Archived newsletter issues stay live at their URL but are noindex and out of the sitemap (SPINE-v2 §6 C2).
const noindex = ['/free-report/thanks', '/book/thanks', '/404', ...ISSUES.filter((i) => i.archived).map((i) => `/newsletter/${i.slug}`)];
const hidden = ['/print/', ...STUDIES.filter((s) => !s.published).map((s) => `/research/${s.slug}`), ...(STUDIES.some((s) => s.published) ? [] : ['/research/'])];

export default defineConfig({
  site: 'https://usearcus.ai',
  trailingSlash: 'ignore',
  // Sitemap URLs match each page's canonical: no trailing slash (vercel.json trailingSlash:false 308s /about/ to /about),
  // so a crawler never meets a redirect from the sitemap. The homepage keeps its single slash.
  integrations: [sitemap({
    filter: (page) => !noindex.some((p) => page.replace(/\/$/, '').endsWith(p)) && !hidden.some((h) => page.includes(h)),
    serialize: (item) => ({ ...item, url: new URL(item.url).pathname === '/' ? item.url : item.url.replace(/\/$/, '') }),
    changefreq: 'weekly', lastmod: new Date('2026-10-15'),
  })],
  // Page redirects mirror vercel.json (permanent there). The .md twins and the PDF redirect live in vercel.json only.
  redirects: {
    '/who-its-for': '/for',
    '/free-ad-report': '/free-report',
    '/receipts': '/free-report',
    '/trust': '/security',
    // Removed agency pages (SPINE-v2 §6 A1-A7)
    '/library/agency-double-counting-sales': '/glossary/double-counting',
    '/library/read-an-agency-report': '/glossary',
    '/library/questions-before-you-renew': '/library/incrementality-without-the-math',
    '/tools/agency-math': '/glossary/double-counting',
    '/compare/agency-reports': '/compare',
    '/compare/agency-audit-firms': '/compare',
    '/reports/agency-check': '/reports',
    '/print/reports/agency-check': '/reports',
    // Channel guides renamed to <platform>-what-worked (SPINE-v2 §6 B)
    '/library/check-your-meta-agency': '/library/meta-what-worked',
    '/library/check-your-tiktok-agency': '/library/tiktok-what-worked',
    '/library/check-your-google-search-agency': '/library/google-search-what-worked',
    '/library/check-your-youtube-agency': '/library/youtube-what-worked',
    '/library/check-your-snapchat-agency': '/library/snapchat-what-worked',
    '/library/check-your-reddit-agency': '/library/reddit-what-worked',
    '/library/check-your-pinterest-agency': '/library/pinterest-what-worked',
    '/library/check-your-linkedin-agency': '/library/linkedin-what-worked',
    '/library/check-your-creator-agency': '/library/creators-what-worked',
  },
  build: { inlineStylesheets: 'auto' },
});
