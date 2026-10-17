// Arcus site behavior: motion, nav, consent, tracking, forms.
// Content is visible at rest. Motion only hides what is below the fold, then reveals it once.

// Reduced motion can change mid-visit (OS setting, or DevTools). Handlers read `reduce` when they fire; nothing is re-wired.
// ?still (shots, print) renders every end state, like reduced motion; the head script sets html.still and html.js.
const rmq = matchMedia('(prefers-reduced-motion: reduce)');
const root = document.documentElement;
root.classList.add('js'); // the head script normally sets it first; this covers a page served without it
const still = root.classList.contains('still');
let reduce = rmq.matches || still;
const onReduce = (fn) => (rmq.addEventListener ? rmq.addEventListener('change', fn) : rmq.addListener?.(fn));
onReduce((e) => { reduce = e.matches || still; });
// iOS Safari only applies :active (the press states) once a touchstart listener exists.
document.addEventListener('touchstart', () => {}, { passive: true });
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
/* ---------- storage that never throws ---------- */
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  sget(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
  sset(k, v) { try { sessionStorage.setItem(k, v); } catch {} },
};

/* ---------- layers that open and close with a transition (menu sheet, scrim, Ask panel, consent) ---------- */
// [data-open] drives the CSS transition. [hidden] comes off first, and goes back on only once the exit has ended
// (its own transitionend, or a fallback timer), so a layer reopened mid-exit simply turns around.
const isOpen = (el) => 'open' in el.dataset;
function openLayer(el) { clearTimeout(el._t); el.hidden = false; void el.offsetWidth; el.dataset.open = ''; }
function closeLayer(el) {
  delete el.dataset.open;
  clearTimeout(el._t);
  const done = (e) => { if (e && e.target !== el) return; el.removeEventListener('transitionend', done); clearTimeout(el._t); if (!isOpen(el)) el.hidden = true; };
  el.addEventListener('transitionend', done);
  el._t = setTimeout(done, 240);
}
// Shared by the nav and the Ask button: true once the reader has scrolled 24px down, false after 12px up or near the top.
let scrollDown = false;
let syncAsk = () => {};
// Called whenever the menu or the Ask panel opens or closes; the cookie banner waits for them (initConsent).
let layersChanged = () => {};

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
  if (!box) return startAnalytics();
  const html = document.documentElement.classList;
  // Where focus goes after a choice: what had focus when "Cookie settings" opened the banner, or what focus left to
  // enter it. Without either, the start of the content. A choice made without focus inside moves nothing.
  let back = null, asked = false, stop = () => {};
  box.addEventListener('focusin', (e) => { if (!back && e.relatedTarget && !box.contains(e.relatedTarget)) back = e.relatedTarget; });
  const leave = () => {
    const to = back?.isConnected && !back.closest('[hidden],[inert]') ? back : document.getElementById('main');
    back = null;
    if (box.contains(document.activeElement)) to?.focus({ preventScroll: true });
  };
  const open = () => { if (isOpen(box)) return; openLayer(box); html.add('consent-open'); syncAsk(); };
  document.querySelectorAll('[data-consent-open]').forEach((b) => b.addEventListener('click', () => {
    back = document.activeElement; asked = true; box.classList.remove('tuck'); open(); box.querySelector('button')?.focus();
  }));
  // Escape leaves the banner without choosing; it stays where it is.
  box.addEventListener('keydown', (e) => { if (e.key === 'Escape') leave(); });
  if (gpc && !consent()) store.set('arcus_consent', 'necessary');
  if (!consent()) {
    // Arrive quietly, after the first scroll or 3s, and never over what someone is looking at or acting on:
    // - the hero's first view (desktop: its buttons and the sample card; phones, where the banner
    //   spans the screen: the whole hero panel) must be above the banner's spot or beside it before it arrives, and
    //   it tucks away while they pass back under it;
    // - a form's send button never sits under it: it tucks while one passes;
    // - while someone types in a field it stays away (and tucks if it was there).
    // It also waits for the menu and the Ask panel to close, and tucks while the menu is open. Arriving never takes
    // focus. A handful of rect reads per frame at most.
    const panel = document.getElementById('ask-panel'), phoneMq = matchMedia('(max-width:900px)');
    const avoid = [...document.querySelectorAll('form.form[data-lead] [type=submit],[data-consent-avoid]')];
    let hero = [], spot = null, armed = false, ticking = false;
    const pickHero = () => { hero = [...document.querySelectorAll(phoneMq.matches ? '.hero-p' : '.hero-in .btnrow,.hero-card')]; };
    pickHero();
    const measure = () => { // fixed, so its spot only changes on resize; measured without its transform, plus 12px
      const was = box.hidden; box.hidden = false;
      const r = box.getBoundingClientRect(), dy = new DOMMatrix(getComputedStyle(box).transform).m42;
      box.hidden = was;
      spot = { t: r.top - dy - 12, b: r.bottom - dy + 12, l: r.left, r: r.right };
    };
    // 'clear' when above the spot or beside it, 'below' before it reaches it, 'under' while on it.
    const at = (el) => {
      const c = el.getBoundingClientRect();
      if ((!c.width && !c.height) || c.bottom <= spot.t || c.right <= spot.l || c.left >= spot.r) return 'clear';
      return c.top >= spot.b ? 'below' : 'under';
    };
    const place = () => {
      if (!spot) measure();
      let s = 'clear';
      for (const el of hero) { const a = at(el); if (a === 'under') return 'under'; if (a === 'below') s = 'below'; }
      return avoid.some((el) => at(el) === 'under') ? 'under' : s;
    };
    // Typing, or anywhere in a lead form (its radio cards and checkbox too): someone filling it in, or fixing it after a
    // first try, never gets the banner over the fields they're working on.
    const typing = () => { const a = document.activeElement; return !!a && !box.contains(a) && (a.matches('textarea,select,input:not([type=checkbox],[type=radio],[type=submit],[type=button],[type=hidden])') || !!a.closest('form[data-lead]')); };
    const check = () => {
      ticking = false;
      if (consent()) return stop();
      const menu = html.contains('menu-open');
      if (!isOpen(box)) { if (armed && !menu && !(panel && isOpen(panel)) && !typing() && place() === 'clear') open(); return; }
      box.classList.toggle('tuck', !box.contains(document.activeElement) && (menu || (!asked && (typing() || place() === 'under'))));
    };
    const queue = () => { if (!ticking) { ticking = true; requestAnimationFrame(check); } };
    const onScroll = () => { armed = true; queue(); };
    const onResize = () => { spot = null; pickHero(); queue(); };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize, { passive: true });
    document.addEventListener('focusin', queue);
    document.addEventListener('focusout', queue);
    const timer = setTimeout(() => { armed = true; queue(); }, 3000);
    layersChanged = queue;
    stop = () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onResize); document.removeEventListener('focusin', queue); document.removeEventListener('focusout', queue); clearTimeout(timer); layersChanged = () => {}; };
  }
  box.querySelectorAll('[data-consent-choice]').forEach((b) => b.addEventListener('click', () => {
    store.set('arcus_consent', b.dataset.consentChoice);
    stop(); box.classList.remove('tuck');
    closeLayer(box); html.remove('consent-open'); syncAsk();
    leave();
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
        lb.textContent = el.dataset.expText;
      }
      if (el.dataset.expHide && v === variant) {
        el.hidden = true; el.querySelectorAll('[required]').forEach((i) => { i.required = false; i.dataset.reqOff = '1'; });
      }
    });
  };
  if (window.posthog?.onFeatureFlags) window.posthog.onFeatureFlags(apply); else addEventListener('load', () => window.posthog?.onFeatureFlags?.(apply));
}

/* ---------- company from work email (two-field forms) ---------- */
// Fills the brand from a work email's domain. Runs when the email field is left, and once more on submit (Enter in
// the email field sends without leaving it), so the brand is only ever checked after it had its chance to fill.
function guessCompany(form) {
  const email = form.querySelector('input[type=email]'), co = form.querySelector('[data-from-email]');
  if (!email || !co || co.value.trim()) return;
  const d = (email.value.trim().split('@')[1] || '').toLowerCase();
  if (!d || !d.includes('.') || FREE_MAIL.test('@' + d)) return;
  // The brand is the name just left of the public suffix: team.lumen.com and lumen.co.uk both give "Lumen".
  const parts = d.split('.').slice(0, -1);
  while (parts.length > 1 && /^(co|com|org|net|ac|gov|edu)$/.test(parts[parts.length - 1])) parts.pop();
  const name = (parts.pop() || '').replace(/[-_]+/g, ' ').trim();
  if (!name) return;
  co.value = name.replace(/\b\w/g, (c) => c.toUpperCase());
  co.dataset.guessed = '1';
  if (co.getAttribute('aria-invalid')) fieldError(co, validate(co)); // a filled-in brand clears its error
}
function initEmailCompany() {
  document.querySelectorAll('form[data-lead]').forEach((form) => {
    form.querySelector('input[type=email]')?.addEventListener('blur', () => guessCompany(form));
  });
}

/* ---------- booking links ---------- */
// Every "Book a call" goes to BOOK_URL (src/data/site.js, passed in through the page config). Only [data-jelly] buttons
// send cta_clicked, so one delegated listener sends book_clicked for any link there: the nav pill, the menu row, the
// footer, a Close, an FAQ line or an Ask answer. Capture phase, so nothing that stops the click can swallow it; a
// middle click (new tab) counts too.
const BOOK = cfg.bookUrl || '/book';
function initBook() {
  let to;
  try { to = new URL(BOOK, location.href); } catch { return; }
  const path = (u) => u.pathname.replace(/\/+$/, '') || '/';
  const where = (a) => a.dataset.loc || (a.closest('.sheet') ? 'menu' : a.closest('[data-nav]') ? 'nav' : a.closest('footer') ? 'footer' : a.closest('[data-ask]') ? 'ask' : a.closest('.close') ? 'close' : a.closest('.hero-p,.hero-in') ? 'hero' : 'inline');
  const on = (e) => {
    if (e.type === 'auxclick' && e.button !== 1) return;
    const a = e.target.closest?.('a[href]');
    if (!a) return;
    let u;
    try { u = new URL(a.href, location.href); } catch { return; }
    if (u.origin !== to.origin || path(u) !== path(to)) return;
    track('book_clicked', { cta_text: a.textContent.trim().replace(/\s+/g, ' ').slice(0, 80), cta_location: where(a), destination: a.getAttribute('href') || '' });
  };
  document.addEventListener('click', on, true);
  document.addEventListener('auxclick', on, true);
}

/* ---------- buttons ---------- */
// [data-jelly] is a legacy hook name: it now only tracks CTA clicks. Press and hover feedback live in CSS.
// The label is read at click time, so an experiment that swaps it is tracked with the text the visitor saw.
function wireJelly(btn) {
  if (btn.dataset.wired) return;
  btn.dataset.wired = '1';
  btn.addEventListener('click', () => track('cta_clicked', { cta_text: (btn.querySelector('.lb') || btn).textContent.trim(), cta_location: btn.dataset.loc || 'inline', destination: btn.getAttribute('href') || '' }));
}

/* ---------- reveals ---------- */
// .pre holds something below the fold until it is scrolled to; .in lets it arrive. Card groups (.rise) run the shared
// entrance; a receipt wrapper ([data-printer]) prints (site.css). data-printer="load" prints on arrival in CSS alone,
// and a bare data-printer above the fold stays still, so neither needs anything here.
function onSeen(t) { t.classList.remove('pre'); t.classList.add('in'); }
function initReveals() {
  if (reduce || !('IntersectionObserver' in window)) return;
  const vh = innerHeight;
  const els = [...document.querySelectorAll('[data-reveal],[data-printer]:not([data-printer=load])')];
  // Cards of one group that arrive in the same batch stagger 0, 60, 120ms. Counted per group, so a jump that
  // reveals two groups at once staggers each from 0, and a card stacked alone on mobile gets no delay.
  const io = new IntersectionObserver((es) => {
    const k = new Map();
    es.forEach((e) => {
      const t = e.target;
      if (!e.isIntersecting) return;
      io.unobserve(t);
      if (t.classList.contains('rise')) { const n = k.get(t.parentNode) || 0; k.set(t.parentNode, n + 1); t.style.setProperty('--d', `${Math.min(n, 2) * 60}ms`); }
      onSeen(t);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  // Measure everything first, then add classes, so the page lays out once.
  const tops = els.map((el) => el.getBoundingClientRect().top);
  els.forEach((el, i) => {
    // A receipt prints only if it starts wholly below the fold; anything else waits only below 90% of the screen.
    if (tops[i] < (el.hasAttribute('data-printer') ? vh : vh * 0.9)) return;
    el.classList.add('pre');
    io.observe(el);
  });
  // Never leave a focused element invisible: tabbing to a hidden card shows it at rest, with no entrance.
  document.addEventListener('focusin', (e) => { const p = e.target.closest('.pre'); if (p) { io.unobserve(p); p.style.animation = 'none'; onSeen(p); } });
}

/* ---------- a sample insight that posts as it scrolls into view (data-post; /free-report) ---------- */
// The markup is the end state, so with no script, under reduced motion, or when it already sits on screen at load,
// nothing moves. A card that starts below the fold rises in, then its highlighter sweeps and its sources fade up.
// Focus never lands on something held back: tabbing into a waiting card shows it at rest (initReveals' focusin).
function initInsight() {
  if (reduce || !('IntersectionObserver' in window)) return;
  const vh = innerHeight;
  const posts = [...document.querySelectorAll('.insight[data-post]')].filter((c) => c.getBoundingClientRect().top > vh * 0.85);
  if (!posts.length) return;
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); e.target.classList.remove('pre'); e.target.classList.add('play'); } }), { threshold: 0.5 });
  posts.forEach((el) => { el.classList.add('pre'); io.observe(el); });
}

/* ---------- scroll-linked: nav state ---------- */
function initScroll() {
  const nav = document.querySelector('[data-nav]');
  let lastY = scrollY, acc = 0, ticking = false;
  const frame = () => {
    ticking = false;
    const y = scrollY, d = y - lastY;
    lastY = y;
    // Signed accumulator: distance travelled in the current direction. A direction change starts it over, so a
    // few pixels of jitter (trackpad settle, iOS bounce) never flip the nav.
    if (d) acc = Math.sign(d) === Math.sign(acc) ? acc + d : d;
    const was = scrollDown;
    if (y < 120 || acc <= -12) scrollDown = false; else if (acc >= 24) scrollDown = true;
    if (nav) {
      nav.classList.toggle('on', y > 40);
      if (!nav.classList.contains('open')) nav.classList.toggle('hide', scrollDown && y > 700);
    }
    if (was !== scrollDown) syncAsk();
  };
  const ask = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener('scroll', ask, { passive: true });
  addEventListener('resize', ask, { passive: true });
  frame();
}

/* ---------- mobile menu ---------- */
// While the sheet is open the page behind it is dimmed, inert and doesn't scroll. Closing it (burger, scrim, Escape)
// puts focus back on the burger; following a link just closes it.
function initMenu() {
  const btn = document.querySelector('[data-burger]'), sheet = document.getElementById('menu-sheet'), nav = document.querySelector('[data-nav]'), scrim = document.querySelector('[data-scrim]');
  if (!btn || !sheet) return;
  const behind = () => [document.getElementById('main'), document.querySelector('footer.foot'), document.querySelector('[data-ask]')].filter(Boolean);
  const set = (open, refocus) => {
    if (open === isOpen(sheet)) return;
    if (open) { openLayer(sheet); if (scrim) openLayer(scrim); } else { closeLayer(sheet); if (scrim) closeLayer(scrim); }
    btn.setAttribute('aria-expanded', String(open)); btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav?.classList.toggle('open', open);
    if (open) nav?.classList.remove('hide');
    document.documentElement.classList.toggle('menu-open', open);
    behind().forEach((el) => { el.inert = open; });
    btn.querySelector('[data-i=open]').toggleAttribute('hidden', open); btn.querySelector('[data-i=close]').toggleAttribute('hidden', !open);
    if (open) sheet.querySelector('a')?.focus({ preventScroll: true });
    else if (refocus) btn.focus({ preventScroll: true });
    syncAsk(); layersChanged();
  };
  btn.addEventListener('click', () => set(!isOpen(sheet), true));
  scrim?.addEventListener('click', () => set(false, true));
  sheet.addEventListener('click', (e) => { if (e.target.closest('a,[data-ask-open]')) set(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen(sheet)) set(false, true); });
  // Growing past the phone layout hides the burger; close the menu so nothing is left inert or locked. Focus that was
  // in the sheet moves to the desktop links, which take its place.
  matchMedia('(min-width:901px)').addEventListener?.('change', (e) => {
    if (!e.matches) return;
    const had = sheet.contains(document.activeElement);
    set(false);
    if (had) document.querySelector('.nav-links a')?.focus({ preventScroll: true });
  });
}

/* ---------- forms ---------- */
// Personal mail, matched on the whole domain: jo@gmail.com and jo@yahoo.co.uk are personal, jo@me.com too, but a work
// subdomain that starts with one of these words (jo@mail.northwind.com, jo@live.nation-events.com) is not.
const FREE_MAIL = /@(?:gmail|googlemail|yahoo|ymail|hotmail|outlook|aol|icloud|me|mac|proton|protonmail|live|msn|gmx|mail|yandex)\.(?:com|net|me|[a-z]{2}|co\.[a-z]{2}|com\.[a-z]{2})$/i;
// Errors are an icon plus words, never color alone. The node stays while its message changes, so it enters once.
const ERR_ICON = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M8 4.8v3.6M8 11h.01"/></svg>';
function errNode(id) { const p = document.createElement('p'); p.className = 'err'; p.id = id; p.innerHTML = `${ERR_ICON}<span></span>`; return p; }
function describe(el, id, on) {
  const d = new Set((el.getAttribute('aria-describedby') || '').split(' ').filter(Boolean));
  if (on) d.add(id); else d.delete(id);
  if (d.size) el.setAttribute('aria-describedby', [...d].join(' ')); else el.removeAttribute('aria-describedby');
}
function fieldError(input, msg) {
  const id = `${input.id}-err`;
  let p = document.getElementById(id);
  if (msg) {
    if (!p) { p = errNode(id); input.insertAdjacentElement('afterend', p); }
    p.lastChild.textContent = msg; input.setAttribute('aria-invalid', 'true'); describe(input, id, true);
  } else if (p) { p.remove(); input.removeAttribute('aria-invalid'); describe(input, id, false); }
}
// A radio group (fieldset[data-req]) is checked as one: a radio always has a value, so validate() skips radios. One
// error sits under the legend, and the fieldset points to it.
function groupError(fs, msg) {
  const id = `${fs.id}-err`;
  let p = document.getElementById(id);
  fs.classList.toggle('bad', !!msg);
  if (msg) {
    if (!p) { p = errNode(id); (fs.querySelector('legend') || fs.firstElementChild).insertAdjacentElement('afterend', p); }
    p.lastChild.textContent = msg; describe(fs, id, true);
  } else if (p) { p.remove(); describe(fs, id, false); }
}
const groupMsg = (fs) => (fs.querySelector('input:checked') || fs.closest('[hidden]') ? '' : fs.dataset.req || 'Pick one to go on.');
function validate(input) {
  const v = (input.value || '').trim();
  if (input.type === 'file' || input.type === 'radio') return '';
  // A closed "Something else" box is inert: what's in it isn't asked for.
  if (input.required && !v && !input.closest('[hidden],[inert]')) {
    // The brand fills itself from a work email; when it couldn't, say so instead of a bare "required".
    if ('fromEmail' in input.dataset) {
      const e = input.form?.querySelector('input[type=email]')?.value.trim() || '';
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && !FREE_MAIL.test(e)) return 'We couldn’t tell from your email. Which brand is this for?';
    }
    return input.dataset.req || 'Please fill this in.';
  }
  if (input.type === 'email' && v) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'That email doesn’t look right. Try you@yourbrand.com.';
    if (input.dataset.work && FREE_MAIL.test(v)) return 'Use your work email so we can match your brand.';
  }
  return '';
}
function initForms() {
  document.querySelectorAll('form[data-lead]').forEach((form) => {
    const started = { v: false };
    const inputs = [...form.querySelectorAll('input:not([type=hidden]):not([type=radio]):not(.hp input),select,textarea')];
    const groups = [...form.querySelectorAll('fieldset[data-req]')];
    const start = (name) => { if (!started.v) { started.v = true; track(`${form.dataset.lead}_form_started`, { first_field: name }); } };
    track(`${form.dataset.lead}_form_viewed`);
    // Leaving a field checks what was typed. An empty required field only complains after a first try at sending, so
    // tabbing through the form never paints it red.
    inputs.forEach((i) => {
      i.addEventListener('blur', () => { const m = validate(i); if (m && !(i.value || '').trim() && !form.dataset.tried) return; fieldError(i, m); });
      i.addEventListener('input', () => { start(i.name); if (i.getAttribute('aria-invalid')) fieldError(i, validate(i)); });
    });
    // [data-more="<value>"] opens when that radio is picked ("Something else" opens the notes box). Closed, it's inert,
    // and opening never moves focus. Arrow keys and restored or prefilled picks change state with no transition.
    // Its field is required only while it's open (data-req-open marks it); closing clears any error it was showing.
    const mores = [...form.querySelectorAll('[data-more]')];
    const syncMore = () => mores.forEach((m) => {
      const on = [...form.querySelectorAll('input[type=radio]:checked')].some((r) => r.value === m.dataset.more);
      m.classList.toggle('open', on); m.inert = !on;
      m.querySelectorAll('[data-req-open]').forEach((f) => { f.required = on; if (!on) fieldError(f, ''); });
    });
    const still = () => { form.classList.add('instant'); requestAnimationFrame(() => requestAnimationFrame(() => form.classList.remove('instant'))); };
    groups.forEach((fs) => {
      fs.addEventListener('change', (e) => { if (e.target.type !== 'radio') return; if (e.isTrusted) start(e.target.name); groupError(fs, ''); syncMore(); });
      fs.addEventListener('keydown', (e) => { if (e.key.startsWith('Arrow')) form.classList.add('instant'); });
      fs.addEventListener('pointerdown', () => form.classList.remove('instant'));
    });
    if (mores.length) { still(); syncMore(); }
    const t0 = Date.now();
    const btn = form.querySelector('[type=submit]'), status = form.querySelector('[data-status]'), live = form.querySelector('[data-pending]');
    const lb = btn?.querySelector('.lb'), label = lb ? lb.textContent : '';
    const idle = () => {
      delete form.dataset.busy;
      btn?.removeAttribute('aria-disabled'); btn?.removeAttribute('aria-busy');
      if (live) live.textContent = '';
      if (lb && lb.textContent !== label) lb.textContent = label;
    };
    // Coming back to this page from the browser's history restores it as it was left: sending. Reset it.
    addEventListener('pageshow', (e) => { if (e.persisted) { idle(); still(); syncMore(); } });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (form.dataset.busy || !btn) return;
      form.dataset.tried = '1';
      guessCompany(form);
      // Validate everything, then focus the first problem in reading order (a group's first radio, or the field).
      const bad = [];
      groups.forEach((fs) => { const m = groupMsg(fs); groupError(fs, m); if (m) bad.push([fs, fs.querySelector('input[type=radio]')]); });
      inputs.forEach((i) => { const m = validate(i); fieldError(i, m); if (m) bad.push([i, i]); });
      bad.sort(([a], [b]) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      if (bad.length) { const [el, to] = bad[0]; to?.focus(); track(`${form.dataset.lead}_form_errored`, { field: el.name || to?.name || el.id }); return; }
      // Sending: the button keeps focus and width (aria-disabled, not disabled) and a second submit is ignored.
      form.dataset.busy = '1'; btn.setAttribute('aria-disabled', 'true'); btn.setAttribute('aria-busy', 'true');
      const busyAt = performance.now();
      if (live) live.textContent = 'Sending your question…';
      let leaving = false;
      if (status) { status.hidden = true; status.textContent = ''; }
      // Autofill and paste bring stray spaces; send what the person meant.
      inputs.forEach((i) => { if (/^(text|email|search|tel|url)$/.test(i.type) && i.value !== i.value.trim()) i.value = i.value.trim(); });
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
          leaving = true; // stay in the sending state until the next page replaces this one
          location.href = next;
        } else {
          const ok = form.querySelector('[data-ok]'); form.querySelectorAll('[data-body]').forEach((b) => (b.hidden = true));
          if (ok) { ok.hidden = false; ok.focus(); }
        }
      } catch {
        // A fast failure still shows the sending state for a beat, so the label doesn't flash out and back.
        const hold = 400 - (performance.now() - busyAt);
        if (hold > 0) await new Promise((r) => setTimeout(r, hold));
        if (status) { status.hidden = false; status.textContent = `That didn’t send. Try again, or email us at ${cfg.contactEmail || 'hello@usearcus.ai'}.`; status.focus?.(); }
      } finally {
        if (!leaving) idle();
      }
    });
  });
}

/* ---------- long notes: a counter near the limit, and a note when a paste was cut ---------- */
function initCounts() {
  document.querySelectorAll('[data-count-for]').forEach((out) => {
    const t = document.getElementById(out.dataset.countFor), max = +(t?.getAttribute('maxlength') || 0);
    if (!t || !max) return;
    const fmt = (n) => n.toLocaleString('en-US');
    let cut = false;
    const show = () => {
      const n = t.value.length, near = n >= max * 0.9;
      out.hidden = !(near || cut);
      if (!out.hidden) out.textContent = cut ? `That was cut at ${fmt(max)} characters. Tell us the rest on the call.` : `${fmt(n)} / ${fmt(max)}`;
    };
    t.addEventListener('paste', (e) => {
      const add = (e.clipboardData?.getData('text') || '').length, keep = t.value.length - (t.selectionEnd - t.selectionStart);
      cut = keep + add > max;
      requestAnimationFrame(show);
    });
    t.addEventListener('input', (e) => { if (e.inputType !== 'insertFromPaste') cut = false; show(); });
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

/* ---------- in-page links ---------- */
// Accordions open at once everywhere (DEPTH §D.10: never animate accordion height); only the answer fades (site.css).
// The page has no scroll-behavior:smooth, so a Tab that moves focus off screen jumps straight to it. A pointer click
// on an in-page link glides there instead (at once under reduced motion); keyboard activation keeps the instant jump.
// A link to the Try it free form (#form) also puts focus on its first question, so the next key press picks one.
function initHashLinks() {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest?.('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) return;
    let t;
    try { t = document.querySelector(decodeURIComponent(a.getAttribute('href'))); } catch { return; }
    if (!t) return;
    const toForm = t.id === 'form' && t.querySelector('input[type=radio]');
    if (e.detail === 0 && !toForm) return; // keyboard: the browser's own jump, no animation
    e.preventDefault();
    t.scrollIntoView({ behavior: reduce || e.detail === 0 ? 'auto' : 'smooth', block: 'start' });
    if (history.pushState) history.pushState(null, '', a.getAttribute('href'));
    if (toForm) (t.querySelector('input[type=radio]:checked') || t.querySelector('input[type=radio]')).focus({ preventScroll: true });
    else if (t.matches('[tabindex],a,button,input,select,textarea,summary')) t.focus({ preventScroll: true });
  });
}

/* ---------- small things ---------- */
function initMisc() {
  document.querySelectorAll('[data-track]').forEach((el) => el.addEventListener('click', () => track(el.dataset.track, JSON.parse(el.dataset.props || '{}'))));
  document.querySelectorAll('details[data-q]').forEach((d) => d.addEventListener('toggle', () => { if (d.open) track('faq_opened', { question_id: d.dataset.q }); }));
  // Article read depth: one measure per frame, however fast the scroll events come. Tracking only: nothing on screen
  // moves with the scroll (the homepage story is the site's one scroll-linked motion).
  const art = document.querySelector('[data-article]');
  if (art) {
    const marks = [25, 50, 75, 100], hit = new Set();
    let ticking = false;
    const frame = () => {
      ticking = false;
      const r = art.getBoundingClientRect(), p = Math.min(100, Math.max(0, ((innerHeight - r.top) / r.height) * 100));
      marks.forEach((m) => { if (p >= m && !hit.has(m)) { hit.add(m); track('article_read', { slug: art.dataset.article, depth: m }); } });
      if (hit.size === marks.length) removeEventListener('scroll', on);
    };
    const on = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
    addEventListener('scroll', on, { passive: true });
  }
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
    // Keyboard steps run shorter (.kbd); the first pointer press puts the full-length motion back.
    deck.addEventListener('keydown', (e) => {
      deck.classList.add('kbd');
      if (e.key === 'ArrowRight') { e.preventDefault(); show(i + 1, 'key'); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(i - 1, 'key'); }
    });
    // Drag or flick the front slide. It follows the pointer 1:1 (rubber-banded past either end), and pointer capture
    // keeps it tracking off the slide. On release a fast flick (over 0.11px/ms) or 80px advances; under 6px it's a
    // click, which still advances. A vertical swipe on touch belongs to the page (touch-action:pan-y), and the
    // browser's pointercancel just puts the slide back. One pointer at a time.
    let drag = null;
    const settle = () => { if (!drag) return; drag.s.style.transform = ''; deck.classList.remove('dragging'); drag = null; };
    deck.addEventListener('pointerdown', (e) => {
      deck.classList.remove('kbd');
      if (drag || e.button !== 0 || e.target.closest('a,button')) return;
      const s = e.target.closest('[data-slide]');
      if (s !== slides[i]) return;
      drag = { id: e.pointerId, s, x0: e.clientX, t0: performance.now(), dx: 0, w: s.offsetWidth || 1 };
      try { s.setPointerCapture(e.pointerId); } catch {}
      deck.classList.add('dragging');
    });
    deck.addEventListener('pointermove', (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x0;
      const end = (dx > 0 && i === 0) || (dx < 0 && i === slides.length - 1);
      // Past an end the pull gets heavier the further it goes and never travels a full slide width (iOS's curve).
      const x = end ? Math.sign(dx) * drag.w * (1 - 1 / ((Math.abs(dx) * 0.55) / drag.w + 1)) : dx;
      drag.dx = dx;
      drag.s.style.transform = `translateX(${x.toFixed(1)}px) rotate(${(x * 0.02).toFixed(2)}deg)`;
    });
    deck.addEventListener('pointerup', (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const { dx, t0 } = drag, v = Math.abs(dx) / Math.max(1, performance.now() - t0);
      settle();
      if (Math.abs(dx) < 6) return show(i + 1, 'click');
      const to = Math.max(0, Math.min(slides.length - 1, i + (dx < 0 ? 1 : -1)));
      if ((v > 0.11 || Math.abs(dx) > 80) && to !== i) show(to, 'swipe');
    });
    ['pointercancel', 'lostpointercapture'].forEach((t) => deck.addEventListener(t, (e) => { if (drag && e.pointerId === drag.id) settle(); }));
    show(0);
  });
}

/* ---------- Turnstile, only when a site key is set ---------- */
function initTurnstile() {
  const boxes = [...document.querySelectorAll('.cf-turnstile')];
  if (!boxes.some((b) => b.dataset.sitekey)) { boxes.forEach((b) => b.remove()); return; }
  loadScript('https://challenges.cloudflare.com/turnstile/v0/api.js', { defer: '' });
}

/* ---------- a form someone already gave their details to (book a call after Try it free) ---------- */
// [data-prefill-form] fills name, work email and brand from the lead just sent in this tab, when those fields are empty.
function initPrefillForm() {
  const form = document.querySelector('form[data-prefill-form]');
  if (!form) return;
  let lead = {};
  try { lead = JSON.parse(store.sget('arcus_lead') || '{}'); } catch {}
  [['name', lead.name], ['email', lead.email], ['company', lead.company]].forEach(([n, v]) => {
    const f = form.querySelector(`[name=${n}]`);
    if (f && v && !f.value) f.value = String(v);
  });
}

/* ---------- thanks pages: "How did you hear about us?" as one tap ---------- */
// Shown only when this tab holds the lead's email (it just sent a form). One tap posts a small note to /api/lead
// (form_id "heard"), which files it with the lead; the chips then give way to a thank-you.
function initHeard() {
  const box = document.querySelector('[data-heard]');
  if (!box) return;
  let lead = {};
  try { lead = JSON.parse(store.sget('arcus_lead') || '{}'); } catch {}
  if (!lead.email || store.sget('arcus_heard')) return;
  box.hidden = false;
  const t0 = Date.now();
  box.querySelectorAll('[data-heard-v]').forEach((b) => b.addEventListener('click', () => {
    const v = b.dataset.heardV, fd = new FormData();
    fd.append('email', lead.email); fd.append('name', lead.name || ''); fd.append('heard', v); fd.append('form_id', 'heard');
    fd.append('meta', JSON.stringify({ form_id: 'heard', elapsed_ms: Date.now() - t0 + 5000, submit_page: location.pathname }));
    fetch(cfg.leadEndpoint || '/api/lead', { method: 'POST', body: fd, headers: { Accept: 'application/json' } }).catch(() => {});
    store.sset('arcus_heard', v);
    track('heard_answered', { heard: v });
    const ok = box.querySelector('[data-heard-ok]'), list = box.querySelector('.heard-l');
    if (list) list.hidden = true;
    if (ok) { ok.hidden = false; ok.focus({ preventScroll: true }); }
  }));
}

/* ---------- thanks page prefill (name, email, brand from the form) ---------- */
function initPrefill() {
  const el = document.querySelector('[data-prefill]');
  if (!el) return;
  let lead = {};
  try { lead = JSON.parse(store.sget('arcus_lead') || '{}'); } catch {}
  // The first word of the name that isn't a title ("Dr. Aleksandra" gives Aleksandra), without trailing punctuation.
  // Nothing usable keeps the default ("thanks").
  const words = String(lead.name || '').trim().split(/\s+/);
  const first = (words.find((w) => !/^(dr|mr|mrs|ms|mx|prof)\.?$/i.test(w)) || '').replace(/[.,;:]+$/, '');
  document.querySelectorAll('[data-lead-name]').forEach((n) => { if (first) n.textContent = first; });
  // [data-cal] carries CAL_URL (src/data/site.js), and only once TBD.calLink is set; until then there is nothing to embed.
  const cal = document.querySelector('[data-cal]');
  if (cal && /^https:\/\/cal\.com\/./.test(cal.dataset.cal || '')) {
    const u = new URL(cal.dataset.cal);
    u.searchParams.set('embed', 'true');
    if (lead.name) u.searchParams.set('name', String(lead.name).trim());
    if (lead.email) u.searchParams.set('email', lead.email);
    const f = document.createElement('iframe'); f.src = u.href; f.title = 'Pick a time on the Arcus calendar'; f.loading = 'lazy'; f.style.cssText = 'width:100%;min-height:640px;border:0;border-radius:12px;background:#FFFFFF';
    cal.replaceChildren(f);
  }
  const boss = document.querySelector('[data-boss]');
  if (boss) {
    const body = `Hi,\n\nI asked Arcus a question about our marketing. They answer it free with our own numbers and walk us through it on a call. Want to join?\n\nWhat they do: https://usearcus.ai/make-the-case\n\n${lead.name || ''}`;
    boss.href = `mailto:?subject=${encodeURIComponent('Joining the Arcus walkthrough?')}&body=${encodeURIComponent(body)}`;
  }
}

/* ---------- "is this you" checklist prints a receipt ---------- */
function initChecklist() {
  document.querySelectorAll('[data-checklist]').forEach((box) => {
    const items = [...box.querySelectorAll('input[type=checkbox]')], rc = box.querySelector('[data-cl-rc]'), lines = box.querySelector('[data-cl-lines]'), stamp = box.querySelector('[data-cl-stamp]'), total = box.querySelector('[data-cl-total]');
    const run = () => {
      const on = items.filter((i) => i.checked);
      if (lines) lines.innerHTML = on.length ? on.map((i) => `<div class="r"><span>${i.dataset.short}</span><span>Yes</span></div>`).join('') : '<div class="r"><span>Nothing checked yet</span><span>–</span></div>';
      if (total) total.textContent = `${on.length} of ${items.length}`;
      const hit = on.length >= 2;
      if (hit && !box.dataset.matched) { box.dataset.matched = '1'; track('checklist_matched', { count: on.length }); }
      if (!hit) delete box.dataset.matched;
      if (!stamp) return;
      if (hit && stamp.hidden) { stamp.hidden = false; if (!reduce) { stamp.classList.remove('in'); void stamp.offsetWidth; stamp.classList.add('in'); } }
      if (!hit) stamp.hidden = true;
    };
    items.forEach((i) => i.addEventListener('change', run));
    run();
  });
}

/* ---------- sticky table of contents highlight ---------- */
function initToc() {
  // On phones the contents fold into "On this page" (open on wide screens, where its summary is hidden). The first
  // fold happens without a transition.
  document.querySelectorAll('[data-toc-fold]').forEach((d) => {
    const mq = matchMedia('(max-width:900px)');
    const sync = () => { d.open = !mq.matches; };
    d.classList.add('still'); sync(); requestAnimationFrame(() => requestAnimationFrame(() => d.classList.remove('still')));
    mq.addEventListener?.('change', sync);
  });
  const links = [...document.querySelectorAll('[data-toc] a[href^="#"]')];
  const heads = links.map((a) => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
  if (!heads.length) return;
  let on = null;
  spy(heads, 0.35, (h) => { if (h === on) return; on = h; links.forEach((a) => a.classList.toggle('on', !!h && a.getAttribute('href') === `#${h.id}`)); });
}

/* ---------- scroll spy: which section is current ---------- */
// The last item (in page order) whose top has passed a reading line `at` down the viewport is current; above the first,
// `none` is. Read on scroll, rAF-throttled, one rect per item, so a jump (Home, an anchor, a reload mid-page, a fast
// fling) never leaves a stale state, which a thin observer band can when no item lands inside it.
function spy(items, at, set, none = null) {
  let raf = 0;
  const pick = () => {
    raf = 0;
    const line = innerHeight * at;
    let cur = none;
    for (const it of items) { if (it.getBoundingClientRect().top <= line) cur = it; else break; }
    set(cur);
  };
  const ask = () => { if (!raf) raf = requestAnimationFrame(pick); };
  addEventListener('scroll', ask, { passive: true });
  addEventListener('resize', ask, { passive: true });
  pick();
}

/* ---------- How it works: one receipt changes state as you scroll ---------- */
// The step crossing the middle of the screen sets the receipt; above step 01 it shows step 01 (the markup default).
function initStepper() {
  const st = document.querySelector('[data-stepper]'), art = document.querySelector('[data-stepper-art]');
  if (!st || !art) return;
  const steps = [...st.querySelectorAll('[data-step]')];
  if (!steps.length) return;
  spy(steps, 0.5, (s) => { if (art.dataset.state !== s.dataset.step) art.dataset.state = s.dataset.step; }, steps[0]);
}

/* ---------- header CTA stays unlit while the hero's own is on screen ---------- */
// One dominant action per screen: where the hero has its own "Try it out for free" (data-loc "hero", "how-hero",
// "pricing-hero"…), both header CTAs ship with .unlit and stay unlit (site.css, only under html.js) while that button
// is on screen below the header, then light up once it has scrolled under it. On a page whose action is its own form
// (book a call, the Live Teardown, partners), [data-unlit-zone] marks the section holding it, and the header stays
// unlit while that is on screen. No hero button and no zone, no observer: lit. Over the photo the header's Ask disc
// (.nav-ask.unlit) dims with the CTAs.
function initUnlit() {
  const ctas = [...document.querySelectorAll('.nav .unlit')], hero = document.querySelector('main [data-unlit-zone]') || document.querySelector('main .jb.k[data-loc$="hero"]');
  if (!ctas.length) return;
  const set = (on) => ctas.forEach((c) => c.classList.toggle('unlit', on));
  if (!hero || !('IntersectionObserver' in window)) { set(false); return; }
  new IntersectionObserver(([e]) => set(e.isIntersecting), { rootMargin: '-72px 0px 0px 0px' }).observe(hero);
}

/* ---------- homepage: the scroll story ("Your data is in pieces."), starting in the hero ---------- */
// The page's one scroll-linked motion (site.css "homepage motion" 2 and 2b). The markup is the assembled end state; this
// only measures where everything starts and arms it. Wide screens: the 13 pieces start as a loose pile in the free field
// right of the heading, above the stage, and land in a cascade over 62% of a viewport (the stage's top travels from the
// bottom of the screen to 38%; the last piece lands where the answer posts). Up to 1100px: each piece starts knocked
// loose inside its own card and lands as it reaches 58% of the screen. Where the browser has scroll-driven animations,
// CSS runs it on timelines; elsewhere (and with ?fallback) one passive, rAF-throttled scroll listener writes the same
// mapping: one rect read per frame, transform and opacity only, written on each element itself. Never armed under
// reduced motion or ?still. It re-measures only when the width changes or the fonts land, never on a height-only resize
// (a phone's URL bar collapsing); above 1100px (desktop windows) a height change re-measures too.
//
// The hand-off (2b): the story starts in the hero. As the hero scrolls away, the three planes separate in depth (the
// nearer, the faster: the tile behind lags and recedes most, the slide less, the card scrolls with the page), and the
// card sheds its answer, numbers first, then collapses into its question. Wide (>1100): that question travels as a
// chip into the pile, leaves with the pieces, and lands on the answer's question line just before the answer posts
// around it (initPost); then the chip fades and the question is the card's. Scrolling back up above the post line, the
// chip takes the question away with it (the card's own line hides while the chip is away), so it is never shown twice.
// The card itself never moves while it still carries a number, so no illustrative number ever comes nearer the logo
// row than it sits at rest. Up to 1100px (no pile) the lighter version: the planes separate a little and the card
// collapses to its question in place. Each track is a range of page scroll (--h0 to --h1) and end values, written on
// the element; CSS runs it on the root scroll timeline, the fallback writes the same values from scrollY.
let storyPosted = () => {};
function initStory() {
  const slab = document.querySelector('[data-story]'), chapter = document.querySelector('[data-chapter]');
  if (!slab || !chapter) return;
  // [x, y, deg]: fractions of the free field (wide), or px and deg inside the piece's own card (narrow)
  const PILE = [[.10, .30, -8], [.62, .06, 6], [.36, .70, -4], [.90, .26, 10], [.18, .92, 5], [.50, .40, -11], [.80, .68, 4], [.30, .08, -6], [.96, .94, -9], [.06, .66, 7], [.62, .98, -5], [.74, .40, 12], [.42, .18, 3]];
  const LOOSE = [[-26, -16, -7], [30, 12, 6], [-18, 10, -9], [24, -14, 8], [-30, 6, -6], [18, -10, 10], [-12, 14, -8], [28, 8, 7], [-22, -12, -10], [16, 16, 5], [-28, -6, 9], [20, -8, -6], [-14, 10, 8]];
  const css = !!window.CSS?.supports?.('animation-timeline: view()') && !/[?&]fallback\b/.test(location.search);
  const hc = document.querySelector('.hero-card');
  const H = hc?.querySelector('.hc-q') && {
    win: document.querySelector('.hs-d-win'), sat: document.querySelector('.hs-d-sat'), full: hc.querySelector('.hc-full'),
    q: hc.querySelector('.hc-q'), qm: hc.querySelector('.hc-qm'), qc: hc.querySelector('.hc-qc'), hq: hc.querySelector('.insight-q'),
    body: hc.querySelector('.insight-b'), rest: [...hc.querySelectorAll('.insight-h,.insight-src')],
    card: slab.querySelector('.ic-eq'), eq: slab.querySelector('.ic-eq .insight-q'), out: slab.querySelector('.eq-out'),
  };
  let tiles = [], tracks = [], vh0 = innerHeight, mode = 'off', hand = '', lastW = 0, lastH = 0, ticking = false, atEnd = false, posted = false, gio = null;
  const KINDS = ['hd-m', 'hd-f', 'hd-fold', 'hd-glide'], VARS = ['--h0', '--h1', '--tx', '--ty', '--tr', '--ts', '--to'], PROPS = ['translate', 'rotate', 'scale', 'opacity', 'transform-origin', 'will-change'];
  // Once the card's rows have faded it stops taking the pointer, so its invisible marks never light the slide on hover.
  // A class, flipped by an IntersectionObserver when the card's bottom crosses where it sits at that scroll (y px from
  // the top of the screen): no scroll listener, no per-frame work.
  const watchFold = (y) => {
    gio = new IntersectionObserver(([e]) => H.full.classList.toggle('hc-gone', e.boundingClientRect.bottom <= (e.rootBounds?.top ?? y) + 1), { rootMargin: `${-y}px 0px 0px 0px` });
    gio.observe(hc);
  };
  const reset = () => {
    root.classList.remove('armed', 'ho', 'hl', 'q-home');
    tiles.forEach((t) => { t.el.classList.remove('fly'); t.el.style.transform = ''; t.el.style.removeProperty('--sh'); t.el.style.removeProperty('--cv'); });
    tracks.forEach((t) => { t.el.classList.remove(...KINDS); [...VARS, ...PROPS].forEach((v) => t.el.style.removeProperty(v)); });
    if (H) { ['--qx', '--qy', '--qw'].forEach((v) => H.q.style.removeProperty(v)); H.card?.style.removeProperty('transform-origin'); H.full.classList.remove('hc-gone'); }
    gio?.disconnect(); gio = null;
    tiles = []; tracks = []; mode = 'off'; hand = '';
  };
  // The chip's two trips (site.css @keyframes hd-glide): its speed ramps up from 0 over the first quarter, holds, and
  // ramps back to 0 over the last, so it leaves the card, lands in the pile, leaves the pile and lands on the answer's
  // question line with no velocity step.
  const glide = (p) => (p < 0.25 ? 8 / 3 * p * p : p < 0.75 ? 1 / 6 + (p - 0.25) * 4 / 3 : 1 - 8 / 3 * (1 - p) * (1 - p));
  // Fallback writes: only what changed since the last frame. Only the elements that move are promoted (at arm).
  const put = (t, p) => {
    const f = t.kind === 'hd-glide' ? glide(p) : p, w = t.w || (t.w = {}), st = t.el.style;
    const set = (k, v) => { if (w[k] !== v) { w[k] = v; st[k] = v; } };
    if (t.kind !== 'hd-f') {
      if (t.tx || t.ty) set('translate', `${(t.tx * f).toFixed(1)}px ${(t.ty * f).toFixed(1)}px`);
      if (t.tr) set('rotate', `${(t.tr * f).toFixed(2)}deg`);
      if (t.ts !== 1) set('scale', String(t.ts).split(' ').map((s) => (1 + (s - 1) * f).toFixed(4)).join(' '));
    }
    if (t.kind === 'hd-f') set('opacity', (t.o0 + (t.o1 - t.o0) * p).toFixed(3));
    if (t.kind === 'hd-fold') set('opacity', p < 0.7 ? '1' : ((1 - p) / 0.3).toFixed(3)); // holds, then goes in the last 30%
  };
  const frame = () => {
    ticking = false;
    if (mode !== 'raf') return;
    const off = vh0 - slab.getBoundingClientRect().top, s = scrollY; // the view timeline's "cover" offset, and the page's scroll
    for (const t of tiles) {
      const p = Math.min(1, Math.max(0, (off - t.r0) / (t.r1 - t.r0))), q = 1 - p;
      t.el.style.transform = q ? `translate(${(t.sx * q).toFixed(1)}px,${(t.sy * q).toFixed(1)}px) rotate(${(t.sr * q).toFixed(2)}deg)` : '';
      t.el.style.setProperty('--sh', p < 0.7 ? '1' : ((1 - p) / 0.3).toFixed(3));
      t.el.style.setProperty('--cv', p < 0.82 ? '1' : ((1 - p) / 0.18).toFixed(3));
    }
    for (const t of tracks) put(t, Math.min(1, Math.max(0, (s - t.h0) / (t.h1 - t.h0))));
  };
  // Layout offsets from el up to an ancestor: transform-free, so a card still posting from the load sequence measures
  // where it will rest.
  const offs = (el, stop) => { let x = 0, y = 0; for (let e = el; e && e !== stop; e = e.offsetParent) { x += e.offsetLeft; y += e.offsetTop; } return [x, y]; };
  // The hand-off's tracks. Reads only; returns what to write. f = the pile's free field (viewport px), S0 = the scroll
  // at which the story starts (the stage's top at the bottom of the screen), run = the story's run.
  const handoff = (wide, f, S0, run) => {
    const T = [], add = (el, kind, h0, h1, v = {}) => { if (el) T.push({ el, kind, h0, h1: Math.max(h1, h0 + 1), tx: v.tx || 0, ty: v.ty || 0, tr: v.tr || 0, ts: v.ts ?? 1, o0: v.o0 ?? 1, o1: v.o1 ?? 0, origin: v.origin }); };
    const sy = scrollY, cr = hc.getBoundingClientRect(), [qx, qy] = offs(H.hq, H.full), qh = H.hq.offsetHeight;
    // The chip hugs the question on one line; if the question wraps (narrow phones), the chip takes its width and wraps
    // the same way.
    let qw = H.hq.offsetWidth;
    if (qh < 30) { const r = document.createRange(); r.selectNodeContents(H.hq); qw = Math.ceil(r.getBoundingClientRect().width / ((H.hq.getBoundingClientRect().width / qw) || 1)) + 1; }
    // u: the hand-off's own unit of scroll. The hero stops growing at 780px tall, so on a taller screen its lengths
    // stay what they are at 900 instead of stretching with the window (which used to leave the chip no room to travel).
    const u = Math.min(vh0, 900), top0 = cr.top + sy, full = Math.max(0, cr.bottom + sy + 16 - vh0); // full: the whole card is on screen
    const cw = qw + 24, chh = qh + 16, e1 = S0 + 0.96 * run;
    let ho = wide && f.R - f.L >= cw + 16 && f.B - f.T >= chh + 16, b0, d1 = 0, e0 = 0;
    if (ho) {
      // The answer stays to be read until the card's top crosses 38% of the screen, or earlier (never before 45%) so
      // the chip still has a real trip and lands in the pile as the pieces start to leave (S0 + .10 run); and never
      // within the first wheel notch or so after the whole card is in view (.12u). On a tall screen, where the story
      // starts almost at once, the chip lands later and joins the pieces in flight; on a very tall one (a portrait
      // monitor) there is no room for its second trip, and the hero gets the lighter version.
      b0 = Math.max(full + 0.12 * u, Math.min(top0 - 0.38 * vh0, Math.max(top0 - 0.45 * vh0, S0 + 0.10 * run - 0.45 * u)));
      d1 = Math.max(S0 + 0.10 * run, b0 + 0.45 * u); // the trip into the pile: at least .3u long
      e0 = Math.max(S0 + 0.14 * run, d1 + 0.08 * u); // and it waits there for at least .08u, so the landing reads
      if (e1 - e0 < 0.3 * run) ho = false;
    }
    if (!ho) b0 = Math.max(full + 0.12 * u, top0 - 0.25 * vh0); // no travel: the answer stays until the card's top reaches 25% of the screen
    const c1 = b0 + 0.15 * u;
    // Depth: the nearer a plane, the faster it moves. The card (front) scrolls with the page; the slide lags a little
    // and recedes; the tile behind it lags most and recedes most, drifting a little apart.
    const plane = (w, v) => { const p = w?.firstElementChild; if (p?.offsetParent) add(w, 'hd-m', 0, ho ? 0.6 * u : c1, { ...v, origin: `${p.offsetLeft + p.offsetWidth / 2}px ${p.offsetTop + p.offsetHeight / 2}px` }); };
    plane(H.win, ho ? { ty: 20, ts: 0.95 } : { ty: 10, ts: 0.97 });
    plane(H.sat, ho ? { tx: 20, ty: 48, tr: 1.5, ts: 0.9 } : { tx: 10, ty: 24, tr: 1, ts: 0.95 });
    // The card sheds its answer: its two numbers go first; then the stamp and the sources; the question line lifts
    // out as a chip (it lights with a periwinkle edge, so it can be followed); and the card collapses into the chip,
    // scaled about the question toward the chip's own size (every row has gone by then, so the uneven scale shows
    // only as a white surface shrinking into the chip), and goes in the last 30%. It never shows as an empty frame.
    const [Wc, Hc] = [H.full.offsetWidth, H.full.offsetHeight], ox = qx + qw / 2, oy = qy + qh / 2;
    const fx = Math.min(1, (cw / 2 - 4) / Math.max(ox, Wc - ox)), fy = Math.min(1, (chh / 2 - 4) / Math.max(oy, Hc - oy));
    add(H.body, 'hd-f', b0, b0 + 0.08 * u);
    H.rest.forEach((el) => add(el, 'hd-f', b0 + 0.04 * u, b0 + 0.085 * u));
    add(H.qc, 'hd-f', b0 + 0.06 * u, b0 + 0.09 * u, { o0: 0, o1: 1 });
    add(H.full, 'hd-fold', b0 + 0.07 * u, c1, { ts: `${fx.toFixed(4)} ${fy.toFixed(4)}`, origin: `${ox}px ${oy}px` });
    let eqo = '';
    if (ho && H.eq && H.out && H.card) {
      // Into the pile, level and on top of it; then with the pieces to the answer's question line.
      const sx = cr.left + ox, sy0 = cr.top + oy;
      const px = Math.min(Math.max(f.L + 0.40 * (f.R - f.L), f.L + cw / 2 + 8), f.R - cw / 2 - 8);
      const py = Math.min(Math.max(f.T + 0.34 * (f.B - f.T), f.T + chh / 2 + 8), f.B - chh / 2 - 8);
      const or = H.out.getBoundingClientRect(), [ex, ey] = offs(H.eq, H.out), [cx, cy] = offs(H.eq, H.card);
      add(H.q, 'hd-glide', c1, d1, { tx: px - sx, ty: py - sy0 });
      add(H.qm, 'hd-glide', e0, e1, { tx: or.left + ex + qw / 2 - px, ty: or.top + ey + qh / 2 - py });
      eqo = `${cx + qw / 2}px ${cy + qh / 2}px`; // the answer waits scaled about its question line (site.css .ho .eq-wait)
    }
    // The card stops taking the pointer once its rows have gone (its marks are what light the slide and the tile).
    return { tracks: T, hand: ho ? 'ho' : 'hl', qx, qy, qw, eqo, gone: Math.round(cr.bottom + sy - (b0 + 0.085 * u)) };
  };
  // Back home: once the answer has posted and the stage is past the post line, the chip fades into the card's own
  // question line; above the line it is back at once, on its way up.
  const home = (instant) => {
    const on = hand === 'ho' && atEnd && posted;
    if (on === root.classList.contains('q-home')) return;
    if (instant) H.qm.style.transition = 'none';
    root.classList.toggle('q-home', on);
    if (instant) { void H.qm.offsetWidth; H.qm.style.transition = ''; }
  };
  storyPosted = (instant) => { posted = true; if (H) home(instant); };
  const arm = () => {
    reset();
    if (reduce) return;
    lastW = innerWidth; lastH = innerHeight; vh0 = innerHeight;
    const wide = innerWidth > 1100;
    const els = [...slab.querySelectorAll('.piece')].filter((t) => t.offsetParent);
    // Read everything first, then write, so arming lays the page out once.
    const sTop = slab.getBoundingClientRect().top, ch = chapter.getBoundingClientRect(), wr = chapter.parentElement.getBoundingClientRect();
    const textR = Math.max(...[...chapter.children].map((c) => { const r = document.createRange(); r.selectNodeContents(c); return Math.max(0, ...[...r.getClientRects()].map((q) => q.right)); }));
    // The pile's field ends 30px above the stage, so pieces clear the stage's header line sooner on their way down.
    const fL = textR + 32, fR = wr.right - 40, fT = ch.top - 12, fB = sTop - 30, run = vh0 * 0.62;
    const rects = els.map((el) => el.getBoundingClientRect());
    // Narrow: each piece starts knocked loose inside its own card's content box, and never over the link under the
    // grid ("And 21 more"), so nothing it crosses on the way in is a live control or a label.
    const boxes = wide ? [] : els.map((el) => { const c = el.closest('.eq-in'); if (!c) return null; const q = c.getBoundingClientRect(), more = c.querySelector('.eq-more'); return { l: q.left + 8, r: q.right - 8, t: q.top + 8, b: more ? more.getBoundingClientRect().top - 4 : q.bottom - 8 }; });
    tiles = els.map((el, i) => {
      const r = rects[i], cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      let sx, sy, sr, r0, r1;
      if (wide) {
        const [px, py, deg] = PILE[i % PILE.length];
        // clamped so the whole piece starts inside the field: never over the heading, the line under it or the stage
        const tx = Math.min(Math.max(fL + px * (fR - fL), fL + r.width / 2), fR - r.width / 2);
        const ty = Math.min(Math.max(fT + py * (fB - fT), fT + r.height / 2), fB - r.height / 2);
        sx = tx - cx; sy = ty - cy; sr = deg;
        const k = els.length > 1 ? i / (els.length - 1) : 0;
        r0 = run * 0.03 * (i % 5); r1 = run * (0.74 + 0.24 * k);
      } else {
        [sx, sy, sr] = LOOSE[i % LOOSE.length];
        const bx = boxes[i];
        if (bx) {
          sx = Math.min(Math.max(sx, bx.l - r.left), bx.r - r.right);
          if (r.bottom <= bx.b) sy = Math.min(Math.max(sy, bx.t - r.top), bx.b - r.bottom);
        }
        const oy = r.top - sTop; r0 = Math.max(0, oy - 60); r1 = oy + vh0 * 0.42;
      }
      return { el, sx, sy, sr, r0, r1 };
    });
    const ho = H && handoff(wide, { L: fL, R: fR, T: fT, B: fB }, sTop + scrollY - vh0, run);
    atEnd = sTop < vh0 * 0.38;
    tiles.forEach((t) => {
      const st = t.el.style;
      st.setProperty('--sx', `${t.sx.toFixed(1)}px`); st.setProperty('--sy', `${t.sy.toFixed(1)}px`); st.setProperty('--sr', `${t.sr}deg`);
      st.setProperty('--r0', `${t.r0.toFixed(0)}px`); st.setProperty('--r1', `${t.r1.toFixed(0)}px`);
      t.el.classList.add('fly');
    });
    if (ho) {
      tracks = ho.tracks; hand = ho.hand;
      const qs = H.q.style; qs.setProperty('--qx', `${ho.qx}px`); qs.setProperty('--qy', `${ho.qy}px`); qs.setProperty('--qw', `${ho.qw}px`);
      if (ho.eqo) H.card.style.transformOrigin = ho.eqo;
      tracks.forEach((t) => {
        const st = t.el.style;
        if (t.origin) st.transformOrigin = t.origin;
        if (!css) { if (t.kind !== 'hd-f') st.willChange = 'transform'; return; } // the rows only fade: left unpromoted
        st.setProperty('--h0', `${t.h0.toFixed(0)}px`); st.setProperty('--h1', `${t.h1.toFixed(0)}px`);
        st.setProperty('--tx', `${t.tx.toFixed(1)}px`); st.setProperty('--ty', `${t.ty.toFixed(1)}px`); st.setProperty('--tr', `${t.tr}deg`);
        st.setProperty('--ts', String(t.ts)); st.setProperty('--to', String(t.o1));
        t.el.classList.add(t.kind);
      });
      root.classList.add(hand);
      home(true);
      if ('IntersectionObserver' in window) watchFold(ho.gone);
    }
    if (css) { mode = 'css'; root.classList.add('armed'); } else { mode = 'raf'; frame(); }
  };
  addEventListener('scroll', () => { if (mode === 'raf' && !ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  arm();
  if (H && 'IntersectionObserver' in window) new IntersectionObserver(([e]) => { atEnd = e.boundingClientRect.top < innerHeight * 0.38; home(false); }, { rootMargin: '0px 0px -62% 0px' }).observe(slab);
  document.fonts?.ready.then(() => { if (mode !== 'off') arm(); });
  let rt;
  // Desktop (>1100) re-measures on a height change too, whatever mode it is in, so a window that passed through a very
  // tall size comes back to the hand-off; phones and tablets never do (a URL bar collapsing is not a new layout).
  addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { if (innerWidth !== lastW || (innerWidth > 1100 && innerHeight !== lastH)) arm(); }, 150); }, { passive: true });
  onReduce(() => setTimeout(arm));
}

/* ---------- homepage: the answer posts, then its first source opens once ---------- */
// By time, never scrubbed (site.css "homepage motion" 3). Wide: when the stage's top crosses 38% of the screen, where
// the story ends. Up to 1100px: when the card itself reaches 85% of the screen. Already past at load (a reload
// mid-page), under reduced motion or ?still, or when focus arrives first: posted and open from the start, at rest. It
// never un-posts. The source chips are disclosures (aria-expanded, aria-controls): one note open at a time; Escape or a
// click outside closes it, and focus stays on the chip. No focus trap: it is a note, not a dialog.
function initPost() {
  const slab = document.querySelector('[data-story]'), card = slab?.querySelector('.ic-eq');
  const pops = { a: document.getElementById('pop-a'), b: document.getElementById('pop-b') };
  const trig = { a: card?.querySelector('.c-a'), b: card?.querySelector('.c-b') };
  if (!card || !pops.a || !pops.b || !trig.a || !trig.b) return;
  const keys = ['a', 'b'];
  // The notes open and close on transitions ([data-open], site.css), so a quick second click turns one around from
  // wherever it is instead of restarting. [hidden] comes off before it opens and goes back on once it has closed
  // (openLayer, closeLayer). animate=false lands it at once.
  const setPop = (k, open, animate = true) => {
    const p = pops[k];
    trig[k].setAttribute('aria-expanded', String(open));
    const still = !animate || reduce;
    if (still) p.style.transition = 'none';
    if (open) openLayer(p);
    else if (still) { clearTimeout(p._t); delete p.dataset.open; p.hidden = true; }
    else closeLayer(p);
    if (still) { void p.offsetWidth; p.style.transition = ''; }
  };
  keys.forEach((k) => trig[k].addEventListener('click', () => {
    const open = trig[k].getAttribute('aria-expanded') !== 'true';
    if (open) { setPop(k === 'a' ? 'b' : 'a', false); track('source_opened', { source: k === 'a' ? 'what_you_know' : 'what_people_say' }); }
    setPop(k, open);
  }));
  // Escape and a click outside close what is open; a note held for the post (below) stays held.
  const closeOpen = () => keys.forEach((k) => { if (isOpen(pops[k])) setPop(k, false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') closeOpen(); });
  document.addEventListener('click', (e) => { if (!e.target.closest?.('.ic-eq .insight-src,.pop')) closeOpen(); });
  // Each note's caret sits under the chip it explains: --pb places note B (wide); --pac and --pbc place the carets
  // where the notes sit in the card's flow (up to 1100px). If the chips ever wrap onto two rows (very narrow screens),
  // a caret could point at the wrong chip, so the carets go (.src-wrap) and the open chip's own fill shows the link.
  const place = () => {
    const c = card.getBoundingClientRect(), a = trig.a.getBoundingClientRect(), b = trig.b.getBoundingClientRect(), pad = parseFloat(getComputedStyle(card).paddingLeft) || 0;
    pops.b.style.setProperty('--pb', `${Math.round(b.left - c.left)}px`);
    pops.a.style.setProperty('--pac', `${Math.max(14, Math.round(a.left - c.left - pad + 14))}px`);
    pops.b.style.setProperty('--pbc', `${Math.max(14, Math.round(b.left - c.left - pad + 14))}px`);
    card.classList.toggle('src-wrap', b.top > a.top + 4);
  };
  place();
  addEventListener('resize', place, { passive: true });
  document.fonts?.ready.then(place);

  let posted = false, io = null;
  const atRest = (els) => { els.forEach((el) => { el.style.transition = 'none'; }); requestAnimationFrame(() => requestAnimationFrame(() => els.forEach((el) => { el.style.transition = ''; }))); };
  const post = (instant) => {
    if (posted) return;
    posted = true; io?.disconnect();
    storyPosted(instant); // the hand-off's question chip fades into the card's own question line (initStory)
    if (instant) { atRest([card, slab.querySelector('.op-eq')].filter(Boolean)); slab.classList.remove('eq-wait'); setPop('a', true, false); return; }
    slab.classList.remove('eq-wait'); slab.classList.add('eq-play');
    setTimeout(() => { if (trig.b.getAttribute('aria-expanded') !== 'true' && !card.contains(document.activeElement)) setPop('a', true); }, 960); // after the marks have swept
  };
  if (reduce || !('IntersectionObserver' in window)) return post(true);
  const narrow = innerWidth <= 1100, target = narrow ? card : slab, line = narrow ? 0.85 : 0.38;
  if (target.getBoundingClientRect().top <= innerHeight * line) return post(true);
  // Waiting: note A keeps its place in the layout but can't be seen (closed, never [hidden]), so when it opens after the
  // post it only fades in, and nothing below it moves while the reader holds still.
  slab.classList.add('eq-wait');
  trig.a.setAttribute('aria-expanded', 'false'); pops.a.style.transition = 'none'; delete pops.a.dataset.open; void pops.a.offsetWidth; pops.a.style.transition = '';
  io = new IntersectionObserver((es) => { const e = es[0]; if (e.isIntersecting || e.boundingClientRect.top < innerHeight * line) post(false); }, { rootMargin: `0px 0px -${Math.round((1 - line) * 100)}% 0px` });
  io.observe(target);
  slab.addEventListener('focusin', () => post(true));
  onReduce(() => { if (reduce) post(true); });
}

/* ---------- homepage: Real answers, a track you move yourself ---------- */
// Native swipe and scroll-snap. The arrows, and ArrowLeft/ArrowRight while the track (or a slide in it) has focus, step
// one slide: smoothly, or at once under reduced motion. The count follows the nearest snap position. There is no
// timer and no autoplay. The arrows use aria-disabled at either end, so focus never drops to the page. Each slide's
// chart draws once as it comes into view (site.css "homepage motion" 4).
function initTrack() {
  const rail = document.querySelector('[data-track]');
  if (!rail) return;
  const slides = [...rail.querySelectorAll('.aslide-w')];
  const arrows = [...document.querySelectorAll(`.arw[aria-controls="${rail.id}"]`)];
  const prev = arrows.find((b) => b.dataset.dir === '-1'), next = arrows.find((b) => b.dataset.dir === '1');
  const cur = document.querySelector('[data-cur]');
  if (slides.length < 2) return;
  // Snap positions match the CSS: centered slides on desktop, start-aligned (last one end-aligned) on phones.
  const snaps = () => {
    const max = rail.scrollWidth - rail.clientWidth, pad = slides[0].offsetLeft;
    const center = getComputedStyle(slides[0]).scrollSnapAlign.includes('center');
    return slides.map((s, i) => (center
      ? Math.max(0, Math.min(max, Math.round(s.offsetLeft + s.offsetWidth / 2 - rail.clientWidth / 2)))
      : i === slides.length - 1 ? max : Math.min(max, s.offsetLeft - pad)));
  };
  const idx = () => { const p = snaps(), x = rail.scrollLeft; let best = 0; p.forEach((v, i) => { if (Math.abs(v - x) < Math.abs(p[best] - x)) best = i; }); return best; };
  // Desktop (centered snapping) opens on the middle slide, so the neighbors peek evenly on both sides; phones start
  // at the first slide. The count and arrows follow through sync().
  const start = slides.length >= 3 && getComputedStyle(slides[0]).scrollSnapAlign.includes('center') ? Math.floor(slides.length / 2) : 0;
  let shown = start;
  const sync = () => {
    const i = idx();
    if (cur && cur.textContent !== String(i + 1)) cur.textContent = String(i + 1);
    prev?.setAttribute('aria-disabled', String(i === 0));
    next?.setAttribute('aria-disabled', String(i === slides.length - 1));
    if (i !== shown) { shown = i; track('answer_slide_viewed', { slide: i + 1 }); }
  };
  let raf = 0;
  rail.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(sync); }, { passive: true });
  const go = (d) => { const p = snaps(), i = Math.max(0, Math.min(slides.length - 1, idx() + d)); rail.scrollTo({ left: p[i], behavior: reduce ? 'auto' : 'smooth' }); return i; };
  arrows.forEach((b) => b.addEventListener('click', () => { if (b.getAttribute('aria-disabled') !== 'true') go(+b.dataset.dir); }));
  rail.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const i = go(e.key === 'ArrowRight' ? 1 : -1);
    if (e.target !== rail) slides[i].querySelector('a')?.focus({ preventScroll: true }); // a focused slide hands focus along
  });
  // Tab into a slide that only peeks: the track brings it into view (the count and arrows follow through sync), so
  // focus never sits on a half-hidden card.
  rail.addEventListener('focusin', (e) => {
    const w = e.target.closest?.('.aslide-w');
    if (!w) return;
    const i = slides.indexOf(w), p = snaps(), r = w.getBoundingClientRect(), b = rail.getBoundingClientRect();
    if (i < 0 || (r.left >= b.left - 1 && r.right <= b.right + 1)) return;
    rail.scrollTo({ left: p[i], behavior: reduce ? 'auto' : 'smooth' });
  });
  addEventListener('resize', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(sync); }, { passive: true });
  if (start) rail.scrollTo({ left: snaps()[start], behavior: 'auto' });
  sync();
  if (reduce || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); e.target.classList.remove('wait'); } }), { threshold: 0.35 });
  const vw = document.documentElement.clientWidth;
  slides.forEach((s) => { const r = s.getBoundingClientRect(); if (r.top > innerHeight * 0.85 || r.left >= vw) { s.classList.add('wait'); io.observe(s); } });
  onReduce(() => { if (reduce) slides.forEach((s) => s.classList.remove('wait')); });
}

/* ---------- homepage: How, once at 30% visible ---------- */
// The chain draws down and the three windows fan out of one stack (site.css "homepage motion" 5). Only when it starts
// below the fold; never under reduced motion.
function initHow() {
  if (reduce || !('IntersectionObserver' in window)) return;
  document.querySelectorAll('.how-g').forEach((el) => {
    if (el.getBoundingClientRect().top < innerHeight * 0.85) return;
    el.classList.add('wait');
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); el.classList.remove('wait'); } }, { threshold: 0.3 });
    io.observe(el);
    onReduce(() => { if (reduce) { io.disconnect(); el.classList.remove('wait'); } });
  });
}

/* ---------- one-shot draw-ons on inner pages: [data-once] (step chains, the Try it free sample) ---------- */
// The markup is the end state. Under no-preference, an element that starts below the fold waits (.wait) until 35% of
// it is on screen, then plays once from CSS transitions. Tabbing into a waiting element shows it at once.
function initOnce() {
  if (reduce || !('IntersectionObserver' in window)) return;
  const els = [...document.querySelectorAll('[data-once]')].filter((el) => el.getBoundingClientRect().top > innerHeight * 0.85);
  if (!els.length) return;
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.intersectionRatio >= 0.35 || (e.isIntersecting && e.boundingClientRect.top < innerHeight * 0.5)) show(e.target); }), { threshold: [0, 0.35] });
  const show = (el) => { io.unobserve(el); el.classList.remove('wait'); };
  els.forEach((el) => { el.classList.add('wait'); io.observe(el); });
  document.addEventListener('focusin', (e) => { const w = e.target.closest('[data-once].wait'); if (w) show(w); });
  onReduce(() => { if (reduce) els.forEach(show); });
}

/* ---------- small page helpers (kept here so the CSP needs no inline scripts) ---------- */
function initPageHelpers() {
  document.querySelectorAll('[data-yt]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    const f = document.createElement('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${a.dataset.yt}?autoplay=1`; f.title = a.getAttribute('aria-label') || 'Video'; f.allow = 'autoplay; encrypted-media; picture-in-picture'; f.allowFullscreen = true;
    a.replaceChildren(f); track('video_played', { id: a.dataset.yt });
  }));
  // Pre-pick the question: ?start=<value>, or ?from=<report> (a deck's "Try it out for free") for the closest one.
  // Older links (?start=agency_check, agency-check or content_report) land on "What worked" when the form has no such
  // value. An unknown value picks nothing. The pick is made with no transition (initForms keeps the first frames still).
  const q = new URLSearchParams(location.search);
  const fromReport = { 'content-report': 'what_worked', 'audience-report': 'audience_report', 'market-report': 'not_sure', 'agency-check': 'what_worked' };
  const older = { agency_check: 'what_worked', 'agency-check': 'what_worked', content_report: 'what_worked' };
  const v = q.get('start') || fromReport[q.get('from') || ''] || '';
  if (v) {
    document.querySelectorAll('select[name=start_with]').forEach((sel) => {
      const pick = [v, older[v]].find((x) => x && [...sel.options].some((o) => o.value === x));
      if (pick) sel.value = pick;
    });
    document.querySelectorAll('form').forEach((f) => {
      const radios = [...f.querySelectorAll('input[type=radio][name=start_with]')];
      const pick = [v, older[v]].map((x) => radios.find((r) => r.value === x)).find(Boolean);
      if (pick && !radios.some((r) => r.checked)) { pick.checked = true; pick.dispatchEvent(new Event('change', { bubbles: true })); }
    });
  }
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
  // Escape first, then allow only links to this site, plus BOOK_URL wherever it points (/api/ask links "Book a call"
  // to it), and **bold**.
  const book = esc(BOOK);
  return esc(t).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, label, href) => (/^\/(?!\/)/.test(href) || href === book ? `<a href="${href}">${label}</a>` : m)).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
}
function initAsk() {
  const root = document.querySelector('[data-ask]');
  if (!root) return;
  const btn = root.querySelector('[data-ask-open]'), panel = root.querySelector('#ask-panel'), log = root.querySelector('[data-ask-log]'), form = root.querySelector('[data-ask-form]'), input = form.querySelector('input');
  // Openers: the floating button, plus the header icon (901px to 1471px) and the menu row, which stand in for it
  // wherever it would sit over the page. Closing returns focus to whichever opened it, or to the burger when that was
  // the menu row (the menu has closed by then).
  const openers = [...document.querySelectorAll('[data-ask-open]')];
  const history = [];
  let busy = false, opener = btn;
  // Opened from the header icon, the panel drops from under that icon (top right), not from the far corner.
  let navT;
  const anchor = (o) => {
    clearTimeout(navT);
    const nav = !!o?.closest('.nav');
    root.classList.toggle('from-nav', nav);
    if (!nav) return;
    const r = o.getBoundingClientRect();
    root.style.setProperty('--ask-top', `${Math.round(r.bottom + 12)}px`);
    root.style.setProperty('--ask-right', `${Math.max(12, Math.round(document.documentElement.clientWidth - r.right))}px`);
  };
  const set = (open, from) => {
    if (open === isOpen(panel)) return;
    if (open) { opener = from || btn; anchor(opener); openLayer(panel); } else { closeLayer(panel); navT = setTimeout(() => { if (!isOpen(panel)) root.classList.remove('from-nav'); }, 260); }
    openers.forEach((o) => o.setAttribute('aria-expanded', String(open)));
    syncAsk(); layersChanged(); // first, so the layer is visible (focusable) before focus moves into it
    if (open) { input.focus({ preventScroll: true }); track('ask_opened', { via: opener === btn ? 'float' : opener.closest('.sheet') ? 'menu' : 'nav' }); }
  };
  const back = () => {
    const burger = document.querySelector('[data-burger]');
    const to = opener && opener !== btn && opener.offsetParent && !opener.closest('[hidden],[inert]') ? opener : opener?.closest('.sheet') && burger?.offsetParent ? burger : btn;
    to.focus({ preventScroll: true });
  };
  // The menu row closes the menu first (initMenu, on the same click), and the page stops being inert; open after that.
  openers.forEach((o) => o.addEventListener('click', () => (o.closest('.sheet') ? setTimeout(() => set(true, o)) : set(!isOpen(panel), o))));
  root.querySelector('[data-ask-close]').addEventListener('click', () => { set(false); back(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen(panel)) { set(false); back(); } });
  // Step away instead of covering what matters. Below 1472px the floating button would sit over the text in the side
  // gutter, so it stays away there (the header and the menu carry Ask instead). From 1472px it steps away only while
  // the hero, a form, the Close or the footer is underneath it: the observer watches the bottom quarter of the
  // viewport, where it sits. The menu, and on phones the cookie banner, always send it away; nothing else does while
  // someone is using the keyboard, so Tab can always reach it (it comes after the footer).
  const under = new Set(), narrow = matchMedia('(max-width:1471px)'), phone = matchMedia('(max-width:900px)'), html = document.documentElement.classList;
  syncAsk = () => {
    const keep = isOpen(panel) || root.contains(document.activeElement);
    const always = html.contains('menu-open') || (phone.matches && html.contains('consent-open'));
    const reading = under.size > 0 || narrow.matches;
    root.classList.toggle('away', !keep && (always || (reading && !html.contains('using-keys'))));
  };
  addEventListener('keydown', (e) => { if (e.key === 'Tab' && !html.contains('using-keys')) { html.add('using-keys'); syncAsk(); } }, true);
  addEventListener('pointerdown', () => { if (html.contains('using-keys')) { html.remove('using-keys'); syncAsk(); } }, { capture: true, passive: true });
  // The markup starts .away, so nothing shows and then leaves on load: the observer's first report, which arrives
  // once per target, decides whether it comes in.
  // [data-ask-away] marks anything else the button must never cover (the thanks page's booking button).
  // The tools strip and the Real answers chapter run full bleed, so the button would sit on a chip or a slide there.
  const targets = document.querySelectorAll('.hero-p,form[data-lead],.close,.foot,.tools,#answers,[data-ask-away]');
  if ('IntersectionObserver' in window && targets.length) {
    const io = new IntersectionObserver((es) => { es.forEach((e) => (e.isIntersecting ? under.add(e.target) : under.delete(e.target))); syncAsk(); }, { rootMargin: '-75% 0px 0px 0px' });
    targets.forEach((el) => io.observe(el));
  } else syncAsk();
  root.addEventListener('focusin', syncAsk);
  root.addEventListener('focusout', () => setTimeout(syncAsk));
  narrow.addEventListener?.('change', syncAsk);
  phone.addEventListener?.('change', syncAsk);
  const add = (cls, html) => { const p = document.createElement('p'); p.className = `ask-m ${cls}`; p.innerHTML = html; log.appendChild(p); log.scrollTop = log.scrollHeight; return p; };
  const ask = async (q) => {
    if (busy || !q.trim()) return;
    busy = true;
    // The suggestion chips go once a question is asked; if focus was on one, it moves to the field, not to <body>.
    const sugg = root.querySelector('.ask-sugg');
    if (sugg?.contains(document.activeElement)) input.focus({ preventScroll: true });
    sugg?.remove();
    add('u', esc(q)); history.push({ role: 'user', content: q });
    const wait = add('a wait', 'Checking the site…');
    track('ask_question', { length: q.length });
    try {
      const res = await fetch(cfg.askEndpoint || '/api/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: history }) });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || String(res.status));
      wait.classList.remove('wait'); wait.innerHTML = mdLite(data.answer);
      log.scrollTop += wait.getBoundingClientRect().top - log.getBoundingClientRect().top - 8; // show the start of the answer, not its end
      history.push({ role: 'assistant', content: data.answer });
      wait.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => track('ask_link_clicked', { href: a.getAttribute('href') })));
    } catch {
      wait.classList.remove('wait');
      wait.innerHTML = `I can’t answer right now. <a href="/faq">Try the FAQ</a> or <a href="${esc(BOOK)}">book a call</a>.`;
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
  initBook();
  initReveals();
  initInsight();
  initScroll();
  initMenu();
  initForms();
  initCounts();
  initFilters();
  initHashLinks();
  initMisc();
  initDecks();
  initTurnstile();
  initPrefill();
  initPrefillForm();
  initHeard();
  initChecklist();
  initToc();
  initStepper();
  initUnlit();
  initStory();
  initPost();
  initTrack();
  initHow();
  initOnce();
  initAsk();
  initPageHelpers();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
