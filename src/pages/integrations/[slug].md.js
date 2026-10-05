import { INTEGRATIONS } from '../../data/all.js';
import { mdResponse, footer } from '../../lib/md.js';
export function getStaticPaths() { return INTEGRATIONS.map((i) => ({ params: { slug: i.slug }, props: { i } })); }
export function GET({ props: { i } }) {
  return mdResponse(`# ${i.h1}\n\n${i.lead}\n\nCanonical: https://usearcus.ai/integrations/${i.slug}\n\n## What we read\n\n${i.what}\n\n## Why it matters\n\n${i.why}\n\n## What it answers, connected\n\n${i.checks.map((c) => `- ${c}`).join('\n')}\n\n## Questions\n\n${i.faq.map(([q, a]) => `**${q}**\n${a}`).join('\n\n')}${footer}`);
}
