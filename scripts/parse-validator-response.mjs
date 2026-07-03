import { readFileSync } from 'node:fs';

const j = JSON.parse(readFileSync('/tmp/schema-validator-result.json', 'utf8'));
console.log('=== Schema.org Validator ===');
console.log('Objects parsed:', j.numObjects);
console.log('Total errors:', j.totalNumErrors);
console.log('Total warnings:', j.totalNumWarnings);

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
