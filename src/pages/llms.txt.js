import { SITE, ENTITY, TEAM, LISTEN, BOOK_URL } from '../data/site.js';
import { REPORTS } from '../data/reports.js';
import { INDUSTRIES } from '../data/content.js';
import { GLOSS as GLOSSARY } from '../data/all.js';
import { ALL_ARTICLES as ARTICLES, COMPARE_ALL } from '../data/all.js';

export function GET() {
  // A path is made absolute on this site; a full URL (BOOK_URL, once it is an external scheduling link) stays as it is.
  const l = (t, p, d) => `- [${t}](${/^https?:/.test(p) ? p : SITE + p})${d ? `: ${d}` : ''}`;
  const body = `# Arcus

> ${ENTITY}

Arcus (${SITE.replace('https://', '')}) is for in-house marketing teams at studios, streamers, spirits and beverage, games, music, fashion and beauty brands, especially teams without their own data department. Brands’ data is usually in pieces: sales in one system, players or viewers in another, email and CRM with a third team, plus retail data, ad accounts, social accounts, agency reports and listening tools. So nobody can tell which marketing dollars are working. Arcus connects all of it into one place inside the brand’s own setup (about three months, starting with a free try), and the brand owns it. It also adds what people say about the brand online. After that, any leader can ask any question and get an answer that sees the whole picture: which spend is paying off, what isn’t, and where the next dollar should go. Each answer is a few slides with the answer on top, ending on what to keep, test and stop. It is not an agency, a listening tool or a survey.

## What Arcus does
${l('Connect every piece', '/how-it-works#build', 'connects every system the brand runs (sales, tickets and sign-ups, players or viewers, email and CRM, retail and partner data, ad accounts, social accounts, agency reports, listening tools) into one place the brand owns, inside its own setup: its own data lake')}
${l('Built around the brand', '/how-it-works#context', 'what Arcus learns about the brand (products, seasons, audiences, goals and the numbers it reports on) is written down so every answer starts from it: the brand’s context layer')}
${l('See what worked', '/how-it-works#check', 'every result the brand’s ad accounts, partners and creators report is counted once against the brand’s own numbers (sales, tickets, sign-ups, streams), and every number is traced to its source; anything budget moves on gets a test where ads run in some regions and pause in others, then sales are compared (a regions-on, regions-off test)')}
${l('What people say, next to what they did', '/listening', `works with any listening tool the brand already has, and reads and counts public conversation on ${LISTEN.slice(0, 14).join(', ')} and more, lined up with the brand’s own numbers`)}
${l('What to do next', '/reports', 'which spend paid off, which posts, creators and channels move people, and what to keep, test and stop')}
${l('Ask anything', '/how-it-works#report', 'any leader can ask any question; answers land in Slack, email or Sheets')}

## Start
${l('Try it out for free', '/free-report', 'pick a question; Arcus answers it with the brand’s own numbers and what people say online, then walks the team through it in 30 minutes; free, no card')}
${l('Then we build it for you', '/how-it-works', 'Arcus connects the brand’s data into one place it owns and builds it around the brand, so any team can ask anything')}
${l('Pricing', '/pricing', 'try it free, then a one-time setup fee and a monthly fee')}
${l('Book a call', BOOK_URL)}

## Real answers (names removed)
${REPORTS.filter((r) => !r.example).map((r) => l(`${r.kind}: ${r.who}`, `/reports/${r.slug}`, r.short)).join('\n')}

## Who it’s for
${INDUSTRIES.map((i) => l(i.name, `/for/${i.slug}`, i.h1)).join('\n')}

## Comparisons
${COMPARE_ALL.map((c) => l(`Arcus vs. ${c.name}`, `/compare/${c.slug}`, c.better)).join('\n')}

## Guides
${ARTICLES.map((a) => l(a.title, `/library/${a.slug}`, a.short)).join('\n')}

## Glossary
${GLOSSARY.map((g) => l(g.name, `/glossary/${g.slug}`, g.def)).join('\n')}

## Company
${l('About', '/about')}
${l('Security', '/security')}
${l('FAQ', '/faq')}
${TEAM.map((t) => l(`${t.name}, ${t.title}`, `/about/${t.slug}`)).join('\n')}

## Optional
${l('Full text for AI assistants', '/llms-full.txt')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
