// POST /api/conversion: offline conversions. Call it from Attio (workflow webhook) when a deal reaches
// "Call held" or "Closed won". Sends the event to Meta, LinkedIn and Google Ads so ads optimize to buyers.
// Body: { secret, stage: 'call_held'|'report_delivered'|'proposal'|'closed_won', email, gclid?, li_fat_id?, value?, currency?, occurred_at?, event_id? }
// Env: CONVERSION_SECRET, META_PIXEL_ID, META_CAPI_TOKEN, LINKEDIN_CAPI_TOKEN, LINKEDIN_URN_CALL_HELD, LINKEDIN_URN_CLOSED,
//      GOOGLE_ADS_DEVELOPER_TOKEN, GOOGLE_ADS_CUSTOMER_ID, GOOGLE_ADS_LOGIN_CUSTOMER_ID, GOOGLE_OAUTH_CLIENT_ID,
//      GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REFRESH_TOKEN, GOOGLE_ADS_ACTION_CALL_HELD, GOOGLE_ADS_ACTION_CLOSED
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const sha256 = async (s) => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(s).trim().toLowerCase())))].map((x) => x.toString(16).padStart(2, '0')).join('');
const META_EVENT = { call_booked: 'Schedule', call_held: 'Schedule', report_delivered: 'SubmitApplication', proposal: 'InitiateCheckout', closed_won: 'Purchase' };

async function googleToken() {
  const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', body: new URLSearchParams({ client_id: process.env.GOOGLE_OAUTH_CLIENT_ID, client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET, refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN, grant_type: 'refresh_token' }) });
  return (await r.json()).access_token;
}

export async function POST(request) {
  let b;
  try { b = await request.json(); } catch { return json(400, { ok: false }); }
  if (!process.env.CONVERSION_SECRET || b.secret !== process.env.CONVERSION_SECRET) return json(401, { ok: false });
  if (!b.email || !META_EVENT[b.stage]) return json(400, { ok: false, error: 'email and a known stage are required' });
  const at = b.occurred_at ? new Date(b.occurred_at) : new Date();
  const em = await sha256(b.email);
  const eventId = b.event_id || `${b.stage}-${em.slice(0, 16)}`;
  const jobs = [];

  if (process.env.META_PIXEL_ID && process.env.META_CAPI_TOKEN) {
    jobs.push(fetch(`https://graph.facebook.com/v21.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_CAPI_TOKEN}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: [{ event_name: META_EVENT[b.stage], event_time: Math.floor(at / 1000), action_source: 'system_generated', event_id: eventId, user_data: { em: [em] }, custom_data: { stage: b.stage, ...(b.value ? { value: +b.value, currency: b.currency || 'USD' } : {}) } }] }) }));
  }
  const liUrn = b.stage === 'closed_won' ? process.env.LINKEDIN_URN_CLOSED : b.stage === 'call_held' ? process.env.LINKEDIN_URN_CALL_HELD : '';
  if (process.env.LINKEDIN_CAPI_TOKEN && liUrn) {
    jobs.push(fetch('https://api.linkedin.com/rest/conversionEvents', { method: 'POST', headers: { Authorization: `Bearer ${process.env.LINKEDIN_CAPI_TOKEN}`, 'Content-Type': 'application/json', 'LinkedIn-Version': '202409', 'X-Restli-Protocol-Version': '2.0.0' }, body: JSON.stringify({ conversion: liUrn, conversionHappenedAt: +at, eventId, ...(b.value ? { conversionValue: { currencyCode: b.currency || 'USD', amount: String(b.value) } } : {}), user: { userIds: [{ idType: 'SHA256_EMAIL', idValue: em }, ...(b.li_fat_id ? [{ idType: 'LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID', idValue: b.li_fat_id }] : [])] } }) }));
  }
  const gAction = b.stage === 'closed_won' ? process.env.GOOGLE_ADS_ACTION_CLOSED : b.stage === 'call_held' ? process.env.GOOGLE_ADS_ACTION_CALL_HELD : '';
  if (process.env.GOOGLE_ADS_DEVELOPER_TOKEN && gAction && process.env.GOOGLE_OAUTH_REFRESH_TOKEN) {
    jobs.push((async () => {
      const token = await googleToken();
      const cid = process.env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, '');
      const ts = at.toISOString().replace('T', ' ').replace(/\.\d+Z$/, '+00:00');
      return fetch(`https://googleads.googleapis.com/v18/customers/${cid}:uploadClickConversions`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN, ...(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID ? { 'login-customer-id': process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID.replace(/-/g, '') } : {}), 'Content-Type': 'application/json' }, body: JSON.stringify({ partialFailure: true, conversions: [{ conversionAction: `customers/${cid}/conversionActions/${gAction}`, conversionDateTime: ts, orderId: eventId, ...(b.gclid ? { gclid: b.gclid } : {}), userIdentifiers: [{ hashedEmail: em }], ...(b.value ? { conversionValue: +b.value, currencyCode: b.currency || 'USD' } : {}) }] }) });
    })());
  }
  if (process.env.POSTHOG_PROJECT_KEY) {
    // Keep the whole funnel in one place: CRM stages land in PostHog as events on the same person.
    jobs.push(fetch(`${process.env.POSTHOG_HOST || 'https://us.i.posthog.com'}/capture/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ api_key: process.env.POSTHOG_PROJECT_KEY, event: b.stage === 'proposal' ? 'proposal_sent' : b.stage, distinct_id: b.posthog_id || b.email.toLowerCase(), timestamp: at.toISOString(), properties: { $set: { email: b.email.toLowerCase() }, value: b.value || undefined } }) }));
  }
  const results = await Promise.allSettled(jobs);
  const sent = results.map((r) => (r.status === 'fulfilled' ? r.value.status : 'error'));
  return json(200, { ok: true, sent });
}
export function GET() { return json(405, { ok: false }); }
