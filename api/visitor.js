// POST /api/visitor: webhook from your visitor-identification tool (Snitcher, RB2B or similar).
// When a target account is on the site, post to Slack with what they read.
// Env: VISITOR_WEBHOOK_SECRET (sent as ?key= or x-webhook-secret), SLACK_ABM_WEBHOOK_URL (or SLACK_WEBHOOK_URL)
import { PROSPECTS as TARGET_DOMAINS } from '../src/data/targets.js';
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const seen = new Map(); // de-dupe per instance: one alert per account per 6 hours
// Pages that signal buying intent, matched as whole path segments so /free-report-terms or a slug that contains
// "book" (facebook) doesn't count. /book stays: "Book a call" still goes to the /book form (BOOK_URL in src/data/site.js).
const HOT = /^\/(free-report|pricing|book|make-the-case)(\/|$)/;
const pathOf = (p) => String(p).replace(/^https?:\/\/[^/]+/, '').split(/[?#]/)[0] || '/';

function pick(payload) {
  // Normalize the common shapes: { company: { domain, name }, pages: [...] } or { domain, company_name, page_views: [{ url }] }
  const c = payload.company || payload.organization || {};
  const domain = String(c.domain || c.website || payload.domain || payload.company_domain || '').replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].toLowerCase();
  const name = c.name || payload.company_name || domain;
  const pages = (payload.pages || payload.page_views || payload.session?.pages || []).map((p) => (typeof p === 'string' ? p : p.url || p.path)).filter(Boolean);
  return { domain, name, pages, person: payload.person ? `${payload.person.title || ''} ${payload.person.name || ''}`.trim() : '' };
}

export async function POST(request) {
  const key = new URL(request.url).searchParams.get('key') || request.headers.get('x-webhook-secret');
  if (!process.env.VISITOR_WEBHOOK_SECRET || key !== process.env.VISITOR_WEBHOOK_SECRET) return json(401, { ok: false });
  let payload;
  try { payload = await request.json(); } catch { return json(400, { ok: false }); }
  const v = pick(payload);
  const target = TARGET_DOMAINS[v.domain] || TARGET_DOMAINS[v.domain.split('.').slice(-2).join('.')];
  if (!target) return json(200, { ok: true, matched: false });
  const last = seen.get(v.domain) || 0;
  if (Date.now() - last < 6 * 3600_000) return json(200, { ok: true, matched: true, deduped: true });
  seen.set(v.domain, Date.now());
  const hook = process.env.SLACK_ABM_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL;
  if (hook) {
    const hot = v.pages.some((p) => HOT.test(pathOf(p)));
    const text = `${hot ? ':fire: ' : ''}Target account on the site: *${target.company}* (${target.segment.replace(/-/g, ' ')}, priority ${target.priority})${v.person ? `\nVisitor: ${v.person}` : ''}\nRead: ${v.pages.slice(0, 8).map(pathOf).join(', ') || 'not reported'}\nSuggested page to send: https://usearcus.ai/for/${target.segment}`;
    await fetch(hook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) }).catch(() => {});
  }
  return json(200, { ok: true, matched: true });
}
export function GET() { return json(405, { ok: false }); }
