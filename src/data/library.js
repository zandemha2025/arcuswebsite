// Library articles. Answer first. Only numbers from real Arcus reports (anonymized) or clearly labeled example numbers.
const D = '2026-10-02';
const g = (slug, text) => `<a href="/glossary/${slug}">${text}</a>`;
const fr = (text = 'try it free') =>`<a href="/free-report">${text}</a>`;

export const ARTICLES = [
  {
    slug: 'first-party-data-for-brand-marketers', topic: 'Your data', author: 'nazeem-ahmed', date: D,
    title: 'What is first-party data, and what do I do with mine?',
    dek: 'You already have it. Here’s what it can tell you, where it lives, and the one question to start with.',
    short: 'First-party data is what your company collects itself: sales, tickets, sign-ups, viewing, customers, email, your own social accounts and site visits. It tells you which posts, campaigns and channels line up with what actually happened, in your own records, not just in any one platform’s report. Start with one question and the data you already hold that touches it.',
    body: `
<h2 id="what">What counts</h2>
<p>${g('first-party-data', 'First-party data')} is anything your company collects directly. ${g('third-party-data', 'Third-party data')} comes from outside: public conversation, search trends, reviews and research. Most brand teams have more of the first kind than they think. It’s just in pieces: sales with finance, email with the CRM team, social stats with a partner, each in a tool that doesn’t talk to the others.</p>
<p>A useful test: if your company could hand the data to an auditor and say “we recorded this ourselves,” it’s first-party. If you’d have to say “a platform told us” or “a vendor estimated it,” treat it with more care. Agency and partner reports sit in between. You received them directly, but they describe what the platforms saw, which is why they belong next to your own numbers.</p>
<table><thead><tr><th>Data</th><th>What it can tell you</th><th>Where it usually lives</th></tr></thead><tbody>
<tr><td>Sales, tickets, sign-ups, viewing</td><td>What happened, when, and through which channel</td><td>Finance, ticketing, retail partner reports, app or platform dashboards</td></tr>
<tr><td>Customers</td><td>Who buys again, and who your best customers are</td><td>Your CRM or customer list</td></tr>
<tr><td>Email</td><td>Which messages drive results, and how many results came from email</td><td>Your email tool</td></tr>
<tr><td>Your social accounts</td><td>Which posts get watched and which get shared</td><td>Platform exports or your social tool</td></tr>
<tr><td>Ad accounts</td><td>What ran, when, where, and what it cost</td><td>The ad platforms, run by your team or a partner</td></tr>
<tr><td>Agency reports</td><td>What each partner reports it drove</td><td>Decks and spreadsheets in your inbox</td></tr>
</tbody></table>

<h2 id="questions">Questions it can answer</h2>
<ul>
<li><b>Which posts work?</b> In a real Arcus content report for a hard seltzer brand, the brand’s own social export showed one type of post, a trick with the can you could copy tonight, got a median of 19,188 views on Instagram against an account average of 8,148. That’s 2.4 times the average, read from data the brand already had. See the <a href="/reports/content-report">content report</a>.</li>
<li><b>Did the campaign line up with results?</b> Your own numbers are what every channel’s report should be lined up against.</li>
<li><b>How much came from email?</b> An ad platform often credits itself with a sale that came from email, because one of its ads was somewhere in the path. Your email tool knows better.</li>
<li><b>Who are our best customers?</b> Usually a small group drives a big share of results. Knowing who they are changes who you write for.</li>
</ul>
<p>Notice what these questions have in common. Each one is about a decision: what to make, what to fund, what to stop, who to talk to. First-party data earns its keep when it’s pointed at a decision someone has to make this quarter. Pointed at nothing in particular, it turns into a dashboard nobody opens.</p>

<h2 id="example">A worked example</h2>
<p class="small muted">Made up to show how it reads, not from a client.</p>
<p>Your sales are up 18% in week 3, and your team wants to know why. Your first-party data shows what happened: sales by day from finance, and which buyers were new from the CRM. It doesn’t show why. What people said online that week points to a reason: 1,240 TikTok and Reddit posts about one creator you never paid. The next step is to test it: pay that creator in half your regions, and compare sales with the other half.</p>
<p>That’s the job first-party data does best. It isn’t glamorous. It’s the list of what happened, which every other number should agree with.</p>

<h2 id="together">Better together</h2>
<p>On its own, first-party data tells you what your customers did. Third-party data tells you what people are saying. Lined up, they tell you whether the conversation turns into results.</p>
<p>In a real Arcus audience report for a streaming service, only 1.9% of 4,283 questions men asked each other on one large forum were about hobbies, games and entertainment. They didn’t ask each other what to watch. The talk happened under the shows instead: 78,682 comments under four trailers. That changes where a brand should listen, and which of its own numbers, like viewing by title, it should line the conversation up against. See the <a href="/reports/audience-report">audience report</a> and our guide to <a href="/library/social-listening-that-counts">listening that counts</a>.</p>
<p>The same pattern works for a drinks brand, a game or a fashion label. Count what people say about the product, the moment or the occasion, then line it up week by week with your own sales, sign-ups or streams. When a topic rises in conversation and your numbers rise with it, that’s worth testing. When it rises and your numbers don’t move, that’s worth knowing too.</p>

<h2 id="start">Where to start: a checklist</h2>
<ol>
<li><b>Write down one question</b> you’ve been asked and couldn’t answer. “Is the creator program working?” is a good one.</li>
<li><b>List the data that touches it</b>: sales or sign-ups by day, creator codes, the creator recap, your email sends.</li>
<li><b>Find who owns each piece.</b> Finance, a partner, your own team.</li>
<li><b>Check the dates line up.</b> Same days, same time zone, same definition of a result.</li>
<li><b>Put each report’s number next to your own number</b> for the same dates.</li>
<li><b>Write down what you still can’t answer.</b> That list is your next step.</li>
</ol>

<h2 id="mistakes">Common mistakes and limits</h2>
<ul>
<li><b>Waiting until it’s all in one place.</b> Start with the two or three sources one question needs.</li>
<li><b>Letting the ad platforms be the record.</b> They report what they saw. Your own numbers report what happened.</li>
<li><b>Collecting more instead of reading what you have.</b> Most teams already hold data nobody reads.</li>
<li><b>Forgetting retail and partners.</b> If most of your results come through someone else, their reports are part of your first-party picture.</li>
</ul>
<p>Questions worth asking your team: Can we get every report’s results by day, so they line up with our own numbers? Which of our own channels, like email, could explain results an ad report counts? What’s missing from our data that would make the next answer easier?</p>
<p>What it doesn’t prove: first-party data tells you what happened and lets you see which reported results held up. On its own it can’t tell you why. A spike in sign-ups the week a campaign ran lines up with the campaign. Proving it caused them takes a ${g('holdout-test', 'holdout test')}.</p>
<p>If nobody on your team has time for the checklist, ${fr('try it free')} with the question from step 1. We answer it with your own numbers and what people say online, then walk you through it in 30 minutes, so you see what your data can already tell you. After that, we <a href="/how-it-works">connect every piece</a> into one place you own, inside your own setup, and answer the next question with the whole picture.</p>`,
    faq: [
      ['Is first-party data the same as zero-party data?', 'Zero-party data is information customers give you on purpose, like a quiz answer or a preference. It’s a kind of first-party data.'],
      ['Our sales happen through retailers. Do we have first-party data?', 'Yes. Retail partner reports, marketplace dashboards and your own social and email data all count. A good answer says where that data is too thin to call.'],
      ['Do we have to change the tools we use?', 'No. We connect the ones you already have into one place you own, inside your own setup, and read them together.'],
    ],
  },
  {
    slug: 'incrementality-without-the-math', topic: 'Measurement', author: 'nazeem-ahmed', date: D,
    title: 'Incrementality, explained without the math',
    dek: 'How to tell whether a campaign caused results, using a test you can explain to your boss in two sentences.',
    short: 'Incrementality means the results that happened because of a campaign and wouldn’t have happened without it. The clearest way to measure it is a holdout test: run the campaign in some regions and not others for a few weeks, then compare. The difference is the campaign’s effect.',
    body: `
<h2 id="what">What it means</h2>
<p>Every campaign gets credit for results. Some of those results would have happened anyway. The people who already loved you, the fans who were going to stream the new season, the buyers searching your name: they show up in the campaign report, but the campaign didn’t bring them. ${g('incrementality', 'Incrementality')} is what’s left when you take them out.</p>
<p>The two-sentence version for your boss: we ran the campaign in some regions and not in others. The difference in results between the two groups is what the campaign did.</p>
<p>It works the same whatever you count. For a studio, the result might be tickets in each region. For a streaming service, sign-ups or hours viewed. For a drinks brand, sales through retail partners by region. As long as you can see the result by region, or by some other group you can split, you can run the test.</p>

<h2 id="why">Why matching isn’t enough</h2>
<p>Matching every reported result to one in your own numbers removes ${g('double-counting', 'double counting')}. That’s a big step. It tells you which results are possible. It can’t tell you which ones the campaign caused.</p>
<p>Take people already searching your brand’s name. They click an ad on their way to a purchase they’d already decided on. Matching finds obvious cases like that. It can’t find the quieter ones: the fan who saw a trailer and would have watched anyway, or the regular who bought her usual case the week your ad ran. Only a comparison against people who didn’t see the campaign can.</p>
<p>This matters most for the channels that sit closest to the purchase. ${g('brand-search', 'Brand search')}, retargeting and ${g('last-click', 'last-click')} credit all reach people at the final step. Their reported results can look excellent while adding little, because the buyers were already on their way. Those are usually the first channels worth testing.</p>

<h2 id="test">The test, step by step</h2>
<ol>
<li><b>Write the question.</b> “Does paid social drive sign-ups in our top markets?” One channel, one result.</li>
<li><b>Pick regions that look alike</b>: similar size, similar history of sales, tickets or sign-ups.</li>
<li><b>Split them into two groups.</b> Run the campaign in one. Leave the other alone. This is the ${g('holdout-test', 'holdout')}.</li>
<li><b>Agree the length before you start</b>, long enough for results to move, usually a few weeks.</li>
<li><b>Change nothing else.</b> No new promotions in one group only, no price changes, no surprise press push.</li>
<li><b>Compare results</b> between the two groups using your own numbers, not the platform’s.</li>
<li><b>Write down what you’ll do with each outcome</b> before you look.</li>
</ol>

<h2 id="example">A worked example</h2>
<p class="small muted">Made up to show how a test reads, not from a client.</p>
<p>Your search ads get credit for a large share of results, and most of what holds up after matching came through brand search. The question: if you stopped paying for clicks on your own name, would those buyers still find you? The test pauses brand search in half your regions for three weeks and keeps it on in the other half.</p>
<ul>
<li><b>If results hold in the paused regions</b>, people were finding you without the paid click. That budget can move somewhere that earns it.</li>
<li><b>If results drop</b>, the channel works, and the size of the drop tells you by how much.</li>
</ul>
<p>Either way you learn something no report could tell you. And the test itself is cheap compared with a year of spending on a guess: three weeks, half the regions, and a comparison the whole team can read.</p>

<h2 id="when">When it’s worth running: a checklist</h2>
<ul>
<li>You’re about to move a meaningful amount of budget.</li>
<li>A channel’s numbers look too good, like ${g('brand-search', 'brand search')} or ${g('view-through-conversion', 'view-throughs')}.</li>
<li>Two channels report the same results and you need to know which one earned them.</li>
<li>You can hold out regions without hurting a launch you can’t repeat.</li>
</ul>
<p>How long and how big: long enough for results to move and settle, and big enough that normal week-to-week swings don’t drown out the difference. For most brand campaigns that means a few weeks and a meaningful share of your regions. If your results are small or noisy, run longer rather than smaller. Agree all of this in writing before the test starts, with everyone who touches the campaign.</p>
<p>Who should run it? Whoever buys your media can set up the regions. Reading the result should start from your own numbers, with the same counting rule for every channel. That keeps the conversation afterward about what the numbers say.</p>
<p>Write the plan on one page: the question, the regions in each group, the dates, the result you’ll compare, and what you’ll do if results hold, rise or drop. Share it with everyone before the test starts.</p>
<p>Questions worth asking your team: Which channel should we test before we increase spend? Which regions would we hold out, and for how long? What result would make us cut the channel?</p>

<h2 id="pitfalls">Common mistakes, and what a test doesn’t prove</h2>
<ul>
<li><b>Stopping too early.</b> Results take time to move. Agree the length up front and keep to it.</li>
<li><b>Choosing regions that aren’t alike.</b> A big city against small towns tells you about geography.</li>
<li><b>Changing other things mid-test.</b> One extra promotion in one group spoils the comparison.</li>
<li><b>Reading the platform’s numbers.</b> Use your own. The platform can’t see the regions where it didn’t run.</li>
<li><b>Testing during your one big launch.</b> Pick a period you can repeat.</li>
</ul>
<p>A test measures one campaign, in one set of regions, over one period. It doesn’t tell you what the campaign will do at twice the budget, in a different season, or with new creative. It also doesn’t replace a ${g('media-mix-modeling', 'media mix model')}, which estimates every channel at once from history. A test measures one channel directly, and it’s the best way to check what a model says.</p>
<p>We design and read these tests as part of Arcus, on your own numbers. To start smaller, ${fr('try it free')} with a question like which spend paid off, before you test anything. If the answer points to a channel worth testing, we’ll say so.</p>`,
    faq: [
      ['Is media mix modeling the same thing?', 'No. A model estimates contribution from history. A holdout test measures it directly. They work well together: the test checks the model.'],
      ['Won’t we lose sales in the holdout regions?', 'Possibly, for a few weeks. That’s the price of knowing. If the channel turns out to do little, you save far more than the test cost.'],
      ['Can we test without regions?', 'Sometimes, by holding out a group of customers or a time period. Regions are the easiest to explain and the hardest to argue with.'],
    ],
  },
  {
    slug: 'social-listening-that-counts', topic: 'Your audience', author: 'devin-min', date: D,
    title: 'Social listening that counts, not guesses',
    dek: 'How to read what your audience says across Reddit, TikTok, Discord and the rest, and turn it into something you can act on.',
    short: 'Useful listening counts specific things in your audience’s own words: what they post, what they reward, which words they use, and what they never mention. Then it checks those patterns against your own numbers. Sentiment scores and word clouds rarely change a decision. Counts and real quotes do.',
    body: `
<h2 id="where">Listen where they talk</h2>
<p>Your audience doesn’t talk in one place, and it rarely talks where your brand posts. Fans talk under trailers on YouTube, in Discord servers, in Twitch and Kick chat, in Reddit threads, in TikTok comments, in Facebook groups, and in reviews on places like Goodreads, Letterboxd and Steam. Search data shows what they look for. The full list of where we read is on our <a href="/listening">listening page</a>.</p>
<table><thead><tr><th>Where</th><th>What you learn there</th></tr></thead><tbody>
<tr><td>Comments under trailers and posts</td><td>What fans reward: the callback, the joke, the verdict</td></tr>
<tr><td>Reddit and forums</td><td>What people ask each other, and what they never raise</td></tr>
<tr><td>TikTok formats they run themselves</td><td>The bits and the topics they own</td></tr>
<tr><td>Discord, Twitch and Kick chat</td><td>Live reaction, in their own words</td></tr>
<tr><td>Reviews</td><td>What the product is judged on</td></tr>
<tr><td>Search</td><td>What they look for, and when</td></tr>
</tbody></table>
<p>The rooms matter more than the mentions. In a real Arcus audience report for a streaming service, men 18 to 24 almost never asked each other what to watch. Of 4,283 questions on one large men’s forum, 1.9% were about hobbies, games and entertainment. Entertainment came up as a question in 47 titles, with a median of one upvote. The talk happened under the shows themselves: 78,682 comments under four of the service’s trailers on YouTube. A tool that tracked brand mentions would have found a quiet audience. Reading the right rooms found a loud one. See the <a href="/reports/audience-report">audience report</a>.</p>

<h2 id="count">Count what they do</h2>
<p>A summary says “young men use a lot of slang.” A count says one word in every 62 is slang. The first leads a brand to write more slang. The second leads it to write less.</p>
<p>Counting also lets you compare. If you count your audience and your brand with the same script, the gap between them is a finding. If you count the same rooms every quarter, a change is a finding. A summary can’t do either, because two summaries written by different people can’t be lined up.</p>
<p>Here’s what counting looked like in that report:</p>
<ul>
<li>293 TikToks from eight formats the audience runs themselves, each sorted by hand.</li>
<li>2,965 comments measured for length, first person, punctuation and hashtags.</li>
<li>480 comments labeled by hand, one kind each: a joke, a verdict, a question, a sincere line.</li>
<li>6,622 comments counted for the words they use.</li>
</ul>
<p>The counts changed the voice rules. An acted-out sketch got 42 times the views of a sincere post. The most searched slang of 2025, “6-7” at 141,000 searches, appeared in one comment of the 6,622. A sentiment score wouldn’t have shown either.</p>

<h2 id="example">A worked example: the slang question</h2>
<p>The brand’s question was simple: should our captions sound like our audience? The listening answered it in three counts.</p>
<table><thead><tr><th>What was counted</th><th>The audience</th><th>The brand’s captions</th></tr></thead><tbody>
<tr><td>Words in a typical line</td><td>5</td><td>8</td></tr>
<tr><td>Lines ending in a full stop</td><td>4.9%</td><td>35%</td></tr>
<tr><td>Lines with a hashtag</td><td>0.2%</td><td>92.5%</td></tr>
</tbody></table>
<p>The words they did use were verdicts on the work, like “peak,” “real” and “cinema.” “Rizz” appeared in none. The answer: the brand’s captions already sounded like a brand, and adding slang would make it worse. Write shorter, drop the hashtags, and let fans supply the words. Our guide to <a href="/library/how-young-audiences-write">how young audiences write</a> has the full count.</p>
<p>Notice the shape of the answer. It isn’t “young men are sarcastic” or “use more humor.” It’s three measurable differences between the audience and the brand, each one something a social team can change in its next caption. That’s the test for any listening finding: could someone act on it this week?</p>

<h2 id="brief">A listening brief you can use tomorrow</h2>
<ol>
<li><b>Write the decision</b> the listening should inform. “Should we change our caption voice?” beats “what are people saying?”</li>
<li><b>Name the rooms.</b> Where does this audience talk when you’re not posting?</li>
<li><b>Name what you’ll count.</b> Views by format, likes on the top comment, words per 1,000 comments, topics per 100 questions.</li>
<li><b>Count the brand the same way.</b> Same script, same measures, your own posts.</li>
<li><b>Keep real quotes</b> with their like counts, so every finding has an example.</li>
<li><b>Line it up with your own numbers.</b> Do the topics that spike in conversation show up in sales, sign-ups or viewing?</li>
<li><b>End with keep, test, stop.</b></li>
</ol>
<p>Questions worth asking your team: Which rooms do we read beyond brand mentions? What do we count, and can we see the counts? Do we measure our own posts with the same rules? Can we show three real quotes, with like counts, for each finding? What did we change because of the last listening report?</p>

<h2 id="mistakes">Common mistakes</h2>
<ul>
<li><b>Tracking mentions only.</b> Your audience may never say your name. They talk about the show, the drink, the moment.</li>
<li><b>Trusting sentiment scores.</b> A top reply under a brand post called the trailer bad and promised to watch anyway. It’s sarcasm, and it means “I’m in.” A sentiment tool would score it negative.</li>
<li><b>Reading only the top posts.</b> The comments are often where the meaning is.</li>
<li><b>Stopping at a word cloud.</b> If a listening report ends with one, it isn’t done.</li>
<li><b>Counting the brand differently.</b> If the audience is counted by script and the brand is judged by eye, the comparison doesn’t hold.</li>
<li><b>Quoting without counts.</b> One vivid comment can mislead. Pair every quote with how often its kind shows up.</li>
</ul>

<h2 id="limits">What it doesn’t prove</h2>
<p>Listening tells you what people say and reward in public. It doesn’t tell you who buys. Public rooms skew: the forum in the example skews older than 24, so the report showed the 57 posters who stated an age of 18 to 24 separately. Some platforms hide counts: Instagram returns no like counts on comments. Lining it up with your own numbers can be as simple as a weekly table: the count of a topic in conversation next to sign-ups, sales or viewing by title for the same weeks. When the two move together more than once, you have something worth testing. ${g('social-listening', 'Listening')} gets useful when you line it up with your ${g('first-party-data', 'first-party data')}, and it becomes proof only with a test.</p>
<p>Arcus plugs in the listening tool you already have, reads the rooms your audience uses, and lines what people say up with your own numbers. To see it on your audience, ${fr('try it free')} with a question like “Should our captions sound like our fans?”</p>`,
    faq: [
      ['Which platforms do you read?', 'Reddit, TikTok, YouTube, X, Instagram, Facebook groups, Discord, Twitch, Kick, Google Search, Goodreads, Fable, reviews and more, depending on where your audience is.'],
      ['Is this the same as a social listening tool?', 'No. A listening tool is one of the pieces Arcus plugs into. Arcus reads the rooms your audience uses, counts specific things, and lines them up with your own numbers.'],
      ['Who reads the comments?', 'Counting is done by script. Labels that need judgment, like whether a comment is a joke, are done by a person, and every label is filed.'],
    ],
  },
  {
    slug: 'which-posts-actually-work', topic: 'Your data', author: 'devin-min', date: D,
    title: 'How to tell which of your posts work',
    dek: 'Sort posts by what’s on screen, compare medians with the account average, and the pattern shows up fast.',
    short: 'Group your posts by what happens on screen, then compare each group’s median views and shares with your account average. Watched and shared are different jobs, so check both. Mark groups of fewer than four posts as directional, and end with what to keep, test and stop.',
    body: `
<h2 id="sort">Sort by what’s on screen</h2>
<p>Campaign names describe intentions. What’s on screen describes what people saw. Watch every post and give it one label for the thing that happens: a trick with the product, a joke about friends, the product as the character, a scene where nothing happens. If a post doesn’t fit, put it in “other.” You’ll come back to that bucket.</p>
<p>A few rules make the labels hold up. Label the thing that happens, not the mood or the message. One label per post. If two people would label a post differently, write down why and pick one. Watch with the sound off once: if the joke still lands, note it. In the report below, the most shared posts read with the sound off.</p>
<p>In a real Arcus content report for a hard seltzer brand, every Instagram and Facebook post from one summer campaign was watched and sorted this way: 39 Instagram posts and 29 Facebook posts. See the <a href="/reports/content-report">content report</a>.</p>

<h2 id="medians">Use medians, compared with the account average</h2>
<p>The median is the middle post in a group. It keeps one viral hit from hiding a weak pattern. Divide it by the account’s average per post and you get a number anyone can read: above 1 beats the account, below 1 doesn’t. Here is the Instagram scorecard from that report:</p>
<table><thead><tr><th>What’s on screen</th><th>Posts</th><th>Median views</th><th>vs. average</th><th>Median shares</th></tr></thead><tbody>
<tr><td>Hosting hacks: a trick with the can</td><td>4</td><td>19,188</td><td>2.36x</td><td>26</td></tr>
<tr><td>A moment people were in*</td><td>3</td><td>8,000</td><td>0.98x</td><td>46</td></tr>
<tr><td>Other</td><td>7</td><td>6,186</td><td>0.76x</td><td>14</td></tr>
<tr><td>Can tricks and gags</td><td>11</td><td>6,107</td><td>0.75x</td><td>13</td></tr>
<tr><td>Workday escape</td><td>7</td><td>3,962</td><td>0.49x</td><td>10</td></tr>
<tr><td>Unusual hangouts</td><td>5</td><td>2,415</td><td>0.30x</td><td>12</td></tr>
<tr><td>3D animation*</td><td>2</td><td>1,139</td><td>0.14x</td><td>8</td></tr>
</tbody></table>
<p>Account average: 8,148 views and 36 shares per post. *Fewer than four posts, so directional.</p>

<h2 id="one-post">Check for one-post groups</h2>
<p>Medians help, but also ask how much of a group’s total comes from its best post. In the same report, one post, a sign held up from a balcony, carried 45% of its group’s views and 77% of its shares. Without it, the group’s median fell from 3,962 to 3,119 views, and the group was the second weakest on the account. The hit was a permission gag with a sight joke. Two anti-work posts in the group, played straight, stayed under 2,300 views each. One post had been carrying an idea that didn’t work.</p>
<p>Now check the other direction: posts in “other” that land together. In the report, three posts about the end of a big summer tournament weren’t in any named group. Together they were number one by shares and number two by views on Instagram. The brief said to name a group when two or more posts land together, so the report named it a candidate, marked it directional, and set a test: does the next big shared moment do the same?</p>

<h2 id="jobs">Watched and shared are different jobs</h2>
<p>Hosting hacks led on views but sat below average on shares: a median of 26 against the account’s 36. The most shared post on the account wasn’t in any named group. It was a joke about the viewer’s friends going back to work after a big tournament: 409 shares on 8,000 views, 11 times the Instagram average for shares. Facebook was different again: it watched, and barely shared, at 1.2 shares per post. Our guides to <a href="/library/watched-vs-shared-share-rate">watched versus shared</a> and <a href="/library/facebook-watches-but-doesnt-share">what to post on Facebook</a> go deeper.</p>
<p>So build two scorecards, one for views and one for shares, per platform. A group can win one and lose the other, and that’s useful. It tells you which job each kind of post does, so you can plan a mix instead of chasing one number.</p>

<h2 id="checklist">A checklist for your next review</h2>
<ol>
<li>Export every post from the period, with views and shares, from your own accounts.</li>
<li>Watch each one. Give it one label for what happens on screen.</li>
<li>Work out the account average per post for views and shares, per platform. Never add platforms together.</li>
<li>Find each group’s median and divide by the average.</li>
<li>Mark groups of fewer than four posts as directional.</li>
<li>For each group, check the best post’s share of the total. If one post carries most of it, read the group without it.</li>
<li>Look in “other” for two or more posts that land together. Name them as a candidate group.</li>
<li>Write three lines: keep, test, stop.</li>
</ol>
<p>Here are the three lines from the report, as an example of how specific they should be. <b>Keep</b> hosting hacks: more physical tricks with the can that someone could copy tonight. <b>Test</b> a friend-group frame on top of the formats that already get watched, and watch the share rate. <b>Retire</b> 3D animation, and the workday idea as written: keep the permission gag, drop “quit your job.”</p>
<p>Questions worth asking your team: Do we group posts by brief or by what’s on screen? Which group would we stop? Which hit is carrying a weak group?</p>

<h2 id="limits">Common mistakes, and what this doesn’t prove</h2>
<ul>
<li><b>Ranking by totals.</b> A group with more posts wins by volume.</li>
<li><b>Reading share rate alone.</b> Low-view posts can post high rates on a handful of shares. The 3D animation group had the highest median share rate on Instagram, 0.9%, and the lowest views.</li>
<li><b>Calling a group on two posts.</b> Mark it directional and test again.</li>
<li><b>Sorting by campaign name.</b> Two posts from the same brief can do opposite things on screen. Label what happens.</li>
<li><b>Ignoring “other.”</b> In the report, “other” had higher median views than three of the four named groups, and the most shared post on the account came out of it.</li>
<li><b>Forgetting test posts.</b> In the report, one post was a test cut at 212 views. It stayed in the data, labeled, and wasn’t read as a creative failure.</li>
</ul>
<p>This tells you which kinds of posts get watched and shared. It doesn’t tell you which ones sold. Lining posts up with your own sales, tickets or sign-ups is the next step, and a test is the step after that. Arcus does both once your social accounts and your sales sit in one place you own. To start, ${fr('try it free')} with a question like “Which of our posts moved sales?”</p>`,
    faq: [
      ['How many posts do we need?', 'Four or more in a group before you call it. Fewer is directional.'],
      ['Why medians and not averages?', 'One viral post can drag an average up and hide a weak pattern. The median is the middle post, so one hit can’t move it much.'],
      ['Should we add Instagram and Facebook together?', 'No. They do different jobs, and adding them hides both. Read each platform against its own average.'],
      ['What goes in “other”?', 'Anything that doesn’t fit a named group. Check it every time: two or more posts that land together may be a new group worth naming.'],
    ],
  },
  {
    slug: 'do-you-need-a-data-team', topic: 'Your data', author: 'brendon-ghaderi', date: D,
    title: 'Do you need a data team? A checklist',
    dek: 'Ten questions to decide whether to hire, buy software or get help, and what each path takes.',
    short: 'You need a dedicated data team if data is core to how your company competes and you have new questions every week. If you mainly need trustworthy answers about spend, content and your audience a few times a month, a setup built for you, in one place you own, is usually faster than hiring and cheaper than a team.',
    body: `
<h2 id="three">The three paths</h2>
<p>Brand teams that want better answers usually pick one of three paths.</p>
<table><thead><tr><th></th><th>Hire a data team</th><th>Buy analytics software</th><th>Have it built for you</th></tr></thead><tbody>
<tr><td>Who does the work</td><td>Your hires</td><td>Whoever on your team has time</td><td>An outside team</td></tr>
<tr><td>Time to first answer</td><td>Months to hire, then months to build</td><td>Weeks to buy, then setup by your team</td><td>A first answer early, full setup in about three months</td></tr>
<tr><td>What you manage</td><td>People, tools and the setup</td><td>The tool and the setup</td><td>The questions. The setup is yours.</td></tr>
<tr><td>Best for</td><td>Data is core to how you compete</td><td>You already have analysts</td><td>You have questions, not analysts</td></tr>
</tbody></table>
<p>Our comparisons go deeper on <a href="/compare/hiring-a-data-team">hiring a team</a> and <a href="/compare/analytics-software">analytics software</a>.</p>
<p>What a marketing data team needs, at minimum: someone to connect the data from your teams, partners and ad accounts; someone to analyze it and design tests; someone to read public conversation if that matters to you; and someone senior enough to turn findings into decisions. In a small team those can be two people. Rarely one.</p>
<p>It also needs time. Connecting sources, agreeing definitions and checking the first numbers takes months before anyone answers the question you hired them for.</p>

<h2 id="list">The checklist</h2>
<ol>
<li><b>How often do you have questions?</b> Every week, or a few a month?</li>
<li><b>Can you hire and keep analysts and data engineers</b> in your market, at your pay range?</li>
<li><b>Who will manage them?</b> Someone who can judge their work, not only their output.</li>
<li><b>Is your data already in one place,</b> or spread across teams, partners and tools?</li>
<li><b>Do you need answers this quarter?</b></li>
<li><b>Does anyone on the team read dashboards today,</b> or do they go unread?</li>
<li><b>Do you need to read conversation online</b> as well as your own data?</li>
<li><b>Would a few slides with the answer on top</b> be enough for your leadership?</li>
<li><b>Do your questions change</b> with each launch, season or release?</li>
<li><b>Do you need to see across every team and partner?</b></li>
</ol>

<h2 id="read">How to read your answers</h2>
<p>Mostly “weekly, yes, we have someone, it’s already in one place”: build the team. You’ll get value from people who live in your data every day.</p>
<p>Mostly “a few a month, not sure, no, it’s spread out”: get help first. You’ll get answers sooner, and you’ll learn which questions matter before you hire anyone to answer them.</p>
<p>Mixed answers are common. Some teams get help now and hire later, once the setup is running and they know what kind of person they need.</p>
<p>Two answers carry extra weight. If you need answers this quarter, hiring is unlikely to deliver them in time. And if you need to see across every team and partner, all their data has to be connected first, and that takes up most of a new hire’s first months.</p>

<h2 id="example">A worked example</h2>
<p class="small muted">A composite to show how the checklist reads, not a client.</p>
<p>A brand marketing lead at a beverage brand runs paid social, search and a creator program, mostly through partners. Her questions come in bursts: before each budget decision, after each campaign, when the CMO asks whether summer worked. Her sales data sits with finance and retail partners. Social exports sit with whoever runs each account. Nobody on her team writes queries, and she doesn’t want to learn.</p>
<p>Her checklist reads: a few a month, hard to hire, nobody to manage them, spread out, needed this quarter, dashboards unread, yes to listening, yes to a few slides, questions change every season, seeing across every team and partner is central. That’s a clear “get help first.” Hiring would take months before her first answer, and her first hire would spend their first months connecting data before answering anything.</p>
<p>What she does instead: she tries Arcus free on one question, whether the summer push paid off. The answer comes from her own sales data and what people said online, and she takes it into her next budget meeting. If that first answer earns its place, the setup follows. A few months later she has the answers she was missing, and a much better idea of whether she’ll ever need to hire.</p>

<h2 id="arcus">What getting help looks like with Arcus</h2>
<p>Arcus is the third path for entertainment and lifestyle brands, and we build it for you. First we connect every piece of your data, from sales and email to social accounts and agency reports, into one place you own: your own data lake, inside your own setup. Then we add what people say online, and write down what we learn about your products, seasons, audiences and goals, so every answer starts from your business. That’s your context layer. It takes about three months. Answers arrive as a few slides: the answer on top, the evidence, then what to keep, test and stop. They land in Slack, email or Sheets. Before we connect anything, we agree with you on exactly what we can access.</p>
<p>Once it’s connected, any leader can ask a question and get an answer that sees the whole picture: whether the summer push paid off, which posts work, who a launch is really for. See <a href="/how-it-works">how it works</a>.</p>
<p>The way in is small on purpose: you try it free first. If you want it built after that, we scope the setup and the monthly work for your brand and quote it once you’ve seen your free answer. The <a href="/pricing">pricing page</a> explains how it works.</p>

<h2 id="mistakes">Common mistakes, and what this checklist doesn’t decide</h2>
<ul>
<li><b>Hiring one analyst and expecting a team.</b> One person ends up connecting data instead of answering questions.</li>
<li><b>Buying software nobody has time to set up.</b> A tool doesn’t answer questions on its own.</li>
<li><b>Waiting for perfect data.</b> Start with one question and the data that touches it.</li>
<li><b>Hiring before you know the questions.</b> The questions decide the skills. Write ten of them down before you write a job description.</li>
<li><b>Treating it as forever.</b> The right answer this year may change next year.</li>
</ul>
<p>Questions to ask anyone offering to do it for you, Arcus included: Who owns the setup, and where does it live? Which of our existing tools do you connect to? Who reads the data, and how often? What do we get each month, and in what form? What happens to the setup if we stop?</p>
<p>The checklist tells you which path fits your questions today. It doesn’t tell you what any path will cost your company, or how good your data is until someone looks. The quickest way to see what your data can answer is to ${fr('try it free')}: pick a question, and we answer it with your own numbers and walk you through it in 30 minutes.</p>`,
    faq: [
      ['Can Arcus work alongside a data team?', 'Yes. Some teams use Arcus while they hire, or for listening and spend reports their team doesn’t cover.'],
      ['What happens to the setup if we stop?', 'You keep every answer we sent you, and everything we built inside your setup stays yours. We walk you through the contract terms before you sign anything.'],
      ['Do we need to hire anyone to work with Arcus?', 'No. A brand marketing lead who can say which questions matter is enough.'],
    ],
  },
  {
    slug: 'what-a-42x-view-gap-says-about-brand-voice', topic: 'Your audience', author: 'devin-min', date: D,
    title: 'What a 42x view gap says about your brand voice',
    dek: 'In 293 TikToks, an acted-out bit got 42 times the views of a sincere post. Here’s what that means for how a brand should sound.',
    short: 'It says the audience rewards a joke it can join, so a brand voice should play along with their bits rather than preach or start its own. In a real Arcus audience report for a streaming service, an acted-out bit had a median of 91,850 views against 2,171 for a sincere post and 1,675 for a brand post. Viewers liked the sincere posts at the same rate per view; they reached 42 times fewer people.',
    body: `
<h2 id="numbers">The numbers</h2>
<p>A streaming service wanted to know how to keep young men around between seasons. Arcus read men 18 to 24 in their own posts and comments on TikTok, Reddit, YouTube, X and Instagram, and counted what they did. On TikTok, that meant 293 posts from eight formats the audience runs themselves, like the boys’ group chat, the gym, the fantasy league and the boys’ trip. Each post was watched and sorted by hand. Three kinds matter here.</p>
<p>The kinds are simple. A bit is acted out and has a punchline. A sincere post is someone talking straight to camera about advice, motivation or a feeling. A brand post is a company account trying the same register; one in the set, a post selling an app, did 2,242 views, close to the brand median.</p>
<table><thead><tr><th>Kind of post</th><th>What it is</th><th>Posts</th><th>Median views</th><th>Likes on the top comment (median)</th></tr></thead><tbody>
<tr><td>The bit</td><td>A sketch with a punchline, acted out</td><td>30</td><td>91,850</td><td>242</td></tr>
<tr><td>The sincere post</td><td>Advice, motivation or a feeling, said straight to camera</td><td>68</td><td>2,171</td><td>3</td></tr>
<tr><td>The brand post</td><td>A company account trying the same register</td><td>25</td><td>1,675</td><td>1</td></tr>
</tbody></table>
<p>91,850 divided by 2,171 is 42. That’s the gap. Against a brand post it’s 55. The order held in seven of the eight formats. The biggest bit in the set, the boys’ group chat played as a hostage scene, did 22.5 million views. See the <a href="/reports/audience-report">audience report</a>.</p>

<h2 id="like-rate">Same like rate, 42 times the reach</h2>
<p>Here’s the part most teams miss. Per viewer, a sincere post is liked as often as a bit: 107 likes per 1,000 views for sincere, 106 for the bit. The people who saw the sincere posts liked them. Far fewer people saw them.</p>
<p>So viewers didn’t rate the sincere posts lower. The difference is how many people each kind reached. And under a bit, the comments become a second act. A quarter of the most-liked comments across the study played along with a bit: extending it, quoting it back, or pitching it as a film. The most-liked of those, under a group-chat sketch, read “could be a amazing movie if it was a real movie” and took 464,928 likes.</p>
<p>The top comment under a bit carried a median of 242 likes. Under a sincere post, 3. Under a brand post, 1. When a brand posts, the room has little to join.</p>

<h2 id="sincere">The sincere post that traveled</h2>
<p>One sincere post in the 293 broke out. A bricklayer posted a clip of his 19-year-old apprentice asleep after a 90-day outage: 5,007,997 views. Nothing about it was a bit. What it had was a real person in the frame, someone the viewer could recognize.</p>
<p>That’s the useful exception. Sincere content can work for this audience when someone real is on screen and the brand isn’t the one talking. It doesn’t work as a caption from a company account telling people how to feel.</p>

<h2 id="voice">What it means for your brand voice</h2>
<p>The report turned the counts into four rules. None of them asks a brand to be funnier than its audience.</p>
<ol>
<li><b>Play along.</b> Reply to the bit. Don’t start one. Be the callback, the riff, the pitch. A line the report offered as a model: “rewatch starts tonight. season 1, episode 1. the group chat has been warned.”</li>
<li><b>Tell, don’t ask.</b> State a time and when it comes back. Don’t ask the room a question. Questions were 3.9% of the most-liked comments. The model is a line from one of their own threads, 44 points: “It should not even be a question. We tee off at X o’clock.”</li>
<li><b>Hand over the mic.</b> Let a fan’s line be the caption. One of the service’s regional accounts posted a short line in the fans’ own voice for a men’s title and did 12.1 million views. The main US account’s biggest men’s post did 524,100.</li>
<li><b>No glossary.</b> No slang in the caption. One word in 62 they write is slang, and they use those words to judge things. See <a href="/library/how-young-audiences-write">how young audiences write</a>.</li>
</ol>
<p>The voice already existed inside the company, on its X account and its regional TikTok accounts. A short, flat line from the X account naming a season and episode, with a two-word sign-off, took more than 1,500 likes. The job was to move that voice to the main account. Most brands are in the same spot: someone on the team already writes like this.</p>
<p>There’s one more signal worth knowing. The audience grades the marketing. A comment giving the marketing team advice on how to bill the new season took 54,000 likes under one of the service’s trailers. When the marketing talked like a fan, the replies said so. They notice either way.</p>

<h2 id="checklist">Run it on your own account</h2>
<ol>
<li>Pull your last 30 posts on one platform and the views for each.</li>
<li>Label each one: a bit, a sincere post, a product post, other. Watch them; don’t guess from the caption.</li>
<li>Find the median views for each label. Divide the biggest by the smallest.</li>
<li>Read the top comment under each post and note its likes. Where is the room joining in?</li>
<li>Find the accounts your audience already follows for the bit you want. Could you reply there instead of posting?</li>
<li>Rewrite your next five captions with the four rules. No questions to the room. No slang. A time, if there is one.</li>
<li>Compare medians after a month.</li>
</ol>
<p>Questions worth asking your team: Which of our posts are bits, and how did they do against the rest? Who on our side already writes in the audience’s voice? What could we reply to this week instead of posting?</p>

<h2 id="limits">Common mistakes, and what this doesn’t prove</h2>
<ul>
<li><b>Making the brand the comedian.</b> Brand posts did worst of the three kinds. The rules are about joining, not performing.</li>
<li><b>Writing off sincerity.</b> The like rate was the same. Put a real person in the frame.</li>
<li><b>Copying the format without the room.</b> A bit works because the audience already runs it. Find theirs first.</li>
<li><b>Reading averages.</b> One 22.5 million view post would swamp an average. Medians keep the comparison fair.</li>
</ul>
<p>The counts come from one audience, men 18 to 24, on public TikTok posts in eight formats, sorted by hand in September 2026. They show what gets watched and joined. They don’t show that a bit will move sign-ups or viewing for your brand. That needs your own numbers lined up against the posts, and a test. Listening that counts is covered in <a href="/library/social-listening-that-counts">this guide</a>.</p>
<p>To run this count on your own audience, ${fr('try it free')} with a question like “What does our audience reward that we never post?” We line up what people say online with your own numbers and walk you through the answer in 30 minutes.</p>`,
    faq: [
      ['Does this apply to audiences other than young men?', 'The numbers are from one audience. The method applies anywhere: sort posts by kind, compare medians, read the top comments. Your audience may reward something different.'],
      ['Should a brand post bits at all?', 'Brand attempts at the register did worst in this study. Replying to the audience’s bits, and letting a fan’s line be the caption, did better.'],
      ['Why compare medians?', 'A few posts with tens of millions of views would swamp an average. The median is the middle post, so it shows what a typical post of each kind does.'],
    ],
  },
  {
    slug: 'how-young-audiences-write', topic: 'Your audience', author: 'min-kwak', date: D,
    title: 'How young audiences write, counted',
    dek: 'Five-word lines, one slang word in 62, almost no hashtags. What thousands of comments show about how young men write, and the voice rules that follow.',
    short: 'Short, first person and almost never with a hashtag. In a real Arcus audience report, men 18 to 24 wrote five-word lines, used one slang word in every 62, and put a hashtag in 0.2% of comments, while the brand’s own captions carried one 92.5% of the time. Write shorter, drop the hashtags, and leave the slang to them.',
    body: `
<h2 id="how">How they write</h2>
<p>For a streaming service, Arcus measured 2,965 comments in the TikTok formats men 18 to 24 run themselves, then measured the brand’s own TikTok captions from the same month with the same script. Same rules, both sides.</p>
<table><thead><tr><th>Measure</th><th>Their comments</th><th>The brand’s captions</th></tr></thead><tbody>
<tr><td>Words in a typical line</td><td>5</td><td>8</td></tr>
<tr><td>Ends in a full stop</td><td>4.9%</td><td>35%</td></tr>
<tr><td>Says I, me or we</td><td>37%</td><td>5%</td></tr>
<tr><td>Carries a hashtag</td><td>0.2%</td><td>92.5%</td></tr>
<tr><td>All lower case</td><td>27.6%</td><td>Not measured</td></tr>
<tr><td>Swears</td><td>3.4%</td><td>Not measured</td></tr>
</tbody></table>
<p>One of the service’s competitors already captions at the audience’s rate. The brand’s typical caption was eight words, a full stop and a show hashtag. The audience noticed. Under one of the brand’s posts, a reply asked, less politely, who wrote the caption. They can hear a script in a few words. See the <a href="/reports/audience-report">audience report</a>.</p>

<h2 id="reward">What they reward</h2>
<p>Arcus labeled the three most-liked comments under every post in ten TikTok pulls, 360 comments in all, with one kind each.</p>
<table><thead><tr><th>Kind of comment</th><th>Share of the 360</th><th>A real example, with likes</th></tr></thead><tbody>
<tr><td>Plays along with the bit</td><td>25%</td><td>“could be a amazing movie if it was a real movie” (464,928)</td></tr>
<tr><td>A flat verdict</td><td>13.9%</td><td>“Tuff and cringe at the same time” (86,630)</td></tr>
<tr><td>Roast or banter</td><td>10.8%</td><td>“What he be sounding like” (53,948)</td></tr>
<tr><td>Joke at own expense</td><td>10.6%</td><td>Under a friends’ trip post (21,418)</td></tr>
<tr><td>Sincere</td><td>10.3%</td><td>“That ain’t a lazy sleep that’s an exhausted sleep” (143,571)</td></tr>
<tr><td>Hype, superlative praise</td><td>8.1%</td><td>“you got them mad, i like you” (227,672)</td></tr>
<tr><td>A question</td><td>3.9%</td><td></td></tr>
<tr><td>Plain reaction</td><td>3.9%</td><td></td></tr>
<tr><td>Sarcasm, deadpan</td><td>2.8%</td><td>A reply calling it bad and promising to watch anyway</td></tr>
<tr><td>A demand on the poster</td><td>2.5%</td><td></td></tr>
</tbody></table>
<p>Jokes of some kind make up 49%. Sincere lines are about one in ten of the top comments, though they’re 14% of a random sample: they write sincerely more often than the room rewards it. Sarcasm is one comment in 36, but when it lands it’s the second most-liked kind, with a median of 9,796 likes. It’s aimed at the post, never at other commenters. Questions are rare. They don’t ask the room.</p>
<p>What they talk about matters as much as how. Across 4,283 questions on one large men’s forum, 36.7% were about dating and relationships. Among the 57 posters who stated an age of 18 to 24, it was 36.8%. Hobbies, games and entertainment made up 1.9%. They don’t ask each other what to watch. They talk under the show itself: 78,682 comments under four of the service’s trailers on YouTube. A brand that wants to join the conversation should go to that thread, not start a new one.</p>

<h2 id="words">Their words, counted</h2>
<p>Across 6,622 comments from their rooms, Arcus counted each term once per comment.</p>
<table><thead><tr><th>The words they use</th><th>Per 1,000 comments</th><th>The glossary words</th><th>Per 1,000 comments</th></tr></thead><tbody>
<tr><td>😭 (crying-laughing)</td><td>63</td><td>unc</td><td>0.8</td></tr>
<tr><td>bro</td><td>40</td><td>sigma</td><td>0.6</td></tr>
<tr><td>peak</td><td>8.3</td><td>mog</td><td>0.6</td></tr>
<tr><td>real</td><td>7.9</td><td>skibidi</td><td>0.2</td></tr>
<tr><td>aura</td><td>5.7</td><td>67</td><td>0.2</td></tr>
<tr><td>lock in</td><td>5.7</td><td>rizz</td><td>0</td></tr>
<tr><td>fr</td><td>4.1</td><td>huzz</td><td>0</td></tr>
<tr><td>cinema</td><td>1.7</td><td>gyat</td><td>0</td></tr>
</tbody></table>
<p>The most searched slang of 2025 barely shows up. “6-7,” at 141,000 searches, appears in one comment. “Huzz,” at 61,000, appears in none. Meanwhile a 450-term slang glossary was being sold on X with the pitch “You don’t know the language? You’re invisible.” (1,378 likes).</p>
<p>The words they do use are verdicts on the work. They apply them to a scene, a fight or an actor: “Deadass that was goated acting,” 41,254 likes. Coming from a brand, the same words read as decoration. The report also cites a 2025 Journal of Marketing Research study in which slang in brands’ posts cost them likes and sales, in every age group.</p>

<h2 id="rules">The voice rules that follow</h2>
<ol>
<li><b>Play along.</b> Reply to their bit. Don’t start one. The top comment under a bit gets a median of 242 likes; under a sincere post, 3.</li>
<li><b>Tell, don’t ask.</b> A statement with a time in it. Questions are 3.9% of what the room rewards.</li>
<li><b>Hand over the mic.</b> Let a fan’s line be the caption.</li>
<li><b>No glossary.</b> No slang in the caption, and no hashtag stack. Write like the brand’s best account already does.</li>
</ol>
<p>The 42x view gap behind the first rule is covered in <a href="/library/what-a-42x-view-gap-says-about-brand-voice">this guide</a>.</p>
<p>One model line from their own rooms shows the second rule: “It should not even be a question. We tee off at X o’clock.” A statement, a time, and the assumption that you’re coming. Under one trailer, “same time next year?” took 4,938 likes: the fans set the cadence themselves. The brand’s job is to say when, and then show up.</p>

<h2 id="checklist">A caption check you can use tomorrow</h2>
<ul>
<li>Five to eight words. Cut the rest.</li>
<li>No hashtag, unless the platform needs one to find the post.</li>
<li>No word from a slang list. If you looked it up, cut it.</li>
<li>No question to the audience. Say when, and what.</li>
<li>Could a fan have written it? If not, find a fan’s line and use that.</li>
<li>Read it aloud to someone in the audience. If they wince, start over.</li>
</ul>
<p>Questions worth asking your team: How long are our captions compared with our audience’s comments? How many carry a hashtag? Which of our posts got a reply like “who wrote this”? Who on the team writes our best-performing lines?</p>

<h2 id="limits">Common mistakes, and what this doesn’t prove</h2>
<ul>
<li><b>Trusting a glossary.</b> The most searched words were nearly absent from the comments.</li>
<li><b>Reading sarcasm as negative.</b> “This looks bad. I’ll be watching.” means “I’m in.”</li>
<li><b>Measuring the audience and not the brand.</b> The gap only shows when both are counted the same way.</li>
<li><b>Asking the room a question.</b> Questions were 3.9% of the top comments. A caption that asks “who’s watching tonight?” asks for something the audience rarely gives.</li>
</ul>
<p>The counts describe one audience, men 18 to 24, on public posts in September 2026. One reader labeled the 480 hand-sorted comments, and every label is filed. Instagram returns no like counts on comments, so Instagram examples carry none. The counts show how the audience writes and what it rewards. They don’t prove a caption change will move viewing. Lining your posts up with your own numbers comes next. To see how your own audience writes, ${fr('try it free')}.</p>`,
    faq: [
      ['Should brands ever use slang?', 'In this study, the audience used slang to judge things, at about one word in 62. A brand adding it reads as decoration, and a cited 2025 study found it cost brands likes and sales.'],
      ['What is the crying-laughing emoji doing at the top?', 'It appears in 63 of every 1,000 comments, more than any word. It works as a reaction, so it tells you more about tone than vocabulary.'],
      ['Does this apply to young women, or other ages?', 'The counts are for men 18 to 24. The method applies to any audience: measure their comments and your captions with the same rules, then compare.'],
    ],
  },
  {
    slug: 'facebook-watches-but-doesnt-share', topic: 'Your data', author: 'min-kwak', date: D,
    title: 'Facebook watches but doesn’t share. What to post where',
    dek: 'One brand’s Facebook gave a how-to 37,836 views and zero shares. What the counts say about what to post on Facebook and Instagram.',
    short: 'In one brand’s data, Facebook audiences watched useful, repeatable tricks and almost never passed anything on. In a real Arcus content report for a hard seltzer brand, Facebook posts averaged 1.2 shares each, 24 of 29 posts got zero or one, and the biggest post on either platform, a how-to with 37,836 views, got none. Post watchable tricks on both platforms, and give Instagram the friend-group jokes made to be sent.',
    body: `
<h2 id="side-by-side">The two platforms side by side</h2>
<p>A hard seltzer brand ran one summer campaign on Instagram and Facebook. Arcus watched every post, sorted each one by what was on screen, and read views and shares from the brand’s own social export. Platforms were never added together. See the <a href="/reports/content-report">content report</a>.</p>
<table><thead><tr><th></th><th>Instagram</th><th>Facebook</th></tr></thead><tbody>
<tr><td>Posts</td><td>39</td><td>29</td></tr>
<tr><td>Average views per post</td><td>8,148</td><td>3,230</td></tr>
<tr><td>Average shares per post</td><td>36</td><td>1.2</td></tr>
<tr><td>Biggest post by views</td><td>Slushie how-to, 32,910</td><td>Slushie how-to, 37,836</td></tr>
<tr><td>Most shared post</td><td>A joke about friends, 409 shares</td><td>Cans in hot dog buns, 12 shares</td></tr>
</tbody></table>
<p>Same brand, same summer, often the same video. On Facebook, 24 of 29 posts got zero or one share.</p>
<p>Why sort by what’s on screen? Because the campaign name tells you what the brief intended, and the screen tells you what the viewer got. Sorted by the screen, the same pattern appeared on both platforms for the tricks, and two very different patterns appeared for everything else.</p>

<h2 id="watched">What Facebook watched</h2>
<p>The how-to won. The slushie post, which turned the can into a frozen drink you could make at home, did 37,836 views on Facebook. That’s 11.7 times the Facebook average and the biggest post on either platform. It got zero shares.</p>
<p>Hosting hacks, the group of posts built on a trick with the can, led on Facebook views with a median of 4,509, 1.4 times the average. It led on Instagram too. That’s the one pattern that worked on both platforms. On Facebook, though, the slushie post carried 80% of the group’s views. The other three hosting posts did 6,832, 2,186 and 686 views.</p>
<p>One still image got passed on. Cans tucked into hot dog buns did 11,388 views and 12 shares, the only Facebook post in double digits. It never ran on Instagram.</p>
<p>Put those together and Facebook’s taste is clear in this data. A how-to with a step you can repeat. A product doing something silly in a single frame. Things that are useful or quick to get. The posts that depended on a shared moment, or on knowing who your friends are, didn’t travel there.</p>

<h2 id="died">What didn’t travel to Facebook</h2>
<p>Instagram’s biggest share hits didn’t carry over. A joke about the viewer’s friends going back to work after a big summer tournament took 409 shares on Instagram, 11 times the Instagram average for shares. On Facebook it did 415 views and one share. The three tournament posts did 739, 598 and 415 views there. The most viewed of them on Instagram, a nine-slide carousel with 29,864 views, never ran on Facebook at all.</p>
<p>The report’s read: sharing about a moment people were in, with friends in the joke, is an Instagram behavior for this brand. On Facebook, the same audience watches what’s useful and keeps it to itself.</p>

<h2 id="where">What to post where</h2>
<table><thead><tr><th>What’s on screen</th><th>On Instagram</th><th>On Facebook</th><th>Do this</th></tr></thead><tbody>
<tr><td>A trick you could copy tonight</td><td>2.36x average views</td><td>1.4x average views</td><td>Post on both. Lead Facebook with it.</td></tr>
<tr><td>A joke about friends or a shared moment</td><td>Top shares on the account</td><td>Under 1,000 views</td><td>Instagram first.</td></tr>
<tr><td>The can as the character</td><td>Shares when the can does something on screen</td><td>The only double-digit share post</td><td>Both. Try stills on Facebook.</td></tr>
<tr><td>Unusual places with nothing happening</td><td>0.30x average views</td><td>0.13x average views</td><td>Rethink. Make something happen.</td></tr>
<tr><td>3D animation</td><td>Lowest on the account</td><td>Not in the Facebook set</td><td>Stop.</td></tr>
</tbody></table>
<p>The point isn’t that Facebook is weak. It delivered the single biggest post of the summer. It does a different job: reach for useful things. Planning it like a smaller Instagram wastes that.</p>
<p>A simple way to test it: take one friend-group post that worked on Instagram and run it on both platforms in the same week, alongside a new how-to made for Facebook. Compare each platform against its own average. One round won’t settle it, but two or three will show you whether the pattern holds for your brand.</p>

<h2 id="checklist">A checklist for your next plan</h2>
<ol>
<li>Pull views and shares per post for each platform separately. Work out each platform’s own average.</li>
<li>Sort posts by what’s on screen, and give each group a median on each platform.</li>
<li>Mark the groups that lead on views on both platforms. Those are your safe cross-posts.</li>
<li>Mark the posts that took shares on one platform and died on the other. Plan those for the platform that shares.</li>
<li>On a platform where most posts get zero or one share, judge on views. Ignore share rate there.</li>
<li>Try one format made for the platform that watches: a still, a how-to, a step people can repeat.</li>
</ol>
<p>Questions worth asking your team: Do we read each platform against its own average? Which of our posts ran on one platform only, and why? Which format would we make only for Facebook?</p>

<h2 id="limits">Common mistakes, and what this doesn’t prove</h2>
<ul>
<li><b>Adding platforms together.</b> A combined number hides that one platform shares and the other doesn’t.</li>
<li><b>Judging Facebook on Instagram’s winners.</b> The posts that won Instagram on shares were among the weakest on Facebook. Read each platform on its own terms.</li>
<li><b>Ranking Facebook by share rate.</b> With 24 of 29 posts at zero or one share, the rate ranks groups on single shares. It’s noise.</li>
<li><b>Cross-posting everything.</b> Sixteen Facebook posts used the same video as an Instagram post. Some of the best Instagram posts never made it over, and some did nothing there.</li>
</ul>
<p>The samples are small. Every Facebook group is eight posts or fewer, and groups under four posts are directional. Three Facebook photo posts couldn’t be fetched and took their Instagram twin’s label on an exact caption match. Share counts come from the brand’s social tool; Instagram exposes no share count to any tool, so they can’t be checked against the platform. This is one brand, one summer. It shows what happened on each platform. It doesn’t show why, and it doesn’t show which posts sold. For that, posts need lining up with your own numbers. Our guide to <a href="/library/watched-vs-shared-share-rate">watched versus shared</a> covers the share math. To see what your own platforms do, ${fr('try it free')}.</p>`,
    faq: [
      ['Should we stop posting on Facebook?', 'Not on this evidence. Facebook gave the brand its single biggest post. It watched useful tricks and didn’t share, so plan it for reach.'],
      ['Is this true for every brand?', 'It’s one brand’s summer. The method transfers: read each platform against its own average and see which job it does for you.'],
      ['Why didn’t the shared posts work on Facebook?', 'The data shows that they didn’t, not why. A test, like running the same friend-group post on both platforms in the same week, is the way to find out.'],
    ],
  },
  {
    slug: 'watched-vs-shared-share-rate', topic: 'Measurement', author: 'nazeem-ahmed', date: D,
    title: 'Watched or shared? The hosting hack pattern and the share-rate math',
    dek: 'Some posts get watched. Others get sent to a friend. How to tell them apart, and why share rate on its own can mislead you.',
    short: 'Views tell you a post got watched; shares tell you someone sent it on, and the two reward different things. In a real Arcus content report, hosting hacks led Instagram views at 2.4 times the average but sat below average on shares, while a joke about the viewer’s friends took 409 shares on 8,000 views. Read shares per 1,000 views next to views, because a high rate on a small post can mean very little.',
    body: `
<h2 id="jobs">Two jobs, two numbers</h2>
<p>A view means someone stopped. A share means someone thought of a friend and sent it. Both are good. They’re different jobs, and in a real Arcus content report for a hard seltzer brand, the posts that did one were rarely the posts that did the other. See the <a href="/reports/content-report">content report</a>.</p>
<p>On Instagram the account averaged 8,148 views and 36 shares per post across 39 posts. Here are the top four posts by each measure.</p>
<table><thead><tr><th>Top four by views</th><th>Views</th><th>Shares</th><th>Top four by shares</th><th>Views</th><th>Shares</th></tr></thead><tbody>
<tr><td>Slushie how-to</td><td>32,910</td><td>49</td><td>Friends back at work after the tournament</td><td>8,000</td><td>409</td></tr>
<tr><td>Tournament carousel</td><td>29,864</td><td>46</td><td>A sign held up from a balcony</td><td>16,713</td><td>201</td></tr>
<tr><td>Expiration-date photo</td><td>25,657</td><td>34</td><td>The can as a character</td><td>22,834</td><td>138</td></tr>
<tr><td>The can as a character</td><td>22,834</td><td>138</td><td>Foil fruit</td><td>11,640</td><td>69</td></tr>
</tbody></table>
<p>Only one post is on both lists.</p>
<p>That post is the exception that explains the rule. The can was the character, on screen the whole time, with the joke happening to it. It was watched like a trick and sent like a joke. The report found the same thing in the next two most shared product posts: the can doing something on screen, not sitting in a hand.</p>

<h2 id="hosting">The hosting hack pattern</h2>
<p>The group that got watched was hosting hacks: a trick with the can you could copy tonight. On Instagram its median was 19,188 views, 2.36 times the account average. It led on Facebook too, at 1.4 times. The three biggest hosting posts showed the can frozen, disguised or turned into dessert. Each showed a step you could repeat at home.</p>
<p>Now look at its shares. The median was 26, below the account’s 36. People watched the trick and mostly didn’t send it. That’s fine. It’s the reach engine. The report’s call was to keep it and make more: a physical trick with the can that someone could copy tonight.</p>
<p>Shares came from somewhere else:</p>
<ul>
<li><b>A joke about the viewer’s friends.</b> A guy in a team shirt mopes from couch to stoop, can in hand, with one line of text about his friends going back to work. 409 shares.</li>
<li><b>A moment people were in.</b> The sign on the balcony: one line of text, and the joke reads with the sound off. 201 shares.</li>
<li><b>The can as the character.</b> Product posts shared when the can was doing something on screen: 138, 69 and 43 shares for the top three.</li>
</ul>

<h2 id="math">The share-rate math</h2>
<p>Share rate puts shares on the same scale as views. The easiest version to read is shares per 1,000 views:</p>
<blockquote>shares ÷ views × 1,000 = shares per 1,000 views</blockquote>
<p>Worked from the report’s numbers:</p>
<table><thead><tr><th>Post</th><th>Views</th><th>Shares</th><th>Shares per 1,000 views</th></tr></thead><tbody>
<tr><td>Friends back at work</td><td>8,000</td><td>409</td><td>51</td></tr>
<tr><td>Balcony sign</td><td>16,713</td><td>201</td><td>12</td></tr>
<tr><td>The can as a character</td><td>22,834</td><td>138</td><td>6</td></tr>
<tr><td>Slushie how-to</td><td>32,910</td><td>49</td><td>1.5</td></tr>
</tbody></table>
<p>The friends post was sent on at 51 per 1,000 views. Nothing else on the account was above about 12. That’s a different kind of post, and the rate shows it.</p>
<p>Why per 1,000 views and not shares alone? Because views and shares grow together. A post with four times the views can collect more shares without being any more shareable. Dividing by views takes reach out of the comparison and leaves the question you care about: of the people who saw it, how many sent it on?</p>

<h2 id="mislead">When share rate misleads</h2>
<p>A rate with a small number underneath it jumps around. Here are the median share rates by group on Instagram, next to median views:</p>
<table><thead><tr><th>Group</th><th>Median views</th><th>Median share rate</th></tr></thead><tbody>
<tr><td>3D animation (2 posts)</td><td>1,139</td><td>0.9%</td></tr>
<tr><td>Workday escape</td><td>3,962</td><td>0.52%</td></tr>
<tr><td>Unusual hangouts</td><td>2,415</td><td>0.49%</td></tr>
<tr><td>Can tricks and gags</td><td>6,107</td><td>0.21%</td></tr>
<tr><td>Hosting hacks</td><td>19,188</td><td>0.14%</td></tr>
</tbody></table>
<p>Ranked by share rate alone, 3D animation wins and hosting hacks comes last. Ranked by views, it’s nearly the reverse. The 3D group was two posts at the bottom of the account, and the report retired it. A few shares on a small post make a big rate. Facebook is the extreme case: with 24 of 29 posts at zero or one share, the report called share rate noise there. More on that in <a href="/library/facebook-watches-but-doesnt-share">what to post where</a>.</p>

<h2 id="read">How to read both: a checklist</h2>
<table><thead><tr><th></th><th>High share rate</th><th>Low share rate</th></tr></thead><tbody>
<tr><td><b>High views</b></td><td>Rare. Make more, fast.</td><td>Watched. Keep it for reach. Test a friend-group frame on top.</td></tr>
<tr><td><b>Low views</b></td><td>Check the count underneath. Run more before you call it.</td><td>Stop or rethink.</td></tr>
</tbody></table>
<ol>
<li>Work out views and shares per 1,000 views for every post, per platform.</li>
<li>Put both on the group scorecard, with the median for each.</li>
<li>Ignore share rate where most posts have zero or one share.</li>
<li>Check how many posts sit behind each group. Under four is directional.</li>
<li>For your best reach format, write one version with the viewer’s friends in the joke and compare its share rate.</li>
</ol>
<p>That last step is the report’s own test. Run hosting hacks and the can posts with a friend-group frame on top, the kind of setup where the next move is to send it to someone, and watch whether the share rate moves while views hold.</p>
<p>Questions worth asking your team: Do we track shares per 1,000 views, by platform? Which posts got watched and which got sent? What would we change about our best-watched format to make it shareable?</p>

<h2 id="limits">Common mistakes, and what this doesn’t prove</h2>
<ul>
<li><b>Chasing the one viral share post.</b> Name what it had, a moment or a friend, and test that on formats you already make well.</li>
<li><b>Ranking groups on share rate alone.</b> Small posts win on paper.</li>
<li><b>Treating shares as sales.</b> A share is a strong signal that someone cared. It’s not a purchase.</li>
<li><b>Forgetting the platform.</b> The friends post took 409 shares on Instagram and one on Facebook. Rates belong to one platform at a time.</li>
</ul>
<p>Share counts here come from the brand’s social tool. Instagram exposes no share count to any tool, so they can’t be checked against the platform. The tournament group was three posts and directional, and the tournament is over: the real test is whether the next big shared moment does the same. None of this shows which posts sold. That takes lining posts up with your own numbers. To see that on your own posts, ${fr('try it free')} with a question like “Which of our shared posts moved sales?”</p>`,
    faq: [
      ['What is a good share rate?', 'It depends on the account. Compare each post with your own account’s rate, per platform, and always next to views.'],
      ['Should we optimize for views or shares?', 'Both, with different posts. In this report, tricks people could copy drove views, and jokes about friends or a shared moment drove shares.'],
      ['Why shares per 1,000 views instead of a percentage?', 'It’s the same math. Per 1,000 is easier to read when rates are small: 51 per 1,000 instead of 5.1%.'],
    ],
  },
  {
    slug: 'does-retail-eat-online-sales', topic: 'Market moves', author: 'brendon-ghaderi', date: D,
    title: 'Does retail eat online sales? What five brands that moved into retail show',
    dek: 'Hero, Bubble, Harry’s, Liquid Death and Poppi moved from online into retail. Here’s what happened to their online business, and what their media did.',
    short: 'Not at any of the five brands in a real Arcus case series: Hero, Bubble, Harry’s, Liquid Death and Poppi. The online share of sales shifted as retail grew, but demand didn’t move away; industry research across $848 billion of transactions found a new retail location lifts nearby online sales 6.9%, and 13.9% for direct-to-consumer brands. What retail does eat is margin: the retailer’s cut, trade spend, slotting and deductions.',
    body: `
<h2 id="answer">The answer, brand by brand</h2>
<p>A skincare brand moving into retail asked Arcus a question before writing its media plan: will the shelf eat our online sales? Arcus studied five direct-to-consumer brands that made the same move, from public sources, with every number traced to a page. The answer came as ten slides, a list of all 157 sources, and 14 more slides showing the source page behind each number, captured on September 10, 2026. See the <a href="/reports/market-report">market report</a>.</p>
<table><thead><tr><th>Brand</th><th>What happened to the online business as retail scaled</th></tr></thead><tbody>
<tr><td>Hero</td><td>Amazon was still the majority of revenue at the $630 million sale. First in its Amazon category in 2024.</td></tr>
<tr><td>Bubble</td><td>The site became the community and launch channel. Over $100 million a year across 17,000-plus doors (retail locations).</td></tr>
<tr><td>Harry’s</td><td>Almost 500,000 subscribers added at 80% repeat in the Target launch year. Target sold the subscription.</td></tr>
<tr><td>Liquid Death</td><td>Dropped its own online fulfillment by choice and sent site shoppers to Amazon and retail. $333 million of retail sales in 2024.</td></tr>
<tr><td>Poppi</td><td>Still the top-selling soft drink on Amazon past 30,000 doors. 2024 growth came from volume where it was already sold.</td></tr>
</tbody></table>
<p>Retail didn’t cannibalize online demand at any of the five. The share shifted, and the online business grew or, in Liquid Death’s case, was handed to Amazon and retail on purpose. The cannibalization that is real is margin: the retailer’s cut, trade spend (what a brand pays retailers for promotions and placement), slotting fees (what it pays to get on the shelf) and deductions.</p>

<h2 id="why">Why the two channels fed each other</h2>
<ol>
<li><b>The halo is measurable.</b> A new retail location lifts online sales in its area by 6.9%, and by 13.9% for direct-to-consumer brands, according to industry research across $848 billion of transactions.</li>
<li><b>One price, different counts by channel.</b> Hero holds $12.99 everywhere and changes the count. Bubble prices Walmart three cents under its own site.</li>
<li><b>The site keeps a job the shelf can’t do.</b> Harry’s subscription, Hero’s community reviews, Bubble’s ambassadors, Poppi’s founder posts.</li>
<li><b>Amazon is the signal buyers read.</b> Retailers “see Amazon success as validation.” Poppi’s Amazon rank went into its line reviews, the meetings where a retailer decides which products stay on the shelf.</li>
<li><b>The shelf reaches people the site never did.</b> Two thirds of Harry’s early Target buyers had never bought a razor at Target.</li>
</ol>

<h2 id="media">What the media did</h2>
<p>The launches that worked pointed media at one retailer’s shelf, in the week the product landed there.</p>
<ul>
<li><b>Hero at Target, 2019.</b> TikTok videos named the retailer and asked people to photograph the shelf. It “helped to double Hero’s sales goals at Target,” at seven times the cost-efficiency of Instagram Stories. Target then expanded the range.</li>
<li><b>Bubble at Walmart and Target.</b> Ambassadors’ faces on the Walmart end-of-aisle displays, a Snapchat filter and live TikTok in launch week. At Target, a 380,598-person list at a 74% open rate, sent to one shelf display in one week.</li>
<li><b>Poppi, from Amazon to 30,000 doors.</b> One founder video: “over $100,000 on Amazon while we were sleeping.” The Amazon rank became the slide in the line review. TikTok carried most of the paid media.</li>
</ul>
<p>Retail media was bought for position. Hero’s attributed sales on Target’s network rose 824% ten months after joining, in a vendor’s case study. The report also cites 247% in attributed sales across newer retail media marketplaces, and one line sums up the approach: “We’re willing to accept a lower ROAS on these new marketplaces.” What the networks sell is rank in the retailer’s own search and measurement against the retailer’s own transactions. Those attributed sales land in the buyer’s dashboard. The member bases are large: more than 100 million Target Circle members, about 44 million Ulta members, and more than 90 million CVS ExtraCare members.</p>

<h2 id="buyer">The four numbers the buyer reads</h2>
<p>Retail buyers judge a brand on four numbers: ACV (how much of the retailer’s volume sits in doors that carry you), units per door per week against the category, household penetration, and repeat. A count of doors is a count. These are what buyers manage to.</p>
<p>Harry’s published its early read: 10% of Target’s cartridge sales and about 50% of handles within four weeks, then sales and penetration tripled by month eight. Those numbers helped sell Walmart. Poppi’s growth at 30,000 doors came from volume where it was already sold, with repeat over 40%. That growth is what PepsiCo paid $1.95 billion for.</p>
<p>The point for a media plan: the buyer reads these numbers at the next review, and the next retailer reads them before saying yes. Media that moves one retailer’s sales rate in the week the product lands shows up in all four. Media that only moves impressions shows up in none of them.</p>

<h2 id="checklist">Five moves for the media plan, and what to ask</h2>
<ol>
<li><b>Point launch media at one retailer’s shelf in the week your product lands there.</b> Measure the lift in that retailer’s sales rate, not impressions.</li>
<li><b>Fund retail media from the trade budget, network by network.</b> Buy search rank and new-to-brand share. Accept a lower ROAS for position.</li>
<li><b>Give the site and Amazon jobs the shelf can’t do.</b> A subscription or a drop, reviews syndicated to every listing, one price with counts by channel.</li>
<li><b>Report ACV, sales rate, penetration and repeat.</b> Publish a four-week read after the next launch, the way Harry’s did.</li>
<li><b>Audit product claims before the media runs.</b> The comment section follows the product onto every retailer’s review tab. Poppi’s claim cost $8.9 million.</li>
</ol>
<p>Questions worth asking your team before a retail launch: Which retailer and which week is the launch media pointed at? How will we show that retailer’s sales rate moved? Is retail media coming from the trade budget or the brand budget? Which of our product claims would hold up on a review tab?</p>

<h2 id="limits">Common mistakes, and what this doesn’t prove</h2>
<ul>
<li><b>Planning for lost demand that the cases don’t show.</b> Plan for margin instead.</li>
<li><b>Reporting doors.</b> Buyers manage to the four numbers.</li>
<li><b>Different prices on different channels.</b> The cases held one price and changed the count.</li>
<li><b>Judging retail media on ROAS alone.</b> The cases bought it for rank and accepted a lower return.</li>
</ul>
<p>These are five brands that succeeded, studied from public filings, interviews, trade press, retailer media networks and marketplace listings. Brands that moved into retail and struggled are less likely to publish. The 824% figure is a vendor’s case study. The halo figures are averages across many brands, not a forecast for yours. The cases show what happened. Whether your launch media moves a retailer’s sales rate is something your own numbers can show, launch by launch, once retailer data, sales and media sit in one place you own. To start, ${fr('try it free')} with a question like “Did our launch media move the retailer’s sales rate?”</p>`,
    faq: [
      ['Will opening in retail hurt our online sales?', 'Not at any of the five brands studied. The online share shifted as retail grew, and research found online sales rise near a new retail location. The real cost is margin.'],
      ['What should launch media measure?', 'The lift in one retailer’s sales rate in the week the product lands on the shelf. Buyers read ACV, units per door per week, household penetration and repeat.'],
      ['Is retail media worth it at a lower ROAS?', 'The brands studied bought it for search rank and new-to-brand share, and accepted a lower ROAS for that position. Judge it on what the buyer sees at the next review.'],
    ],
  },
];

export const bySlug = Object.fromEntries(ARTICLES.map((a) => [a.slug, a]));
