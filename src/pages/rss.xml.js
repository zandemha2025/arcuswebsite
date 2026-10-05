import { SITE } from '../data/site.js';
import { ALL_ARTICLES as ARTICLES } from '../data/all.js';
const x = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export function GET() {
  const items = ARTICLES.map((a) => `<item><title>${x(a.title)}</title><link>${SITE}/library/${a.slug}</link><guid>${SITE}/library/${a.slug}</guid><pubDate>${new Date(a.date + 'T12:00:00Z').toUTCString()}</pubDate><description>${x(a.dek)}</description><category>${x(a.topic)}</category></item>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>The Arcus Library</title><link>${SITE}/library</link><description>How to check agency reports and use your own data.</description><language>en-us</language>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
