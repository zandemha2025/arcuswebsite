// Lead score: fit (who they are) + intent (what they did). 0-100, tier A/B/C.
// Env (optional, server only): ARCUS_CLIENT_DOMAINS and ARCUS_CONFLICT_DOMAINS, comma-separated email domains
// (for example "brand.com,brandgroup.com"). Clients get flagged as existing clients; conflicts are accounts that
// compete with a current client, so the team checks before replying. They live in env, not in src/data/targets.js,
// because that file ships in the public mirror. Unset means empty: nothing is flagged and scoring still works.
import { PROSPECTS as TARGET_DOMAINS } from '../../src/data/targets.js';

const SENIOR = /(chief|cmo|\bvp\b|vice president|head of|director|svp|evp|founder|president)/i;
const RELEVANT = /(brand|marketing|insight|growth|consumer|media|social|content|audience|partnership|cmo)/i;
const FREE_MAIL = /@(gmail|yahoo|hotmail|outlook|aol|icloud|proton|protonmail|live|msn|gmx|mail|yandex)\./i;
// The question picked on the Try it free form. Spend questions are closest to a buying decision.
const START_INTENT = new Map([['what_worked', 5], ['next_dollar', 5], ['audience_report', 3], ['not_sure', 0]]);

const domains = (name) => new Set(String(process.env[name] || '').split(',').map((d) => d.trim().toLowerCase().replace(/^@/, '')).filter(Boolean));
const listed = (set, domain) => set.has(domain) || set.has(domain.split('.').slice(-2).join('.'));

export function scoreLead(lead) {
  const domain = (lead.email.split('@')[1] || '').toLowerCase();
  const target = TARGET_DOMAINS[domain] || TARGET_DOMAINS[domain.split('.').slice(-2).join('.')];
  let fit = 0;
  if (target) fit += target.priority === 'A' ? 30 : target.priority === 'B' ? 22 : 15;
  if (!FREE_MAIL.test(lead.email)) fit += 8;
  if (RELEVANT.test(lead.role)) fit += 7;
  if (SENIOR.test(lead.role)) fit += 5;
  if (lead.maybe_agency) fit -= 25;
  let intent = 0;
  const m = lead.meta || {};
  if (lead.form === 'free_report') intent += 20;
  if (lead.form === 'book') intent += 22;
  intent += START_INTENT.get(lead.start_with) || 0;
  intent += Math.min(10, (m.pages_viewed || 1) * 2);
  if ((m.visits || 1) > 1) intent += 5;
  if (m.engaged) intent += 3;
  const score = Math.max(0, Math.min(100, fit + intent));
  const existing = listed(domains('ARCUS_CLIENT_DOMAINS'), domain);
  const conflict = listed(domains('ARCUS_CONFLICT_DOMAINS'), domain);
  return { existing_client: existing, conflict, score, fit, intent, tier: score >= 60 ? 'A' : score >= 35 ? 'B' : 'C', target: target ? { ...target, domain } : null };
}
