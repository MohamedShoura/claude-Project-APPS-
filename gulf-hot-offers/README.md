# Gulf Hot Offers 🔥

**The Best Gulf Deals in One Place.**

A bilingual (Arabic RTL / English LTR) **deal-discovery and price-comparison** platform for
**Qatar 🇶🇦, Saudi Arabia 🇸🇦 and the UAE 🇦🇪**. It collects, organises and compares the hottest
online shopping offers and redirects shoppers to the original retailer via external/affiliate links.

> ⚠️ **Gulf Hot Offers is an independent deal-discovery website and is not the official website of
> Noon, Amazon, or Snoonu.** Retailer names/logos are used for identification only.

> 🧪 **This build ships with a clearly-labelled _Demo Data_ layer.** Prices are realistic sample
> values, **not live**. A modular connector architecture lets you plug in official APIs / affiliate
> feeds later — see [Connecting real data](#connecting-real-data).

---

## ✨ Features

- **Bilingual & regional** — Arabic (RTL) + English (LTR), instant language switch, per-country
  currency (QAR / SAR / AED), country selector with **non-forced** geo recommendation.
- **Homepage** — hero, flash deals with live countdowns, 13+ curated sections (top discounts,
  ending soon, electronics, mobiles, fashion, beauty, home, grocery, baby, gaming, trending, most
  viewed, recently added), top coupons, retailer logos, newsletter + WhatsApp subscribe.
- **Deals catalogue** — grid/list views, advanced filters (country, retailer, category, brand,
  price, discount, rating, free delivery, in-stock, coupon, ending-soon, verified, new,
  lowest-recorded-price), 8 sort orders, active-filter tags, results count, pagination, mobile
  filter drawer, working URL-driven state.
- **Product page** — image gallery, full pricing, amount saved, **Deal Score (0–100)**, rating,
  stock, delivery, expiry countdown, coupon copy, **Go to Store** (opens retailer in a new tab),
  affiliate disclosure, description + specs, **interactive price-history chart** (7/30/90-day
  stats + lowest/highest/average), offers from other retailers, better-price alternatives, similar
  offers, report-incorrect-price, and WhatsApp/X/Facebook/Telegram/copy sharing.
- **Price comparison** — one product across every retailer, matched by **product identifiers**
  (SKU / GTIN / model / storage / colour), not just titles. Highlights lowest price, lowest
  delivered total, fastest delivery and top-rated retailer.
- **Coupons** — copy button, verification + success-rate, "Worked / Didn't work" voting, country &
  category filters (electronics, fashion, beauty, grocery, home, new-customer, free-shipping,
  bank-card).
- **Categories & retailers** — SEO landing pages per category and per retailer.
- **User account (demo)** — email / Google / Apple sign-in (stored locally), favourites, price
  alerts (_"notify me when it drops below X"_), recently viewed, country/language preferences.
- **Admin dashboard** — overview stats, connector integration table with status + manual sync,
  affiliate analytics (clicks, CTR, conversions, revenue by country/retailer), top-converting
  deals, offer management view.
- **Smart features** — Deal Score with **suspicious/inflated-discount detection**, price history,
  duplicate detection via identity keys, lowest-recorded-price.
- **SEO** — SSR, dynamic metadata, Product + Breadcrumb + FAQ JSON-LD, Open Graph, canonicals,
  `sitemap.xml`, `robots.txt`, clean URLs, hreflang.
- **Mobile-first & PWA** — bottom nav, sticky search, swipeable rails, sticky Go-to-Store,
  touch-friendly copy buttons, web manifest, responsive RTL/LTR.

---

## 🧱 Tech stack

| Layer            | Choice                                                   |
| ---------------- | ------------------------------------------------------- |
| Framework        | **Next.js 15** (App Router, SSR) + **React 19**         |
| Language         | **TypeScript**                                          |
| Styling          | **Tailwind CSS** (custom Gulf design system)            |
| State            | React Context + `localStorage` (favourites/alerts/auth) |
| Data (demo)      | In-memory demo layer (`src/data`)                       |
| Data (prod)      | PostgreSQL + Prisma (`prisma/schema.prisma`)            |
| Search           | Client index (demo) → Meilisearch/Typesense (prod)      |
| Connectors       | `RetailerConnector` interface (`src/connectors`)        |

No database, Redis or API keys are required to run the demo.

---

## 🚀 Getting started

```bash
cd gulf-hot-offers
npm install
npm run dev          # http://localhost:3000
```

Build & run production:

```bash
npm run build
npm start
```

Optional environment config:

```bash
cp .env.example .env.local   # all values optional for the demo
```

---

## 🗺️ Sitemap / routes

```
/                       Home (uses selected country cookie)
/qa  /sa  /ae           Country home pages
/deals                  Full catalogue (filters + sort + pagination via URL params)
/product/[slug]         Product deal page
/compare                Price comparison tool
/coupons                Coupon codes
/categories             Category index
/category/[slug]        SEO category landing
/retailers              Retailer index
/retailer/[slug]        SEO retailer landing
/account                User dashboard (favourites, alerts, recently viewed)
/admin                  Admin dashboard
/about /contact /privacy /terms /cookies
/affiliate-disclosure /how-we-rank /report
/sitemap.xml  /robots.txt  /manifest.webmanifest
```

Example deep links: `/qa`, `/category/smartphones`, `/deals?category=tvs&country=sa&sort=discount`,
`/retailer/amazon-ae`, `/compare?product=iphone-17-pro-256-noon-qa`.

---

## 🏗️ Architecture

```
src/
├─ app/                # routes (SSR pages, sitemap, robots, manifest)
├─ components/         # UI: header, footer, cards, filters, charts, providers
├─ connectors/         # RetailerConnector interface + demo connector + registry
├─ data/               # demo data layer (reference, offers, coupons, legal)
├─ i18n/               # locale helpers + AR/EN dictionaries
├─ lib/                # types, formatting, deal-score, queries, params, admin stats
└─ styles/             # Tailwind globals + design tokens
prisma/schema.prisma   # recommended production DB schema
```

Layers map directly to the brief: **frontend**, **connector layer** (`src/connectors`), **search
service** (`src/lib/search-index.ts`), **affiliate tracking** (external URLs carry UTM params),
**admin/analytics** (`src/lib/admin-stats.ts`), **notifications** (subscription UIs + Prisma
`Notification` model).

### The Deal Score

`src/lib/deal-score.ts` blends discount-vs-90-day-average, lowest-ever price, retailer reliability,
rating, review depth, stock, shipping, coupon and urgency into a 0–100 score. A discount off an
**inflated previous price** is penalised and flagged `Possible Inflated Discount` — an offer is
never called _exceptional_ on the displayed discount alone.

---

## 🔌 Connecting real data

The app never talks to the demo dataset directly for retailer sync — it goes through the
**connector registry** (`src/connectors/index.ts`). To connect an official source:

1. **Implement** `RetailerConnector` (`src/connectors/types.ts`) in e.g.
   `src/connectors/noon.ts`, using the official API / affiliate feed. Read keys from
   `process.env` (see `.env.example`) — **never hard-code secrets, never use `NEXT_PUBLIC_`**.
2. **Register** it in `src/connectors/index.ts`, guarded by its credentials:
   ```ts
   if (process.env.NOON_AFFILIATE_TOKEN) register(createNoonConnector('noon-ae'));
   else register(createDemoConnector('noon-ae'));
   ```
3. **Persist** results to PostgreSQL (`prisma/schema.prisma`) via a background job (queue + retry +
   rate-limit + structured logging), compute Deal Score, append price history, detect duplicates &
   expired offers, then publish. Flip the retailer's `connectorStatus` to `connected`.

Everything downstream (pages, comparison, search, admin) is unchanged — only the data source
switches from demo to live.

> **Compliance:** use only official APIs, affiliate feeds or authorised product feeds. Do **not**
> scrape without authorisation or bypass retailer security. Do not present demo prices as live.

### Suggested update cadence (background jobs)

| Job                    | Frequency        |
| ---------------------- | ---------------- |
| Flash offers           | 15–30 min        |
| Regular offers         | 1–4 h            |
| Availability           | 1–2 h            |
| Coupon verification    | 6 h              |
| Expired cleanup        | daily            |
| Price-history rollup   | daily            |

---

## ☁️ Deployment

**Vercel (recommended)**

1. Push this repo to GitHub.
2. Import into Vercel, set the project root to `gulf-hot-offers`.
3. Add env vars from `.env.example` (all optional for the demo).
4. Deploy — Vercel runs `npm run build` and serves the SSR app.

**Docker / self-host**

```bash
npm run build
npm start            # serves on :3000 (put Nginx/HTTPS in front)
```

**Database (when going live):** provision PostgreSQL + Redis, set `DATABASE_URL` / `REDIS_URL`,
run `npx prisma migrate deploy`, then enable connectors.

---

## 📄 License & disclaimers

Demonstration project. Prices and availability may change on the retailer's website — always verify
the final price before completing a purchase. Independent platform; not affiliated with Noon,
Amazon or Snoonu unless explicitly stated.
