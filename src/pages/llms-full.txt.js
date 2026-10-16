import { SITE, ENTITY } from '../data/site.js';
import { REPORTS } from '../data/reports.js';
import { FAQ_ALL as FAQ, GLOSS as GLOSSARY } from '../data/all.js';
import { ALL_ARTICLES as ARTICLES } from '../data/all.js';
const strip = (h) => h.replace(/<h2[^>]*>(.*?)<\/h2>/g, '\n## $1\n').replace(/<li>/g, '- ').replace(/<[^>]+>/g, '').replace(/\n{3,}/g, '\n\n').trim();
export function GET() {
  const body = `# Arcus, full text\n\n${ENTITY}\n\nThe truth layer for marketing: Arcus helps a brand find out what worked, what flopped, and what deserves another dollar. It connects the brand’s sales, ads, CRM and what people say online into one place the brand owns. House rule: if it can’t be checked, it doesn’t count.\n\n# Reports\n\n${REPORTS.map((r) => `## ${r.kind}: ${r.title}\nURL: ${SITE}/reports/${r.slug}\n${r.example ? 'Example numbers.\n' : `For ${r.who.toLowerCase()}, names removed.\n`}${r.scope}\n\n${r.slides.map((s) => `- ${s.label}: ${s.big || ''} ${s.body || (s.list || []).map(([k, v]) => `${k}: ${v}`).join(' ')}`).join('\n')}`).join('\n\n')}\n\n# FAQ\n\n${FAQ.filter(([, , a]) => !a.includes('[')).map(([, q, a]) => `Q: ${q}\nA: ${a}`).join('\n\n')}\n\n# Guides\n\n${ARTICLES.map((a) => `## ${a.title}\nURL: ${SITE}/library/${a.slug}\nShort answer: ${a.short}\n\n${strip(a.body)}`).join('\n\n')}\n\n# Glossary\n\n${GLOSSARY.map((g) => `${g.name}: ${g.def} ${g.why}`).join('\n')}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
