// Monthly "Live Teardown". Add a date to an episode to publish its Event structured data.
// Every campaign in this series is a made-up example built by Arcus; label its numbers "Example".
export const SERIES = {
  name: 'Live Teardown',
  lead: 'Once a month, we take one example campaign apart, live: which spend paid off, what fell flat, and the one test worth running before you move budget. 45 minutes. No data background needed.',
  hosts: ['devin-min', 'min-kwak'],
  platform: null, // Not shown on the site. Set to the webinar tool’s name once chosen (see docs/PLACEHOLDERS-RESOLVED.md).
};
export const EPISODES = [
  { n: 1, slug: 'the-creator-nobody-paid', title: 'The creator nobody paid', date: null, body: 'Example: sales jump 18% in week 3, and nobody can say why. We put the brand’s sales and CRM next to what people posted that week, and find 1,240 TikTok and Reddit posts about one creator the brand never paid. Then we plan the test that shows whether that creator moved sales.', take: 'How to test a creator before you pay them: half your regions, your own sales.' },
  { n: 2, slug: 'the-creator-codes-and-the-coupon-sites', title: 'The creator codes and the coupon sites', date: null, body: 'An example creator recap that counts every use of every discount code. We trace how codes travel to coupon sites, set those uses aside, and show what each creator’s number looks like without them. Min walks through what creator recaps get right.', take: 'Five questions to ask about creator codes before the next budget decision.' },
  { n: 3, slug: 'the-launch-recap', title: 'The launch recap', date: null, body: 'An example launch recap reporting tickets, sign-ups and viewing across paid social, trailers and creators. We line each reported result up with the brand’s own numbers by date and region, then add what people said in the trailer comments, counted, next to the results.', take: 'What to ask for in a launch recap before anyone writes it.' },
];
