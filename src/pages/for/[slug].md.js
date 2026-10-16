import { INDUSTRIES } from '../../data/content.js';
import { IND_DEEP } from '../../data/industries-deep.js';
import { mdResponse, footer } from '../../lib/md.js';
export function getStaticPaths() { return INDUSTRIES.map((i) => ({ params: { slug: i.slug }, props: { i } })); }
export function GET({ props: { i } }) {
  const d = IND_DEEP[i.slug] || {};
  const L = (arr, f) => (arr || []).map(f).join('\n');
  return mdResponse(`# Arcus for ${i.name.toLowerCase()} marketing teams\n\n${i.h1}\n\n${i.lead}\n\nCanonical: https://usearcus.ai/for/${i.slug}\n\n## Why nobody sees the whole picture\n\n${(d.intro || []).join('\n\n')}\n\n## What you know, plus what people say\n\nWhat you know: ${(d.pieces || []).join(', ')}.\n\nWhat people say: ${(d.listen || []).map(([n]) => n).join(', ')}.\n\n## What teams tell us\n\n${L(d.pains, ([t, x]) => `- **${t}.** ${x}`)}\n\n## The numbers that matter\n\n${L(d.measures, ([t, x]) => `- **${t}:** ${x}`)}\n\n## Where the audience talks\n\n${L(d.listen, ([t, x]) => `- **${t}:** ${x}`)}\n\n## Questions worth asking\n\n${L(d.agencyQuestions, (q, n) => `${n + 1}. ${q}`)}\n\n## Try it free, then we build it for you\n\n${L(d.start, ([t, x], n) => `${n + 1}. **${t}.** ${x}`)}\n\n## Questions\n\n${L([...i.questions, ...(d.faq || [])], ([q, a]) => `**${q}**\n${a}\n`)}${footer}`);
}
