# Modathar & Mohatady — Product Brief & Website Proposal
### A Child-Safe Educational & Entertainment Video Platform

> **مُذَاثَر ومُحتَدي** — A safe, colorful, and educational place for children to watch, learn, and grow, with parents fully in control.

**Document type:** Product & UX/UI Proposal (hand-off ready for design + development team)
**Prepared for:** Founding team / Product owner
**Status:** v1.0 — Concept & structure
**Original brand:** No YouTube branding, logo, layout, or protected design elements are used or referenced. All naming, iconography, and layout described here are original to Modathar & Mohatady.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Brand Concept & Positioning](#2-brand-concept--positioning)
3. [Full Website Sitemap](#3-full-website-sitemap)
4. [Page-by-Page Specification](#4-page-by-page-specification)
5. [UX Flows (Kids, Parents, Creators, Admins)](#5-ux-flows)
6. [Homepage Copywriting (EN + AR)](#6-homepage-copywriting)
7. [UI Design Direction](#7-ui-design-direction)
8. [Full Feature List](#8-full-feature-list)
9. [Database Structure Suggestion](#9-database-structure-suggestion)
10. [Admin Dashboard Modules](#10-admin-dashboard-modules)
11. [Parent Dashboard Modules](#11-parent-dashboard-modules)
12. [Monetization Model](#12-monetization-model)
13. [Development Roadmap (MVP → Advanced)](#13-development-roadmap)
14. [Security & Child-Safety Checklist](#14-security--child-safety-checklist)
15. [Landing Page Wireframe Description](#15-landing-page-wireframe-description)
16. [Technical Architecture](#16-technical-architecture)
17. [Content Moderation Pipeline](#17-content-moderation-pipeline)
18. [Compliance Notes (COPPA / GDPR-K)](#18-compliance-notes)

---

## 1. Executive Summary

**Modathar & Mohatady** is a trusted, ad-safe video platform built specifically for children aged **3–12**, their **parents**, **teachers**, and a curated network of **approved creators**. Every video shown to a child has passed a layered **AI + human moderation** pipeline. Parents hold the keys: they create child profiles, set age groups, cap screen time, approve or block categories, and review complete watch histories.

The platform is designed around three promises:

| Promise | What it means in practice |
|---|---|
| **Safe by default** | No public comments, no child-to-child messaging, no child uploads without parental approval, no targeted ads. Every video is pre-reviewed. |
| **Parent-controlled** | Granular parental controls, PIN-gated dashboards, exportable activity reports, emergency content removal. |
| **Genuinely valuable** | Education-first content: learning, science, stories, values (Quran/ethics), creativity, and wholesome entertainment. |

The product ships in two experiences that share one backend:
- A **Kids Experience** — extremely simple, colorful, large-target, voice-search-friendly, minimal text.
- A **Grown-up Experience** (parents, creators, teachers, admins) — professional, clean, data-rich, light/dark mode.

---

## 2. Brand Concept & Positioning

### 2.1 The Name
**Modathar & Mohatady** reads as a friendly duo — two original mascot characters who guide children through the platform:
- **Modathar** — a curious, warm-hearted explorer character (encourages discovery & learning).
- **Mohatady** — a playful, guiding companion character (encourages good choices & values).

The two mascots act as consistent, reassuring guides across the kids UI (empty states, loading, "time's up" reminders, rewards) — an original brand device that replaces any generic branding.

### 2.2 Positioning Statement
> For parents who want their children to enjoy screen time without worry, **Modathar & Mohatady** is a child-safe video platform where every video is pre-approved, every profile is parent-controlled, and every minute is educational or wholesome — unlike open video sites, nothing reaches a child until a human and an AI have both said "yes."

### 2.3 Brand Personality
Warm • Trustworthy • Playful • Bright • Calm (never over-stimulating) • Educational.

### 2.4 Differentiators
1. **Dual-approval content** (AI + human) before anything is child-visible.
2. **Values & multilingual first-class content** (Arabic + English, Quran/ethics category).
3. **Parent transparency** — full history, exportable reports, per-video/channel blocking.
4. **Teacher/school tier** — classroom playlists and safe assignments.
5. **Privacy-first** — minimal data collection on children by design.

---

## 3. Full Website Sitemap

```
Modathar & Mohatady
│
├── PUBLIC / MARKETING SITE (grown-ups)
│   ├── / .......................... Home (marketing landing)
│   ├── /about ..................... About & Safety Promise
│   ├── /how-it-works .............. How safety & controls work
│   ├── /pricing ................... Plans (Free / Family Premium / School)
│   ├── /for-schools ............... School & teacher partnership
│   ├── /for-creators .............. Creator program overview
│   ├── /safety .................... Safety center & standards
│   ├── /contact ................... Contact / Support hub
│   ├── /help ...................... Help center / FAQ
│   ├── /legal/privacy ............. Privacy Policy
│   ├── /legal/childrens-privacy ... Children's Privacy Notice (COPPA/GDPR-K)
│   ├── /legal/terms .............. Terms of Service
│   └── /legal/cookies ............ Cookie Policy
│
├── AUTH
│   ├── /login ..................... Parent / Creator / Teacher login
│   ├── /signup ................... Parent account creation + consent flow
│   ├── /verify ................... Email / adult verification
│   └── /forgot-password
│
├── PARENT AREA (PIN-gated)
│   ├── /parent .................... Parent dashboard home
│   ├── /parent/profiles .......... Kids profiles (create / manage)
│   ├── /parent/profiles/:id ...... Single child settings
│   ├── /parent/screen-time ....... Screen-time limits & schedules
│   ├── /parent/categories ........ Approve / block categories
│   ├── /parent/blocklist ......... Blocked videos & channels
│   ├── /parent/history ........... Watch history (per child)
│   ├── /parent/reports ........... Activity reports & download
│   ├── /parent/language .......... Language & content-language settings
│   ├── /parent/autoplay .......... Autoplay & recommendations control
│   ├── /parent/consent ........... Privacy & consent settings
│   └── /parent/billing ........... Subscription & billing
│
├── KIDS EXPERIENCE (child-safe, simplified)
│   ├── /kids ..................... Profile picker (who's watching?)
│   ├── /kids/:profile ............ Kids home (personalized safe feed)
│   ├── /kids/:profile/category/:c  Category browse
│   ├── /kids/:profile/search ..... Safe search (age-restricted)
│   ├── /kids/:profile/watch/:vid . Video watch page
│   ├── /kids/:profile/saved ...... Saved videos
│   └── /kids/:profile/exit ....... Exit-to-parent (PIN gate)
│
├── CREATOR PORTAL
│   ├── /creator .................. Creator dashboard
│   ├── /creator/apply ............ Application & verification
│   ├── /creator/upload .......... Upload video + metadata
│   ├── /creator/library ......... My videos & review status
│   ├── /creator/guidelines ...... Content guidelines
│   ├── /creator/analytics ....... Views / watch time (safe metrics)
│   └── /creator/earnings ........ Earnings / partnership (if monetized)
│
├── TEACHER / SCHOOL PORTAL
│   ├── /school .................. School dashboard
│   ├── /school/classes .......... Classes & student groups
│   ├── /school/playlists ........ Curated safe playlists / assignments
│   └── /school/reports .......... Class activity reports
│
└── ADMIN DASHBOARD (staff only, role-based)
    ├── /admin ................... Overview & KPIs
    ├── /admin/moderation ........ AI moderation queue
    ├── /admin/moderation/manual . Manual review tools
    ├── /admin/reports ........... Reported content management
    ├── /admin/videos ............ Video catalog management
    ├── /admin/creators .......... Creator verification & management
    ├── /admin/users ............. Parents / children / staff
    ├── /admin/categories ........ Categories & age ratings
    ├── /admin/safety-scores ..... Content safety scoring
    ├── /admin/analytics ......... Platform analytics
    └── /admin/settings .......... Policies, roles, feature flags
```

---

## 4. Page-by-Page Specification

### 4.1 Home Page (Marketing) — `/`
**Audience:** Parents/guardians (decision-makers). Never a child's landing surface.

| Section | Content |
|---|---|
| **Hero** | Strong headline + subhead, friendly mascot illustration, primary CTAs: **Start Watching**, **Parent Login**, **Create Kids Profile**. |
| **Trust strip** | "Every video reviewed by AI + humans" • "No targeted ads" • "Parents in control" • COPPA/GDPR-K badges. |
| **Featured safe videos** | 4–6 large, rounded thumbnail cards (curated, approved). |
| **Categories by age** | Age bands: **3–5 (Toddlers)**, **6–8 (Explorers)**, **9–12 (Learners)** with representative artwork. |
| **Educational sections** | Learning, Science, Stories, Values, Creativity — each a friendly tile. |
| **Parent trust message** | Short reassurance block + link to Safety Center. |
| **How it works** | 3 steps: Create account → Add child profile → Set controls & watch. |
| **Pricing teaser** | Free / Premium / School with "See plans" CTA. |
| **Footer** | Legal links, language switch (AR/EN), contact. |

### 4.2 Kids Home Page — `/kids/:profile`
**Audience:** Child (age-appropriate). Designed for pre-readers upward.

- **Big colorful video cards** (2 columns on mobile, 3–4 on tablet), large thumbnails, minimal text (title read aloud on focus).
- **Simple top nav:** Home, Search (mic icon), Saved, and a friendly "Grown-ups" exit that is **PIN-gated**.
- **Voice-search-friendly:** prominent microphone button; results filtered by age and safe-search.
- **Category rail** with playful icons: **Learning, Cartoons, Stories, Science, Quran/Values, Music, Animals, Games, Creativity**.
- **No free-text clutter**, no external links, no ads, no comments.
- **Mascot guides** for empty/loading states.
- **Watch-time awareness:** gentle visual cue as the daily limit approaches.

### 4.3 Video Watch Page — `/kids/:profile/watch/:vid`
- **Large video player** (custom, distraction-free; no external suggested-content overlays).
- **Related videos:** only safe, approved items matched by age + category; recommendation engine draws **exclusively from the approved pool**.
- **No public comments** for kids. No sharing to external networks.
- **Action buttons (child-facing):** ❤️ **Like**, 🔖 **Save**, 🚩 **Report to Parent** (sends the item to the parent's review queue — never public).
- **Autoplay** honors the parent's per-child setting (off by default for young ages).
- **Watch-timer reminder:** friendly "Let's take a break soon!" overlay tied to screen-time settings.
- **Captions & audio-described** options where available (accessibility).

### 4.4 Parent Dashboard — `/parent`
See [§11 Parent Dashboard Modules](#11-parent-dashboard-modules) for the full module breakdown. Entry is **PIN/passcode gated** even within an authenticated session.

### 4.5 Kids Profile System — `/kids` + `/parent/profiles`
- Multiple children under one parent account.
- **Avatar selection** (original character avatars, no data-revealing photos required).
- **Age-based recommendations** and **age-restricted search**.
- **Personalized safe homepage** per child (based only on approved content and allowed categories).
- Per-child PIN optional for older children; profile switch always returns through the picker.

### 4.6 Creator Portal — `/creator`
- **Apply to become an approved creator** → identity/organization verification.
- **Upload videos** with metadata: title, description, **category, age group, language**, tags, transcript/subtitles.
- **Content review status:** Draft → Submitted → In AI Review → In Human Review → Approved / Rejected (with reasons).
- **Creator guidelines** (age-appropriateness, safety, prohibited content).
- **Analytics:** safe aggregate metrics (views, watch time) — **no child-identifying data**.
- **Earnings / partnership dashboard** (if monetization enabled) — payout, revenue share, statements.

### 4.7 Admin Dashboard — `/admin`
See [§10 Admin Dashboard Modules](#10-admin-dashboard-modules). Role-based (Moderator, Senior Moderator, Content Manager, Admin, Super Admin).

### 4.8 About Page — `/about`
Mission • Safety promise • Educational value • Parent trust message • The team's commitment • Standards we follow (COPPA, GDPR-K, child online safety).

### 4.9 Pricing / Subscription — `/pricing`
See [§12 Monetization Model](#12-monetization-model). Free plan, Premium Family plan, School plan. **No harmful ads**; optional fully **ad-free** experience; clear "no targeted ads to children" statement.

### 4.10 Contact / Support — `/contact`
Routed intake:
- **Parent support** (account, billing, controls).
- **School partnership** (sales/onboarding).
- **Creator application** (link to `/creator/apply`).
- **Report a safety issue** (priority queue, fast response SLA).

---

## 5. UX Flows

### 5.1 Kid Flow (watch session)
```
Open app → "Who's watching?" (profile picker)
  → Tap avatar (optional child PIN)
  → Kids Home (safe personalized feed)
  → Browse category OR voice search
  → Tap a big card → Watch page
  → Like / Save / Report-to-parent
  → Autoplay (if parent-enabled) OR back to feed
  → Screen-time reminder → gentle "break time" → session ends
  → Exit requires parent PIN to leave kids mode
```

### 5.2 Parent Flow (onboarding + control)
```
Sign up (email) → Adult/consent verification → Set parent PIN
  → Create child profile (name/nickname, age group, avatar)
  → Choose allowed categories & content language
  → Set screen-time limit & schedule
  → Set autoplay preference
  → (Later) Review watch history → block a video/channel
  → Download activity report → adjust consent/privacy settings
```

### 5.3 Creator Flow (publish)
```
Apply → Verify identity/org → Accept guidelines → Approved
  → Upload video + metadata (category, age, language, transcript)
  → Submit → AI moderation (auto safety scan)
  → Human moderation (manual review)
  → Approved → enters recommendation pool
        (or) Rejected → feedback + resubmit
  → Track analytics & earnings
```

### 5.4 Admin / Moderator Flow (moderate)
```
Login (role-gated) → Moderation queue (sorted by AI risk score)
  → Open item → view AI flags (text/image/audio/video) + transcript
  → Approve / Reject (reason) / Escalate / Age-rate
  → Reported content queue → investigate → remove/keep + notify
  → Emergency takedown (one action removes item platform-wide)
  → Review creator applications → verify → approve/deny
  → Monitor safety KPIs & analytics
```

---

## 6. Homepage Copywriting

### 6.1 English

**Hero headline:**
> **Screen time you can trust.**
> Bright, safe videos your child will love — and you'll approve of.

**Subhead:**
> Every video on Modathar & Mohatady is reviewed by both smart AI and real people before your child ever sees it. You choose what's allowed, how long, and what's next.

**Primary CTAs:** `Start Watching` · `Parent Login` · `Create Kids Profile`

**Trust strip:**
> ✔ Reviewed by AI + humans  ✔ No targeted ads  ✔ Parents in full control  ✔ Built for ages 3–12

**Featured section title:** *Safe picks your kids will love*

**Age bands:** *Just right for every age* — **Toddlers 3–5** · **Explorers 6–8** · **Learners 9–12**

**Educational block:**
> **More than entertainment.** Learning, science, stories, values, and creativity — chosen to help your child grow.

**Parent trust message:**
> **You're always in control.** Set screen-time limits, approve categories, block anything, and see exactly what your child watched — all from one simple dashboard.

**How it works:** *1. Create your free account · 2. Add your child's profile · 3. Set the rules and press play.*

**Closing CTA:**
> **Ready for worry-free watching?** *Create your kids profile — free to start.*

### 6.2 Arabic (العربية)

**العنوان الرئيسي:**
> **وقتُ شاشةٍ تثقُ به.**
> مقاطع مضيئة وآمنة يحبها طفلك… وتوافق عليها أنت.

**النص الفرعي:**
> كل مقطع على "مُذَاثَر ومُحتَدي" يُراجَع بالذكاء الاصطناعي وبأشخاص حقيقيين قبل أن يراه طفلك. أنت تختار ما هو مسموح، وكم من الوقت، وما التالي.

**أزرار الإجراء:** `ابدأ المشاهدة` · `دخول الآباء` · `إنشاء ملف الطفل`

**شريط الثقة:**
> ✔ مُراجَع بالذكاء الاصطناعي والبشر  ✔ لا إعلانات موجهة  ✔ الآباء يتحكمون بالكامل  ✔ مصمَّم للأعمار 3–12

**عنوان القسم المميز:** *اختيارات آمنة سيحبها أطفالك*

**الفئات العمرية:** *مناسبٌ لكل عمر* — **الصغار 3–5** · **المستكشفون 6–8** · **المتعلمون 9–12**

**القسم التعليمي:**
> **أكثر من مجرد ترفيه.** تعلُّم وعلوم وقصص وقيم وإبداع — مختارة لتساعد طفلك على النمو.

**رسالة طمأنة الآباء:**
> **أنت دائمًا المتحكم.** حدِّد وقت الشاشة، ووافق على الفئات، واحظُر ما تشاء، وشاهد بالضبط ما شاهده طفلك — من لوحة تحكم واحدة بسيطة.

**كيف يعمل:** *1. أنشئ حسابك المجاني · 2. أضِف ملف طفلك · 3. اضبط القواعد واضغط تشغيل.*

**دعوة الختام:**
> **جاهز لمشاهدة بلا قلق؟** *أنشئ ملف طفلك — البداية مجانية.*

> **RTL note:** The Arabic experience must render fully right-to-left (layout mirrored, icons flipped where directional). Language switch persists per user and per child profile.

---

## 7. UI Design Direction

### 7.1 Two Design Systems, One Brand
| Aspect | Kids UI | Grown-up UI (parent/creator/admin) |
|---|---|---|
| Density | Very low, one focus at a time | Information-dense, data tables & charts |
| Text | Minimal, large, read-aloud | Full labels, professional |
| Targets | Extra-large tap targets (min 64px) | Standard (min 44px) |
| Motion | Playful but gentle, no flashing | Subtle, functional |
| Theme | Bright light only | Light **and** dark mode |

### 7.2 Color Palette
| Token | Color | Hex (suggested) | Use |
|---|---|---|---|
| `--sky-blue` | Sky Blue | `#4FC3F7` | Primary actions, links |
| `--soft-yellow` | Soft Yellow | `#FFD766` | Highlights, rewards |
| `--coral` | Coral | `#FF8A80` | Accents, playful CTAs |
| `--mint-green` | Mint Green | `#8CE0C0` | Success, "approved/safe" |
| `--white` | White | `#FFFFFF` | Surfaces / background |
| `--navy` | Dark Navy | `#1F2A44` | Text (never as a dominant background in kids UI) |

> Avoid dark/aggressive visuals in the kids experience. Reserve dark mode strictly for parent/creator/admin surfaces.

### 7.3 Core UI Rules
- **Soft rounded cards** (16–24px radius), generous padding, soft shadows.
- **Big buttons**, high contrast, obvious hover/focus/active states.
- **Simple, friendly icons** (rounded, filled, consistent stroke).
- **Large thumbnails** with a "safe/approved" checkmark badge.
- **Friendly typography:** a rounded, highly legible sans for kids (e.g., Baloo/Nunito-style) + a clean professional sans (e.g., Inter) for grown-ups. Arabic uses a matching rounded/clean Arabic family (e.g., Cairo/Tajawal).
- **Accessibility:** WCAG 2.2 AA minimum, focus-visible, captions, reduced-motion support, alt text, adequate contrast, no seizure-risk flashing.
- **Mobile-first responsive**; **PWA** (installable, offline shell, add-to-home-screen).

### 7.4 Component Inventory (starter)
Buttons (primary/secondary/danger), Video card, Category tile, Avatar picker, Player, Screen-time meter, Toggle/switch, Data table, Chart card, Moderation card (with flag chips), Report modal, PIN pad, Language switch, Toast/notification, Empty state (mascot), Consent modal.

---

## 8. Full Feature List

### Kids
- Age-based content filtering & personalized safe home
- Voice-friendly safe search (age-restricted)
- Large-thumbnail browse by category
- Distraction-free player, captions
- Like / Save / Report-to-Parent
- Parent-controlled autoplay
- Screen-time reminders & gentle break prompts
- Multiple profiles per parent, avatar selection
- No comments, no messaging, no external links, no ads

### Parents
- Child profile management (create/edit/delete)
- Age group per child
- Screen-time limits & schedules
- Category approve/block
- Video & channel blocklist
- Full watch history per child
- Downloadable activity reports (PDF/CSV)
- Language settings (AR/EN) per child
- Autoplay & recommendation controls
- Privacy & consent management
- Parent PIN gate, dark/light mode
- Billing & subscription management

### Creators
- Verified application & onboarding
- Upload with rich metadata (category, age, language, transcript)
- Review-status tracking with feedback
- Content guidelines & policy acknowledgment
- Safe aggregate analytics
- Earnings/partnership dashboard (optional)

### Teachers / Schools
- Class & student group management
- Curated safe playlists / assignments
- Class activity reports
- Bulk seat management

### Admin / Moderation
- AI moderation queue (text, image, audio, video)
- Manual review tools with side-by-side flags & transcript
- Reported-content management
- Emergency content removal (platform-wide, one action)
- Content safety scoring
- Age-rating management
- Creator verification
- User & role management
- Category management
- Analytics dashboard & audit logs

### Platform-wide
- Multi-language (Arabic + English), RTL support
- Human + AI moderation pipeline
- Smart recommendations from approved pool only
- Privacy-first data collection
- Parental consent flow
- PWA + mobile-first responsive
- Accessibility (WCAG 2.2 AA)
- Compliance-ready structure (COPPA, GDPR-K)

---

## 9. Database Structure Suggestion

**Engine:** PostgreSQL. Below is a relational sketch (core tables + key columns). Use UUID primary keys, `created_at`/`updated_at` timestamps, and soft-delete (`deleted_at`) where relevant. Encrypt PII at rest; store minimal child data.

### 9.1 Entity Overview
```
parent_accounts ─┬─< child_profiles ─┬─< watch_history
                 │                   ├─< saved_videos
                 │                   ├─< profile_category_prefs
                 │                   └─< reports (report_to_parent)
                 ├─< screen_time_rules
                 ├─< blocklist (video/channel)
                 ├─< consent_records
                 └─< subscriptions ─< invoices

creators ─< videos ─┬─< video_moderation
                    ├─< video_categories (M:N via video_category_map)
                    ├─< video_age_ratings
                    ├─< video_transcripts
                    └─< video_reports (safety reports)

categories (self-referencing for subcategories)
staff_users ─< moderation_actions
schools ─< classes ─< class_members(child_profiles) ; schools ─< playlists ─< playlist_items(videos)
audit_logs (all sensitive actions)
```

### 9.2 Key Tables

**parent_accounts**
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| email | citext unique | verified |
| password_hash | text | Argon2id |
| pin_hash | text | dashboard/exit PIN |
| adult_verified_at | timestamptz | consent gate |
| locale | text | `ar` / `en` |
| theme | text | light/dark |
| status | enum | active/suspended |

**child_profiles**
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| parent_id | uuid FK | |
| display_name | text | nickname only (minimal PII) |
| age_group | enum | `3-5` / `6-8` / `9-12` |
| avatar_id | int | from preset avatars |
| content_locale | text | AR/EN |
| autoplay_enabled | bool | default false for young |
| child_pin_hash | text | optional |

**videos**
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| creator_id | uuid FK | |
| title | text | |
| description | text | |
| language | text | |
| min_age / max_age | int | age range |
| status | enum | draft/submitted/ai_review/human_review/approved/rejected/removed |
| safety_score | numeric | 0–100 |
| storage_provider | enum | s3/cloudflare_stream/vimeo |
| storage_ref | text | provider asset id |
| duration_sec | int | |
| published_at | timestamptz | |

**video_moderation**
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| video_id | uuid FK | |
| ai_text_flags | jsonb | profanity, unsafe topics |
| ai_image_flags | jsonb | frame-level flags |
| ai_audio_flags | jsonb | speech/audio flags |
| ai_video_flags | jsonb | scene-level flags |
| ai_overall_score | numeric | |
| human_decision | enum | approve/reject/escalate |
| reviewer_id | uuid FK | staff_users |
| reason | text | rejection/escalation reason |

**screen_time_rules**
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| child_id | uuid FK | |
| daily_limit_min | int | |
| schedule | jsonb | allowed windows per weekday |

**blocklist**
| child_id/parent_id | uuid | target_type enum(video/channel/category) | target_id | reason |

**watch_history**
| id | child_id | video_id | started_at | watched_sec | completed bool |

**consent_records**
| id | parent_id | consent_type | version | granted bool | granted_at | ip (hashed) |

**reports** (report-to-parent) and **video_reports** (safety) kept separate: child-triggered items go to the *parent* queue; adult safety reports go to the *admin* queue.

**staff_users** (roles: moderator, senior_moderator, content_manager, admin, super_admin) + **moderation_actions** + **audit_logs** for full traceability.

> **Data-minimization rule:** child tables store nickname + age band + preferences only. No child email, no precise birthdate required (age band suffices), no behavioral data sold or shared. Access to child data is logged.

---

## 10. Admin Dashboard Modules

| Module | Key capabilities |
|---|---|
| **Overview / KPIs** | Approvals pending, avg. review time, safety incidents, active users, top categories. |
| **AI Moderation Queue** | Items sorted by AI risk score; per-modality flag chips (text/image/audio/video); quick approve/reject. |
| **Manual Moderation Tools** | Full player + transcript + frame timeline + flag context; approve / reject (reason) / escalate / request changes. |
| **Reported Content** | Safety reports triage, investigate, resolve, notify reporter, link to takedown. |
| **Emergency Removal** | One-click platform-wide takedown + audit entry + creator notice. |
| **Video Catalog** | Search/filter all videos, status, re-review, re-rate, unpublish. |
| **Creator Management** | Applications, identity/org verification, approve/suspend, strike system. |
| **User Management** | Parents, children (limited view), staff roles & permissions. |
| **Categories & Age Ratings** | CRUD categories/subcategories; age-rating rules and overrides. |
| **Content Safety Score** | Scoring config, thresholds, auto-hold rules, model version tracking. |
| **Analytics** | Watch time, retention, category health, moderation throughput, incident trends. |
| **Settings & Audit** | Policies, feature flags, role management, full audit log export. |

---

## 11. Parent Dashboard Modules

| Module | Key capabilities |
|---|---|
| **Profiles** | Create/manage multiple children; set nickname, avatar, age group. |
| **Age Group** | Assign/adjust per child; drives filtering & search. |
| **Screen-Time** | Daily limit + allowed schedule windows; per-child. |
| **Categories** | Approve/block categories per child. |
| **Watch History** | Full per-child history, searchable, with "block this" shortcuts. |
| **Blocklist** | Block specific videos or channels; manage the list. |
| **Language** | Content language + interface language per child. |
| **Autoplay & Recommendations** | Toggle autoplay; tune recommendation strictness. |
| **Activity Reports** | Generate & download PDF/CSV activity summaries. |
| **Privacy & Consent** | View/update consents, data requests (access/delete), consent history. |
| **Account & Security** | Parent PIN, password, sessions, dark/light mode. |
| **Billing** | Plan, payment method, invoices, cancel/upgrade. |

---

## 12. Monetization Model

**Principle: children are never the product.** No targeted advertising to children, ever. No selling of child data.

| Plan | Price (illustrative) | Includes |
|---|---|---|
| **Free** | $0 | 1 child profile, curated safe library, core parental controls, limited catalog, optional **non-targeted, pre-screened** house promos only (or fully ad-free — see note). |
| **Premium Family** | ~$6–9 / month (or annual discount) | Up to 5 child profiles, full catalog, **fully ad-free**, downloads/offline (PWA), advanced screen-time & scheduling, detailed reports, priority support. |
| **School / Classroom** | Per-seat or per-classroom annual | Teacher dashboards, class playlists/assignments, class reports, bulk seats, admin onboarding, SSO option. |

**Additional (safe) revenue streams:**
- **Creator partnership / revenue share** for approved educational creators (platform takes a fair cut; payouts via the earnings dashboard).
- **Educational content packs / publisher licensing** (branded but pre-screened, non-behavioral).
- **School site licenses**.

**Advertising policy (strict):**
- No behavioral/targeted ads to children.
- No third-party ad SDKs in the kids experience.
- Any promotion must be first-party, age-appropriate, pre-screened, and clearly bounded.
- Premium removes all promos entirely.

---

## 13. Development Roadmap

### Phase 0 — Foundations (Weeks 1–3)
- Brand system, design tokens, component library skeleton.
- Architecture, DB schema, environments, CI/CD, security baseline.
- Legal groundwork: privacy policy, children's privacy notice, consent flow copy.

### Phase 1 — MVP (Weeks 4–12)
**Goal: a safe, usable loop for one parent + one child + curated content.**
- Parent signup + adult/consent verification + parent PIN.
- Child profile creation, age group, avatar.
- Kids home + category browse + safe search + watch page (Like/Save/Report-to-Parent).
- Screen-time limit + reminder.
- Manual content ingestion + **basic admin moderation** (human approve/reject).
- Watch history + basic activity view.
- AR/EN + RTL, mobile-first responsive, PWA shell.
- Core compliance: consent records, data-minimization, audit logs.

### Phase 2 — Creator + AI Moderation (Weeks 13–20)
- Creator portal: apply, verify, upload, metadata, status tracking.
- **AI moderation pipeline** (text/image/audio/video) feeding the admin queue with safety scores.
- Categories & age-rating management, content safety scoring.
- Downloadable reports (PDF/CSV), blocklist (video/channel), autoplay controls.

### Phase 3 — Monetization + Schools (Weeks 21–28)
- Subscriptions & billing (Free / Premium / School), fully ad-free premium.
- Teacher/school portal: classes, playlists/assignments, class reports.
- Creator earnings/partnership dashboard.
- Advanced analytics for admins.

### Phase 4 — Advanced (Weeks 29+)
- Smarter recommendations (from approved pool only), personalization tuning.
- Native mobile apps (iOS/Android) or enhanced PWA.
- Offline downloads, voice search improvements, accessibility enhancements.
- Localization beyond AR/EN; regional content partnerships.
- Continuous safety-model improvement + red-teaming.

---

## 14. Security & Child-Safety Checklist

### Content Safety
- [ ] **Manual review before publishing** every video.
- [ ] **AI moderation** across text, image, audio, and video.
- [ ] **Content safety score** with auto-hold thresholds.
- [ ] **Report button on every video** (child → parent queue; adult → safety queue).
- [ ] **Emergency content removal** (one action, platform-wide) + creator notice.
- [ ] **Creator verification** before any upload is publishable.
- [ ] Recommendations drawn **only from the approved pool**.
- [ ] Age-rating enforced on browse, search, and recommendations.

### Child Protection
- [ ] **No public comments** for children.
- [ ] **No child-to-child (or any) direct messaging**.
- [ ] **No child uploads** without parental approval.
- [ ] **No targeted ads** to children; no third-party ad SDKs in kids UI.
- [ ] No external links or off-platform navigation from kids surfaces.
- [ ] PIN-gated exit from kids mode and PIN-gated parent dashboard.

### Privacy & Data
- [ ] **Collect only necessary data** (nickname + age band + prefs for children).
- [ ] **Clear privacy policy** + **children's privacy notice**.
- [ ] **Parental consent flow** with versioned consent records.
- [ ] Data access/delete (DSAR) tooling for parents.
- [ ] Encryption in transit (TLS) and at rest for PII.
- [ ] Access to child data logged (audit trail).
- [ ] Data-retention limits; no sale/sharing of child data.

### Platform Security
- [ ] Argon2id password hashing; secure PIN storage.
- [ ] Role-based access control for staff; least privilege.
- [ ] Rate limiting, WAF, input validation, output encoding.
- [ ] Signed URLs / tokenized video delivery (no hotlinking).
- [ ] Full audit logs for sensitive actions.
- [ ] Regular pen-tests, dependency scanning, secrets management.
- [ ] Incident response plan + safety escalation runbook.

### Compliance
- [ ] COPPA-aligned (US) — verifiable parental consent, data minimization.
- [ ] GDPR-K aligned (EU) — lawful basis, child-specific safeguards, DSAR.
- [ ] Age-appropriate design considerations (e.g., UK Children's Code style).
- [ ] Accessibility WCAG 2.2 AA.

---

## 15. Landing Page Wireframe Description

Vertical stack, mobile-first (single column), expanding to multi-column on wider viewports. All corners soft-rounded; airy spacing; bright palette on white.

```
┌───────────────────────────────────────────────┐
│ NAV: [Logo mark]      About  How it works  Pricing│
│                        [AR/EN]  [Parent Login] btn │
├───────────────────────────────────────────────┤
│ HERO (2-col on desktop, stacked on mobile)      │
│  Left:  H1 headline                             │
│         Subhead paragraph                       │
│         [Start Watching] [Create Kids Profile]  │
│  Right: Friendly mascot + floating video cards  │
├───────────────────────────────────────────────┤
│ TRUST STRIP (4 pills)                           │
│  AI+human review · No targeted ads · Parents in │
│  control · Ages 3–12                            │
├───────────────────────────────────────────────┤
│ FEATURED SAFE VIDEOS                            │
│  [card][card][card][card]  ← large thumbnails,  │
│                              "approved" badge   │
├───────────────────────────────────────────────┤
│ CATEGORIES BY AGE (3 big tiles)                 │
│  [Toddlers 3–5][Explorers 6–8][Learners 9–12]   │
├───────────────────────────────────────────────┤
│ EDUCATIONAL SECTIONS (icon grid)                │
│  Learning · Science · Stories · Values · Create │
├───────────────────────────────────────────────┤
│ HOW IT WORKS (3 steps, numbered)                │
│  1 Create account · 2 Add profile · 3 Set&play  │
├───────────────────────────────────────────────┤
│ PARENT TRUST MESSAGE (band + illustration)      │
│  "You're always in control." + [See Safety]     │
├───────────────────────────────────────────────┤
│ PRICING TEASER (3 plan cards)                   │
│  Free · Premium Family · School  [See plans]    │
├───────────────────────────────────────────────┤
│ FINAL CTA band                                  │
│  "Ready for worry-free watching?" [Get started] │
├───────────────────────────────────────────────┤
│ FOOTER: legal links · language · contact · social│
└───────────────────────────────────────────────┘
```

**Interaction notes:** sticky nav with clear Parent Login; CTAs use Sky Blue primary / Coral accent; hover lift on cards; focus-visible outlines; reduced-motion respected; fully mirrored in Arabic RTL.

---

## 16. Technical Architecture

| Layer | Recommendation | Notes |
|---|---|---|
| **Frontend** | **Next.js (React)** | SSR/SSG for marketing SEO; app router for parent/kids/creator/admin; i18n (AR/EN) + RTL; PWA. |
| **Backend** | **NestJS (Node.js)** | Modular services: auth, profiles, catalog, moderation, billing, reports. |
| **Database** | **PostgreSQL** | See [§9](#9-database-structure-suggestion). Redis for sessions/caching/rate-limits. |
| **Video** | **Cloudflare Stream** or **AWS S3 + CloudFront/MediaConvert**, or **Vimeo OTT** | Tokenized/signed delivery; adaptive bitrate; no public/hotlinkable URLs. |
| **AI Moderation** | Managed vision/audio/text safety APIs + custom classifiers | Frame sampling, ASR transcript scan, image/scene scan; feeds admin queue. |
| **Auth** | Parent email/password + PIN; child profile PIN | Argon2id; short-lived tokens; PIN gate for dashboard/exit. |
| **CMS/Admin** | Custom admin dashboard | Role-based; audit logging. |
| **Payments** | Stripe (or regional PSP) | Subscriptions, invoices, school billing. |
| **Analytics** | Privacy-respecting, first-party | No child-level tracking sold/shared. |
| **Infra** | Cloud (AWS/GCP) + IaC + CI/CD | Environments: dev/stage/prod; automated tests; monitoring/alerting. |

**Recommendation priority for video:** start with **Cloudflare Stream** for the MVP (simplest secure delivery + signed tokens + built-in transcoding), revisit S3-based pipeline at scale.

---

## 17. Content Moderation Pipeline

```
Creator uploads video + metadata + transcript
        │
        ▼
[1] Automated AI scan (parallel)
    ├── Text: title/description/transcript → profanity, unsafe topics
    ├── Audio: ASR → speech safety, music/lyrics checks
    ├── Image: sampled frames → unsafe imagery
    └── Video: scene/motion → unsafe scenes
        │  → aggregate safety_score + per-modality flags
        ▼
[2] Routing
    ├── score ≥ high-confidence-safe  → queue as "low-risk" human check
    ├── mid  → standard human review
    └── score ≤ threshold / hard flags → auto-hold, priority human review
        │
        ▼
[3] Human review (moderator)
    → view player + transcript + flags → Approve / Reject(reason) / Escalate
    → set/confirm age rating & categories
        │
        ▼
[4] Publish → enters approved pool → eligible for recommendations
        │
        ▼
[5] Ongoing: safety reports → re-review → keep/remove
        └── Emergency takedown available at any time (platform-wide)
```

**Guardrails:** nothing reaches children on AI alone — **human approval is mandatory** before publish. Model versions and decisions are logged for auditability.

---

## 18. Compliance Notes

> This is product guidance, not legal advice — validate with qualified counsel in each operating region before launch.

- **COPPA (US):** verifiable parental consent before collecting a child's data; data minimization; clear notice; parental access/deletion; no conditioning participation on excess data; no behavioral advertising to children.
- **GDPR-K (EU):** lawful basis + parental authorization for under-16 (varies by member state, 13–16); child-specific transparency; strong DSAR support; privacy by design & default.
- **Age-Appropriate Design (e.g., UK Children's Code):** high-privacy defaults, minimal profiling, no nudge techniques, geolocation off by default, published data-protection impact assessment (DPIA).
- **Data mapping:** maintain a record of what child data is collected, why, retention period, and who can access it (all logged).
- **Vendor diligence:** any moderation/video/analytics vendor must contractually support child-data safeguards and not use child data for their own model training or ad targeting.

---

*End of proposal — Modathar & Mohatady v1.0. Ready for hand-off to design & development.*
