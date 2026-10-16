// PostHog setup: the funnel, the KPI dashboard and the A/B test flags. Safe to re-run: it updates what already exists.
// Usage: POSTHOG_PERSONAL_KEY=phx_... POSTHOG_PROJECT_ID=12345 [POSTHOG_HOST=https://us.posthog.com] node scripts/posthog-setup.mjs
const host = process.env.POSTHOG_HOST || 'https://us.posthog.com';
const pid = process.env.POSTHOG_PROJECT_ID;
const key = process.env.POSTHOG_PERSONAL_KEY;
if (!pid || !key) { console.error('Set POSTHOG_PERSONAL_KEY and POSTHOG_PROJECT_ID'); process.exit(1); }
const api = async (method, path, body) => {
  const r = await fetch(`${host}/api/projects/${pid}/${path}`, { method, headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({})); if (!r.ok) console.error('✗', method, path, r.status, JSON.stringify(j).slice(0, 300)); return r.ok ? j : null;
};
const list = async (path) => ((await api('GET', `${path}?limit=500`))?.results || []).filter((x) => !x.deleted);
const ev = (event, name) => ({ kind: 'EventsNode', event, name: name || event });

const DASH = 'Arcus: website KPIs';
const dash = (await list('dashboards/')).find((d) => d.name === DASH) || await api('POST', 'dashboards/', { name: DASH, description: 'Visit to closed, by source. Targets live in gtm/kpis.md.' });
if (!dash) process.exit(1);
const insights = [
  ['Funnel: visit to free report', { kind: 'FunnelsQuery', series: [ev('$pageview', 'Visit'), ev('visitor_engaged', 'Engaged'), ev('free_report_form_started', 'Form started'), ev('free_report_submitted', 'Submitted'), ev('call_booked', 'Call booked'), ev('call_held', 'Call held'), ev('report_delivered', 'Report delivered'), ev('proposal_sent', 'Proposal'), ev('closed_won', 'Closed')], funnelsFilter: { funnelWindowInterval: 60, funnelWindowIntervalUnit: 'day' }, dateRange: { date_from: '-90d' } }],
  // book_clicked fires on every "Book a call" link (nav, footer, Close, FAQ, Ask Arcus); book_submitted is the /book form itself.
  ['Leads by first-touch source', { kind: 'TrendsQuery', series: [ev('free_report_submitted', 'Try it free sends'), ev('book_clicked', 'Book a call clicks'), ev('book_submitted', 'Call requests')], breakdownFilter: { breakdown: '$initial_utm_source', breakdown_type: 'person' }, interval: 'week', dateRange: { date_from: '-90d' } }],
  ['Engaged visitors', { kind: 'TrendsQuery', series: [ev('visitor_engaged')], interval: 'week', dateRange: { date_from: '-90d' } }],
  ['CTA clicks by location', { kind: 'TrendsQuery', series: [ev('cta_clicked')], breakdownFilter: { breakdown: 'cta_location', breakdown_type: 'event' }, dateRange: { date_from: '-30d' } }],
  ['Form drop-off', { kind: 'FunnelsQuery', series: [ev('free_report_form_viewed', 'Viewed'), ev('free_report_form_started', 'Started'), ev('free_report_form_errored', 'Errored'), ev('free_report_submitted', 'Submitted')], dateRange: { date_from: '-30d' } }],
  ['Ask Arcus usage', { kind: 'TrendsQuery', series: [ev('ask_opened'), ev('ask_question'), ev('ask_link_clicked')], interval: 'week', dateRange: { date_from: '-90d' } }],
  ['Reports read', { kind: 'TrendsQuery', series: [ev('report_slide_viewed')], breakdownFilter: { breakdown: '$pathname', breakdown_type: 'event' }, dateRange: { date_from: '-30d' } }],
  ['Article read depth', { kind: 'TrendsQuery', series: [ev('article_read')], breakdownFilter: { breakdown: 'depth', breakdown_type: 'event' }, dateRange: { date_from: '-30d' } }],
];
const saved = await list('insights/');
for (const [name, source] of insights) {
  const found = saved.find((i) => i.name === name);
  if (found) await api('PATCH', `insights/${found.id}/`, { query: { kind: 'InsightVizNode', source } });
  else await api('POST', 'insights/', { name, query: { kind: 'InsightVizNode', source }, dashboards: [dash.id] });
}

// Live tests: none right now. Add [key, name, variants] rows here and mark the markup with data-exp / data-exp-hide.
const flags = [];
// Retired with the new story: their markup is gone from the home hero button, the /free-report H1 and the Try it free
// form (the radio-card form has no short variant).
const RETIRED = ['hero_cta', 'free_report_h1', 'free_report_form_length'];
const RESET = [];

const existing = await list('feature_flags/');
for (const [k, name, variants] of flags) {
  const found = existing.find((f) => f.key === k);
  if (found) await api('PATCH', `feature_flags/${found.id}/`, { name, active: true });
  else await api('POST', 'feature_flags/', { key: k, name, active: true, filters: { groups: [{ properties: [], rollout_percentage: 100 }], multivariate: { variants: variants.map((v) => ({ key: v, rollout_percentage: 100 / variants.length })) } } });
}
for (const k of RETIRED) {
  const found = existing.find((f) => f.key === k);
  if (found?.active && await api('PATCH', `feature_flags/${found.id}/`, { active: false })) console.log('Flag turned off:', k);
}

// Experiments: end the ones on retired flags; restart the clock on the reset one so results only count the new form.
const now = new Date().toISOString();
const experiments = await list('experiments/');
for (const x of experiments.filter((e) => RETIRED.includes(e.feature_flag_key) && e.start_date && !e.end_date)) {
  if (await api('PATCH', `experiments/${x.id}/`, { end_date: now })) console.log('Experiment ended:', x.name);
}
for (const x of experiments.filter((e) => RESET.includes(e.feature_flag_key) && e.start_date && !e.end_date)) {
  if (await api('PATCH', `experiments/${x.id}/`, { start_date: now })) console.log('Experiment restarted from today:', x.name);
}
console.log(`Done. If any line above failed, do it by hand in PostHog: turn off ${RETIRED.join(', ')} and end their experiments; ${RESET.length ? `reset the ${RESET.join(', ')} experiment. ` : ''}For a new flag, create an Experiment with goal event free_report_submitted.`);
