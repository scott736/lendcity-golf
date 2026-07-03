import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const sponsorsDir = path.join(process.cwd(), 'public/images/sponsors');

const squareTextLogos = [
  'active-plumbing.png',
  'pisciuneri-construction.png',
  'richard-and-dianne-serran.png',
];

for (const file of squareTextLogos) {
  const inputPath = path.join(sponsorsDir, file);
  const tempPath = path.join(sponsorsDir, `.trim-${file}`);

  await sharp(inputPath)
    .trim({ threshold: 10 })
    .resize(800, 320, { fit: 'inside', withoutEnlargement: false })
    .png()
    .toFile(tempPath);

  fs.renameSync(tempPath, inputPath);
  console.log(`Trimmed ${file}`);
}

// Trim other square/black-background logos for consistent sizing
const alsoTrim = ['tim-hortons.png', 'liuna.png', 'the-loft.png', 'benson.png'];

for (const file of alsoTrim) {
  const inputPath = path.join(sponsorsDir, file);
  if (!fs.existsSync(inputPath)) continue;

  const tempPath = path.join(sponsorsDir, `.trim-${file}`);

  await sharp(inputPath)
    .trim({ threshold: 15 })
    .resize(800, 320, { fit: 'inside', withoutEnlargement: false })
    .png()
    .toFile(tempPath);

  fs.renameSync(tempPath, inputPath);
  console.log(`Trimmed ${file}`);
}

console.log('Done optimizing sponsor logos.');
