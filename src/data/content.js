import { TBD, ENTITY } from './site.js';

// `meta` is the page's search description (under 160 characters); `lead` is the longer hero line.
export const INDUSTRIES = [
  {
    slug: 'spirits-and-beverage', name: 'Spirits and beverage', word: 'Drinks', stamp: 'Cases',
    img: 'cocktail-duo', alt: 'A cocktail on a bar table',
    h1: 'Find out which videos sold cases.',
    meta: 'Marketing measurement for beverage brands. Arcus connects depletions, retail data and ad accounts with what drinkers say online, and shows what sold cases.',
    lead: 'For marketing teams at spirits, beer, seltzer and beverage brands. Your depletions, retail data, direct sales and ad accounts all sit in different places. Arcus connects them into one place you own, adds what drinkers say about you online, and tells you what to keep, test and stop.',
    report: 'content-report',
    proof: 'In a real Arcus report for a hard seltzer brand, one type of post got 2.4 times the account’s average views: a trick with the can you could copy tonight.',
    questions: [
      ['Did the summer campaign sell, or just get views?', 'We line the campaign up against your own sales over the same weeks. When you need proof it caused them, we run a simple test: show it in some regions and not others, then compare.'],
      ['Which creators move product?', 'We line up each creator’s codes, links and post dates with your own sales, and count each sale once. You see who sold, and who to test before you book them again.'],
      ['What are people saying about us when we’re not in the room?', 'We read Reddit threads, TikTok comments, Facebook groups and reviews, count what comes up, and line it up with what sells.'],
      ['Most of our sales happen at retail and in bars. Can you still tell what worked?', 'Yes. We use the sales data that exists: distributor depletions, retail scan data, and your own site or delivery partners. We line it up with where and when the media ran, region by region, and tell you where it’s too thin to call. When you need to know what caused a lift, we run the media in some regions and hold it back in others, then compare.'],
    ],
  },
  {
    slug: 'studios-and-streaming', name: 'Studios and streaming', word: 'Studios', stamp: 'Tickets',
    img: 'clapper-duo', alt: 'A film clapperboard held up on set',
    h1: 'Find out which trailers and posts filled seats.',
    meta: 'Film marketing social listening, tied to results. Arcus connects tickets, sign-ups and viewing with how fans talk online, and shows what filled seats.',
    lead: 'For marketing teams at film studios, TV networks and streaming services. Your tickets, sign-ups, viewing and ad accounts all sit in different places. Arcus connects them into one place you own, adds how fans talk about your titles online, and tells you what to keep, test and stop.',
    report: 'audience-report',
    proof: 'In a real Arcus report for a streaming service, an acted-out sketch got 42 times the views of a sincere post, and fans talked about the shows, almost never the service.',
    questions: [
      ['Which trailers, clips and creators moved people to watch?', 'We line up every trailer, clip and creator against your tickets, sign-ups and viewing, and count each result once.'],
      ['How do fans talk about our titles?', 'We read the comments under your trailers, Reddit threads, Discord servers, Twitch and Kick chat, count what comes up, and show you the words they use.'],
      ['Should our accounts sound like the fans?', 'Usually not. In our audience report, one word in 62 was slang, and the most searched slang of the year barely appeared. The voice that worked replied to fans, stated a date, and let fans’ own lines lead.'],
      ['Can you tell us what to post between releases?', 'Yes. Every answer ends with a short list of what to make next, based on what the audience is already doing.'],
    ],
  },
  {
    slug: 'games-and-music', name: 'Games and music', word: 'Gaming', stamp: 'Copies',
    img: 'gaming-duo', alt: 'A player at a gaming setup',
    h1: 'Find out which creators sold copies, and which sold themselves.',
    meta: 'Game and music marketing measurement. Arcus connects sales, wishlists and streams with what fans say on Twitch and Discord, and shows which creators sold.',
    lead: 'For marketing teams at game studios, publishers and music companies. Your sales, wishlists, player data, streams and creator recaps all sit in different places. Arcus connects them into one place you own, adds what fans say on Twitch, Kick, Discord, Reddit and TikTok, and tells you what to keep, test and stop.',
    report: 'audience-report',
    proof: 'Our audience reports count real comments and posts, not vibes. In one, 6,622 comments showed one word in 62 was slang, and the glossary words brands love barely appeared.',
    questions: [
      ['Which streamers and creators drove sales?', 'We line up each creator’s streams and posts with wishlists, sales and activations by day, check codes and links against your own numbers, and separate streams that landed on sale days. Each result counts once. When you need proof of cause, we hold a push back in some regions and compare.'],
      ['What are players saying in Discord and on stream?', 'We read Discord servers, Twitch and Kick chat, Reddit and TikTok, and count the topics, complaints and words that come up.'],
      ['Did the launch week push work?', 'We line up launch media with sales and sign-ups day by day. When you need proof, we run ads in some regions and pause them in others, then compare.'],
      ['Who are our real fans?', 'We find the small group that drives most of your sales or streams, and describe them in a sentence.'],
    ],
  },
  {
    slug: 'fashion-and-beauty', name: 'Fashion and beauty', word: 'Lifestyle', stamp: 'Drops',
    img: 'toast-duo', alt: 'Friends raising glasses',
    h1: 'Find out which drops your marketing actually sold.',
    meta: 'Creator and influencer measurement for fashion and beauty brands. Arcus connects sales, retail data and customers with what reviews say, and shows what sold.',
    lead: 'For marketing teams at fashion, beauty and lifestyle brands. Your online sales, retail data, customer lists and ad accounts all sit in different places. Arcus connects them into one place you own, adds what reviews and comments say about your products, and tells you what to keep, test and stop.',
    report: 'market-report',
    proof: 'For a skincare brand moving into stores, our market report studied five brands that made the same move, with 157 sources behind ten slides.',
    questions: [
      ['Which drops sold because of the campaign, and which were selling anyway?', 'We split each drop’s sales into returning customers, your own email list and new buyers, then line up what each channel reports against what is left, and count each result once. When budget depends on the answer, we run the campaign in some regions and not others and compare.'],
      ['What do reviews and comments say about our products?', 'We read reviews, Reddit, TikTok and Instagram comments, count what comes up, and tie it to what sells.'],
      ['We’re moving into retail. What should the media plan do?', 'We research how brands like yours made the move, with every number sourced, and turn it into a short list of moves.'],
      ['Who are our best customers?', 'We find the small group that drives most of your sales and tell you who they are and what they buy.'],
    ],
  },
];

// `vendor: true` marks a page about another company: compare/[slug].astro keeps its name capitalized, leaves the page
// out of "Other comparisons", and points readers to that company's own site for its current features and pricing.
export const COMPARE = [
  {
    slug: 'analytics-software', name: 'Analytics software', h1: 'Arcus vs. analytics software',
    lead: 'Software charts the data you point it at. Someone still has to connect every source, keep it clean, read it and decide what it means. Arcus does that part.',
    rows: [['Who sets it up', 'Your team', 'We do'], ['Who reads it', 'Whoever has time', 'A person on our team, who writes up what it means'], ['What you get', 'Dashboards', 'A few slides with the answer on top'], ['Conversation online', 'Usually not included', 'Read and counted alongside your sales'], ['What it connects', 'The sources your team wires up', 'Every system you run, plus what people say online']],
    better: 'If your analysts want a tool to explore in, keep it. Everything we connect stays in one place you own, and their software can sit on top of it.',
  },
  {
    slug: 'hiring-a-data-team', name: 'Hiring a data team', h1: 'Arcus vs. hiring a data team',
    lead: 'What it takes to hire, build and manage a marketing data team yourself, and when that’s the right call.',
    rows: [['Time to first answer', 'Months to hire, then months to build', TBD.turnaround ? `${TBD.turnaround} from access to a free answer. Full setup takes about three months` : 'A free answer first, and we tell you when to expect it. Full setup takes about three months'], ['Who you manage', 'The hires, the tools and the setup', 'Nobody. We keep it running inside your own setup'], ['Skills covered', 'Whoever you could hire', 'AI, data engineering and marketing together'], ['When it ends', 'You keep the team', 'You keep everything we built, and every answer']],
    better: 'If data is core to how your company competes, build the team. Arcus can be the bridge while you hire.',
  },
  {
    slug: 'haus', name: 'HAUS', h1: 'Arcus vs. HAUS', vendor: true,
    short: 'HAUS runs lift tests for growth teams at e-commerce brands. Arcus connects a brand’s data and what people say online, and answers your questions for you.',
    lead: 'HAUS is an incrementality testing platform built for growth teams at e-commerce brands. Arcus connects every piece of a brand’s data, plus what people say online, into one place the brand owns, and answers any question with the whole picture, for entertainment and lifestyle brands.',
    rows: [['Built for', 'Performance and e-commerce growth teams', 'Brand teams at entertainment and lifestyle companies'], ['Main job', 'Running and reading lift tests', 'Connecting every piece of your data into one place you own, and answering any question'], ['Who does the work', 'Your team, in the platform', 'We do, and send you the answers'], ['Conversation online', 'Not the focus', 'Read and counted']],
    better: 'If your team runs paid media in-house and wants to run its own lift tests, HAUS is built for that.',
  },
  {
    slug: 'hex', name: 'Hex', h1: 'Arcus vs. Hex', vendor: true,
    short: 'Hex is a workspace where data teams write queries and build notebooks. Arcus connects your data into one place you own and answers the questions for you.',
    lead: 'Hex is a workspace where data teams write queries (questions written in code) and build notebooks. Arcus connects your data into one place you own and answers the questions for you.',
    rows: [['Built for', 'Data analysts and data scientists', 'Marketing leaders'], ['What you do', 'Write queries, build notebooks', 'Read a few slides, ask questions'], ['Setup', 'Your data team connects and models the data', 'We do'], ['Output', 'Analyses your team builds', 'A few slides with the answer on top']],
    better: 'If you have analysts, Hex is a strong tool for them, and it can sit on top of the data we connect.',
  },
];

export const FAQ = [
  ['The basics', 'What is Arcus?', ENTITY],
  ['The basics', 'Who is Arcus for?', 'CMOs, marketing leads, founders and executives at studios, streamers, drinks, games, music, fashion and beauty brands. Especially teams whose data sits in pieces and who don’t have a data team of their own.'],
  ['The basics', 'Who isn’t Arcus for?', 'Teams whose analysts already connect every system, count each result once and read every comment. Teams that can’t share any of their own numbers with us. And teams that want a tool to set up and run on their own.'],
  ['The basics', 'What won’t Arcus claim?', 'That an ad caused a sale, unless we tested it. A number we can’t trace back to its source. A quote or result we don’t have permission to show. Or that anyone’s numbers are wrong before we’ve checked.'],
  ['The basics', 'Is Arcus software or a service?', 'Both. Arcus is our own product, and our engineers set it up inside your systems and run it with you. You don’t get a login and a manual: we connect your data into one place inside your own setup and keep it running. You ask questions, and answers land in Slack, email or Sheets. What we build is yours to keep.'],
  ['The basics', 'What do you connect?', 'Every system that holds a piece of your marketing: sales, tickets or sign-ups; players, viewers or app usage; email, CRM and customer data; retail and partner data; your ad and social accounts; agency reports; and any listening tool you already use. It all goes into one place you own.'],
  ['The basics', 'Do we need a data team?', 'No. We do the data work. You get the answers.'],
  ['The basics', 'Do you look at what people say online?', 'Yes. We read Reddit, TikTok, YouTube, X, Instagram, Facebook groups, Discord, Twitch, Kick, Google Search, Goodreads, Fable, reviews and more, count what comes up, and line it up with your own sales and customer data.'],
  ['Trying it free', 'What do we get when we try it free?', 'One question, answered with your own numbers and what people say online: which spend paid off, which posts work, what your audience says, or anything else you need to know. You get a few slides with the answer on top, ending on what to keep, test and stop, plus a 30-minute walkthrough.'],
  ['Trying it free', 'What do you need from us?', 'Your question, access to the accounts it touches, and 30 minutes for the walkthrough. Usually that means your own numbers (sales, tickets, sign-ups or viewing) and any ad accounts involved.'],
  ['Trying it free', 'Is it really free?', 'Yes. No card. If you want everything connected afterward, we talk about that then.'],
  ['Trying it free', 'How long does it take?', TBD.turnaround ? `${TBD.turnaround} from access to answer.` : 'We tell you the turnaround before we start, and email you when your answer is ready.'],
  ['Working with us', 'How long does setup take?', 'About three months from kickoff to everything connected. You approve each step, and answers arrive along the way.'],
  ['Working with us', 'What kinds of reports do you send?', 'Most answers fall into four kinds: spend reports, content reports, audience reports and market reports. You can ask anything else too. Each answer is a few slides with the answer on top and what to keep, test and stop at the end.'],
  ['Working with us', 'How often do reports come?', 'On a schedule you choose, or whenever you have a question.'],
  ['Working with us', 'Do we have to change our tools or partners?', 'No. We connect to what you already use.'],
  ['Working with us', 'How much does it cost?', 'Trying it is free. If you want everything connected after that, we scope the setup and the monthly work for your brand and quote it once you’ve seen your free answer. The Pricing page explains how it works.'],
  ['Data and trust', 'Is this the same as attribution?', 'No. Attribution hands out credit. We check whether the credit holds up: every reported result is matched against your own numbers, so each one counts once. When you need to know whether something caused a sale, we run a simple test: show it in some regions and not others, then compare.'],
  ['Data and trust', 'Who checks the AI?', 'A person on our team reads every answer before you do and writes up what it means. The AI can only do jobs we’ve approved, and every step is logged.'],
  ['Data and trust', 'Who sees our data?', 'We tell you who at Arcus will work with your data before we start, and you decide who else sees what we find. The Security page has the details.'],
];

export const GLOSSARY = [
  ['attribution', 'Attribution', 'Deciding which ad, post or channel gets credit for a sale.', 'Every ad platform does its own attribution, and each one gives itself credit. That’s why your channels’ numbers can add up to more than you sold.', 'Which rule gives credit in this report, and does another channel’s report count the same sale too?', 'incrementality-without-the-math'],
  ['incrementality', 'Incrementality', 'The sales that happened because of a campaign and wouldn’t have happened without it.', 'If people searching your name would have bought anyway, those sales aren’t incremental, even if an ad was clicked first.', 'How do we know these sales wouldn’t have happened anyway?', 'incrementality-without-the-math'],
  ['double-counting', 'Double counting', 'When two or more channels or reports each take credit for the same sale.', 'A buyer who saw a creator video and then clicked a Meta ad can be counted in both reports. Add them together and you get more sales than you made.', 'If we add up every report, does the total match our own numbers?', 'meta-what-worked'],
  ['holdout-test', 'Holdout test', 'A test where a campaign runs in some places and not others, so you can compare.', 'Run ads in half your regions for a few weeks and leave the other half alone. The difference in sales is the campaign’s real effect.', 'Can we hold out a region before we increase spend?', 'incrementality-without-the-math'],
  ['roas', 'ROAS', 'Return on ad spend: sales credited to ads, divided by what the ads cost.', 'ROAS is only as honest as the sales it’s credited with. If those sales are double counted, ROAS looks better than it is.', 'Which sales are in the top line of this ROAS, and are they also in another channel’s report?', 'google-search-what-worked'],
  ['view-through-conversion', 'View-through conversion', 'A sale credited to an ad that someone saw but didn’t click.', 'View-throughs can inflate results fast, because a lot of people see an ad and buy for other reasons.', 'How many of these conversions are view-throughs, and over how many days?', 'meta-what-worked'],
  ['conversion-window', 'Conversion window', 'How many days after seeing or clicking an ad a sale still counts for it.', 'A long window lets an ad take credit for sales that happened weeks later for other reasons.', 'What are the click and view windows in this report, and can we see results at a shorter one?', 'pinterest-what-worked'],
  ['last-click', 'Last-click attribution', 'Giving all the credit to the last thing someone clicked before buying.', 'It often hands credit to brand search, which mostly catches people who were already going to buy.', 'How much of this credit goes to people searching our name?', 'google-search-what-worked'],
  ['brand-search', 'Brand search', 'Ads shown to people who search your brand’s name.', 'People typing your name were already looking for you. Paying for those clicks can make a channel look great while doing little.', 'What happens to sales if we pause brand search in one region?', 'incrementality-without-the-math'],
  ['creator-code', 'Creator code', 'A discount code or link given to a creator so sales can be traced to them.', 'Codes leak to coupon sites and get used by people who’d have bought anyway, so they need checking against your own numbers.', 'How many of this creator’s code uses came from coupon sites?', 'creators-what-worked'],
  ['first-party-data', 'First-party data', 'Data your company collects itself: sales, tickets, sign-ups, viewing, customers, email, your own social accounts.', 'It’s the most reliable data you have, and usually the least used.', 'What are we collecting already that nobody is reading?', 'first-party-data-for-brand-marketers'],
  ['third-party-data', 'Third-party data', 'Data from outside your company: public conversation, search trends, reviews, market research.', 'On its own it tells you what people say. Lined up with your first-party data, it tells you whether they buy.', 'Where does our audience talk when we’re not posting?', 'social-listening-that-counts'],
  ['social-listening', 'Social listening', 'Reading what people say about a brand, product or topic across social media and the web.', 'Most listening tools summarize sentiment. Useful listening counts specific things, like the words fans use, and checks them against sales.', 'What did we change because of the last listening report?', 'social-listening-that-counts'],
  ['media-mix-modeling', 'Media mix modeling', 'A statistical model that estimates how much each channel contributes to sales over time.', 'It needs a lot of clean history to work, and a data team to keep it honest.', 'How much history does the model use, and when was it last checked against a test?', 'do-you-need-a-data-team'],
].map(([slug, name, def, why, ask, article]) => ({ slug, name, def, why, ask, article }));
