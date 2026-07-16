import type { CountryCode, Offer } from '@/lib/types';

// ---------------------------------------------------------------------------
// RETAILER CONNECTOR ARCHITECTURE
// ---------------------------------------------------------------------------
// Each retailer integration implements this interface. The demo layer ships a
// DemoConnector; production connectors (Noon affiliate feed, Amazon Product
// Advertising API, Snoonu partner feed) implement the same contract so the rest
// of the app never changes. See README "Connecting real data".
//
// COMPLIANCE: Connectors must use official APIs, affiliate feeds or authorized
// product feeds only. No unauthorized scraping. Keep API keys in env vars.
// ---------------------------------------------------------------------------

export interface ConnectorContext {
  country: CountryCode;
  /** Secrets are injected from environment variables, never hard-coded. */
  credentials: Record<string, string | undefined>;
  now: number;
}

export interface SyncResult {
  retailer: string;
  ok: boolean;
  offers: Offer[];
  imported: number;
  failed: number;
  errors: string[];
  finishedAt: string;
}

export interface LinkCheckResult {
  url: string;
  ok: boolean;
  status?: number;
  priceMatches?: boolean;
}

export interface RetailerConnector {
  slug: string;
  /** 'demo' until a real integration is wired up. */
  kind: 'demo' | 'affiliate-feed' | 'official-api' | 'product-feed';
  /** Pull the latest offers for a country. */
  fetchOffers(ctx: ConnectorContext): Promise<SyncResult>;
  /** Verify an outbound product link still resolves and the price still matches. */
  verifyLink?(url: string, ctx: ConnectorContext): Promise<LinkCheckResult>;
}
