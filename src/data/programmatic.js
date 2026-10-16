// Programmatic pages: integrations (one per TOOLS item), channel guides ("<Platform> ads: how to tell what worked"), and more comparison pages.
// Rules: no invented numbers. Example numbers are labeled "Example". Unconfirmed facts are in [brackets].
// We never claim official partnerships, certified integrations or APIs. Each integration has a `confirm` line.
// Note: one TOOLS item (Google's data warehouse, whose name the content brief bans in site copy) is intentionally left out of INTEGRATIONS.
import { TOOLS } from './site.js';

// The channel guides moved to new URLs (<platform>-what-worked) on this date, so it is their publish date (SPINE-v2 §5).
const D = '2026-10-15';
const g = (slug, text) => `<a href="/glossary/${slug}">${text}</a>`;
const fr = (text = 'try it free') => `<a href="/free-report">${text}</a>`;
const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const logoFor = (name) => (TOOLS.find((t) => t.name === name) || {}).logo || '';

const it = (name, category, h1, lead, what, why, checks, pairsWith, faq) => ({
  slug: kebab(name), name, logo: logoFor(name), category, h1, lead, what, why, checks, pairsWith, faq,
  confirm: `[Confirm: how Arcus connects to ${name} (API, export or shared access).]`,
});

// Standard inline CTA at the end of every channel guide (SPINE-v2 §4).
const CTA = `<p>Want to see what worked for your brand? ${fr('Try it free')}: pick a question, and we answer it with your own numbers and what people say online. No card.</p>`;
const ASK = '<p>Ask them of whoever runs the account, in-house or a partner.</p>';

// ---------------------------------------------------------------------------
// Integrations
// ---------------------------------------------------------------------------
export const INTEGRATIONS = [
  // Ads
  it('Meta Ads', 'Ads',
    'See what Meta Ads really added, next to everything else.',
    'We read your Meta Ads data and connect it to your own sales, tickets, sign-ups or streams, your other ad accounts and what people say. Every result Meta credits to Facebook and Instagram is counted once.',
    'Spend, reach, impressions and the conversions Meta credits to each campaign and ad, along with the attribution setting each report uses, split into clicks and views where the account allows.',
    'Meta credits itself whenever its ad touched a buyer, and so does every other ad platform. Meta is often the biggest single number in a recap, so it’s usually the first place double counting shows up. Connected to everything else, Meta’s data can also show who it reached and what it added that other channels didn’t.',
    ['Do Meta’s reported results, added to every other channel’s, fit inside your own numbers?', 'How much of the result rests on views without a click, and over what window?', 'Which results came through partnership ads that also show up in your creator reports?', 'Are the people Meta reaches the same people who become your best customers?', 'Where could running ads in some regions and pausing them in others give a clean answer?'],
    ['TikTok Ads', 'Google Analytics', 'Shopify'],
    [['Do you need admin access to our Meta account?', 'We need to see reporting for the ad accounts you or your partners run. [Confirm: read-only access and the exact permission level.]'], ['Does whoever runs our ad accounts need to do anything?', '[Confirm: whether the account owner has to approve access, and whether Arcus ever contacts them.] You decide who sees the answers.']]),
  it('Google Ads', 'Ads',
    'See how much of your Google Ads credit comes from people already looking for you.',
    'We read your Google Ads data, split searches for your name from everything else, and connect what’s left to your own numbers and your other channels.',
    'Spend, clicks and the conversions Google credits to each campaign, plus the search terms behind them where the account shows them, so brand searches can be separated from the rest.',
    'Search sits right before the purchase, so it collects credit for people who already decided to buy. Brand search is often the cleanest place to find results that would have happened anyway. Connected to your social, creator and email data, it also shows what sent people to search in the first place.',
    ['How much of what Google Ads reports came from people searching your name?', 'Do campaign types that mix placements hide searches for your name?', 'Which searches came after a TikTok, a trailer or an email, and which channel did the work?', 'What would you see if you paused brand search in some regions and kept it on in others?'],
    ['Google Analytics', 'Meta Ads', 'YouTube Studio'],
    [['Do we have to pause brand search?', 'No. Pausing it in some regions is a test you can choose to run when a budget decision depends on it. Many teams find the answer worth a few weeks.'], ['Does this cover YouTube ads bought through Google Ads?', 'Yes, where they run in the same accounts. We report them separately, because video and search get credit in different ways.']]),
  it('TikTok Ads', 'Ads',
    'See what TikTok adds, next to everything else you run.',
    'We read your TikTok Ads data and connect it to your own numbers, your other channels and the comments under your posts. Boosted creator posts get a close look, because two reports often count them.',
    'Spend, views, video watch time and the conversions TikTok credits to each campaign and ad, including ads that run through creators’ posts.',
    'TikTok is where a lot of entertainment and lifestyle audiences first see a brand. That makes it easy for TikTok to get credit for results other channels finished, and for your creator and paid-media reports to count the same post.',
    ['Do TikTok’s reported results, added to every other channel’s, fit inside your own numbers?', 'How much of the result rests on views without a tap?', 'Which boosted creator posts show up in both your paid-media and creator reports?', 'Do the posts that sell match what people say in the comments?'],
    ['Meta Ads', 'Snapchat Ads', 'YouTube Studio'],
    [['Can you read the comments on our TikTok ads too?', 'Public comments, yes. We read and count them as part of listening and line them up with results.'], ['What if a separate partner runs our creators on TikTok?', 'That’s common. We read both reports and count each result once, whoever ran the post.']]),
  it('Snapchat Ads', 'Ads',
    'See what Snapchat adds that your other channels don’t.',
    'We read your Snapchat Ads data and connect it to your own sales, tickets, sign-ups or streams, and to your TikTok and Instagram results.',
    'Spend, impressions, swipes and the conversions Snapchat credits to each campaign, with the click and view settings behind them.',
    'Snapchat reaches younger audiences many entertainment brands care about. Its results often overlap with TikTok and Instagram, so it’s worth seeing the combined total.',
    ['Do Snapchat’s reported results, added to every other channel’s, fit inside your own numbers?', 'How much of the result rests on views rather than swipes or clicks?', 'Is Snapchat reaching people TikTok and Instagram miss, or the same ones?', 'Which regions could carry a clean test, with ads running in some and paused in others?'],
    ['TikTok Ads', 'Meta Ads', 'Google Analytics'],
    [['Is Snapchat worth a look if spend is small?', 'Yes. A small budget can still get credit for a large share of results. Lining that credit up with your own numbers shows whether it fits the spend.'], ['Do you need our Snap pixel data?', 'We work from what the account reports and your own numbers. [Confirm: which Snapchat data Arcus reads.]']]),
  it('Pinterest Ads', 'Ads',
    'See what Pinterest starts, on its slower timeline.',
    'We read your Pinterest Ads data and connect it to your own numbers and your other channels, with an eye on how long after a Pin each result happened.',
    'Spend, impressions, saves, clicks and the conversions Pinterest credits to each campaign, with the window each report uses.',
    'People use Pinterest to plan, so many of them buy later. Longer gaps between an ad and a result give more channels a chance to take credit for the same buyer.',
    ['How far back does Pinterest’s credit reach, and what else reached the same buyer in between?', 'Do saved Pins lead to sales, or only to more saves?', 'Do Pinterest’s reported results, added to every other channel’s, fit inside your own numbers?', 'What are people planning around your products this season?'],
    ['Meta Ads', 'Google Analytics', 'Shopify'],
    [['Do saves count as results?', 'Not on their own. They’re a sign of interest. We line them up with results to see whether they lead anywhere.'], ['Can you read organic Pinterest too?', 'Public Pins and boards can be part of listening. [Confirm: which organic Pinterest data Arcus reads.]']]),
  it('Reddit Ads', 'Ads',
    'See what your Reddit ads did, and how the threads took them.',
    'We read your Reddit Ads data and connect it to your own numbers. Then we add the public conversation in the communities you advertise to.',
    'Spend, impressions, clicks and the conversions Reddit credits to each campaign, plus the communities and interests each campaign targeted.',
    'Reddit is where fans argue about titles, flavors and launches in detail. Ad results only tell half the story: the comments under a promoted post and the threads around it show how the community took it.',
    ['Do Reddit’s reported results hold up in your own numbers, counted once with every other channel’s?', 'What did people say under your promoted posts?', 'Are you advertising where your audience already talks for free?', 'Did a big organic thread drive results an ad got credit for?'],
    ['Meta Ads', 'Google Analytics', 'Mixpanel'],
    [['Do you read private subreddits?', 'No, only public conversation. [Confirm: how private or invite-only communities are handled.]'], ['Is Reddit worth testing for a brand like ours?', 'If your audience already talks there, it can be. A look at what Reddit reports and what fans say is a good first step.']]),
  it('LinkedIn Ads', 'Ads',
    'See which LinkedIn sign-ups and leads became something.',
    'We read your LinkedIn Ads data and connect the sign-ups, registrations and leads it credits to your CRM, so each person is counted once and followed forward.',
    'Spend, impressions, clicks, lead form submissions and the conversions LinkedIn credits to each campaign.',
    'Brand teams use LinkedIn for trade audiences, events, partnerships and hiring. Those results usually land in a CRM too, so it’s easy to count the same person twice.',
    ['How many of LinkedIn’s leads are already in your CRM from another source?', 'How many results were views without a click?', 'Which registrations came after an email invite?', 'Which leads became meetings, deals or attendees?'],
    ['Salesforce', 'HubSpot', 'Google Analytics'],
    [['We mostly use LinkedIn for trade and B2B. Is that in scope?', 'Yes. Registrations, sign-ups and leads are results, and they’re counted the same way.'], ['Can you tell which leads became something?', 'If your CRM tracks it, yes. We line up LinkedIn’s leads with what happened next.']]),

  // Sales and ticketing
  it('Ticketmaster', 'Sales and ticketing',
    'Connect your Ticketmaster sales to everything that sold them.',
    'We read your Ticketmaster sales data and connect it to your campaigns, your CRM and what fans say, by event, date and place.',
    'Ticket sales by event, date and price level, and where buyers are, when your account shows it.',
    'Tickets are the result that matters for live events and releases. Connected to your ad accounts, email and fan conversation, ticket sales by market and day show which pushes filled seats and who bought them.',
    ['Do your channels’ reported ticket sales add up to more than you sold?', 'Which pushes moved sales by market and day?', 'Did buyers come from your own list, or were they new?', 'Which markets could go without ads for a few weeks, as a clean test before the next on-sale?'],
    ['Meta Ads', 'Eventbrite', 'Salesforce'],
    [['We only get Ticketmaster reports as exports. Is that enough?', 'Often, yes, if they show sales by date and market. We’ll tell you what’s missing.'], ['Can you separate presale from general on-sale?', 'If your reports split them, yes. That split often changes which channel looks best.']]),
  it('Eventbrite', 'Sales and ticketing',
    'See which promotion filled your Eventbrite events.',
    'We read your Eventbrite sales and registration data and connect it to your campaigns, your email and what your partners report.',
    'Tickets and registrations by event and date, plus the promo codes and tracking links buyers used.',
    'Events are short windows with lots of overlapping promotion. Codes and links help, but they leak and overlap, so they need lining up against the full list.',
    ['Which codes and links drove registrations, each counted once?', 'Which codes spread beyond the creator or partner they were made for?', 'Do your channels’ reported results fit inside total registrations for each event?', 'Did registrants come from your own list or from new audiences?'],
    ['Ticketmaster', 'Mailchimp', 'Meta Ads'],
    [['Do free events count?', 'Yes. Registrations are results, and attendance is a better one if you track it.'], ['Can you tell us which partner drove sign-ups?', 'Where codes or links were used, yes, and we’ll flag where they overlapped.']]),
  it('Fandango', 'Sales and ticketing',
    'Line up your trailers and posts with Fandango ticket sales.',
    'We read the Fandango sales data your team receives and connect it to your trailers, campaigns and what fans say, by title, date and market.',
    'Ticket sales by title, date and market, including presales, in whatever form your team receives them. [Confirm: which Fandango data studios typically receive.]',
    'For a release, the question is which trailers, clips and creators moved people to buy a ticket. Ticket timing against campaign timing is the starting point for that answer.',
    ['Which trailer drops, ad flights and creator posts lined up with ticket sales by day?', 'Do your channels’ reported ticket sales fit what sold in each market?', 'Did fan comments and title searches move before tickets did?', 'Which markets could go without ads for a few weeks, as a test before the next release?'],
    ['YouTube Studio', 'TikTok Ads', 'Meta Ads'],
    [['We see ticket data from several sources. Can you combine them?', 'Yes. We count each ticket once, whichever report it shows up in.'], ['Can you tell which trailer worked best?', 'We can show which drops lined up with ticket movement. Proof of cause needs a test, and we’ll say when one is worth running.']]),
  it('Steam', 'Sales and ticketing',
    'Connect Steam sales and wishlists to everything that moved them.',
    'We read your Steam sales and wishlist data and connect it to your creator streams, your campaigns and what players say in reviews.',
    'Sales and wishlist adds by day and country, and the traffic sources your Steam reports show.',
    'Games launch on spikes. A creator stream, a trailer and a sale can all land the same week, and each one will take credit for the bump. With everything connected, the bump can be split between them.',
    ['Which streams, trailers and ad flights lined up with wishlists and sales by day and country?', 'Do creator reports fit how wishlists and sales actually moved?', 'Which wishlist pushes turned into launch-day sales?', 'What do Steam reviews say, and did sales follow them?'],
    ['YouTube Studio', 'Reddit Ads', 'TikTok Ads'],
    [['Do wishlists count as results?', 'They’re an early one. We track them alongside sales and show how they move together.'], ['Can you read Steam reviews?', 'Yes, public reviews are part of listening. We count what players bring up and line it up with sales.']]),
  it('Shopify', 'Sales and ticketing',
    'Start from your Shopify sales, the most reliable number you have.',
    'We read your Shopify sales data and use it as the starting list everything else connects to: ad accounts, emails, creator codes and what people say.',
    'Sales from your own site by day and product, discount codes used, and the referral source Shopify records.',
    'Your own sales records are the most reliable number you have. Starting from them, instead of from the ad platforms, is what lets each result be counted once.',
    ['Which sales did each channel report, counted once?', 'Which creator codes show up on coupon sites?', 'Which sales came through your own emails before an ad got the credit?', 'Who are your best customers, and what brought them in?'],
    ['Klaviyo', 'Meta Ads', 'Google Analytics'],
    [['Most of our sales are in retail. Does Shopify matter?', 'It’s one part. We line up your site sales with retail data where you have it and say where the picture is thin.'], ['Do you change anything in our Shopify account?', 'No. [Confirm: read-only access.]']]),
  it('Amazon', 'Sales and ticketing',
    'See what your marketing did for sales on Amazon.',
    'We read your Amazon sales and Amazon Ads data and connect them to your other channels and the reviews on your listings.',
    'Sales by product and day, plus Amazon Ads spend and the sales Amazon credits to its ads, where you have access.',
    'Many brands sell more on Amazon than on their own site, and Amazon credits its own ads with sales there. Lining that credit up with total Amazon sales, and with your other channels, keeps each sale counted once.',
    ['Do the sales Amazon Ads reports fit inside total sales on Amazon?', 'Did social and creator campaigns move Amazon sales by day?', 'Which sales do both Amazon Ads and another channel report?', 'What do reviews on your listings complain about most?'],
    ['Walmart', 'Shopify', 'Meta Ads'],
    [['Can you see sales from people our TikTok ads sent to Amazon?', 'Often not directly. We line up timing and regions, and recommend a test when the answer matters.'], ['Is Amazon Ads the same as retail media?', 'It’s one kind. See our glossary entry on retail media.']]),
  it('Walmart', 'Sales and ticketing',
    'Connect Walmart sales to the campaigns that ran.',
    'We read the Walmart sales data your team receives and connect it to your campaigns and your other retailers, by week and region.',
    'The sales reports Walmart shares with your team by product, week and region, and Walmart ads reports if you run them. [Confirm: which Walmart data sources Arcus reads.]',
    'For drinks and other retail-heavy brands, shelf sales are the result that matters. Regional retail data is also what makes a test possible: ads on in some regions, off in others, with sales compared.',
    ['Which campaign flights lined up with retail sales by week and region?', 'Do the sales retailer ads report fit total sales at that retailer?', 'How does Walmart compare with your other retailers in the same regions?', 'Which matched regions could carry a test, with ads on in some and off in others?'],
    ['Amazon', 'Snowflake', 'Excel'],
    [['Retail data arrives late. Does that matter?', 'It slows some answers down. We say which answers can wait and which need faster data.'], ['Can you combine several retailers?', 'Yes. We line them up by week and region and count each sale once.']]),

  // Streaming and apps
  it('Roku', 'Streaming and apps',
    'Line up your Roku campaigns with sign-ups and viewing.',
    'We read your Roku reporting and connect it to your own sign-ups, viewing and sales.',
    'Viewing and ad delivery reports from Roku, for your channel or your campaigns, whichever your team has. [Confirm: which Roku data Arcus reads.]',
    'TV-screen ads are seen, not clicked, so the results they report rest on views. That makes them easy to overcount, so they need lining up against your own numbers by region.',
    ['Which Roku flights lined up with sign-ups and viewing by region and day?', 'How much of the reported result rests on views without a click?', 'Did the people TV-screen ads brought in stay and watch?', 'Which regions could go without TV-screen ads for a few weeks, as a clean test?'],
    ['YouTube Studio', 'Mixpanel', 'Google Analytics'],
    [['Can you tie a TV ad to one sign-up?', 'Usually not person by person. We line up regions and timing. For proof, we run ads in some regions, pause them in others and compare.'], ['Do you cover other streaming platforms?', 'Where you have reports, yes. [Confirm: list of streaming platforms supported.]']]),
  it('YouTube Studio', 'Streaming and apps',
    'Read what your YouTube channel says about your audience.',
    'We read your YouTube Studio data and the public comments on your videos, and connect both to your own numbers.',
    'Views, watch time, how long people keep watching, where viewers came from, and the comments on your videos.',
    'YouTube shows how people watch, and the comments show what they think of it. Lined up with sign-ups, tickets or sales, it tells you which videos did more than get views.',
    ['What do viewers say in the comments, and how often?', 'Which videos get watched longest, and which get shared?', 'Did trailer and video drops line up with tickets, sign-ups or sales by day?', 'Does a video’s view count include paid views?'],
    ['Google Ads', 'Hootsuite', 'Fandango'],
    [['Do you only read our channel?', 'No. We also read public comments on creator videos about your brand, as part of listening.'], ['Can you tell paid views from organic views?', 'Where YouTube Studio splits traffic sources, yes. Otherwise we flag that the count may mix both.']]),
  it('App Store', 'Streaming and apps',
    'Connect App Store installs to what people do next.',
    'We read your App Store data and connect installs to what your ad accounts report, your app data and your reviews.',
    'Downloads and installs by day and country, and the sources Apple’s reports show, plus public ratings and reviews.',
    'Every ad platform takes credit for app installs. App Store totals are the closest thing to a full count, so every other install number gets measured against them.',
    ['Do every channel’s reported installs, added up, fit inside App Store downloads?', 'Which campaigns lined up with installs by country and day?', 'Did installs turn into sign-ups and regular use?', 'What do reviews say after each launch or update?'],
    ['Google Play', 'Mixpanel', 'TikTok Ads'],
    [['Installs aren’t our goal. Sign-ups are. Can you follow through?', 'Yes, with your app data. Installs are a step, and we line them up with what happens next.'], ['Can you read App Store reviews?', 'Yes, public reviews are part of listening.']]),
  it('Google Play', 'Streaming and apps',
    'Connect Google Play installs to what people do next.',
    'We read your Google Play data and connect installs to what your ad accounts report, your app data and your reviews.',
    'Installs by day and country, the acquisition sources Google Play shows, and public ratings and reviews.',
    'The same ad platforms take credit for Android installs as for iPhone installs. The Google Play total is the number they all get measured against.',
    ['Do reported Android installs fit inside Google Play totals?', 'Which campaigns lined up with installs by country and day?', 'Did installs turn into sign-ups and regular use?', 'What do Android reviewers bring up most?'],
    ['App Store', 'Mixpanel', 'Google Ads'],
    [['Do you combine iPhone and Android?', 'Yes. We report each and the total, with each install counted once.'], ['What if our installs are reported by a separate tracking tool?', 'We read that too and match it against App Store and Google Play totals. [Confirm: which app tracking tools Arcus reads.]']]),

  // CRM and email
  it('Salesforce', 'CRM and email',
    'Use Salesforce as the list of who your customers are.',
    'We read your Salesforce data and connect your customer records to every campaign and channel, one person at a time.',
    'Customer and contact records, sign-ups, purchases or deals tied to them, and the campaign or source fields your team fills in.',
    'A CRM is often the most complete list of who your customers are. Matching each reported result to your own records is how it gets counted once, and how you find out which campaigns found your best customers.',
    ['Which reported sign-ups and sales match your customer records?', 'Were these people already customers, or new?', 'Which results did your own emails drive before an ad got the credit?', 'Who are your best customers, and which campaigns found them?'],
    ['HubSpot', 'LinkedIn Ads', 'Snowflake'],
    [['Do you see personal details about our customers?', '[Confirm: who sees data, what personal details are used, and how they’re protected.] The Security page has the details.'], ['Our Salesforce is messy. Is that a problem?', 'Most are. We work with what you have and tell you which answers are solid and which are directional.']]),
  it('HubSpot', 'CRM and email',
    'See your HubSpot contacts next to every campaign that reached them.',
    'We read your HubSpot data and connect your contacts and their history to your campaigns, your other channels and what people say.',
    'Contacts, sign-ups and purchases tied to them, email sends and clicks, and the source HubSpot records for each contact.',
    'HubSpot holds both your contact list and your emails. That makes it the place to see when a result another channel reported came through your own email.',
    ['Which reported sign-ups match contacts, each counted once?', 'Where did an email click come right before a result another channel reported?', 'Which campaigns brought new contacts, and which reached people you already had?', 'Which contacts became your best customers?'],
    ['Salesforce', 'LinkedIn Ads', 'Google Analytics'],
    [['Can you read our email results in HubSpot?', 'Yes. Email is often left out of campaign recaps, and it belongs in the count.'], ['Will you change anything in HubSpot?', 'No. [Confirm: read-only access.]']]),
  it('Klaviyo', 'CRM and email',
    'See how much your emails did, counted with everything else.',
    'We read your Klaviyo data and connect your email and text sends to your own numbers and to what every other channel reports.',
    'Email and text sends, opens, clicks, and the results Klaviyo credits to each message, along with your list and segments.',
    'Email is your own channel, and it drives a lot of results. Klaviyo credits itself too, so its numbers go in the same count as every other channel’s.',
    ['Which results other channels reported came after the buyer clicked an email?', 'Do Klaviyo’s own results, added to every other channel’s, fit inside your own numbers?', 'Do buyers on your list behave differently from new buyers?', 'Which messages bring people back to buy again?'],
    ['Shopify', 'Meta Ads', 'Mailchimp'],
    [['Klaviyo says email drove a lot. Is that right?', 'It may be. Klaviyo uses its own rule for credit, so we line its results up with your own numbers, like every other channel’s.'], ['Do you send emails for us?', 'No. We read the results.']]),
  it('Mailchimp', 'CRM and email',
    'Put your Mailchimp results in the same count as every other channel.',
    'We read your Mailchimp data and connect your email campaigns to your own numbers and to what your other channels report.',
    'Campaign sends, opens, clicks and the results Mailchimp tracks for each email, plus your audience lists.',
    'When a result another channel reported came right after one of your emails, the email deserves a share of the credit. You only see that when email sits in the same count.',
    ['Which results other channels reported followed an email click?', 'How do people on your list compare with new buyers or sign-ups?', 'Did ticket, sign-up or sales spikes line up with your sends?'],
    ['Eventbrite', 'Shopify', 'HubSpot'],
    [['We only send a few emails a month. Does it matter?', 'Even a few big sends can explain a spike another channel took credit for. It’s worth having in the count.'], ['Do you need our subscriber list?', '[Confirm: which Mailchimp data Arcus reads, and how personal details are handled.]']]),

  // Analytics and data
  it('Google Analytics', 'Analytics and data',
    'Use Google Analytics to see where visitors really came from.',
    'We read your Google Analytics data and connect visits and results to your own numbers and to what each ad platform reports.',
    'Visits, sources, campaigns and the events your team tracks as results, such as sign-ups or purchases, by day and region.',
    'Google Analytics sees your site across every channel, so it’s a useful second view next to each platform’s own report. It has its own credit rules too, so it isn’t the final word.',
    ['Does what each ad platform reports match what Google Analytics saw from that source?', 'How much traffic came from searches for your name?', 'Which tracked results are missing from your own numbers?', 'Which sources bring visitors who go on to buy or sign up?'],
    ['Google Ads', 'Meta Ads', 'Shopify'],
    [['Isn’t Google Analytics already the full picture?', 'It’s a broader one. It still uses its own rule for credit and only sees your site, so we line it up with your own numbers too.'], ['Our tracking setup is old. Is that a problem?', 'We’ll tell you what’s tracked well and what isn’t. A gap in tracking is an answer too.']]),
  it('Mixpanel', 'Analytics and data',
    'Connect Mixpanel to see who stays after they sign up.',
    'We read your Mixpanel data and connect sign-ups and actions in your app or site to the campaigns and channels that reached them.',
    'Sign-ups, sessions and the product events your team tracks, by day, source and region.',
    'For apps and streaming products, the result is often an action inside the product. Mixpanel shows whether people who came from a campaign did anything after they arrived.',
    ['Which reported sign-ups match sign-up events in Mixpanel, each counted once?', 'Which channels bring people who stay and use the product?', 'Which campaigns lined up with sign-ups by day and region?'],
    ['App Store', 'Google Play', 'Roku'],
    [['Can you tell which channel brings people who stay?', 'If Mixpanel tracks what they do later, yes. That’s often more useful than the sign-up count.'], ['Do you need our event definitions?', 'We read them and ask your team about anything unclear.']]),
  it('Snowflake', 'Analytics and data',
    'Read your own numbers where your company already keeps them.',
    'If your company keeps sales, tickets, sign-ups or viewing in Snowflake, we read your data from there instead of asking for exports.',
    'Whatever your company already keeps there: sales, customer records, viewing, sign-ups or retail data, organized the way your team set it up.',
    'Your own numbers are the starting point for every answer. If they already live in one place, reading them there means less work for your team.',
    ['Which reported results hold up against the numbers you already keep in Snowflake?', 'Do our definitions match how your team reports results?', 'What does Snowflake hold that your campaign recaps never cover?'],
    ['Databricks', 'Salesforce', 'Looker'],
    [['Will you build things inside our Snowflake account?', 'Arcus builds the setup inside your own systems, and you own it. [Confirm: what Arcus creates in a brand’s data environment and who owns it.]'], ['We don’t have a data team. Can you still read it?', 'Yes. That’s who Arcus is built for.']]),
  it('Databricks', 'Analytics and data',
    'Read your own numbers where your company already keeps them.',
    'If your company keeps its data in Databricks, we read your sales, sign-ups or viewing from there and line every channel’s results up against them.',
    'Whatever your company already keeps there: sales, viewing, sign-ups, customer records or retail data.',
    'Starting from the data your company already trusts keeps every answer grounded in your own numbers, and saves another round of exports.',
    ['Which reported results hold up against the numbers you keep in Databricks?', 'Do result definitions match how your team reports?', 'Which campaigns lined up with results by day and region?'],
    ['Snowflake', 'Tableau', 'Power BI'],
    [['Does our data leave Databricks?', '[Confirm: what, if anything, is copied outside your environment, how long it’s kept, and how it’s deleted.]'], ['Who on our side needs to be involved?', 'Someone who can grant access. Nobody needs to be technical after that.']]),
  it('Power BI', 'Analytics and data',
    'Make your Power BI dashboards and our answers agree.',
    'We read the numbers your team already reports in Power BI and make sure our answers use the same definitions.',
    'The reports and dashboards your team already uses, and the definitions behind the numbers on them.',
    'If your leadership already reads a Power BI dashboard, our answers need to agree with it or explain why they don’t.',
    ['Do our counts match the ones on your dashboards?', 'Which dashboard numbers come straight from ad platforms instead of your own numbers?', 'Where do teams define the same result differently?'],
    ['Excel', 'Databricks', 'Microsoft Teams'],
    [['Do we have to replace our dashboards?', 'No. Keep them. Arcus answers the bigger questions that need everything else too.'], ['Can you add your answers to our dashboards?', '[Confirm: whether Arcus can publish results into a brand’s existing dashboards.]']]),
  it('Looker', 'Analytics and data',
    'Make your Looker dashboards and our answers agree.',
    'We read the numbers your team already reports in Looker and make sure our answers use the same definitions.',
    'The dashboards and reports your team relies on, and the definitions behind each number.',
    'Two numbers for the same thing make every meeting longer. Matching definitions first means our answers and your dashboards tell one story.',
    ['Do our counts match the ones on your Looker dashboards?', 'Which numbers come straight from ad platforms?', 'Where do definitions differ between teams?'],
    ['Snowflake', 'Google Sheets', 'Slack'],
    [['Will your numbers match ours?', 'They should, or the answer says why not. Usually the difference is a definition.'], ['Do we need Looker to work with Arcus?', 'No. We work with whatever you use.']]),
  it('Tableau', 'Analytics and data',
    'Make your Tableau dashboards and our answers agree.',
    'We read the numbers your team already reports in Tableau and line our answers up with them.',
    'The workbooks and dashboards your team uses, and the definitions behind the numbers.',
    'If Tableau is where your team reads results, our answers should use the same definitions and explain any gap.',
    ['Do our counts match the ones on your Tableau dashboards?', 'Which numbers come straight from ad platforms?', 'Where do definitions differ between teams?'],
    ['Databricks', 'Excel', 'Slack'],
    [['Can our analyst keep using Tableau?', 'Yes. Arcus works alongside the tools you have.'], ['Does Arcus replace Tableau?', 'No. Tableau shows numbers. Arcus connects them to everything else, counts each result once and answers what they mean.']]),

  // Work tools
  it('Google Sheets', 'Work tools',
    'Keep your spreadsheets. We’ll connect them.',
    'We read your Google Sheets data, including the partner reports, spend trackers and sales logs your team keeps there.',
    'Campaign recaps, partner reports, spend trackers, sales or ticket logs and campaign calendars, in whatever layout your team uses.',
    'A lot of marketing data lives in spreadsheets. Partner reports often arrive as one, and your own tracker may be the best record of what ran.',
    ['Do the results in your shared sheets hold up against your own numbers?', 'Did results move when your campaign calendar says things ran?', 'Where do date ranges mix or totals not add up?'],
    ['Excel', 'Google Drive', 'Meta Ads'],
    [['Our sheets are messy. Is that OK?', 'Yes. Most are. We’ll ask about anything unclear.'], ['Is a spreadsheet enough to try Arcus free?', 'Often, yes, if it covers the question you pick. We’ll ask for your own numbers for the same dates.']]),
  it('Excel', 'Work tools',
    'Keep your Excel files. We’ll connect them.',
    'We read your Excel data, including retail sales files, partner reports and trackers.',
    'Campaign recaps, retail and distributor reports, spend trackers and sales logs.',
    'Retailers, distributors and other partners often send results as Excel files. Some of those files are your own numbers, and some are what a channel reports. Both belong in the count.',
    ['Do the results in campaign recaps hold up against your own numbers?', 'How do retail and distributor files line up by week and region?', 'Where do totals and date ranges not line up?'],
    ['Google Sheets', 'Walmart', 'Power BI'],
    [['Can you work with distributor depletion reports?', 'Yes. See our glossary entry on sell-through and depletions.'], ['Do files need a set format?', 'No. We work with what you have.']]),
  it('Google Drive', 'Work tools',
    'Point us at the Drive folder where reports land.',
    'We read the reports, decks and exports your team keeps in Google Drive.',
    'Campaign recaps, partner decks, creative briefs and data exports, in the folders you share with us.',
    'The history of what ran, and what each channel reported, usually sits in a shared folder. Reading it is the fastest way to see how results moved over time.',
    ['How have reported results changed month by month?', 'Which campaign decks lined up with results in your own numbers?', 'Did any numbers change between versions of a report?'],
    ['Google Sheets', 'Dropbox', 'Slack'],
    [['Do you see our whole Drive?', 'Only folders you share. [Confirm: how folder access is granted and removed.]'], ['Can you read PDFs and slides?', 'Yes, including the numbers in them.']]),
  it('Dropbox', 'Work tools',
    'Point us at the Dropbox folder where reports land.',
    'We read the reports, decks and exports your team keeps in Dropbox.',
    'Campaign recaps, partner decks, creative files and data exports, in the folders you share with us.',
    'If partners drop their reports in Dropbox, that folder is the record of every number they’ve sent. Reading it lets us line each one up with your own numbers over time.',
    ['How have reported results changed month by month?', 'Which campaign files lined up with results?', 'Did totals change between versions of a report?'],
    ['Google Drive', 'Excel', 'Microsoft Teams'],
    [['Do you see everything in our Dropbox?', 'Only folders you share. [Confirm: how folder access is granted and removed.]'], ['Do you read creative files too?', 'We use them to match posts and ads to results. [Confirm: which file types Arcus reads.]']]),
  it('Slack', 'Work tools',
    'Get the answer where your team already talks.',
    'We read the reports and recaps your team shares in the Slack channels you choose.',
    'Campaign reports and recaps posted in channels you pick, so we see them when your team does. [Confirm: whether Arcus can post reports or answer questions in Slack.]',
    'Recaps often land in a shared channel first. Reading them there means fewer forwarded files.',
    ['What did each new recap in your channels report?', 'Do those results hold up against your own numbers?', 'Which recaps report more than your totals allow?'],
    ['Microsoft Teams', 'Google Drive', 'Google Sheets'],
    [['Do you read our private messages?', 'No. Only channels you choose to share. [Confirm: exact Slack access scope.]'], ['Can we ask Arcus questions in Slack?', '[Confirm: whether this is supported.]']]),
  it('Microsoft Teams', 'Work tools',
    'Get the answer where your team already talks.',
    'We read the reports and recaps your team shares in the Microsoft Teams channels you choose.',
    'Campaign reports and recaps posted in channels you pick. [Confirm: whether Arcus can post reports or answer questions in Teams.]',
    'If your team and partners share recaps in Teams, that’s where the numbers show up first. Reading them there keeps your team’s routine the same.',
    ['What did each new recap in your channels report?', 'Do those results hold up against your own numbers?', 'Which recaps report more than your totals allow?'],
    ['Slack', 'Excel', 'Power BI'],
    [['Do you read private chats?', 'No. Only channels you choose to share. [Confirm: exact Teams access scope.]'], ['Do we need Teams to work with Arcus?', 'No. It’s one option among the tools you already use.']]),
  it('Hootsuite', 'Work tools',
    'Line up your own posts with what they did for results.',
    'We read your Hootsuite data and connect what you posted across accounts to your own numbers and what your audience said.',
    'Your posts across social accounts, when they went out, and how each one did: views, reach, likes, comments and shares.',
    'Your own posts drive results too, and campaign recaps rarely count them. Hootsuite holds the full record of what you posted, which is the base for any content report.',
    ['Which types of post get watched, and which get shared?', 'Which posts did people send on to friends?', 'Did results move with your posting calendar, or with your paid flights?'],
    ['YouTube Studio', 'Meta Ads', 'TikTok Ads'],
    [['Can you tell us which posts worked?', 'Yes. A content report sorts your posts into types and shows which ones people watched and shared. See our real content report.'], ['Do you post for us?', 'No. We read what was posted and what happened.']]),
  // Listening tools: one piece of the picture. Keep them; we plug them in and connect them to the rest.
  ...[
    ['Brandwatch', 'Put what Brandwatch hears next to what you sold.'],
    ['Sprinklr', 'Put what Sprinklr hears next to what you sold.'],
    ['Talkwalker', 'Put what Talkwalker hears next to what you sold.'],
    ['Meltwater', 'Put what Meltwater hears next to what you sold.'],
    ['Sprout Social', 'Put what Sprout Social hears next to what you sold.'],
    ['Pendulum', 'Put the narratives Pendulum tracks next to what you sold.'],
  ].map(([n, h1]) => it(n, 'Listening tools', h1,
    `Keep ${n}. We plug in what it already collects, add the places it doesn’t reach, and line the conversation up with your own sales, tickets, sign-ups or streams.`,
    `The mentions, conversations, topics and alerts your team already tracks in ${n}, with the dates, platforms and audiences behind them.`,
    `${n} tells you what people are saying and how loud it got. It can’t tell you whether any of it sold anything, because your sales, tickets and sign-ups live somewhere else. Arcus connects it to the rest: your own numbers, your CRM and the places it doesn’t reach.`,
    ['Did spikes in conversation line up with the weeks your own numbers moved, region by region?', 'Which topics, creators and posts came before results in your own numbers, and which were just noise?', 'What is your audience saying in places a listening tool often misses, like Discord, Twitch chat, Steam reviews or Goodreads?', 'Are the people talking loudest the same people who buy?'],
    ['Hootsuite', 'Google Analytics', 'Shopify'],
    [[`Do we have to stop using ${n}?`, `No. Keep it. Your team keeps its alerts and dashboards. Arcus reads what ${n} collects and puts it next to your own numbers.`], ['Do we need a listening tool to use Arcus?', 'No. We read public conversation ourselves. If you already have one, we use it too, so nothing your team set up goes to waste.']])),
];

// ---------------------------------------------------------------------------
// Channel guides: "<Platform> ads: how to tell what worked"
// Body keeps five h2 ids (the TOC is built from them): how-it-counts, double-counting, checklist, questions, holdout.
// `query` is the target search query (keywords.js reads it as the primary).
// ---------------------------------------------------------------------------
export const CHANNELS = [
  {
    slug: 'meta-what-worked', query: 'how to tell if meta ads are working', topic: 'Channels', author: 'brendon-ghaderi', date: D,
    title: 'Meta ads (Facebook and Instagram): how to tell what worked',
    dek: 'Meta counts a sale as its own when the buyer saw or clicked one of its ads within a set number of days. Here’s how to tell if your Meta ads are working, with each result counted once.',
    short: 'Start by asking for Meta’s results split into clicks and views, with the window behind each. Then add Meta’s reported results to every other channel’s and compare the total with your own numbers. For proof that Meta caused results, run ads in some regions and not others for a few weeks.',
    body: `
<h2 id="how-it-counts">How Meta counts results</h2>
<p>A Meta recap comes from Meta Ads Manager, whoever puts it together. The results in it are the ones Meta credits to its own ads, using Meta’s own rule for ${g('attribution', 'attribution')}. Meta can see what happened on Facebook and Instagram and, through its tracking on your site or app, some of what happened next. It can’t see your TikTok ads, your emails, or the creator video someone watched on YouTube.</p>
<p>Two settings shape every number in the recap. The first is the ${g('conversion-window', 'conversion window')}: how many days after someone clicked or saw an ad a result still counts. The second is whether views count at all. A ${g('view-through-conversion', 'view-through conversion')} is a result credited to an ad someone saw and never clicked. Meta reports often combine clicks and views into one number. Find the window in the report before you read anything else.</p>
<p>Meta also estimates some results it can’t observe directly, because phones and browsers share less than they used to. That’s a reasonable fix for missing data. It also means part of the number is a model, and the recap rarely says which part.</p>

<h2 id="double-counting">Where results get counted twice</h2>
<p>Every ad platform credits itself, so the same buyer can land in more than one report. Meta is often the biggest single number in a recap, so it’s where ${g('double-counting', 'double counting')} shows up first. Here’s how it happens on Meta:</p>
<ul>
<li><b>View-throughs.</b> Facebook and Instagram reach a lot of people. Many of them buy for other reasons in the days after seeing an ad, and a view rule credits Meta with those results.</li>
<li><b>Partnership ads.</b> When paid spend goes behind a creator’s post, its results can show up in your paid-media report and your creator report. Two reports can count the same post. See ${g('creator-whitelisting', 'creator whitelisting')}.</li>
<li><b>Retargeting.</b> Ads shown to people who already visited your site reach buyers close to a decision. Those results often belong to whatever brought them the first time.</li>
<li><b>Your own channels.</b> A buyer who opens your email and buys can still be credited to Meta if they saw an ad that week.</li>
</ul>
<p>None of this means anyone did bad work. It means Meta’s number is Meta’s view, and it needs to sit next to every other channel’s.</p>

<h2 id="checklist">A checklist for your next Meta recap</h2>
<table><thead><tr><th>Look at</th><th>What to look for</th><th>Why it matters</th></tr></thead><tbody>
<tr><td>Window</td><td>The click and view windows behind the results</td><td>Longer windows reach further back for credit</td></tr>
<tr><td>Clicks vs. views</td><td>Results split by click and by view</td><td>View-throughs are the easiest results to overcount</td></tr>
<tr><td>Modeled results</td><td>Whether some results are estimated</td><td>Estimates should be labeled as estimates</td></tr>
<tr><td>Partnership ads</td><td>Creator posts with paid spend behind them</td><td>Two reports can count the same post</td></tr>
<tr><td>Total vs. your numbers</td><td>Meta’s results plus every other channel’s, against your own total</td><td>A total above what you sold means some results were counted twice</td></tr>
<tr><td>Reach</td><td>How many different people saw the ads</td><td>See ${g('reach-vs-impressions', 'reach vs. impressions')}</td></tr>
</tbody></table>

<h2 id="questions">Questions worth asking</h2>
${ASK}
<ol>
<li>What are the click and view windows on this report, and can we see results at click only?</li>
<li>How much of this number did Meta estimate instead of observe?</li>
<li>Which results came from partnership ads, and do they also show up in our creator reports?</li>
<li>How much of the spend went to people who had already visited our site?</li>
<li>If we add Meta’s results to every other channel’s, does the total fit inside our own numbers?</li>
</ol>
<p>Most of these can be answered from Ads Manager in a day. Write the answers next to the recap, so every month gets read by the same rules.</p>

<h2 id="holdout">What a regions-on, regions-off test looks like on Meta</h2>
<p>Lining up Meta’s results with your own numbers removes double counting. It doesn’t prove Meta caused anything. For that, pick regions that look alike, run Meta ads in some of them, pause them in the others for a few weeks, and compare sales in your own numbers. That’s a regions-on, regions-off test, also called a ${g('holdout-test', 'holdout test')}.</p>
<p>Meta’s targeting by location makes this easier than on most channels. The hard part is keeping everything else steady: no extra promotions in one group, no different creative, no surprise press. Agree on the length, and on what you’ll do with each outcome, before you start.</p>
<p>Meta also offers its own lift studies. They’re useful, and worth running. They’re also run by the company selling the ads, so read them next to a test measured on your own numbers. Our guide to <a href="/library/incrementality-without-the-math">incrementality</a> walks through the steps.</p>
${CTA}`,
    faq: [
      ['Should we stop counting view-throughs?', 'Not necessarily. Ask to see them separately, so you know how much of the result rests on views. Then decide with a test.'],
      ['Is a Meta lift study enough proof?', 'It’s good evidence. Reading it next to a regions-on, regions-off test measured on your own numbers makes it stronger.'],
      ['Whoever runs our Meta ads also runs creator posts. Is that a problem?', 'Only if another report counts the same posts. Ask for the list of posts behind each report and compare.'],
    ],
  },
  {
    slug: 'tiktok-what-worked', query: 'how to tell if tiktok ads are working', topic: 'Channels', author: 'min-kwak', date: D,
    title: 'TikTok ads: how to tell what worked',
    dek: 'TikTok counts views as well as clicks, so its recaps can look bigger than your sales. Here’s how to tell if your TikTok ads are working.',
    short: 'Ask for TikTok’s results split into taps and views, with the window behind each, and a list of any boosted creator posts. Add TikTok’s reported results to every other channel’s and compare the total with your own numbers. To prove TikTok caused results, run ads in some regions and pause them in others for a few weeks.',
    body: `
<h2 id="how-it-counts">How TikTok counts results</h2>
<p>A TikTok recap shows the results TikTok credits to its own ads. Like every ad platform, TikTok uses its own ${g('attribution', 'attribution')} rule and only sees what its own tracking can see. It doesn’t know about your email, your Meta ads or the Reddit thread someone read the night before.</p>
<p>The numbers on top are usually views, watch time and engagement. Those tell you how the ads landed with the people who saw them. Results come lower down, often as one number that blends people who tapped with people who only watched. A ${g('view-through-conversion', 'view-through conversion')} counts a result for someone who saw the ad and never tapped. Find the window in the report: how many days after a view or tap a result still counts.</p>
<p>TikTok recaps also love ${g('engagement-rate', 'engagement rate')}. It’s a useful number for creative, and it isn’t a result. Ask what the rate is divided by, because views, reach and followers give very different answers.</p>

<h2 id="double-counting">Where results get counted twice</h2>
<ul>
<li><b>Boosted creator posts.</b> When paid spend goes behind a creator’s video, its results can show up in your creator report and your paid-media report. Two reports can count the same post. This is the most common overlap on TikTok.</li>
<li><b>Creator codes.</b> A ${g('creator-code', 'creator code')} from a TikTok video can spread to coupon sites, where people who were already buying find it.</li>
<li><b>First touch, last credit.</b> TikTok is often where someone first hears of you. They may buy a week later through search or email, and TikTok’s view rule can still give TikTok the credit.</li>
<li><b>Views at scale.</b> TikTok serves a lot of views. Even a small share of viewers who buy for other reasons adds up to a big view-through number.</li>
</ul>

<p>The fix starts with one list. Take your own numbers for the month, then mark each result with every report that counted it. Results with two or more marks are the overlap. TikTok usually shares a lot of them with creators and Meta, because the same people see all three in the same week. Once everyone can see the overlap, the budget conversation gets shorter and friendlier.</p>

<h2 id="checklist">A checklist for your next TikTok recap</h2>
<table><thead><tr><th>Look at</th><th>What to look for</th><th>Why it matters</th></tr></thead><tbody>
<tr><td>Window</td><td>Tap and view windows behind each result</td><td>View rules reach far on a platform this big</td></tr>
<tr><td>Taps vs. views</td><td>Results split by tap and by view</td><td>Shows how much rests on views alone</td></tr>
<tr><td>Boosted posts</td><td>Creator videos with paid spend</td><td>Two reports can count the same post</td></tr>
<tr><td>Codes</td><td>Code uses by source</td><td>Coupon sites inflate code results</td></tr>
<tr><td>Engagement rate</td><td>What it’s divided by</td><td>Views, reach and followers give different rates</td></tr>
<tr><td>Comments</td><td>What people said under the ads</td><td>Tells you how the audience took it</td></tr>
</tbody></table>

<h2 id="questions">Questions worth asking</h2>
${ASK}
<ol>
<li>Can we see results split by tap and by view, with the window for each?</li>
<li>Which results came from boosted creator posts, and do they also show up in our creator reports?</li>
<li>How many code uses came from coupon sites?</li>
<li>Is engagement rate divided by views, reach or followers?</li>
<li>What did people say in the comments, and did it change the creative?</li>
</ol>
<p>The comments are worth reading on their own. TikTok audiences say what they think, and they say it fast. Our guide to <a href="/library/social-listening-that-counts">listening that counts</a> shows how to turn comments into numbers you can use.</p>

<h2 id="holdout">What a regions-on, regions-off test looks like on TikTok</h2>
<p>Lining up the reports removes double counting. It can’t tell you whether TikTok caused results. For that, choose regions that look alike, run TikTok ads in some and pause them in others for a few weeks, and compare sales in your own numbers. That’s a regions-on, regions-off test, also called a ${g('holdout-test', 'holdout test')}.</p>
<p>Paid ads can be paused by region. Organic creator posts are harder, because they travel wherever the algorithm sends them. If creators are a big part of your TikTok spend, test the paid boost on their posts by region, and judge the creators themselves on codes, links and timing against your own numbers. Our guide to <a href="/library/creators-what-worked">creator campaigns</a> covers that side.</p>
<p>Decide before you start what you’ll do with each outcome. A test that ends in “interesting” is a test nobody acts on.</p>
${CTA}`,
    faq: [
      ['Is TikTok engagement a good sign?', 'It’s a good sign the creative landed. It isn’t a result on its own. Line it up with sales, tickets, sign-ups or streams before you move budget.'],
      ['Who should get credit for a boosted creator post?', 'Count the result once, then decide how to split credit. A test is the clearest way to see which part did the work.'],
      ['Can we tell what TikTok did if most of our sales happen in retail?', 'Yes, by region and week, using the retail data you have. Where it’s too thin to call, the answer should say so.'],
    ],
  },
  {
    slug: 'google-search-what-worked', query: 'how to tell if google search ads are working', topic: 'Channels', author: 'nazeem-ahmed', date: D,
    title: 'Google Search ads: how to tell what worked',
    dek: 'Search sits right before the purchase, so it collects credit. Here’s how to tell if your Google Search ads are working, or just catching people already looking for you.',
    short: 'Ask whoever runs the account to split results into searches for your brand’s name and everything else. Brand search mostly reaches people already on their way to you. To find out what it adds, pause brand search in some regions for a few weeks and compare results with your own numbers.',
    body: `
<h2 id="how-it-counts">How Google Search counts results</h2>
<p>A search recap comes from Google Ads. The results it shows are the ones Google credits to its ads, using whichever ${g('attribution', 'attribution')} model the account is set to. Search is the last step for a lot of buyers: they hear about you somewhere else, type your name, click the top result and buy. That puts search in a perfect spot to collect credit.</p>
<p>The most important split in any search report is brand versus non-brand. ${g('brand-search', 'Brand search')} means ads shown to people who typed your name. Non-brand means ads shown for things like “hard seltzer near me” or “new horror movies.” Brand searches tend to show excellent results. Most of those people were already looking for you.</p>
<p>Search accounts also have settings that change the count: the ${g('conversion-window', 'conversion window')}, the attribution model, and which actions count as a result. Some accounts import results from Google Analytics as well as tracking them directly. Find the window in the report, and ask where each result comes from.</p>

<h2 id="double-counting">Where results get counted twice</h2>
<ul>
<li><b>Brand search.</b> Someone saw a TikTok, a trailer or a billboard, then searched your name. Search gets credit for the result. So does the channel that sent them.</li>
<li><b>Mixed campaign types.</b> Some Google campaign types run across search, YouTube, display and more at once. They can include searches for your name inside the mix. Ask for a split.</li>
<li><b>Two sources for one result.</b> If an account counts a result from its own tag and an imported one from Google Analytics, the same result can show up twice in one report.</li>
<li><b>Email and direct.</b> A buyer who clicks your email, leaves, then comes back through a search ad gets credited to search.</li>
</ul>
<p>${g('last-click', 'Last-click')} rules make all of this bigger, because they hand everything to the final step. Even accounts that use other models tend to reward search well.</p>

<p>A quick way to see the size of it: ask for one month of results split by brand and non-brand, then set the brand number next to what your other channels reported that month. If social, creators and search all report a big share, and the total runs past your own numbers, brand search is likely where much of the overlap sits.</p>

<h2 id="checklist">A checklist for your next Google Search recap</h2>
<table><thead><tr><th>Look at</th><th>What to look for</th><th>Why it matters</th></tr></thead><tbody>
<tr><td>Brand vs. non-brand</td><td>Results split by searches for your name</td><td>Brand search reaches people already on their way</td></tr>
<tr><td>Mixed campaigns</td><td>Whether brand searches sit inside broad campaign types</td><td>Brand credit can hide in the mix</td></tr>
<tr><td>Result sources</td><td>Which actions count, and where they’re tracked</td><td>Two sources can count one result twice</td></tr>
<tr><td>Model and window</td><td>Attribution model and conversion window</td><td>Both change how much credit search gets</td></tr>
<tr><td>Total vs. your numbers</td><td>Search results plus every other channel’s, against your total</td><td>Overlap shows up in the sum</td></tr>
</tbody></table>

<h2 id="questions">Questions worth asking</h2>
${ASK}
<ol>
<li>How much of what search reported came from people searching our name?</li>
<li>Do any campaigns include brand searches without labeling them?</li>
<li>Which attribution model and window does the account use?</li>
<li>Is any result counted from both the Google Ads tag and Google Analytics?</li>
<li>What do we expect to happen if we pause brand search in one region?</li>
</ol>
<p>That last question is a good one to ask out loud. Write down everyone’s guess before you run the test.</p>

<h2 id="holdout">What a regions-on, regions-off test looks like on Google Search</h2>
<p>Brand search is the cleanest place to start testing, because the question is simple: if we stopped paying for clicks on our own name, would those people still find us? Pause brand search in some regions, keep it on in matched regions, wait a few weeks, and compare sales in your own numbers. That’s a regions-on, regions-off test, also called a ${g('holdout-test', 'holdout test')}.</p>
<p>Two things to watch. Competitors may bid on your name while you’re paused, so note whether that happens. And keep everything else steady: no new promotions in one group only.</p>
<p>If results barely move in the paused regions, brand search was mostly collecting credit. If they drop, it was doing real work, and you have proof. Either way you’ve learned something worth more than the clicks. Our guide to <a href="/library/incrementality-without-the-math">incrementality without the math</a> has a worked example.</p>
${CTA}`,
    faq: [
      ['Should we stop buying brand search?', 'Not before a test. In some cases it protects your name from competitors. A regions-on, regions-off test tells you what it adds.'],
      ['Is non-brand search safer to trust?', 'It’s more likely to reach new people. It still needs lining up against your own numbers and every other channel’s results.'],
      ['Whoever runs our search ads also runs YouTube. Should we look at YouTube separately?', 'Yes. Video and search get credit in different ways. See our guide to YouTube ads.'],
    ],
  },
  {
    slug: 'youtube-what-worked', query: 'how to tell if youtube ads are working', topic: 'Channels', author: 'devin-min', date: D,
    title: 'YouTube ads: how to tell what worked',
    dek: 'YouTube recaps lead with views. Here’s how to tell if your YouTube ads are working, from the results underneath.',
    short: 'Ask whoever runs the account which results came from people who clicked and which from people who only watched, and over what window. Ask whether the view counts include paid views. Then add YouTube’s reported results to every other channel’s and compare the total with your own numbers.',
    body: `
<h2 id="how-it-counts">How YouTube counts results</h2>
<p>YouTube ads are bought through Google Ads, so a YouTube recap uses Google’s ${g('attribution', 'attribution')} rules. The top of the report is usually views, view rate and watch time. Those tell you how the ad played. The results come further down, and they can include people who watched part of an ad without clicking. Google calls some of these engaged-view conversions. They work like a ${g('view-through-conversion', 'view-through conversion')}: credit for watching, with no click.</p>
<p>The other thing to know is that a view on YouTube can mean different things. A paid view, a view on your channel and a view on a creator’s channel aren’t the same. Ask whether the view count on a video includes paid views before you compare it with your organic posts.</p>
<p>Find the window in the report. Video is often seen days before someone acts, so the window decides how much later activity YouTube can take credit for.</p>

<h2 id="double-counting">Where results get counted twice</h2>
<ul>
<li><b>Watching, then searching.</b> Someone watches a trailer on YouTube, then searches your title and clicks a search ad. YouTube and search can both take credit for the result, sometimes inside the same Google account.</li>
<li><b>Creator videos.</b> A creator’s video with your brand in it shows up in your creator report. If paid ads also ran on that video or that channel, your paid-media report can count the same results. Two reports, one post.</li>
<li><b>Long windows on big reach.</b> Video reaches many people, and a long window lets YouTube take credit for anyone who later acts for any reason.</li>
<li><b>Mixed campaign types.</b> Some Google campaign types spread across YouTube, search and more. Ask for YouTube on its own.</li>
</ul>

<p>A simple first step: ask for one month of YouTube results split into clicks and watches, then line them up against your own numbers by day. If results rise on the days a trailer or ad drops, that’s a good sign. If the reported number stays high on quiet days, the window is probably doing a lot of the work.</p>

<h2 id="checklist">A checklist for your next YouTube recap</h2>
<table><thead><tr><th>Look at</th><th>What to look for</th><th>Why it matters</th></tr></thead><tbody>
<tr><td>Clicks vs. watches</td><td>Results split by click and by watched-without-click</td><td>Watch-based credit is easy to overcount</td></tr>
<tr><td>Window</td><td>How many days after a view a result still counts</td><td>Video is often seen long before action</td></tr>
<tr><td>Paid vs. organic views</td><td>Whether view counts include paid views</td><td>Paid views can make organic posts look stronger</td></tr>
<tr><td>Watch time</td><td>How long people kept watching</td><td>Tells you whether the ad held attention</td></tr>
<tr><td>Overlap with search</td><td>Results counted by both YouTube and search</td><td>Same account, two credits</td></tr>
<tr><td>Comments</td><td>What viewers said under the video</td><td>The fastest read on how it landed</td></tr>
</tbody></table>

<h2 id="questions">Questions worth asking</h2>
${ASK}
<ol>
<li>How many of these results came from people who clicked, and how many from people who only watched?</li>
<li>What window does this report use, and can we see a shorter one?</li>
<li>Does the view count on our trailer include paid views?</li>
<li>Do any of these results also show up in our search reports?</li>
<li>Which videos kept people watching longest, and did those drive more results?</li>
</ol>
<p>Ask these in your next meeting rather than over email. Answers in the room tend to be clearer, and you’ll hear which ones can be answered on the spot.</p>
<p>Comments are worth a look too. In a real Arcus audience report for a streaming service, fans talked about the shows and almost never about the service itself. Our guide on <a href="/library/watched-vs-shared-share-rate">watched vs. shared</a> explains why views alone can mislead.</p>

<h2 id="holdout">What a regions-on, regions-off test looks like on YouTube</h2>
<p>YouTube ads can be targeted by location, so the test works the same way as on other channels. Pick regions that look alike, run YouTube ads in some and pause them in others for a few weeks, and compare your own numbers: tickets, sign-ups, streams or sales. That’s a regions-on, regions-off test, also called a ${g('holdout-test', 'holdout test')}.</p>
<p>Keep search steady during the test, since the two interact. If you pause YouTube and search results fall in the same regions, that tells you something useful about how they work together.</p>
<p>Google also offers lift studies for YouTube, including surveys that measure recall. A ${g('brand-lift-study', 'brand lift study')} is good evidence for brand work. It measures what people say in a survey, so it’s strongest when it lines up with your own numbers later.</p>
${CTA}`,
    faq: [
      ['Are YouTube views a good measure for a trailer?', 'They tell you reach. Watch time and shares tell you more about whether it landed. Results tell you whether it moved people.'],
      ['Should engaged-view results count?', 'Ask to see them separately. They’re credit for watching without a click, so they need a test before you lean on them.'],
      ['Can you tell what creator videos on YouTube did?', 'Yes, with codes, links and timing against your own numbers. See our guide to creator campaigns.'],
    ],
  },
  {
    slug: 'snapchat-what-worked', query: 'how to tell if snapchat ads are working', topic: 'Channels', author: 'min-kwak', date: D,
    title: 'Snapchat ads: how to tell what worked',
    dek: 'Snapchat often reaches the same young audiences as TikTok and Instagram. Here’s how to tell if your Snapchat ads are working on their own.',
    short: 'Ask whoever runs the account for Snapchat’s results split into swipes and views, with the window behind each. Snapchat often reaches the same people as TikTok and Instagram, so add every channel’s reported results together and compare the total with your own numbers. To prove cause, run ads in some regions and pause them in others.',
    body: `
<h2 id="how-it-counts">How Snapchat counts results</h2>
<p>A Snapchat recap shows what Snapchat credits to its own ads, using its own ${g('attribution', 'attribution')} rule. Results can be credited to people who swiped or tapped on an ad, and to people who only saw it. A ${g('view-through-conversion', 'view-through conversion')} is the second kind. The recap often blends them, so ask for a split.</p>
<p>Snapchat reports also lean on reach, impressions and swipe rate. Those tell you how many people saw the ad and how many acted on it right away. They aren’t results. Before you compare them with other channels, read up on ${g('reach-vs-impressions', 'reach vs. impressions')}: impressions count repeats, reach counts people.</p>
<p>And find the window in the report. It decides how many days after a view or swipe a result still counts.</p>

<h2 id="double-counting">Where results get counted twice</h2>
<ul>
<li><b>The same young audience everywhere.</b> Snapchat, TikTok and Instagram often reach the same people in the same week. Each platform can credit itself with the same buyer.</li>
<li><b>Views on fast content.</b> Snaps are quick and seen often. A view rule can credit Snapchat with results that happened for other reasons.</li>
<li><b>Codes and links.</b> If a creator promotes you on Snapchat with a code, and the code spreads, your creator report and your paid-media report may both count the use.</li>
<li><b>Lenses and filters.</b> Branded lenses get lots of plays. Plays are a reach number. Ask how any results tied to them were counted.</li>
</ul>

<p>The way to see it is to stop reading each platform’s report on its own. Put Snapchat’s, TikTok’s and Meta’s reported results for the same month side by side, add them up and compare the total with your own numbers. If the three together report more than you had, the overlap is real. Then the question becomes which platform reached people the others missed, and a test can answer that.</p>

<p>It also helps to look at timing. If Snapchat’s reported results rise and fall with your TikTok flights, the two are probably reaching the same people.</p>

<h2 id="checklist">A checklist for your next Snapchat recap</h2>
<table><thead><tr><th>Look at</th><th>What to look for</th><th>Why it matters</th></tr></thead><tbody>
<tr><td>Swipes vs. views</td><td>Results split by swipe and by view</td><td>Shows how much rests on views</td></tr>
<tr><td>Window</td><td>Days after a view or swipe a result counts</td><td>Longer windows reach further back</td></tr>
<tr><td>Reach</td><td>Different people reached</td><td>Impressions count repeats</td></tr>
<tr><td>Overlap</td><td>Snapchat’s results plus TikTok’s and Meta’s</td><td>Same audience, counted several times</td></tr>
<tr><td>Lenses</td><td>How results from lenses were counted</td><td>Plays aren’t results</td></tr>
</tbody></table>

<h2 id="questions">Questions worth asking</h2>
${ASK}
<ol>
<li>How many results came from swipes, and how many from views alone?</li>
<li>What window does this report use?</li>
<li>How many different people did the campaign reach, and how often did each see it?</li>
<li>Do any of these results also show up in our TikTok or Meta reports?</li>
<li>How were results from lenses or filters counted, if at all?</li>
</ol>
<p>They’re the same questions you’d ask about any platform, and most can be answered from the account in a day.</p>
<p>If Snapchat is a smaller line in your budget, these questions still matter. A small budget can still get credit for a large share of results, and that’s when lining it up with your own numbers helps most.</p>

<p>Share the count with whoever buys your media. Most media buyers want to know which platforms are earning their place, and one shared count gives them a better brief.</p>

<h2 id="holdout">What a regions-on, regions-off test looks like on Snapchat</h2>
<p>Snapchat ads can be targeted by location, so the test is the same idea as anywhere else. Pick regions that look alike. Run Snapchat ads in some and pause them in others for a few weeks. Compare sales in your own numbers. That’s a regions-on, regions-off test, also called a ${g('holdout-test', 'holdout test')}.</p>
<p>Because Snapchat overlaps so much with TikTok and Instagram, keep those steady in both groups during the test. If they shift at the same time, you won’t know which one moved results.</p>
<p>If the regions without Snapchat look the same as the ones with it, Snapchat was mostly reaching people other channels already had. If they fall behind, you’ve found what Snapchat adds. Our guide to <a href="/library/incrementality-without-the-math">incrementality</a> walks through how to set it up.</p>
${CTA}`,
    faq: [
      ['Do lens plays count as results?', 'No. They’re a reach number. Results are sales, tickets, sign-ups or streams.'],
      ['Is Snapchat worth testing if spend is small?', 'Yes, if the results it reports are big compared with its spend. That gap is the reason to test.'],
      ['How do we know if Snapchat reaches people other channels miss?', 'A regions-on, regions-off test is the clearest answer. Matching reach across platforms gives a hint, but each platform only sees its own users.'],
    ],
  },
  {
    slug: 'reddit-what-worked', query: 'how to tell if reddit ads are working', topic: 'Channels', author: 'devin-min', date: D,
    title: 'Reddit ads: how to tell what worked',
    dek: 'Reddit ads come with comments, and the comments matter. Here’s how to tell if your Reddit ads are working, and what people say under them.',
    short: 'Read a Reddit recap in two parts. First, line up Reddit’s reported results with your own numbers and every other channel’s, with clicks and views split. Second, read the comments on your promoted posts and the threads around them. Reddit users talk back, and that tells you how the ads landed.',
    body: `
<h2 id="how-it-counts">How Reddit counts results</h2>
<p>A Reddit recap shows the results Reddit credits to its own ads, using its own ${g('attribution', 'attribution')} rule and tracking. Like other platforms, it can credit results to people who clicked and to people who only saw a post. Ask for the split, and find the window in the report.</p>
<p>Reddit recaps also show which communities and interests each campaign targeted, plus upvotes and comments on promoted posts. Upvotes are a reaction. Comments are where the information is. On Reddit, people say what they think of an ad right under it, and other people vote on whether they agree.</p>
<p>Reddit is different from most channels in one useful way: a lot of the conversation about your brand already happens there, unpaid. That gives you something to compare the ads against.</p>

<h2 id="double-counting">Where results get counted twice</h2>
<ul>
<li><b>Research, then purchase.</b> People often read Reddit threads before buying, then buy through search or your site. Reddit’s view rule and search’s click rule can both credit themselves with that buyer.</li>
<li><b>Organic threads.</b> A popular thread about your brand can drive results with no ad involved. If an ad ran the same week, Reddit may take credit for them.</li>
<li><b>Views without clicks.</b> Reddit users scroll a lot. A ${g('view-through-conversion', 'view-through')} rule can credit Reddit with results from people who barely noticed the ad.</li>
<li><b>Every other channel’s report.</b> As with any channel, Reddit’s results belong in the same count as everyone else’s. See ${g('double-counting', 'double counting')}.</li>
</ul>

<p>Reddit’s numbers are often small next to Meta or search, which makes them easy to skip. Don’t. A small channel that reports a lot of results for little spend is worth a look, and a small channel that reaches people nobody else does is worth protecting. The only way to tell the two apart is to count each result once across every channel and see what’s left for Reddit.</p>

<h2 id="checklist">A checklist for your next Reddit recap</h2>
<table><thead><tr><th>Look at</th><th>What to look for</th><th>Why it matters</th></tr></thead><tbody>
<tr><td>Clicks vs. views</td><td>Results split by each</td><td>Shows how much rests on scrolling past</td></tr>
<tr><td>Window</td><td>Days after a view or click a result counts</td><td>Research-heavy buyers act later</td></tr>
<tr><td>Communities</td><td>Where the ads ran</td><td>Compare with where your audience talks unpaid</td></tr>
<tr><td>Comments</td><td>What people said under promoted posts</td><td>The clearest read on how the ad landed</td></tr>
<tr><td>Organic threads</td><td>Popular threads about you in the same weeks</td><td>They can drive results an ad gets credit for</td></tr>
</tbody></table>

<p>Ask for the comments as a file, with the post each one sits under. Reading them in one place, instead of scrolling post by post, makes the patterns easier to see, and it gives you something to count.</p>

<h2 id="questions">Questions worth asking</h2>
${ASK}
<ol>
<li>How many of these results came from clicks, and how many from views?</li>
<li>Which communities did best, and why were they picked?</li>
<li>What did people say in the comments, and did anything change because of it?</li>
<li>Were there big organic threads about us during the campaign?</li>
<li>If we add Reddit’s results to every other channel’s, does the total fit inside our own numbers?</li>
</ol>
<p>Then read the room. Reddit is one of the best places to hear how your audience talks when you’re not in the room. ${g('social-listening', 'Social listening')} on Reddit means reading the threads where people discuss your category and counting what comes up: the complaints, the comparisons, the words they use. Those counts tell you whether your ads sound like the people you want to reach. Our guide to <a href="/library/social-listening-that-counts">listening that counts</a> explains how.</p>

<p>Listening also gives whoever makes your ads better material. If the threads keep coming back to one flavor, one character or one complaint, that’s a brief for the next promoted post.</p>

<h2 id="holdout">What a regions-on, regions-off test looks like on Reddit</h2>
<p>Reddit ads can be targeted by location, so you can run ads in some regions, pause them in matched regions for a few weeks, and compare sales in your own numbers. That’s a regions-on, regions-off test, also called a ${g('holdout-test', 'holdout test')}. Keep your other channels steady while it runs.</p>
<p>Reddit budgets are often smaller, so the test needs regions big enough for results to move. If the difference is too small to read, that’s an answer too: Reddit isn’t adding much you can measure yet.</p>
<p>See everywhere we listen, Reddit included, on the <a href="/listening">listening</a> page.</p>
${CTA}`,
    faq: [
      ['Do upvotes matter?', 'They show agreement. Comments tell you why. Neither is a result on its own.'],
      ['Can you read Reddit without running ads?', 'Yes. Listening covers public conversation whether or not you advertise there.'],
      ['Is Reddit a good fit for entertainment brands?', 'Often. Fans discuss titles, games and launches there in detail. A listening report shows whether your audience is one of them.'],
    ],
  },
  {
    slug: 'pinterest-what-worked', query: 'how to tell if pinterest ads are working', topic: 'Channels', author: 'nazeem-ahmed', date: D,
    title: 'Pinterest ads: how to tell what worked',
    dek: 'People plan on Pinterest and buy later. Here’s how to tell if your Pinterest ads are working when the sale comes weeks after the save.',
    short: 'Pinterest is a planning platform, so results often come days or weeks after someone saves a Pin. That makes the window behind each result the first thing to look at. Then split clicks from views, add Pinterest’s reported results to every other channel’s, and compare the total with your own numbers.',
    body: `
<h2 id="how-it-counts">How Pinterest counts results</h2>
<p>A Pinterest recap shows the results Pinterest credits to its ads, using its own ${g('attribution', 'attribution')} rule. People use Pinterest to plan: a party, a wardrobe, a skincare routine, a cocktail menu. They save Pins and come back later. That makes the ${g('conversion-window', 'conversion window')} unusually important, because it decides how long after a save or click Pinterest can still take credit for a result. Find the window in the report before anything else.</p>
<p>Pinterest recaps lead with impressions, saves and clicks. Saves are a real sign of interest. They aren’t results. The question is whether saves turn into sales, tickets or sign-ups, and that only shows up in your own numbers.</p>
<p>As with other platforms, results can be credited to views as well as clicks. A ${g('view-through-conversion', 'view-through conversion')} on a planning platform can reach far back. Ask for the split.</p>

<h2 id="double-counting">Where results get counted twice</h2>
<ul>
<li><b>Long gaps.</b> The longer the time between a Pin and a result, the more chances another channel had to reach the same person and take credit too.</li>
<li><b>Search at the end.</b> Someone saves your Pin, then searches your name weeks later. Pinterest and search can both take credit.</li>
<li><b>Your own Pins.</b> Organic Pins and paid Pins look alike. Results driven by your own Pins can land in the paid report.</li>
<li><b>Email and retargeting.</b> A planner who signed up for your emails may buy after an email. A long Pinterest window can still count it.</li>
</ul>

<p>Put it on one table. List your own results for the month, then mark which ones Pinterest reported and which ones other channels reported. On a planning platform, you’ll often find Pinterest’s results sit late in the window, long after the save, and that other channels touched the same people in between. That doesn’t mean Pinterest did nothing. It started the plan, and starting matters. It means the credit needs sharing, and a test is how you find out how much Pinterest earned.</p>

<h2 id="checklist">A checklist for your next Pinterest recap</h2>
<table><thead><tr><th>Look at</th><th>What to look for</th><th>Why it matters</th></tr></thead><tbody>
<tr><td>Window</td><td>Days after a save, click or view a result counts</td><td>Planning means long gaps, and long gaps invite overlap</td></tr>
<tr><td>Clicks vs. views</td><td>Results split by each</td><td>View credit reaches far on a slow platform</td></tr>
<tr><td>Saves to results</td><td>Whether saved Pins lead to results</td><td>Saves show interest, and only results show sales</td></tr>
<tr><td>Paid vs. organic</td><td>Which Pins were paid</td><td>Organic results can land in paid reports</td></tr>
<tr><td>Total vs. your numbers</td><td>Pinterest’s results plus every other channel’s</td><td>Overlap shows up in the sum</td></tr>
</tbody></table>

<p>If the report can show results at a shorter window, compare the two numbers. The gap between them is the share of credit that rests on a long wait, and it’s the share most worth testing before you move budget.</p>

<h2 id="questions">Questions worth asking</h2>
${ASK}
<ol>
<li>What window does this report use for clicks, saves and views?</li>
<li>Can we see results at a shorter window?</li>
<li>How many results came from views without a click?</li>
<li>Do saved Pins lead to more results than Pins people only clicked?</li>
<li>Are any results from our own organic Pins included?</li>
</ol>
<p>These are good questions for any platform with a slow path to purchase. Our glossary entry on the ${g('conversion-window', 'conversion window')} covers the general version.</p>

<h2 id="holdout">What a regions-on, regions-off test looks like on Pinterest</h2>
<p>Pinterest ads can be targeted by location, so the test works here too. Pick matched regions. Run Pinterest ads in some and pause them in others. Compare sales in your own numbers. That’s a regions-on, regions-off test, also called a ${g('holdout-test', 'holdout test')}.</p>
<p>The difference on Pinterest is time. Because people plan before they buy, the test needs to run longer than it would on a fast channel, and you should keep measuring for a while after it ends. Agree on the length before you start, and write down what you’ll do with each outcome.</p>
<p>While the test runs, keep an eye on saves in both groups. If saves rise where Pinterest runs and results follow later, you’re seeing the slow path to purchase in action.</p>
<p>Seasonal brands should time tests with care. A holiday or a summer push changes everything at once, so test in a steadier stretch if you can, and keep other channels the same in both groups.</p>
${CTA}`,
    faq: [
      ['Are saves a good sign?', 'Yes, as interest. Line them up with your own numbers to see whether they lead to results.'],
      ['Why does the window matter more on Pinterest?', 'Because people plan before they buy. A long window lets Pinterest take credit for results that other channels also touched.'],
      ['How long should a Pinterest test run?', 'Longer than on faster channels, and with measurement after it ends. Agree on the length up front.'],
    ],
  },
  {
    slug: 'linkedin-what-worked', query: 'how to tell if linkedin ads are working', topic: 'Channels', author: 'brendon-ghaderi', date: D,
    title: 'LinkedIn ads: how to tell what worked',
    dek: 'Brand teams use LinkedIn for trade audiences, events and partnerships. Here’s how to tell if your LinkedIn ads are working, lead by lead.',
    short: 'Match every lead, registration or sign-up LinkedIn reports against your own records, so each person is counted once. Split results from clicks and from views, and find the window. Then follow the leads forward: what matters is how many became something, which your CRM can show.',
    body: `
<h2 id="how-it-counts">How LinkedIn counts results</h2>
<p>Entertainment and lifestyle brands don’t usually sell to consumers on LinkedIn. They use it to reach the trade: buyers, distributors, exhibitors, partners, press and future hires. The results are sign-ups, event registrations and leads, often through LinkedIn’s own lead forms.</p>
<p>A LinkedIn recap shows the results LinkedIn credits to its ads, using its own ${g('attribution', 'attribution')} rule. Lead forms are filled out inside LinkedIn, so they’re easy for LinkedIn to count. Results on your own site rely on tracking, and can be credited to people who clicked or only saw the ad. Find the window in the report, and ask for clicks and views split.</p>
<p>LinkedIn audiences are often small and specific. That’s good for targeting. It also means a handful of results can swing the numbers, so look at counts as well as rates.</p>

<h2 id="double-counting">Where results get counted twice</h2>
<ul>
<li><b>Lead forms and your CRM.</b> A lead form fill shows up in LinkedIn’s report and, once synced, in your CRM with a source. If someone also registered through your site, they may appear twice.</li>
<li><b>Views at work.</b> Busy people scroll LinkedIn without clicking. A ${g('view-through-conversion', 'view-through')} rule can credit LinkedIn when they register later through an email invite.</li>
<li><b>Email invites.</b> Most event registrations come after an invite. If a LinkedIn ad ran the same week, both can take credit for the registration.</li>
<li><b>Sales and partnerships teams.</b> Your own team’s outreach brings in leads too. Make sure LinkedIn isn’t getting credit for those.</li>
</ul>

<p>The fix is a single list of people. Pull LinkedIn’s leads, your site registrations and your CRM records for the same campaign, then match them by person. Anyone who appears in two places is counted once. What’s left is a clean count of who LinkedIn brought in, and a clean starting point for asking what those people did next. Our glossary entry on ${g('double-counting', 'double counting')} explains why this matters on every channel.</p>

<h2 id="checklist">A checklist for your next LinkedIn recap</h2>
<table><thead><tr><th>Look at</th><th>What to look for</th><th>Why it matters</th></tr></thead><tbody>
<tr><td>Leads vs. CRM</td><td>Lead form fills matched to CRM records</td><td>Counts each person once</td></tr>
<tr><td>Clicks vs. views</td><td>Results split by each</td><td>View credit is common on a scroll-heavy feed</td></tr>
<tr><td>Window</td><td>Days after a view or click a result counts</td><td>Trade decisions take time</td></tr>
<tr><td>Email overlap</td><td>Registrations that came after an invite</td><td>Two channels, one person</td></tr>
<tr><td>What happened next</td><td>Leads that became meetings, deals or attendees</td><td>A lead is only the first step</td></tr>
</tbody></table>

<p>Ask for the lead list in a file you can match yourself. Then ask your own team, the people who follow up on leads, which ones turned into real conversations. Their answer is often the most useful number in the whole review.</p>

<h2 id="questions">Questions worth asking</h2>
${ASK}
<ol>
<li>How many results were lead forms, and how many were tracked on our site?</li>
<li>How many came from views without a click?</li>
<li>Can we get the list of leads so we can match them to our CRM?</li>
<li>How many registrants also got an email invite from us?</li>
<li>Which of these leads went on to become something?</li>
</ol>
<p>The last question is the one that matters most. Our guide to <a href="/library/first-party-data-for-brand-marketers">first-party data</a> explains why your own records are the best place to answer it.</p>

<p>Share what you find with whoever buys your LinkedIn ads. Most LinkedIn buyers would rather optimize for leads that turn into something, and a clean list helps them do it.</p>

<h2 id="holdout">What a regions-on, regions-off test looks like on LinkedIn</h2>
<p>LinkedIn ads can be targeted by location and by audience, so the test can split either. For an event, run ads in some cities and pause them in others. For a trade campaign, pause them for a matched group of companies or job roles and compare sign-ups in your own records. That’s a regions-on, regions-off test, also called a ${g('holdout-test', 'holdout test')}, applied to audiences as well as places.</p>
<p>Small audiences make tests harder to read, so pick a question where the result would change a decision: whether to keep a LinkedIn line in next year’s event budget, for example. Run it for a few weeks and keep email invites the same in both groups.</p>
<p>If the group without ads registers at the same rate, your invites and your team were doing the work. If it falls behind, LinkedIn earned its place.</p>
${CTA}`,
    faq: [
      ['Is LinkedIn worth a look for a consumer brand?', 'If you spend on it for trade, events or partnerships, yes. Those results feed real decisions.'],
      ['What’s the best result to judge LinkedIn on?', 'What leads became: attendees, meetings, deals or partners. Lead counts alone can flatter.'],
      ['Can you match LinkedIn leads to our CRM?', 'Yes, where you share both. Each person is counted once.'],
    ],
  },
  {
    slug: 'creators-what-worked', query: 'how to tell if creator campaigns are working', topic: 'Channels', author: 'devin-min', date: D,
    title: 'Creator campaigns: how to tell what worked',
    dek: 'Creator recaps lead with reach and estimated value. Here’s how to tell if your creator campaigns are working, in sales, sign-ups or streams.',
    short: 'Judge creators on results in your own numbers. Reach and estimated media value come second. Look at every code and link for coupon-site leaks, compare creator reports against your paid-media reports for boosted posts, and line up post dates with results. To prove cause, run paid boosts in some regions and pause them in others.',
    body: `
<h2 id="how-it-counts">How creator recaps count results</h2>
<p>Creator recaps usually lead with reach, views, engagement and an estimated value: what the same attention would have cost as paid media. That estimate is often called earned media value. It’s a way to describe reach in dollars. It isn’t a result, and it rises with views whether or not anyone bought anything.</p>
<p>Results come from three places. ${g('creator-code', 'Creator codes')} and links trace some buyers to a creator. Paid boosts of creator posts, sometimes called ${g('creator-whitelisting', 'whitelisting')} or partnership ads, get results from the ad platform’s own ${g('attribution', 'attribution')}. And timing: sales, tickets or sign-ups that rose when a creator posted.</p>
<p>Each of those can be useful. Each can also be stretched. Look at how every number in the recap was counted before you compare creators.</p>

<h2 id="double-counting">Where results get counted twice</h2>
<ul>
<li><b>Codes that leak.</b> Creator codes end up on coupon sites. People who were already buying find them at checkout, and the creator gets credit.</li>
<li><b>Boosted posts.</b> When paid spend goes behind a creator’s post, your creator report and your paid-media report can both count its results.</li>
<li><b>Timing on a busy week.</b> Launch weeks stack creators, ads, press and email. Every one of them will point to the same spike.</li>
<li><b>Fans who were coming anyway.</b> A creator who already loves your brand often reaches people who already love it too. Their code gets used by regulars.</li>
</ul>

<p>The way through is one list. Start from your own numbers for the campaign weeks. Mark which results used a creator code, which came through a boosted post, and which arrived on days a creator posted. Then mark every report that counted each one. Results with two marks are the overlap. Results with a code from a coupon site go in their own pile. What’s left is what your creators earned, and it’s usually a better basis for the next round of bookings than reach.</p>

<p>Do this creator by creator. Some will look much better than their reach suggested, and some much worse.</p>

<h2 id="checklist">A checklist for your next creator recap</h2>
<table><thead><tr><th>Look at</th><th>What to look for</th><th>Why it matters</th></tr></thead><tbody>
<tr><td>Code sources</td><td>Where code uses came from</td><td>Coupon sites inflate creator results</td></tr>
<tr><td>New vs. existing buyers</td><td>Code users who were already customers</td><td>Regulars would have bought anyway</td></tr>
<tr><td>Boosted posts</td><td>Posts with paid spend, and which reports count them</td><td>Two reports, one result</td></tr>
<tr><td>Estimated value</td><td>How it was calculated</td><td>It measures reach in dollars</td></tr>
<tr><td>Shares</td><td>Shares compared with views</td><td>See ${g('share-rate', 'share rate')}</td></tr>
<tr><td>Comments</td><td>What the creator’s audience said</td><td>Shows whether the fit was right</td></tr>
</tbody></table>

<p>Get the answers in writing, creator by creator. A table with each creator’s posts, codes, code sources, paid spend and reported results makes the comparison fair. If results can’t be split that way yet, start keeping the table now, before the next round of bookings.</p>

<h2 id="questions">Questions worth asking</h2>
<p>Ask them of whoever runs your creator program, in-house or a partner.</p>
<ol>
<li>How many code uses came from coupon sites?</li>
<li>How many code users were already our customers?</li>
<li>Which posts had paid spend behind them, and do those results also show up in our paid-media reports?</li>
<li>How is estimated media value calculated, and what would we judge creators on without it?</li>
<li>Which creators’ audiences shared and commented the most?</li>
</ol>
<p>Our guide to <a href="/library/which-posts-actually-work">which posts work</a> shows how to compare posts fairly, and our glossary entry on the ${g('creator-code', 'creator code')} covers codes in more detail.</p>

<h2 id="holdout">What a regions-on, regions-off test looks like with creators</h2>
<p>Creators are the hardest channel to test, because organic posts go wherever the algorithm sends them. You can’t switch a creator off in one region. Two approaches work.</p>
<p>First, test the paid part. If you boost creator posts, run the boost in some regions and pause it in matched ones for a few weeks, then compare sales in your own numbers. That’s a regions-on, regions-off test, also called a ${g('holdout-test', 'holdout test')}, and it tells you what the spend adds.</p>
<p>Second, stagger the creators. Space posts out instead of stacking them in one launch week, and line each one up with your own numbers by day. It isn’t proof the way a regional test is, but it separates creators who move results from creators who post on a busy week.</p>
${CTA}`,
    faq: [
      ['Is earned media value a useful number?', 'It describes reach in dollars. It doesn’t tell you whether anyone bought, so judge creators on results in your own numbers.'],
      ['How do we stop codes leaking to coupon sites?', 'You can’t fully. Unique codes per creator and per campaign help, and looking at code sources each month shows how big the leak is.'],
      ['Should we cut creators with low code use?', 'Not on codes alone. Some creators drive results that never touch a code. Line up their post dates with your own numbers first.'],
    ],
  },
];

// ---------------------------------------------------------------------------
// More comparison pages (COMPARE shape plus COMPARE_DEEP fields)
// ---------------------------------------------------------------------------
export const ALTERNATIVES = [
  {
    slug: 'iris', name: 'IRIS', h1: 'Arcus vs. IRIS', checked: '[Last checked: date]',
    short: 'IRIS is a measurement tool for e-commerce and performance teams [Check on their site]. Arcus connects a brand’s data and what people say online, and answers for you.',
    lead: 'IRIS is a marketing measurement tool built for e-commerce and performance teams [Check on their site]. Arcus sits in a different place: it connects every piece of an entertainment or lifestyle brand’s data, from sales and CRM to ad accounts, agency reports and what people say, into one place the brand owns, and answers questions with the whole picture.',
    rows: [
      ['Built for', 'E-commerce and performance teams [Check on their site]', 'Brand teams at entertainment and lifestyle companies'],
      ['Main job', 'Marketing measurement [Check on their site for specifics]', 'Connecting every piece of your data into one place you own, and answering any question'],
      ['Who does the work', '[Check on their site]', 'We do, and send you the answers'],
      ['Results it starts from', '[Check on their site]', 'Your own sales, tickets, sign-ups, streams or viewing'],
      ['Conversation online', '[Check on their site]', 'Read and counted'],
    ],
    better: 'If you run a performance team that wants a measurement tool of its own, IRIS may be built for you [Check on their site].',
    summary: 'IRIS is a marketing measurement tool built for e-commerce and performance teams [Check on their site]. Arcus connects the pieces in-house brand teams at entertainment and lifestyle companies already have, from sales and CRM to ad accounts, agency reports and what people say, into one place they own, then answers their questions with the whole picture: a few slides with the answer on top. The first question is usually simple: what worked? If you have a performance team that wants a tool, look at IRIS. If you want the answer without running a tool yourself, look at Arcus.',
    sections: [
      ['What IRIS is built for', 'From how it presents itself, IRIS is a marketing measurement tool for e-commerce and performance teams [Check on their site for current features, channels covered and pricing]. Tools like this tend to suit teams that run paid media closely and want numbers they can work with every day.\n\nWe haven’t used IRIS ourselves, so we won’t describe how it works. Ask them directly about setup, who does the analysis, and what results it can measure.'],
      ['What Arcus is built for', 'Arcus is for brand teams at studios, streamers, drinks, games, music, fashion and beauty brands, often without a data department. Their data sits in pieces: sales in one system, customers in another, and ad accounts, partners and listening tools each reporting on their own. The Arcus team connects those pieces into one place you own, inside your own setup, over about three months. Then any leader can ask a question and get an answer that sees the whole picture: the answer on top, the evidence, then what to keep, test and stop.\n\nThe first question is usually simple: what worked? We line up what every channel reports against your own numbers and count each result once. Listening runs alongside it: reading and counting what your audience says on Reddit, TikTok, YouTube, Discord, reviews and more, connected to your numbers.'],
      ['Results beyond online sales', 'Many entertainment and lifestyle brands measure success in tickets, streams, viewing, sign-ups or retail sales. Arcus works from whatever your own numbers are and says where they’re too thin to call.\n\nIf your results come through theaters, streaming platforms, distributors or retailers, ask any measurement vendor how they handle that data. For IRIS: [Check on their site].'],
      ['Who does the work', 'With a measurement tool, someone on your team usually connects the data, reads the output and turns it into a decision [Check on their site for IRIS’s setup and support model]. With Arcus, our team does that, and a person reads every answer before you do.\n\nThe right choice depends on whether someone on your team wants measurement to be part of their job.'],
    ],
    decide: [
      'Look at IRIS if you have a performance team that wants a measurement tool to use directly [Check on their site].',
      'Look at IRIS if most of your results are online sales and your team is comfortable with e-commerce measurement.',
      'Pick Arcus if your team is brand-side and nobody has time to set up and read a measurement tool.',
      'Pick Arcus if your results are tickets, streams, sign-ups, viewing or retail sales.',
      'Pick Arcus if what your audience says online matters as much as what your spend returns.',
      'Talk to both if you want a performance tool plus help with the brand-side questions and what people say.',
    ],
    both: 'A company with a performance team might use a measurement tool for day-to-day paid media and Arcus for the brand-side questions, listening and tests. Any measurement output becomes one more piece Arcus connects to your own numbers. [Check on their site for how IRIS shares results.]',
    faq: [
      ['Is IRIS a competitor to Arcus?', 'In part. Both help teams understand what marketing did. IRIS is described as a measurement tool for e-commerce and performance teams [Check on their site]. Arcus connects every piece of a brand team’s data, plus what people say, does the work, and answers the question.'],
      ['What does IRIS cost?', 'We don’t publish other companies’ pricing. [Check on their site.] You can try Arcus free. After that, there’s a one-time setup fee and a monthly fee. The Pricing page has the details.'],
      ['Can Arcus use results from IRIS?', 'If you share them, yes. We line them up with your other channels and your own numbers for the same period.'],
      ['Which is better for a brand without a data team?', 'Arcus was built for that team. For whether IRIS fits, [Check on their site for setup and support].'],
    ],
  },
  {
    slug: 'northbeam', name: 'Northbeam', h1: 'Arcus vs. Northbeam', checked: '[Last checked: date]',
    short: 'Northbeam shows e-commerce performance teams which ads get credit for online sales [Check on their site]. Arcus connects every piece of a brand’s data and answers for you.',
    lead: 'Northbeam is a marketing attribution and measurement platform popular with e-commerce brands. It shows performance teams which ads get credit for online sales [Check on their site]. Arcus connects every piece of an entertainment or lifestyle brand’s data, from sales, tickets and CRM to ad accounts, agency reports and what people say, into one place the brand owns, and answers questions with the whole picture.',
    rows: [
      ['Built for', 'E-commerce and performance marketing teams [Check on their site]', 'Brand teams at entertainment and lifestyle companies'],
      ['Main job', 'Attribution and measurement across channels', 'Connecting every piece of your data into one place you own, and answering any question'],
      ['Who does the work', 'Your team, in the platform [Check on their site]', 'We do, and send you the answers'],
      ['Results it starts from', 'Online sales tracked on your site [Check on their site]', 'Your own sales, tickets, sign-ups, streams or viewing'],
      ['Proof of cause', '[Check on their site for testing features]', 'A regions-on, regions-off test when it matters'],
      ['Conversation online', 'Not the focus [Check on their site]', 'Read and counted'],
    ],
    better: 'If you sell mostly online and have a performance team that wants an attribution dashboard, Northbeam is built for that.',
    summary: 'Northbeam is a marketing attribution and measurement platform popular with e-commerce brands. It gives performance teams a view of which channels and ads get credit for online sales [Check on their site for current features]. Arcus connects the pieces brand teams at entertainment and lifestyle companies already have, attribution output included, into one place they own. It counts each result once against your own numbers and adds what people say. When you need proof of cause, it runs ads in some regions, pauses them in others and compares sales.',
    sections: [
      ['What Northbeam is built for', 'Northbeam is known as an attribution platform for e-commerce brands. It brings ad spend and tracked online sales into one view so a performance team can compare channels and decide where the next dollar goes [Check on their site for current features, channels covered and pricing].\n\nThat suits a team that sells mostly through its own site, runs paid media closely and wants a dashboard it checks every day.'],
      ['Attribution and proof of cause', 'Any attribution model, however good, is a rule for sharing credit. It can show which ads were on the path to a sale. It can’t show whether the sale would have happened anyway.\n\nArcus starts by lining up every channel’s reported results against your own numbers, so each result counts once. When a decision needs proof, it uses a regions-on, regions-off test. Ask any attribution vendor how they handle proof of cause. For Northbeam: [Check on their site].'],
      ['Results beyond online sales', 'Entertainment and lifestyle brands often count tickets, streams, viewing, sign-ups or retail sales. Many of those happen somewhere a site tracker can’t see: a theater, a streaming platform, a retailer’s shelf.\n\nArcus works from whatever your own numbers are, lined up by day and region, and tells you where they’re too thin to call. If your results mostly happen off your own site, ask any attribution vendor how they’d measure them [Check on their site].'],
      ['Who does the work', 'With an attribution platform, your team reads the dashboard and turns it into decisions [Check on their site for support options]. With Arcus, our team does the work and sends a few slides with the answer on top.\n\nArcus also reads and counts public conversation about your brand and lines it up with your numbers, which attribution tools usually leave out.'],
    ],
    decide: [
      'Pick Northbeam if most of your results are online sales through your own site.',
      'Pick Northbeam if you have a performance team that wants an attribution dashboard to use daily.',
      'Pick Arcus if your results are tickets, streams, sign-ups, viewing or retail sales.',
      'Pick Arcus if nobody on your team has time to read and act on a dashboard.',
      'Pick Arcus if you need every result counted once across channels, and tested before you move budget.',
      'Use both if a performance team wants attribution and the brand team wants every result counted once, plus listening.',
    ],
    both: 'A brand with a performance team might use Northbeam for day-to-day paid media and Arcus for the brand-side questions, listening and tests. Attribution output becomes one more piece Arcus connects to your own numbers. [Check on their site for how Northbeam exports data.]',
    faq: [
      ['Is Northbeam the same as what Arcus does?', 'They overlap on one question: which marketing gets credit. Northbeam is a platform for performance teams. Arcus connects every piece of a brand team’s data, plus what people say, counts each result once, and runs tests when a decision needs proof.'],
      ['Does Arcus do attribution?', 'Arcus lines up every reported result against your own numbers and counts each one once. When you need proof of cause, we run a regions-on, regions-off test. See our guide to incrementality.'],
      ['What does Northbeam cost?', 'We don’t publish other companies’ pricing. [Check on their site.]'],
      ['Can Arcus use our Northbeam data?', 'If you share it, yes. We read it alongside your other channels and your own numbers. [Confirm: how Arcus connects to Northbeam (API, export or shared access).]'],
    ],
  },
];
