import type { ConnectorContext, RetailerConnector, SyncResult } from './types';
import { OFFERS } from '@/data/offers';

// Demo connector — returns the labelled demonstration dataset. Serves as the
// reference implementation of the RetailerConnector contract.
export function createDemoConnector(slug: string): RetailerConnector {
  return {
    slug,
    kind: 'demo',
    async fetchOffers(ctx: ConnectorContext): Promise<SyncResult> {
      const offers = OFFERS.filter((o) => o.retailer === slug && o.country === ctx.country);
      return {
        retailer: slug,
        ok: true,
        offers,
        imported: offers.length,
        failed: 0,
        errors: [],
        finishedAt: new Date(ctx.now).toISOString(),
      };
    },
    async verifyLink(url) {
      // Demo links always "resolve"; a real connector would issue a HEAD request
      // and compare the live price against the stored offer.
      return { url, ok: true, status: 200, priceMatches: true };
    },
  };
}
