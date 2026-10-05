// Trigger signals: reads trade-press RSS feeds and posts matches (agency reviews, CMO moves, launches) to Slack,
// flagging target accounts. Run daily (GitHub Actions cron in .github/workflows/signals.yml).
// Env: SLACK_SIGNALS_WEBHOOK_URL (or SLACK_WEBHOOK_URL). Feeds live in FEEDS below; edit freely.
import { PROSPECTS as TARGET_DOMAINS } from '../src/data/targets.js';
const FEEDS = (process.env.SIGNAL_FEEDS || [
  // Confirmed in gtm/signals.md. Add more there once each URL is checked.
  'https://www.adweek.com/feed/',
  'https://deadline.com/feed/',
  'https://variety.com/feed/',
  'https://news.google.com/rss/search?q=%22agency+review%22+OR+%22selects+agency%22+OR+%22agency+of+record%22&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=%22chief+marketing+officer%22+(appoints+OR+names+OR+hires)&hl=en-US&gl=US&ceid=US:en',
].join(',')).split(',').map((s) => s.trim()).filter(Boolean);
const RULES = [
  ['Agency review', /agency review|selects? (?:a |its )?(?:new )?agency|account moves?|names .* agency of record|\bAOR\b|launches? (?:a )?review|pitch(?:es)? for/i],
  ['Marketing leader move', /\b(CMO|chief marketing officer|chief brand officer|head of marketing|VP,? marketing)\b.*\b(names?|appoints?|hires?|joins?|taps?|promotes?)\b|\b(names?|appoints?|hires?|taps?)\b.*\b(CMO|chief marketing officer|chief brand officer)\b/i],
  ['Launch or rebrand', /\b(launch(?:es)?|rebrand|campaign debut|unveils?)\b/i],
];
const companies = Object.values(TARGET_DOMAINS).map((t) => t.company).filter(Boolean);
const since = Date.now() - (+process.env.SIGNAL_HOURS || 26) * 3600_000;
const hits = [];
for (const url of FEEDS) {
  try {
    const xml = await (await fetch(url, { headers: { 'User-Agent': 'ArcusSignals/1.0' } })).text();
    for (const item of xml.split(/<item[\s>]/).slice(1)) {
      const get = (tag) => (item.match(new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`)) || [])[1]?.trim() || '';
      const title = get('title'), link = get('link'), date = Date.parse(get('pubDate')) || Date.now();
      if (date < since) continue;
      const text = `${title} ${get('description')}`;
      const rule = RULES.find(([, rx]) => rx.test(text));
      if (!rule) continue;
      const company = companies.find((c) => new RegExp(`\\b${c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(text));
      if (rule[0] === 'Launch or rebrand' && !company) continue;
      hits.push({ kind: rule[0], title, link, company });
    }
  } catch (e) { console.error('feed failed', url, e.message); }
}
hits.sort((a, b) => (b.company ? 1 : 0) - (a.company ? 1 : 0));
console.log(`${hits.length} signals`);
const hook = process.env.SLACK_SIGNALS_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL;
if (hook && hits.length) {
  const text = `*Signals in the last day*\n${hits.slice(0, 25).map((h) => `• ${h.company ? `:dart: *${h.company}* · ` : ''}${h.kind}: <${h.link}|${h.title}>`).join('\n')}`;
  await fetch(hook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) });
} else hits.forEach((h) => console.log(`${h.kind}${h.company ? ` [${h.company}]` : ''}: ${h.title}`));
