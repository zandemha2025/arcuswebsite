// Renders the print pages to PDFs in public/pdf/. Run after a build: npm run build && npm run pdf && npm run build
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
const pw = await import(process.env.PLAYWRIGHT_PATH || 'playwright');
const { chromium } = pw.default || pw;
const PORT = Number(process.env.PDF_PORT) || 4398;
const server = http.createServer((req, res) => {
  let f = path.join('dist', decodeURIComponent(req.url.split('?')[0]));
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  const t = { '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.html': 'text/html' }[path.extname(f)] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': t }); fs.createReadStream(f).pipe(res);
}).listen(PORT);
fs.mkdirSync('public/pdf', { recursive: true });
// Skip Astro's redirect stubs (a removed report's old print URL builds as a meta-refresh page, not a report).
const isRedirect = (s) => /http-equiv="refresh"/i.test(fs.readFileSync(path.join('dist/print/reports', s, 'index.html'), 'utf8'));
const jobs = [['/print/one-pager/', 'arcus-one-pager.pdf'], ...fs.readdirSync('dist/print/reports').filter((s) => !isRedirect(s)).map((s) => [`/print/reports/${s}/`, `arcus-${s}.pdf`])];
const b = await chromium.launch(); const p = await b.newPage();
for (const [url, out] of jobs) {
  await p.goto(`http://localhost:${PORT}${url}`, { waitUntil: 'networkidle' });
  await p.emulateMedia({ media: 'print' });
  await p.pdf({ path: `public/pdf/${out}`, format: 'Letter', printBackground: true, margin: { top: '0.5in', bottom: '0.6in', left: '0.6in', right: '0.6in' }, displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: '<div style="font-size:8px;width:100%;padding:0 0.6in;color:#555A6E;display:flex;justify-content:space-between"><span>usearcus.ai</span><span class="pageNumber"></span></div>' });
  console.log('pdf', out);
}
await b.close(); server.close();
