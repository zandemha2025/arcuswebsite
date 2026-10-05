import { REPORTS } from '../../data/reports.js';
import { DEEP } from '../../data/reports-deep.js';
import { mdResponse, footer } from '../../lib/md.js';
export function getStaticPaths() { return REPORTS.map((r) => ({ params: { slug: r.slug }, props: { r } })); }
export function GET({ props: { r } }) {
  const d = DEEP[r.slug] || {};
  const L = (arr, f) => (arr || []).map(f).join('\n');
  return mdResponse(`# ${r.kind}: ${r.title}\n\n${r.example ? 'Shown with example numbers.' : `A real Arcus report for ${r.who.toLowerCase()}, names removed.`} Canonical: https://usearcus.ai/reports/${r.slug}\n\n**The question:** ${r.question}\n\n**Headline:** ${r.headline.n}, ${r.headline.label}.\n\n${r.scope}\n\n## ${r.example ? 'Why check at all' : 'Why they asked'}\n\n${(d.context || []).join('\n\n')}\n\n## How we answered it\n\n${L(d.method, ([t, x], i) => `${i + 1}. **${t}.** ${x}`)}\n\n## Findings\n\n${L(d.findings, (f) => `- **${f.n ? f.n + ': ' : ''}${f.h}.** ${f.body}`)}\n\n## What we told them to do\n\n${L(d.rules, ([k, v]) => `- **${k}:** ${v}`)}\n\n## Lessons for any brand\n\n${L(d.lessons, ([k, v]) => `- **${k}.** ${v}`)}\n\n## Limits\n\n${L(d.limits, (x) => `- ${x}`)}\n\n## Questions\n\n${L(d.faq, ([q, a]) => `**${q}**\n${a}\n`)}${footer}`);
}
