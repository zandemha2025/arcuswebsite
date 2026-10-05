// Programmatic pages: integrations (one per TOOLS item), channel agency-check guides, and more comparison pages.
// Rules: no invented numbers. Example numbers are labeled "Example". Unconfirmed facts are in [brackets].
// We never claim official partnerships, certified integrations or APIs. Each integration has a `confirm` line.
// Note: the TOOLS item 'Google BigQuery' is intentionally left out of INTEGRATIONS (content brief bans that name in site copy).
import { TOOLS } from './site.js';

const D = '2026-10-02';
const g = (slug, text) => `<a href="/glossary/${slug}">${text}</a>`;
const fr = (text = 'your first question') => `<a href="/free-report">${text}</a>`;
const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const logoFor = (name) => (TOOLS.find((t) => t.name === name) || {}).logo || '';

const it = (name, category, h1, lead, what, why, checks, pairsWith, faq) => ({
  slug: kebab(name), name, logo: logoFor(name), category, h1, lead, what, why, checks, pairsWith, faq,
  confirm: `[Confirm: how Arcus connects to ${name} (API, export or shared access).]`,
});

// ---------------------------------------------------------------------------
// Integrations
// ---------------------------------------------------------------------------
export const INTEGRATIONS = [
  // Ads
  it('Meta Ads', 'Ads',
    'See what Meta Ads really added, next to everything else.',
    'We read your Meta Ads data and connect it to your own sales, tickets, sign-ups or streams, your other ad accounts and what people say. Every result Meta credits to Facebook and Instagram is counted once.',
    'Spend, reach, impressions and the conversions Meta credits to each campaign and ad, along with the attribution setting each report uses, split into clicks and views where the account allows.',
    'Meta credits itself whenever its ad touched a buyer, and so does every other platform. Meta reports are often the biggest single claim in a recap, so they’re usually the first place double counting shows up. Connected to everything else, Meta’s data can also show who it reached and what it added that other channels didn’t.',
    ['Do Meta’s claimed results, added to every other agency’s, fit inside your own numbers?', 'How much of the result rests on views without a click, and over what window?', 'Which results came through partnership ads your creator agency also claims?', 'Are the people Meta reaches the same people who become your best customers?', 'Where could a regions-on, regions-off test give a clean answer?'],
    ['TikTok Ads', 'Google Analytics', 'Shopify'],
    [['Do you need admin access to our Meta account?', 'We need to see reporting for the ad accounts your agencies run. [Confirm: read-only access and the exact permission level.]'], ['Will our agency see that you’re looking?', '[Confirm: whether agencies are told, and whether Arcus ever contacts them.] Whether to share the findings is your call.']]),
  it('Google Ads', 'Ads',
    'See how much of your Google Ads credit comes from people already looking for you.',
    'We read your Google Ads data, split searches for your name from everything else, and connect what’s left to your own numbers and your other channels.',
    'Spend, clicks and the conversions Google credits to each campaign, plus the search terms behind them where the account shows them, so brand searches can be separated from the rest.',
    'Search sits right before the purchase, so it collects credit for people who already decided to buy. Brand search is often the cleanest place to find results that weren’t the campaign’s to claim. Connected to your social, creator and email data, it also shows what sent people to search in the first place.',
    ['How much of what the agency claimed came from people searching your name?', 'Do campaign types that mix placements hide searches for your name?', 'Which searches came after a TikTok, a trailer or an email, and which channel did the work?', 'What would a regions-on, regions-off brand search test show?'],
    ['Google Analytics', 'Meta Ads', 'YouTube Studio'],
    [['Do we have to pause brand search?', 'No. Pausing it in some regions is a test you can choose to run when a budget decision depends on it. Many teams find the answer worth a few weeks.'], ['Does this cover YouTube ads bought through Google Ads?', 'Yes, where they run in the same accounts. We report them separately, because video and search get credit in different ways.']]),
  it('TikTok Ads', 'Ads',
    'See what TikTok adds, next to everything else you run.',
    'We read your TikTok Ads data and connect it to your own numbers, your other channels and the comments under your posts. Boosted creator posts get special attention, because two agencies often claim them.',
    'Spend, views, video watch time and the conversions TikTok credits to each campaign and ad, including ads that run through creators’ posts.',
    'TikTok is where a lot of entertainment and lifestyle audiences first see a brand. That makes it easy for TikTok to claim results that other channels finished, and for creator and media agencies to claim the same post.',
    ['Do TikTok’s claims, added to every other agency’s, fit inside your own numbers?', 'How much of the result rests on views without a tap?', 'Which boosted creator posts do both the media agency and the creator agency claim?', 'Do the posts that sell match what people say in the comments?'],
    ['Meta Ads', 'Snapchat Ads', 'YouTube Studio'],
    [['Can you read the comments on our TikTok ads too?', 'Public comments, yes. We read and count them as part of listening and line them up with results.'], ['What if our creator agency manages TikTok separately?', 'That’s common. We read both reports and count each result once, whoever ran the post.']]),
  it('Snapchat Ads', 'Ads',
    'See what Snapchat adds that your other channels don’t.',
    'We read your Snapchat Ads data and connect it to your own sales, tickets, sign-ups or streams, and to your TikTok and Instagram results.',
    'Spend, impressions, swipes and the conversions Snapchat credits to each campaign, with the click and view settings behind them.',
    'Snapchat reaches younger audiences many entertainment brands care about. Its results often overlap with TikTok and Instagram, so it’s worth seeing the combined total.',
    ['Do Snapchat’s claims, added to every other platform’s, fit inside your own numbers?', 'How much of the result rests on views rather than swipes or clicks?', 'Is Snapchat reaching people TikTok and Instagram miss, or the same ones?', 'Which regions could carry a clean holdout test?'],
    ['TikTok Ads', 'Meta Ads', 'Google Analytics'],
    [['Is Snapchat worth checking if spend is small?', 'Small budgets can still claim large shares of results. A quick check tells you whether the claim fits the spend.'], ['Do you need our Snap pixel data?', 'We work from what the account reports and your own numbers. [Confirm: which Snapchat data Arcus reads.]']]),
  it('Pinterest Ads', 'Ads',
    'See what Pinterest starts, on its slower timeline.',
    'We read your Pinterest Ads data and connect it to your own numbers and your other channels, with an eye on how long after a Pin each result happened.',
    'Spend, impressions, saves, clicks and the conversions Pinterest credits to each campaign, with the window each report uses.',
    'People use Pinterest to plan, so many of them buy later. Longer gaps between an ad and a result make it easier for several channels to claim the same buyer.',
    ['How far back does Pinterest’s credit reach, and what else reached the same buyer in between?', 'Do saved Pins lead to sales, or only to more saves?', 'Do Pinterest’s claims, added to everyone else’s, fit inside your own numbers?', 'What are people planning around your products this season?'],
    ['Meta Ads', 'Google Analytics', 'Shopify'],
    [['Do saves count as results?', 'Not on their own. They’re a sign of interest. We line them up with results to see whether they lead anywhere.'], ['Can you read organic Pinterest too?', 'Public Pins and boards can be part of listening. [Confirm: which organic Pinterest data Arcus reads.]']]),
  it('Reddit Ads', 'Ads',
    'See what your Reddit ads did, and how the threads took them.',
    'We read your Reddit Ads data and connect it to your own numbers. Then we add the public conversation in the communities you advertise to.',
    'Spend, impressions, clicks and the conversions Reddit credits to each campaign, plus the communities and interests each campaign targeted.',
    'Reddit is where fans argue about titles, flavors and launches in detail. Ad results only tell half the story: the comments under a promoted post and the threads around it show how the community took it.',
    ['Do Reddit’s claims hold up in your own numbers, counted once with every other agency’s?', 'What did people say under your promoted posts?', 'Are you advertising where your audience already talks for free?', 'Did a big organic thread drive results an ad got credit for?'],
    ['Meta Ads', 'Google Analytics', 'Mixpanel'],
    [['Do you read private subreddits?', 'No, only public conversation. [Confirm: how private or invite-only communities are handled.]'], ['Is Reddit worth testing for a brand like ours?', 'If your audience already talks there, it can be. A check of what Reddit claims and what fans say is a good first step.']]),
  it('LinkedIn Ads', 'Ads',
    'See which LinkedIn sign-ups and leads became something.',
    'We read your LinkedIn Ads data and connect the sign-ups, registrations and leads it credits to your CRM, so each person is counted once and followed forward.',
    'Spend, impressions, clicks, lead form submissions and the conversions LinkedIn credits to each campaign.',
    'Brand teams use LinkedIn for trade audiences, events, partnerships and hiring. Those results usually land in a CRM too, so it’s easy to count the same person twice.',
    ['How many of LinkedIn’s leads are already in your CRM from another source?', 'How many results were views without a click?', 'Which registrations came after an email invite?', 'Which leads became meetings, deals or attendees?'],
    ['Salesforce', 'HubSpot', 'Google Analytics'],
    [['We mostly use LinkedIn for trade and B2B. Is that in scope?', 'Yes. Registrations, sign-ups and leads are results, and they’re checked the same way.'], ['Can you tell which leads became something?', 'If your CRM tracks it, yes. We line up LinkedIn’s leads with what happened next.']]),

  // Sales and ticketing
  it('Ticketmaster', 'Sales and ticketing',
    'Connect your Ticketmaster sales to everything that sold them.',
    'We read your Ticketmaster sales data and connect it to your campaigns, your CRM and what fans say, by event, date and place.',
    'Ticket sales by event, date and price level, and where buyers are, when your account shows it.',
    'Tickets are the result that matters for live events and releases. Connected to your ad accounts, email and fan conversation, ticket sales by market and day show which pushes filled seats and who bought them.',
    ['Do your agencies’ claimed ticket sales add up to more than you sold?', 'Which pushes moved sales by market and day?', 'Did buyers come from your own list, or were they new?', 'Which markets could be held out for a clean test before the next on-sale?'],
    ['Meta Ads', 'Eventbrite', 'Salesforce'],
    [['We only get Ticketmaster reports as exports. Is that enough?', 'Often, yes, if they show sales by date and market. We’ll tell you what’s missing.'], ['Can you separate presale from general on-sale?', 'If your reports split them, yes. That split often changes which channel looks best.']]),
  it('Eventbrite', 'Sales and ticketing',
    'See which promotion filled your Eventbrite events.',
    'We read your Eventbrite sales and registration data and connect it to your campaigns, your email and what your agencies and partners claim.',
    'Tickets and registrations by event and date, plus the promo codes and tracking links buyers used.',
    'Events are short windows with lots of overlapping promotion. Codes and links help, but they leak and overlap, so they need checking against the full list.',
    ['Which codes and links drove registrations, each counted once?', 'Which codes spread beyond the creator or partner they were made for?', 'Do your agencies’ claims fit inside total registrations for each event?', 'Did registrants come from your own list or from new audiences?'],
    ['Ticketmaster', 'Mailchimp', 'Meta Ads'],
    [['Do free events count?', 'Yes. Registrations are results, and attendance is a better one if you track it.'], ['Can you tell us which partner drove sign-ups?', 'Where codes or links were used, yes, and we’ll flag where they overlapped.']]),
  it('Fandango', 'Sales and ticketing',
    'Line up your trailers and posts with Fandango ticket sales.',
    'We read the Fandango sales data your team receives and connect it to your trailers, campaigns and what fans say, by title, date and market.',
    'Ticket sales by title, date and market, including presales, in whatever form your team receives them. [Confirm: which Fandango data studios typically receive.]',
    'For a release, the question is which trailers, clips and creators moved people to buy a ticket. Ticket timing against campaign timing is the starting point for that answer.',
    ['Which trailer drops, ad flights and creator posts lined up with ticket sales by day?', 'Do agencies’ claimed ticket sales fit what sold in each market?', 'Did fan comments and title searches move before tickets did?', 'Which markets could be held out for a test before the next release?'],
    ['YouTube Studio', 'TikTok Ads', 'Meta Ads'],
    [['We see ticket data from several sources. Can you combine them?', 'Yes. We count each ticket once, whichever report it shows up in.'], ['Can you tell which trailer worked best?', 'We can show which drops lined up with ticket movement. Proof of cause needs a test, and we’ll say when one is worth running.']]),
  it('Steam', 'Sales and ticketing',
    'Connect Steam sales and wishlists to everything that moved them.',
    'We read your Steam sales and wishlist data and connect it to your creator streams, your campaigns and what players say in reviews.',
    'Sales and wishlist adds by day and country, and the traffic sources your Steam reports show.',
    'Games launch on spikes. A creator stream, a trailer and a sale can all land the same week, and each one will claim the bump. With everything connected, the bump can be split between them.',
    ['Which streams, trailers and ad flights lined up with wishlists and sales by day and country?', 'Do creator claims fit how wishlists and sales actually moved?', 'Which wishlist pushes turned into launch-day sales?', 'What do Steam reviews say, and did sales follow them?'],
    ['YouTube Studio', 'Reddit Ads', 'TikTok Ads'],
    [['Do wishlists count as results?', 'They’re an early one. We track them alongside sales and show how they move together.'], ['Can you read Steam reviews?', 'Yes, public reviews are part of listening. We count what players bring up and line it up with sales.']]),
  it('Shopify', 'Sales and ticketing',
    'Start from your Shopify sales, the most reliable number you have.',
    'We read your Shopify sales data and use it as the starting list everything else connects to: agency claims, emails, creator codes and what people say.',
    'Sales from your own site by day and product, discount codes used, and the referral source Shopify records.',
    'Your own sales records are the most reliable number you have. Starting from them, instead of from the ad platforms, is what lets each result be counted once.',
    ['Which sales did agencies claim, each counted once?', 'Which creator codes show up on coupon sites?', 'Which sales came through your own emails before an agency claimed them?', 'Who are your best customers, and what brought them in?'],
    ['Klaviyo', 'Meta Ads', 'Google Analytics'],
    [['Most of our sales are in retail. Does Shopify matter?', 'It’s one part. We line up your site sales with retail data where you have it and say where the picture is thin.'], ['Do you change anything in our Shopify account?', 'No. [Confirm: read-only access.]']]),
  it('Amazon', 'Sales and ticketing',
    'See what your marketing did for sales on Amazon.',
    'We read your Amazon sales and Amazon Ads data and connect them to your other channels and the reviews on your listings.',
    'Sales by product and day, plus Amazon Ads spend and the sales Amazon credits to its ads, where you have access.',
    'Many brands sell more on Amazon than on their own site, and Amazon credits its own ads with sales there. Checking those claims against total Amazon sales, and against other channels, keeps the count honest.',
    ['Do Amazon Ads’ claimed sales fit inside total sales on Amazon?', 'Did social and creator campaigns move Amazon sales by day?', 'Which sales do both Amazon Ads and an outside agency claim?', 'What do reviews on your listings complain about most?'],
    ['Walmart', 'Shopify', 'Meta Ads'],
    [['Can you see sales from people our TikTok ads sent to Amazon?', 'Often not directly. We line up timing and regions, and recommend a test when the answer matters.'], ['Is Amazon Ads the same as retail media?', 'It’s one kind. See our glossary entry on retail media.']]),
  it('Walmart', 'Sales and ticketing',
    'Connect Walmart sales to the campaigns that ran.',
    'We read the Walmart sales data your team receives and connect it to your campaigns and your other retailers, by week and region.',
    'The sales reports Walmart shares with your team by product, week and region, and Walmart ads reports if you run them. [Confirm: which Walmart data sources Arcus reads.]',
    'For drinks and other retail-heavy brands, shelf sales are the result that matters. Regional retail data is also what makes a regions-on, regions-off test possible.',
    ['Which campaign flights lined up with retail sales by week and region?', 'Do retailer ad claims fit total sales at that retailer?', 'How does Walmart compare with your other retailers in the same regions?', 'Which matched regions could carry a holdout test?'],
    ['Amazon', 'Snowflake', 'Excel'],
    [['Retail data arrives late. Does that matter?', 'It slows some answers down. We say which findings can wait and which need faster data.'], ['Can you combine several retailers?', 'Yes. We line them up by week and region and count each sale once.']]),

  // Streaming and apps
  it('Roku', 'Streaming and apps',
    'Line up your Roku campaigns with sign-ups and viewing.',
    'We read your Roku reporting and connect it to your own sign-ups, viewing and sales.',
    'Viewing and ad delivery reports from Roku, for your channel or your campaigns, whichever your team has. [Confirm: which Roku data Arcus reads.]',
    'TV-screen ads are seen, not clicked, so the results they claim rest on views. That makes them easy to overcount and worth checking against your own numbers by region.',
    ['Which Roku flights lined up with sign-ups and viewing by region and day?', 'How much of the claimed result rests on views without a click?', 'Did the people TV-screen ads brought in stay and watch?', 'Which regions could carry a holdout test on TV-screen spend?'],
    ['YouTube Studio', 'Mixpanel', 'Google Analytics'],
    [['Can you tie a TV ad to one sign-up?', 'Usually not person by person. We line up regions and timing, and use a holdout test for proof.'], ['Do you cover other streaming platforms?', 'Where you have reports, yes. [Confirm: list of streaming platforms supported.]']]),
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
    'We read your App Store data and connect installs to your agencies’ claims, your app data and your reviews.',
    'Downloads and installs by day and country, and the sources Apple’s reports show, plus public ratings and reviews.',
    'Every ad platform claims app installs. App Store totals are the closest thing to a full count, so they’re the line every claim is checked against.',
    ['Do every agency’s claimed installs, added up, fit inside App Store downloads?', 'Which campaigns lined up with installs by country and day?', 'Did installs turn into sign-ups and regular use?', 'What do reviews say after each launch or update?'],
    ['Google Play', 'Mixpanel', 'TikTok Ads'],
    [['Installs aren’t our goal. Sign-ups are. Can you follow through?', 'Yes, with your app data. Installs are a step, and we line them up with what happens next.'], ['Can you read App Store reviews?', 'Yes, public reviews are part of listening.']]),
  it('Google Play', 'Streaming and apps',
    'Connect Google Play installs to what people do next.',
    'We read your Google Play data and connect installs to your agencies’ claims, your app data and your reviews.',
    'Installs by day and country, the acquisition sources Google Play shows, and public ratings and reviews.',
    'Android installs are claimed by the same ad platforms as iPhone installs. The Google Play total is the check on all of them.',
    ['Do claimed Android installs fit inside Google Play totals?', 'Which campaigns lined up with installs by country and day?', 'Did installs turn into sign-ups and regular use?', 'What do Android reviewers bring up most?'],
    ['App Store', 'Mixpanel', 'Google Ads'],
    [['Do you combine iPhone and Android?', 'Yes. We report each and the total, with each install counted once.'], ['What if our agency reports installs from its own tracking tool?', 'We read that too and match it against App Store and Google Play totals. [Confirm: which app tracking tools Arcus reads.]']]),

  // CRM and email
  it('Salesforce', 'CRM and email',
    'Use Salesforce as the list of who your customers are.',
    'We read your Salesforce data and connect your customer records to every campaign and agency claim, one person at a time.',
    'Customer and contact records, sign-ups, purchases or deals tied to them, and the campaign or source fields your team fills in.',
    'A CRM is often the most complete list of who your customers are. Matching claims to your own records is how each result gets counted once, and how you find out which campaigns found your best customers.',
    ['Which claimed sign-ups and sales match your customer records?', 'Were these people already customers, or new?', 'Which results did your own emails drive before an agency claimed them?', 'Who are your best customers, and which campaigns found them?'],
    ['HubSpot', 'LinkedIn Ads', 'Snowflake'],
    [['Do you see personal details about our customers?', '[Confirm: who sees data, what personal details are used, and how they’re protected.] The Security page has the details.'], ['Our Salesforce is messy. Is that a problem?', 'Most are. We work with what you have and tell you which findings are solid and which are directional.']]),
  it('HubSpot', 'CRM and email',
    'See your HubSpot contacts next to every campaign that reached them.',
    'We read your HubSpot data and connect your contacts and their history to agency claims, campaigns and what people say.',
    'Contacts, sign-ups and purchases tied to them, email sends and clicks, and the source HubSpot records for each contact.',
    'HubSpot holds both your contact list and your emails. That makes it the place to see when a result an agency claimed came through your own email.',
    ['Which claimed sign-ups match contacts, each counted once?', 'Where did an email click come right before a result an agency claimed?', 'Which campaigns brought new contacts, and which reached people you already had?', 'Which contacts became your best customers?'],
    ['Salesforce', 'LinkedIn Ads', 'Google Analytics'],
    [['Can you read our email results in HubSpot?', 'Yes. Email is often the channel agencies leave out, and it belongs in the count.'], ['Will you change anything in HubSpot?', 'No. [Confirm: read-only access.]']]),
  it('Klaviyo', 'CRM and email',
    'See how much your emails did before an agency claimed it.',
    'We read your Klaviyo data and connect your email and text sends to your own numbers and the results your agencies claim.',
    'Email and text sends, opens, clicks, and the results Klaviyo credits to each message, along with your list and segments.',
    'Email is your own channel, and it drives a lot of results. Klaviyo credits itself too, so its claims go in the same count as everyone else’s.',
    ['Which agency-claimed results came after the buyer clicked an email?', 'Do Klaviyo’s own claims, added to everyone else’s, fit inside your own numbers?', 'Do buyers on your list behave differently from new buyers?', 'Which messages bring people back to buy again?'],
    ['Shopify', 'Meta Ads', 'Mailchimp'],
    [['Klaviyo says email drove a lot. Is that right?', 'It may be. Klaviyo uses its own rule, so we match its claims against your own numbers like every other channel.'], ['Do you send emails for us?', 'No. We read the results.']]),
  it('Mailchimp', 'CRM and email',
    'Put your Mailchimp results in the same count as your agencies.',
    'We read your Mailchimp data and connect your email campaigns to your own numbers and your agencies’ claims.',
    'Campaign sends, opens, clicks and the results Mailchimp tracks for each email, plus your audience lists.',
    'If an agency claims a result that came right after one of your emails, the email deserves a share of the story. You only see that when email sits in the same count.',
    ['Which agency-claimed results followed an email click?', 'How do people on your list compare with new buyers or sign-ups?', 'Did ticket, sign-up or sales spikes line up with your sends?'],
    ['Eventbrite', 'Shopify', 'HubSpot'],
    [['We only send a few emails a month. Does it matter?', 'Even a few big sends can explain a spike an agency claimed. It’s worth having in the count.'], ['Do you need our subscriber list?', '[Confirm: which Mailchimp data Arcus reads, and how personal details are handled.]']]),

  // Analytics and data
  it('Google Analytics', 'Analytics and data',
    'Use Google Analytics to see where visitors really came from.',
    'We read your Google Analytics data and connect visits and results to your own numbers and to what each platform claims.',
    'Visits, sources, campaigns and the events your team tracks as results, such as sign-ups or purchases, by day and region.',
    'Google Analytics sees your site across every channel, so it’s a useful second view next to each platform’s own report. It has its own credit rules too, so it isn’t the final word.',
    ['Does each platform’s claim match what Google Analytics saw from that source?', 'How much traffic came from searches for your name?', 'Which tracked results are missing from your own numbers?', 'Which sources bring visitors who go on to buy or sign up?'],
    ['Google Ads', 'Meta Ads', 'Shopify'],
    [['Isn’t Google Analytics already the independent view?', 'It’s a broader one. It still uses its own rule for credit and only sees your site, so we check it against your own numbers too.'], ['Our tracking setup is old. Is that a problem?', 'We’ll tell you what’s tracked well and what isn’t. A gap in tracking is a finding too.']]),
  it('Mixpanel', 'Analytics and data',
    'Connect Mixpanel to see who stays after they sign up.',
    'We read your Mixpanel data and connect sign-ups and actions in your app or site to the campaigns and agencies that claim them.',
    'Sign-ups, sessions and the product events your team tracks, by day, source and region.',
    'For apps and streaming products, the result is often an action inside the product. Mixpanel shows whether people who came from a campaign did anything after they arrived.',
    ['Which claimed sign-ups match sign-up events in Mixpanel, each counted once?', 'Which channels bring people who stay and use the product?', 'Which campaigns lined up with sign-ups by day and region?'],
    ['App Store', 'Google Play', 'Roku'],
    [['Can you tell which channel brings people who stay?', 'If Mixpanel tracks what they do later, yes. That’s often more useful than the sign-up count.'], ['Do you need our event definitions?', 'We read them and ask your team about anything unclear.']]),
  it('Snowflake', 'Analytics and data',
    'Read your own numbers where your company already keeps them.',
    'If your company keeps sales, tickets, sign-ups or viewing in Snowflake, we read your data from there instead of asking for exports.',
    'Whatever your company already keeps there: sales, customer records, viewing, sign-ups or retail data, organized the way your team set it up.',
    'Your own numbers are the starting point for every check. If they already live in one place, reading them there means less work for your team.',
    ['Which agency claims hold up against the numbers you already keep in Snowflake?', 'Do our definitions match how your team reports results?', 'What does Snowflake hold that agency reports never cover?'],
    ['Databricks', 'Salesforce', 'Looker'],
    [['Will you build things inside our Snowflake account?', 'Arcus builds the setup inside your own systems, and you own it. [Confirm: what Arcus creates in a brand’s data environment and who owns it.]'], ['We don’t have a data team. Can you still read it?', 'Yes. That’s who Arcus is built for.']]),
  it('Databricks', 'Analytics and data',
    'Read your own numbers where your company already keeps them.',
    'If your company keeps its data in Databricks, we read your sales, sign-ups or viewing from there and match agency claims against them.',
    'Whatever your company already keeps there: sales, viewing, sign-ups, customer records or retail data.',
    'Starting from the data your company already trusts keeps every check grounded in your own numbers, and avoids another set of exports.',
    ['Which agency claims hold up against the numbers you keep in Databricks?', 'Do result definitions match how your team reports?', 'Which campaigns lined up with results by day and region?'],
    ['Snowflake', 'Tableau', 'Power BI'],
    [['Does our data leave Databricks?', '[Confirm: what, if anything, is copied outside your environment, how long it’s kept, and how it’s deleted.]'], ['Who on our side needs to be involved?', 'Someone who can grant access. Nobody needs to be technical after that.']]),
  it('Power BI', 'Analytics and data',
    'Make your Power BI dashboards and our answers agree.',
    'We read the numbers your team already reports in Power BI and make sure our checks use the same definitions.',
    'The reports and dashboards your team already uses, and the definitions behind the numbers on them.',
    'If your leadership already reads a Power BI dashboard, our reports need to agree with it or explain why they don’t.',
    ['Do our counts match the ones on your dashboards?', 'Which dashboard numbers come from platform claims instead of your own numbers?', 'Where do teams define the same result differently?'],
    ['Excel', 'Databricks', 'Microsoft Teams'],
    [['Do we have to replace our dashboards?', 'No. Keep them. Arcus answers the bigger questions that need everything else too.'], ['Can you add your findings to our dashboards?', '[Confirm: whether Arcus can publish results into a brand’s existing dashboards.]']]),
  it('Looker', 'Analytics and data',
    'Make your Looker dashboards and our answers agree.',
    'We read the numbers your team already reports in Looker and make sure our checks use the same definitions.',
    'The dashboards and reports your team relies on, and the definitions behind each number.',
    'Two numbers for the same thing make every meeting longer. Matching definitions first means our reports and your dashboards tell one story.',
    ['Do our counts match the ones on your Looker dashboards?', 'Which numbers come straight from ad platforms?', 'Where do definitions differ between teams?'],
    ['Snowflake', 'Google Sheets', 'Slack'],
    [['Will your numbers match ours?', 'They should, or the report says why not. Usually the difference is a definition.'], ['Do we need Looker to work with Arcus?', 'No. We work with whatever you use.']]),
  it('Tableau', 'Analytics and data',
    'Make your Tableau dashboards and our answers agree.',
    'We read the numbers your team already reports in Tableau and line our checks up with them.',
    'The workbooks and dashboards your team uses, and the definitions behind the numbers.',
    'If Tableau is where your team reads results, our checks should use the same definitions and explain any gap.',
    ['Do our counts match the ones on your Tableau dashboards?', 'Which numbers come from platform claims?', 'Where do definitions differ between teams?'],
    ['Databricks', 'Excel', 'Slack'],
    [['Can our analyst keep using Tableau?', 'Yes. Arcus works alongside the tools you have.'], ['Does Arcus replace Tableau?', 'No. Tableau shows numbers. Arcus connects them to everything else, checks them and answers what they mean.']]),

  // Work tools
  it('Google Sheets', 'Work tools',
    'Send us the spreadsheet. We’ll check it.',
    'We read your Google Sheets data, including the agency reports and sales trackers your team keeps there.',
    'Agency recaps, spend trackers, sales or ticket logs and campaign calendars, in whatever layout your team uses.',
    'A lot of real marketing data lives in spreadsheets. Agency reports often arrive as one, and your own tracker may be the best record of what ran.',
    ['Do the agency claims in your shared sheets hold up against your own numbers?', 'Did results move when your campaign calendar says things ran?', 'Where do date ranges mix or totals not add up?'],
    ['Excel', 'Google Drive', 'Meta Ads'],
    [['Our sheets are messy. Is that OK?', 'Yes. Most are. We’ll ask about anything unclear.'], ['Is a spreadsheet enough for the first question?', 'Often, yes. For an agency check, send the report you want checked and your own numbers for the same dates.']]),
  it('Excel', 'Work tools',
    'Send us the Excel file. We’ll check it.',
    'We read your Excel data, including agency reports, retail sales files and trackers.',
    'Agency recaps, retail and distributor reports, spend trackers and sales logs.',
    'Retail partners, distributors and agencies often send results as Excel files. They’re part of your own numbers, and part of the claims.',
    ['Do the claims in agency recaps hold up against your own numbers?', 'How do retail and distributor files line up by week and region?', 'Where do totals and date ranges not line up?'],
    ['Google Sheets', 'Walmart', 'Power BI'],
    [['Can you work with distributor depletion reports?', 'Yes. See our glossary entry on sell-through and depletions.'], ['Do files need a set format?', 'No. We work with what you have.']]),
  it('Google Drive', 'Work tools',
    'Point us at the folder where agency reports land.',
    'We read the agency reports, decks and exports your team keeps in Google Drive.',
    'Agency recaps, campaign decks, creative briefs and data exports, in the folders you share with us.',
    'The history of what your agencies ran and claimed is usually sitting in a shared folder. Reading it is the fastest way to see the claims over time.',
    ['How have agency claims changed month by month?', 'Which campaign decks lined up with results?', 'Did any claims change between versions of a report?'],
    ['Google Sheets', 'Dropbox', 'Slack'],
    [['Do you see our whole Drive?', 'Only folders you share. [Confirm: how folder access is granted and removed.]'], ['Can you read PDFs and slides?', 'Yes, the claims and numbers in them.']]),
  it('Dropbox', 'Work tools',
    'Point us at the folder where agency reports land.',
    'We read the agency reports, decks and exports your team keeps in Dropbox.',
    'Agency recaps, decks, creative files and data exports, in the folders you share with us.',
    'If agencies drop their reports in Dropbox, that folder is the record of every claim they’ve made. Reading it lets us check them over time.',
    ['How have agency claims changed month by month?', 'Which campaign files lined up with results?', 'Did totals change between versions of a report?'],
    ['Google Drive', 'Excel', 'Microsoft Teams'],
    [['Do you see everything in our Dropbox?', 'Only folders you share. [Confirm: how folder access is granted and removed.]'], ['Do you read creative files too?', 'We use them to match posts and ads to results. [Confirm: which file types Arcus reads.]']]),
  it('Slack', 'Work tools',
    'Get the answer where your team already talks.',
    'We read the agency reports and recaps your team shares in the Slack channels you choose.',
    'Agency reports and recaps posted in channels you pick, so we see them when your team does. [Confirm: whether Arcus can post reports or answer questions in Slack.]',
    'Agency recaps often land in a shared channel first. Reading them there means fewer forwarded files and no new tool for your team.',
    ['What did each new agency recap in your channels claim?', 'Do those claims hold up against your own numbers?', 'Which recaps claim more than your totals allow?'],
    ['Microsoft Teams', 'Google Drive', 'Google Sheets'],
    [['Do you read our private messages?', 'No. Only channels you choose to share. [Confirm: exact Slack access scope.]'], ['Can we ask Arcus questions in Slack?', '[Confirm: whether this is supported.]']]),
  it('Microsoft Teams', 'Work tools',
    'Get the answer where your team already talks.',
    'We read the agency reports and recaps your team shares in the Microsoft Teams channels you choose.',
    'Agency reports and recaps posted in channels you pick. [Confirm: whether Arcus can post reports or answer questions in Teams.]',
    'If your agencies and team share recaps in Teams, that’s where the claims show up first. Reading them there keeps your team’s routine the same.',
    ['What did each new agency recap in your channels claim?', 'Do those claims hold up against your own numbers?', 'Which recaps claim more than your totals allow?'],
    ['Slack', 'Excel', 'Power BI'],
    [['Do you read private chats?', 'No. Only channels you choose to share. [Confirm: exact Teams access scope.]'], ['Do we need Teams to work with Arcus?', 'No. It’s one option among the tools you already use.']]),
  it('Hootsuite', 'Work tools',
    'Line up your own posts with what they did for results.',
    'We read your Hootsuite data and connect what you posted across accounts to your own numbers and what your audience said.',
    'Your posts across social accounts, when they went out, and how each one did: views, reach, likes, comments and shares.',
    'Your own posts drive results too, and agencies rarely count them. Hootsuite holds the full record of what you posted, which is the base for any content report.',
    ['Which types of post get watched, and which get shared?', 'Which posts did people send on to friends?', 'Did results move with your posting calendar, or with agency flights?'],
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
// Channel guides: "How to check your {channel} agency"
// ---------------------------------------------------------------------------
export const CHANNELS = [
  {
    slug: 'check-your-meta-agency', topic: 'Agency reports', author: 'brendon-ghaderi', date: D,
    title: 'How to check your Meta agency (Facebook and Instagram)',
    dek: 'Meta credits itself for every buyer its ads touched. Here’s how to read a Meta recap and find out which results hold up.',
    short: 'Start by asking for Meta’s results split into clicks and views, with the window behind each. Then add Meta’s claims to every other agency’s and compare the total with your own numbers. For proof that Meta caused results, run ads in some regions and not others for a few weeks.',
    body: `
<h2 id="how-it-counts">How a Meta recap counts results</h2>
<p>Your Meta agency reports from Meta Ads Manager. The results in that report are the ones Meta credits to its own ads, using Meta’s own rule for ${g('attribution', 'attribution')}. Meta can see what happened on Facebook and Instagram and, through its tracking on your site or app, some of what happened next. It can’t see your TikTok ads, your emails, or the creator video someone watched on YouTube.</p>
<p>Two settings shape every number in the recap. The first is the ${g('conversion-window', 'conversion window')}: how many days after someone clicked or saw an ad a result still counts. The second is whether views count at all. A ${g('view-through-conversion', 'view-through conversion')} is a result credited to an ad someone saw and never clicked. Meta reports often combine clicks and views into one number. Check the window in the report before you read anything else.</p>
<p>Meta also estimates some results it can’t observe directly, because phones and browsers share less than they used to. That’s a reasonable fix for missing data. It also means part of the number is a model, and the recap rarely says which part.</p>

<h2 id="double-counting">Where double counting comes from on Meta</h2>
<p>Meta is usually the biggest claim in a recap, so it’s where ${g('double-counting', 'double counting')} shows up first. Here’s where it comes from:</p>
<ul>
<li><b>View-throughs.</b> Facebook and Instagram reach a lot of people. Many of them buy for other reasons in the days after seeing an ad, and a view rule credits Meta with those results.</li>
<li><b>Partnership ads.</b> When your media agency puts spend behind a creator’s post, the results can show up in the media agency’s report and the creator agency’s report. See ${g('creator-whitelisting', 'creator whitelisting')}.</li>
<li><b>Retargeting.</b> Ads shown to people who already visited your site catch buyers close to a decision. Those results often belong to whatever brought them the first time.</li>
<li><b>Your own channels.</b> A buyer who opens your email and buys can still be claimed by Meta if they saw an ad that week.</li>
</ul>
<p>None of this means the agency is doing bad work. It means Meta’s number is Meta’s view, and needs to sit next to everyone else’s.</p>

<h2 id="checklist">A checklist for your next Meta recap</h2>
<table><thead><tr><th>Check</th><th>What to look for</th><th>Why it matters</th></tr></thead><tbody>
<tr><td>Window</td><td>The click and view windows behind the results</td><td>Longer windows reach further back for credit</td></tr>
<tr><td>Clicks vs. views</td><td>Results split by click and by view</td><td>View-throughs are the easiest results to overcount</td></tr>
<tr><td>Modeled results</td><td>Whether some results are estimated</td><td>Estimates should be labeled as estimates</td></tr>
<tr><td>Partnership ads</td><td>Creator posts with paid spend behind them</td><td>Two agencies may claim the same result</td></tr>
<tr><td>Total vs. your numbers</td><td>Meta’s claims plus every other agency’s, against your own total</td><td>A total above what you had proves overlap</td></tr>
<tr><td>Reach</td><td>How many different people saw the ads</td><td>See ${g('reach-vs-impressions', 'reach vs. impressions')}</td></tr>
</tbody></table>

<h2 id="questions">Questions to ask your Meta agency</h2>
<ol>
<li>What are the click and view windows on this report, and can we see results at click only?</li>
<li>How much of this number was estimated by Meta instead of observed?</li>
<li>Which results came from partnership ads, and does the creator agency report them too?</li>
<li>How much of the spend went to people who had already visited our site?</li>
<li>If we added your claims to every other agency’s, would you expect the total to fit inside our own numbers?</li>
</ol>
<p>Good agencies answer these quickly. Our list of <a href="/library/questions-before-you-renew">questions to ask before you renew</a> goes further.</p>

<h2 id="holdout">What a holdout test looks like on Meta</h2>
<p>Matching Meta’s claims against your own numbers removes double counting. It doesn’t prove Meta caused anything. For that, run a ${g('holdout-test', 'holdout test')}: pick regions that look alike, run Meta ads in some of them, leave the others dark for a few weeks, and compare results using your own numbers.</p>
<p>Meta’s targeting by location makes this easier than on most channels. The hard part is keeping everything else steady: no extra promotions in one group, no different creative, no surprise press. Agree the length and what you’ll do with each outcome before you start.</p>
<p>Meta also offers its own lift studies. They’re useful, and worth running. They’re also run by the company selling the ads, so it helps to read them next to a test measured on your own numbers. Our guide to <a href="/library/incrementality-without-the-math">incrementality</a> walks through the steps.</p>
<p>Want to see how your Meta recap holds up first? Bring it to us as ${fr()}, free. We check it against your own numbers and walk you through it on a 30-minute call.</p>`,
    faq: [
      ['Should we stop counting view-throughs?', 'Not necessarily. Ask to see them separately, so you know how much of the result rests on views. Then decide with a test.'],
      ['Is a Meta lift study enough proof?', 'It’s good evidence. Reading it next to a holdout test measured on your own numbers makes it stronger.'],
      ['Our Meta agency also runs Instagram creator posts. Is that a problem?', 'Only if another agency claims the same posts. Ask both for the list of posts behind their results and compare.'],
    ],
  },
  {
    slug: 'check-your-tiktok-agency', topic: 'Agency reports', author: 'min-kwak', date: D,
    title: 'How to check your TikTok agency',
    dek: 'TikTok is where your audience first sees you, so it claims a lot. Here’s how to read a TikTok recap and see what held up.',
    short: 'Ask for TikTok’s results split into clicks and views, with the window behind each, and a list of any boosted creator posts. Add TikTok’s claims to every other agency’s and compare the total with your own numbers. To prove TikTok caused results, hold out some regions for a few weeks.',
    body: `
<h2 id="how-it-counts">How a TikTok recap counts results</h2>
<p>A TikTok recap shows the results TikTok credits to its own ads. Like every platform, TikTok uses its own ${g('attribution', 'attribution')} rule and only sees what its own tracking can see. It doesn’t know about your email, your Meta ads or the Reddit thread someone read the night before.</p>
<p>The numbers on top are usually views, watch time and engagement. Those tell you how the ads landed with the people who saw them. Results come lower down, often as one number that blends people who clicked with people who only watched. A ${g('view-through-conversion', 'view-through conversion')} counts a result for someone who saw the ad and never tapped. Check the window in the report: how many days after a view or click a result still counts.</p>
<p>TikTok recaps also love ${g('engagement-rate', 'engagement rate')}. It’s a useful number for creative, and it isn’t a result. Ask what the rate is divided by, because views, reach and followers give very different answers.</p>

<h2 id="double-counting">Where double counting comes from on TikTok</h2>
<ul>
<li><b>Boosted creator posts.</b> When an agency puts spend behind a creator’s video, the creator agency and the media agency can both claim its results. This is the most common overlap on TikTok.</li>
<li><b>Creator codes.</b> A ${g('creator-code', 'creator code')} from a TikTok video can spread to coupon sites, where people who were already buying find it.</li>
<li><b>First touch, last claim.</b> TikTok is often where someone first hears of you. They may buy a week later through search or email, and TikTok’s view rule can still claim the result.</li>
<li><b>Views at scale.</b> TikTok serves a lot of views. Even a small share of viewers who buy for other reasons adds up to a big view-through number.</li>
</ul>

<p>The fix starts with one list. Take your own numbers for the month, then mark each result with every agency that claimed it. Results with two or more names are the overlap. TikTok usually shares a lot of them with creators and Meta, because the same people see all three in the same week. Once you can see the overlap, the conversation with each agency gets shorter and friendlier.</p>

<h2 id="checklist">A checklist for your next TikTok recap</h2>
<table><thead><tr><th>Check</th><th>What to look for</th><th>Why it matters</th></tr></thead><tbody>
<tr><td>Window</td><td>Click and view windows behind each result</td><td>View rules reach far on a platform this big</td></tr>
<tr><td>Clicks vs. views</td><td>Results split by tap and by view</td><td>Shows how much rests on views alone</td></tr>
<tr><td>Boosted posts</td><td>Creator videos with paid spend</td><td>Two agencies may claim them</td></tr>
<tr><td>Codes</td><td>Code uses by source</td><td>Coupon sites inflate code results</td></tr>
<tr><td>Engagement rate</td><td>What it’s divided by</td><td>Views, reach and followers give different rates</td></tr>
<tr><td>Comments</td><td>What people said under the ads</td><td>Tells you how the audience took it</td></tr>
</tbody></table>

<h2 id="questions">Questions to ask your TikTok agency</h2>
<ol>
<li>Can we see results split by click and by view, with the window for each?</li>
<li>Which results came from boosted creator posts, and does the creator agency report them too?</li>
<li>How many code uses came from coupon sites?</li>
<li>Is engagement rate divided by views, reach or followers?</li>
<li>What did people say in the comments, and did it change the creative?</li>
</ol>
<p>The comments are worth reading on their own. TikTok audiences say what they think, and they say it fast. Our guide to <a href="/library/social-listening-that-counts">listening that counts</a> shows how to turn comments into numbers you can use.</p>

<h2 id="holdout">What a holdout test looks like on TikTok</h2>
<p>Matching removes double counting. It can’t tell you whether TikTok caused results. For that, run a ${g('holdout-test', 'holdout test')}: choose regions that look alike, run TikTok ads in some and not others for a few weeks, and compare results using your own numbers.</p>
<p>Paid ads can be held out by region. Organic creator posts are harder, because they travel wherever the algorithm sends them. If creators are a big part of your TikTok spend, test the paid boost on their posts by region, and judge the creators themselves on codes, links and timing against your own numbers.</p>
<p>Decide before you start what you’ll do with each outcome. A test that ends in “interesting” is a test nobody acts on.</p>
<p>If you want to see what your TikTok recap looks like checked against your own numbers, bring it to us as ${fr()}, free. Our list of <a href="/library/questions-before-you-renew">questions to ask before you renew</a> covers creators too.</p>`,
    faq: [
      ['Is TikTok engagement a good sign?', 'It’s a good sign the creative landed. It isn’t a result on its own. Line it up with sales, tickets, sign-ups or streams before you move budget.'],
      ['Who should get credit for a boosted creator post?', 'Count the result once, then decide how to split credit. A test is the clearest way to see which part did the work.'],
      ['Can TikTok results be checked if most of our sales happen in retail?', 'Yes, by region and week, using the retail data you have. Where it’s too thin to call, the report should say so.'],
    ],
  },
  {
    slug: 'check-your-google-search-agency', topic: 'Agency reports', author: 'nazeem-ahmed', date: D,
    title: 'How to check your Google Search agency',
    dek: 'Search sits right before the purchase, so it collects credit. Here’s how to see how much of it was already yours.',
    short: 'Ask your search agency to split results into searches for your brand’s name and everything else. Brand search mostly catches people already on their way to you. To find out what it adds, pause brand search in some regions for a few weeks and compare results with your own numbers.',
    body: `
<h2 id="how-it-counts">How a search recap counts results</h2>
<p>Your search agency reports from Google Ads. The results it shows are the ones Google credits to its ads, using whichever ${g('attribution', 'attribution')} model the account is set to. Search is the last step for a lot of buyers: they hear about you somewhere else, type your name, click the top result and buy. That puts search in a perfect spot to collect credit.</p>
<p>The most important split in any search report is brand versus non-brand. ${g('brand-search', 'Brand search')} means ads shown to people who typed your name. Non-brand means ads shown for things like “hard seltzer near me” or “new horror movies.” Brand searches tend to show excellent results. Most of those people were already looking for you.</p>
<p>Search accounts also have settings that change the count: the ${g('conversion-window', 'conversion window')}, the attribution model, and which actions count as a result. Some accounts import results from Google Analytics as well as tracking them directly. Check the window in the report, and ask where each result comes from.</p>

<h2 id="double-counting">Where double counting comes from on search</h2>
<ul>
<li><b>Brand search.</b> Someone saw a TikTok, a trailer or a billboard, then searched your name. Search claims the result. So does the channel that sent them.</li>
<li><b>Mixed campaign types.</b> Some Google campaign types run across search, YouTube, display and more at once. They can include searches for your name inside the mix. Ask for a split.</li>
<li><b>Two sources for one result.</b> If an account counts a result from its own tag and an imported one from Google Analytics, the same result can show up twice in one report.</li>
<li><b>Email and direct.</b> A buyer who clicks your email, leaves, then comes back through a search ad gets credited to search.</li>
</ul>
<p>${g('last-click', 'Last-click')} rules make all of this bigger, because they hand everything to the final step. Even accounts that use other models tend to reward search well.</p>

<p>A quick way to see the size of it: ask for one month of results split by brand and non-brand, then set the brand number next to what your other agencies claimed that month. If social, creators and search all claim a big share, and the total runs past your own numbers, brand search is likely where much of the overlap sits.</p>

<h2 id="checklist">A checklist for your next search recap</h2>
<table><thead><tr><th>Check</th><th>What to look for</th><th>Why it matters</th></tr></thead><tbody>
<tr><td>Brand vs. non-brand</td><td>Results split by searches for your name</td><td>Brand search catches people already on their way</td></tr>
<tr><td>Mixed campaigns</td><td>Whether brand searches sit inside broad campaign types</td><td>Brand credit can hide in the mix</td></tr>
<tr><td>Result sources</td><td>Which actions count, and where they’re tracked</td><td>Two sources can count one result twice</td></tr>
<tr><td>Model and window</td><td>Attribution model and conversion window</td><td>Both change how much credit search gets</td></tr>
<tr><td>Total vs. your numbers</td><td>Search claims plus everyone else’s, against your total</td><td>Overlap shows up in the sum</td></tr>
</tbody></table>

<h2 id="questions">Questions to ask your search agency</h2>
<ol>
<li>How much of what you claimed came from people searching our name?</li>
<li>Do any campaigns include brand searches without labeling them?</li>
<li>Which attribution model and window does the account use?</li>
<li>Is any result counted from both the Google Ads tag and Google Analytics?</li>
<li>What do you think would happen if we paused brand search in one region?</li>
</ol>
<p>That last question is a good one to ask out loud. An agency that welcomes a test is usually confident in the work.</p>

<h2 id="holdout">What a holdout test looks like on search</h2>
<p>Brand search is the cleanest place to start testing, because the question is simple: if we stopped paying for clicks on our own name, would those people still find us? Run a ${g('holdout-test', 'holdout test')}. Pause brand search in some regions, keep it on in matched regions, wait a few weeks, and compare results using your own numbers.</p>
<p>Two things to watch. Competitors may bid on your name while you’re paused, so note whether that happens. And keep everything else steady: no new promotions in one group only.</p>
<p>If results barely move in the paused regions, brand search was mostly collecting credit. If they drop, it was doing real work, and you have proof. Either way you’ve learned something worth more than the clicks. Our guide to <a href="/library/incrementality-without-the-math">incrementality without the math</a> has a worked example.</p>
<p>Want to see how much of your search agency’s credit is brand search? Bring the recap to us as ${fr()}, free.</p>`,
    faq: [
      ['Should we stop buying brand search?', 'Not before a test. In some cases it protects your name from competitors. A regions-on, regions-off test tells you what it adds.'],
      ['Is non-brand search safer to trust?', 'It’s more likely to reach new people. It still needs matching against your own numbers and other agencies’ claims.'],
      ['Our search agency also runs YouTube. Should that be checked separately?', 'Yes. Video and search get credit in different ways. See our guide to checking a YouTube agency.'],
    ],
  },
  {
    slug: 'check-your-youtube-agency', topic: 'Agency reports', author: 'devin-min', date: D,
    title: 'How to check your YouTube agency',
    dek: 'YouTube recaps lead with views. Here’s how to find the results underneath, and which ones hold up.',
    short: 'Ask your YouTube agency which results came from people who clicked and which from people who only watched, and over what window. Ask whether the view counts include paid views. Then add YouTube’s claims to every other agency’s and compare with your own numbers.',
    body: `
<h2 id="how-it-counts">How a YouTube recap counts results</h2>
<p>YouTube ads are bought through Google Ads, so a YouTube recap uses Google’s ${g('attribution', 'attribution')} rules. The top of the report is usually views, view rate and watch time. Those tell you how the ad played. The results come further down, and they can include people who watched part of an ad without clicking. Google calls some of these engaged-view conversions. They work like a ${g('view-through-conversion', 'view-through conversion')}: credit for watching, with no click.</p>
<p>The other thing to know is that a view on YouTube can mean different things. A paid view, a view on your channel and a view on a creator’s channel aren’t the same. Ask whether the view count on a video includes paid views before you compare it with your organic posts.</p>
<p>Check the window in the report. Video is often seen days before someone acts, so the window decides how much later activity YouTube can claim.</p>

<h2 id="double-counting">Where double counting comes from on YouTube</h2>
<ul>
<li><b>Watching, then searching.</b> Someone watches a trailer on YouTube, then searches your title and clicks a search ad. YouTube and search can both claim the result, sometimes inside the same Google account.</li>
<li><b>Creator videos.</b> A creator agency claims the integration in a creator’s video. If the media agency also ran ads on that video or that channel, both may claim it.</li>
<li><b>Long windows on big reach.</b> Video reaches many people, and a long window lets YouTube claim anyone who later acts for any reason.</li>
<li><b>Mixed campaign types.</b> Some Google campaign types spread across YouTube, search and more. Ask for YouTube on its own.</li>
</ul>

<p>A simple first step: ask for one month of YouTube results split into clicks and watches, then line them up against your own numbers by day. If results rise on the days a trailer or ad drops, that’s a good sign. If the claimed number stays high on quiet days, the window is probably doing a lot of the work.</p>

<h2 id="checklist">A checklist for your next YouTube recap</h2>
<table><thead><tr><th>Check</th><th>What to look for</th><th>Why it matters</th></tr></thead><tbody>
<tr><td>Clicks vs. watches</td><td>Results split by click and by watched-without-click</td><td>Watch-based credit is easy to overcount</td></tr>
<tr><td>Window</td><td>How many days after a view a result still counts</td><td>Video is often seen long before action</td></tr>
<tr><td>Paid vs. organic views</td><td>Whether view counts include paid views</td><td>Paid views can make organic posts look stronger</td></tr>
<tr><td>Watch time</td><td>How long people kept watching</td><td>Tells you whether the ad held attention</td></tr>
<tr><td>Overlap with search</td><td>Results claimed by both YouTube and search</td><td>Same account, two claims</td></tr>
<tr><td>Comments</td><td>What viewers said under the video</td><td>The fastest read on how it landed</td></tr>
</tbody></table>

<p>Bring these questions to the next review rather than over email. Answers in the room tend to be clearer, and you’ll hear which ones the agency can answer straight away.</p>

<h2 id="questions">Questions to ask your YouTube agency</h2>
<ol>
<li>How many of these results came from people who clicked, and how many from people who only watched?</li>
<li>What window are you using, and can we see a shorter one?</li>
<li>Does the view count on our trailer include paid views?</li>
<li>Are any of these results also claimed by our search campaigns?</li>
<li>Which videos kept people watching longest, and did those drive more results?</li>
</ol>
<p>Comments are worth a look too. In a real Arcus audience report for a streaming service, fans talked about the shows and almost never about the service itself. Our guide on <a href="/library/watched-vs-shared-share-rate">watched vs. shared</a> explains why views alone can mislead.</p>

<h2 id="holdout">What a holdout test looks like on YouTube</h2>
<p>YouTube ads can be targeted by location, so a ${g('holdout-test', 'holdout test')} works the same way as on other channels. Pick regions that look alike, run YouTube in some and not others for a few weeks, and compare your own numbers: tickets, sign-ups, streams or sales.</p>
<p>Keep search steady during the test, since the two interact. If you pause YouTube and search results fall in the same regions, that tells you something useful about how they work together.</p>
<p>Google also offers lift studies for YouTube, including surveys that measure recall. A ${g('brand-lift-study', 'brand lift study')} is good evidence for brand work. It measures what people say in a survey, so it’s strongest when it lines up with your own numbers later.</p>
<p>If you’d like a second look at a YouTube recap, bring it to us as ${fr()}, free. We check it against your own numbers and walk you through it.</p>`,
    faq: [
      ['Are YouTube views a good measure for a trailer?', 'They tell you reach. Watch time and shares tell you more about whether it landed. Results tell you whether it moved people.'],
      ['Should engaged-view results count?', 'Ask to see them separately. They’re credit for watching without a click, so they need a test before you lean on them.'],
      ['Can you check creator videos on YouTube too?', 'Yes, with codes, links and timing against your own numbers. See our guide to checking a creator agency.'],
    ],
  },
  {
    slug: 'check-your-snapchat-agency', topic: 'Agency reports', author: 'min-kwak', date: D,
    title: 'How to check your Snapchat agency',
    dek: 'Snapchat reaches young audiences, often the same ones TikTok and Instagram reach. Here’s how to check what it can claim.',
    short: 'Ask your agency for Snapchat’s results split into swipes or clicks and views, with the window behind each. Snapchat often reaches the same people as TikTok and Instagram, so add every platform’s claims together and compare the total with your own numbers. Hold out some regions to prove cause.',
    body: `
<h2 id="how-it-counts">How a Snapchat recap counts results</h2>
<p>A Snapchat recap shows what Snapchat credits to its own ads, using its own ${g('attribution', 'attribution')} rule. Results can be credited to people who swiped or tapped on an ad, and to people who only saw it. A ${g('view-through-conversion', 'view-through conversion')} is the second kind. The recap often blends them, so ask for a split.</p>
<p>Snapchat reports also lean on reach, impressions and swipe rate. Those tell you how many people saw the ad and how many acted on it right away. They aren’t results. Before you compare them with other channels, check ${g('reach-vs-impressions', 'reach vs. impressions')}: impressions count repeats, reach counts people.</p>
<p>And check the window in the report. It decides how many days after a view or swipe a result still counts.</p>

<h2 id="double-counting">Where double counting comes from on Snapchat</h2>
<ul>
<li><b>The same young audience everywhere.</b> Snapchat, TikTok and Instagram often reach the same people in the same week. Each platform can claim the same buyer.</li>
<li><b>Views on fast content.</b> Snaps are quick and seen often. A view rule can credit Snapchat with results that happened for other reasons.</li>
<li><b>Codes and links.</b> If a creator promotes you on Snapchat with a code, and the code spreads, the creator agency and the media agency may both claim the use.</li>
<li><b>Lenses and filters.</b> Branded lenses get lots of plays. Plays are a reach number. Ask how any results tied to them were counted.</li>
</ul>

<p>The way to see it is to stop reading each platform’s report on its own. Put Snapchat’s claims, TikTok’s claims and Meta’s claims for the same month side by side, add them up and compare the total with your own numbers. If the three together claim more than you had, the overlap is real. Then the question becomes which platform reached people the others missed, and that’s a question a test can answer.</p>

<p>It also helps to look at timing. If Snapchat’s claimed results rise and fall with your TikTok flights, the two are probably reaching the same people.</p>

<h2 id="checklist">A checklist for your next Snapchat recap</h2>
<table><thead><tr><th>Check</th><th>What to look for</th><th>Why it matters</th></tr></thead><tbody>
<tr><td>Swipes vs. views</td><td>Results split by swipe and by view</td><td>Shows how much rests on views</td></tr>
<tr><td>Window</td><td>Days after a view or swipe a result counts</td><td>Longer windows reach further back</td></tr>
<tr><td>Reach</td><td>Different people reached</td><td>Impressions count repeats</td></tr>
<tr><td>Overlap</td><td>Snapchat’s claims plus TikTok and Meta claims</td><td>Same audience, several claims</td></tr>
<tr><td>Lenses</td><td>How results from lenses were counted</td><td>Plays aren’t results</td></tr>
</tbody></table>

<p>None of these questions is a trap. They’re the same ones you’d ask any platform, and an agency that knows its account can answer them in a day. If an answer takes weeks, or never comes, that tells you something about how closely the account is being read.</p>

<h2 id="questions">Questions to ask your Snapchat agency</h2>
<ol>
<li>How many results came from swipes, and how many from views alone?</li>
<li>What window does this report use?</li>
<li>How many different people did the campaign reach, and how often did each see it?</li>
<li>Were any of these results also claimed in our TikTok or Meta reports?</li>
<li>How were results from lenses or filters counted, if at all?</li>
</ol>
<p>If Snapchat is a smaller line in your budget, these questions still matter. A small budget can claim a large share of results, and that’s exactly when a check helps.</p>

<p>Keep the agency in the loop on all of this. Most media buyers want to know which platforms are earning their place, and a shared count gives them a better brief.</p>

<h2 id="holdout">What a holdout test looks like on Snapchat</h2>
<p>Snapchat ads can be targeted by location, so the ${g('holdout-test', 'holdout test')} is the same idea as anywhere else. Pick regions that look alike. Run Snapchat in some and not others for a few weeks. Compare results using your own numbers.</p>
<p>Because Snapchat overlaps so much with TikTok and Instagram, keep those steady in both groups during the test. If they shift at the same time, you won’t know which one moved results.</p>
<p>If the regions without Snapchat look the same as the ones with it, Snapchat was mostly reaching people other channels already had. If they fall behind, you’ve found what Snapchat adds. Our guide to <a href="/library/incrementality-without-the-math">incrementality</a> walks through how to set it up.</p>
<p>Not sure where to start? Bring your most recent recap to us as ${fr()}, free. We check it against your own numbers and show you what held up.</p>`,
    faq: [
      ['Do lens plays count as results?', 'No. They’re a reach number. Results are sales, tickets, sign-ups or streams.'],
      ['Is Snapchat worth testing if spend is small?', 'Yes, if its claims are big compared with its spend. That gap is the reason to check.'],
      ['How do we know if Snapchat reaches people other channels miss?', 'A holdout test is the clearest answer. Matching reach across platforms gives a hint, but each platform only sees its own users.'],
    ],
  },
  {
    slug: 'check-your-reddit-agency', topic: 'Agency reports', author: 'devin-min', date: D,
    title: 'How to check your Reddit agency',
    dek: 'Reddit ads come with comments, and the comments matter. Here’s how to check the results and read the room.',
    short: 'Check a Reddit recap in two parts. First, match Reddit’s claimed results against your own numbers and every other agency’s claims, with clicks and views split. Second, read the comments on your promoted posts and the threads around them. Reddit users talk back, and that tells you how the ads landed.',
    body: `
<h2 id="how-it-counts">How a Reddit recap counts results</h2>
<p>A Reddit recap shows the results Reddit credits to its own ads, using its own ${g('attribution', 'attribution')} rule and tracking. Like other platforms, it can credit results to people who clicked and to people who only saw a post. Ask for the split, and check the window in the report.</p>
<p>Reddit recaps also show which communities and interests each campaign targeted, plus upvotes and comments on promoted posts. Upvotes are a reaction. Comments are where the information is. On Reddit, people say what they think of an ad right under it, and other people vote on whether they agree.</p>
<p>Reddit is different from most channels in one useful way: a lot of the conversation about your brand already happens there, unpaid. That gives you something to compare the ads against.</p>

<h2 id="double-counting">Where double counting comes from on Reddit</h2>
<ul>
<li><b>Research, then purchase.</b> People often read Reddit threads before buying, then buy through search or your site. Reddit’s view rule and search’s click rule can both claim that buyer.</li>
<li><b>Organic threads.</b> A popular thread about your brand can drive results with no ad involved. If an ad ran the same week, Reddit may claim them.</li>
<li><b>Views without clicks.</b> Reddit users scroll a lot. A ${g('view-through-conversion', 'view-through')} rule can credit Reddit with results from people who barely noticed the ad.</li>
<li><b>Other agencies’ reports.</b> As with any channel, Reddit’s claims belong in the same count as everyone else’s. See ${g('double-counting', 'double counting')}.</li>
</ul>

<p>Reddit claims are often small next to Meta or search, which makes them easy to skip. Don’t. A small channel that claims a lot of results for little spend is worth a look, and a small channel that reaches people nobody else does is worth protecting. The only way to tell the two apart is to count each result once across every agency and see what’s left for Reddit.</p>

<h2 id="checklist">A checklist for your next Reddit recap</h2>
<table><thead><tr><th>Check</th><th>What to look for</th><th>Why it matters</th></tr></thead><tbody>
<tr><td>Clicks vs. views</td><td>Results split by each</td><td>Shows how much rests on scrolling past</td></tr>
<tr><td>Window</td><td>Days after a view or click a result counts</td><td>Research-heavy buyers act later</td></tr>
<tr><td>Communities</td><td>Where the ads ran</td><td>Compare with where your audience talks unpaid</td></tr>
<tr><td>Comments</td><td>What people said under promoted posts</td><td>The clearest read on how the ad landed</td></tr>
<tr><td>Organic threads</td><td>Popular threads about you in the same weeks</td><td>They can drive results an ad gets credit for</td></tr>
</tbody></table>

<p>Ask for the comments as a file, with the post each one sits under. Reading them in one place, instead of scrolling post by post, makes the patterns easier to see, and it gives you something to count.</p>

<h2 id="questions">Questions to ask your Reddit agency</h2>
<ol>
<li>How many of these results came from clicks, and how many from views?</li>
<li>Which communities did the best, and why did you pick them?</li>
<li>What did people say in the comments, and did you change anything because of it?</li>
<li>Were there big organic threads about us during the campaign?</li>
<li>Would you expect your claims plus every other agency’s to fit inside our own numbers?</li>
</ol>
<p>Then read the room. Reddit is one of the best places to hear how your audience talks when you’re not in the room. ${g('social-listening', 'Social listening')} on Reddit means reading the threads where people discuss your category and counting what comes up: the complaints, the comparisons, the words they use. Those counts tell you whether your ads sound like the people you want to reach. Our guide to <a href="/library/social-listening-that-counts">listening that counts</a> explains how.</p>

<p>Listening also gives your agency better material. If the threads keep coming back to one flavor, one character or one complaint, that’s a brief for the next promoted post.</p>

<h2 id="holdout">What a holdout test looks like on Reddit</h2>
<p>Reddit ads can be targeted by location, so you can run a ${g('holdout-test', 'holdout test')}: run ads in some regions, leave matched regions alone for a few weeks, and compare your own numbers. Keep your other channels steady while it runs.</p>
<p>Reddit budgets are often smaller, so the test needs regions big enough for results to move. If the difference is too small to read, that’s a finding too: it means Reddit isn’t adding much you can measure yet.</p>
<p>Want the check and the listening in one answer? Bring us ${fr('one free question')}, or see what we listen to on the <a href="/listening">listening</a> page.</p>`,
    faq: [
      ['Do upvotes matter?', 'They show agreement. Comments tell you why. Neither is a result on its own.'],
      ['Can you read Reddit without running ads?', 'Yes. Listening covers public conversation whether or not you advertise there.'],
      ['Is Reddit a good fit for entertainment brands?', 'Often. Fans discuss titles, games and launches there in detail. A listening report shows whether your audience is one of them.'],
    ],
  },
  {
    slug: 'check-your-pinterest-agency', topic: 'Agency reports', author: 'nazeem-ahmed', date: D,
    title: 'How to check your Pinterest agency',
    dek: 'People plan on Pinterest and buy later. Here’s how that changes what your agency can claim, and how to check it.',
    short: 'Pinterest is a planning platform, so results often come days or weeks after someone saves a Pin. That makes the window behind each result the first thing to check. Then split clicks from views, add Pinterest’s claims to every other agency’s, and compare the total with your own numbers.',
    body: `
<h2 id="how-it-counts">How a Pinterest recap counts results</h2>
<p>A Pinterest recap shows the results Pinterest credits to its ads, using its own ${g('attribution', 'attribution')} rule. People use Pinterest to plan: a party, a wardrobe, a skincare routine, a cocktail menu. They save Pins and come back later. That makes the ${g('conversion-window', 'conversion window')} unusually important, because it decides how long after a save or click Pinterest can still claim a result. Check the window in the report before anything else.</p>
<p>Pinterest recaps lead with impressions, saves and clicks. Saves are a real sign of interest. They aren’t results. The question is whether saves turn into sales, tickets or sign-ups, and that only shows up in your own numbers.</p>
<p>As with other platforms, results can be credited to views as well as clicks. A ${g('view-through-conversion', 'view-through conversion')} on a planning platform can reach far back. Ask for the split.</p>

<h2 id="double-counting">Where double counting comes from on Pinterest</h2>
<ul>
<li><b>Long gaps.</b> The longer the time between a Pin and a result, the more chances another channel had to reach the same person and claim them too.</li>
<li><b>Search at the end.</b> Someone saves your Pin, then searches your name weeks later. Pinterest and search can both claim it.</li>
<li><b>Your own Pins.</b> Organic Pins and paid Pins look alike. Results driven by your own Pins can land in the paid report.</li>
<li><b>Email and retargeting.</b> A planner who signed up for your emails may buy after an email. A long Pinterest window can still claim it.</li>
</ul>

<p>Put it on one table. List your own results for the month, then mark which ones Pinterest claimed and which ones other agencies claimed. On a planning platform, you’ll often find Pinterest’s results sit late in the window, long after the save, and that other channels touched the same people in between. That doesn’t mean Pinterest did nothing. It started the plan, and starting matters. It means the credit needs sharing, and a test is how you find out how much Pinterest earned.</p>

<h2 id="checklist">A checklist for your next Pinterest recap</h2>
<table><thead><tr><th>Check</th><th>What to look for</th><th>Why it matters</th></tr></thead><tbody>
<tr><td>Window</td><td>Days after a save, click or view a result counts</td><td>Planning means long gaps, and long gaps invite overlap</td></tr>
<tr><td>Clicks vs. views</td><td>Results split by each</td><td>View credit reaches far on a slow platform</td></tr>
<tr><td>Saves to results</td><td>Whether saved Pins lead to results</td><td>Saves show interest, and only results show sales</td></tr>
<tr><td>Paid vs. organic</td><td>Which Pins were paid</td><td>Organic results can land in paid reports</td></tr>
<tr><td>Total vs. your numbers</td><td>Pinterest claims plus everyone else’s</td><td>Overlap shows up in the sum</td></tr>
</tbody></table>

<p>If the agency can show results at a shorter window, compare the two numbers. The gap between them is the share of credit that rests on a long wait, and it’s the share most worth testing before you move budget.</p>

<h2 id="questions">Questions to ask your Pinterest agency</h2>
<ol>
<li>What window does this report use for clicks, saves and views?</li>
<li>Can we see results at a shorter window?</li>
<li>How many results came from views without a click?</li>
<li>Do saved Pins lead to more results than Pins people only clicked?</li>
<li>Are any results from our own organic Pins included?</li>
</ol>
<p>These are good questions for any platform with a slow path to purchase. The guide to <a href="/library/read-an-agency-report">reading an agency report in 10 minutes</a> covers the general version.</p>

<p>While the test runs, keep an eye on saves in both groups. If saves rise where Pinterest runs and results follow later, you’re seeing the slow path to purchase in action.</p>

<h2 id="holdout">What a holdout test looks like on Pinterest</h2>
<p>Pinterest ads can be targeted by location, so a ${g('holdout-test', 'holdout test')} works here too. Pick matched regions. Run Pinterest in some and not others. Compare results using your own numbers.</p>
<p>The difference on Pinterest is time. Because people plan before they buy, the test needs to run longer than it would on a fast channel, and you should keep measuring for a while after it ends. Agree the length before you start, and write down what you’ll do with each outcome.</p>
<p>Seasonal brands should time tests with care. A holiday or a summer push changes everything at once, so test in a steadier stretch if you can, and keep other channels the same in both groups.</p>
<p>Want to know how your Pinterest claims fit with the rest? Bring a recap to us as ${fr()}, free, and we’ll check it against your own numbers.</p>`,
    faq: [
      ['Are saves a good sign?', 'Yes, as interest. Line them up with your own numbers to see whether they lead to results.'],
      ['Why does the window matter more on Pinterest?', 'Because people plan before they buy. A long window lets Pinterest claim results that other channels also touched.'],
      ['How long should a Pinterest test run?', 'Longer than on faster channels, and with measurement after it ends. Agree the length up front.'],
    ],
  },
  {
    slug: 'check-your-linkedin-agency', topic: 'Agency reports', author: 'brendon-ghaderi', date: D,
    title: 'How to check your LinkedIn agency',
    dek: 'Brand teams use LinkedIn for trade audiences, events and partnerships. Here’s how to check the sign-ups and leads it claims.',
    short: 'Match every lead, registration or sign-up LinkedIn claims against your own records, so each person is counted once. Split results from clicks and from views, and check the window. Then follow the leads forward: what matters is how many became something, which your CRM can show.',
    body: `
<h2 id="how-it-counts">How a LinkedIn recap counts results</h2>
<p>Entertainment and lifestyle brands don’t usually sell to consumers on LinkedIn. They use it to reach the trade: buyers, distributors, exhibitors, partners, press and future hires. The results are sign-ups, event registrations and leads, often through LinkedIn’s own lead forms.</p>
<p>A LinkedIn recap shows the results LinkedIn credits to its ads, using its own ${g('attribution', 'attribution')} rule. Lead forms are filled out inside LinkedIn, so they’re easy for LinkedIn to count. Results on your own site rely on tracking, and can be credited to people who clicked or only saw the ad. Check the window in the report, and ask for clicks and views split.</p>
<p>LinkedIn audiences are often small and specific. That’s good for targeting. It also means a handful of results can swing the numbers, so look at counts as well as rates.</p>

<h2 id="double-counting">Where double counting comes from on LinkedIn</h2>
<ul>
<li><b>Lead forms and your CRM.</b> A lead form fill shows up in LinkedIn’s report and, once synced, in your CRM with a source. If someone also registered through your site, they may appear twice.</li>
<li><b>Views at work.</b> Busy people scroll LinkedIn without clicking. A ${g('view-through-conversion', 'view-through')} rule can claim them when they register later through an email invite.</li>
<li><b>Email invites.</b> Most event registrations come after an invite. If a LinkedIn ad ran the same week, both can claim the registration.</li>
<li><b>Sales and partnerships teams.</b> Your own team’s outreach brings in leads too. Make sure LinkedIn isn’t claiming those.</li>
</ul>

<p>The fix is a single list of people. Pull LinkedIn’s leads, your site registrations and your CRM records for the same campaign, then match them by person. Anyone who appears in two places is counted once. What’s left is a clean count of who LinkedIn brought in, and a clean starting point for asking what those people did next. Our guide to ${g('double-counting', 'double counting')} explains why this matters on every channel.</p>

<h2 id="checklist">A checklist for your next LinkedIn recap</h2>
<table><thead><tr><th>Check</th><th>What to look for</th><th>Why it matters</th></tr></thead><tbody>
<tr><td>Leads vs. CRM</td><td>Lead form fills matched to CRM records</td><td>Counts each person once</td></tr>
<tr><td>Clicks vs. views</td><td>Results split by each</td><td>View credit is common on a scroll-heavy feed</td></tr>
<tr><td>Window</td><td>Days after a view or click a result counts</td><td>Trade decisions take time</td></tr>
<tr><td>Email overlap</td><td>Registrations that came after an invite</td><td>Two channels, one person</td></tr>
<tr><td>What happened next</td><td>Leads that became meetings, deals or attendees</td><td>A lead is only the first step</td></tr>
</tbody></table>

<p>Ask for the lead list in a file you can match yourself. A good agency will send it without fuss. Then ask your own team, the people who follow up on leads, which ones turned into real conversations. Their answer is often the most honest number in the whole review.</p>

<h2 id="questions">Questions to ask your LinkedIn agency</h2>
<ol>
<li>How many results were lead forms, and how many were tracked on our site?</li>
<li>How many came from views without a click?</li>
<li>Can you give us the list of leads so we can match them to our CRM?</li>
<li>How many registrants also got an email invite from us?</li>
<li>Which of these leads went on to become something?</li>
</ol>
<p>The last question is the one that matters most. Our guide to <a href="/library/first-party-data-for-brand-marketers">first-party data</a> explains why your own records are the best place to answer it.</p>

<p>Share what you find with the agency. Most LinkedIn buyers would rather optimize for leads that turn into something, and a clean list helps them do it.</p>

<h2 id="holdout">What a holdout test looks like on LinkedIn</h2>
<p>LinkedIn ads can be targeted by location and by audience, so a ${g('holdout-test', 'holdout test')} can split either. For an event, hold out some cities. For a trade campaign, hold out a matched group of companies or job roles and compare sign-ups with your own records.</p>
<p>Small audiences make tests harder to read, so pick a question where the result would change a decision: whether to keep a LinkedIn line in next year’s event budget, for example. Run it for a few weeks and keep email invites the same in both groups.</p>
<p>If the held-out group registers at the same rate, your invites and your team were doing the work. If it falls behind, LinkedIn earned its place.</p>
<p>Want a second look at what LinkedIn claims? Bring the recap to us as ${fr()}, free.</p>`,
    faq: [
      ['Is LinkedIn worth checking for a consumer brand?', 'If you spend on it for trade, events or partnerships, yes. Those results feed real decisions.'],
      ['What’s the best result to judge LinkedIn on?', 'What leads became: attendees, meetings, deals or partners. Lead counts alone can flatter.'],
      ['Can you match LinkedIn leads to our CRM?', 'Yes, where you share both. Each person is counted once.'],
    ],
  },
  {
    slug: 'check-your-creator-agency', topic: 'Agency reports', author: 'devin-min', date: D,
    title: 'How to check your creator and influencer agency',
    dek: 'Creator recaps lead with reach and estimated value. Here’s how to find out which creators moved results.',
    short: 'Judge creators on results in your own numbers. Reach and estimated media value come second. Check every code and link for coupon-site leaks, match creator claims against your media agency’s claims for boosted posts, and line up post dates with results. Hold out regions on paid boosts to prove cause.',
    body: `
<h2 id="how-it-counts">How a creator recap counts results</h2>
<p>Creator recaps usually lead with reach, views, engagement and an estimated value: what the same attention would have cost as paid media. That estimate is often called earned media value. It’s a way to describe reach in dollars. It isn’t a result, and it rises with views whether or not anyone bought anything.</p>
<p>Results come from three places. ${g('creator-code', 'Creator codes')} and links trace some buyers to a creator. Paid boosts of creator posts, sometimes called ${g('creator-whitelisting', 'whitelisting')} or partnership ads, get results from the ad platform’s own ${g('attribution', 'attribution')}. And timing: sales, tickets or sign-ups that rose when a creator posted.</p>
<p>Each of those can be useful. Each can also be stretched. Check how every number in the recap was counted before you compare creators.</p>

<h2 id="double-counting">Where double counting comes from with creators</h2>
<ul>
<li><b>Codes that leak.</b> Creator codes end up on coupon sites. People who were already buying find them at checkout, and the creator gets credit.</li>
<li><b>Boosted posts.</b> When a media agency puts spend behind a creator’s post, both agencies can claim the results.</li>
<li><b>Timing on a busy week.</b> Launch weeks stack creators, ads, press and email. Every one of them will point to the same spike.</li>
<li><b>Fans who were coming anyway.</b> A creator who already loves your brand often reaches people who already love it too. Their code gets used by regulars.</li>
</ul>

<p>The way through is one list. Start from your own numbers for the campaign weeks. Mark which results used a creator code, which came through a boosted post, and which arrived on days a creator posted. Then mark every agency that claimed each one. Results with two names are the overlap. Results with a code from a coupon site go in their own pile. What’s left is what your creators can fairly claim, and it’s usually a better basis for renewals than reach.</p>

<p>Do this creator by creator. Some will look much better than their reach suggested, and some much worse.</p>

<h2 id="checklist">A checklist for your next creator recap</h2>
<table><thead><tr><th>Check</th><th>What to look for</th><th>Why it matters</th></tr></thead><tbody>
<tr><td>Code sources</td><td>Where code uses came from</td><td>Coupon sites inflate creator results</td></tr>
<tr><td>New vs. existing buyers</td><td>Code users who were already customers</td><td>Regulars would have bought anyway</td></tr>
<tr><td>Boosted posts</td><td>Posts with paid spend, and which agency claims them</td><td>Two agencies, one result</td></tr>
<tr><td>Estimated value</td><td>How it was calculated</td><td>It measures reach in dollars</td></tr>
<tr><td>Shares</td><td>Shares compared with views</td><td>See ${g('share-rate', 'share rate')}</td></tr>
<tr><td>Comments</td><td>What the creator’s audience said</td><td>Shows whether the fit was right</td></tr>
</tbody></table>

<p>Ask for answers in writing, creator by creator. A table with each creator’s posts, codes, code sources, paid spend and claimed results makes the comparison fair. It also shows which creators the agency knows well and which ones it only booked. If the agency can’t split results that way, that’s worth knowing before the next round of bookings.</p>

<h2 id="questions">Questions to ask your creator agency</h2>
<ol>
<li>How many code uses came from coupon sites?</li>
<li>How many code users were already our customers?</li>
<li>Which posts had paid spend behind them, and does our media agency claim those results too?</li>
<li>How is estimated media value calculated, and what would you judge creators on without it?</li>
<li>Which creators’ audiences shared and commented the most?</li>
</ol>
<p>For renewals, our list of <a href="/library/questions-before-you-renew">questions to ask before you renew</a> includes what a good answer sounds like. Our guide to <a href="/library/which-posts-actually-work">which posts work</a> shows how to compare posts fairly.</p>

<h2 id="holdout">What a holdout test looks like with creators</h2>
<p>Creators are the hardest channel to test, because organic posts go wherever the algorithm sends them. You can’t switch a creator off in one region. Two approaches work.</p>
<p>First, test the paid part. If you boost creator posts, run a ${g('holdout-test', 'holdout test')} on the boost: on in some regions, off in matched ones, for a few weeks. That tells you what the spend adds.</p>
<p>Second, stagger the creators. Space posts out instead of stacking them in one launch week, and line each one up with your own numbers by day. It isn’t proof the way a regional test is, but it separates creators who move results from creators who post on a busy week.</p>
<p>Want to see which creators held up? Bring your creator recap to us as ${fr()}, free. We check every code and claim against your own numbers.</p>`,
    faq: [
      ['Is earned media value a useful number?', 'It describes reach in dollars. It doesn’t tell you whether anyone bought, so judge creators on results in your own numbers.'],
      ['How do we stop codes leaking to coupon sites?', 'You can’t fully. Unique codes per creator and per campaign help, and checking code sources each month shows how big the leak is.'],
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
    lead: 'IRIS is a marketing measurement tool built for ecommerce and performance teams [Check on their site]. Arcus sits in a different place: it connects every piece of an entertainment or lifestyle brand’s data, from sales and CRM to ad accounts, agency reports and what people say, into one layer the brand owns, and answers questions with the whole picture.',
    rows: [
      ['Built for', 'Ecommerce and performance teams [Check on their site]', 'Brand teams at entertainment and lifestyle companies'],
      ['Main job', 'Marketing measurement [Check on their site for specifics]', 'Connecting every piece of your data, checking every claim, and answering any question'],
      ['Who does the work', '[Check on their site]', 'We do, and send you the answers'],
      ['Results it starts from', '[Check on their site]', 'Your own sales, tickets, sign-ups, streams or viewing'],
      ['Conversation online', '[Check on their site]', 'Read and counted'],
    ],
    better: 'If you run a performance team that wants a measurement tool of its own, IRIS may be built for you [Check on their site].',
    summary: 'IRIS is a marketing measurement tool built for ecommerce and performance teams [Check on their site]. Arcus connects the pieces in-house brand teams at entertainment and lifestyle companies already have, from sales and CRM to ad accounts, agency reports and what people say, into one layer they own, then answers their questions with the whole picture: a few slides with the answer on top. Checking agency claims is usually the first question. If you have a performance team that wants a tool, look at IRIS. If you want the answer without running a tool yourself, look at Arcus.',
    sections: [
      ['What IRIS is built for', 'From how it presents itself, IRIS is a marketing measurement tool for ecommerce and performance teams [Check on their site for current features, channels covered and pricing]. Tools like this tend to suit teams that run paid media closely and want numbers they can work with every day.\n\nWe haven’t used IRIS ourselves, so we won’t describe how it works. Ask them directly about setup, who does the analysis, and what results it can measure.'],
      ['What Arcus is built for', 'Arcus is for brand teams at studios, streamers, drinks, games, music, fashion and beauty brands, often without a data department. Their data sits in pieces: sales in one system, customers in another, agencies and listening tools reporting on top. The Arcus team connects those pieces into one layer you own, inside your own setup, over about three months. Then any leader can ask a question and get an answer that sees the whole picture: the answer on top, the evidence, then what to keep, test and stop.\n\nThe first question is usually an agency check: matching what agencies claim against your own numbers and counting each result once. Listening runs alongside it: reading and counting what your audience says on Reddit, TikTok, YouTube, Discord, reviews and more, connected to your numbers.'],
      ['Results beyond online sales', 'Many entertainment and lifestyle brands measure success in tickets, streams, viewing, sign-ups or retail sales. Arcus works from whatever your own numbers are and says where they’re too thin to call.\n\nIf your results come through theaters, streaming platforms, distributors or retailers, ask any measurement vendor how they handle that data. For IRIS: [Check on their site].'],
      ['Who does the work', 'With a measurement tool, someone on your team usually connects the data, reads the output and turns it into a decision [Check on their site for IRIS’s setup and support model]. With Arcus, our team does that, and a person reads every report before you do.\n\nThe right choice depends on whether someone on your team wants measurement to be part of their job.'],
    ],
    decide: [
      'Look at IRIS if you have a performance team that wants a measurement tool to use directly [Check on their site].',
      'Look at IRIS if most of your results are online sales and your team is comfortable with ecommerce measurement.',
      'Pick Arcus if your team is brand-side and nobody has time to set up and read a measurement tool.',
      'Pick Arcus if your results are tickets, streams, sign-ups, viewing or retail sales.',
      'Pick Arcus if what your audience says online matters as much as what your spend returns.',
      'Talk to both if you want a performance tool and an outside check on agencies and audience.',
    ],
    both: 'A company with a performance team might use a measurement tool for day-to-day paid media and Arcus for independent agency checks, listening and the brand-side questions. Any measurement output becomes one more piece Arcus connects to your own numbers. [Check on their site for how IRIS shares results.]',
    faq: [
      ['Is IRIS a competitor to Arcus?', 'In part. Both help teams understand what marketing did. IRIS is described as a measurement tool for ecommerce and performance teams [Check on their site]. Arcus connects every piece of a brand team’s data, plus what people say, does the work, and answers the question.'],
      ['What does IRIS cost?', 'We don’t publish other companies’ pricing. [Check on their site.] Arcus starts with one free question, then a one-time setup fee and a monthly fee. The Pricing page has the details.'],
      ['Can Arcus use results from IRIS?', 'If you share them, yes. We line them up with your own numbers and your agencies’ claims for the same period.'],
      ['Which is better for a brand without a data team?', 'Arcus was built for that team. For whether IRIS fits, [Check on their site for setup and support].'],
    ],
  },
  {
    slug: 'northbeam', name: 'Northbeam', h1: 'Arcus vs. Northbeam', checked: '[Last checked: date]',
    lead: 'Northbeam is a marketing attribution and measurement platform popular with ecommerce brands. It shows performance teams which ads get credit for online sales [Check on their site]. Arcus connects every piece of an entertainment or lifestyle brand’s data, from sales, tickets and CRM to ad accounts, agency reports and what people say, into one layer the brand owns, and answers questions with the whole picture.',
    rows: [
      ['Built for', 'Ecommerce and performance marketing teams [Check on their site]', 'Brand teams at entertainment and lifestyle companies'],
      ['Main job', 'Attribution and measurement across channels', 'Connecting every piece of your data, checking every claim, and answering any question'],
      ['Who does the work', 'Your team, in the platform [Check on their site]', 'We do, and send you the answers'],
      ['Results it starts from', 'Online sales tracked on your site [Check on their site]', 'Your own sales, tickets, sign-ups, streams or viewing'],
      ['Proof of cause', '[Check on their site for testing features]', 'A regions-on, regions-off test when it matters'],
      ['Conversation online', 'Not the focus [Check on their site]', 'Read and counted'],
    ],
    better: 'If you sell mostly online and have a performance team that wants an attribution dashboard, Northbeam is built for that.',
    summary: 'Northbeam is a marketing attribution and measurement platform popular with ecommerce brands. It gives performance teams a view of which channels and ads get credit for online sales [Check on their site for current features]. Arcus connects the pieces brand teams at entertainment and lifestyle companies already have, attribution output included, into one layer they own. It checks agency claims against your own numbers, counts each result once, adds what people say, and runs holdout tests when you need proof of cause.',
    sections: [
      ['What Northbeam is built for', 'Northbeam is known as an attribution platform for ecommerce brands. It brings ad spend and tracked online sales into one view so a performance team can compare channels and decide where the next dollar goes [Check on their site for current features, channels covered and pricing].\n\nThat suits a team that sells mostly through its own site, runs paid media closely and wants a dashboard it checks every day.'],
      ['Attribution and proof of cause', 'Any attribution model, however good, is a rule for sharing credit. It can show which ads were on the path to a sale. It can’t show whether the sale would have happened anyway.\n\nArcus starts by matching claims against your own numbers to remove double counting, then uses a regions-on, regions-off test when a decision needs proof. Ask any attribution vendor how they handle proof of cause. For Northbeam: [Check on their site].'],
      ['Results beyond online sales', 'Entertainment and lifestyle brands often count tickets, streams, viewing, sign-ups or retail sales. Many of those happen somewhere a site tracker can’t see: a theater, a streaming platform, a retailer’s shelf.\n\nArcus works from whatever your own numbers are, lined up by day and region, and tells you where they’re too thin to call. If your results mostly happen off your own site, ask any attribution vendor how they’d measure them [Check on their site].'],
      ['Who does the work', 'With an attribution platform, your team reads the dashboard and turns it into decisions [Check on their site for support options]. With Arcus, our team does the work and sends a few slides with the answer on top.\n\nArcus also reads and counts public conversation about your brand and lines it up with your numbers, which attribution tools usually leave out.'],
    ],
    decide: [
      'Pick Northbeam if most of your results are online sales through your own site.',
      'Pick Northbeam if you have a performance team that wants an attribution dashboard to use daily.',
      'Pick Arcus if your results are tickets, streams, sign-ups, viewing or retail sales.',
      'Pick Arcus if nobody on your team has time to read and act on a dashboard.',
      'Pick Arcus if you need agency claims checked, counted once, and tested before you move budget.',
      'Use both if a performance team wants attribution and the brand team wants independent checks and listening.',
    ],
    both: 'A brand with a performance team might use Northbeam for day-to-day paid media and Arcus for independent agency checks, holdout tests and listening. Attribution output becomes one more piece Arcus connects to your own numbers. [Check on their site for how Northbeam exports data.]',
    faq: [
      ['Is Northbeam the same as what Arcus does?', 'They overlap on one question: which marketing gets credit. Northbeam is a platform for performance teams. Arcus connects every piece of a brand team’s data, plus what people say, checks agency claims, and runs tests when a decision needs proof.'],
      ['Does Arcus do attribution?', 'Arcus matches every claim against your own numbers and counts each result once. When you need proof of cause, we run a regions-on, regions-off test. See our guide to incrementality.'],
      ['What does Northbeam cost?', 'We don’t publish other companies’ pricing. [Check on their site.]'],
      ['Can Arcus use our Northbeam data?', 'If you share it, yes. We read it alongside your agencies’ claims and your own numbers. [Confirm: how Arcus connects to Northbeam (API, export or shared access).]'],
    ],
  },
  {
    slug: 'agency-audit-firms', name: 'Agency audit firms', h1: 'Arcus vs. agency audit firms', checked: '[Last checked: date]',
    lead: 'Media audit firms check how your agency spent your money against your contract. Arcus connects your own numbers, your agencies’ reports and what people say into one layer you own, so every result an agency claims gets checked, and keeps getting checked.',
    rows: [
      ['Main question', 'Did the agency spend and bill the way the contract says?', 'Did the results the agency claims hold up in your own numbers?'],
      ['Starting point', 'Contracts, invoices and media buys', 'Your own sales, tickets, sign-ups, streams or viewing'],
      ['How often', 'Usually a periodic project, such as yearly or before a review', 'Ongoing, on the schedule you choose'],
      ['Conversation online', 'Not included', 'Read and counted'],
      ['Proof of cause', 'Not usually in scope', 'A regions-on, regions-off test when it matters'],
    ],
    better: 'If your main worry is fees, rates, billing or contract terms, a media audit firm is the right call.',
    summary: 'Agency audit firms review how an agency spent and billed your media budget: rates, fees, invoices and whether the contract was followed. Arcus checks a different thing: whether the results your agencies claim hold up against your own numbers, counted once across every agency. Many brands could use both. An audit firm protects the money going out. Arcus checks what came back.',
    sections: [
      ['What a media audit covers', 'Media audit firms and agency auditing consultancies look at the financial side of an agency relationship. Typical work includes checking invoices against buys, comparing the rates you paid with the market, reviewing fees, and confirming the agency followed the contract.\n\nThat work is valuable, especially for large budgets. It answers whether you were charged fairly. Scope varies by firm, so ask each one what’s included.'],
      ['What it usually leaves out', 'An audit can confirm an agency bought what it said at a fair price. It usually doesn’t ask whether the results in the recap hold up against your own numbers, or whether two agencies claimed the same buyer.\n\nThat’s where Arcus starts. We match every claim against your own sales, tickets, sign-ups, streams or viewing, and count each result once.'],
      ['Project vs. ongoing', 'Audits tend to be periodic projects: once a year, before a review, or when something feels off. That timing suits contract questions.\n\nResults change faster. Arcus checks on the schedule you choose, so claims are tested before renewals and budget decisions, and listening keeps running in between.'],
      ['Proof and audience', 'Neither an audit nor a matching check proves an ad caused a result. When a decision needs proof, Arcus runs a regions-on, regions-off test.\n\nArcus also reads and counts what your audience says online and lines it up with your numbers. That sits outside a media audit’s usual scope.'],
    ],
    decide: [
      'Hire an audit firm if your main question is fees, rates, billing or contract compliance.',
      'Hire an audit firm before a big agency review or contract renegotiation.',
      'Pick Arcus if your main question is whether agency results hold up in your own numbers.',
      'Pick Arcus if you use several agencies and their claims add up to more than you had.',
      'Pick Arcus if you want checks every month and listening alongside them.',
      'Use both if you want the money going out and the results coming back checked by people with no stake in either.',
    ],
    both: 'An audit firm checks what you paid and whether the contract was followed. Arcus checks whether the results claimed for that spend hold up, and keeps checking. Findings from each make the other more useful: a fair price on media that didn’t move results is still worth knowing about.',
    faq: [
      ['Is Arcus a media audit firm?', 'No. We don’t audit invoices, rates or contracts. We check the results agencies claim against your own numbers.'],
      ['Do we need both?', 'If you spend enough that fees and rates matter, an audit is worth it. If you need to know which results hold up, that’s Arcus. Many brands with several agencies benefit from both.'],
      ['Will our agencies treat Arcus like an auditor?', 'Sometimes, at first. A fair count with one rule for everyone tends to help agencies doing good work. [Confirm: whether agencies are told, and whether Arcus contacts them.]'],
      ['How does pricing compare?', 'Audit firms price their own way, often per project. Arcus starts with one free question, then a one-time setup fee and a monthly fee. The Pricing page has the details.'],
    ],
  },
];
