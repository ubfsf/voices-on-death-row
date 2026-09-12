# Voices On Death Row

An international public archive and advocacy platform dedicated to giving visibility and dignity to people sentenced to death. Built with Next JS, Sanity CMS, and Tailwind CSS.

## Getting Started

### Prerequisites
Ensure Node.js is installed on your local machine.

### Local Installation
1. Navigate to the project directory:
   ```bash
   cd voices_intl
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your local environment variables by creating a .env.local file at the root:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=vufzo1a0
   NEXT_PUBLIC_SANITY_DATASET=production
   RESEND_API_KEY=your_resend_api_key
   ```

4. Run the local development server:
   ```bash
   npm run dev
   ```

## Technical Reference & Core Configurations

This section consolidates all critical architectural decisions, image crop guidelines, and API details to prevent documentation rot.

### 1. Image & Asset Crop Policies

**Focal Point Rule:** Always check raw file dimensions before applying CSS. Never use images with baked in letterbox black bars.

**Founder Portrait:** halimaKilgore.jpg must be cropped to the actual photo content (1078×1060). The Polaroid frame uses a square or 3/4 aspect ratio with object-cover and hotspot support to ensure the head remains visible.

**About Hero:** about.jpg uses object-right-top on the container to anchor the crop to the subject. A scroll parallax moves the crop window down the photo as the user scrolls, respecting prefers reduced motion settings.

**Grain Overlay:** Self hosted grain texture is located at public/textures/noise.svg (using a 7 line SVG feTurbulence generator). Do not reference external demo domains.

### 2. Localization & Routing Architecture

**Single Source of Truth:** The URL segment (/en/..., /fr/...) is the absolute source of truth for the active locale. Do not use cookies to store or negotiate the active locale.

**Static Translations:** All UI strings must be stored in messages/en.json and messages/fr.json. Avoid runtime machine translation APIs to prevent rate limits and client side layout shifts.

**Sitemap:** sitemap.ts generates explicit /en/... and /fr/... URLs with hreflang alternates to ensure search crawlers index localized versions properly.

### 3. Contact Form & Email Integration

**API Endpoint:** /api/send/route.ts handles the contact form submission via the Resend SDK.

**Error Handling:** The route explicitly checks the error return object from the Resend SDK. It returns a 500 status code on failure so the client side form displays the correct error state.

**Production Configuration:** Switch the sender address from onboarding@resend.dev to a verified domain (e.g., contact@voicesondeathrow.com) once the domain is verified in Resend. Confirm the recipient address is correct (e.g., halima@ubfsf.org).

### 4. Performance & Audio Policies

**Video Optimization:** Background videos like writing-hand.mp4 must be compressed to a reasonable bitrate (4 to 8 MB) to prevent massive bandwidth usage.

**Autoplay Audio:** Browser policies block autoplay sound without user interaction. Audio is unlocked on the very first scroll or touch gesture via useCurtainTrigger with no extra user interface prompts.

**Audio Fade:** Ambient loops fade out gracefully over 600 to 800 milliseconds when the curtain settles or the user scrolls.

### 5. Responsive Testing & Accessibility Compliance

**Responsive Previews:** Developers must use the Live Preview extension docked to the side of the editor set to 390px width to verify mobile layouts during active development.

**WCAG 2.2 AA Gating:** All new components must pass keyboard navigation and screen reader audits. Run Axe DevTools and Lighthouse accessibility checks locally before committing code.

## Project Architecture

- **src/app/[locale]** — Localized Next.js App Router pages (en/fr).
- **src/components** — Reusable UI components.
- **src/sanity** — Sanity CMS schemas and configuration.
- **src/lib** — Database clients and shared utility functions.

***

### Master Prompt for Your Local Agent

```text
Follow these instructions to clean, organize, and optimize the voices_intl repository to professional, production ready standards:

1. Fix the build error in src/components/HeroTitle.tsx by replacing the custom useTranslation hook import with the standard useTranslations hook from next-intl. Ensure all other files have no remaining imports of useTranslation or useIntroGestures.
2. Replace the root README.md with the consolidated technical reference version.
3. Create the .clinerules file at the root containing the core engineering decision ladder, responsive mobile first standards, WCAG accessibility compliance rules, and code quality standards.
4. Delete the duplicate, redundant markdown files from the repository root:
   - DEPLOY_GUIDE.md
   - DEPLOYMENT_CHECKLIST.md
   - DEVELOPER_REFERENCE.md
   - IMPLEMENTATION_SUMMARY.md
   - PRE_LAUNCH_CHECKLIST.md
   - PROJECT_COMPLETION_REPORT.md
   - QUICK_START.md
5. Reorganize the flat components directory:
   - Move low level reusable primitives (like PolaroidPhoto.tsx, Typewriter.tsx) into src/components/ui/
   - Move global shell components (like Header.tsx, Footer.tsx, Navbar.tsx) into src/components/layout/
   - Colocate page specific components (like AboutHero.tsx) inside their respective page directories under src/app/[locale]/
6. Run npm run build to verify that the project compiles cleanly with no errors.
```

