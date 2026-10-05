// Lead score: fit (who they are) + intent (what they did). 0-100, tier A/B/C.
import { PROSPECTS as TARGET_DOMAINS, TARGET_DOMAINS as ALL, CONFLICTS } from '../../src/data/targets.js';

const SENIOR = /(chief|cmo|\bvp\b|vice president|head of|director|svp|evp|founder|president)/i;
const RELEVANT = /(brand|marketing|insight|growth|consumer|media|social|content|audience|partnership|cmo)/i;
const FREE_MAIL = /@(gmail|yahoo|hotmail|outlook|aol|icloud|proton|protonmail|live|msn|gmx|mail|yandex)\./i;

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
  if (lead.start_with === 'agency_check') intent += 5;
  intent += Math.min(10, (m.pages_viewed || 1) * 2);
  if ((m.visits || 1) > 1) intent += 5;
  if (m.engaged) intent += 3;
  const score = Math.max(0, Math.min(100, fit + intent));
  const existing = (ALL[domain] || {}).segment === 'client';
  const conflict = CONFLICTS.has(domain);
  return { existing_client: existing, conflict, score, fit, intent, tier: score >= 60 ? 'A' : score >= 35 ? 'B' : 'C', target: target ? { ...target, domain } : null };
}
