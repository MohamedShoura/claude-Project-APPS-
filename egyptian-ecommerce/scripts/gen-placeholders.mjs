import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dirname, "..", "public", "img");

const PALETTE = {
  brand: ["#0e7c66", "#0b6353", "#199b7d"],
  gold: ["#c9a227", "#dcac37", "#a87f1d"],
  cta: ["#e4572e", "#f76f42", "#d13f1c"],
};

function hashSeed(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

const ICONS = {
  electronics: (c) =>
    `<rect x="130" y="90" width="140" height="220" rx="24" fill="none" stroke="${c}" stroke-width="8"/>
     <circle cx="200" cy="270" r="10" fill="${c}"/>
     <rect x="155" y="115" width="90" height="130" rx="6" fill="${c}" opacity="0.18"/>`,
  fashion: (c) =>
    `<path d="M200 110 L240 145 L320 175 L300 210 L255 190 L255 300 L145 300 L145 190 L100 210 L80 175 L160 145 Z" fill="none" stroke="${c}" stroke-width="8" stroke-linejoin="round"/>
     <circle cx="200" cy="115" r="12" fill="none" stroke="${c}" stroke-width="6"/>`,
  beauty: (c) =>
    `<path d="M185 90 h30 v40 h10 a20 20 0 0 1 20 20 v130 a20 20 0 0 1-20 20 h-50 a20 20 0 0 1-20-20 v-130 a20 20 0 0 1 20-20 h10 z" fill="none" stroke="${c}" stroke-width="8"/>
     <line x1="165" y1="200" x2="235" y2="200" stroke="${c}" stroke-width="6"/>`,
  home: (c) =>
    `<path d="M90 210 L200 110 L310 210 V300 a10 10 0 0 1-10 10 H100 a10 10 0 0 1-10-10 Z" fill="none" stroke="${c}" stroke-width="8" stroke-linejoin="round"/>
     <rect x="175" y="240" width="50" height="70" fill="${c}" opacity="0.18"/>`,
  accessories: (c) =>
    `<path d="M150 150 v-20 a50 50 0 0 1 100 0 v20" fill="none" stroke="${c}" stroke-width="8"/>
     <rect x="120" y="150" width="160" height="150" rx="18" fill="none" stroke="${c}" stroke-width="8"/>`,
};

function svg({ w, h, seed, iconKey, paletteKey }) {
  const hash = hashSeed(seed);
  const [c1, c2, c3] = PALETTE[paletteKey];
  const angle = hash % 360;
  const cx = 60 + (hash % 30);
  const cy = 60 + ((hash >> 4) % 30);
  const icon = ICONS[iconKey] ? ICONS[iconKey]("#ffffff") : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="g" gradientTransform="rotate(${angle} 0.5 0.5)">
      <stop offset="0%" stop-color="${c2}"/>
      <stop offset="55%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c3}"/>
    </linearGradient>
    <radialGradient id="r" cx="${cx}%" cy="${cy}%" r="75%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="url(#g)"/>
  <rect width="400" height="400" fill="url(#r)"/>
  <g transform="translate(0,0)" opacity="0.95">${icon}</g>
</svg>`;
}

function write(pathParts, content) {
  const full = join(ROOT, ...pathParts);
  mkdirSync(join(full, ".."), { recursive: true });
  writeFileSync(full, content, "utf8");
}

const categories = [
  { slug: "electronics", icon: "electronics", palette: "brand" },
  { slug: "fashion", icon: "fashion", palette: "gold" },
  { slug: "beauty", icon: "beauty", palette: "cta" },
  { slug: "home", icon: "home", palette: "brand" },
  { slug: "accessories", icon: "accessories", palette: "gold" },
];

for (const c of categories) {
  write(["categories", `${c.slug}.svg`], svg({ w: 600, h: 600, seed: `cat-${c.slug}`, iconKey: c.icon, paletteKey: c.palette }));
}

write(["hero", "hero.svg"], svg({ w: 900, h: 900, seed: "hero", iconKey: "fashion", paletteKey: "brand" }));
write(["hero", "offer.svg"], svg({ w: 800, h: 600, seed: "offer", iconKey: "electronics", paletteKey: "gold" }));

const products = [
  { id: "p1", category: "electronics", count: 4 },
  { id: "p2", category: "electronics", count: 3 },
  { id: "p3", category: "electronics", count: 3 },
  { id: "p4", category: "electronics", count: 2 },
  { id: "p5", category: "electronics", count: 2 },
  { id: "p6", category: "electronics", count: 2 },
  { id: "p7", category: "fashion", count: 3 },
  { id: "p8", category: "fashion", count: 2 },
  { id: "p9", category: "fashion", count: 3 },
  { id: "p10", category: "fashion", count: 2 },
  { id: "p11", category: "fashion", count: 2 },
  { id: "p12", category: "fashion", count: 2 },
  { id: "p13", category: "beauty", count: 2 },
  { id: "p14", category: "beauty", count: 2 },
  { id: "p15", category: "beauty", count: 2 },
  { id: "p16", category: "beauty", count: 2 },
  { id: "p17", category: "home", count: 2 },
  { id: "p18", category: "home", count: 2 },
  { id: "p19", category: "home", count: 2 },
  { id: "p20", category: "home", count: 2 },
  { id: "p21", category: "accessories", count: 2 },
  { id: "p22", category: "accessories", count: 2 },
  { id: "p23", category: "accessories", count: 2 },
  { id: "p24", category: "accessories", count: 2 },
];

const catMeta = Object.fromEntries(categories.map((c) => [c.slug, c]));
const letters = ["a", "b", "c", "d"];

for (const p of products) {
  const meta = catMeta[p.category];
  for (let i = 0; i < p.count; i++) {
    const letter = letters[i];
    write(["products", `${p.id}-${letter}.svg`], svg({ w: 900, h: 900, seed: `${p.id}-${letter}`, iconKey: meta.icon, paletteKey: meta.palette }));
  }
}

console.log("Generated placeholder SVGs in public/img");
