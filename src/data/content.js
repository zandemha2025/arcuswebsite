import { TBD, ENTITY } from './site.js';

export const INDUSTRIES = [
  {
    slug: 'spirits-and-beverage', name: 'Spirits and beverage', word: 'Drinks', stamp: 'Cases',
    img: 'cocktail', alt: 'A cocktail being poured at a bar',
    h1: 'Find out which videos sold cases.',
    lead: 'For marketing teams at spirits, beer, seltzer and beverage brands. Arcus connects your depletions, direct sales, ad accounts and agency reports into one layer you own, adds what drinkers say about you online, checks every claim, and tells you what to keep, test and stop.',
    report: 'content-report',
    proof: 'In a real Arcus report for a hard seltzer brand, one type of post got 2.4 times the account’s average views: a trick with the can you could copy tonight.',
    questions: [
      ['Did the summer campaign sell, or just get views?', 'We line the campaign up against your own sales over the same weeks. When you need proof it caused them, we run a simple test: show it in some regions and not others, then compare.'],
      ['Which creators move product?', 'Every creator code and link is checked against your own numbers, so you renew the creators who sell.'],
      ['What are people saying about us when we’re not in the room?', 'We read Reddit threads, TikTok comments, Facebook groups and reviews, count what comes up, and line it up with what sells.'],
      ['Most of our sales happen at retail and in bars. Can you still check?', 'Yes. We work with the sales data you have, whether it comes from your own site, Amazon or retail partners, and tell you where it’s too thin to call.'],
    ],
  },
  {
    slug: 'studios-and-streaming', name: 'Studios and streaming', word: 'Studios', stamp: 'Tickets',
    img: 'cinema', alt: 'Neon lights outside a cinema',
    h1: 'Find out which trailers and posts filled seats.',
    lead: 'For marketing teams at film studios, TV networks and streaming services. Arcus connects your tickets, sign-ups, viewing, ad accounts and agency reports into one layer you own, adds how fans talk about your titles across the internet, checks every claim, and tells you what to do next.',
    report: 'audience-report',
    proof: 'In a real Arcus report for a streaming service, an acted-out sketch got 42 times the views of a sincere post, and fans talked about the shows, almost never the service.',
    questions: [
      ['Which trailers, clips and creators moved people to watch?', 'We match what your agencies claim against tickets, sign-ups and viewing, and count each one once.'],
      ['How do fans talk about our titles?', 'We read the comments under your trailers, Reddit threads, Discord servers, Twitch and Kick chat, count what comes up, and show you the words they use.'],
      ['Should our accounts sound like the fans?', 'Usually not. Our audience reports show which lines fans reward, which ones they mock, and the voice that works between seasons.'],
      ['Can you tell us what to post between releases?', 'Yes. Every answer ends with a short list of what to make next, based on what the audience is already doing.'],
    ],
  },
  {
    slug: 'games-and-music', name: 'Games and music', word: 'Gaming', stamp: 'Copies',
    img: 'gaming', alt: 'A gaming setup lit in color',
    h1: 'Find out which creators sold copies, and which sold themselves.',
    lead: 'For marketing teams at game studios, publishers and music companies. Arcus connects your sales, wishlists, players and streams into one layer you own, adds what fans say on Twitch, Kick, Discord, Reddit and TikTok, checks every creator and agency claim, and tells you what to keep, test and stop.',
    report: 'audience-report',
    proof: 'Our audience reports count real comments and posts, not vibes. In one, 6,622 comments showed one word in 62 was slang, and the glossary words brands love barely appeared.',
    questions: [
      ['Which streamers and creators drove sales?', 'We check every code, link and campaign window against your own sales, wishlists or streams, and count each one once.'],
      ['What are players saying in Discord and on stream?', 'We read Discord servers, Twitch and Kick chat, Reddit and TikTok, and count the topics, complaints and words that come up.'],
      ['Did the launch week push work?', 'We line up launch media with sales and sign-ups day by day, and run a regions-on, regions-off test when you need proof.'],
      ['Who are our real fans?', 'We find the small group that drives most of your sales or streams, and describe them in a sentence.'],
    ],
  },
  {
    slug: 'fashion-and-beauty', name: 'Fashion and beauty', word: 'Lifestyle', stamp: 'Drops',
    img: 'toast', alt: 'Friends raising glasses',
    h1: 'Find out which drops your marketing actually sold.',
    lead: 'For marketing teams at fashion, beauty and lifestyle brands. Arcus connects your sales, retail, customer and ad data into one layer you own, adds what reviews and comments say about your products, checks every claim, shows you who your best customers really are, and tells you what to do next.',
    report: 'market-report',
    proof: 'For a skincare brand moving into stores, our market report studied five brands that made the same move, with 157 sources behind ten slides.',
    questions: [
      ['Which drops sold because of the campaign, and which were selling anyway?', 'We match agency and creator claims against your own numbers, and test anything you’d move budget on.'],
      ['What do reviews and comments say about our products?', 'We read reviews, Reddit, TikTok and Instagram comments, count what comes up, and tie it to what sells.'],
      ['We’re moving into retail. What should the media plan do?', 'We research how brands like yours made the move, with every number sourced, and turn it into a short list of moves.'],
      ['Who are our best customers?', 'We find the small group that drives most of your sales and tell you who they are and what they buy.'],
    ],
  },
];

export const COMPARE = [
  {
    slug: 'agency-reports', name: 'Your agency’s own reports', h1: 'Arcus vs. your agency’s own reports',
    lead: 'A report written by the people being graded can’t be the final word. Here’s what changes when every agency’s claims sit in one layer, next to your own numbers.',
    rows: [['Who writes it', 'The agency being paid', 'Arcus, which has no stake in the result'], ['Starting point', 'Each ad platform’s own numbers', 'Your own numbers'], ['Same sale claimed twice', 'Counted twice', 'Counted once'], ['What it recommends', 'Usually more spend with them', 'Whatever the numbers support'], ['Proof of cause', 'Rarely tested', 'A regions-on, regions-off test when it matters']],
    better: 'Your agency’s report is still the best record of what they ran and when. Keep it. Just don’t let it be the only check.',
  },
  {
    slug: 'analytics-software', name: 'Analytics software', h1: 'Arcus vs. analytics software',
    lead: 'Software charts the data you point it at. Someone still has to connect every source, keep it clean, read it and decide what it means. Arcus does that part.',
    rows: [['Who sets it up', 'Your team', 'We do, in about three months'], ['Who reads it', 'Whoever has time', 'A person on our team, who writes up what it means'], ['What you get', 'Dashboards', 'A few slides with the answer on top'], ['Conversation online', 'Usually not included', 'Read and counted alongside your sales'], ['What it connects', 'The sources your team wires up', 'Every system you run, plus what people say online']],
    better: 'If your analysts want a tool to explore in, keep it. The layer we build is yours, and their software can sit on top of it.',
  },
  {
    slug: 'hiring-a-data-team', name: 'Hiring a data team', h1: 'Arcus vs. hiring a data team',
    lead: 'What it takes to hire, build and manage a marketing data team yourself, and when that’s the right call.',
    rows: [['Time to first answer', 'Months to hire, then months to build', 'One free question first, full setup in about three months'], ['Who you manage', 'The hires, the tools and the setup', 'Nobody. We keep it running inside your tools'], ['Skills covered', 'Whoever you could hire', 'AI, data engineering and marketing together'], ['When it ends', 'You keep the team', 'You keep the layer and every answer']],
    better: 'If data is core to how your company competes, build the team. Arcus can be the bridge while you hire.',
  },
  {
    slug: 'haus', name: 'HAUS', h1: 'Arcus vs. HAUS', checked: '[Last checked: date]',
    lead: 'HAUS is an incrementality testing platform built for growth teams at e-commerce brands. Arcus connects every piece of a brand’s data, plus what people say online, into one layer the brand owns, and answers any question with the whole picture, for entertainment and lifestyle brands.',
    rows: [['Built for', 'Performance and e-commerce growth teams', 'Brand teams at entertainment and lifestyle companies'], ['Main job', 'Running and reading lift tests', 'Connecting every piece of your data, checking every claim, and answering any question'], ['Who does the work', 'Your team, in the platform', 'We do, and send you the answers'], ['Conversation online', 'Not the focus', 'Read and counted']],
    better: 'If your team runs paid media in-house and wants to run its own lift tests, HAUS is built for that.',
  },
  {
    slug: 'hex', name: 'Hex', h1: 'Arcus vs. Hex', checked: '[Last checked: date]',
    lead: 'Hex is a workspace where data teams write queries (questions written in code) and build notebooks. Arcus builds the connected layer underneath and answers the questions for you.',
    rows: [['Built for', 'Data analysts and data scientists', 'Marketing leaders'], ['What you do', 'Write queries, build notebooks', 'Read a few slides, ask questions'], ['Setup', 'Your data team connects and models the data', 'We do'], ['Output', 'Analyses your team builds', 'A few slides with the answer on top']],
    better: 'If you have analysts, Hex is a strong tool for them, and it can sit on top of the layer we build.',
  },
];

export const FAQ = [
  ['The basics', 'What is Arcus?', ENTITY],
  ['The basics', 'Who is Arcus for?', 'In-house marketing teams at studios, streamers, drinks, games, music, fashion and beauty brands. Especially teams without their own data department.'],
  ['The basics', 'Is Arcus software or a service?', 'Both. Arcus is our own product, and our engineers set it up inside your systems and run it with you. You don’t get a login and a manual: we connect your data into one place inside your own setup and keep it running. You ask questions, and answers land in Slack, email, Sheets or your dashboard. There’s nothing new to log into, and the layer is yours to keep.'],
  ['The basics', 'What do you connect?', 'Every system that holds a piece of your marketing: sales, tickets or sign-ups; players, viewers or app usage; email, CRM and customer data; retail and partner data; your ad and social accounts; your agencies’ reports; and any listening tool you already use. It all goes into one layer you own.'],
  ['The basics', 'Do we need a data team?', 'No. We do the data work. You get the answers.'],
  ['The basics', 'Do you look at what people say online?', 'Yes. We read Reddit, TikTok, YouTube, X, Instagram, Facebook groups, Discord, Twitch, Kick, Google Search, Goodreads, Fable, reviews and more, count what comes up, and line it up with your own sales and customer data.'],
  ['The first question', 'What do we get from the free question?', 'One question, answered with your own numbers and what people say: whether an agency’s results actually happened, which of your posts work, what your audience says, or something else you need to know. You get a few slides, answer on top, ending in what to keep, test and stop, plus a 30-minute walkthrough.'],
  ['The first question', 'What do you need from us?', 'Your question, and access to the numbers it needs from your own systems (sales, tickets, sign-ups or viewing). For an agency question, also the agency report and the ad accounts it covers. We walk you through it.'],
  ['The first question', 'Is it really free?', 'Yes. No card.'],
  ['The first question', 'How long does it take?', `${TBD.turnaround}`],
  ['Working with us', 'How long does setup take?', 'About three months from kickoff to everything connected. You approve each step, and answers arrive along the way.'],
  ['Working with us', 'What kinds of reports do you send?', 'Most answers fall into four kinds: agency checks, content reports, audience reports and market reports. You can ask anything else too. Each answer is a few slides with the answer on top and what to keep, test and stop at the end.'],
  ['Working with us', 'How often do reports come?', 'On a schedule you choose, or whenever you have a question.'],
  ['Working with us', 'Do we have to change agencies?', 'No. Arcus works alongside your agencies and holds them to your own numbers. Sometimes that shows an agency is doing great work, and you’ll know that too.'],
  ['Working with us', 'How much does it cost?', 'Your first question is free. After that there’s a one-time setup fee and a monthly fee. The Pricing page has the details.'],
  ['Data and trust', 'Is this the same as attribution?', 'No. Matching claims against your own numbers removes double counting. When you need to know whether something caused a sale, we run a simple test: show it in some regions and not others, then compare.'],
  ['Data and trust', 'Who checks the AI?', 'A person on our team reads every report before you do and writes up what it means. The AI can only do jobs we’ve approved, and every step is logged.'],
  ['Data and trust', 'Who sees our data?', '[Confirm: only the Arcus team working with you.] The Security page has the details.'],
];

export const GLOSSARY = [
  ['attribution', 'Attribution', 'Deciding which ad, post or channel gets credit for a sale.', 'Every ad platform does its own attribution, and each one gives itself credit. That’s why your agencies’ numbers can add up to more than you sold.', 'Which rule do you use to decide credit, and would another agency’s rule give the same sale to them?', 'agency-double-counting-sales'],
  ['incrementality', 'Incrementality', 'The sales that happened because of a campaign and wouldn’t have happened without it.', 'If people searching your name would have bought anyway, those sales aren’t incremental, even if an ad was clicked first.', 'How do you know these sales wouldn’t have happened anyway?', 'incrementality-without-the-math'],
  ['double-counting', 'Double counting', 'When two or more agencies or platforms each take credit for the same sale.', 'A buyer who saw a creator video and then clicked a Meta ad can be claimed by both agencies. Add their reports together and you get more sales than you made.', 'If we add up every agency’s claims, does the total match our own numbers?', 'agency-double-counting-sales'],
  ['holdout-test', 'Holdout test', 'A test where a campaign runs in some places and not others, so you can compare.', 'Run ads in half your regions for a few weeks and leave the other half alone. The difference in sales is the campaign’s real effect.', 'Can we hold out a region before we increase spend?', 'incrementality-without-the-math'],
  ['roas', 'ROAS', 'Return on ad spend: sales credited to ads, divided by what the ads cost.', 'ROAS is only as honest as the sales it’s credited with. If those sales are double counted, ROAS looks better than it is.', 'Which sales are in the top line of this ROAS, and are they also in another agency’s report?', 'read-an-agency-report'],
  ['view-through-conversion', 'View-through conversion', 'A sale credited to an ad that someone saw but didn’t click.', 'View-throughs can inflate results fast, because a lot of people see an ad and buy for other reasons.', 'How many of these conversions are view-throughs, and over how many days?', 'read-an-agency-report'],
  ['conversion-window', 'Conversion window', 'How many days after seeing or clicking an ad a sale still counts for it.', 'A long window lets an ad claim sales that happened weeks later for other reasons.', 'What are your click and view windows, and can we see results at a shorter one?', 'read-an-agency-report'],
  ['last-click', 'Last-click attribution', 'Giving all the credit to the last thing someone clicked before buying.', 'It often hands credit to brand search, which mostly catches people who were already going to buy.', 'How much of this credit goes to people searching our name?', 'agency-double-counting-sales'],
  ['brand-search', 'Brand search', 'Ads shown to people who search your brand’s name.', 'People typing your name were already looking for you. Paying for those clicks can make a channel look great while doing little.', 'What happens to sales if we pause brand search in one region?', 'incrementality-without-the-math'],
  ['creator-code', 'Creator code', 'A discount code or link given to a creator so sales can be traced to them.', 'Codes leak to coupon sites and get used by people who’d have bought anyway, so they need checking against your own numbers.', 'How many of this creator’s code uses came from coupon sites?', 'questions-before-you-renew'],
  ['first-party-data', 'First-party data', 'Data your company collects itself: sales, tickets, sign-ups, viewing, customers, email, your own social accounts.', 'It’s the most reliable data you have, and usually the least used.', 'What are we collecting already that nobody is reading?', 'first-party-data-for-brand-marketers'],
  ['third-party-data', 'Third-party data', 'Data from outside your company: public conversation, search trends, reviews, market research.', 'On its own it tells you what people say. Lined up with your first-party data, it tells you whether they buy.', 'Where does our audience talk when we’re not posting?', 'social-listening-that-counts'],
  ['social-listening', 'Social listening', 'Reading what people say about a brand, product or topic across social media and the web.', 'Most listening tools summarize sentiment. Useful listening counts specific things, like the words fans use, and checks them against sales.', 'What did we change because of the last listening report?', 'social-listening-that-counts'],
  ['media-mix-modeling', 'Media mix modeling', 'A statistical model that estimates how much each channel contributes to sales over time.', 'It needs a lot of clean history to work, and a data team to keep it honest.', 'How much history does the model use, and when was it last checked against a test?', 'do-you-need-a-data-team'],
].map(([slug, name, def, why, ask, article]) => ({ slug, name, def, why, ask, article }));
