export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "Makeup" | "Skincare" | "Hair Care" | "Perfumes" | "Beauty Tools" | "Bundles & Sets";
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: "Best Seller" | "New" | "Limited Stock";
  skinType?: string;
  emoji: string;
  description: string;
  benefits: string[];
  howToUse: string;
  ingredients: string;
};

export const products: Product[] = [
  {
    id: "rose-gold-serum",
    name: "Radiance Vitamin C Serum",
    brand: "Lumière Lab",
    category: "Skincare",
    price: 149,
    oldPrice: 189,
    rating: 4.8,
    reviews: 312,
    badge: "Best Seller",
    skinType: "All Skin Types",
    emoji: "✨",
    description:
      "A lightweight, fast-absorbing serum that brightens, evens skin tone, and protects against environmental stress for a luminous glow.",
    benefits: ["Brightens dull skin", "Reduces dark spots", "Boosts collagen", "Lightweight, non-greasy formula"],
    howToUse: "Apply 2-3 drops to clean skin morning and evening before moisturizer.",
    ingredients: "Vitamin C (15%), Hyaluronic Acid, Vitamin E, Ferulic Acid.",
  },
  {
    id: "velvet-matte-lipstick",
    name: "Velvet Matte Lipstick — Rose Nude",
    brand: "Lumière Color",
    category: "Makeup",
    price: 89,
    rating: 4.9,
    reviews: 540,
    badge: "Best Seller",
    emoji: "💋",
    description: "Long-wearing, transfer-resistant matte lipstick with a comfortable, hydrating feel.",
    benefits: ["8-hour wear", "Transfer-resistant", "Hydrating formula", "Rich pigment in one swipe"],
    howToUse: "Apply directly to lips or use a lip brush for precision. Layer for deeper color.",
    ingredients: "Shea Butter, Vitamin E, Jojoba Oil, Pigments.",
  },
  {
    id: "silk-foundation",
    name: "Silk Finish Foundation SPF 30",
    brand: "Lumière Color",
    category: "Makeup",
    price: 159,
    rating: 4.7,
    reviews: 218,
    badge: "New",
    emoji: "🤍",
    description: "Buildable, breathable foundation with SPF 30 protection for a natural, second-skin finish.",
    benefits: ["Medium to full coverage", "SPF 30 sun protection", "16-hour wear", "Suitable for sensitive skin"],
    howToUse: "Apply with a damp sponge or brush, building coverage as needed.",
    ingredients: "SPF 30 Filters, Squalane, Niacinamide.",
  },
  {
    id: "argan-hair-oil",
    name: "Argan Repair Hair Oil",
    brand: "Lumière Hair",
    category: "Hair Care",
    price: 99,
    rating: 4.6,
    reviews: 176,
    emoji: "💧",
    description: "Nourishing hair oil that repairs split ends, tames frizz, and adds brilliant shine.",
    benefits: ["Repairs damage", "Reduces frizz", "Adds shine", "Heat-protective"],
    howToUse: "Apply 2-3 drops to towel-dried or dry hair, focusing on ends.",
    ingredients: "Argan Oil, Vitamin E, Silk Proteins.",
  },
  {
    id: "oud-rose-perfume",
    name: "Oud & Rose Eau de Parfum",
    brand: "Lumière Oud",
    category: "Perfumes",
    price: 249,
    oldPrice: 299,
    rating: 4.9,
    reviews: 402,
    badge: "Best Seller",
    emoji: "🌹",
    description: "A rich, lingering blend of Arabian oud and Bulgarian rose — elegant and unforgettable.",
    benefits: ["Long-lasting 10+ hours", "Rich oud & rose notes", "Elegant glass bottle", "Perfect gift edit"],
    howToUse: "Spray on pulse points: wrists, neck, and behind the ears.",
    ingredients: "Oud Extract, Rose Absolute, Amber, Musk.",
  },
  {
    id: "jade-roller",
    name: "Jade Facial Roller & Gua Sha Set",
    brand: "Lumière Tools",
    category: "Beauty Tools",
    price: 79,
    rating: 4.5,
    reviews: 134,
    emoji: "🪨",
    description: "Natural jade roller and gua sha set to de-puff, sculpt, and boost circulation.",
    benefits: ["Reduces puffiness", "Sculpts contour", "Improves product absorption", "Cooling, calming effect"],
    howToUse: "Use on clean skin with facial oil, rolling outward and upward.",
    ingredients: "100% Natural Jade Stone.",
  },
  {
    id: "bridal-glow-bundle",
    name: "Bridal Glow Bundle",
    brand: "Lumière Edit",
    category: "Bundles & Sets",
    price: 399,
    oldPrice: 520,
    rating: 5.0,
    reviews: 88,
    badge: "Limited Stock",
    emoji: "💍",
    description: "A curated 5-piece skincare and makeup set to prep your skin for the big day.",
    benefits: ["5-piece luxury set", "Skincare + makeup essentials", "Gift-ready packaging", "Save 23% vs. individual price"],
    howToUse: "Follow included routine card: cleanse, serum, moisturize, then makeup prep.",
    ingredients: "Varies by product — see individual product pages.",
  },
  {
    id: "hydra-night-cream",
    name: "Overnight Hydra Repair Cream",
    brand: "Lumière Lab",
    category: "Skincare",
    price: 179,
    rating: 4.8,
    reviews: 261,
    badge: "New",
    skinType: "Dry & Sensitive",
    emoji: "🌙",
    description: "Rich, deeply hydrating night cream that repairs the skin barrier while you sleep.",
    benefits: ["Deep overnight hydration", "Repairs skin barrier", "Reduces redness", "Wake up to soft, plump skin"],
    howToUse: "Apply generously to clean skin as the last step of your night routine.",
    ingredients: "Ceramides, Hyaluronic Acid, Squalane, Centella Asiatica.",
  },
];

export const categories = [
  { name: "Makeup", emoji: "💄" },
  { name: "Skincare", emoji: "🧴" },
  { name: "Hair Care", emoji: "💧" },
  { name: "Perfumes", emoji: "🌹" },
  { name: "Beauty Tools", emoji: "🪞" },
  { name: "Bundles & Sets", emoji: "🎁" },
] as const;
