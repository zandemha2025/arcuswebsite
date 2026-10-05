// One-time Attio setup: deal stages that mirror the website funnel, and the lead fields the site sends.
// Usage: ATTIO_API_KEY=... node scripts/attio-setup.mjs
const key = process.env.ATTIO_API_KEY;
if (!key) { console.error('Set ATTIO_API_KEY'); process.exit(1); }
const call = async (method, path, body) => {
  const r = await fetch(`https://api.attio.com/v2/${path}`, { method, headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: body ? JSON.stringify({ data: body }) : undefined });
  const j = await r.json().catch(() => ({})); if (!r.ok) console.error('✗', method, path, r.status, JSON.stringify(j).slice(0, 200)); else console.log('✓', method, path); return j;
};
// People fields from the website
const fields = [
  ['lead_score', 'Lead score', 'number'], ['lead_tier', 'Lead tier', 'text'], ['heard_via', 'How they heard', 'text'],
  ['first_touch_source', 'First touch source', 'text'], ['form', 'Form', 'text'], ['start_with', 'Wants to start with', 'text'],
  ['submitted_at', 'Submitted at', 'timestamp'], ['reply_by', 'Reply by (SLA)', 'timestamp'], ['first_reply_at', 'First reply at', 'timestamp'],
  ['gclid', 'Google click ID', 'text'], ['li_fat_id', 'LinkedIn click ID', 'text'], ['target_account', 'Target account', 'checkbox'],
];
for (const [api_slug, title, type] of fields) await call('POST', 'objects/people/attributes', { title, api_slug, type, description: 'Set by usearcus.ai /api/lead', is_required: false, is_unique: false, is_multiselect: false, config: {} });
// Deal stages = the funnel after the form
const stages = ['Free report requested', 'Call booked', 'Call held', 'Report delivered', 'Scoping', 'Proposal sent', 'Closed won', 'Closed lost', 'Not a fit'];
for (const title of stages) await call('POST', 'objects/deals/attributes/stage/statuses', { title });
// Win/loss
for (const [api_slug, title, type] of [['loss_reason', 'Loss reason', 'text'], ['win_reason', 'Win reason', 'text'], ['competitor', 'Competing option', 'text'], ['objection', 'Main objection', 'text']]) await call('POST', 'objects/deals/attributes', { title, api_slug, type, description: 'Win/loss: feeds the FAQ and Compare pages each quarter', is_required: false, is_unique: false, is_multiselect: false, config: {} });
console.log('Next: in Attio, add a workflow on deal stage change → webhook POST https://usearcus.ai/api/conversion with { secret, stage, email, gclid, li_fat_id, value }.');
