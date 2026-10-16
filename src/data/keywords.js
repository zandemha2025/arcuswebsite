// One target query per indexable URL. Every `primary` is unique across the map so pages never compete
// with each other for the same search. `secondary` are close variants the same page should also answer.
// intent: 'informational' | 'commercial' | 'transactional' | 'navigational'
export const KEYWORDS = {
  // Core pages
  '/': { primary: 'marketing intelligence for entertainment brands', secondary: ['find wasted marketing spend', 'connect marketing data and social listening in one place', 'marketing measurement for lifestyle brands'], intent: 'commercial' },
  '/how-it-works': { primary: 'how to connect all your marketing data in one place', secondary: ['marketing data lake for brands', 'how holdout testing works for brands', 'done for you marketing analytics'], intent: 'informational' },
  '/listening': { primary: 'connect social listening to sales', secondary: ['reddit and tiktok social listening for brands', 'audience listening across discord twitch and reddit', 'social listening with first-party data'], intent: 'commercial' },
  '/free-report': { primary: 'free marketing analysis for entertainment brands', secondary: ['free marketing audit for brands', 'find out which marketing spend worked for free', 'try arcus free'], intent: 'transactional' },
  '/pricing': { primary: 'marketing measurement service pricing', secondary: ['marketing data lake cost', 'social listening service cost', 'how much does marketing measurement cost'], intent: 'commercial' },
  '/book': { primary: 'book an arcus walkthrough', secondary: ['talk to arcus', 'arcus demo'], intent: 'navigational' },
  '/about': { primary: 'arcus marketing intelligence company', secondary: ['who runs arcus usearcus.ai', 'arcus team'], intent: 'navigational' },
  '/security': { primary: 'how arcus handles brand data', secondary: ['arcus security', 'marketing data access permissions for vendors'], intent: 'navigational' },
  '/faq': { primary: 'arcus faq', secondary: ['what does arcus do', 'arcus questions'], intent: 'navigational' },
  '/make-the-case': { primary: 'how to get budget for marketing measurement', secondary: ['convince cfo to fund marketing measurement', 'pitch a marketing data project to leadership'], intent: 'commercial' },

  // Reports
  '/reports': { primary: 'real marketing intelligence report examples', secondary: ['sample social listening report', 'example audience research report'], intent: 'commercial' },
  '/reports/content-report': { primary: 'content performance report for social posts', secondary: ['which social posts get shared', 'content archetype analysis', 'what content to make next report'], intent: 'commercial' },
  '/reports/audience-report': { primary: 'audience language report', secondary: ['how young men talk online report', 'audience research for streaming services', 'fan conversation analysis'], intent: 'commercial' },
  '/reports/market-report': { primary: 'dtc to retail expansion research', secondary: ['what happens when online brands launch in stores', 'retail launch market report', 'skincare brand retail expansion case study'], intent: 'commercial' },

  // Industries
  '/for': { primary: 'marketing measurement by industry', secondary: ['who uses arcus', 'marketing intelligence for consumer brands'], intent: 'commercial' },
  '/for/spirits-and-beverage': { primary: 'beverage brand marketing measurement', secondary: ['spirits marketing measurement', 'hard seltzer social listening', 'which videos sold cases'], intent: 'commercial' },
  '/for/studios-and-streaming': { primary: 'film marketing social listening', secondary: ['streaming service marketing measurement', 'trailer performance and ticket sales', 'tv tune-in campaign measurement'], intent: 'commercial' },
  '/for/games-and-music': { primary: 'game marketing measurement', secondary: ['measure streamer sponsorship results', 'music marketing audience insights', 'which creators sold game copies'], intent: 'commercial' },
  '/for/fashion-and-beauty': { primary: 'beauty brand influencer measurement', secondary: ['fashion brand marketing measurement', 'skincare social listening', 'creator code results for beauty brands'], intent: 'commercial' },

  // Compare
  '/compare': { primary: 'marketing measurement alternatives compared', secondary: ['marketing measurement tools compared', 'compare marketing measurement options'], intent: 'commercial' },
  '/compare/analytics-software': { primary: 'marketing analytics software vs done for you service', secondary: ['analytics tool or measurement partner', 'do I need marketing analytics software'], intent: 'commercial' },
  '/compare/hiring-a-data-team': { primary: 'hire marketing data team or outsource', secondary: ['marketing analyst vs measurement service', 'cost of building a marketing data team'], intent: 'commercial' },
  '/compare/haus': { primary: 'haus alternative', secondary: ['haus incrementality alternative for brand marketers', 'haus vs arcus'], intent: 'commercial' },
  '/compare/hex': { primary: 'hex alternative for marketers', secondary: ['hex vs arcus', 'hex for marketing reporting'], intent: 'commercial' },
  '/compare/iris': { primary: 'iris alternative', secondary: ['iris vs arcus', 'iris marketing measurement alternative'], intent: 'commercial' },
  '/compare/northbeam': { primary: 'northbeam alternative', secondary: ['northbeam alternative for retail brands', 'northbeam vs arcus'], intent: 'commercial' },

  // Library
  '/library': { primary: 'marketing measurement guides for brand marketers', secondary: ['marketing measurement articles', 'brand marketing guides'], intent: 'informational' },
  '/library/first-party-data-for-brand-marketers': { primary: 'first-party data for brand marketers', secondary: ['what to do with first-party data', 'first-party data examples for brands'], intent: 'informational' },
  '/library/incrementality-without-the-math': { primary: 'incrementality explained for marketers', secondary: ['incrementality for non-technical marketers', 'what incrementality means in marketing', 'how to test before moving marketing budget'], intent: 'informational' },
  '/library/social-listening-that-counts': { primary: 'how to do social listening right', secondary: ['social listening mistakes', 'counting social conversations'], intent: 'informational' },
  '/library/which-posts-actually-work': { primary: 'how to tell which social posts work', secondary: ['measure social post performance beyond views', 'which posts drive sales'], intent: 'informational' },
  '/library/do-you-need-a-data-team': { primary: 'do I need a data team for marketing', secondary: ['marketing data team checklist', 'when to hire a marketing analyst'], intent: 'informational' },
  '/library/what-a-42x-view-gap-says-about-brand-voice': { primary: 'brand voice on social media for gen z', secondary: ['should brands use slang on social', 'brand voice view gap'], intent: 'informational' },
  '/library/how-young-audiences-write': { primary: 'how gen z writes online', secondary: ['young audience slang in comments', 'how young men talk online'], intent: 'informational' },
  '/library/facebook-watches-but-doesnt-share': { primary: 'facebook videos views but no shares', secondary: ['what to post on facebook vs tiktok', 'cross-platform content strategy by platform'], intent: 'informational' },
  '/library/watched-vs-shared-share-rate': { primary: 'share rate vs view rate', secondary: ['content that gets shared vs watched', 'hosting hack content pattern'], intent: 'informational' },
  '/library/does-retail-eat-online-sales': { primary: 'does retail cannibalize online sales', secondary: ['dtc brands moving into retail', 'online sales after retail launch'], intent: 'informational' },

  // Glossary
  '/glossary': { primary: 'marketing measurement glossary', secondary: ['attribution terms explained', 'marketing measurement definitions', 'campaign recap terms explained'], intent: 'informational' },
  '/glossary/attribution': { primary: 'what is marketing attribution', secondary: ['attribution definition marketing', 'attribution models explained'], intent: 'informational' },
  '/glossary/incrementality': { primary: 'what is incrementality in marketing', secondary: ['incrementality definition', 'incremental sales meaning'], intent: 'informational' },
  '/glossary/double-counting': { primary: 'double counting in marketing attribution', secondary: ['double counting definition marketing', 'over attribution', 'two channels taking credit for the same sale'], intent: 'informational' },
  '/glossary/holdout-test': { primary: 'what is a holdout test', secondary: ['geo holdout test', 'regions on regions off test', 'holdout group marketing'], intent: 'informational' },
  '/glossary/roas': { primary: 'what is roas', secondary: ['return on ad spend meaning', 'is roas misleading'], intent: 'informational' },
  '/glossary/view-through-conversion': { primary: 'what is a view-through conversion', secondary: ['view through attribution', 'view-through conversions inflated', 'are view-through conversions real results'], intent: 'informational' },
  '/glossary/conversion-window': { primary: 'what is a conversion window', secondary: ['attribution window length', 'lookback window marketing'], intent: 'informational' },
  '/glossary/last-click': { primary: 'last click attribution', secondary: ['last-click attribution problems', 'last touch attribution'], intent: 'informational' },
  '/glossary/brand-search': { primary: 'branded search attribution', secondary: ['brand search ads credit', 'branded keywords incrementality'], intent: 'informational' },
  '/glossary/creator-code': { primary: 'what is a creator code', secondary: ['influencer discount code tracking', 'creator code attribution'], intent: 'informational' },
  '/glossary/first-party-data': { primary: 'what is first-party data', secondary: ['first party data definition', 'first-party vs zero-party data'], intent: 'informational' },
  '/glossary/third-party-data': { primary: 'what is third-party data', secondary: ['third party data definition', 'first-party vs third-party data'], intent: 'informational' },
  '/glossary/social-listening': { primary: 'what is social listening', secondary: ['social listening definition', 'social listening vs social monitoring'], intent: 'informational' },
  '/glossary/media-mix-modeling': { primary: 'what is media mix modeling', secondary: ['mmm marketing meaning', 'marketing mix model explained'], intent: 'informational' },
  '/glossary/share-rate': { primary: 'what is share rate', secondary: ['share rate formula', 'shares per view'], intent: 'informational' },
  '/glossary/engagement-rate': { primary: 'what is engagement rate', secondary: ['engagement rate formula', 'is engagement rate a good metric'], intent: 'informational' },
  '/glossary/reach-vs-impressions': { primary: 'reach vs impressions', secondary: ['difference between reach and impressions', 'impressions meaning'], intent: 'informational' },
  '/glossary/brand-lift-study': { primary: 'what is a brand lift study', secondary: ['brand lift survey', 'brand lift measurement'], intent: 'informational' },
  '/glossary/retail-media': { primary: 'what is retail media', secondary: ['retail media networks explained', 'retail media measurement'], intent: 'informational' },
  '/glossary/sell-through': { primary: 'what is sell-through', secondary: ['sell-through rate', 'sell-in vs sell-through'], intent: 'informational' },
  '/glossary/creator-whitelisting': { primary: 'what is creator whitelisting', secondary: ['influencer whitelisting', 'creator licensing for ads'], intent: 'informational' },
  '/glossary/sentiment': { primary: 'what is sentiment analysis in social listening', secondary: ['social sentiment accuracy', 'brand sentiment meaning'], intent: 'informational' },

  // Hubs
  '/integrations': { primary: 'marketing measurement integrations', secondary: ['connect ad accounts to sales data', 'tools arcus connects to'], intent: 'commercial' },
  '/research': { primary: 'brand marketing research from real data', secondary: ['social listening research', 'audience research findings'], intent: 'informational' },
  '/newsletter': { primary: 'the receipts newsletter', secondary: ['newsletter for brand marketers', 'marketing measurement newsletter'], intent: 'navigational' },
  '/partners': { primary: 'arcus partner program', secondary: ['marketing measurement partner program', 'refer brands to arcus'], intent: 'navigational' },
  '/press': { primary: 'arcus press', secondary: ['arcus news', 'arcus media kit'], intent: 'navigational' },
  '/events': { primary: 'live marketing campaign teardown', secondary: ['arcus events', 'arcus live teardown', 'brand marketing measurement webinar'], intent: 'informational' },
};

// Generated families: one query per programmatic page.
import { INTEGRATIONS, CHANNELS } from './programmatic.js';
import { ISSUES } from './newsletter.js';
import { TEAM } from './site.js';
// Integrations: "connect <name> data to your sales" (SPINE-v2 §7), worded per category where that template
// doesn't fit (a sales system is the sales; a work tool is where files live or answers land).
const integrationQuery = (i) => {
  const n = i.name.toLowerCase();
  if (i.category === 'Sales and ticketing') return { primary: `connect ${n} sales to your marketing data`, secondary: [`${n} sales next to marketing data`, `${n} marketing measurement`] };
  if (i.category === 'Work tools') return { primary: `connect ${n} to your marketing data`, secondary: [`${n} marketing reporting`, `${n} marketing measurement`] };
  return { primary: `connect ${n} data to your sales`, secondary: [`${n} reporting next to sales data`, `${n} marketing measurement`] };
};
for (const i of INTEGRATIONS) KEYWORDS[`/integrations/${i.slug}`] ??= { ...integrationQuery(i), intent: 'commercial' };
// Channel guides: `query` is the target ("how to tell if <platform> ads are working"); the title is the fallback.
for (const c of CHANNELS) KEYWORDS[`/library/${c.slug}`] ??= { primary: c.query || c.title.toLowerCase().replace(/[?.]/g, ''), secondary: [], intent: 'informational' };
// Archived issues are live but noindex and out of the sitemap, so they get no target query.
for (const n of ISSUES) if (!n.archived) KEYWORDS[`/newsletter/${n.slug}`] ??= { primary: n.title.toLowerCase().replace(/[?.]/g, ''), secondary: [], intent: 'informational' };
for (const t of TEAM) KEYWORDS[`/about/${t.slug}`] ??= { primary: `${t.name.toLowerCase()} arcus`, secondary: [], intent: 'navigational' };
// Legal and utility pages are intentionally unmapped.
export const UNMAPPED_OK = ['/accessibility', '/cookies', '/free-report-terms', '/privacy', '/terms', '/print'];
