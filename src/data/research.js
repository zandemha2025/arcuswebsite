// Original research published as datasets. `published: false` keeps a study out of search and the sitemap
// until the client who commissioned it gives written OK (see gtm/digital-pr.md).
export const STUDIES = [
  {
    slug: 'how-young-men-talk-online', published: false,
    title: 'How young men talk online, counted',
    short: 'Men 18 to 24 write five-word lines, reward jokes over sincerity, and rarely use the slang brands borrow. We counted 6,622 comments, 293 TikToks, 4,283 Reddit questions and 78,682 trailer comments to show it.',
    report: 'audience-report',
    period: '2026', spatial: 'United States (English-language public posts)',
    method: 'Public posts and comments on TikTok, Reddit, YouTube, X and Instagram. Comments sorted by hand into labels; words counted with one script for audience and brand alike.',
    measures: [
      ['TikToks sorted', '293', 'Posts young men made themselves, across eight formats'],
      ['Comments measured by script', '2,965', 'Line length, first person, punctuation, hashtags'], ['Comments labeled by hand', '480', 'One label each, every label filed'],
      ['Comments counted', '6,622', 'Word and slang counts'],
      ['Reddit questions read', '4,283', 'Questions young men asked each other'],
      ['Trailer comments counted', '78,682', 'Under four trailers with 53.5 million views'],
      ['Median views, acted-out bit', '91,850', 'Across the sample'],
      ['Median views, sincere post', '2,171', 'Across the sample'],
      ['Median views, brand post', '1,675', 'Across the sample'],
      ['Slang rate', '1 word in 62', 'In their own comments'],
      ['Top comments that are jokes', '49%', 'Of the 360 most-liked comments'],
      ['Brand captions with a hashtag', '92.5%', 'Against 0.2% of audience comments'],
      ['Questions about hobbies, games and entertainment', '1.9%', 'Of 4,283 Reddit questions; 47 were about entertainment itself'],
    ],
  },
  {
    slug: 'does-retail-eat-online-sales', published: false,
    title: 'Does retail eat online sales? Five brands, 157 sources',
    short: 'Retail didn’t eat online demand at any of five direct-to-consumer brands that moved into thousands of retail doors. The share shifted and the online business grew. The real cost was margin.',
    report: 'market-report',
    period: '2019/2026', spatial: 'United States',
    method: 'A case series built from public filings, interviews, trade press, retailer media networks and marketplace listings. Every number links to its source page in a 157-source ledger.',
    measures: [
      ['Brands studied', '5', 'Direct-to-consumer brands that scaled into retail'],
      ['Sources in the ledger', '157', 'Each number traced to a page'],
      ['Brands where retail ate online demand', '0 of 5', 'Four kept growing online; one moved online sales to Amazon and retail by choice'],
      ['Online sales lift near a new retail location', '6.9%', 'Industry research across $848 billion of transactions'],
      ['Lift for direct-to-consumer brands', '13.9%', 'Same research'],
      ['Media moves recommended', '5', 'Each traced to the cases'],
    ],
  },
];
export const studyBySlug = Object.fromEntries(STUDIES.map((s) => [s.slug, s]));
