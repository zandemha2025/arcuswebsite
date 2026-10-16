// Merged reference data: base entries plus the deeper write-ups.
import { GLOSSARY, FAQ, COMPARE } from './content.js';
import { ARTICLES } from './library.js';
import { CHANNELS, ALTERNATIVES, INTEGRATIONS } from './programmatic.js';
import { GLOSSARY_NEW, GLOSSARY_DEEP, FAQ_MORE, COMPARE_DEEP } from './reference-deep.js';
export const GLOSS = [...GLOSSARY, ...GLOSSARY_NEW.filter((n) => !GLOSSARY.some((g) => g.slug === n.slug))];
export const GLOSS_DEEP = GLOSSARY_DEEP;
export const FAQ_ALL = [...FAQ, ...FAQ_MORE];
const ALT_DEEP = Object.fromEntries(ALTERNATIVES.map((a) => [a.slug, { summary: a.summary, sections: a.sections, decide: a.decide, both: a.both, faq: a.faq }]));
export const COMPARE_ALL = [...COMPARE, ...ALTERNATIVES.map(({ slug, name, h1, short, lead, rows, better, vendor }) => ({ slug, name, h1, short, lead, rows, better, vendor }))];
export const COMPARE_DEEP_ALL = { ...COMPARE_DEEP, ...ALT_DEEP };
export { COMPARE_DEEP };
export const ALL_ARTICLES = [...ARTICLES, ...CHANNELS];
export const articleBySlug = Object.fromEntries(ALL_ARTICLES.map((a) => [a.slug, a]));
export { INTEGRATIONS };
