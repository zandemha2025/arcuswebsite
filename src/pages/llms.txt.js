import { SITE, ENTITY, TEAM, LISTEN } from '../data/site.js';
import { REPORTS } from '../data/reports.js';
import { INDUSTRIES } from '../data/content.js';
import { GLOSS as GLOSSARY } from '../data/all.js';
import { ALL_ARTICLES as ARTICLES, COMPARE_ALL } from '../data/all.js';

export function GET() {
  const l = (t, p, d) => `- [${t}](${SITE}${p})${d ? `: ${d}` : ''}`;
  const body = `# Arcus

> ${ENTITY}

Arcus (${SITE.replace('https://', '')}) is for in-house marketing teams at studios, streamers, spirits and beverage, games, music, fashion and beauty brands, especially teams without their own data department. Brands’ data is usually in pieces: sales in one system, players or viewers in another, email and CRM with a third team, plus retail data, ad accounts, social accounts, agency reports and listening tools. Arcus connects all of it into one layer inside the brand’s own setup (about three months, starting with one free question), and the brand owns it. After that, any leader can ask any question and get an answer that sees the whole picture, delivered as a few slides with the answer on top. It is not an agency, a dashboard, a listening tool or a survey.

## What Arcus does
${l('Check what worked', '/how-it-works#check', 'every result the brand’s marketing claims, from agencies, platforms or creators, is checked against the brand’s own numbers (sales, tickets, sign-ups, streams) and counted once; anything budget moves on gets a regions-on, regions-off test')}
${l('What people say, next to what they did', '/listening', `works with any listening tool the brand already has, and reads and counts public conversation on ${LISTEN.slice(0, 14).join(', ')} and more, lined up with the brand’s first-party data`)}
${l('What to do next', '/reports', 'which posts, creators and channels move people, and what to keep, test and stop')}
${l('Connect everything', '/how-it-works#build', 'connects every system the brand runs (sales, players or viewers, email and CRM, retail, ads, social, agency reports, listening tools) into one layer the brand owns, inside its own setup; no new software for the team')}
${l('Ask anything', '/how-it-works#report', 'any leader can ask any question; answers land in Slack, email, Sheets or the brand’s dashboard')}

## Start
${l('First question, free', '/free-report', 'bring one marketing question; Arcus answers it with the brand’s own numbers and what its audience says, with a 30-minute walkthrough; free, no card')}
${l('Pricing', '/pricing', 'first question free, then a one-time setup fee and a monthly fee')}
${l('Book a call', '/book')}

## Real answers (names removed)
${REPORTS.map((r) => l(`${r.kind}${r.example ? ' (example numbers)' : `: ${r.who}`}`, `/reports/${r.slug}`, r.short)).join('\n')}

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
