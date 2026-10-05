// Builds standalone/ : self-contained HTML files that open by double-click (file://).
// CSS and JS are inlined; React is bundled as a classic script (file:// blocks modules).
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const pages = [
  { src: 'index.html', out: 'index.html', script: 'src/scripts/report.js' },
  { src: 'receipts/index.html', out: 'receipts.html', comp: 'Receipts' },
  { src: 'trust/index.html', out: 'trust.html', comp: 'Trust' },
];
const OUT = 'standalone';
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT);

const links = (html) => html
  .replace(/href="\/receipts\/?"/g, 'href="receipts.html"')
  .replace(/href="\/trust\/?"/g, 'href="trust.html"')
  .replace(/href="#r-h"/g, 'href="#r-h"')
  .replace(/href="\/#/g, 'href="index.html#')
  .replace(/href="\/"/g, 'href="index.html"')
  .replace(/href="\/favicon.svg"/g, 'href="favicon.svg"');

for (const p of pages) {
  let html = fs.readFileSync(path.join('dist', p.src), 'utf8');
  // inline stylesheets from /_astro
  html = html.replace(/<link rel="stylesheet" href="(\/_astro\/[^"]+\.css)"\s*\/?>/g,
    (_, href) => `<style>${fs.readFileSync(path.join('dist', href), 'utf8')}</style>`);
  // drop Astro's island loader scripts; mount React ourselves
  html = html.replace(/<script>(?:(?!<\/script>)[\s\S])*?astro[\s\S]*?<\/script>/g, '');
  html = html.replace(/<script type="module"[\s\S]*?<\/script>/g, '');
  // plain-script pages: bundle their module as a classic script
  if (p.script) {
    const res = await build({ entryPoints: [p.script], bundle: true, format: 'iife', minify: true, write: false });
    const js = res.outputFiles[0].text.replace(/<\/script/g, '<\\/script');
    html = html.replace('</body>', `<script>${js}</script></body>`);
    html = html.replace(/(href|src|srcset)="\/(fonts|img)\//g, '$1="$2/').replace(/, \/img\//g, ', img/').replace(/url\(['"]?\/fonts\//g, "url('fonts/").replace(/\.woff2['"]?\)/g, ".woff2')");
    // file:// blocks font fetches, so embed the two fonts and drop their preloads
    html = html.replace(/<link rel="preload"[^>]*as="font"[^>]*>/g, '')
      .replace(/url\('fonts\/([^']+\.woff2)'\)/g, (_, f) => `url(data:font/woff2;base64,${fs.readFileSync(path.join('public/fonts', f)).toString('base64')})`);
    fs.writeFileSync(path.join(OUT, p.out), links(html));
    continue;
  }
  const res = await build({
    stdin: {
      contents: `import React from 'react'; import { createRoot } from 'react-dom/client';
        import C from './src/components/${p.comp}.jsx';
        const el = document.querySelector('astro-island') || document.body;
        createRoot(el).render(React.createElement(C));`,
      resolveDir: '.', loader: 'jsx',
    },
    bundle: true, format: 'iife', minify: true, write: false,
    jsx: 'automatic', define: { 'process.env.NODE_ENV': '"production"' },
  });
  const js = res.outputFiles[0].text.replace(/<\/script/g, '<\\/script');
  html = html.replace('</body>', `<script>${js}</script></body>`);
  fs.writeFileSync(path.join(OUT, p.out), links(html));
}
fs.copyFileSync('public/favicon.svg', path.join(OUT, 'favicon.svg'));
for (const dir of ['fonts', 'img']) fs.cpSync(path.join('public', dir), path.join(OUT, dir), { recursive: true });
console.log('standalone/ written:', fs.readdirSync(OUT).join(', '));
