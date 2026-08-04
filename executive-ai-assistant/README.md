# Executive AI Assistant

A premium, single-workspace SaaS dashboard for executives to run their day — schedule,
reminders, meetings, and live sales-team performance — in one place. Built to feel like
Notion + Linear + Motion: fast, animated, responsive, dark/light aware.

> ⚠️ Demo app. All data is sample data persisted in the browser's **localStorage** — no
> backend required. The data layer is intentionally isolated so it can be swapped for
> Supabase/Firebase without touching the UI (see [Architecture](#architecture)).

## Features

| Area | What's inside |
|------|---------------|
| **Dashboard** | Greeting, live clock, productivity gauge, KPI tiles with sparklines, today's merged schedule, pending/completed tasks, priorities, team leaderboard, AI insights, upcoming meetings, quick notes / weather / clock widgets, quick-add task & reminder. |
| **AI Insights** | Rule-based engine that reads the data and surfaces insights ("sales up 5% MoM", "Sara needs 34K to target"), a follow-up assistant (who to call today), and a daily executive brief. |
| **KPI Analytics** | Revenue vs target trend, revenue by department (donut), pipeline by stage, calls/meetings by rep, employee ranking, top & bottom performers. |
| **Planner** | Timeline, Agenda, Week (drag-to-reschedule), and Month views with color-coded tasks. |
| **Reminders** | Full reminder model: priority, category, color, sound, repeat, location, meeting link, attachment, and pre-alerts (5m / 10m / 30m / 1h / 1d). |
| **Meetings** | Agenda + notes, participants, action items, and one-click **convert notes → action items**. |
| **Team & Sales** | Employee CRUD, per-rep targets/attainment/commission/close-rate, client pipeline table. |
| **Employee profile** | Performance trend chart, goals, tasks, clients, meetings, achievements, warnings. |
| **Global search** | ⌘K / Ctrl-K command palette across people, clients, meetings, tasks, reminders. |
| **Notifications** | Derived alerts for meetings, overdue tasks, target risks, follow-ups, renewals. |
| **Settings** | Theme, language, notifications, working hours, weekend, default view, reset data. |

## Tech stack

- **React 18 + TypeScript** (strict)
- **Vite** build tooling
- **Tailwind CSS v3** with a token-based design system (shadcn-style HSL variables)
- **Framer Motion** for page transitions and micro-interactions
- **Recharts** for analytics
- **Lucide** icons
- **React Router** for routing
- **localStorage** persistence (swappable data layer)

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Architecture

```
src/
├── components/
│   ├── ui/           # design-system primitives (Button, Card, Dialog, Tabs, …)
│   ├── layout/       # Sidebar, Topbar, NotificationCenter, GlobalSearch, Layout
│   ├── shared/       # PageHeader, KpiCard + Sparkline, ChartCard + theme
│   ├── editors/      # Task / Reminder / Employee dialogs
│   └── dashboard/    # QuickNotes, Clock & Weather widgets
├── pages/            # one file per route
├── store/            # AppContext — reducer + localStorage sync + theme
├── lib/              # utils, storage, engine (analytics + AI rules), constants
├── data/             # realistic mock dataset (dates generated relative to today)
└── types/            # the shared domain model — single source of truth
```

**Swapping the backend.** The UI never touches storage directly — it dispatches actions to
`store/AppContext`, which reads/writes through `lib/storage.ts`. Point `loadState`/`saveState`
at Supabase or Firebase and the rest of the app is unchanged. The derived analytics and the
"AI" insight/follow-up rules live entirely in `lib/engine.ts`, so replacing them with a real
LLM (OpenAI / Claude) call is a single-file change.

## Future-ready integrations

The data model and engine are structured so these can drop in later without a rewrite:
Google / Outlook Calendar, Microsoft Teams, Zoom, Slack, WhatsApp Business, OpenAI / Claude
APIs, and Supabase / Firebase for multi-device sync.
