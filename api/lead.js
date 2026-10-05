// POST /api/lead: every form on usearcus.ai lands here.
// Checks: honeypot, minimum fill time, Turnstile (when TURNSTILE_SECRET is set), per-IP rate limit.
// Then routes: Slack alert, CRM (Attio), email list (Loops), Meta Conversions API. Each runs only if its env var is set.
// Env: TURNSTILE_SECRET, SLACK_WEBHOOK_URL, ATTIO_API_KEY, LOOPS_API_KEY, META_PIXEL_ID, META_CAPI_TOKEN,
//      LINKEDIN_CAPI_TOKEN, LINKEDIN_CONVERSION_URN, CLAY_WEBHOOK_URL, LEAD_ALLOWED_ORIGIN, RESPONSE_SLA_HOURS
import { scoreLead } from './_lib/score.js';

const hits = new Map(); // best effort per instance; use Upstash/KV for a hard limit
const FREE_MAIL = /@(gmail|yahoo|hotmail|outlook|aol|icloud|proton|protonmail|live|msn|gmx|mail|yandex)\./i;
const AGENCY = /(agency|media|digital|creative|partners|group)\b/i;
const json = (status, body, origin) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...(origin ? { 'Access-Control-Allow-Origin': origin } : {}) } });

async function sha256(s) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s.trim().toLowerCase()));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');
}

export async function POST(request) {
  const origin = process.env.LEAD_ALLOWED_ORIGIN || '';
  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  if (recent.length >= 5) return json(429, { ok: false, error: 'rate_limited' }, origin);
  hits.set(ip, [...recent, now]);

  let fd;
  try { fd = await request.formData(); } catch { return json(400, { ok: false, error: 'bad_form' }, origin); }
  let meta = {};
  try { meta = JSON.parse(String(fd.get('meta') || '{}')); } catch {}

  // Bots: fill the hidden field, or submit faster than a person can type. Pretend it worked.
  if (fd.get('website') || (meta.elapsed_ms && meta.elapsed_ms < 2500)) return json(200, { ok: true }, origin);

  if (process.env.TURNSTILE_SECRET) {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET, response: String(fd.get('cf-turnstile-response') || ''), remoteip: ip }) });
    const v = await r.json().catch(() => ({}));
    if (!v.success) return json(400, { ok: false, error: 'challenge_failed' }, origin);
  }

  const email = String(fd.get('email') || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(400, { ok: false, error: 'bad_email' }, origin);
  const form = String(meta.form_id || 'unknown');
  const lead = {
    form, email, name: String(fd.get('name') || ''), company: String(fd.get('company') || ''), role: String(fd.get('role') || ''),
    start_with: String(fd.get('start_with') || ''), topic: String(fd.get('topic') || ''), notes: String(fd.get('notes') || '').slice(0, 2000),
    heard: String(fd.get('heard') || ''),
    bring_brendon: fd.get('bring_brendon') === 'yes', newsletter: fd.get('newsletter') === 'yes' || form === 'newsletter',
    free_mail: FREE_MAIL.test(email), maybe_agency: AGENCY.test(String(fd.get('company') || '')),
    file: fd.get('report_file') && typeof fd.get('report_file') === 'object' ? { name: fd.get('report_file').name, size: fd.get('report_file').size } : null,
    meta,
  };
  // Routing: free reports go to sales (Min). Security, legal or "bring Brendon" go to Brendon. Agencies are tagged, not nurtured.
  lead.owner = lead.topic === 'security' || lead.bring_brendon ? 'brendon' : form === 'newsletter' || form === 'webinar' ? 'marketing' : 'min';
  lead.stage = form === 'newsletter' ? 'subscriber' : form === 'webinar' ? 'registrant' : form === 'partner' ? 'partner_applicant' : 'lead';
  Object.assign(lead, scoreLead(lead));
  // Response-time SLA: the clock starts now. Attio stores it; Slack shows the deadline.
  const slaHours = +(process.env.RESPONSE_SLA_HOURS || 4);
  lead.submitted_at = new Date(now).toISOString();
  lead.reply_by = new Date(now + slaHours * 3600_000).toISOString();

  const jobs = [];
  if (process.env.SLACK_WEBHOOK_URL && form !== 'newsletter') {
    jobs.push(fetch(process.env.SLACK_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: `New ${form.replace('_', ' ')} (tier ${lead.tier}, score ${lead.score}${lead.target ? `, target account: ${lead.target.company}` : ''}): ${lead.name} <${lead.email}> at ${lead.company || 'unknown'}${lead.role ? `, ${lead.role}` : ''}${lead.maybe_agency ? ' (looks like an agency)' : ''}${lead.conflict ? ' :warning: competes with a current client, check before replying' : ''}${lead.existing_client ? ' (existing client)' : ''}.\nStart with: ${lead.start_with || lead.topic || 'n/a'}. Heard via: ${lead.heard || 'not said'}. Came from: ${meta.first_touch?.utm_source || meta.first_touch?.referrer || 'direct'}. Pages: ${meta.pages_viewed || 1}.\nOwner: ${lead.owner}. Reply by ${new Date(lead.reply_by).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PT.` }) }));
  }
  if (process.env.ATTIO_API_KEY && form !== 'newsletter') {
    jobs.push(fetch('https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses', { method: 'PUT', headers: { Authorization: `Bearer ${process.env.ATTIO_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ data: { values: { email_addresses: [lead.email], name: lead.name ? [{ full_name: lead.name, first_name: lead.name.split(' ')[0], last_name: lead.name.split(' ').slice(1).join(' ') }] : undefined } } }) }));
  }
  if (process.env.CLAY_WEBHOOK_URL && form !== 'newsletter') {
    // Clay enriches company, size and title from the email, then writes back to Attio.
    jobs.push(fetch(process.env.CLAY_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: lead.email, name: lead.name, company: lead.company, role: lead.role, form, score: lead.score, tier: lead.tier, heard: lead.heard, submitted_at: lead.submitted_at, reply_by: lead.reply_by, gclid: meta.gclid || meta.first_touch?.gclid || '', li_fat_id: meta.li_fat_id || meta.first_touch?.li_fat_id || '', fbp: meta.fbp || '', fbc: meta.fbc || '', event_id: meta.event_id || '', utm: meta.first_touch || {} }) }));
  }
  if (process.env.LINKEDIN_CAPI_TOKEN && process.env.LINKEDIN_CONVERSION_URN && meta.consent_state === 'all' && form !== 'newsletter') {
    jobs.push(fetch('https://api.linkedin.com/rest/conversionEvents', { method: 'POST', headers: { Authorization: `Bearer ${process.env.LINKEDIN_CAPI_TOKEN}`, 'Content-Type': 'application/json', 'LinkedIn-Version': '202409', 'X-Restli-Protocol-Version': '2.0.0' }, body: JSON.stringify({ conversion: process.env.LINKEDIN_CONVERSION_URN, conversionHappenedAt: now, eventId: meta.event_id || undefined, user: { userIds: [{ idType: 'SHA256_EMAIL', idValue: await sha256(lead.email) }, ...(meta.li_fat_id ? [{ idType: 'LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID', idValue: meta.li_fat_id }] : [])] } }) }));
  }
  if (process.env.LOOPS_API_KEY && lead.newsletter && !lead.maybe_agency) {
    jobs.push(fetch('https://app.loops.so/api/v1/contacts/create', { method: 'POST', headers: { Authorization: `Bearer ${process.env.LOOPS_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ email: lead.email, firstName: lead.name.split(' ')[0] || undefined, source: form, userGroup: lead.stage }) }));
  }
  if (process.env.META_PIXEL_ID && process.env.META_CAPI_TOKEN && meta.consent_state === 'all' && form !== 'newsletter') {
    jobs.push(fetch(`https://graph.facebook.com/v21.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_CAPI_TOKEN}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: [{ event_name: 'Lead', event_time: Math.floor(now / 1000), action_source: 'website', event_source_url: `https://usearcus.ai${meta.submit_page || ''}`, event_id: meta.event_id || undefined, user_data: { em: [await sha256(lead.email)], client_ip_address: ip, client_user_agent: request.headers.get('user-agent') || '', fbp: meta.fbp || undefined, fbc: meta.fbc || undefined } }] }) }));
  }
  const results = await Promise.allSettled(jobs);
  const failed = results.filter((r) => r.status === 'rejected' || (r.value && !r.value.ok)).length;
  if (failed) console.error('lead routing partial failure', { form, failed });
  if (!jobs.length) console.log('lead (no destinations configured)', JSON.stringify(lead));
  return json(200, { ok: true }, origin);
}

export function GET() { return json(405, { ok: false }); }
