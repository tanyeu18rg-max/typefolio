// Generates abstract duotone SVG placeholder covers — geometric/typographic
// compositions in the token preset palettes. NOT copies of any real artwork.
// Run: npm run placeholders
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const worksDir = join(root, 'public', 'assets', 'works');
const awardsDir = join(root, 'public', 'assets', 'awards');

// Mirrors the token presets so placeholders feel native to any theme.
const PALETTES = [
  { bg: '#FAF9F7', fg: '#171310' },
  { bg: '#131110', fg: '#F5F1E8' },
  { bg: '#0F1E14', fg: '#EAE3CF' },
  { bg: '#F5F0E6', fg: '#A83A1E' },
];

const W = 800;
const H = 600;

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function escapeXml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function svgDoc(label, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeXml(label)}">
${inner}
</svg>
`;
}

function workCover(title, seed) {
  const rand = mulberry32(seed * 7919 + 13);
  const p = PALETTES[seed % PALETTES.length];
  let shapes = `  <rect width="${W}" height="${H}" fill="${p.bg}"/>\n`;

  // Large off-center disc
  const cx = 140 + rand() * 520;
  const cy = 110 + rand() * 380;
  const r = 130 + rand() * 170;
  shapes += `  <circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(0)}" fill="${p.fg}" opacity="0.92"/>\n`;

  // Horizontal bars
  const bars = 3 + Math.floor(rand() * 3);
  for (let i = 0; i < bars; i++) {
    const bw = 120 + rand() * 400;
    const bh = 14 + rand() * 26;
    const bx = rand() * (W - bw);
    const by = 70 + i * ((H - 140) / bars) + rand() * 24;
    shapes += `  <rect x="${bx.toFixed(0)}" y="${by.toFixed(0)}" width="${bw.toFixed(0)}" height="${bh.toFixed(0)}" fill="${p.fg}" opacity="${(0.22 + rand() * 0.5).toFixed(2)}"/>\n`;
  }

  // Ring accent, mirrored side from the disc
  const ringX = cx > W / 2 ? 150 : W - 150;
  shapes += `  <circle cx="${ringX}" cy="150" r="64" fill="none" stroke="${p.fg}" stroke-width="20"/>\n`;

  // Oversized initial + index label
  const letter = escapeXml(title.trim().charAt(0).toUpperCase() || '·');
  shapes += `  <text x="${W - 56}" y="${H - 40}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="210" fill="${p.fg}">${letter}</text>\n`;
  shapes += `  <text x="48" y="${H - 52}" font-family="Arial, Helvetica, sans-serif" font-size="26" letter-spacing="6" fill="${p.fg}" opacity="0.7">WORK ${String(seed).padStart(2, '0')}</text>\n`;

  return svgDoc(`${title} — placeholder cover`, shapes);
}

function awardCover(label, seed) {
  const rand = mulberry32(seed * 104729 + 7);
  const p = PALETTES[(seed + 1) % PALETTES.length];
  let shapes = `  <rect width="${W}" height="${H}" fill="${p.bg}"/>\n`;

  // Certificate frame
  shapes += `  <rect x="44" y="44" width="${W - 88}" height="${H - 88}" fill="none" stroke="${p.fg}" stroke-width="6"/>\n`;
  shapes += `  <rect x="64" y="64" width="${W - 128}" height="${H - 128}" fill="none" stroke="${p.fg}" stroke-width="2" opacity="0.6"/>\n`;

  // Seal: concentric circles
  const sealR = 90 + rand() * 40;
  shapes += `  <circle cx="${W / 2}" cy="${H / 2 - 30}" r="${sealR.toFixed(0)}" fill="${p.fg}" opacity="0.9"/>\n`;
  shapes += `  <circle cx="${W / 2}" cy="${H / 2 - 30}" r="${(sealR * 0.55).toFixed(0)}" fill="none" stroke="${p.bg}" stroke-width="10"/>\n`;

  // Ribbon bars
  const bars = 2 + Math.floor(rand() * 2);
  for (let i = 0; i < bars; i++) {
    const bw = 200 + rand() * 260;
    shapes += `  <rect x="${((W - bw) / 2).toFixed(0)}" y="${(H - 170 + i * 44).toFixed(0)}" width="${bw.toFixed(0)}" height="16" fill="${p.fg}" opacity="${(0.35 + rand() * 0.4).toFixed(2)}"/>\n`;
  }

  shapes += `  <text x="${W / 2}" y="130" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="30" letter-spacing="10" fill="${p.fg}">${escapeXml(label.toUpperCase())}</text>\n`;

  return svgDoc(`${label} — placeholder certificate`, shapes);
}

const WORK_TITLES = [
  'Northwind Dashboard',
  'Field Notes',
  'Meridian Identity',
  'Pulse Analytics',
  'Harbor Commerce',
  'Atlas Portfolio',
  'Signal Chat',
  'Drift Travel',
  'Ledger Finance',
  'Prism System',
];

const AWARD_LABELS = ['Site of the Day', 'Developer Award', 'Design Honor', 'Typography Honor'];

mkdirSync(worksDir, { recursive: true });
mkdirSync(awardsDir, { recursive: true });

WORK_TITLES.forEach((title, i) => {
  const seed = i + 1;
  const name = `work-${String(seed).padStart(2, '0')}.svg`;
  writeFileSync(join(worksDir, name), workCover(title, seed));
  console.log(`wrote public/assets/works/${name}`);
});

AWARD_LABELS.forEach((label, i) => {
  const seed = i + 1;
  const name = `award-${String(seed).padStart(2, '0')}.svg`;
  writeFileSync(join(awardsDir, name), awardCover(label, seed));
  console.log(`wrote public/assets/awards/${name}`);
});
