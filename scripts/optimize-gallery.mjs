import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const galleryDir = path.join(process.cwd(), 'public/images/gallery');
const files = fs.readdirSync(galleryDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

let processed = 0;
let savedBytes = 0;

console.log(`Optimizing ${files.length} gallery images...`);

for (const file of files) {
  const inputPath = path.join(galleryDir, file);
  const before = fs.statSync(inputPath).size;
  const tempPath = path.join(galleryDir, `.opt-${file}`);

  const pipeline = sharp(inputPath).rotate().resize(1920, 1920, {
    fit: 'inside',
    withoutEnlargement: true,
  });

  if (/\.png$/i.test(file)) {
    await pipeline.png({ quality: 80, compressionLevel: 9 }).toFile(tempPath);
  } else if (/\.webp$/i.test(file)) {
    await pipeline.webp({ quality: 80 }).toFile(tempPath);
  } else {
    await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(tempPath);
  }

  fs.renameSync(tempPath, inputPath);
  const after = fs.statSync(inputPath).size;
  savedBytes += before - after;
  processed++;

  if (processed % 50 === 0) {
    console.log(`  ${processed}/${files.length} done...`);
  }
}

const totalSize = files.reduce((sum, f) => sum + fs.statSync(path.join(galleryDir, f)).size, 0);
console.log(`Done. ${processed} images optimized.`);
console.log(`Saved ${(savedBytes / 1024 / 1024).toFixed(1)} MB`);
console.log(`Gallery total: ${(totalSize / 1024 / 1024).toFixed(1)} MB`);
