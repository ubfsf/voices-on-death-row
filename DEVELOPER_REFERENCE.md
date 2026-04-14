# Voices On Death Row - Developer Reference Guide

**For:** Development Team
**Project:** Voices On Death Row Website
**Status:** Core Development Complete
**Date:** April 13, 2026

---

## 🏗️ Architecture Overview

```
voices_intl/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (Header + Footer)
│   │   ├── page.tsx            # Home (delegates to main.tsx)
│   │   ├── main.tsx            # Main entry point with InteractiveStoryteller
│   │   ├── voices/             # Voice profiles
│   │   ├── letters/            # Letter archive
│   │   ├── art/                # Art gallery (displays in color)
│   │   ├── podcast/            # Podcast with immersive scroll
│   │   ├── about/              # About/Contact info
│   │   ├── contact/            # Contact form
│   │   ├── resources/          # Educational resources
│   │   ├── studio/             # Sanity CMS interface
│   │   ├── api/
│   │   │   └── send/           # Email API (Resend)
│   │   ├── globals.css         # Global styles (Tailwind + custom)
│   │   ├── favicon.ico         # Site icon
│   │   └── sitemap.ts          # Auto-generated sitemap for SEO
│   ├── components/             # Reusable React components
│   │   ├── Header.tsx          # Fixed navigation bar
│   │   ├── Footer.tsx          # Footer with mission statement
│   │   ├── IntroSequence.tsx   # Opening video + sound
│   │   ├── InteractiveStoryteller.tsx  # Main page component
│   │   ├── StoryArchive.tsx    # Scroll-triggered story reveals
│   │   ├── SplitHero.tsx       # Image + text layout
│   │   ├── ContactForm.tsx     # Contact form component
│   │   ├── LocalSwitcher.tsx   # Language toggle (EN/FR)
│   │   └── [other components]
│   ├── lib/
│   │   ├── sanity.ts           # Sanity CMS client config
│   │   └── wordpress.ts        # WordPress integration (if needed)
│   ├── i18n/
│   │   └── request.ts          # i18n middleware for next-intl
│   └── global.d.ts             # TypeScript global types
├── public/
│   ├── images/                 # Image assets
│   │   ├── logo_transparent.ico
│   │   ├── hero-illustration.png (in color)
│   │   ├── art_from_inside.jpg (in color)
│   │   ├── eyes.jpg
│   │   ├── writing_another.jpg
│   │   └── [other images]
│   ├── sounds/
│   │   └── writing.mp3         # Pencil writing sound
│   ├── videos/
│   │   └── writing-hand.mp4    # Opening video
│   ├── robots.txt              # SEO robot directives
│   └── sitemap.xml             # Auto-generated (Next.js)
├── messages/
│   ├── en.json                 # English translations
│   └── fr.json                 # French translations
├── sanity.config.ts            # Sanity CMS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.ts              # Next.js configuration
├── .env.local                  # Environment variables (private)
├── .env.example                # Template for env vars
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies
└── README.md                   # Project documentation
```

---

## 🔧 Key Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.1.6 | React framework with SSR/SSG |
| **React** | 19.2.3 | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Utility-first CSS |
| **Framer Motion** | 12.35.0 | Scroll animations |
| **next-intl** | 4.8.3 | i18n (EN/FR) |
| **Sanity CMS** | 5.13.0 | Headless CMS |
| **next-sanity** | 12.1.0 | Sanity integration |
| **Resend** | 6.9.3 | Email service |
| **Howler.js** | 2.2.4 | Audio playback |
| **Lucide React** | 0.576.0 | Icons |

---

## 🎨 Design System

### Theme Variables (in `globals.css`)
```css
@theme {
  --font-artistic: "Cormorant Garamond", serif;    /* Headlines */
  --font-sans: "Inter", sans-serif;                /* Body text */
  --color-paper: #fcfaf7;                          /* Background */
  --color-ink: #1c1917;                            /* Text */
}
```

### Reusable Classes (in `globals.css`)
```css
.paper-texture         /* Background with texture */
.hero-title           /* Large italic headlines */
.hero-title-clean     /* Clean uppercase titles */
.story-text-main      /* Large centered story text */
.ink-text             /* Italic body text */
.prose-archive        /* Typography for long-form content */
.nav-link             /* Navigation styling */
```

### Color Palette
- **Background**: `var(--color-paper)` / `#fcfaf7` / `bg-paper`
- **Text**: `var(--color-ink)` / `#1c1917`
- **Accents**: Stone grays (stone-100 to stone-900)
- **Special**: Minimal use of red/coral for emphasis

---

## 📚 Component Structure

### Layout Components
- **Header.tsx** - Fixed navbar with logo, menu, language switcher
- **Footer.tsx** - Footer with mission, links, contact info

### Page Components
- **IntroSequence.tsx** - Opening video + sound + typewriter effect
- **InteractiveStoryteller.tsx** - Main page layout
- **StoryArchive.tsx** - Long-form scrollytelling with parallax
- **SplitHero.tsx** - Image + text side-by-side layout
- **ContactForm.tsx** - Form component with Resend integration

### Utility Components
- **LocalSwitcher.tsx** - Language toggle

---

## 🌍 Internationalization (i18n)

### Translation Files
```json
// messages/en.json
{
  "IntroSequence": { ... },
  "VoicesPage": { ... },
  "LettersPage": { ... },
  "ArtPage": { ... },
  "PodcastPage": { ... },
  "ContactPage": { ... },
  "Footer": { ... },
  ...
}
```

### Usage in Components
```tsx
const t = useTranslations('PageName');
return <h1>{t('title')}</h1>
```

### Language Switching
- User clicks EN/FR in header
- LocalSwitcher handles routing
- Content automatically translates

---

## 📦 Sanity CMS Schema

### Content Types
```typescript
// sanity.config.ts

{
  name: 'voice',
  title: 'Voices',
  type: 'document',
  fields: [
    { name: 'name', title: 'Person Name', type: 'string' },
    { name: 'photo', title: 'Photo', type: 'image' },
    { name: 'bio', title: 'Biography', type: 'text' },
    { name: 'story', title: 'Story', type: 'text' },
    { name: 'sentenceStatus', title: 'Sentence Status', type: 'string' }
  ]
}

// Similar for: letter, artwork, podcast
```

### Fetching from Sanity
```typescript
// In page components
import { client } from '@/lib/sanity';

const voices = await client.fetch(`*[_type == "voice"]`);
```

---

## 🔐 Environment Variables

### Required in `.env.local`
```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=vufzo1a0
NEXT_PUBLIC_SANITY_DATASET=production

# Email service
RESEND_API_KEY=re_ZZs1Wadm_PkwXj6H6hVRAPJWHSrMiM6A7
```

### Optional
```bash
# Google verification (already in code)
# GOOGLE_VERIFICATION=googleca11324af841a36e

# Deployment (add when going live)
# VERCEL_ENV=production
```

---

## 📋 Animation Patterns

### Scroll-Triggered Fade-In
```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true, amount: 0.3 }}
>
  Content
</motion.div>
```

### Parallax Scroll Effect
```tsx
const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

<motion.div style={{ y }}>
  Parallax content
</motion.div>
```

### Staggered Children
```tsx
{items.map((item, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: i * 0.1 }}
  >
    {item}
  </motion.div>
))}
```

---

## 🚀 Deployment

### To Vercel
```bash
# Connect GitHub repo to Vercel
# Push to main branch
# Vercel auto-deploys

# Set environment variables in Vercel dashboard:
NEXT_PUBLIC_SANITY_PROJECT_ID=vufzo1a0
NEXT_PUBLIC_SANITY_DATASET=production
RESEND_API_KEY=your_key_here
```

### Domain Setup
```bash
# Add custom domain in Vercel dashboard
# DNS settings point to Vercel
# SSL auto-configured
```

---

## 🧪 Testing Checklist

- [ ] Mobile responsive (all screen sizes)
- [ ] Touch interactions work on mobile
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Images load properly
- [ ] Videos play correctly
- [ ] Animations smooth (60fps)
- [ ] Forms submit to Resend
- [ ] Sanity content updates live
- [ ] Language switching works
- [ ] All links functional

---

## 📊 Performance Optimization

### Already Implemented
- ✅ Image lazy-loading
- ✅ CSS-in-JS with Tailwind
- ✅ Framer Motion GPU-accelerated
- ✅ Next.js automatic code splitting
- ✅ Server-side rendering where needed

### To Consider
- Image optimization with `next/image`
- Video preloading strategy
- Sanity query optimization
- Caching headers

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Next dev lock error | `pkill -9 -f "next dev"` then restart |
| Tailwind classes not working | Rebuild with `npm run build` |
| Sanity not loading | Check NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local |
| i18n not translating | Ensure key exists in messages/en.json and messages/fr.json |
| Images not showing | Check path relative to `/public` folder |

---

## 📝 Code Standards

### Naming Conventions
- **Components**: PascalCase (`Header.tsx`)
- **Functions**: camelCase (`handleSubmit()`)
- **CSS classes**: kebab-case (`hero-title`)
- **Files**: Use extensions (.tsx for React, .ts for logic)

### TypeScript
- Define types for all props
- Use `type` for component interfaces
- Avoid `any` type

### Formatting
- 2-space indentation
- ESLint enforces rules
- Format with Prettier

---

## 🔄 Git Workflow

### Branch Strategy
- `main` - Production-ready code
- Feature branches for new work

### Commit Messages
```
feat: Add podcast immersive scroll
fix: Logo path mismatch in header
docs: Update README
style: Fix CSS linting warnings
refactor: Extract animation logic
```

---

## 📚 Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Run production build

# Code quality
npm run lint             # Run ESLint
npm run lint -- --fix    # Auto-fix issues

# Sanity
npm run dev              # Includes Sanity Studio at /studio
```

---

## 🔗 Important URLs

- **Local Dev**: http://localhost:3001
- **Production**: https://www.voicesondeathrow.com
- **Sanity Studio**: /studio
- **Sanity Dashboard**: https://sanity.io/projects
- **GitHub**: https://github.com/ubfsf/voices-on-death-row
- **Google Search Console**: https://search.google.com/search-console

---

## 👥 Team Collaboration

### Adding Team Members
1. GitHub - Add as collaborator to repo
2. Sanity - Invite as editor to project vufzo1a0
3. Vercel - Add to team project

### Communication
- Use GitHub Issues for bugs/features
- PR reviews before merging
- Update documentation when changes made

---

## 🎯 Future Enhancements

Potential features to add:
- [ ] Advanced audio visualizer for podcast
- [ ] Interactive map showing locations
- [ ] Timeline visualization of events
- [ ] Downloadable resources/PDFs
- [ ] Email newsletter signup
- [ ] Comments/discussion system
- [ ] Donation/support integration

---

**Last Updated**: April 13, 2026
**Maintained By**: Development Team
**For Issues**: GitHub Issues or email support
