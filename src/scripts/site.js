// Arcus site behavior: motion, nav, consent, tracking, forms.
// Content is visible at rest. Motion only hides what is below the fold, then reveals it once.

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const cfg = (() => { try { return JSON.parse(document.querySelector('meta[name=arcus-config]')?.content || '{}'); } catch { return {}; } })();
window.ARCUS = cfg;

// Inside a frame that grows to the page's height, the host keeps its own scroll between pages, so a link clicked
// near the bottom opens the next page at the bottom. Start each new page at the top unless it links to a section.
// The host can resize or restore its scroll after load, so repeat a few times, and stop once the visitor scrolls.
if (window.top !== window && !location.hash) {
  let moved = false;
  const stop = () => { moved = true; };
  ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach((e) => addEventListener(e, stop, { once: true, passive: true }));
  const top = () => {
    if (moved) return;
    const el = document.documentElement;
    const prev = el.style.scrollBehavior;
    el.style.scrollBehavior = 'auto';
    try { window.scrollTo(0, 0); (document.body || el).scrollIntoView(true); } catch {}
    el.style.scrollBehavior = prev;
  };
  top();
  addEventListener('load', top);
  [150, 500, 1200].forEach((ms) => setTimeout(top, ms));
}
const P2IN = 'cubic-bezier(.55,.085,.68,.53)';
const P2OUT = 'cubic-bezier(.25,.46,.45,.94)';

function elastic(a, p) {
  const s = (p / (2 * Math.PI)) * Math.asin(1 / a);
  const pts = [];
  for (let i = 0; i <= 48; i++) {
    const t = i / 48;
    pts.push((t === 0 ? 0 : t === 1 ? 1 : a * Math.pow(2, -10 * t) * Math.sin(((t - s) * 2 * Math.PI) / p) + 1).toFixed(4));
  }
  return `linear(${pts.join(',')})`;
}
const E4 = elastic(1, 0.4), E5 = elastic(1, 0.5);

/* ---------- storage that never throws ---------- */
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  sget(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
  sset(k, v) { try { sessionStorage.setItem(k, v); } catch {} },
};

/* ---------- consent and tracking ---------- */
const gpc = navigator.globalPrivacyControl === true;
function consent() { return store.get('arcus_consent'); } // 'all' | 'necessary' | null
const queue = [];
export function track(event, props = {}) {
  const payload = { event, props: { page_path: location.pathname, page_type: document.body.dataset.page || 'page', ...props } };
  if (window.posthog && window.posthog.capture) window.posthog.capture(event, payload.props);
  else queue.push(payload);
  window.dispatchEvent(new CustomEvent('arcus:track', { detail: payload }));
}
window.arcusTrack = track;

function loadScript(src, attrs = {}) {
  const s = document.createElement('script');
  s.src = src; s.async = true;
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  document.head.appendChild(s);
}
// Google tag runs in consent mode from the start: denied by default, updated on choice.
function gtagBoot() {
  if (!cfg.googleAdsId || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  const granted = consent() === 'all' && !gpc;
  window.gtag('consent', 'default', { ad_storage: granted ? 'granted' : 'denied', ad_user_data: granted ? 'granted' : 'denied', ad_personalization: granted ? 'granted' : 'denied', analytics_storage: granted ? 'granted' : 'denied', wait_for_update: 500 });
  window.gtag('js', new Date());
  window.gtag('config', cfg.googleAdsId, { allow_enhanced_conversions: true });
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(cfg.googleAdsId)}`);
}
function startAnalytics() {
  const c = consent();
  gtagBoot();
  if (window.gtag) { const g = c === 'all' && !gpc ? 'granted' : 'denied'; window.gtag('consent', 'update', { ad_storage: g, ad_user_data: g, ad_personalization: g, analytics_storage: g }); }
  // Product analytics runs cookieless until consent, then with persistence.
  if (cfg.posthogKey && !window.posthog) {
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    window.posthog.init(cfg.posthogKey, { api_host: cfg.posthogHost || 'https://us.i.posthog.com', persistence: c === 'all' && !gpc ? 'localStorage+cookie' : 'memory', capture_pageview: true });
    queue.splice(0).forEach((q) => window.posthog.capture(q.event, q.props));
  }
  if (c !== 'all' || gpc) return;
  if (cfg.metaPixel && !window.fbq) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', cfg.metaPixel); window.fbq('track', 'PageView');
  }
  if (cfg.linkedinId && !window._linkedin_data_partner_ids) {
    window._linkedin_partner_id = cfg.linkedinId; window._linkedin_data_partner_ids = [cfg.linkedinId];
    loadScript('https://snap.licdn.com/li.lms-analytics/insight.min.js');
  }
  if (cfg.redditPixel && !window.rdt) {
    !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement('script');t.src='https://www.redditstatic.com/ads/pixel.js';t.async=!0;var s=d.getElementsByTagName('script')[0];s.parentNode.insertBefore(t,s)}}(window,document);
    window.rdt('init', cfg.redditPixel); window.rdt('track', 'PageVisit');
  }
  if (cfg.visitorIdScript && !document.querySelector(`script[src="${cfg.visitorIdScript}"]`)) loadScript(cfg.visitorIdScript);
}
// Error tracking and real-user speed: no cookies, so they run regardless of consent.
function startMonitoring() {
  if (cfg.sentryLoader) loadScript(cfg.sentryLoader, { crossorigin: 'anonymous' });
  if (cfg.speedInsights) {
    window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
    loadScript('/_vercel/speed-insights/script.js', { defer: '' });
  }
}
function initConsent() {
  const box = document.querySelector('[data-consent]');
  const open = () => { if (box) { box.hidden = false; box.querySelector('button')?.focus(); } };
  document.querySelectorAll('[data-consent-open]').forEach((b) => b.addEventListener('click', open));
  if (!box) return startAnalytics();
  if (!consent() && !gpc) box.hidden = false;
  if (gpc && !consent()) store.set('arcus_consent', 'necessary');
  box.querySelectorAll('[data-consent-choice]').forEach((b) => b.addEventListener('click', () => {
    store.set('arcus_consent', b.dataset.consentChoice);
    box.hidden = true;
    track('consent_set', { choice: b.dataset.consentChoice });
    startAnalytics();
  }));
  startAnalytics();
}

/* ---------- first and last touch, for hidden form fields ---------- */
function touches() {
  const q = new URLSearchParams(location.search);
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid', 'li_fat_id', 'msclkid'];
  const now = { landing_page: location.pathname, referrer: document.referrer || '' };
  keys.forEach((k) => { if (q.get(k)) now[k] = q.get(k); });
  const hasNew = keys.some((k) => q.get(k)) || (document.referrer && !document.referrer.includes(location.host));
  const persist = consent() === 'all' ? store : { get: store.sget, set: store.sset };
  if (!persist.get('arcus_first')) persist.set('arcus_first', JSON.stringify(now));
  if (hasNew) persist.set('arcus_last', JSON.stringify(now));
  return { first: JSON.parse(persist.get('arcus_first') || '{}'), last: JSON.parse(persist.get('arcus_last') || persist.get('arcus_first') || '{}') };
}

/* ---------- engagement: two pages in a session, or a report opened ---------- */
function initEngaged() {
  const n = +(store.sget('arcus_pages') || 0) + 1;
  store.sset('arcus_pages', String(n));
  const fire = (why) => { if (store.sget('arcus_engaged')) return; store.sset('arcus_engaged', why); track('visitor_engaged', { reason: why, pages: n }); };
  if (n >= 2) fire('two_pages');
  if (document.body.dataset.page === 'report') fire('report_opened');
  const visits = +(store.get('arcus_visits') || 0);
  if (!store.sget('arcus_counted')) { store.sset('arcus_counted', '1'); if (consent() === 'all') store.set('arcus_visits', String(visits + 1)); }
}

/* ---------- experiments (PostHog feature flags) ---------- */
// Markup: data-exp="flag:variant" swaps text from data-exp-text; data-exp-hide="flag:variant" hides when that variant is on.
function initExperiments() {
  const apply = () => {
    const ph = window.posthog;
    if (!ph?.getFeatureFlag) return;
    const seen = new Set();
    document.querySelectorAll('[data-exp],[data-exp-hide]').forEach((el) => {
      const [flag, variant] = (el.dataset.exp || el.dataset.expHide).split(':');
      const v = ph.getFeatureFlag(flag);
      if (v === undefined) return;
      if (!seen.has(flag)) { seen.add(flag); track('experiment_viewed', { flag, variant: String(v) }); }
      if (el.dataset.exp && v === variant && el.dataset.expText) {
        const lb = el.querySelector('.lb') || el;
        lb.textContent = el.dataset.expText; if (el.matches('[data-jelly]')) wireJelly(el);
      }
      if (el.dataset.expHide && v === variant) {
        el.hidden = true; el.querySelectorAll('[required]').forEach((i) => { i.required = false; i.dataset.reqOff = '1'; });
      }
    });
  };
  if (window.posthog?.onFeatureFlags) window.posthog.onFeatureFlags(apply); else addEventListener('load', () => window.posthog?.onFeatureFlags?.(apply));
}

/* ---------- company from work email (two-field forms) ---------- */
function initEmailCompany() {
  document.querySelectorAll('form[data-lead]').forEach((form) => {
    const email = form.querySelector('input[type=email]'), co = form.querySelector('[data-from-email]');
    if (!email || !co) return;
    email.addEventListener('blur', () => {
      const d = (email.value.split('@')[1] || '').toLowerCase();
      if (!d || FREE_MAIL.test('@' + d) || co.value) return;
      const name = d.split('.').slice(0, -1).join(' ').replace(/[-_]/g, ' ');
      co.value = name.replace(/\b\w/g, (c) => c.toUpperCase());
      co.dataset.guessed = '1';
    });
  });
}

/* ---------- buttons ---------- */
function wireJelly(btn) {
  const lb = btn.querySelector('.lb');
  const again = !!btn.dataset.wired;
  btn.dataset.wired = '1';
  if (lb && !lb.querySelector('.ch')) {
    const txt = lb.textContent;
    lb.textContent = '';
    const sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = txt; lb.appendChild(sr);
    for (const c of txt) { const s = document.createElement('span'); s.className = 'ch'; s.setAttribute('aria-hidden', 'true'); s.textContent = c; lb.appendChild(s); }
  }
  if (again || reduce) return;
  let anim = null, t = 'scale(1,1)';
  const enter = () => {
    btn.classList.add('hov');
    btn.querySelectorAll('.ch').forEach((ch, i) => {
      ch.animate([{ transform: 'scaleY(1) rotate(0deg)', offset: 0, easing: P2IN }, { transform: 'scaleY(.25) rotate(20deg)', offset: 0.2, easing: E4 }, { transform: 'scaleY(1) rotate(0deg)', offset: 1 }], { duration: 700, delay: i * 17 });
    });
    anim?.cancel(); anim = btn.animate([{ transform: t }, { transform: 'scale(1.05,1.08)' }], { duration: 500, easing: E5, fill: 'forwards' }); t = 'scale(1.05,1.08)';
  };
  const leave = () => { btn.classList.remove('hov'); anim?.cancel(); anim = btn.animate([{ transform: t }, { transform: 'scale(1,1)' }], { duration: 400, easing: P2OUT, fill: 'forwards' }); t = 'scale(1,1)'; };
  btn.addEventListener('pointerenter', enter); btn.addEventListener('pointerleave', leave);
  btn.addEventListener('focus', enter); btn.addEventListener('blur', leave);
  btn.addEventListener('click', () => {
    anim?.cancel();
    anim = btn.animate([{ transform: 'scale(1,1)', offset: 0, easing: P2OUT }, { transform: 'scale(1.12,1.15)', offset: 0.23, easing: P2IN }, { transform: 'scale(.95,.93)', offset: 0.46, easing: P2OUT }, { transform: 'scale(1.04,1.05)', offset: 0.69, easing: E5 }, { transform: 'scale(1,1)', offset: 1 }], { duration: 650, fill: 'forwards' });
    t = 'scale(1,1)';
    track('cta_clicked', { cta_text: btn.textContent.trim(), cta_location: btn.dataset.loc || 'inline', destination: btn.getAttribute('href') || '' });
  });
}

/* ---------- reveals ---------- */
function fmt(n, v) { const d = +(n.dataset.dec || 0); return (n.dataset.pre || '') + (d ? v.toFixed(d) : Math.round(v).toLocaleString('en-US')) + (n.dataset.suf || ''); }
function countUp(n) {
  const from = +n.dataset.from, to = +n.dataset.count, t0 = performance.now() + 200, dur = 1500;
  const go = (now) => { const k = Math.max(0, Math.min(1, (now - t0) / dur)), e = 1 - Math.pow(1 - k, 4); n.textContent = fmt(n, from + (to - from) * e); if (k < 1) requestAnimationFrame(go); };
  requestAnimationFrame(go);
}
function print(box) {
  const prns = box.querySelectorAll('.prn'), stp = box.querySelector('.stp');
  prns.forEach((p, i) => setTimeout(() => { p.classList.remove('pre'); p.classList.add('in'); }, i * 450));
  if (stp) setTimeout(() => {
    stp.classList.remove('pre'); stp.classList.add('in');
    const last = prns[prns.length - 1];
    setTimeout(() => { if (last) { last.classList.remove('shake'); void last.offsetWidth; last.classList.add('shake'); } }, 330);
  }, 500 + prns.length * 1000);
}
function onSeen(t) {
  if (t.hasAttribute('data-printer')) return print(t);
  if (t.hasAttribute('data-count')) return countUp(t);
  if (t.hasAttribute('data-pop')) return t.classList.add('on');
  t.classList.remove('pre'); t.classList.add('in');
}
function initReveals() {
  const vh = innerHeight;
  const els = document.querySelectorAll('[data-reveal],[data-count],[data-printer],[data-pop]');
  if (reduce || !('IntersectionObserver' in window)) { document.querySelectorAll('[data-pop]').forEach((e) => e.classList.add('on')); return; }
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); onSeen(e.target); } }), { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  els.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (el.hasAttribute('data-printer')) {
      if (top > vh * 0.6) { el.querySelectorAll('.prn,.stp').forEach((p) => p.classList.add('pre')); io.observe(el); }
      return;
    }
    if (top < vh * 0.9) { if (el.hasAttribute('data-pop')) el.classList.add('on'); return; }
    if (el.hasAttribute('data-reveal')) el.classList.add('pre');
    if (el.hasAttribute('data-count')) el.textContent = fmt(el, +el.dataset.from);
    io.observe(el);
  });
  // Never leave a focused element invisible.
  document.addEventListener('focusin', (e) => { const p = e.target.closest('.pre'); if (p) { io.unobserve(p); onSeen(p); } });
}

/* ---------- scroll-linked: nav state, scroll-fill heading, footer word ---------- */
function initScroll() {
  const nav = document.querySelector('[data-nav]');
  const fills = [...document.querySelectorAll('[data-fill]')].map((h) => ({ h, w: [...h.querySelectorAll('.w')], cur: 0 }));
  const big = document.querySelector('[data-big]');
  if (!reduce) fills.forEach((f) => f.w.forEach((w) => w.style.setProperty('--p', '0%')));
  let lastY = scrollY, ticking = false;
  const frame = () => {
    ticking = false;
    const y = scrollY, vh = innerHeight;
    if (nav) {
      nav.classList.toggle('on', y > 40);
      if (Math.abs(y - lastY) > 4 && !nav.classList.contains('open')) nav.classList.toggle('hide', y > lastY && y > 700);
    }
    if (Math.abs(y - lastY) > 4) lastY = y;
    if (reduce) return;
    const reads = fills.map((f) => f.h.getBoundingClientRect());
    const br = big ? big.getBoundingClientRect() : null;
    fills.forEach((f, i) => {
      const r = reads[i];
      const p = Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (vh * 0.4)));
      f.cur = Math.max(f.cur, p);
      const T = 1 + 0.5 * (f.w.length - 1);
      f.w.forEach((w, j) => w.style.setProperty('--p', `${(Math.max(0, Math.min(1, f.cur * T - 0.5 * j)) * 100).toFixed(1)}%`));
    });
    if (big && br) { const bp = Math.max(0, Math.min(1, (vh - br.top) / (br.height * 0.8))); big.style.transform = `translateY(${((1 - bp) * 50).toFixed(1)}px)`; }
  };
  const ask = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener('scroll', ask, { passive: true });
  addEventListener('resize', ask, { passive: true });
  frame();
}

/* ---------- mobile menu ---------- */
function initMenu() {
  const btn = document.querySelector('[data-burger]'), sheet = document.getElementById('menu-sheet'), nav = document.querySelector('[data-nav]');
  if (!btn || !sheet) return;
  const set = (open) => {
    sheet.hidden = !open; btn.setAttribute('aria-expanded', String(open)); btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav?.classList.toggle('open', open);
    btn.querySelector('[data-i=open]').toggleAttribute('hidden', open); btn.querySelector('[data-i=close]').toggleAttribute('hidden', !open);
    if (open) sheet.querySelector('a')?.focus();
  };
  btn.addEventListener('click', () => set(sheet.hidden));
  sheet.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) { set(false); btn.focus(); } });
}

/* ---------- forms ---------- */
const FREE_MAIL = /@(gmail|yahoo|hotmail|outlook|aol|icloud|proton|protonmail|live|msn|gmx|mail|yandex)\./i;
function fieldError(input, msg) {
  const id = `${input.id}-err`;
  let p = document.getElementById(id);
  if (msg) {
    if (!p) { p = document.createElement('p'); p.className = 'err'; p.id = id; input.insertAdjacentElement('afterend', p); }
    p.textContent = msg; input.setAttribute('aria-invalid', 'true');
    const d = new Set((input.getAttribute('aria-describedby') || '').split(' ').filter(Boolean)); d.add(id); input.setAttribute('aria-describedby', [...d].join(' '));
  } else if (p) { p.remove(); input.removeAttribute('aria-invalid'); }
}
function validate(input) {
  const v = (input.value || '').trim();
  if (input.type === 'file') return '';
  if (input.required && !v && !input.closest('[hidden]')) return input.dataset.req || 'Please fill this in.';
  if (input.type === 'email' && v) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'That email doesn’t look right. Try you@yourbrand.com.';
    if (input.dataset.work && FREE_MAIL.test(v)) return 'Use your work email so we can match your brand.';
  }
  return '';
}
function initForms() {
  document.querySelectorAll('form[data-lead]').forEach((form) => {
    const started = { v: false };
    const inputs = [...form.querySelectorAll('input:not([type=hidden]):not(.hp input),select,textarea')];
    track(`${form.dataset.lead}_form_viewed`);
    inputs.forEach((i) => {
      i.addEventListener('blur', () => fieldError(i, validate(i)));
      i.addEventListener('input', () => { if (!started.v) { started.v = true; track(`${form.dataset.lead}_form_started`, { first_field: i.name }); } if (i.getAttribute('aria-invalid')) fieldError(i, validate(i)); });
    });
    const t0 = Date.now();
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let first = null;
      inputs.forEach((i) => { const m = validate(i); fieldError(i, m); if (m && !first) first = i; });
      if (first) { first.focus(); track(`${form.dataset.lead}_form_errored`, { field: first.name }); return; }
      const btn = form.querySelector('[type=submit]'), status = form.querySelector('[data-status]');
      const label = btn.querySelector('.sr-only')?.textContent || btn.textContent;
      btn.disabled = true; btn.setAttribute('aria-busy', 'true');
      if (status) { status.hidden = true; status.textContent = ''; }
      const fd = new FormData(form);
      const t = touches();
      const hidden = { event_id: (crypto.randomUUID?.() || String(Date.now()) + Math.random().toString(16).slice(2)), pages_viewed: +(store.sget('arcus_pages') || 1), visits: +(store.get('arcus_visits') || 1), engaged: store.sget('arcus_engaged') || '', company_guessed: !!form.querySelector('[data-guessed]'), fbp: (document.cookie.match(/_fbp=([^;]+)/) || [])[1] || '', fbc: (document.cookie.match(/_fbc=([^;]+)/) || [])[1] || '', li_fat_id: new URLSearchParams(location.search).get('li_fat_id') || '', gclid: new URLSearchParams(location.search).get('gclid') || '', form_id: form.dataset.lead, submit_page: location.pathname, first_touch: t.first, last_touch: t.last, consent_state: consent() || 'unset', posthog_id: window.posthog?.get_distinct_id?.() || '', elapsed_ms: Date.now() - t0, form_version: '2026-10' };
      fd.append('meta', JSON.stringify(hidden));
      try {
        const res = await fetch(cfg.leadEndpoint || '/api/lead', { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(String(res.status));
        track(`${form.dataset.lead}_submitted`, { report_type: fd.get('start_with') || '', email_domain: String(fd.get('email') || '').split('@')[1] || '' });
        if (cfg.metaPixel && window.fbq) window.fbq('track', 'Lead', {}, { eventID: hidden.event_id });
        if (window.gtag && cfg.googleAdsLeadLabel && consent() === 'all') {
          window.gtag('set', 'user_data', { email: String(fd.get('email') || '').trim().toLowerCase() });
          window.gtag('event', 'conversion', { send_to: `${cfg.googleAdsId}/${cfg.googleAdsLeadLabel}`, transaction_id: hidden.event_id });
        }
        if (window.rdt) window.rdt('track', 'Lead', { conversionId: hidden.event_id });
        if (window.lintrk && cfg.linkedinConversionId) window.lintrk('track', { conversion_id: +cfg.linkedinConversionId });
        const next = form.dataset.next;
        if (next) {
          store.sset('arcus_lead', JSON.stringify({ name: fd.get('name') || '', email: fd.get('email') || '', company: fd.get('company') || '' }));
          location.href = next;
        } else {
          const ok = form.querySelector('[data-ok]'); form.querySelectorAll('[data-body]').forEach((b) => (b.hidden = true));
          if (ok) { ok.hidden = false; ok.focus(); }
        }
      } catch {
        if (status) { status.hidden = false; status.textContent = `That didn’t send. Try again, or email us at ${cfg.contactEmail || 'hello@usearcus.ai'}.`; status.focus?.(); }
      } finally {
        btn.disabled = false; btn.removeAttribute('aria-busy');
        if (btn.querySelector('.sr-only')) btn.querySelector('.sr-only').textContent = label;
      }
    });
  });
}

/* ---------- filters (FAQ, Library) ---------- */
function initFilters() {
  document.querySelectorAll('[data-filter]').forEach((group) => {
    const target = document.querySelector(group.dataset.filter);
    const live = document.querySelector(group.dataset.live);
    group.querySelectorAll('button[data-val]').forEach((b) => b.addEventListener('click', () => {
      group.querySelectorAll('button[data-val]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      let n = 0;
      target.querySelectorAll('[data-cat]').forEach((item) => { const show = b.dataset.val === 'all' || (item.dataset.cat || '').split(' ').includes(b.dataset.val); item.hidden = !show; if (show) n++; });
      target.querySelectorAll('[data-cat-head]').forEach((h) => { h.hidden = !(b.dataset.val === 'all' || h.dataset.catHead === b.dataset.val); });
      if (live) live.textContent = `Showing ${n}`;
    }));
  });
}

/* ---------- small things ---------- */
function initMisc() {
  document.querySelectorAll('[data-track]').forEach((el) => el.addEventListener('click', () => track(el.dataset.track, JSON.parse(el.dataset.props || '{}'))));
  document.querySelectorAll('details[data-q]').forEach((d) => d.addEventListener('toggle', () => { if (d.open) track('faq_opened', { question_id: d.dataset.q }); }));
  // article read depth
  const art = document.querySelector('[data-article]');
  if (art) {
    const marks = [25, 50, 75, 100], hit = new Set();
    addEventListener('scroll', () => {
      const r = art.getBoundingClientRect(), p = Math.min(100, Math.max(0, ((innerHeight - r.top) / r.height) * 100));
      marks.forEach((m) => { if (p >= m && !hit.has(m)) { hit.add(m); track('article_read', { slug: art.dataset.article, depth: m }); } });
      const bar = document.querySelector('[data-progress]'); if (bar) bar.style.transform = `scaleX(${p / 100})`;
    }, { passive: true });
  }
}


/* ---------- marquee pause (WCAG 2.2.2) ---------- */
function initMarquee() {
  document.querySelectorAll('[data-mq-toggle]').forEach((b) => {
    const mq = b.closest('section').querySelector('[data-mq]');
    b.addEventListener('click', () => { const on = !mq.classList.contains('paused'); mq.classList.toggle('paused', on); b.setAttribute('aria-pressed', String(on)); b.textContent = on ? 'Play' : 'Pause'; });
  });
}

/* ---------- deck viewer ---------- */
function initDecks() {
  document.querySelectorAll('[data-deck]').forEach((deck) => {
    const slides = [...deck.querySelectorAll('[data-slide]')];
    const ctl = deck.querySelector('[data-deck-controls]');
    if (slides.length < 2 || !ctl) return;
    deck.classList.add('on'); ctl.hidden = false;
    deck.tabIndex = 0;
    const prev = ctl.querySelector('[data-prev]'), next = ctl.querySelector('[data-next]'), lab = ctl.querySelector('[data-count-label]');
    let i = 0;
    const show = (n, src) => {
      i = Math.max(0, Math.min(slides.length - 1, n));
      slides.forEach((s, j) => { const pos = Math.max(-1, Math.min(3, j - i)); s.dataset.pos = pos; s.toggleAttribute('inert', j !== i); s.setAttribute('aria-hidden', String(j !== i)); });
      prev.disabled = i === 0; next.disabled = i === slides.length - 1;
      lab.textContent = `${i + 1} of ${slides.length}`;
      if (src) track('report_slide_viewed', { slide: i + 1, via: src });
    };
    prev.addEventListener('click', () => show(i - 1, 'button'));
    next.addEventListener('click', () => show(i + 1, 'button'));
    deck.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { e.preventDefault(); show(i + 1, 'key'); } if (e.key === 'ArrowLeft') { e.preventDefault(); show(i - 1, 'key'); } });
    let x0 = null;
    deck.addEventListener('pointerdown', (e) => { if (e.target.closest('a,button')) return; x0 = e.clientX; });
    deck.addEventListener('pointerup', (e) => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 40) show(i + (dx < 0 ? 1 : -1), 'swipe'); else if (e.target.closest('[data-pos="0"]') && !e.target.closest('a,button')) show(i + 1, 'click'); });
    show(0);
  });
}

/* ---------- Turnstile, only when a site key is set ---------- */
function initTurnstile() {
  const boxes = [...document.querySelectorAll('.cf-turnstile')];
  if (!boxes.some((b) => b.dataset.sitekey)) { boxes.forEach((b) => b.remove()); return; }
  loadScript('https://challenges.cloudflare.com/turnstile/v0/api.js', { defer: '' });
}

/* ---------- thanks page prefill (name, email, brand from the form) ---------- */
function initPrefill() {
  const el = document.querySelector('[data-prefill]');
  if (!el) return;
  let lead = {};
  try { lead = JSON.parse(store.sget('arcus_lead') || '{}'); } catch {}
  document.querySelectorAll('[data-lead-name]').forEach((n) => { if (lead.name) n.textContent = String(lead.name).split(' ')[0]; });
  const cal = document.querySelector('[data-cal]');
  if (cal && cal.dataset.cal && !cal.dataset.cal.startsWith('[')) {
    const u = new URL(`https://cal.com/${cal.dataset.cal.replace(/^https?:\/\/cal\.com\//, '')}`);
    u.searchParams.set('embed', 'true');
    if (lead.name) u.searchParams.set('name', lead.name);
    if (lead.email) u.searchParams.set('email', lead.email);
    const f = document.createElement('iframe'); f.src = u.href; f.title = 'Pick a time for your walkthrough'; f.loading = 'lazy'; f.style.cssText = 'width:100%;min-height:640px;border:0;border-radius:12px;background:#FFFFFF';
    cal.replaceChildren(f);
  }
  const boss = document.querySelector('[data-boss]');
  if (boss) {
    const body = `Hi,\n\nI asked Arcus to check one of our agency reports against our own numbers. It's free, and they walk us through it on a call. Want to join?\n\nWhat they do: https://usearcus.ai/make-the-case\n\n${lead.name || ''}`;
    boss.href = `mailto:?subject=${encodeURIComponent('Joining the Arcus walkthrough?')}&body=${encodeURIComponent(body)}`;
  }
}

/* ---------- agency math calculator ---------- */
function initCalc() {
  const f = document.querySelector('[data-calc]');
  if (!f) return;
  const out = f.querySelector('[data-calc-out]'), ratio = f.querySelector('[data-calc-ratio]'), bars = f.querySelector('[data-calc-bars]'), note = f.querySelector('[data-calc-note]');
  let sent = false;
  const run = () => {
    const real = +f.real.value || 0;
    const claims = [...f.querySelectorAll('[name^=claim]')].map((i) => ({ n: i.dataset.name, v: +i.value || 0 }));
    const sum = claims.reduce((a, c) => a + c.v, 0);
    const over = Math.max(0, sum - real);
    out.textContent = over.toLocaleString('en-US');
    ratio.textContent = real ? `${(sum / real).toFixed(2)}×` : '–';
    const max = Math.max(real, sum, 1);
    bars.innerHTML = '';
    const row = (label, v, cls) => { const r = document.createElement('div'); r.className = 'bar-r'; r.innerHTML = `<span>${label}</span><span class="b ${cls}" style="transform:scaleX(${(v / max).toFixed(3)})"></span><span class="num">${v.toLocaleString('en-US')}</span>`; bars.appendChild(r); };
    claims.forEach((c) => c.v && row(c.n, c.v, ''));
    row('All claims', sum, '');
    row('Your own numbers', real, 'real');
    note.textContent = !real ? 'Add your own numbers to compare.' : sum > real ? `Your agencies claim ${sum.toLocaleString('en-US')} results. Your own numbers show ${real.toLocaleString('en-US')}. At least ${over.toLocaleString('en-US')} claims overlap or came from somewhere else.` : 'Your agencies’ claims add up to no more than your own numbers. That’s rare, and a good sign. A check would still show which claims hold up.';
    if (!sent && real && sum) { sent = true; track('calculator_used', { ratio: +(sum / (real || 1)).toFixed(2) }); }
  };
  f.addEventListener('input', run);
  f.addEventListener('submit', (e) => e.preventDefault());
  run();
}

/* ---------- "is this you" checklist prints a receipt ---------- */
function initChecklist() {
  document.querySelectorAll('[data-checklist]').forEach((box) => {
    const items = [...box.querySelectorAll('input[type=checkbox]')], rc = box.querySelector('[data-cl-rc]'), lines = box.querySelector('[data-cl-lines]'), stamp = box.querySelector('[data-cl-stamp]'), total = box.querySelector('[data-cl-total]');
    const run = () => {
      const on = items.filter((i) => i.checked);
      lines.innerHTML = on.length ? on.map((i) => `<div class="r"><span>${i.dataset.short}</span><span>✓</span></div>`).join('') : '<div class="r"><span>Nothing checked yet</span><span>–</span></div>';
      total.textContent = `${on.length} of ${items.length}`;
      const hit = on.length >= 2;
      if (hit && stamp.hidden) { stamp.hidden = false; if (!reduce) { stamp.classList.remove('in'); void stamp.offsetWidth; stamp.classList.add('in'); } track('checklist_matched', { count: on.length }); }
      if (!hit) stamp.hidden = true;
    };
    items.forEach((i) => i.addEventListener('change', run));
    run();
  });
}

/* ---------- sticky table of contents highlight ---------- */
function initToc() {
  const links = [...document.querySelectorAll('[data-toc] a[href^="#"]')];
  if (!links.length || !('IntersectionObserver' in window)) return;
  const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { links.forEach((a) => a.classList.remove('on')); map.get(e.target.id)?.classList.add('on'); } }), { rootMargin: '-30% 0px -60% 0px' });
  map.forEach((_, id) => { const t = document.getElementById(id); if (t) io.observe(t); });
}

/* ---------- How it works: one receipt changes state as you scroll ---------- */
function initStepper() {
  const st = document.querySelector('[data-stepper]'), art = document.querySelector('[data-stepper-art]');
  if (!st || !art || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) art.dataset.state = e.target.dataset.step; }), { rootMargin: '-45% 0px -45% 0px' });
  st.querySelectorAll('[data-step]').forEach((s) => io.observe(s));
}

/* hero background motion toggle */
function initHero() {
  const b = document.querySelector('[data-hero-toggle]'), hero = document.querySelector('[data-hero]');
  if (!b || !hero) return;
  if (reduce) hero.classList.add('paused');
  const sync = () => { const p = hero.classList.contains('paused'); b.setAttribute('aria-pressed', String(p)); b.setAttribute('aria-label', p ? 'Play background motion' : 'Pause background motion'); b.querySelector('[data-i=pause]').toggleAttribute('hidden', p); b.querySelector('[data-i=play]').toggleAttribute('hidden', !p); };
  b.addEventListener('click', () => { hero.classList.toggle('paused'); sync(); });
  sync();
}

/* ---------- small page helpers (kept here so the CSP needs no inline scripts) ---------- */
function initPageHelpers() {
  document.querySelectorAll('[data-yt]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    const f = document.createElement('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${a.dataset.yt}?autoplay=1`; f.title = a.getAttribute('aria-label') || 'Video'; f.allow = 'autoplay; encrypted-media; picture-in-picture'; f.allowFullscreen = true;
    a.replaceChildren(f); track('video_played', { id: a.dataset.yt });
  }));
  const q = new URLSearchParams(location.search);
  const map = { 'agency-check': 'agency_check', 'content-report': 'content_report', 'audience-report': 'audience_report', 'market-report': 'not_sure' };
  const v = q.get('start') || map[q.get('from') || ''];
  document.querySelectorAll('select[name=start_with]').forEach((sel) => { if (v && [...sel.options].some((o) => o.value === v)) sel.value = v; });
  document.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    const t = document.querySelector(b.dataset.copy)?.textContent || '';
    try { await navigator.clipboard.writeText(t); } catch {}
    const st = document.querySelector('[data-copied]'); if (st) st.hidden = false;
    track('case_email_copied');
  }));
  document.querySelectorAll('[data-print]').forEach((b) => b.addEventListener('click', () => { track('page_printed'); window.print(); }));
}

/* ---------- Ask Arcus ---------- */
function esc(t) { return t.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function mdLite(t) {
  // Escape first, then allow only links to this site and **bold**.
  return esc(t).replace(/\[([^\]]+)\]\((\/(?!\/)[^)\s]*)\)/g, '<a href="$2">$1</a>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
}
function initAsk() {
  const root = document.querySelector('[data-ask]');
  if (!root) return;
  const btn = root.querySelector('[data-ask-open]'), panel = root.querySelector('#ask-panel'), log = root.querySelector('[data-ask-log]'), form = root.querySelector('[data-ask-form]'), input = form.querySelector('input');
  const history = [];
  let busy = false;
  const set = (open) => { panel.hidden = !open; btn.setAttribute('aria-expanded', String(open)); if (open) { input.focus(); track('ask_opened'); } };
  btn.addEventListener('click', () => set(panel.hidden));
  root.querySelector('[data-ask-close]').addEventListener('click', () => { set(false); btn.focus(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) { set(false); btn.focus(); } });
  const add = (cls, html) => { const p = document.createElement('p'); p.className = `ask-m ${cls}`; p.innerHTML = html; log.appendChild(p); log.scrollTop = log.scrollHeight; return p; };
  const ask = async (q) => {
    if (busy || !q.trim()) return;
    busy = true; root.querySelector('.ask-sugg')?.remove();
    add('u', esc(q)); history.push({ role: 'user', content: q });
    const wait = add('a wait', 'Checking the site…');
    track('ask_question', { length: q.length });
    try {
      const res = await fetch(cfg.askEndpoint || '/api/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: history }) });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || String(res.status));
      wait.classList.remove('wait'); wait.innerHTML = mdLite(data.answer);
      history.push({ role: 'assistant', content: data.answer });
      wait.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => track('ask_link_clicked', { href: a.getAttribute('href') })));
    } catch {
      wait.classList.remove('wait');
      wait.innerHTML = 'I can’t answer right now. <a href="/faq">Try the FAQ</a> or <a href="/book">book a call</a>.';
      history.pop();
    } finally { busy = false; }
  };
  form.addEventListener('submit', (e) => { e.preventDefault(); const q = input.value; input.value = ''; ask(q); });
  root.querySelectorAll('[data-ask-q]').forEach((b) => b.addEventListener('click', () => ask(b.textContent)));
}

function start() {
  initConsent();
  startMonitoring();
  initEngaged();
  initEmailCompany();
  initExperiments();
  document.querySelectorAll('[data-jelly]').forEach(wireJelly);
  initReveals();
  initScroll();
  initMenu();
  initForms();
  initFilters();
  initMisc();
  initMarquee();
  initDecks();
  initTurnstile();
  initPrefill();
  initCalc();
  initChecklist();
  initToc();
  initStepper();
  initHero();
  initAsk();
  initPageHelpers();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
