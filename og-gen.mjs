import sharp from 'sharp';
import { readFileSync, writeFileSync, statSync } from 'fs';

const svg = readFileSync('og-image.svg');

sharp(svg)
  .resize(1200, 630)
  .png()
  .toFile('og-image.png')
  .then(() => {
    const size = statSync('og-image.png').size;
    console.log('og-image.png created! Size: ' + (size/1024).toFixed(1) + ' KB');
  })
  .catch(e => console.error('Error:', e.message));
