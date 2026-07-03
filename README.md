# LendCity Golf

Official website for the **LendCity Annual Charity Golf Tournament** — Friday, July 17, 2026 at Sutton Creek Golf Course, Essex, ON.

All proceeds benefit [Harmony In Action](https://www.harmonyinaction.com).

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
npm run preview
```

## Image optimization

Gallery photos are resized to 1920px max and compressed:

```bash
npm run optimize:gallery
```

## Annual site update (SEO & content)

Each year before the tournament, update these files:

1. **[src/data/event.ts](/Users/scottdillingham/Projects/LendCity-Golf/src/data/event.ts)** — dates, pricing, venue, registration deadline, stats, keywords
2. **[src/data/sponsors.ts](/Users/scottdillingham/Projects/LendCity-Golf/src/data/sponsors.ts)** — sponsor logos and website links
3. Replace gallery photos in `public/images/gallery/`
4. Update registration PDF in `public/`

SEO, FAQ content, JSON-LD structured data, Open Graph tags, sitemap, and `/llms.txt` (for AI/answer engines) are generated automatically from `event.ts`.

## Stack

- [Astro](https://astro.build)
- [Tailwind CSS v4](https://tailwindcss.com)

## Registration

Golfers can download the registration PDF from the site and submit to `pr@harmonyinaction.com`.
