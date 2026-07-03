export type SponsorTierId =
  | 'title'
  | 'platinum'
  | 'gold'
  | 'range'
  | 'turn'
  | 'cart'
  | 'breakfast'
  | 'hole';

export interface Sponsor {
  name: string;
  logo: string;
  url?: string;
  /** When true, link uses rel="nofollow". Defaults to true for external sponsors. */
  nofollow?: boolean;
  /** Optional subtitle shown on featured sponsor cards (e.g. representative name). */
  subtitle?: string;
}

export interface SponsorTier {
  id: SponsorTierId;
  label: string;
  layout: 'featured-dark' | 'featured' | 'grid';
  sponsors: Sponsor[];
}

/** Sponsor tiers aligned with the tournament pledge spreadsheet. */
export const sponsorTiers: SponsorTier[] = [
  {
    id: 'title',
    label: 'Title Sponsor',
    layout: 'featured-dark',
    sponsors: [
      {
        name: 'Navacord',
        logo: '/images/sponsors/navacord-title-partner.webp',
        url: 'https://navacord.com/',
        nofollow: true,
      },
    ],
  },
  {
    id: 'platinum',
    label: 'Platinum Sponsor',
    layout: 'featured',
    sponsors: [
      {
        name: 'Pinnacle Plus Realty',
        subtitle: 'Marcel Parent',
        logo: '/images/sponsors/marcel-parent-pinnacle.webp',
        url: 'https://pinnacleplusrealty.com/',
        nofollow: true,
      },
    ],
  },
  {
    id: 'gold',
    label: 'Gold Sponsor',
    layout: 'featured',
    sponsors: [
      {
        name: 'Jim Broad',
        subtitle: 'RE/MAX Capital Diamond',
        logo: '/images/sponsors/jim-broad.webp',
        url: 'https://www.jimbroad.ca/',
        nofollow: true,
      },
    ],
  },
  {
    id: 'range',
    label: 'Range Sponsor',
    layout: 'featured',
    sponsors: [
      {
        name: 'The Point Wellness Spa',
        logo: '/images/sponsors/the-pointwellness.png.webp',
        url: 'https://www.thepointspa.ca/',
        nofollow: true,
      },
    ],
  },
  {
    id: 'turn',
    label: 'Turn Sponsor',
    layout: 'featured',
    sponsors: [
      {
        name: 'P & R Give Where You Live',
        subtitle: 'Paul Slavik & Rhonda Shier',
        logo: '/images/sponsors/p--r-give-where-you-live.png',
        url: 'https://parksrec.ca/',
        nofollow: true,
      },
    ],
  },
  {
    id: 'cart',
    label: 'Cart Sponsors',
    layout: 'grid',
    sponsors: [
      {
        name: 'Benson Financial',
        subtitle: 'Richard Benson',
        logo: '/images/sponsors/benson.png',
        url: 'https://advisor.sunlife.ca/benson.financial/',
        nofollow: true,
      },
      {
        name: 'RMP Advisory',
        subtitle: 'Roth Mosey · David Melnik',
        logo: '/images/sponsors/rmp-primary-horizontal-tag-01.svg',
        url: 'https://rmpadvisors.com/',
        nofollow: true,
      },
      {
        name: 'LiUNA 625',
        logo: '/images/sponsors/liuna.png',
        url: 'https://www.liuna625.ca/',
        nofollow: true,
      },
      {
        name: 'ESC',
        subtitle: 'Exponential Solutions Consulting',
        logo: '/images/sponsors/esc-site-logo-min.png',
        url: 'https://www.essexcountyproperty.com/',
        nofollow: true,
      },
      {
        name: 'Quality Cabinets',
        logo: '/images/sponsors/quality-cabinets.png',
        nofollow: true,
      },
    ],
  },
  {
    id: 'breakfast',
    label: 'Breakfast Sponsor',
    layout: 'featured',
    sponsors: [
      {
        name: 'Tim Hortons',
        logo: '/images/sponsors/tim-hortons.png',
        url: 'https://www.timhortons.ca/',
        nofollow: true,
      },
    ],
  },
  {
    id: 'hole',
    label: 'Hole Sponsors',
    layout: 'grid',
    sponsors: [
      {
        name: 'Pisciuneri Construction',
        logo: '/images/sponsors/pisciuneri-construction.png',
        url: 'https://www.pccustomhomes.com/',
        nofollow: true,
      },
      {
        name: 'Unifor Local 240',
        logo: '/images/sponsors/unifor-240.png',
        url: 'https://www.uniforlocal240.ca/',
        nofollow: true,
      },
      {
        name: 'Richard & Dianne Serran',
        logo: '/images/sponsors/richard-and-dianne-serran.png',
        nofollow: true,
      },
      {
        name: 'Therapy Loft',
        subtitle: 'Alaina Esposito',
        logo: '/images/sponsors/the-loft.png',
        url: 'https://www.therapyloft.ca/',
        nofollow: true,
      },
      {
        name: 'Active Plumbing',
        subtitle: 'Active Plumbing & Mechanical',
        logo: '/images/sponsors/active-plumbing.png',
        nofollow: true,
      },
      {
        name: 'Wise Oak Financial',
        logo: '/images/sponsors/wise-oak-financial.webp',
        nofollow: true,
      },
      {
        name: "Owl's Nest Emporium",
        logo: '/images/sponsors/owls-nest-emporium.png',
        nofollow: true,
      },
      {
        name: 'Windsor Firefighters',
        subtitle: 'Benefit Fund',
        logo: '/images/sponsors/windsor-firefighters-benefit-fund.webp',
        url: 'https://benefitfund.ca/',
        nofollow: true,
      },
    ],
  },
];

export function getAllSponsors(): Sponsor[] {
  return sponsorTiers.flatMap((tier) => tier.sponsors);
}

export const titleSponsor = sponsorTiers.find((tier) => tier.id === 'title')!.sponsors[0];
export const platinumSponsor = sponsorTiers.find((tier) => tier.id === 'platinum')!.sponsors[0];

function sponsorRel(sponsor: Sponsor): string {
  return sponsor.nofollow !== false ? 'nofollow noopener noreferrer' : 'noopener noreferrer';
}

export { sponsorRel };
