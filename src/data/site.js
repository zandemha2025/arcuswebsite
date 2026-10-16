// One source of truth for facts the whole site repeats. Change a fact here, not in a page.
export const SITE = 'https://usearcus.ai';
export const DOMAIN = 'usearcus.ai';
// Where every "Book a call" goes. Our own /book page for now; swap in the scheduling link here once it is chosen.
export const BOOK_URL = '/book';

// The entity sentence: used word for word in About, FAQ, Organization schema, llms.txt and the meta of Home.
export const ENTITY =
  'Arcus shows CMOs, founders and executives at entertainment and lifestyle brands where their marketing money is working. It connects what their teams know, from sales, CRM and fan data to ads and agency reports, with what people say online, in one place the brand owns, and answers any question with the whole picture. Arcus doesn’t make ads or buy media.';

// The one-liner. Its last sentence is also the schema `slogan` in Site.astro; change the two together.
export const SHORT = 'Arcus connects every piece of your data, plus what people say online, into one place you own, and shows which spend works. If it can’t be checked, it doesn’t count.';

// Placeholders the team still has to confirm. Anything in brackets stays out of structured data.
export const TBD = {
  setup: '[$X]',
  monthly: '[$Y]',
  turnaround: '[turnaround]',
  reportsEmail: '[reports@usearcus.ai]',
  securityEmail: '[security@usearcus.ai]',
  calLink: '[cal.com/arcus/walkthrough]',
};

// Company profiles for structured data (sameAs). Add each URL once the profile is live (gtm/entity-kit.md).
export const SAME_AS = [
  // 'https://www.linkedin.com/company/usearcus',
  // 'https://www.crunchbase.com/organization/arcus-...',
  // 'https://www.wikidata.org/wiki/Q...',
  // 'https://www.youtube.com/@usearcus',
  // 'https://x.com/usearcus',
];

// Team. For search and AI credibility, fill photo (public/team/{slug}.jpg), linkedin and credentials (gtm/author-bio-form.md).
export const TEAM = [
  { slug: 'nazeem-ahmed', photo: '', linkedin: '', credentials: [], knowsAbout: [], name: 'Nazeem Ahmed', title: 'Chief AI Officer', initials: 'NA',
    line: 'Runs our AI, and makes sure it only does the jobs we approved.',
    bio: 'Nazeem leads the AI side of Arcus: the checks that run on your data and the rules that limit what they can do. If a number shows up in a report, he can tell you where it came from. [Background to add.]' },
  { slug: 'min-kwak', photo: '', linkedin: '', credentials: [], knowsAbout: [], name: 'Min Kwak', title: 'Chief Revenue Officer', initials: 'MK',
    line: 'Runs sales and partnerships. Probably the first person you talk to.',
    bio: 'Min works with the brand teams who use Arcus, from trying it free to the setup and every answer after. [Background to add.]' },
  { slug: 'devin-min', photo: '', linkedin: '', credentials: [], knowsAbout: [], name: 'Devin Min', title: 'Chief Product Officer', initials: 'DM',
    line: 'Runs the product: what your answers say and how they read.',
    bio: 'Devin decides what goes into an Arcus answer and what stays out. His rule: the answer goes on top, and every number has a source. [Background to add.]' },
  { slug: 'brendon-ghaderi', photo: '', linkedin: '', credentials: [], knowsAbout: [], name: 'Brendon Ghaderi', title: 'Chief Technology Officer', initials: 'BG',
    line: 'Runs engineering: connecting your data into one place and tracing every number to its source.',
    bio: 'Brendon builds what sits behind every Arcus answer: the connections to every system you run, the checks, and the logs that trace each number back to its source. Security and legal questions come to him. [Background to add.]' },
];

// Where we listen. Third-party sources, read alongside a brand's own (first-party) data.
// `logo` is a file in public/logos (from Simple Icons). No logo: we set the name as a wordmark.
export const LISTEN_SOURCES = [
  { name: 'Reddit', logo: 'reddit', what: 'Threads and questions' },
  { name: 'TikTok', logo: 'tiktok', what: 'Videos and comments' },
  { name: 'YouTube', logo: 'youtube', what: 'Trailers, videos, comments' },
  { name: 'Instagram', logo: 'instagram', what: 'Posts and comments' },
  { name: 'X', logo: 'x', what: 'Posts and replies' },
  { name: 'Threads', logo: 'threads', what: 'Posts and replies' },
  { name: 'Bluesky', logo: 'bluesky', what: 'Posts and replies' },
  { name: 'Facebook groups', logo: 'facebook', what: 'Group conversations' },
  { name: 'Discord', logo: 'discord', what: 'Public community servers' },
  { name: 'Twitch', logo: 'twitch', what: 'Stream chat' },
  { name: 'Kick', logo: 'kick', what: 'Stream chat' },
  { name: 'Google Search', logo: 'google', what: 'What people search for' },
  { name: 'Goodreads', logo: 'goodreads', what: 'Reviews and shelves' },
  { name: 'Fable', logo: '', what: 'Book clubs and reviews' },
  { name: 'Letterboxd', logo: 'letterboxd', what: 'Film reviews' },
  { name: 'IMDb', logo: 'imdb', what: 'Ratings and reviews' },
  { name: 'Rotten Tomatoes', logo: 'rottentomatoes', what: 'Audience reviews' },
  { name: 'Steam', logo: 'steam', what: 'Player reviews' },
  { name: 'Roblox', logo: 'roblox', what: 'Community and games' },
  { name: 'Spotify', logo: 'spotify', what: 'Podcasts and charts' },
  { name: 'Apple Podcasts', logo: 'applepodcasts', what: 'Podcasts and reviews' },
  { name: 'Substack', logo: 'substack', what: 'Newsletters and comments' },
  { name: 'Pinterest', logo: 'pinterest', what: 'Boards and saves' },
  { name: 'Trustpilot', logo: 'trustpilot', what: 'Product reviews' },
  { name: 'Yelp', logo: 'yelp', what: 'Venue reviews' },
  { name: 'Amazon reviews', logo: 'amazon', what: 'Product reviews' },
  { name: 'News and trade press', logo: '', what: 'Coverage and filings' },
];
export const LISTEN = LISTEN_SOURCES.map((s) => s.name);
export const OWN = ['Sales, tickets and sign-ups', 'Players, viewers and app usage', 'Email, CRM and customer data', 'Retail and partner data', 'Your ad accounts', 'Your social accounts', 'Agency reports'];

// Tools brands already use. We connect to these where they are; nothing moves into a new tool.
export const TOOLS = [
  { name: 'Meta Ads', logo: 'meta' }, { name: 'Ticketmaster', logo: 'ticketmaster' }, { name: 'Salesforce', logo: 'salesforce' }, { name: 'Google Ads', logo: 'googleads' },
  { name: 'Snowflake', logo: 'snowflake' }, { name: 'Steam', logo: 'steam' }, { name: 'TikTok Ads', logo: 'tiktok' }, { name: 'Shopify', logo: 'shopify' },
  { name: 'Google Analytics', logo: 'googleanalytics' }, { name: 'Roku', logo: 'roku' }, { name: 'HubSpot', logo: 'hubspot' }, { name: 'YouTube Studio', logo: 'youtubestudio' },
  { name: 'Databricks', logo: 'databricks' }, { name: 'Amazon', logo: 'amazon' }, { name: 'Snapchat Ads', logo: 'snapchat' }, { name: 'Eventbrite', logo: 'eventbrite' },
  { name: 'App Store', logo: 'appstore' }, { name: 'Google Play', logo: 'googleplay' }, { name: 'Mixpanel', logo: 'mixpanel' },
  { name: 'Klaviyo', logo: '' }, { name: 'Pinterest Ads', logo: 'pinterest' }, { name: 'Walmart', logo: 'walmart' }, { name: 'Fandango', logo: 'fandango' },
  { name: 'Reddit Ads', logo: 'reddit' }, { name: 'LinkedIn Ads', logo: 'linkedin' }, { name: 'Power BI', logo: 'powerbi' }, { name: 'Looker', logo: 'looker' }, { name: 'Tableau', logo: 'tableau' },
  { name: 'Google Sheets', logo: 'googlesheets' }, { name: 'Excel', logo: 'microsoftexcel' }, { name: 'Google Drive', logo: 'googledrive' }, { name: 'Dropbox', logo: 'dropbox' },
  { name: 'Slack', logo: 'slack' }, { name: 'Microsoft Teams', logo: 'microsoftteams' }, { name: 'Hootsuite', logo: 'hootsuite' }, { name: 'Mailchimp', logo: 'mailchimp' },
];

// Companies that have trusted Arcus. Add a logo only with the company's written OK.
// { name: 'Company', logo: 'file-in-public-logos-clients' }. Empty slots show as placeholders on preview builds only.
export const CLIENTS = [
  { name: 'Starface', logo: 'starface.svg', h: 22 }, { name: 'Paramount Games', logo: 'paramount.svg', h: 52 }, { name: 'Truly', logo: 'truly.svg', h: 30 },
  { name: 'MrBeast', logo: 'mrbeast.svg', h: 26 }, { name: 'Amazon', logo: 'amazon.svg', h: 32 }, { name: 'Hardee’s', logo: 'hardees.svg', h: 40 },
];
export const CLIENT_SLOTS = 6;

export const NAV = [
  { href: '/how-it-works', label: 'How it works', key: 'how' },
  { href: '/reports', label: 'Real answers', key: 'reports' },
  { href: '/for', label: 'Who it’s for', key: 'for' },
  { href: '/pricing', label: 'Pricing', key: 'pricing' },
  { href: '/library', label: 'Library', key: 'library' },
];

export const ASK_AI = `What does Arcus (${DOMAIN}) do for in-house marketing teams at entertainment and lifestyle brands?`;
