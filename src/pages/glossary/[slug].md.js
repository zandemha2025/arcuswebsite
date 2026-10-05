import { GLOSS, GLOSS_DEEP } from '../../data/all.js';
import { mdResponse, footer } from '../../lib/md.js';
export function getStaticPaths() { return GLOSS.map((g) => ({ params: { slug: g.slug }, props: { g } })); }
export function GET({ props: { g } }) {
  const d = GLOSS_DEEP[g.slug] || {};
  return mdResponse(`# What is ${g.name.toLowerCase()}?\n\nCanonical: https://usearcus.ai/glossary/${g.slug}\n\n**${g.def}**\n\n${(d.more || []).join('\n\n')}\n\n## Why it matters\n\n${g.why}\n\n${d.example ? `## Example\n\n${d.example}\n\n` : ''}${d.mistake ? `## Where it misleads\n\n${d.mistake}\n\n` : ''}${d.arcus ? `## How Arcus handles it\n\n${d.arcus}\n\n` : ''}## Ask your agency\n\n"${g.ask}"${footer}`);
}
