/**
 * Central event configuration — update this file each year.
 * Used for page copy, SEO, structured data (JSON-LD), and llms.txt.
 */
import { lendCityText } from '../lib/lendcity-mark';
export const event = {
  year: 2026,
  name: 'LendCity Charity Golf Tournament',
  shortName: 'LendCity Golf Classic',
  tagline: 'Annual charity golf tournament in Windsor-Essex supporting Harmony In Action',

  date: '2026-07-17',
  dateDisplay: 'Friday, July 17, 2026',
  registrationDeadline: '2026-07-01',
  registrationDeadlineDisplay: 'July 1, 2026',
  startTime: '08:00',
  shotgunStart: '09:30',

  venue: {
    name: 'Sutton Creek Golf Course',
    street: '2135 County Rd 12',
    city: 'Essex',
    region: 'ON',
    postalCode: 'N8M 2X6',
    country: 'CA',
    geo: { latitude: 42.1759, longitude: -82.8198 },
    mapsUrl: 'https://maps.google.com/?q=Sutton+Creek+Golf+Course+Essex+ON',
  },

  beneficiary: {
    name: 'Harmony In Action',
    url: 'https://www.harmonyinaction.com/',
    description:
      'Inclusive day programs and respite services for adults with disabilities across Windsor and Essex County.',
  },

  organizer: {
    name: 'LendCity',
    url: 'https://lendcity.ca/',
    email: 'events@lendcity.ca',
    phone: '+1-519-252-1207',
  },

  pricing: {
    individual: 180,
    foursome: 720,
    currency: 'CAD',
  },

  /** Sponsorship tiers — update annually from the sponsorship package PDF */
  sponsorshipTiers: [
    { name: 'Platinum Sponsor', price: 3000, description: 'Logo on correspondence, hole sign, cart sign, 4 golfer entries, website & social recognition' },
    { name: 'Gold Sponsor', price: 2000, description: 'Hole sign, cart sign, 2 golfer entries, website & social recognition' },
    { name: 'Welcome Golf Bag Sponsor', price: 2000, description: 'Branded item in each welcome bag, 4 golfer entries, opening remarks mention' },
    { name: 'Range Sponsor', price: 850, description: 'Range signage and registration table recognition' },
    { name: 'Turn Sponsor', price: 850, description: 'Lunch table signage and branded giveaway opportunity' },
    { name: 'Breakfast Sponsor', price: 750, description: 'Breakfast table signage and logo on breakfast items' },
    { name: 'Cart Sponsor', price: 600, description: 'Cart signage and website recognition' },
    { name: 'Hole Sponsor', price: 200, description: 'Hole signage and website recognition' },
  ],

  stats: {
    raisedLastYear: 15000,
    expectedAttendees: 100,
    holes: 18,
  },

  titleSponsor: {
    name: 'Navacord',
    url: 'https://navacord.com/',
  },

  /** Production site URL — used for canonical, OG, and sitemap */
  siteUrl: 'https://lendcityevents.ca',

  /** Social share image (absolute path from site root) */
  ogImage: '/images/gallery/P1028660.jpg',

  keywords: [
    'LendCity golf tournament',
    'Windsor charity golf',
    'Essex County golf tournament',
    'Sutton Creek Golf Course',
    'Harmony In Action fundraiser',
    'corporate golf sponsorship Windsor',
    'charity golf Essex Ontario',
    'golf tournament registration Windsor',
  ],
} as const;

export const faqs = [
  {
    question: 'When is the LendCity Charity Golf Tournament?',
    answer: `The ${event.year} LendCity Charity Golf Tournament is on ${event.dateDisplay}. Registration opens at ${event.startTime} with breakfast, followed by a shotgun start at ${event.shotgunStart}.`,
  },
  {
    question: 'Where is the LendCity golf tournament held?',
    answer: `The tournament is held at ${event.venue.name}, ${event.venue.street}, ${event.venue.city}, ${event.venue.region} ${event.venue.postalCode}, Canada.`,
  },
  {
    question: 'How much does it cost to play in the LendCity golf tournament?',
    answer: `Individual registration is $${event.pricing.individual} CAD. A foursome (four golfers) is $${event.pricing.foursome} CAD. Both include 18 holes, a golf cart, meals, welcome bag, contests, and prize draws.`,
  },
  {
    question: 'How do I register for the LendCity golf tournament?',
    answer: `Download the registration PDF from lendcityevents.ca, complete your golfer details, submit payment by e-transfer to donation@harmonyinaction.com, and email your completed form to ${event.organizer.email} by ${event.registrationDeadlineDisplay}.`,
  },
  {
    question: 'Who benefits from the LendCity Charity Golf Tournament?',
    answer: `All proceeds benefit ${event.beneficiary.name}, supporting ${event.beneficiary.description} Last year's tournament raised $${event.stats.raisedLastYear.toLocaleString('en-CA')}.`,
  },
  {
    question: 'How can my business sponsor the LendCity golf tournament?',
    answer: `Businesses can sponsor the tournament at multiple levels including title, platinum, gold, cart, and hole sponsorship. Contact ${event.organizer.email} or use the contact form at lendcityevents.ca to request the sponsorship package.`,
  },
  {
    question: 'What is included in the tournament registration?',
    answer:
      'Registration includes 18 holes of golf at Sutton Creek Golf Course with a golf cart, breakfast, lunch and dinner, a welcome golf bag, on-course contests, raffles, and a networking reception with local business leaders.',
  },
  {
    question: 'Who is the title sponsor of the LendCity Golf Classic?',
    answer: `${event.titleSponsor.name} is the title sponsor of the ${event.year} LendCity Charity Golf Tournament.`,
  },
] as const;

/** Public-facing title, e.g. "2026 LendCity™ Golf Classic" — updates when `year` changes */
export const brandedName = lendCityText(`${event.year} ${event.shortName}`);

export function absoluteUrl(path: string): string {
  const base = event.siteUrl.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
