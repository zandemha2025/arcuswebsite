import { ALL_ARTICLES as ARTICLES } from '../../data/all.js';
import { TEAM } from '../../data/site.js';
import { htmlToMd, mdResponse, footer } from '../../lib/md.js';
export function getStaticPaths() { return ARTICLES.map((a) => ({ params: { slug: a.slug }, props: { a } })); }
export function GET({ props: { a } }) {
  const t = TEAM.find((x) => x.slug === a.author);
  return mdResponse(`# ${a.title}\n\n${a.dek}\n\nBy ${t?.name}, ${t?.title}, Arcus. ${a.date}. Canonical: https://usearcus.ai/library/${a.slug}\n\n**Short answer:** ${a.short}\n\n${htmlToMd(a.body)}\n\n## Questions\n\n${(a.faq || []).map(([q, x]) => `**${q}**\n${x}`).join('\n\n')}${footer}`);
}
