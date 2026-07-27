# Dr. Mohamed Shoura — Portfolio Website

A modern, premium, fully responsive **bilingual (English / Arabic + RTL)**
portfolio website for **Dr. Mohamed Shoura** — International Corporate Trainer,
AI Consultant, and Business Growth Expert, and founder of **Nahj for Consulting
& Training** and **Marketing Growth Hub — MGH**.

Built as a production-ready Next.js application — not a static mockup.

---

## ✨ Highlights

- **Next.js 15 (App Router) + TypeScript** — SEO-friendly, statically rendered
- **Tailwind CSS** premium design system (dark burgundy `#6A0F24`, gold `#C9A25D`)
- **Framer Motion** — refined scroll reveals, animated counters, sliders
- **Lucide Icons** — clean, consistent iconography
- **Bilingual EN/AR** with full **RTL** layout and a visible language switcher
- **Dynamic routes** for training programs, case studies and blog articles
- **Working filters & search**, testimonial slider, media lightbox
- **Validated lead/booking form** (loading, success and error states)
- **Full SEO**: metadata, Open Graph, Twitter cards, sitemap, robots, JSON-LD
  schema (Person, ProfessionalService, Course, Article)
- **Accessible**: keyboard navigation, focus rings, reduced-motion support
- **Optimized images** via `next/image` with elegant branded fallbacks
- **Vercel deployment-ready**

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables and edit them
cp .env.example .env.local

# 3. Run the development server
npm run dev
# → http://localhost:3000
```

### Available commands

| Command             | Description                                   |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the development server                  |
| `npm run build`     | Create an optimized production build          |
| `npm run start`     | Run the production build locally              |
| `npm run lint`      | Run ESLint                                    |
| `npm run typecheck` | Type-check the project with `tsc`             |

---

## 📁 Project Structure

```
shoura-portfolio/
├── public/
│   ├── images/            # Photos (portrait, programs, cases, blog, gallery)
│   ├── logos/             # Company & client logos
│   ├── downloads/         # Company profile / CV (PDF)
│   └── README.txt         # Asset replacement guide
├── src/
│   ├── app/               # Routes (App Router)
│   │   ├── layout.tsx     # Root layout, fonts, providers, schema
│   │   ├── page.tsx       # Home
│   │   ├── about/
│   │   ├── training-programs/
│   │   │   └── [slug]/     # Dynamic program details
│   │   ├── consulting/
│   │   ├── case-studies/
│   │   │   └── [slug]/     # Dynamic case study details
│   │   ├── blog/
│   │   │   └── [slug]/     # Dynamic article details
│   │   ├── media/
│   │   ├── contact/
│   │   ├── book/           # Consultation booking
│   │   ├── privacy-policy/
│   │   ├── terms/
│   │   ├── not-found.tsx   # Custom 404
│   │   ├── sitemap.ts      # Dynamic sitemap
│   │   ├── robots.ts       # robots.txt
│   │   └── icon.svg        # Favicon
│   ├── components/
│   │   ├── layout/         # Header, Footer, LanguageSwitcher, WhatsApp, BackToTop
│   │   ├── sections/       # Page sections (Hero, About, Programs, etc.)
│   │   └── ui/             # Reusable primitives (cards, Figure, Counter, Reveal…)
│   ├── data/              # ★ EDITABLE CONTENT (see below)
│   ├── i18n/              # Language provider, dictionary, helpers
│   └── lib/               # SEO + JSON-LD schema builders
├── .env.example
├── tailwind.config.ts
└── next.config.mjs
```

---

## ✏️ Editing Content (no design code required)

All editable content lives in **`src/data/`**. Each translatable string is an
object `{ en: "…", ar: "…" }`, so updating text keeps both languages in sync.

| File                   | Controls                                             |
| ---------------------- | ---------------------------------------------------- |
| `data/profile.ts`      | Name, hero headline, titles, bio, stats, portrait    |
| `data/programs.ts`     | Training programs (dynamic routes)                   |
| `data/services.ts`     | Consulting services + training formats               |
| `data/expertise.ts`    | Areas of expertise cards                             |
| `data/experience.ts`   | Countries + activity timeline                        |
| `data/companies.ts`    | Nahj & MGH details and logos                         |
| `data/clients.ts`      | Client logo grid + industries                        |
| `data/caseStudies.ts`  | Case studies (dynamic routes)                        |
| `data/testimonials.ts` | Testimonials (placeholder — replace before launch)   |
| `data/articles.ts`     | Blog articles (dynamic routes)                       |
| `data/media.ts`        | Gallery images + video embeds                        |
| `data/contact.ts`      | Public contact info (reads from env vars)            |
| `data/legal.ts`        | Privacy Policy & Terms sections                      |
| `data/navigation.ts`   | Header & footer navigation links                     |

**UI labels** (buttons, section titles) live in `src/i18n/dictionary.ts`.

### Replacing images, logos & the profile PDF

Drop real files into `public/` at the paths listed in **`public/README.txt`**.
Until a file exists, an elegant **branded placeholder** is shown — so the site
never displays broken images.

- **Portrait**: `public/images/shoura-portrait.jpg`
- **Program images**: `public/images/programs/<program-slug>.jpg`
- **Logos**: `public/logos/nahj-logo.svg`, `public/logos/mgh-logo.svg`
  ⚠️ _Do not recolor, distort or change logo proportions._
- **Profile / CV**: `public/downloads/mohamed-shoura-profile.pdf`

### Updating contact details & links

Never hard-code private numbers. Set them in **`.env.local`** (see
`.env.example`) — `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_PHONE_*`,
`NEXT_PUBLIC_WHATSAPP`, and the social profile URLs.

> **Placeholder content**: Clients, testimonials, case-study results and blog
> articles are clearly labelled placeholders. Replace them with verified
> material before going live.

---

## 🔌 Connecting the Booking / Contact Form

The form works out of the box with a built-in mock handler (logs to the console
and shows the success state). To send real submissions, set
`NEXT_PUBLIC_FORM_ENDPOINT` in `.env.local`:

- **Formspree** — set it to `https://formspree.io/f/xxxxxxxx`
- **Custom API route / HubSpot / Zoho / Google Sheets / Supabase** — point it at
  your own endpoint that accepts a `POST` with `FormData`. Server-side keys
  (`HUBSPOT_*`, `ZOHO_WEBHOOK_URL`, `SUPABASE_*`, …) are stubbed in
  `.env.example` for your integration.

---

## 🌐 Language & RTL

English is the default. The switcher in the header toggles to Arabic, sets
`dir="rtl"` on `<html>`, swaps to the Arabic font (Cairo), and persists the
choice in `localStorage`. All layouts, icons and controls are RTL-aware.

---

## 🎨 Brand Colors

| Token         | Hex       | Usage                        |
| ------------- | --------- | ---------------------------- |
| Dark Burgundy | `#6A0F24` | Primary brand color          |
| Gold          | `#C9A25D` | Accent, highlights, CTAs     |
| Charcoal      | `#1A1A1D` | Dark sections & text         |
| Neutral BG    | `#F8F6F2` | Light section backgrounds    |

Defined in `tailwind.config.ts` — adjust once to re-theme the whole site.

---

## ▲ Deploying to Vercel

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — no build config needed
   (Build: `next build`, Output: `.next`).
4. Add your **Environment Variables** (from `.env.example`) in
   **Project → Settings → Environment Variables**.
5. Click **Deploy**. Add your custom domain and update
   `NEXT_PUBLIC_SITE_URL` to the production URL.

You can also deploy from the CLI:

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

---

## ✅ Quality

- ✔ TypeScript strict mode — no type errors
- ✔ ESLint (`next/core-web-vitals`) — clean
- ✔ Production build — 45 static pages generated
- ✔ Semantic HTML, accessible navigation, SEO metadata on every page

---

© Dr. Mohamed Shoura. Built with Next.js, TypeScript, Tailwind CSS and Framer Motion.
