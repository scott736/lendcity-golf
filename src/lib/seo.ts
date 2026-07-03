import { event, faqs, absoluteUrl, brandedName } from '../data/event';
import { lendCityText } from './lendcity-mark';
import { titleSponsor, platinumSponsor, getAllSponsors, sponsorTiers } from '../data/sponsors';

export function getPageTitle(pageTitle?: string): string {
  if (pageTitle) return `${pageTitle} | ${lendCityText(`${event.shortName} ${event.year}`)}`;
  return `${brandedName} | Windsor-Essex Charity Golf | ${event.beneficiary.name}`;
}

export function getPageDescription(): string {
  return `${event.dateDisplay} at ${event.venue.name}, Essex ON. ${event.stats.expectedAttendees}+ golfers. Individual $${event.pricing.individual}, foursome $${event.pricing.foursome}. All proceeds benefit ${event.beneficiary.name}. Register by ${event.registrationDeadlineDisplay}.`;
}

export function getEventJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: `${event.name} ${event.year}`,
    alternateName: event.shortName,
    description: getPageDescription(),
    startDate: `${event.date}T${event.startTime}:00-04:00`,
    endDate: `${event.date}T18:00:00-04:00`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: [absoluteUrl(event.ogImage)],
    url: absoluteUrl('/'),
    maximumAttendeeCapacity: event.stats.expectedAttendees,
    isAccessibleForFree: false,
    inLanguage: 'en-CA',
    about: {
      '@type': 'NGO',
      name: event.beneficiary.name,
      url: event.beneficiary.url,
    },
    location: {
      '@type': 'GolfCourse',
      name: event.venue.name,
      url: event.venue.mapsUrl,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.venue.street,
        addressLocality: event.venue.city,
        addressRegion: event.venue.region,
        postalCode: event.venue.postalCode,
        addressCountry: event.venue.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: event.venue.geo.latitude,
        longitude: event.venue.geo.longitude,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: event.organizer.name,
      url: event.organizer.url,
      email: event.organizer.email,
      telephone: event.organizer.phone,
    },
    performer: {
      '@type': 'NGO',
      name: event.beneficiary.name,
      url: event.beneficiary.url,
    },
    sponsor: [
      { '@type': 'Organization', name: titleSponsor.name, url: titleSponsor.url },
      { '@type': 'Organization', name: platinumSponsor.name, url: platinumSponsor.url },
      ...getAllSponsors()
        .filter((s) => s.url)
        .slice(0, 12)
        .map((s) => ({ '@type': 'Organization', name: s.name, url: s.url })),
    ],
    offers: [
      {
        '@type': 'Offer',
        name: 'Individual Golfer Registration',
        price: event.pricing.individual,
        priceCurrency: event.pricing.currency,
        url: absoluteUrl('/#register'),
        availability: 'https://schema.org/InStock',
        validThrough: event.registrationDeadline,
      },
      {
        '@type': 'Offer',
        name: 'Foursome Registration',
        price: event.pricing.foursome,
        priceCurrency: event.pricing.currency,
        url: absoluteUrl('/#register'),
        availability: 'https://schema.org/InStock',
        validThrough: event.registrationDeadline,
      },
    ],
    superEvent: {
      '@type': 'EventSeries',
      name: event.name,
      url: absoluteUrl('/'),
    },
  };
}

export function getFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: event.organizer.name,
    url: event.organizer.url,
    logo: absoluteUrl('/images/brand/lendcity-logo.png'),
    sameAs: [event.organizer.url, absoluteUrl('/')],
    contactPoint: {
      '@type': 'ContactPoint',
      email: event.organizer.email,
      telephone: event.organizer.phone,
      contactType: 'event registration',
      areaServed: 'CA',
      availableLanguage: 'English',
    },
  };
}

export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${event.shortName} ${event.year}`,
    alternateName: event.name,
    url: absoluteUrl('/'),
    description: event.tagline,
    publisher: {
      '@type': 'Organization',
      name: event.organizer.name,
      url: event.organizer.url,
    },
  };
}

export function getBreadcrumbJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: event.organizer.name,
        item: event.organizer.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${event.shortName} ${event.year}`,
        item: absoluteUrl('/'),
      },
    ],
  };
}

/** Charity beneficiary — helps AI/search connect event to cause */
export function getBeneficiaryJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: event.beneficiary.name,
    url: event.beneficiary.url,
    description: event.beneficiary.description,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Windsor-Essex, Ontario',
    },
  };
}

/** Venue as GolfCourse — local discovery & maps */
export function getGolfCourseJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GolfCourse',
    name: event.venue.name,
    url: event.venue.mapsUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: event.venue.street,
      addressLocality: event.venue.city,
      addressRegion: event.venue.region,
      postalCode: event.venue.postalCode,
      addressCountry: event.venue.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: event.venue.geo.latitude,
      longitude: event.venue.geo.longitude,
    },
    event: {
      '@type': 'SportsEvent',
      name: `${event.name} ${event.year}`,
      startDate: `${event.date}T${event.startTime}:00-04:00`,
      url: absoluteUrl('/'),
    },
  };
}

/** Registration steps — AEO for "how to register" queries */
export function getHowToJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Register for the ${event.name} ${event.year}`,
    description: `Register as an individual golfer ($${event.pricing.individual} CAD) or foursome ($${event.pricing.foursome} CAD) for the ${event.dateDisplay} tournament at ${event.venue.name}.`,
    totalTime: 'PT15M',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Download the registration form',
        text: 'Download the golfer registration PDF from lendcityevents.ca and complete names and emails for all players.',
        url: absoluteUrl('/#register'),
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Submit payment',
        text: 'E-transfer registration fees to donation@harmonyinaction.com or pay by credit card as indicated on the form.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Email your completed form',
        text: `Email your completed registration to ${event.organizer.email} by ${event.registrationDeadlineDisplay}.`,
        url: `mailto:${event.organizer.email}?subject=LendCity%20Golf%20Tournament%20${event.year}%20Registration`,
      },
    ],
  };
}

/** Sponsorship packages — helps businesses discover sponsorship options */
export function getSponsorshipCatalogJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: `${event.shortName} ${event.year} Sponsorship Opportunities`,
    url: absoluteUrl('/#sponsors'),
    itemListElement: event.sponsorshipTiers.map((tier, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Offer',
        name: tier.name,
        description: tier.description,
        price: tier.price,
        priceCurrency: event.pricing.currency,
        url: absoluteUrl('/#sponsors'),
        availability: 'https://schema.org/LimitedAvailability',
        seller: {
          '@type': 'Organization',
          name: event.organizer.name,
          email: event.organizer.email,
        },
      },
    })),
  };
}

/** Page-level entity linking — ties the URL to the event */
export function getWebPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: getPageTitle(),
    description: getPageDescription(),
    url: absoluteUrl('/'),
    inLanguage: 'en-CA',
    isPartOf: {
      '@type': 'WebSite',
      name: `${event.shortName} ${event.year}`,
      url: absoluteUrl('/'),
    },
    about: [
      { '@type': 'SportsEvent', name: `${event.name} ${event.year}` },
      { '@type': 'NGO', name: event.beneficiary.name, url: event.beneficiary.url },
    ],
    mainEntity: {
      '@type': 'SportsEvent',
      name: `${event.name} ${event.year}`,
      startDate: `${event.date}T${event.startTime}:00-04:00`,
      url: absoluteUrl('/'),
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl(event.ogImage),
      caption: `${event.shortName} at ${event.venue.name}`,
    },
  };
}

/** Annual recurring event signal */
export function getEventSeriesJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EventSeries',
    name: event.name,
    alternateName: event.shortName,
    description: event.tagline,
    url: absoluteUrl('/'),
    organizer: {
      '@type': 'Organization',
      name: event.organizer.name,
      url: event.organizer.url,
    },
    subEvent: {
      '@type': 'SportsEvent',
      name: `${event.name} ${event.year}`,
      startDate: `${event.date}T${event.startTime}:00-04:00`,
      url: absoluteUrl('/'),
    },
  };
}

export function getAllJsonLd() {
  return [
    getWebPageJsonLd(),
    getEventJsonLd(),
    getEventSeriesJsonLd(),
    getFaqJsonLd(),
    getHowToJsonLd(),
    getOrganizationJsonLd(),
    getBeneficiaryJsonLd(),
    getGolfCourseJsonLd(),
    getSponsorshipCatalogJsonLd(),
    getWebSiteJsonLd(),
    getBreadcrumbJsonLd(),
  ];
}

export function getLlmsTxt(): string {
  const home = absoluteUrl('/');
  const section = (hash: string) => absoluteUrl(`/#${hash}`);

  const sponsorLinks = sponsorTiers
    .flatMap((tier) =>
      tier.sponsors.map((sponsor) => {
        const url = sponsor.url ?? section('sponsors');
        return `- [${sponsor.name}](${url}): ${tier.label}`;
      }),
    )
    .join('\n');

  return lendCityText(`# ${event.name} ${event.year}

> ${event.tagline}

The ${event.year} ${event.shortName} takes place ${event.dateDisplay} at ${event.venue.name}, ${event.venue.city}, Ontario. Registration opens at ${event.startTimeDisplay} with ${event.meals.breakfast.toLowerCase()}. The driving range opens at ${event.rangeOpenTimeDisplay} and the shotgun start is ${event.shotgunStartDisplay}. Individual registration is $${event.pricing.individual} ${event.pricing.currency}; foursomes are $${event.pricing.foursome} ${event.pricing.currency}. Deadline: ${event.registrationDeadlineDisplay}. Contact: ${event.organizer.email}.

## Event

- [Home page](${home}): Official tournament website
- [About and schedule](${section('about')}): Tournament experience, meals, and timeline
- [Register to play](${section('register')}): Download the registration form and payment details
- [Sponsors](${section('sponsors')}): Title, platinum, gold, and supporting sponsors
- [FAQ](${section('faq')}): Registration, pricing, venue, and sponsorship questions
- [Contact](${section('contact')}): Message the tournament committee

## Sponsors

${sponsorLinks}

## Optional

- [Photo gallery](${section('gallery')}): Images from past LendCity golf tournaments
- [Harmony In Action](${event.beneficiary.url}): Charity beneficiary — ${event.beneficiary.description}
- [LendCity Mortgages](${event.organizer.url}): Tournament organizer
- [Navacord](${event.titleSponsor.url}): ${event.year} title sponsor
`);
}
