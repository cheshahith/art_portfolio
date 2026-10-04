import fs from 'fs';
import path from 'path';

if (!fs.existsSync('public/art/ugly')) {
  fs.mkdirSync('public/art/ugly', { recursive: true });
}
if (!fs.existsSync('public/art/oil')) {
  fs.mkdirSync('public/art/oil', { recursive: true });
}

// Copy oil paintings
const oilFiles = [
  'WhatsApp Image 2026-10-04 at 11.05.32 PM.jpeg',
  'WhatsApp Image 2026-10-04 at 11.05.33 PM (1).jpeg',
  'WhatsApp Image 2026-10-04 at 11.05.35 PM (1).jpeg',
  'WhatsApp Image 2026-10-04 at 11.05.35 PM.jpeg',
  'WhatsApp Image 2026-10-04 at 11.05.36 PM.jpeg'
];

oilFiles.forEach((f, idx) => {
  const src = path.join('oilpaintings', f);
  const dest = path.join('public/art/oil', `oil-${idx + 1}.jpeg`);
  fs.copyFileSync(src, dest);
  console.log(`Copied ${src} -> ${dest}`);
});

// Copy ugly
const uglyFiles = [
  'WhatsApp Image 2026-10-04 at 11.05.32 PM (1).jpeg',
  'WhatsApp Image 2026-10-04 at 11.05.33 PM.jpeg',
  'WhatsApp Image 2026-10-04 at 11.05.34 PM.jpeg',
  'WhatsApp Image 2026-10-04 at 11.05.36 PM (1).jpeg'
];

uglyFiles.forEach((f, idx) => {
  const src = path.join('ugly', f);
  const destUgly = path.join('public/art/ugly', `ugly-${idx + 1}.jpeg`);
  fs.copyFileSync(src, destUgly);
  if (fs.existsSync('public/art/worst')) {
    const destWorst = path.join('public/art/worst', `worst-${idx + 1}.jpeg`);
    fs.copyFileSync(src, destWorst);
  }
  console.log(`Copied ${src} -> ${destUgly}`);
});
