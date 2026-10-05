// One-time PostHog setup: the funnel, the KPI dashboard and the three A/B test flags.
// Usage: POSTHOG_PERSONAL_KEY=phx_... POSTHOG_PROJECT_ID=12345 [POSTHOG_HOST=https://us.posthog.com] node scripts/posthog-setup.mjs
const host = process.env.POSTHOG_HOST || 'https://us.posthog.com';
const pid = process.env.POSTHOG_PROJECT_ID;
const key = process.env.POSTHOG_PERSONAL_KEY;
if (!pid || !key) { console.error('Set POSTHOG_PERSONAL_KEY and POSTHOG_PROJECT_ID'); process.exit(1); }
const api = async (path, body) => {
  const r = await fetch(`${host}/api/projects/${pid}/${path}`, { method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json(); if (!r.ok) console.error('✗', path, r.status, JSON.stringify(j).slice(0, 300)); return j;
};
const ev = (event, name) => ({ kind: 'EventsNode', event, name: name || event });

const dash = await api('dashboards/', { name: 'Arcus: website KPIs', description: 'Visit to closed, by source. Targets live in gtm/kpis.md.' });
const insights = [
  ['Funnel: visit to free report', { kind: 'FunnelsQuery', series: [ev('$pageview', 'Visit'), ev('visitor_engaged', 'Engaged'), ev('free_report_form_started', 'Form started'), ev('free_report_submitted', 'Submitted'), ev('call_booked', 'Call booked'), ev('call_held', 'Call held'), ev('report_delivered', 'Report delivered'), ev('proposal_sent', 'Proposal'), ev('closed_won', 'Closed')], funnelsFilter: { funnelWindowInterval: 60, funnelWindowIntervalUnit: 'day' }, dateRange: { date_from: '-90d' } }],
  ['Leads by first-touch source', { kind: 'TrendsQuery', series: [ev('free_report_submitted', 'Free reports'), ev('book_submitted', 'Calls booked')], breakdownFilter: { breakdown: '$initial_utm_source', breakdown_type: 'person' }, interval: 'week', dateRange: { date_from: '-90d' } }],
  ['Engaged visitors', { kind: 'TrendsQuery', series: [ev('visitor_engaged')], interval: 'week', dateRange: { date_from: '-90d' } }],
  ['CTA clicks by location', { kind: 'TrendsQuery', series: [ev('cta_clicked')], breakdownFilter: { breakdown: 'cta_location', breakdown_type: 'event' }, dateRange: { date_from: '-30d' } }],
  ['Form drop-off', { kind: 'FunnelsQuery', series: [ev('free_report_form_viewed', 'Viewed'), ev('free_report_form_started', 'Started'), ev('free_report_form_errored', 'Errored'), ev('free_report_submitted', 'Submitted')], dateRange: { date_from: '-30d' } }],
  ['Ask Arcus usage', { kind: 'TrendsQuery', series: [ev('ask_opened'), ev('ask_question'), ev('ask_link_clicked')], interval: 'week', dateRange: { date_from: '-90d' } }],
  ['Reports read', { kind: 'TrendsQuery', series: [ev('report_slide_viewed')], breakdownFilter: { breakdown: '$pathname', breakdown_type: 'event' }, dateRange: { date_from: '-30d' } }],
  ['Article read depth', { kind: 'TrendsQuery', series: [ev('article_read')], breakdownFilter: { breakdown: 'depth', breakdown_type: 'event' }, dateRange: { date_from: '-30d' } }],
];
for (const [name, query] of insights) await api('insights/', { name, query: { kind: 'InsightVizNode', source: query }, dashboards: [dash.id] });

const flags = [
  ['hero_cta', 'Home hero button: "Get a free report" vs "Check my agency’s report"', ['control', 'check']],
  ['free_report_form_length', 'Free report form: full vs short (name + work email; company filled by enrichment)', ['control', 'short']],
  ['free_report_h1', 'Free report headline: "Find out if your agency’s report holds up." vs "Does your agency’s report add up?"', ['control', 'numbers']],
];
for (const [key, name, variants] of flags) {
  await api('feature_flags/', { key, name, active: true, filters: { groups: [{ properties: [], rollout_percentage: 100 }], multivariate: { variants: variants.map((v) => ({ key: v, rollout_percentage: 100 / variants.length })) } } });
}
console.log('Done. Create an Experiment in PostHog for each flag with goal event free_report_submitted.');
