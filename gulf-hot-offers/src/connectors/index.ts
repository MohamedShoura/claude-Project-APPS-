import type { RetailerConnector } from './types';
import { createDemoConnector } from './demo';
import { RETAILERS } from '@/data/reference';

// ---------------------------------------------------------------------------
// CONNECTOR REGISTRY
// ---------------------------------------------------------------------------
// The registry is the single place that decides, per retailer, whether to use a
// live connector or the demo layer. To connect a real feed:
//   1. Implement RetailerConnector in src/connectors/<retailer>.ts using the
//      official API / affiliate feed (keys from process.env — see .env.example).
//   2. Register it below, guarded by the presence of its credentials.
//   3. Flip the retailer's `connectorStatus` to 'connected' in the admin data.
// Everything downstream (offer pages, comparison, search) is unchanged.
// ---------------------------------------------------------------------------

const registry = new Map<string, RetailerConnector>();

function register(connector: RetailerConnector) {
  registry.set(connector.slug, connector);
}

// --- Example of how a real connector would be conditionally registered ---
// import { createNoonConnector } from './noon';
// if (process.env.NOON_AFFILIATE_TOKEN) {
//   register(createNoonConnector('noon-ae'));
// } else {
//   register(createDemoConnector('noon-ae'));
// }

// Default: every retailer runs on the demo connector until credentials exist.
for (const r of RETAILERS) {
  register(createDemoConnector(r.slug));
}

export function getConnector(slug: string): RetailerConnector | undefined {
  return registry.get(slug);
}

export function allConnectors(): RetailerConnector[] {
  return [...registry.values()];
}

export { createDemoConnector };
export type { RetailerConnector } from './types';
