// ---------------------------------------------------------------------------
// Gulf Hot Offers — core domain types
// These mirror the recommended database structure (see prisma/schema.prisma).
// ---------------------------------------------------------------------------

export type CountryCode = 'qa' | 'sa' | 'ae';
export type Locale = 'ar' | 'en';
export type Currency = 'QAR' | 'SAR' | 'AED';

export interface Country {
  code: CountryCode;
  name: Record<Locale, string>;
  currency: Currency;
  flag: string; // emoji flag for lightweight, dependency-free display
}

export interface Retailer {
  slug: string;
  name: Record<Locale, string>;
  /** Countries this retailer serves on the platform. */
  countries: CountryCode[];
  /** How the offer data is (or would be) sourced. */
  integration: 'affiliate-feed' | 'official-api' | 'product-feed' | 'demo';
  /** Data connector runtime status (surfaced in the admin dashboard). */
  connectorStatus: 'demo' | 'connected' | 'error' | 'disabled';
  logoColor: string; // brand-neutral identity chip color
  reliability: number; // 0-100, feeds the Deal Score
  externalBaseUrl: string;
  overview: Record<Locale, string>;
}

export interface Category {
  slug: string;
  name: Record<Locale, string>;
  icon: string; // emoji, keeps the demo asset-free
  parent?: string;
}

export interface Brand {
  slug: string;
  name: string;
}

export interface PricePoint {
  /** ISO date (YYYY-MM-DD). */
  date: string;
  price: number;
}

export type DealLabel =
  | 'exceptional'
  | 'hot'
  | 'good'
  | 'regular'
  | 'suspicious';

export interface Coupon {
  id: string;
  retailer: string; // retailer slug
  code: string;
  description: Record<Locale, string>;
  minOrder?: number;
  countries: CountryCode[];
  category: string; // category slug or "free-shipping" | "new-customer" | "bank-card"
  expiresAt?: string; // ISO
  verified: boolean;
  successRate: number; // 0-100
  worked: number;
  didntWork: number;
}

export interface Offer {
  id: string;
  slug: string;
  title: Record<Locale, string>;
  brand: string; // brand slug
  category: string; // category slug
  retailer: string; // retailer slug
  country: CountryCode;
  currency: Currency;

  price: number; // current price
  previousPrice: number; // struck-through reference price

  // Identity signals used for de-duplication / cross-retailer comparison.
  model?: string;
  sku?: string;
  gtin?: string;
  storage?: string;
  color?: string;
  size?: string;

  rating: number; // 0-5
  reviews: number;
  inStock: boolean;
  freeShipping: boolean;
  shippingFee: number;
  estimatedDeliveryDays: number;

  expiresAt?: string; // ISO — enables the countdown timer
  couponCode?: string;

  images: string[]; // data-URI SVG placeholders in the demo layer
  description: Record<Locale, string>;
  features: Record<Locale, string[]>;

  priceHistory: PricePoint[];
  lastUpdated: string; // ISO

  views: number;
  addedAt: string; // ISO
  verified: boolean;
  featured: boolean;
  /** True in the demo layer; false once a real connector supplies the offer. */
  demo: boolean;

  externalUrl: string; // original retailer product link (opened in a new tab)
}

export interface DealScore {
  score: number; // 0-100
  label: DealLabel;
  reasons: string[];
}

export interface PriceStats {
  current: number;
  lowest: number;
  highest: number;
  average: number;
  last7: number;
  last30: number;
  last90: number;
  isLowestEver: boolean;
}
