import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const FFMPEG_PATH = "C:\\Users\\chesh\\OneDrive\\Desktop\\My portfolio\\portf_extract\\node_modules\\ffmpeg-static\\ffmpeg.exe";

const DIRS = [
  'public/art/oil',
  'public/art/line',
  'public/art/worst'
];

DIRS.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Art definitions
const oilPaintings = [
  {
    id: 'oil-1',
    name: 'oil-1',
    title: 'Gilded Abyssal Currents',
    w: 900,
    h: 1200,
    bg: '#0a1628',
    gradient: ['#07111e', '#0f2744', '#1b4b7a', '#d4a24c'],
    accents: ['#f0c987', '#d4a24c', '#4a90e2', '#142c4c'],
    style: 'oil-swirls'
  },
  {
    id: 'oil-2',
    name: 'oil-2',
    title: 'Nocturne Horizon',
    w: 1200,
    h: 800,
    bg: '#091322',
    gradient: ['#060c16', '#12233c', '#d4a24c', '#e67e22'],
    accents: ['#f5efe6', '#d4a24c', '#1b3a5b'],
    style: 'oil-horizon'
  },
  {
    id: 'oil-3',
    name: 'oil-3',
    title: 'Emerald Surge & Gold Leaf',
    w: 1000,
    h: 1000,
    bg: '#081a1d',
    gradient: ['#051517', '#0e3a38', '#1a6b63', '#d4a24c'],
    accents: ['#5cdbb5', '#f0c987', '#0b2629'],
    style: 'oil-abstract'
  },
  {
    id: 'oil-4',
    name: 'oil-4',
    title: 'Venetian Dusk in Amber',
    w: 850,
    h: 1150,
    bg: '#1a101f',
    gradient: ['#120817', '#34153b', '#7c2d58', '#d4a24c'],
    accents: ['#f0c987', '#d9534f', '#2a1b3d'],
    style: 'oil-swirls'
  },
  {
    id: 'oil-5',
    name: 'oil-5',
    title: 'Deep Ocean Foam Study I',
    w: 1100,
    h: 750,
    bg: '#0a192f',
    gradient: ['#071224', '#0d2b45', '#205072', '#a8d0e6'],
    accents: ['#f5efe6', '#f0c987', '#3282b8'],
    style: 'oil-foam'
  },
  {
    id: 'oil-6',
    name: 'oil-6',
    title: 'Solar Eclipse over Cobalt Peak',
    w: 900,
    h: 1200,
    bg: '#0d1b2a',
    gradient: ['#050c14', '#1b263b', '#415a77', '#d4a24c'],
    accents: ['#e0a96d', '#f0c987', '#1b263b'],
    style: 'oil-circle'
  },
  {
    id: 'oil-7',
    name: 'oil-7',
    title: 'Midnight Reverie',
    w: 1000,
    h: 1000,
    bg: '#0a1424',
    gradient: ['#060e1a', '#14223d', '#2b4162', '#c99738'],
    accents: ['#d4a24c', '#e2d4c0', '#1f3554'],
    style: 'oil-abstract'
  },
  {
    id: 'oil-8',
    name: 'oil-8',
    title: 'Crimson Glaze & Golden Veins',
    w: 800,
    h: 1100,
    bg: '#1c0e15',
    gradient: ['#14070c', '#421422', '#85213b', '#d4a24c'],
    accents: ['#f0c987', '#c0392b', '#311019'],
    style: 'oil-swirls'
  }
];

const lineArtDrawings = [
  {
    id: 'line-1',
    name: 'line-1',
    title: 'Botanical Equilibrium',
    w: 900,
    h: 1200,
    bg: '#f8f4eb',
    stroke: '#152438',
    accents: ['#d4a24c', '#8a7356'],
    type: 'botanical'
  },
  {
    id: 'line-2',
    name: 'line-2',
    title: 'Continuous Contour Profile',
    w: 850,
    h: 1150,
    bg: '#f5efe6',
    stroke: '#0e1c2e',
    accents: ['#d4a24c', '#c79c5e'],
    type: 'face'
  },
  {
    id: 'line-3',
    name: 'line-3',
    title: 'Architectural Solitude (Arch IX)',
    w: 1100,
    h: 800,
    bg: '#fbf8f2',
    stroke: '#102237',
    accents: ['#d4a24c', '#79654c'],
    type: 'arch'
  },
  {
    id: 'line-4',
    name: 'line-4',
    title: 'Hands in Resonance',
    w: 1000,
    h: 1000,
    bg: '#f6f1e8',
    stroke: '#111d2e',
    accents: ['#d4a24c', '#bfa17a'],
    type: 'hands'
  },
  {
    id: 'line-5',
    name: 'line-5',
    title: 'Oceanic Wave Crests',
    w: 1200,
    h: 750,
    bg: '#f4eee4',
    stroke: '#0d1f33',
    accents: ['#4a7b9d', '#d4a24c'],
    type: 'waves'
  },
  {
    id: 'line-6',
    name: 'line-6',
    title: 'Serenade of Curves & Shadows',
    w: 800,
    h: 1100,
    bg: '#f7f2ea',
    stroke: '#16283d',
    accents: ['#d4a24c', '#9c8266'],
    type: 'abstract'
  },
  {
    id: 'line-7',
    name: 'line-7',
    title: 'Constellation of Thoughts',
    w: 1000,
    h: 1000,
    bg: '#f9f5ee',
    stroke: '#0f1a28',
    accents: ['#d4a24c', '#c2a67e'],
    type: 'constellation'
  },
  {
    id: 'line-8',
    name: 'line-8',
    title: 'Sparrow on a Golden Bough',
    w: 900,
    h: 1200,
    bg: '#f5f0e7',
    stroke: '#132133',
    accents: ['#d4a24c', '#5a4632'],
    type: 'bird'
  }
];

const worstArtPieces = [
  {
    id: 'worst-1',
    name: 'worst-1',
    title: 'The Uncomfortable Potato Cat',
    w: 900,
    h: 1100,
    bg: '#25211e',
    paper: '#faf5eb',
    type: 'potato-cat'
  },
  {
    id: 'worst-2',
    name: 'worst-2',
    title: 'Seven-Fingered Hand of Regret',
    w: 1000,
    h: 900,
    bg: '#1a222d',
    paper: '#f8f2e6',
    type: 'hand'
  },
  {
    id: 'worst-3',
    name: 'worst-3',
    title: 'Perspective? Never Heard of Her',
    w: 1100,
    h: 800,
    bg: '#221d28',
    paper: '#f4ede1',
    type: 'cube'
  },
  {
    id: 'worst-4',
    name: 'worst-4',
    title: 'Anatomy Was Merely a Suggestion',
    w: 850,
    h: 1200,
    bg: '#2d1e21',
    paper: '#fcf7ee',
    type: 'person'
  },
  {
    id: 'worst-5',
    name: 'worst-5',
    title: 'The Smudged Twilight Catastrophe',
    w: 1000,
    h: 1000,
    bg: '#1c262e',
    paper: '#f6f0e4',
    type: 'smudge'
  },
  {
    id: 'worst-6',
    name: 'worst-6',
    title: 'Neon T-Rex with Existential Dread',
    w: 1100,
    h: 750,
    bg: '#231b2c',
    paper: '#f9f3e8',
    type: 'dino'
  },
  {
    id: 'worst-7',
    name: 'worst-7',
    title: 'Tower of Pisa (Accidental Version)',
    w: 800,
    h: 1150,
    bg: '#1f2420',
    paper: '#f5efe3',
    type: 'tower'
  },
  {
    id: 'worst-8',
    name: 'worst-8',
    title: 'Portrait of a Friend (They Blocked Me)',
    w: 900,
    h: 1100,
    bg: '#2a221a',
    paper: '#f7f1e7',
    type: 'portrait'
  }
];

function generateOilSVG(item) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${item.w} ${item.h}" width="${item.w}" height="${item.h}">
  <defs>
    <radialGradient id="grad1_${item.id}" cx="40%" cy="35%" r="70%">
      <stop offset="0%" stop-color="${item.gradient[3]}" stop-opacity="0.9"/>
      <stop offset="35%" stop-color="${item.gradient[2]}" stop-opacity="0.8"/>
      <stop offset="70%" stop-color="${item.gradient[1]}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${item.gradient[0]}" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="goldGlow_${item.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f0c987" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#d4a24c" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#8a6320" stop-opacity="0.1"/>
    </linearGradient>
    <filter id="noise_${item.id}" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" result="noise"/>
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.18 0"/>
      <feComposite in2="SourceGraphic" in="gl" operator="in"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="100%" height="100%" fill="${item.bg}"/>
  <rect width="100%" height="100%" fill="url(#grad1_${item.id})"/>

  <!-- Artistic Textured Strokes -->
  <g opacity="0.65" filter="url(#noise_${item.id})">
    <ellipse cx="${item.w * 0.45}" cy="${item.h * 0.4}" rx="${item.w * 0.38}" ry="${item.h * 0.28}" fill="url(#goldGlow_${item.id})" transform="rotate(-15 ${item.w * 0.45} ${item.h * 0.4})"/>
    <path d="M ${item.w*0.1} ${item.h*0.7} Q ${item.w*0.4} ${item.h*0.3} ${item.w*0.9} ${item.h*0.5} T ${item.w*0.8} ${item.h*0.85}" fill="none" stroke="${item.accents[0]}" stroke-width="${item.w*0.06}" stroke-linecap="round" opacity="0.4"/>
    <path d="M ${item.w*0.05} ${item.h*0.5} Q ${item.w*0.5} ${item.h*0.85} ${item.w*0.95} ${item.h*0.35}" fill="none" stroke="${item.accents[1]}" stroke-width="${item.w*0.04}" stroke-linecap="round" opacity="0.6"/>
    <path d="M ${item.w*0.2} ${item.h*0.2} Q ${item.w*0.6} ${item.h*0.1} ${item.w*0.8} ${item.h*0.4} T ${item.w*0.5} ${item.h*0.9}" fill="none" stroke="#f0c987" stroke-width="${item.w*0.025}" stroke-linecap="round" opacity="0.7"/>
    <circle cx="${item.w * 0.65}" cy="${item.h * 0.35}" r="${item.w * 0.12}" fill="#f0c987" opacity="0.35" />
    <circle cx="${item.w * 0.35}" cy="${item.h * 0.65}" r="${item.w * 0.18}" fill="${item.gradient[2]}" opacity="0.5" />
  </g>

  <!-- Gold Leaf Impasto Accents -->
  <g opacity="0.85">
    <path d="M ${item.w*0.3} ${item.h*0.45} C ${item.w*0.38} ${item.h*0.35}, ${item.w*0.6} ${item.h*0.42}, ${item.w*0.72} ${item.h*0.32}" fill="none" stroke="#f6dcab" stroke-width="5" stroke-dasharray="12 6" opacity="0.8"/>
    <path d="M ${item.w*0.2} ${item.h*0.6} C ${item.w*0.45} ${item.h*0.55}, ${item.w*0.55} ${item.h*0.75}, ${item.w*0.85} ${item.h*0.68}" fill="none" stroke="#d4a24c" stroke-width="7" opacity="0.9"/>
  </g>

  <!-- Subtle Vignette Frame -->
  <rect width="100%" height="100%" fill="none" stroke="rgba(212,162,76,0.25)" stroke-width="2"/>
  <text x="${item.w - 30}" y="${item.h - 30}" font-family="serif" font-size="16" fill="rgba(240,201,135,0.4)" text-anchor="end" font-style="italic">Original Oil on Canvas</text>
</svg>`;
}

function generateLineSVG(item) {
  let innerArt = '';
  if (item.type === 'botanical') {
    innerArt = `
      <path d="M ${item.w*0.5} ${item.h*0.85} C ${item.w*0.5} ${item.h*0.5}, ${item.w*0.48} ${item.h*0.3}, ${item.w*0.5} ${item.h*0.15}" fill="none" stroke="${item.stroke}" stroke-width="4" stroke-linecap="round"/>
      <path d="M ${item.w*0.5} ${item.h*0.65} C ${item.w*0.3} ${item.h*0.58}, ${item.w*0.25} ${item.h*0.45}, ${item.w*0.35} ${item.h*0.4} C ${item.w*0.45} ${item.h*0.45}, ${item.w*0.48} ${item.h*0.58}, ${item.w*0.5} ${item.h*0.65}" fill="none" stroke="${item.stroke}" stroke-width="3"/>
      <path d="M ${item.w*0.5} ${item.h*0.5} C ${item.w*0.7} ${item.h*0.42}, ${item.w*0.75} ${item.h*0.3}, ${item.w*0.65} ${item.h*0.25} C ${item.w*0.55} ${item.h*0.3}, ${item.w*0.52} ${item.h*0.42}, ${item.w*0.5} ${item.h*0.5}" fill="none" stroke="${item.stroke}" stroke-width="3"/>
      <path d="M ${item.w*0.5} ${item.h*0.35} C ${item.w*0.35} ${item.h*0.28}, ${item.w*0.32} ${item.h*0.18}, ${item.w*0.42} ${item.h*0.15} C ${item.w*0.48} ${item.h*0.2}, ${item.w*0.49} ${item.h*0.28}, ${item.w*0.5} ${item.h*0.35}" fill="none" stroke="${item.stroke}" stroke-width="3"/>
      <circle cx="${item.w*0.65}" cy="${item.h*0.4}" r="${item.w*0.12}" fill="${item.accents[0]}" opacity="0.25"/>
    `;
  } else if (item.type === 'face') {
    innerArt = `
      <circle cx="${item.w*0.4}" cy="${item.h*0.35}" r="${item.w*0.18}" fill="${item.accents[0]}" opacity="0.2"/>
      <path d="M ${item.w*0.35} ${item.h*0.2} C ${item.w*0.6} ${item.h*0.18}, ${item.w*0.7} ${item.h*0.35}, ${item.w*0.62} ${item.h*0.45} C ${item.w*0.58} ${item.h*0.52}, ${item.w*0.68} ${item.h*0.55}, ${item.w*0.62} ${item.h*0.65} C ${item.w*0.58} ${item.h*0.7}, ${item.w*0.48} ${item.h*0.78}, ${item.w*0.38} ${item.h*0.82} L ${item.w*0.38} ${item.h*0.9}" fill="none" stroke="${item.stroke}" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M ${item.w*0.48} ${item.h*0.42} Q ${item.w*0.52} ${item.h*0.46} ${item.w*0.47} ${item.h*0.52}" fill="none" stroke="${item.stroke}" stroke-width="3"/>
      <path d="M ${item.w*0.48} ${item.h*0.6} Q ${item.w*0.56} ${item.h*0.63} ${item.w*0.5} ${item.h*0.68}" fill="none" stroke="${item.stroke}" stroke-width="3.5"/>
    `;
  } else if (item.type === 'arch') {
    innerArt = `
      <rect x="${item.w*0.25}" y="${item.h*0.35}" width="${item.w*0.5}" height="${item.h*0.5}" fill="none" stroke="${item.stroke}" stroke-width="3"/>
      <path d="M ${item.w*0.25} ${item.h*0.35} A ${item.w*0.25} ${item.w*0.25} 0 0 1 ${item.w*0.75} ${item.h*0.35}" fill="none" stroke="${item.stroke}" stroke-width="3"/>
      <path d="M ${item.w*0.35} ${item.h*0.42} A ${item.w*0.15} ${item.w*0.15} 0 0 1 ${item.w*0.65} ${item.h*0.42} L ${item.w*0.65} ${item.h*0.85} L ${item.w*0.35} ${item.h*0.85} Z" fill="${item.accents[0]}" fill-opacity="0.18" stroke="${item.stroke}" stroke-width="2.5"/>
      <line x1="${item.w*0.15}" y1="${item.h*0.85}" x2="${item.w*0.85}" y2="${item.h*0.85}" stroke="${item.stroke}" stroke-width="3"/>
      <circle cx="${item.w*0.5}" cy="${item.h*0.2}" r="${item.w*0.06}" fill="none" stroke="${item.stroke}" stroke-width="2.5"/>
    `;
  } else {
    innerArt = `
      <circle cx="${item.w*0.5}" cy="${item.h*0.45}" r="${item.w*0.25}" fill="${item.accents[0]}" opacity="0.18"/>
      <path d="M ${item.w*0.2} ${item.h*0.7} Q ${item.w*0.35} ${item.h*0.25} ${item.w*0.5} ${item.h*0.5} T ${item.w*0.8} ${item.h*0.3}" fill="none" stroke="${item.stroke}" stroke-width="4" stroke-linecap="round"/>
      <path d="M ${item.w*0.25} ${item.h*0.35} Q ${item.w*0.55} ${item.h*0.75} ${item.w*0.75} ${item.h*0.65}" fill="none" stroke="${item.stroke}" stroke-width="2.5" stroke-dasharray="6 6"/>
      <line x1="${item.w*0.3}" y1="${item.h*0.8}" x2="${item.w*0.7}" y2="${item.h*0.8}" stroke="${item.stroke}" stroke-width="2"/>
    `;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${item.w} ${item.h}" width="${item.w}" height="${item.h}">
  <!-- Paper Background -->
  <rect width="100%" height="100%" fill="${item.bg}"/>
  <rect x="24" y="24" width="${item.w - 48}" height="${item.h - 48}" fill="none" stroke="rgba(21,36,56,0.12)" stroke-width="1.5"/>

  <!-- Ink Art -->
  <g>
    ${innerArt}
  </g>

  <!-- Emboss / Ink Stamp Details -->
  <circle cx="${item.w*0.82}" cy="${item.h*0.88}" r="22" fill="none" stroke="#d4a24c" stroke-width="1.5" stroke-dasharray="4 2"/>
  <text x="${item.w*0.82}" y="${item.h*0.88 + 4}" font-family="sans-serif" font-size="11" fill="#d4a24c" text-anchor="middle" font-weight="bold">INK</text>
  <text x="${item.w * 0.1}" y="${item.h - 36}" font-family="sans-serif" font-size="12" fill="#79654c" letter-spacing="3">SERIES ${item.name.toUpperCase()}</text>
</svg>`;
}

function generateWorstSVG(item) {
  let doodle = '';
  if (item.type === 'potato-cat') {
    doodle = `
      <ellipse cx="${item.w*0.5}" cy="${item.h*0.52}" rx="${item.w*0.28}" ry="${item.h*0.22}" fill="#e6c280" stroke="#3d2a1d" stroke-width="5"/>
      <!-- Crooked ears -->
      <polygon points="${item.w*0.32},${item.h*0.34} ${item.w*0.26},${item.h*0.18} ${item.w*0.44},${item.h*0.32}" fill="#d4a24c" stroke="#3d2a1d" stroke-width="4"/>
      <polygon points="${item.w*0.58},${item.h*0.32} ${item.w*0.74},${item.h*0.22} ${item.w*0.68},${item.h*0.35}" fill="#d4a24c" stroke="#3d2a1d" stroke-width="4"/>
      <!-- Derpy Eyes -->
      <circle cx="${item.w*0.42}" cy="${item.h*0.45}" r="16" fill="#fff" stroke="#3d2a1d" stroke-width="3"/>
      <circle cx="${item.w*0.45}" cy="${item.h*0.45}" r="6" fill="#111"/>
      <circle cx="${item.w*0.58}" cy="${item.h*0.47}" r="22" fill="#fff" stroke="#3d2a1d" stroke-width="3"/>
      <circle cx="${item.w*0.56}" cy="${item.h*0.49}" r="7" fill="#111"/>
      <!-- Nose & Mouth -->
      <polygon points="${item.w*0.49},${item.h*0.55} ${item.w*0.52},${item.h*0.55} ${item.w*0.505},${item.h*0.58}" fill="#f28e8e"/>
      <path d="M ${item.w*0.44} ${item.h*0.62} Q ${item.w*0.5} ${item.h*0.68} ${item.w*0.57} ${item.h*0.61}" fill="none" stroke="#3d2a1d" stroke-width="3"/>
      <!-- Stick legs -->
      <line x1="${item.w*0.35}" y1="${item.h*0.72}" x2="${item.w*0.35}" y2="${item.h*0.86}" stroke="#3d2a1d" stroke-width="5" stroke-linecap="round"/>
      <line x1="${item.w*0.45}" y1="${item.h*0.73}" x2="${item.w*0.43}" y2="${item.h*0.87}" stroke="#3d2a1d" stroke-width="5" stroke-linecap="round"/>
      <line x1="${item.w*0.58}" y1="${item.h*0.73}" x2="${item.w*0.60}" y2="${item.h*0.86}" stroke="#3d2a1d" stroke-width="5" stroke-linecap="round"/>
      <line x1="${item.w*0.66}" y1="${item.h*0.71}" x2="${item.w*0.70}" y2="${item.h*0.85}" stroke="#3d2a1d" stroke-width="5" stroke-linecap="round"/>
    `;
  } else if (item.type === 'hand') {
    doodle = `
      <!-- Palm -->
      <path d="M ${item.w*0.35} ${item.h*0.8} L ${item.w*0.32} ${item.h*0.55} Q ${item.w*0.5} ${item.h*0.45} ${item.w*0.68} ${item.h*0.55} L ${item.w*0.65} ${item.h*0.8} Z" fill="#ffd4b2" stroke="#4a2e18" stroke-width="4"/>
      <!-- 7 weird fingers -->
      <path d="M ${item.w*0.32} ${item.h*0.55} C ${item.w*0.22} ${item.h*0.45}, ${item.w*0.2} ${item.h*0.35}, ${item.w*0.26} ${item.h*0.32} C ${item.w*0.32} ${item.h*0.35}, ${item.w*0.35} ${item.h*0.45}, ${item.w*0.36} ${item.h*0.52}" fill="#ffd4b2" stroke="#4a2e18" stroke-width="4"/>
      <path d="M ${item.w*0.36} ${item.h*0.5} C ${item.w*0.34} ${item.h*0.25}, ${item.w*0.38} ${item.h*0.18}, ${item.w*0.42} ${item.h*0.2} C ${item.w*0.46} ${item.h*0.25}, ${item.w*0.42} ${item.h*0.45}, ${item.w*0.42} ${item.h*0.48}" fill="#ffd4b2" stroke="#4a2e18" stroke-width="4"/>
      <path d="M ${item.w*0.43} ${item.h*0.48} C ${item.w*0.45} ${item.h*0.22}, ${item.w*0.49} ${item.h*0.16}, ${item.w*0.53} ${item.h*0.18} C ${item.w*0.57} ${item.h*0.22}, ${item.w*0.51} ${item.h*0.45}, ${item.w*0.5} ${item.h*0.48}" fill="#ffd4b2" stroke="#4a2e18" stroke-width="4"/>
      <path d="M ${item.w*0.5} ${item.h*0.48} C ${item.w*0.54} ${item.h*0.24}, ${item.w*0.58} ${item.h*0.2}, ${item.w*0.62} ${item.h*0.22} C ${item.w*0.66} ${item.h*0.26}, ${item.w*0.6} ${item.h*0.45}, ${item.w*0.57} ${item.h*0.49}" fill="#ffd4b2" stroke="#4a2e18" stroke-width="4"/>
      <path d="M ${item.w*0.58} ${item.h*0.49} C ${item.w*0.64} ${item.h*0.28}, ${item.w*0.68} ${item.h*0.26}, ${item.w*0.72} ${item.h*0.3} C ${item.w*0.75} ${item.h*0.35}, ${item.w*0.68} ${item.h*0.48}, ${item.w*0.64} ${item.h*0.52}" fill="#ffd4b2" stroke="#4a2e18" stroke-width="4"/>
      <path d="M ${item.w*0.64} ${item.h*0.53} C ${item.w*0.74} ${item.h*0.38}, ${item.w*0.78} ${item.h*0.37}, ${item.w*0.81} ${item.h*0.42} C ${item.w*0.83} ${item.h*0.48}, ${item.w*0.74} ${item.h*0.56}, ${item.w*0.68} ${item.h*0.58}" fill="#ffd4b2" stroke="#4a2e18" stroke-width="4"/>
      <path d="M ${item.w*0.68} ${item.h*0.59} C ${item.w*0.8} ${item.h*0.52}, ${item.w*0.85} ${item.h*0.55}, ${item.w*0.84} ${item.h*0.62} C ${item.w*0.82} ${item.h*0.68}, ${item.w*0.75} ${item.h*0.7}, ${item.w*0.66} ${item.h*0.72}" fill="#ffd4b2" stroke="#4a2e18" stroke-width="4"/>
      <text x="${item.w*0.5}" y="${item.h*0.9}" font-family="cursive" font-size="24" fill="#a83232" text-anchor="middle">"Why are there seven?!"</text>
    `;
  } else {
    doodle = `
      <circle cx="${item.w*0.5}" cy="${item.h*0.45}" r="${item.w*0.26}" fill="#fce38a" stroke="#333" stroke-width="4"/>
      <circle cx="${item.w*0.4}" cy="${item.h*0.4}" r="12" fill="#333"/>
      <circle cx="${item.w*0.6}" cy="${item.h*0.42}" r="18" fill="#333"/>
      <path d="M ${item.w*0.35} ${item.h*0.58} Q ${item.w*0.5} ${item.h*0.72} ${item.w*0.65} ${item.h*0.52}" fill="none" stroke="#e84a5f" stroke-width="6" stroke-linecap="round"/>
      <text x="${item.w*0.5}" y="${item.h*0.85}" font-family="cursive" font-size="28" fill="#ff5722" text-anchor="middle">Masterpiece in progress</text>
    `;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${item.w} ${item.h}" width="${item.w}" height="${item.h}">
  <!-- Outer Dark/Wood Background -->
  <rect width="100%" height="100%" fill="${item.bg}"/>

  <!-- Paper Card (Slightly Angled Look) -->
  <g transform="translate(${item.w*0.06}, ${item.h*0.06})">
    <rect width="${item.w*0.88}" height="${item.h*0.88}" rx="8" fill="${item.paper}" stroke="#d6ccb8" stroke-width="2"/>
    
    <!-- Grid pattern on paper -->
    <defs>
      <pattern id="grid_${item.id}" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.05)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="${item.w*0.88}" height="${item.h*0.88}" rx="8" fill="url(#grid_${item.id})"/>

    <!-- Doodle Content -->
    ${doodle}

    <!-- Washi Tape Accent on Top-Right -->
    <rect x="${item.w*0.65}" y="-12" width="${item.w*0.22}" height="32" rx="2" fill="rgba(212,162,76,0.65)" transform="rotate(12 ${item.w*0.65} 0)"/>
    <!-- Washi Tape Accent on Bottom-Left -->
    <rect x="-10" y="${item.h*0.75}" width="${item.w*0.2}" height="28" rx="2" fill="rgba(230,126,34,0.55)" transform="rotate(-8 0 ${item.h*0.75})"/>
  </g>
</svg>`;
}

// Generate oil painting SVGs and JPGs
oilPaintings.forEach(item => {
  const svgPath = `public/art/oil/${item.name}.svg`;
  const jpgPath = `public/art/oil/${item.name}.jpg`;
  const svg = generateOilSVG(item);
  fs.writeFileSync(svgPath, svg);
  try {
    execSync(`"${FFMPEG_PATH}" -y -i "${svgPath}" -q:v 2 "${jpgPath}"`, { stdio: 'ignore' });
  } catch (e) {
    // fallback copy/keep
  }
});

// Generate line art SVGs and JPGs
lineArtDrawings.forEach(item => {
  const svgPath = `public/art/line/${item.name}.svg`;
  const jpgPath = `public/art/line/${item.name}.jpg`;
  const svg = generateLineSVG(item);
  fs.writeFileSync(svgPath, svg);
  try {
    execSync(`"${FFMPEG_PATH}" -y -i "${svgPath}" -q:v 2 "${jpgPath}"`, { stdio: 'ignore' });
  } catch (e) {
    // fallback
  }
});

// Generate worst art SVGs and JPGs
worstArtPieces.forEach(item => {
  const svgPath = `public/art/worst/${item.name}.svg`;
  const jpgPath = `public/art/worst/${item.name}.jpg`;
  const svg = generateWorstSVG(item);
  fs.writeFileSync(svgPath, svg);
  try {
    execSync(`"${FFMPEG_PATH}" -y -i "${svgPath}" -q:v 2 "${jpgPath}"`, { stdio: 'ignore' });
  } catch (e) {
    // fallback
  }
});

console.log('Successfully generated 24 artworks (SVG + JPG)!');
