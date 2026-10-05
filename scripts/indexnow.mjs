// After a production deploy: tell Bing (and through IndexNow, other engines) which URLs exist or changed.
// Usage: node scripts/indexnow.mjs [--changed path1 path2]  (defaults to every URL in the built sitemap)
import fs from 'node:fs';
const KEY = 'd947f7111e0c5952677e5a78c3695223';
const HOST = 'usearcus.ai';
let urls = process.argv.includes('--changed') ? process.argv.slice(process.argv.indexOf('--changed') + 1).map((p) => `https://${HOST}${p}`) : [];
if (!urls.length) {
  const xml = fs.readdirSync('dist').filter((f) => /^sitemap-\d+\.xml$/.test(f)).map((f) => fs.readFileSync(`dist/${f}`, 'utf8')).join('');
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
const res = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls.slice(0, 10000) }) });
console.log('IndexNow', res.status, urls.length, 'urls');
