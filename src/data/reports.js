// Real Arcus reports, anonymized. Numbers come from the client decks; brand, campaign and show names are removed.
// Never change a number here. Every report is a real one; none uses example numbers.

export const REPORTS = [
  {
    slug: 'content-report',
    kind: 'Content report',
    who: 'A hard seltzer brand',
    question: 'Which of our posts actually work, and what should we make next?',
    color: 'gr',
    title: 'Tricks with the can get watched. Posts about the viewer’s friends get shared.',
    short: 'We sorted every Instagram and Facebook post from one summer campaign by what was on screen, then scored each kind against the brand’s own account numbers.',
    sides: { own: 'The brand’s own social export and posting calendar: 68 posts across Instagram and Facebook over 13 weeks.', out: 'How people responded to each post: what they watched, what they shared, and what they sent on to friends.' },
    scope: '39 Instagram posts and 29 Facebook posts over 13 weeks, from the brand’s own social export.',
    sources: ['The brand’s own social export', 'The brand’s posting calendar'],
    headline: { n: '2.4×', label: 'the account’s average views for one type of post: a trick with the can you could copy tonight' },
    stats: [
      { n: '19,188', label: 'median views for “hosting hack” posts, against an account average of 8,148' },
      { n: '11×', label: 'the average shares for one post about a moment people were in' },
      { n: '1.2', label: 'shares per Facebook post. 24 of 29 posts got zero or one' },
    ],
    slides: [
      { label: 'The top line', big: 'Hosting hacks get watched.', body: 'Median 19,188 views on Instagram against an account average of 8,148. Leads on Facebook too. Four posts, the minimum for a read, and the same on both platforms.' },
      { label: 'What worked', big: 'A trick with the can you could copy tonight.', body: 'The three biggest posts show the can frozen, disguised or turned into dessert. Each one shows a step you can repeat at home.' },
      { label: 'What didn’t', big: 'Telling people to quit is not a bit.', body: 'Anti-work jokes played straight stayed under 2,300 views each. Unusual places with nothing happening in them were the weakest named pattern on the account.' },
      { label: 'Where shares come from', big: 'The joke is about the viewer’s friends.', body: 'One post took 409 shares on 8,000 views: 51 per thousand. Nothing else on the account broke 12. It was about a moment people were in, not about the product.' },
      { label: 'Facebook', big: 'Facebook watches. It doesn’t share.', body: '1.2 shares per post on average, and 24 of 29 posts at zero or one. It does watch: one how-to did 11.7 times the Facebook average and zero shares.' },
      { label: 'What to do', list: [['Keep', 'Hosting hacks. They lead on Instagram and on Facebook.'], ['Test', 'A friend-group frame on the formats that already work, and watch the share rate.'], ['Stop', '3D animation, and the anti-work idea as written.']] },
    ],
    receipts: 'Every number comes from the brand’s own social export. Every post was watched and sorted by hand. Small groups are marked directional.',
  },
  {
    slug: 'audience-report',
    kind: 'Audience report',
    who: 'A streaming service',
    question: 'How do young men really talk, and what do they say about us?',
    color: 'ic',
    title: 'They write in five-word lines, and they talk about the shows, not the service.',
    short: 'We counted what men 18 to 24 post and comment on TikTok, Reddit, YouTube, X and Instagram, then ran the same count on the brand’s own posts.',
    sides: { own: 'The service’s own posts and captions, measured with the same script as the audience.', out: 'What men 18 to 24 post and comment on TikTok, Reddit, YouTube, X and Instagram, including 78,682 comments under four trailers.' },
    scope: '293 TikToks sorted by hand, 2,965 comments measured by script, 480 labeled by hand, 6,622 counted for words, 4,283 Reddit questions and 78,682 comments under four trailers.',
    sources: ['TikTok', 'Reddit', 'YouTube', 'X', 'Instagram', 'The brand’s own posts'],
    headline: { n: '42×', label: 'the views for an acted-out bit compared with a sincere post' },
    stats: [
      { n: '1 in 62', label: 'words they write is slang. The glossary words brands borrow barely appear' },
      { n: '242 vs 3', label: 'likes on the top comment under a bit, against under a sincere post' },
      { n: '1.9%', label: 'of what they ask each other is about hobbies, games and entertainment. They talk under the show instead' },
    ],
    slides: [
      { label: 'How they write', big: 'They write five-word lines. Brands write hashtags.', body: 'A typical line is five words, first person, lower case. One word in 62 is slang. The brand’s own captions carried a hashtag 92.5% of the time; their comments, 0.2%.' },
      { label: 'What gets watched', big: 'A bit gets 42 times the views of a sincere post.', body: 'Median 91,850 views for an acted-out sketch, 2,171 for a sincere post, 1,675 for a brand post. Per viewer, both get liked at the same rate. The sincere post just reaches 42 times fewer people.' },
      { label: 'What they reward', big: 'Half of the top comments are jokes.', body: 'Of the 360 most-liked comments, 49% are a joke of some kind. One in ten is sincere. Sarcasm is rare, and when it lands it is the second most-liked kind.' },
      { label: 'Their words, counted', big: 'They don’t use the glossary.', body: 'The two most searched slang terms of 2025 appear in one comment and in none, out of 6,622. The words they do use are verdicts on the work, not decoration.' },
      { label: 'What they talk about', big: 'They talk about the shows, not the service.', body: '78,682 comments under four trailers. The service only comes up when it gets in the way: ads, the app, a cancelled show.' },
      { label: 'What to do', list: [['Play along', 'Reply to the bit. Don’t start one.'], ['Tell, don’t ask', 'State a time. Never ask the room a question.'], ['Hand over the mic', 'Let a fan’s line be the caption.'], ['No glossary', 'No slang in the caption.']] },
    ],
    receipts: 'Every comment and post was pulled from public pages and every label is filed. Counts use the same script on the audience and on the brand.',
  },
  {
    slug: 'market-report',
    kind: 'Market report',
    who: 'A skincare brand moving into retail',
    question: 'Will retail eat our online sales?',
    color: 'k',
    title: 'Retail didn’t eat online sales at any of five brands that made the move. It took margin.',
    short: 'We traced five direct-to-consumer brands that scaled into retail through the public record, set the brand’s own public numbers against them, and sourced every number.',
    sides: { own: 'The brand’s own question and its plan for moving from selling online into retail.', out: 'What five brands that made the same move actually saw, from filings, trade press, retailer media and marketplace listings: 157 sources.' },
    scope: 'Five brands, ten slides, a 157-source ledger and 14 source slides showing the page behind each number.',
    sources: ['Company filings and interviews', 'Trade press', 'Retailer media networks', 'Marketplace listings'],
    headline: { n: '157', label: 'sources behind ten slides. Every number links to its page' },
    stats: [
      { n: '0 of 5', label: 'brands saw retail eat their online demand. The share shifted; four online businesses grew, and one handed online to Amazon and retail on purpose' },
      { n: '13.9%', label: 'lift in online sales near a new retail location for direct-to-consumer brands (industry research)' },
      { n: '5', label: 'moves for the media plan, each traced to the cases' },
    ],
    slides: [
      { label: 'The question', big: 'Will retail eat online sales?', body: 'Five brands that moved from selling online to thousands of stores. What happened to their own sites, and what the media did.' },
      { label: 'What happened', big: 'Retail didn’t eat online at any of the five.', body: 'The share shifted; the online business grew. The cannibalization that is real is margin: the retailer’s cut, trade spend and fees. Not demand.' },
      { label: 'Why', big: 'The two channels fed each other.', body: 'A store opening lifts online sales nearby by 6.9%, and 13.9% for direct-to-consumer brands, according to industry research across $848 billion of transactions.' },
      { label: 'What the media did', big: 'Media pointed at one shelf, in one week.', body: 'The launches that worked sent people to a named store in its launch week, then reported that store’s sales, not impressions.' },
      { label: 'What to do', list: [['Point', 'Launch media at one retailer’s shelf in its set week.'], ['Fund', 'Retail media from the trade budget, for position.'], ['Protect', 'Give the site a job the shelf can’t do.'], ['Report', 'The four numbers buyers manage to.']] },
    ],
    receipts: 'Every number traces to a source in a 157-source ledger, and 14 source slides show the page behind each one.',
  },
];

export const bySlug = Object.fromEntries(REPORTS.map((r) => [r.slug, r]));
// A report's color as its tag class (.t-g, .t-i, .t-k, .t-o). One place, so every tag agrees.
// The tag's dot: teal (g) when the answer came from the brand's own numbers, periwinkle (i) when it came from outside
// sources (what people say, the market).
export const toneOf = (r) => (r.color === 'gr' ? 'g' : 'i');
