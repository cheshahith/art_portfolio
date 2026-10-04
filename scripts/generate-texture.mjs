import fs from 'fs';
import { execSync } from 'child_process';

const ffmpegPath = "C:\\Users\\chesh\\OneDrive\\Desktop\\My portfolio\\portf_extract\\node_modules\\ffmpeg-static\\ffmpeg.exe";

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <radialGradient id="velvetGlow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#7a1f1f" stop-opacity="0.9"/>
      <stop offset="45%" stop-color="#6C1A1A" stop-opacity="1"/>
      <stop offset="85%" stop-color="#4f1212" stop-opacity="1"/>
      <stop offset="100%" stop-color="#360a0a" stop-opacity="1"/>
    </radialGradient>
  </defs>

  <!-- Velvet Base -->
  <rect width="100%" height="100%" fill="#6C1A1A"/>
  <rect width="100%" height="100%" fill="url(#velvetGlow)"/>

  <!-- Soft Velvet Folds & Texture -->
  <path d="M 0 300 Q 480 180 960 360 T 1920 250 L 1920 1080 L 0 1080 Z" fill="#521313" opacity="0.4"/>
  <path d="M 0 620 Q 640 780 1280 500 T 1920 660 L 1920 1080 L 0 1080 Z" fill="#380b0b" opacity="0.5"/>
</svg>`;

const tempSvg = 'public/textures/temp.svg';
const targetWebp = 'public/textures/home-bg.webp';

fs.writeFileSync(tempSvg, svg);

try {
  execSync(`"${ffmpegPath}" -y -i "${tempSvg}" -c:v libwebp -quality 80 "${targetWebp}"`, { stdio: 'inherit' });
  if (fs.existsSync(tempSvg)) {
    fs.unlinkSync(tempSvg);
  }
  const stats = fs.statSync(targetWebp);
  console.log(`Generated ${targetWebp}: ${Math.round(stats.size / 1024)} KB`);
} catch (err) {
  console.error('Error generating webp:', err);
}
