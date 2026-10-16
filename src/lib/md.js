// Tiny HTML -> Markdown for the .md versions of pages (AI crawlers read these cleanly).
export function htmlToMd(html = '') {
  return html
    .replace(/<h2[^>]*>(.*?)<\/h2>/g, '\n## $1\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/g, '\n### $1\n')
    .replace(/<li>(.*?)<\/li>/gs, '- $1\n')
    .replace(/<tr>(.*?)<\/tr>/gs, (_, r) => '| ' + [...r.matchAll(/<t[hd][^>]*>(.*?)<\/t[hd]>/gs)].map((m) => m[1].trim()).join(' | ') + ' |\n')
    .replace(/<blockquote>(.*?)<\/blockquote>/gs, '> $1\n')
    .replace(/<a href="([^"]+)">(.*?)<\/a>/g, (_, h, t) => `[${t}](${h.startsWith('/') ? 'https://usearcus.ai' + h : h})`)
    .replace(/<b>(.*?)<\/b>|<strong>(.*?)<\/strong>/g, '**$1$2**')
    .replace(/<p>/g, '\n').replace(/<\/p>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/\n{3,}/g, '\n\n').trim();
}
export const mdResponse = (text) => new Response(text, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
export const footer = '\n\n---\nArcus connects every piece of your data, plus what people say online, into one place you own, and answers any question with the whole picture. We don’t make ads or buy media. Try it out for free: pick a question and we answer it with your own numbers, then walk you through it in 30 minutes. No card. https://usearcus.ai/free-report\n';
