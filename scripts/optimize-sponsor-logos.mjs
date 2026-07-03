import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const sponsorsDir = path.join(process.cwd(), 'public/images/sponsors');

/** Logos referenced in src/data/sponsors.ts (SVGs are skipped). */
const activeLogos = [
  { file: 'navacord-title-partner.png', square: true },
  { file: 'marcel-parent-pinnacle.webp' },
  { file: 'jim-broad.webp', black: true },
  { file: 'the-pointwellness.png.webp' },
  { file: 'p--r-give-where-you-live.png' },
  { file: 'benson.png', black: true },
  { file: 'liuna.png' },
  { file: 'esc-site-logo-min.png' },
  { file: 'quality-cabinets.png', square: true, black: true },
  { file: 'tim-hortons.png', black: true },
  { file: 'pisciuneri-construction.png' },
  { file: 'unifor-240.png' },
  { file: 'richard-and-dianne-serran.png' },
  { file: 'the-loft.png' },
  { file: 'active-plumbing.png' },
  { file: 'wise-oak-financial.webp' },
  { file: 'owls-nest-emporium.png', black: true },
  { file: 'windsor-firefighters-benefit-fund.webp', square: true },
];

async function removeNearBlackBackground(buffer, threshold = 40) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixels = Buffer.from(data);
  let visible = 0;

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    if (r <= threshold && g <= threshold && b <= threshold) {
      pixels[i + 3] = 0;
    } else if (pixels[i + 3] > 0) {
      visible++;
    }
  }

  if (visible < 100) return null;

  return sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });
}

async function optimizeLogo({ file, square = false, black = false }) {
  const inputPath = path.join(sponsorsDir, file);
  if (!fs.existsSync(inputPath)) {
    console.warn(`Skipping missing file: ${file}`);
    return;
  }

  if (file.endsWith('.svg')) {
    console.log(`Skipping vector file: ${file}`);
    return;
  }

  const tempPath = path.join(sponsorsDir, `.opt-${file}`);
  const before = fs.statSync(inputPath).size;
  const inputBuffer = fs.readFileSync(inputPath);

  let pipeline = sharp(inputBuffer);

  if (black) {
    const keyed = await removeNearBlackBackground(inputBuffer);
    if (keyed) pipeline = keyed;
  }

  pipeline = pipeline.trim({ threshold: 12 });

  if (square) {
    pipeline = pipeline.resize(480, 480, { fit: 'inside', withoutEnlargement: true });
  } else {
    pipeline = pipeline.resize(800, 320, { fit: 'inside', withoutEnlargement: true });
  }

  if (file.endsWith('.webp')) {
    await pipeline.webp({ quality: 80, effort: 6 }).toFile(tempPath);
  } else {
    await pipeline.png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(tempPath);
  }

  const meta = await sharp(tempPath).metadata();
  const afterTemp = fs.statSync(tempPath).size;
  if (!afterTemp || !meta.width) {
    fs.unlinkSync(tempPath);
    console.warn(`Skipped invalid output for ${file}`);
    return;
  }

  fs.renameSync(tempPath, inputPath);
  console.log(
    `${file}: ${meta.width}x${meta.height}, ${Math.round(before / 1024)}KB -> ${Math.round(afterTemp / 1024)}KB`,
  );
}

for (const logo of activeLogos) {
  await optimizeLogo(logo);
}

console.log('Done optimizing sponsor logos.');
