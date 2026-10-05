import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { STUDIES } from './src/data/research.js';

const noindex = ['/free-report/thanks', '/book/thanks', '/404'];
const hidden = ['/print/', ...STUDIES.filter((s) => !s.published).map((s) => `/research/${s.slug}`), ...(STUDIES.some((s) => s.published) ? [] : ['/research/'])];

export default defineConfig({
  site: 'https://usearcus.ai',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !noindex.some((p) => page.replace(/\/$/, '').endsWith(p)) && !hidden.some((h) => page.includes(h)), changefreq: 'weekly', lastmod: new Date('2026-10-02') })],
  redirects: {
    '/who-its-for': '/for',
    '/free-ad-report': '/free-report',
    '/receipts': '/free-report',
    '/trust': '/security',
  },
  build: { inlineStylesheets: 'auto' },
});
