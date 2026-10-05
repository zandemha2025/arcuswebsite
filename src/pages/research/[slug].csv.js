import { STUDIES } from '../../data/research.js';
export function getStaticPaths() { return STUDIES.map((s) => ({ params: { slug: s.slug }, props: { s } })); }
const q = (v) => `"${String(v).replace(/"/g, '""')}"`;
export function GET({ props: { s } }) {
  const rows = [['measure', 'value', 'note'], ...s.measures].map((r) => r.map(q).join(',')).join('\n');
  return new Response(`${rows}\n`, { headers: { 'Content-Type': 'text/csv; charset=utf-8' } });
}
