export interface Sponsor {
  name: string;
  logo: string;
  url?: string;
  /** When true, link uses rel="nofollow". Defaults to true for external sponsors. */
  nofollow?: boolean;
  tier?: 'title' | 'partner';
}

export const titleSponsor: Sponsor = {
  name: 'Navacord',
  logo: '/images/sponsors/navacord-title-partner.png',
  url: 'https://navacord.com/',
  nofollow: true,
  tier: 'title',
};

export const sponsors: Sponsor[] = [
  { name: 'RBC', logo: '/images/sponsors/rbc.png', url: 'https://www.rbc.com/', nofollow: true },
  {
    name: 'Tim Hortons',
    logo: '/images/sponsors/tim-hortons.png',
    url: 'https://www.timhortons.ca/',
    nofollow: true,
  },
  {
    name: 'LiUNA 625',
    logo: '/images/sponsors/liuna.png',
    url: 'https://www.liuna625.ca/',
    nofollow: true,
  },
  {
    name: 'Unifor Local 240',
    logo: '/images/sponsors/unifor-240.png',
    url: 'https://www.uniforlocal240.ca/',
    nofollow: true,
  },
  {
    name: 'Pinnacle Plus Realty',
    logo: '/images/sponsors/pinnacle.png',
    url: 'https://pinnacleplusrealty.com/',
    nofollow: true,
  },
  {
    name: 'GG Real Estate',
    logo: '/images/sponsors/gg-real-estate-2025-logo-rebrand-1_page_2.png',
    url: 'https://www.lcplatinumrealty.com/sales-team/agent-18/george-gewarges',
    nofollow: true,
  },
  {
    name: 'Harmony In Action',
    logo: '/images/sponsors/hia.png',
    url: 'https://www.harmonyinaction.com/',
    nofollow: true,
  },
  {
    name: 'RMP Advisory',
    logo: '/images/sponsors/rmp-primary-horizontal-tag-01.svg',
    url: 'https://rmpadvisors.com/',
    nofollow: true,
  },
  {
    name: 'Pisciuneri Construction',
    logo: '/images/sponsors/pisciuneri-construction.png',
    url: 'https://www.pccustomhomes.com/',
    nofollow: true,
  },
  {
    name: 'The Point Wellness Spa',
    logo: '/images/sponsors/the-pointwellness.png.webp',
    url: 'https://www.thepointspa.ca/',
    nofollow: true,
  },
  {
    name: 'Therapy Loft',
    logo: '/images/sponsors/the-loft.png',
    url: 'https://www.therapyloft.ca/',
    nofollow: true,
  },
  {
    name: 'Richard & Dianne Serran',
    logo: '/images/sponsors/richard-and-dianne-serran.png',
    nofollow: true,
  },
  {
    name: 'ESC',
    logo: '/images/sponsors/esc-site-logo-min.png',
    url: 'https://www.essexcountyproperty.com/',
    nofollow: true,
  },
  {
    name: 'Active Plumbing',
    logo: '/images/sponsors/active-plumbing.png',
    nofollow: true,
  },
  {
    name: 'Benson',
    logo: '/images/sponsors/benson.png',
    url: 'https://advisor.sunlife.ca/benson.financial/',
    nofollow: true,
  },
  {
    name: 'P & R Give Where You Live',
    logo: '/images/sponsors/p--r-give-where-you-live.png',
    url: 'https://parksrec.ca/',
    nofollow: true,
  },
  {
    name: 'LendCity',
    logo: '/images/brand/lendcity-logo.png',
    url: 'https://lendcity.ca/',
    nofollow: false,
  },
];

function sponsorRel(sponsor: Sponsor): string {
  return sponsor.nofollow !== false ? 'nofollow noopener noreferrer' : 'noopener noreferrer';
}

export { sponsorRel };
