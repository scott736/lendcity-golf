import { readFileSync, writeFileSync } from 'node:fs';

const blocks = JSON.parse(readFileSync('schema-export.json', 'utf8'));
const scripts = blocks
  .map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`)
  .join('');
const html = `<!DOCTYPE html><html><head>${scripts}</head><body></body></html>`;

const params = new URLSearchParams({ html });
const res = await fetch('https://validator.schema.org/validate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: params.toString(),
});

const text = await res.text();
writeFileSync('/tmp/schema-validator-result.json', text);
const j = JSON.parse(text.replace(/^\)\]\}'\n?/, ''));

console.log('=== Schema.org Validator ===');
console.log('HTTP status:', res.status);
console.log('Objects parsed:', j.numObjects ?? 'n/a');
console.log('Total errors:', j.totalNumErrors ?? 'n/a');
console.log('Total warnings:', j.totalNumWarnings ?? 'n/a');

const issues = [];

function walkNode(node, parentType = '') {
  const type = node.typeGroup || parentType;
  for (const e of node.errors || []) {
    issues.push({ kind: 'ERR', type, prop: '', msg: e.message || JSON.stringify(e) });
  }
  for (const p of node.properties || []) {
    for (const e of p.errors || []) {
      issues.push({ kind: 'ERR', type, prop: p.pred, msg: e.message || JSON.stringify(e) });
    }
    for (const w of p.warnings || []) {
      issues.push({ kind: 'WARN', type, prop: p.pred, msg: w.message || JSON.stringify(w) });
    }
  }
  for (const np of node.nodeProperties || []) {
    if (np.target) walkNode(np.target, type);
    for (const e of np.errors || []) {
      issues.push({ kind: 'ERR', type, prop: np.pred, msg: e.message || JSON.stringify(e) });
    }
  }
}

for (const g of j.tripleGroups || []) {
  for (const n of g.nodes || []) walkNode(n);
}

if (issues.length === 0) {
  console.log('\nNo property-level errors or warnings.');
} else {
  console.log(`\n${issues.length} issue(s):`);
  for (const i of issues) {
    console.log(`${i.kind} [${i.type}${i.prop ? '.' + i.prop : ''}] ${i.msg}`);
  }
}

// Google Rich Results eligibility (manual rules)
console.log('\n=== Google Rich Results eligibility (manual check) ===');
const byType = Object.fromEntries(blocks.map((b) => [b['@type'], b]));

const checks = [
  {
    name: 'FAQ rich result',
    pass:
      byType.FAQPage?.mainEntity?.length >= 2 &&
      byType.FAQPage.mainEntity.every((q) => q.name && q.acceptedAnswer?.text),
  },
  {
    name: 'Event (SportsEvent)',
    pass:
      byType.SportsEvent?.name &&
      byType.SportsEvent?.startDate &&
      byType.SportsEvent?.location?.name,
  },
  {
    name: 'HowTo',
    pass: byType.HowTo?.step?.length >= 2 && byType.HowTo.step.every((s) => s.name || s.text),
  },
  {
    name: 'BreadcrumbList',
    pass:
      byType.BreadcrumbList?.itemListElement?.length >= 2 &&
      byType.BreadcrumbList.itemListElement.every((i) => i.name && i.item),
  },
  {
    name: 'Organization',
    pass: byType.Organization?.name && byType.Organization?.url,
  },
];

for (const c of checks) {
  console.log(`${c.pass ? '✓' : '✗'} ${c.name}`);
}
