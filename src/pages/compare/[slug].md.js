import { COMPARE_ALL as COMPARE, COMPARE_DEEP_ALL as COMPARE_DEEP } from '../../data/all.js';
import { mdResponse, footer } from '../../lib/md.js';
export function getStaticPaths() { return COMPARE.map((c) => ({ params: { slug: c.slug }, props: { c } })); }
export function GET({ props: { c } }) {
  const d = COMPARE_DEEP[c.slug] || {};
  return mdResponse(`# ${c.h1}\n\n${d.summary || c.lead}\n\nCanonical: https://usearcus.ai/compare/${c.slug}\n\n| | ${c.name} | Arcus |\n|---|---|---|\n${c.rows.map(([k, a, b]) => `| ${k} | ${a} | ${b} |`).join('\n')}\n\n${(d.sections || []).map(([h, b]) => `## ${h}\n\n${b}`).join('\n\n')}\n\n## When ${c.name} is the better pick\n\n${c.better}\n\n${(d.decide || []).map((x) => `- ${x}`).join('\n')}${footer}`);
}
