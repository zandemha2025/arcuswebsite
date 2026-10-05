// Deeper reference content: glossary detail, new glossary terms, compare pages and more FAQ.
// Rules: only deck numbers (anonymized) or numbers clearly labeled as made-up examples.
// Unconfirmed company facts are in [brackets]. Compare `sections` bodies hold two paragraphs split by a blank line ('\n\n').
import { TBD } from './site.js';

// ---------------------------------------------------------------------------
// New glossary terms, same shape as GLOSSARY items
// ---------------------------------------------------------------------------
export const GLOSSARY_NEW = [
  ['share-rate', 'Share rate', 'How often people who saw a post sent it on: shares divided by views.', 'A share means someone put their own name behind your post. It’s often the clearest sign a post has a life beyond the people who saw it.', 'Which posts got the most shares per view, and does that hold on every platform or only one?', 'which-posts-actually-work'],
  ['engagement-rate', 'Engagement rate', 'Likes, comments, shares and saves on a post, divided by the people who saw it or by follower count.', 'It tells you how hard a post landed with the people who saw it. It doesn’t tell you how many people that was.', 'Is this rate divided by views, reach or followers, and how many people did the post reach?', 'which-posts-actually-work'],
  ['reach-vs-impressions', 'Reach vs. impressions', 'Reach is how many different people saw something. Impressions is how many times it was shown, counting repeats.', 'Impressions are always the bigger number, which is why they lead so many recaps. Ten impressions can be one person seeing an ad ten times.', 'How many different people did this reach, and how many times did each of them see it?', 'read-an-agency-report'],
  ['brand-lift-study', 'Brand lift study', 'A survey that compares people who saw a campaign with people who didn’t, to measure changes in awareness, recall or intent.', 'It’s one of the few measures built for brand work. It measures what people say in a survey, which is a step away from what they buy.', 'Who ran the survey, how were the two groups chosen, and did the lift show up in our own numbers later?', 'incrementality-without-the-math'],
  ['retail-media', 'Retail media', 'Ads sold by retailers on their own websites and apps, measured against the retailer’s own sales data.', 'It’s often the closest a brand gets to seeing ads tied to retail sales. It’s also measured by the company selling the ads.', 'Are we buying this for sales we can measure, or for position in the retailer’s search results, and how will we judge it?', 'read-an-agency-report'],
  ['sell-through', 'Sell-through and depletions', 'Sell-through is how much product shoppers buy at retail. Depletions are how much distributors sell on to retailers, bars and restaurants.', 'For drinks and other retail-heavy brands, these are the numbers closest to real demand. Shipments into a warehouse can rise while shelves sit full.', 'Which number are we judging this campaign against: shipments, depletions or what shoppers bought?', 'first-party-data-for-brand-marketers'],
  ['creator-whitelisting', 'Creator whitelisting', 'Running paid ads through a creator’s account, so the ad appears under their name. Also called allowlisting or partnership ads.', 'Whitelisted posts mix creator content and paid media in one place, which makes it easy for two agencies to claim the same results.', 'When we put spend behind a creator’s post, whose report claims the results: the creator agency’s or the media agency’s?', 'questions-before-you-renew'],
  ['sentiment', 'Sentiment', 'A score for whether conversation about a brand is positive, negative or neutral.', 'Sentiment is the headline of most listening reports. Automated scores miss sarcasm and in-jokes, which is how many audiences talk.', 'Who checked the sentiment labels, and what would we do differently if the score moved?', 'social-listening-that-counts'],
].map(([slug, name, def, why, ask, article]) => ({ slug, name, def, why, ask, article }));

// ---------------------------------------------------------------------------
// Deep glossary entries, keyed by slug (all existing GLOSSARY slugs + GLOSSARY_NEW)
// ---------------------------------------------------------------------------
export const GLOSSARY_DEEP = {
  'attribution': {
    more: [
      'Attribution is the rule that decides which ad, post or channel gets credit when someone buys, gets a ticket, signs up or starts watching. There are many rules. Last-click gives everything to the final click. Multi-touch splits credit across several steps along the way. A view-through rule gives credit to ads people saw but never clicked.',
      'The catch is who runs the rule. Each ad platform attributes results to itself, using its own rule and only the data it can see. Meta can’t see your TikTok ads, and TikTok can’t see your email. So every platform tells a story where it’s the hero, and your agencies pass those stories on. That isn’t dishonest. It’s incomplete.',
    ],
    example: 'Example (made-up numbers): one buyer watches a creator’s video on Monday, clicks a Meta ad on Wednesday and searches your name to buy on Friday. Under last-click, search gets the whole sale. Under an even split, each of the three gets a third. Under each platform’s own rule, all three claim the full sale, so one sale shows up as three.',
    mistake: 'Treating an attributed result as proof the ad caused it. Attribution says an ad was on the path. It can’t say whether the person would have bought anyway.',
    arcus: 'We start from your own numbers and apply one rule to every agency and platform, so each result is credited once. When a budget decision depends on cause, we design a regions-on, regions-off test your agency sets up, and read it on your own numbers, because no attribution rule can answer that.',
    related: ['double-counting', 'last-click', 'incrementality', 'view-through-conversion'],
  },
  'incrementality': {
    more: [
      'Incrementality asks the question that matters most for a budget: what would have happened without this? The sales, tickets or sign-ups you’d have lost if the campaign hadn’t run are incremental. The ones that would have come anyway aren’t, even if an ad was clicked first.',
      'You can’t see incrementality in a single report, because every report only shows what happened with the ads on. To see it, you need a comparison: a group that saw the campaign and a similar group that didn’t. For most brand teams the cleanest version is a holdout test by region. It takes a few weeks and some patience, and it’s the only number in this glossary that speaks to cause.',
    ],
    example: 'Example (made-up numbers): a campaign runs in 10 regions and is held back in 10 similar ones for four weeks. The regions with ads sell 1,100 cases a week, and the regions without sell 1,000. The campaign’s incremental effect is about 100 cases a week, even if the agency report credits it with 600.',
    mistake: 'Assuming attributed results are incremental. People who search your name, open your email or use a code they found online were often going to buy anyway.',
    arcus: 'When you need proof of cause, we design and read a regions-on, regions-off test, using your own numbers as the scoreboard. If a test is too small or too short to call, we tell you before it starts.',
    related: ['holdout-test', 'attribution', 'brand-search', 'brand-lift-study'],
  },
  'double-counting': {
    more: [
      'Double counting happens when two or more agencies, platforms or reports each take full credit for the same result. It’s the most common reason agency numbers add up to more than the business sold.',
      'Nobody has to be acting in bad faith. Each platform credits itself when its ad touched the buyer, and each agency reports what its platforms say. When one buyer saw a creator post, a paid social ad and a search ad, three reports can each count the same sale. Read alone, each one looks fine. Added together, the total runs past your own numbers.',
    ],
    example: 'Example: three agencies claim 4,200 results for a quarter. Matched against the brand’s own numbers, 1,380 hold up. Of the 2,820 that don’t, 1,610 were counted twice, 740 came from email and 470 came from people already searching the brand’s name.',
    mistake: 'Checking each agency report on its own. Double counting only shows up when you put every report next to your own total for the same dates.',
    arcus: 'This is the core of every agency check. We match each claim to your own sales, tickets, sign-ups or streams, count every result once, and show which claims held up, which were counted twice, and which belonged to another channel.',
    related: ['attribution', 'last-click', 'roas', 'creator-whitelisting'],
  },
  'holdout-test': {
    more: [
      'A holdout test is the most direct way to find out whether something caused a result. You run a campaign in some places, hold it back in similar places, and compare what happens. The difference is the campaign’s effect.',
      'For brand teams, regions work well: cities, states or TV markets. You pick matched groups, run for a few weeks, and keep everything else steady. Each region needs enough volume to show a difference, and you have to go dark somewhere for a while, which is the part teams find hardest. It’s also the part that makes the answer trustworthy.',
    ],
    example: 'Example (made-up numbers): you pause brand search ads in 8 of 16 regions for four weeks. Sales in the paused regions dip by 2%, while the search agency had been crediting itself with 20% of sales. Most of those buyers found you anyway.',
    mistake: 'Calling a test too early or on too few regions. A small difference over two weeks can be noise, and a confident read on noise is worse than no read.',
    arcus: 'We design the test with your team, pick matched regions from your own numbers, and read the result. If your volume can’t support a clear answer, we say so before you go dark anywhere.',
    related: ['incrementality', 'brand-search', 'brand-lift-study', 'media-mix-modeling'],
  },
  'roas': {
    more: [
      'ROAS, return on ad spend, divides the sales credited to ads by what those ads cost. A ROAS of 4 means every dollar of spend is credited with four dollars of sales. It’s the headline number in most paid media reports.',
      'The division is easy. The top line is the problem. ROAS uses attributed sales, so it inherits every issue in this glossary: double counting, long windows, view-throughs and brand search. Two agencies can both report a strong ROAS on the same sales. And for retail-heavy brands, much of what sells never shows up in any platform’s ROAS at all.',
    ],
    example: 'Example (made-up numbers): an agency spends $10,000 and is credited with $50,000 in sales, a ROAS of 5. Matched against your own numbers, $20,000 of those sales were also claimed by another agency. Counted once, the ROAS is 3.',
    mistake: 'Comparing ROAS across agencies or platforms that each count sales their own way. A 5 from one and a 3 from another may describe the same buyers.',
    arcus: 'We recalculate ROAS from your own numbers, with each result counted once and one rule for every channel. Where ROAS is the wrong yardstick, like retail media bought for position on the shelf, we say what to judge it by instead.',
    related: ['double-counting', 'conversion-window', 'retail-media', 'attribution'],
  },
  'view-through-conversion': {
    more: [
      'A view-through conversion is a sale, ticket or sign-up credited to an ad the person saw but never clicked. If someone scrolled past your video on Tuesday and bought on Friday, the platform can count that as a view-through.',
      'Views are cheap and plentiful, so view-throughs add up fast. Some ads do work without a click, especially video and brand work, which is why view-throughs exist. But a platform that shows your ad to a lot of people will find many of them buying later for reasons that have nothing to do with the ad. The longer the window and the bigger the audience, the more credit flows in.',
    ],
    example: 'Example (made-up numbers): an agency reports 1,000 conversions. 300 came from clicks and 700 from views within seven days. Ask to see the 300 on their own, then check how many of the 700 also appear in another agency’s report.',
    mistake: 'Reading a view-through total as if every one were a click. Many reports blend the two into one conversions number without saying so.',
    arcus: 'We split click and view credit in every agency check, match both against your own numbers, and flag view-through claims that overlap with other channels.',
    related: ['conversion-window', 'attribution', 'double-counting', 'reach-vs-impressions'],
  },
  'conversion-window': {
    more: [
      'The conversion window is how many days after someone sees or clicks an ad a result still counts for it. Platforms usually set separate windows for clicks and for views, and agencies can often choose them.',
      'Short windows miss some real effects. Long windows sweep in results that happened for other reasons, like a payday, a friend’s recommendation or a new season dropping. When two reports use different windows, you can’t compare them. Ask for the window before you read the number.',
    ],
    example: 'Example (made-up numbers): the same campaign is credited with 400 sign-ups at a 1-day click window and 900 at a 28-day click and 7-day view window. Nothing about the campaign changed. Only the rule did.',
    mistake: 'Comparing this quarter with last quarter, or one agency with another, without checking that the windows match.',
    arcus: 'We note the window behind every claim, line claims up against your own numbers by date, and show results at one consistent window across agencies so the comparison is fair.',
    related: ['view-through-conversion', 'attribution', 'roas', 'last-click'],
  },
  'last-click': {
    more: [
      'Last-click attribution gives all the credit for a result to the last thing someone clicked before buying, signing up or getting tickets. It was the default in web analytics for years, and many reports still lean on it.',
      'Its blind spot is everything earlier. The trailer, the creator post or the poster that made someone curious gets nothing, and the final click, often a search for your name or a link in an email, gets everything. That makes channels that catch people at the end look brilliant and channels that start interest look weak. Brand work mostly starts interest, so for brand teams it’s an especially unfair rule.',
    ],
    example: 'Example (made-up numbers): 100 buyers watch a creator video, then later search your name and buy. Last-click gives brand search 100 sales and the creator zero.',
    mistake: 'Cutting the channels that start interest because last-click shows them doing nothing, then watching search results fall a few months later.',
    arcus: 'We show how much last-click credit goes to brand search and email, where people were already on their way, and use a holdout test when you need to know what the earlier steps are worth.',
    related: ['attribution', 'brand-search', 'incrementality', 'conversion-window'],
  },
  'brand-search': {
    more: [
      'Brand search ads appear when someone searches your brand’s name, or the name of your show, game or product. They usually look like the best ads you run: cheap clicks, lots of conversions, great ROAS.',
      'They look great because the people typing your name were already looking for you. Some brand search spend is sensible, for example when a competitor bids on your name. But a big share of the results credited to it would likely have arrived through the free listing right below the ad. The only way to know how much is to pause it somewhere and watch.',
    ],
    example: 'Example: three agencies claim 4,200 results for a quarter and 1,380 hold up against the brand’s own numbers. Of the claims that don’t, 470 came from people who were already searching the brand’s name.',
    mistake: 'Treating brand search ROAS as proof that search is your best channel. It mostly measures how many people already knew your name.',
    arcus: 'In every agency check we separate results from people searching your name and show how much credit each agency took for them. When the number is big enough to matter, we suggest a regions-off test for brand search.',
    related: ['last-click', 'incrementality', 'holdout-test', 'roas'],
  },
  'creator-code': {
    more: [
      'A creator code is a discount code or tracked link given to one creator, so results can be traced back to their content. It’s the most common way creator programs are measured and paid.',
      'Codes travel. They end up on coupon sites and browser extensions, get passed around group chats, and get typed in at the last step by people who were going to buy anyway. A creator can look like a top seller because their code is the first one that turns up in a search for discounts. Links are cleaner, but they miss people who watch now and buy later without clicking.',
    ],
    example: 'Example (made-up numbers): a creator’s code is used 500 times in a month. 200 uses come from buyers who arrived through a coupon site, and 100 come from buyers who also clicked a paid social ad. The creator’s own audience accounts for about 200.',
    mistake: 'Renewing or cutting creators on code uses alone, without checking where those buyers came from.',
    arcus: 'We match every code and link against your own numbers, flag uses that came through coupon sites or other channels, and count each result once, so you can see which creators bring their own audience.',
    related: ['creator-whitelisting', 'double-counting', 'attribution', 'share-rate'],
  },
  'first-party-data': {
    more: [
      'First-party data is everything your company collects itself: sales, tickets, sign-ups, viewing, customer lists, email and CRM, loyalty programs, and the stats from your own social accounts. The agency reports you already receive count too.',
      'It’s the most reliable data you have, because nobody is grading their own work with it. It’s also the least used, because it’s spread across tools and teams and nobody owns the job of lining it up. Once it’s in one place, it becomes the scoreboard every agency claim and every listening finding gets checked against.',
    ],
    example: 'Example (made-up numbers): a drinks brand has weekly sales from its distributor, 20,000 email subscribers and its own Instagram stats. Lined up by week, the team sees that a jump in email sign-ups and a rise in sales landed in the same week as a widely shared post. That’s a lead worth testing, and a test is what would show whether the post caused it.',
    mistake: 'Assuming you need perfect data to start. Most brands already have enough to check an agency report, and the gaps are worth knowing about too.',
    arcus: 'Arcus connects every piece of it, from sales to email to your social stats, into one layer you own, inside the tools you already use. That layer is the starting point for every claim we check and every question we answer. Where it’s too thin to call something, the answer says so. [Confirm: data stays in the brand’s environment and access is read-only.]',
    related: ['third-party-data', 'social-listening', 'sell-through', 'double-counting'],
  },
  'third-party-data': {
    more: [
      'Third-party data comes from outside your company: public conversation on social platforms and forums, search trends, reviews, ratings sites, trade press and market research.',
      'On its own it tells you what people say and search for. That’s useful, and it’s easy to over-read, because the loudest corners of the internet aren’t always the people who buy. It earns its keep when it’s lined up with your first-party data, so you can see whether what people talk about moves sales, tickets, sign-ups or streams.',
    ],
    example: 'Example (made-up numbers): reviews mention one flavor 300 times in a month. Lined up with sales, that flavor’s share of sales hasn’t moved. People like talking about it more than buying it, which is worth knowing before you build a campaign around it.',
    mistake: 'Treating the volume of conversation as demand. A topic can trend for a week and never show up in sales.',
    arcus: 'We read and count public conversation in the places your audience spends time, then line it up with your own numbers in the same layer, so every listening finding is checked against what people actually did.',
    related: ['first-party-data', 'social-listening', 'sentiment', 'share-rate'],
  },
  'social-listening': {
    more: [
      'Social listening means reading what people say about a brand, product, title or topic across social platforms and the wider web: Reddit, TikTok, YouTube, Discord, reviews, forums and more.',
      'A dashboard of mentions tells you how loud it got. Useful listening counts specific things a team can act on: the words people use, the formats they reward, the complaints that keep coming up. In a real Arcus audience report for a streaming service, counting 6,622 comments showed that one word in 62 was slang, and the slang words brands like to borrow barely appeared. That changes how you write a caption.',
    ],
    example: 'Example (made-up numbers): of 2,000 comments under your last ten posts, 300 mention one flavor and 40 mention the price. That tells you what to post more of, and what to keep an eye on.',
    mistake: 'Reporting share of voice and a sentiment score, then changing nothing. If a listening report doesn’t change a decision, it was a summary.',
    arcus: 'We plug in the listening tool you already have, read and count conversation in the rooms your audience uses, and have a person check the labels. Every finding shows the real lines people wrote, with counts attached. Then we line it up with your own numbers and end with what to make next.',
    related: ['sentiment', 'third-party-data', 'share-rate', 'engagement-rate'],
  },
  'media-mix-modeling': {
    more: [
      'Media mix modeling, or MMM, is a statistical model that estimates how much each channel contributes to sales over time. It uses years of weekly spend and sales data, plus things like price, season and distribution.',
      'Fed well, it can see channels that click-based attribution misses, like TV, outdoor and retail. It also needs a lot of clean history, careful setup and regular checks against real tests, or it starts producing confident numbers nobody can verify. For a brand team without analysts, the model often becomes a black box that an agency or vendor reads for you.',
    ],
    example: 'Example (made-up numbers): a model says TV drove 15% of last year’s sales. A regions-off test in two markets suggests something closer to 5%. The test is the stronger evidence, and the model should be adjusted to match it.',
    mistake: 'Treating model output as measured fact. It’s an estimate, and only as good as the history behind it and the tests used to check it.',
    arcus: 'We don’t lead with a model. We start from your own numbers, count each result once, and use holdout tests for cause. If you already have an MMM, we can check its claims the same way we check an agency’s.',
    related: ['incrementality', 'holdout-test', 'attribution', 'sell-through'],
  },

  // New terms
  'share-rate': {
    more: [
      'Share rate is shares divided by views, written as a percentage or as shares per 1,000 views. It tells you how often a viewer decided a post was worth sending to someone else.',
      'It’s a different signal from views. Views tell you a post was served and watched. Shares tell you someone wanted a friend to see it. In a real Arcus content report for a hard seltzer brand, the most shared Instagram post took 409 shares on 8,000 views, 51 per thousand, and no other post was above 12. It wasn’t the most viewed post, and it sat outside every content type the team had planned.',
    ],
    example: 'Example (made-up numbers): post A gets 20,000 views and 40 shares, a share rate of 0.2%. Post B gets 5,000 views and 50 shares, a share rate of 1%. B reached fewer people, and each viewer was five times as likely to send it on.',
    mistake: 'Reading share rate on tiny counts. In the same hard seltzer report, 24 of 29 Facebook posts had zero or one share, so share rate on Facebook was ranking posts on single shares. At those numbers it’s noise.',
    arcus: 'Our answers about content show views and shares side by side for each platform, never added across platforms, and flag where share counts are too small to read. We also note when a share count comes from a third-party tool and can’t be checked against the platform.',
    related: ['engagement-rate', 'reach-vs-impressions', 'social-listening', 'creator-code'],
  },
  'engagement-rate': {
    more: [
      'Engagement rate adds up the actions people take on a post (likes, comments, shares, saves) and divides by an audience number. That audience number varies. Some reports use views, some use reach, some use follower count, so the same post can have three different engagement rates.',
      'Rates are useful for comparing posts of different sizes. They can also hide the most important thing. In a real Arcus audience report for a streaming service, which looked at 293 TikToks young men posted themselves, sincere posts were liked 107 times per 1,000 views and acted-out comedy bits 106 times. The bits reached 42 times as many people. Judged on engagement rate, it was a tie.',
    ],
    example: 'Example (made-up numbers): post A gets 1,000 views and 100 engagements, a 10% rate. Post B gets 100,000 views and 5,000 engagements, a 5% rate. A wins on rate. B put the brand in front of 100 times as many people and drew 50 times the engagement.',
    mistake: 'Comparing engagement rates calculated on different bases, like one agency dividing by followers and another by views, or ranking posts on rate without looking at reach.',
    arcus: 'We show the count and the rate together, say what the rate is divided by, and use the same base for every post and every agency.',
    related: ['share-rate', 'reach-vs-impressions', 'social-listening', 'sentiment'],
  },
  'reach-vs-impressions': {
    more: [
      'Reach counts people. Impressions count showings. If one person sees your ad five times, that’s a reach of one and five impressions. Divide impressions by reach and you get frequency: the average number of times each person saw it.',
      'Platforms and tools label these differently, and “views” can mean either one depending on where the number came from. That matters when you compare. In a real Arcus content report for a hard seltzer brand, views meant organic impressions from the brand’s social tool, and Instagram and Facebook were kept apart and never added together, because the same person can be counted on both.',
    ],
    example: 'Example (made-up numbers): a campaign reports 3,000,000 impressions. Reach is 500,000 people, so the average person saw it six times. Whether that’s good depends on the goal, and it’s a very different story from three million people.',
    mistake: 'Adding impressions or reach across platforms or agencies. The same people are counted in each total, so the sum overstates how many people you reached.',
    arcus: 'Every answer says which one a number is and where it came from, and keep platforms separate unless there’s a way to remove the overlap.',
    related: ['engagement-rate', 'share-rate', 'view-through-conversion', 'double-counting'],
  },
  'brand-lift-study': {
    more: [
      'A brand lift study splits an audience into people who were shown a campaign and a similar group who weren’t, then asks both a few questions: have you heard of this brand, do you remember the ad, would you consider buying. The difference between the groups is the lift.',
      'The design is sound, and it’s closer to a real test than most brand metrics. Two things to keep in mind. When the platform selling the media also runs the study, it’s grading its own work, even if the method is fair. And a lift in what people say doesn’t always become a lift in what they do. The study is strongest when you can check it against sales, tickets, sign-ups or streams afterward.',
    ],
    example: 'Example (made-up numbers): 30% of people who saw the campaign say they recognize the brand, against 25% of people who didn’t. That’s a 5-point lift in awareness. The next question is whether regions with heavier exposure sold more in the weeks after.',
    mistake: 'Reading a lift in awareness or intent as a lift in sales. The two are related, and they’re separate measurements.',
    arcus: 'We treat a brand lift study as one piece of evidence, line it up with your own numbers for the same period, and suggest a regions-on, regions-off test when the budget riding on it calls for proof.',
    related: ['holdout-test', 'incrementality', 'reach-vs-impressions', 'attribution'],
  },
  'retail-media': {
    more: [
      'Retail media networks let brands buy ads inside a retailer’s own website and app, most often sponsored spots in the retailer’s search results. Most large US retailers now run one. What they offer that other channels can’t is a closed loop: the retailer can match ad exposure to its own sales data, including loyalty members who buy in person.',
      'That makes retail media look precise, and it is precise about one retailer. Like every platform, it still credits itself. In a real Arcus market report for a skincare brand moving into retail, the brands studied bought retail media for position: rank in the retailer’s search results, and a sales number that lands in front of the retail buyer before the next review. One was quoted saying it would accept a lower ROAS on newer networks. The report’s advice was to judge retail media by search rank and new-to-brand buyers, and to fund it from the trade budget.',
    ],
    example: 'Example (made-up numbers): a retailer reports $40,000 in attributed sales from $10,000 of sponsored search, a ROAS of 4. Part of that came from shoppers already searching your brand on the retailer’s site. The more useful numbers are how often you ranked near the top for your category and how many buyers were new to the brand.',
    mistake: 'Comparing retail media ROAS with social ROAS as if they were the same measure. Each network counts with its own rules and data, and both may claim the same buyer.',
    arcus: 'We connect retail media reports to the same layer as your own sell-through data and your other agencies’ claims, flag overlaps, and help you set goals that match why you’re buying it.',
    related: ['roas', 'sell-through', 'double-counting', 'brand-search'],
  },
  'sell-through': {
    more: [
      'Products move in steps. A brand ships to a distributor or retailer, which is sell-in or shipments. In drinks, the distributor then sells on to retailers, bars and restaurants, and those sales are called depletions. Finally shoppers buy from the shelf, which is sell-through, usually seen in retailer or scan data.',
      'Each step is a different number on a different delay. Shipments tell you what the trade expects to sell. Depletions tell you what the trade bought. Sell-through tells you what people bought. Retail buyers also watch their own measures: in a real Arcus market report for a skincare brand moving into retail, the four numbers buyers manage to were distribution (ACV), units per location per week against the category, household penetration and repeat.',
    ],
    example: 'Example (made-up numbers): a summer campaign runs in June. Shipments jump 20% in May as distributors stock up. Depletions rise 8% across June and July. Scan data shows shoppers bought 5% more than the same weeks last year. The 5% is closest to what shoppers did, and whether the campaign caused it needs a regional comparison.',
    mistake: 'Judging a campaign on shipments. Stocking up ahead of a promotion looks like demand, and it often shows up as a dip later.',
    arcus: 'We work with the sales data you have, whether that’s depletions from distributors, retailer data or scan data, line campaigns up with it by week and region, and tell you where it’s too thin to call.',
    related: ['retail-media', 'first-party-data', 'holdout-test', 'incrementality'],
  },
  'creator-whitelisting': {
    more: [
      'With whitelisting, a creator gives a brand or its agency permission to run ads from the creator’s handle. The post looks like the creator’s own, which tends to feel more at home in the feed, but there’s targeting and a paid budget behind it. Each platform has its own name for this, and the industry has been moving toward the word allowlisting.',
      'It blurs a line most reports rely on. A creator agency may report the post’s total views and code uses as the creator’s results. The media agency may report the same post’s paid conversions as its own. Both are describing one piece of content and one group of buyers. The creator’s own pull and the paid boost need to be separated before you judge either one.',
    ],
    example: 'Example (made-up numbers): a creator post earns 50,000 organic views. The brand then spends $5,000 to push it to 400,000 more people. The creator agency reports 450,000 views and 300 code uses. The media agency reports 250 conversions from the same post. Matched against your own numbers, there were 320 buyers in total.',
    mistake: 'Judging a creator on whitelisted results. Most of the reach was bought, so the numbers say more about the media budget than about the creator’s audience.',
    arcus: 'We separate organic and paid results for creator posts, match both to your own numbers, and count each buyer once, so creator renewals rest on the audience each creator brings.',
    related: ['creator-code', 'double-counting', 'reach-vs-impressions', 'attribution'],
  },
  'sentiment': {
    more: [
      'Sentiment analysis sorts posts and comments into positive, negative and neutral, usually with software, then rolls them up into a score or a percentage. It’s a quick way to spot a sudden change, like a product problem or a backlash.',
      'It struggles with the way many audiences talk. In a real Arcus audience report for a streaming service, the most-liked reply under one of the service’s own posts was “This looks bad. I’ll be watching.” with 16,481 likes. Read literally, it’s negative. In that room it means “I’m in.” Sarcasm was only 1 in 36 of the most-liked comments, and it was the second most-liked kind when it appeared. A sentiment score can turn that kind of support into a warning.',
    ],
    example: 'Example (made-up numbers): a listening tool scores a trailer’s comments 60% negative. Read by a person, a third of the “negative” comments are fans joking that they can’t wait.',
    mistake: 'Treating a sentiment score as a measure of whether people will buy, watch or sign up. Tone and intent are different things, and the score rarely says why it moved.',
    arcus: 'We label conversation by what people are doing (joking, praising, complaining, asking), with a person checking the labels, and show real lines with their counts. Sentiment is one column in the answer, never the headline.',
    related: ['social-listening', 'third-party-data', 'engagement-rate', 'share-rate'],
  },
};

// ---------------------------------------------------------------------------
// Compare pages, keyed by COMPARE slug
// ---------------------------------------------------------------------------
export const COMPARE_DEEP = {
  'agency-reports': {
    summary: 'An agency report tells you what the agency ran and what the ad platforms credited to it. An independent check starts from your own numbers, counts each result once across every agency, and shows which claims held up. Keep the agency report as the record of the work, and use a check when you decide budgets and renewals.',
    sections: [
      ['What an agency report is good for', 'Agencies know better than anyone what ran, when, where and at what cost. A good recap is the best record of the work: flights, creative, spend, delivery, and each platform’s view of the results.\n\nIt’s written from the platforms’ numbers, by the team being paid to run the work. That doesn’t make it wrong. It makes it one side of the story, and the side most likely to lean toward more of the same.'],
      ['Where agency numbers drift from yours', 'Each platform credits itself, each agency reports its own platforms, and no report includes the others. So when you add them up, the total often runs past your own sales, tickets, sign-ups or streams. Long counting windows, view-throughs and brand search widen the gap.\n\nExample: three agencies claim 4,200 results for a quarter. Matched against the brand’s own numbers, 1,380 hold up. The other 2,820 break down as 1,610 counted twice, 740 that came from email and 470 from people already searching the brand’s name. No single report looked wrong on its own.'],
      ['What an independent check adds', 'A check starts from your own numbers and works back to the claims. Each result is matched to the agencies that claimed it and counted once, with one rule for everyone. You see what held up, what was counted twice, and what belonged to another channel.\n\nIt also changes the conversation with your agencies. Instead of debating whose dashboard is right, everyone looks at the same total. Agencies doing good work tend to come out of a fair count well, and you can say so with evidence.'],
      ['What neither one proves', 'Matching claims against your own numbers removes double counting. It can’t prove an ad caused a sale, and neither can the agency’s report.\n\nWhen a decision needs proof of cause, like doubling a budget or cutting a channel, the answer is a holdout test: run the work in some regions and not others for a few weeks, then compare.'],
    ],
    decide: [
      'Rely on the agency report alone if you use one agency, no other channel could plausibly claim the same results, and its totals line up with your own numbers.',
      'Add an independent check if you use two or more agencies or platforms and their claims add up to more than you sold.',
      'Add a check before a renewal, a pitch or a budget increase, when the numbers will drive the decision.',
      'Add a check if most of your results come from tickets, streams, sign-ups or retail, where platform reports see the least.',
      'Keep the agency report either way if you need the record of what ran, when and what it cost.',
      'Ask for a holdout test if the question is whether the work caused the result, which neither report can answer.',
    ],
    both: 'Most teams keep agency recaps as the record of what ran and put an independent check beside them each month or quarter. The agency explains the work, and the check shows how its claims compare with your own numbers. The questions that come out of the check go into the next agency review.',
    faq: [
      ['Will checking our agencies hurt the relationship?', 'It doesn’t have to. A fair count with one rule for everyone tends to help agencies doing good work, because their results stop being lumped in with claims that didn’t hold up. Framing it as a shared scoreboard helps. [Confirm: whether Arcus ever contacts agencies directly, or works only through the brand.]'],
      ['Can our agency run this check itself?', 'An agency can compare its own claims with your numbers, and some do. It’s much harder for one agency to see where it overlaps with the others, and the check carries more weight coming from someone with no stake in the result.'],
      ['What if the agency report and our numbers match?', 'Then you’ve confirmed the agency’s claims, which is worth knowing before a renewal. The report will say so.'],
      ['Do we need to share every agency report?', 'For the first question, one is enough. Overlap shows most clearly when every agency’s report covers the same period, so a full check uses all of them.'],
    ],
  },

  'analytics-software': {
    summary: 'Analytics software gives your team charts and dashboards, and someone on your team still has to connect the data, keep it clean and decide what it means. Arcus connects every system you run into one layer you own, inside the tools you already use, checks every claim, and answers your questions as a few slides with the answer on top. Software suits teams with analysts who want to build their own views. Arcus suits teams that want answers with the whole picture.',
    sections: [
      ['What analytics software does well', 'Good analytics tools are fast, flexible and always on. If you know the question and where the data lives, a dashboard can answer it in seconds and keep answering it every day.\n\nThey also give a data team full control: define the metrics, change the views, dig into any slice. For companies with analysts, that control is the point.'],
      ['The work that comes with it', 'Someone has to connect each source, clean it, keep it running when a platform changes its export, and agree on definitions like what counts as a sale or a view. That work doesn’t end after launch.\n\nThen someone has to read the dashboards and turn them into a decision. On brand teams without analysts, that job lands on whoever has a spare hour, and dashboards drift into something people glance at and stop trusting.'],
      ['What Arcus does differently', 'Arcus connects every system you run, from sales and CRM to ad accounts and agency reports, into one layer you own, over about three months, inside the tools you already use. There’s no new software for your team to learn.\n\nIn place of a dashboard, you get answers: a few slides with the answer on top, the evidence, then what to keep, test and stop. A person on our team reads every answer before you do. Arcus also adds what people say online and lines it up with your own numbers, so the answer sees the whole picture.'],
      ['Questions to ask before you choose', 'Who on your team will own the setup and keep it running? Who will read it every week, and which decisions will they make from it?\n\nIf you have clear answers, software may be the right buy. If the honest answer to both is “we’ll figure it out,” that’s the gap Arcus was built for.'],
    ],
    decide: [
      'Pick analytics software if you have analysts who want to build and explore their own views.',
      'Pick software if your main need is daily monitoring of numbers you already trust.',
      'Pick Arcus if nobody on your team has time to set up, clean and read the data.',
      'Pick Arcus if you need agency claims checked against your own numbers and counted once.',
      'Pick Arcus if you want public conversation counted and lined up with sales, tickets, sign-ups or streams.',
      'Use both if your data team wants a tool and your brand team wants answers it can act on.',
    ],
    both: 'Your analytics software is one of the pieces Arcus plugs into. Your analysts keep their dashboards for daily monitoring, and Arcus answers the bigger questions, like which agency claims held up or who a launch is for, with everything connected.',
    faq: [
      ['Will we have to log in to a new tool?', 'No. Arcus builds the layer inside the tools you already use. You ask questions and read the answers, in Slack, email, Sheets or your dashboard.'],
      ['Can Arcus work with the analytics tools we already pay for?', 'Yes. We connect the tools you already use and build on top of them. [Confirm: list of supported tools and connectors.]'],
      ['What happens if we hire analysts later?', 'The layer is yours and lives inside your own setup, so they can pick it up and build on it. [Confirm: handover terms.]'],
      ['Isn’t a dashboard enough?', 'For monitoring, often it is. For deciding which agency, creator or type of content deserves more budget, someone still has to do the matching, the counting and the reading. That’s the part Arcus does.'],
    ],
  },

  'hiring-a-data-team': {
    summary: 'Hiring a data team gives you people who learn your business and stay. It also takes months to hire, more months to build, and someone to manage it all. Arcus starts with one free question and has the full setup running in about three months. If data is core to how you compete, build the team, and use Arcus as the bridge while you hire.',
    sections: [
      ['What a marketing data team needs', 'Answering the questions Arcus answers usually takes more than one person: someone to connect and clean the data, someone to analyze it, someone who knows marketing well enough to ask the right question, and more and more often someone who knows how to put AI to work safely.\n\nOne great hire rarely covers all of it. A first hire often spends months connecting data before anyone sees an answer, and leaves a gap when they move on.'],
      ['Time and management', 'Hiring takes months, and so does building. Then there are tools to pay for, priorities to set and careers to manage, often by a marketing lead who has never managed analysts.\n\nWe won’t guess at salaries here, because they vary too much by city and seniority. The useful comparison is time to the first answer you trust, and who carries the management load. With Arcus, the first answer is free, the full setup takes about three months, and you don’t manage anyone.'],
      ['When building your own team is right', 'If data is central to how your company competes, if questions come up every day, or if you need analysts in every planning meeting, build the team. People inside the company learn your business in ways an outside team can’t.\n\nMany brand teams aren’t there yet. They have a handful of big questions a quarter, agencies to hold to account and an audience to understand. For them, a full team can be more than the work needs.'],
      ['How Arcus works as a bridge', 'Arcus connects your data into one layer you own, inside your own setup, so nothing is locked away if you hire later. Your new team inherits connected data and a record of every past answer.\n\nTeams that hire can shift Arcus toward the work an outside view does best, like independent agency checks and listening, while their own people take on the day-to-day. [Confirm: how Arcus scopes work alongside an in-house data team.]'],
    ],
    decide: [
      'Hire a team if data is core to how your company competes.',
      'Hire a team if questions come up every day and you want analysts in every planning meeting.',
      'Pick Arcus if you need answers this quarter and can’t wait months to hire and build.',
      'Pick Arcus if nobody on your team has managed analysts or data engineers before.',
      'Pick Arcus if your biggest questions are about agencies, content and audience, a few times a quarter.',
      'Do both if you’re hiring and want a working setup ready for the team when it arrives.',
    ],
    both: 'Teams that are hiring use Arcus as the bridge: answers keep coming while recruiting runs, and the layer lives inside the brand’s own setup, so the new team starts with connected data. Once the team is in place, Arcus can keep running the work that benefits from an outside view, like independent agency checks and listening.',
    faq: [
      ['Would Arcus replace our analysts?', 'No. Arcus connects the pieces your analysts work from into one layer they can use too. Teams with analysts often use Arcus for the agency checks and listening their people don’t have time for.'],
      ['Can a team we hire later take over the setup?', 'It’s yours, inside your own setup and connected to tools you already use, so they can. [Confirm: handover and documentation terms.]'],
      ['How long until we see something useful?', 'Right away: your first question is answered free, with a 30-minute walkthrough. During the roughly three-month setup, answers arrive along the way.'],
      ['What does Arcus bring that one hire might not?', 'AI, data engineering and marketing together, plus listening across the places your audience talks. One person rarely covers all of that.'],
    ],
  },

  'haus': {
    summary: 'HAUS is an incrementality testing platform built for growth teams that want to run their own lift tests. Arcus is the truth layer for marketing leaders at entertainment and lifestyle brands: it connects every piece of your data into one layer you own, adds what people say online, checks every claim, and designs regions-on, regions-off tests when a decision needs proof of cause. If your team runs paid media in-house and wants a testing tool, look at HAUS. If you want any question answered with the whole picture, in a layer you own, look at Arcus.',
    sections: [
      ['What HAUS is built for', 'From its public positioning, HAUS helps growth and performance marketing teams measure incrementality: run lift tests across regions, read the results, and decide where the next dollar should go. It’s software your team uses. [Check on their site for current features, channels covered and pricing.]\n\nThat’s a strong fit for a team with an in-house media buyer or growth lead who wants to test continuously and is comfortable reading the output.'],
      ['What Arcus is built for', 'Arcus is for in-house brand teams at studios, streamers, drinks, games, music, fashion and beauty brands, often without a data department. Arcus connects your sales, tickets, sign-ups or streams, your CRM, ad accounts and agency reports into one layer you own, and adds what your audience says on Reddit, TikTok, YouTube, Discord, review sites and more. The Arcus team does the work and sends a few slides with the answer on top.\n\nTesting is one part of it. Often the first question is whether agencies’ claims hold up against your own numbers, with each result counted once. After that, any question can be asked of the whole picture. A holdout test comes in when a decision needs proof of cause.'],
      ['Who does the work', 'With a testing platform, your team designs the tests, coordinates with agencies, keeps everything else steady and interprets the result. With Arcus, our team does that and you read the answer.\n\nNeither is better in general. It depends on whether someone on your team wants testing to be part of their job.'],
      ['Results beyond online sales', 'Many entertainment and lifestyle brands measure success in tickets, streams, viewing, sign-ups or retail sell-through. Arcus works from whatever your own numbers are, and tells you where they’re too thin to call.\n\nIf your results come through theaters, streaming platforms, distributors or retailers, ask any vendor, HAUS included, how they handle that data. [Check on their site.]'],
    ],
    decide: [
      'Pick HAUS if you have a growth team that wants to run its own lift tests in a platform.',
      'Pick HAUS if paid media is run in-house and testing is a regular habit.',
      'Pick Arcus if your team is brand-side and nobody has time to design and read tests.',
      'Pick Arcus if you need agency claims checked against your own numbers before you need a test.',
      'Pick Arcus if what your audience says online matters as much to you as what your spend returns.',
      'Talk to both if you want continuous testing and an outside check on agencies and audience.',
    ],
    both: 'A company with a growth team might use a testing platform for ongoing lift tests on paid channels, and Arcus for independent agency checks, listening and the brand-side questions a testing tool isn’t set up to answer. Test results become one more piece Arcus connects to the layer, next to your own numbers. [Check on their site for how HAUS exports results.]',
    faq: [
      ['Does Arcus run incrementality tests like HAUS?', 'Arcus designs regions-on, regions-off holdout tests when a decision needs proof of cause, and reads them on your own numbers. Our team designs and reads them for you, alongside agency checks and listening.'],
      ['Who is HAUS a better fit for?', 'Teams with an in-house growth or performance lead who wants a testing platform to use directly. [Check on their site for who they serve today.]'],
      ['How do the costs compare?', 'We don’t publish other companies’ pricing. For HAUS: [Check on their site]. Arcus starts with one free question, then a one-time setup fee and a monthly fee. The Pricing page has the details.'],
      ['Can Arcus use results from a HAUS test?', 'If you share them, yes. Any test result is useful evidence, and we line it up with your own numbers and your agencies’ claims for the same period.'],
    ],
  },

  'hex': {
    summary: 'Hex is a shared data workspace where analysts write queries (requests for data), build notebooks and share what they find. Arcus connects every piece of your data into one layer you own, checks every claim, and answers your questions as a few slides with the answer on top. If you have a data team, Hex is a strong tool for them. If you don’t, Arcus does the work a notebook assumes someone on your team will do.',
    sections: [
      ['What Hex is built for', 'Hex is known as a shared workspace for data teams: notebooks where analysts write queries and code, build charts and turn their work into pages others can use. [Check on their site for current features and pricing.]\n\nIt assumes someone on your team knows how to query data, and that the data is already connected and organized. For a data team, that’s the right assumption.'],
      ['What changes without a data team', 'A notebook is a blank page. Someone has to know which question to ask, where the data lives, how to join sales with agency claims, and how to count each result once. Then someone has to explain it to the brand team.\n\nFor a brand marketing lead without analysts, a notebook is a tool built for a role you don’t have yet.'],
      ['What Arcus does in its place', 'Arcus connects your data into one layer you own over about three months, inside the tools you already have, and adds what people say online. Our team checks the claims, counts the conversation and writes the answers.\n\nYou ask questions in your own words. You get a few slides back: the answer on top, the evidence, then what to keep, test and stop.'],
    ],
    decide: [
      'Pick Hex if you have analysts who write queries and want a shared place to work.',
      'Pick Hex if your team wants to build and own its analyses.',
      'Pick Arcus if nobody on your team writes queries and you still need answers.',
      'Pick Arcus if you need agency claims checked and public conversation counted alongside your own numbers.',
      'Pick Arcus if you want every answer to end with what to keep, test and stop.',
      'Use both if a small data team wants a workspace and the brand team wants answers on agencies and audience.',
    ],
    both: 'A company with a data team might use Hex for internal analysis and Arcus for independent agency checks and listening. Because the layer Arcus builds is yours, the data it connects can be there for your analysts to use in their own tools. [Confirm: which workspaces and tools Arcus can share data with.]',
    faq: [
      ['Do we need to know SQL to use Arcus?', 'No. You read slides and ask questions. Our team does the data work.'],
      ['Is Hex a competitor to Arcus?', 'Only loosely. Hex is a workspace for analysts. Arcus connects your data and answers the questions for you. Some companies could use both.'],
      ['What does Hex cost?', 'We don’t publish other companies’ pricing. [Check on their site.]'],
      ['If we hire an analyst later, can they work with what Arcus built?', 'The layer is yours and lives inside your own setup, so they can work with it in the tools they prefer, Hex included. [Confirm: how in-house analysts get access.]'],
    ],
  },
};

// ---------------------------------------------------------------------------
// More FAQ: [category, question, answer]
// ---------------------------------------------------------------------------
export const FAQ_MORE = [
  ['The basics', 'We don’t sell online. Is Arcus still for us?', 'Yes. Arcus works from whatever your results are: tickets, streams, sign-ups, viewing, retail sales or distributor depletions. We match agency claims against those numbers, count each result once, and tell you where the data is too thin to call.'],
  ['The basics', 'Most of our sales happen at retail. Can you still check agency claims?', 'Yes. We line campaigns up with the sales data you have, whether that’s retailer data, scan data or depletions from distributors, by week and by region. Retail data usually arrives later and in less detail, so some answers need a regions-on, regions-off test, and we’ll say when.'],
  ['The basics', 'Why line up listening with our own numbers?', 'Conversation on its own tells you what people say. Your own numbers tell you what they do. Lined up, you can see which topics, formats and creators move sales, tickets, sign-ups or streams, and which ones only get talked about.'],

  ['The first question', 'Which agency report should we send?', 'If your first question is about an agency, send the report you’re least sure about, or the one with a renewal or budget decision coming up. A recent monthly or campaign recap works best, with the dates and the claimed results in it.'],
  ['The first question', 'What happens after the first question?', `We walk you through it on a 30-minute call. If it’s useful, we talk about a full setup: about three months to build, a one-time setup fee of ${TBD.setup} and a monthly fee of ${TBD.monthly}. If not, the answer is yours to keep. [Confirm: contract length and notice terms.]`],
  ['The first question', 'Will our agency know we’re checking their report?', '[Confirm: Arcus does not contact your agency for the first question, and whether to share the findings is your call.]'],
  ['The first question', 'What if our numbers are messy?', 'Most are. We work with what you have, note what’s missing, and tell you which findings are solid and which are directional. A gap in your data is a finding too.'],

  ['Working with us', 'What does a report look like?', 'A few slides. The answer is on top, then the evidence, then a short list of what to keep, test and stop. The last slide says what to know before quoting a number: small samples, missing data, anything that limits the call. In a real Arcus content report for a hard seltzer brand, that meant marking any content type with fewer than four posts as directional.'],
  ['Working with us', 'How much of our team’s time does this take?', 'Most of it comes at the start: a kickoff, access to the tools you use, and a few short calls during setup. After that, it’s asking questions, reading answers and a walkthrough when you want one. [Confirm: typical hours per month for the brand team.]'],
  ['Working with us', 'Who on our team should be involved?', 'The person who owns the agency relationships and the budget, usually a brand or marketing lead. During setup, it helps to have someone who can grant access to sales data, email or CRM, and ad accounts. Nobody needs to be technical.'],
  ['Working with us', 'How do agencies react?', 'It varies. Agencies doing good work tend to welcome a fair count, because it separates their results from claims that didn’t hold up. Pushback is usually about counting rules, and that’s a useful conversation to have once everyone is looking at the same total.'],
  ['Working with us', 'What does a normal month look like once you’re set up?', 'Anyone on the team can ask a question when one comes up, like whether to renew a creator or what fans said about a launch. Answers land in Slack, email, Sheets or your dashboard, with a walkthrough if you want one. Regular answers arrive on the schedule you choose. [Confirm: report cadence included in the monthly fee.]'],

  ['Listening', 'Where do you listen?', 'Wherever your audience talks in public: Reddit, TikTok, YouTube, Instagram, X, Threads, Bluesky, Facebook groups, Discord, Twitch, Kick, Google Search, Goodreads, Fable, Letterboxd, IMDb, Rotten Tomatoes, Steam, Roblox, Spotify and podcasts, Substack, Pinterest, reviews and trade press. We pick the places that matter for your brand. [Confirm: how private or invite-only communities are handled.]'],
  ['Listening', 'How is this different from a sentiment dashboard?', 'We count specific things: the words people use, the formats they reward, the complaints that keep coming back. In a real Arcus audience report for a streaming service, we counted 6,622 comments and found one word in 62 was slang. A person checks the labels, because sarcasm and in-jokes fool automated sentiment. If you already have a listening tool, we plug it in.'],
  ['Listening', 'What do you do with what you hear?', 'Turn it into what to make next. A real Arcus audience report for a streaming service ended with four rules for the brand’s voice, each backed by counts, like replying to fans’ jokes instead of starting your own. Where we can, we check a listening finding against your own numbers before you act on it.'],

  ['Data and trust', 'What access do you need, and is it read-only?', '[Confirm: read-only access] to the tools that hold your own numbers (sales, tickets, sign-ups or viewing), your email or CRM platform, your social accounts and the ad accounts your agencies report on. For the first question, we only need the accounts that one question touches.'],
  ['Data and trust', 'Where does our data live?', 'Arcus builds one layer you own, inside the tools you already use. [Confirm: what, if anything, is copied outside your environment, how long it’s kept, and how it’s deleted if you leave.]'],
  ['Data and trust', 'Are you SOC 2 compliant?', '[Confirm: SOC 2 status.] The Security page covers how we handle access, how every step is logged, and which jobs the AI is allowed to do.'],
];
