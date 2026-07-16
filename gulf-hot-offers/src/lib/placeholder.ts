// Lightweight, dependency-free product image placeholders.
// Every demo product renders as an inline SVG data URI so the project needs no
// binary assets and no external image host. When a real product-image CDN is
// connected, `Offer.images` simply carries https URLs instead.

const PALETTES: [string, string][] = [
  ['#0f1b2d', '#1e3a5f'],
  ['#c22a1e', '#e6392b'],
  ['#0e7490', '#22d3ee'],
  ['#7c3aed', '#a78bfa'],
  ['#c9a227', '#f2d675'],
  ['#166534', '#22c55e'],
  ['#9a3412', '#f97316'],
  ['#334155', '#64748b'],
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function productImage(seed: string, label: string, icon = ''): string {
  const h = hash(seed);
  const [c1, c2] = PALETTES[h % PALETTES.length];
  const initials = label
    .replace(/[^A-Za-z0-9؀-ۿ ]/g, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#g)"/>
  <circle cx="300" cy="250" r="150" fill="rgba(255,255,255,0.10)"/>
  <text x="300" y="285" font-family="Arial, sans-serif" font-size="150" font-weight="700" fill="rgba(255,255,255,0.92)" text-anchor="middle">${icon || initials}</text>
  <text x="300" y="470" font-family="Arial, sans-serif" font-size="34" fill="rgba(255,255,255,0.85)" text-anchor="middle">${label.slice(0, 22)}</text>
  <text x="300" y="520" font-family="Arial, sans-serif" font-size="20" fill="rgba(255,255,255,0.55)" text-anchor="middle">DEMO IMAGE</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
