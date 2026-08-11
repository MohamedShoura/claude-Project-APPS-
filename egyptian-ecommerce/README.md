# Neel Store — نيل ستور

A modern, mobile-first eCommerce storefront and admin dashboard built for the Egyptian market.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4** — brand theme in `src/app/globals.css`
- **Zustand** (with `persist`) for cart, wishlist, recently-viewed, auth, orders, and admin state
- **Recharts** for the admin analytics dashboard
- **lucide-react** for icons

## Getting started

```bash
npm install
npm run dev
```

- Storefront: `http://localhost:3000/ar` or `/en`
- Admin dashboard: `http://localhost:3000/admin`

## Structure

- `src/app/(site)/[locale]/…` — bilingual (Arabic RTL / English LTR) storefront routes
- `src/app/(admin)/admin/…` — admin dashboard (English/LTR)
- `src/data/` — typed sample content: products, categories, orders, customers, coupons, governorates
- `src/store/` — client-side state (cart, wishlist, auth, orders, admin)
- `src/i18n/` — locale config, dictionaries (`ar`/`en`), price formatting
- `src/components/` — UI organized by domain (home, product, cart, checkout, account, admin, layout, shared)
- `scripts/gen-placeholders.mjs` — generates the brand-gradient placeholder SVGs in `public/img`

## Notes on this build

This is a fully-designed, functional demo storefront + admin dashboard using realistic sample data and client-side state (persisted to `localStorage`) in place of a real backend/database and live payment gateways. To take it to production you would typically add:

- A real database (orders, products, customers, inventory) behind the admin dashboard actions
- Live payment gateway integration (e.g. Paymob, Fawry) for card/wallet/InstaPay
- Real authentication for customer accounts and admin access control
- A CMS or admin-driven content pipeline for product images instead of the placeholder generator

Marketing/analytics tracking (Meta Pixel, GA4, GTM, TikTok Pixel) is wired end-to-end — enter IDs in **Admin → Marketing** and the storefront will load the scripts and fire `view_item`, `add_to_cart`, `begin_checkout`, `purchase`, `search`, `generate_lead`, and `whatsapp_click` events automatically.
