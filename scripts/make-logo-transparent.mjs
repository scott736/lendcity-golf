import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const logoPath = path.join(process.cwd(), 'public/images/brand/lendcity-logo.png');

if (!fs.existsSync(logoPath)) {
  console.error(`Logo not found at ${logoPath}`);
  process.exit(1);
}

console.log('Processing logo to make white background transparent...');

const image = sharp(logoPath);
const { data, info } = await image
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const outputBuffer = Buffer.alloc(width * height * 4);

for (let i = 0; i < width * height; i++) {
  const r = data[i * channels];
  const g = data[i * channels + 1];
  const b = data[i * channels + 2];
  const a = channels === 4 ? data[i * channels + 3] : 255;

  // If the pixel is very close to white, make it transparent
  if (r > 240 && g > 240 && b > 240) {
    outputBuffer[i * 4] = r;
    outputBuffer[i * 4 + 1] = g;
    outputBuffer[i * 4 + 2] = b;
    outputBuffer[i * 4 + 3] = 0; // Transparent
  } else {
    outputBuffer[i * 4] = r;
    outputBuffer[i * 4 + 1] = g;
    outputBuffer[i * 4 + 2] = b;
    outputBuffer[i * 4 + 3] = a;
  }
}

await sharp(outputBuffer, {
  raw: {
    width,
    height,
    channels: 4,
  },
})
  .png()
  .toFile(logoPath + '.tmp');

fs.renameSync(logoPath + '.tmp', logoPath);
console.log('Successfully made logo transparent!');
