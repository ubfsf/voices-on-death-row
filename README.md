# Voices On Death Row | System Architecture

## Architecture Philosophy
- **Framework:** Next.js 15 (App Router)
- **Data Layer:** Headless Sanity CMS (Production-optimized with revalidation: 60)
- **Design System:** TailwindCSS + Framer Motion (Cinematic/Editorial paradigm)
- **Routing:** Internationalized (i18n) via `next-intl`

## Project Directives (Source of Truth)
- **Vision:** Clinical, objective psychological lens on systemic justice.
- **Visuals:** Full-bleed, media-rich gateways; no standard Web 2.0 headers.
- **Content Policy:** Absolute color preservation for incarcerated art; removal of non-essential profiles (Paul Francis/Art From Inside).
- **Families' Voices:** Structured as a dual-category archive (Victims/Condemned) with specific atmospheric imagery.

## Operational Ledger
- **Deployment:** Vercel (Edge-cached)
- **CMS Pipeline:** Webhook-triggered cache invalidation
