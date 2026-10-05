// AI visibility check: asks Claude (with web search) each buyer prompt in src/data/ai-prompts.js and records
// whether usearcus.ai is cited, which page, and who else is. Run monthly; compare the CSVs over time.
// Usage: ANTHROPIC_API_KEY=... node scripts/ai-visibility.mjs [--limit 10]
// For ChatGPT, Perplexity and Google AI Mode, use a tracker (Profound, Peec or Otterly) with the same prompt list.
import fs from 'node:fs';
import Anthropic from '@anthropic-ai/sdk';
import { AI_PROMPTS } from '../src/data/ai-prompts.js';

const client = new Anthropic();
const limit = process.argv.includes('--limit') ? +process.argv[process.argv.indexOf('--limit') + 1] : AI_PROMPTS.length;
const rows = [['date', 'prompt', 'intent', 'target', 'arcus_cited', 'arcus_urls', 'other_domains']];
const day = new Date().toISOString().slice(0, 10);

for (const p of AI_PROMPTS.slice(0, limit)) {
  const messages = [{ role: 'user', content: p.q }];
  const urls = new Set();
  let response;
  try {
    for (let turn = 0; turn < 3; turn++) {
      response = await client.messages.create({
        model: 'claude-opus-5-5',
        max_tokens: 4000,
        output_config: { effort: 'low' },
        tools: [{ type: 'web_search_20260209', name: 'web_search', max_uses: 3 }],
        messages,
      });
      for (const block of response.content) {
        if (block.type === 'web_search_tool_result' && Array.isArray(block.content)) block.content.forEach((r) => r.url && urls.add(r.url));
        if (block.type === 'text') (block.citations || []).forEach((c) => c.url && urls.add(c.url));
      }
      if (response.stop_reason !== 'pause_turn') break;
      messages.push({ role: 'assistant', content: response.content });
    }
  } catch (error) {
    if (error instanceof Anthropic.APIError) { console.error(`✗ ${p.q}: ${error.status} ${error.message}`); continue; }
    throw error;
  }
  const all = [...urls];
  const ours = all.filter((u) => /(^|\/\/)(www\.)?usearcus\.ai/.test(u));
  const others = [...new Set(all.filter((u) => !ours.includes(u)).map((u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } }).filter(Boolean))];
  rows.push([day, p.q, p.intent, p.target, ours.length ? 'yes' : 'no', ours.join(' '), others.slice(0, 8).join(' ')]);
  console.log(`${ours.length ? '✓' : '·'} ${p.q}`);
}
fs.mkdirSync('gtm/ai-visibility', { recursive: true });
const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
fs.writeFileSync(`gtm/ai-visibility/${day}.csv`, csv);
const cited = rows.slice(1).filter((r) => r[4] === 'yes').length;
console.log(`\nArcus cited in ${cited} of ${rows.length - 1} prompts. Saved gtm/ai-visibility/${day}.csv`);
