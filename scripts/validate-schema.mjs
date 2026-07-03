/**
 * Local structural validation of exported JSON-LD blocks.
 * Run after: node scripts/extract-schema-from-html.mjs
 */
import { readFileSync } from 'node:fs';

const schemas = JSON.parse(readFileSync('schema-export.json', 'utf8'));

const REQUIRED = {
  WebPage: ['name', 'url'],
  SportsEvent: ['name', 'startDate', 'location'],
  EventSeries: ['name'],
  FAQPage: ['mainEntity'],
  HowTo: ['name', 'step'],
  Organization: ['name'],
  NGO: ['name'],
  GolfCourse: ['name', 'address'],
  OfferCatalog: ['name', 'itemListElement'],
  WebSite: ['name', 'url'],
  BreadcrumbList: ['itemListElement'],
};

const RECOMMENDED = {
  SportsEvent: ['description', 'offers', 'organizer', 'eventStatus', 'eventAttendanceMode'],
  FAQPage: ['mainEntity'],
  HowTo: ['description'],
  Organization: ['url', 'logo'],
  NGO: ['url', 'description'],
  GolfCourse: ['geo'],
  OfferCatalog: ['url'],
};

function hasProp(obj, key) {
  const v = obj[key];
  return v !== undefined && v !== null && v !== '';
}

function validateBlock(block, index) {
  const type = block['@type'];
  const issues = [];
  const warnings = [];

  if (block['@context'] !== 'https://schema.org') {
    issues.push('Missing or invalid @context (expected https://schema.org)');
  }
  if (!type) {
    issues.push('Missing @type');
    return { type: 'unknown', issues, warnings };
  }

  for (const prop of REQUIRED[type] ?? []) {
    if (!hasProp(block, prop)) issues.push(`Missing required property: ${prop}`);
  }
  for (const prop of RECOMMENDED[type] ?? []) {
    if (!hasProp(block, prop)) warnings.push(`Missing recommended property: ${prop}`);
  }

  // Type-specific checks
  if (type === 'FAQPage' && Array.isArray(block.mainEntity)) {
    block.mainEntity.forEach((q, i) => {
      if (q['@type'] !== 'Question') warnings.push(`FAQ item ${i + 1}: expected @type Question`);
      if (!q.name) issues.push(`FAQ item ${i + 1}: missing question name`);
      if (!q.acceptedAnswer?.text) issues.push(`FAQ item ${i + 1}: missing acceptedAnswer.text`);
    });
  }

  if (type === 'SportsEvent') {
    if (block.startDate && !/^\d{4}-\d{2}-\d{2}T/.test(block.startDate)) {
      warnings.push(`startDate should be ISO 8601: ${block.startDate}`);
    }
    if (block.location && !block.location['@type']) {
      warnings.push('location should have @type');
    }
    if (Array.isArray(block.offers)) {
      block.offers.forEach((o, i) => {
        if (!o.price) warnings.push(`Offer ${i + 1}: missing price`);
        if (!o.priceCurrency) warnings.push(`Offer ${i + 1}: missing priceCurrency`);
      });
    }
  }

  if (type === 'HowTo' && Array.isArray(block.step)) {
    block.step.forEach((s, i) => {
      if (!s.name && !s.text) issues.push(`HowTo step ${i + 1}: needs name or text`);
    });
  }

  if (type === 'BreadcrumbList' && Array.isArray(block.itemListElement)) {
    block.itemListElement.forEach((item, i) => {
      if (item.position !== i + 1) warnings.push(`Breadcrumb position ${item.position} expected ${i + 1}`);
      if (!item.name) issues.push(`Breadcrumb item ${i + 1}: missing name`);
    });
  }

  if (type === 'NGO' && block.nonprofitStatus === 'NonprofitType') {
    warnings.push('nonprofitStatus "NonprofitType" is invalid — omit or use a schema.org enum URL');
  }

  if (type === 'OfferCatalog' && Array.isArray(block.itemListElement)) {
    block.itemListElement.forEach((item, i) => {
      if (item['@type'] !== 'ListItem') warnings.push(`Catalog item ${i + 1}: expected @type ListItem`);
      const offer = item.item;
      if (!offer || offer['@type'] !== 'Offer') warnings.push(`Catalog item ${i + 1}: expected nested @type Offer`);
      else if (typeof offer.price === 'string' && offer.price.startsWith('$')) {
        warnings.push(`Catalog item ${i + 1}: price "${offer.price}" should be numeric, not currency string`);
      }
    });
  }

  return { index: index + 1, type, issues, warnings };
}

console.log(`\n=== JSON-LD Validation (${schemas.length} blocks) ===\n`);

let totalIssues = 0;
let totalWarnings = 0;

for (let i = 0; i < schemas.length; i++) {
  const r = validateBlock(schemas[i], i);
  const status = r.issues.length ? 'FAIL' : r.warnings.length ? 'WARN' : 'PASS';
  console.log(`${r.index}. ${r.type} — ${status}`);
  r.issues.forEach((m) => console.log(`   ✗ ${m}`));
  r.warnings.forEach((m) => console.log(`   ⚠ ${m}`));
  totalIssues += r.issues.length;
  totalWarnings += r.warnings.length;
}

console.log(`\nSummary: ${totalIssues} errors, ${totalWarnings} warnings across ${schemas.length} blocks`);
process.exit(totalIssues > 0 ? 1 : 0);
