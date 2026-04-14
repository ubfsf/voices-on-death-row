# 🚀 Voices On Death Row - Deployment Checklist

**Project:** Voices On Death Row Website
**Status:** Ready for Deployment
**Last Updated:** April 13, 2026

---

## ✅ Pre-Deployment Checklist

### Code & Build
- [ ] All TypeScript errors resolved
- [ ] ESLint warnings fixed
- [ ] CSS linting complete
- [ ] `npm run build` completes successfully
- [ ] No console errors in dev server
- [ ] All imports resolved correctly

### Design & UX
- [ ] Logo displays correctly in header
- [ ] Favicon shows in browser tabs
- [ ] All fonts load properly
- [ ] Colors match design spec
- [ ] Animations run smoothly (60fps)
- [ ] Responsive design tested on mobile

### Functionality
- [ ] All navigation links work
- [ ] Language switcher (EN/FR) toggles correctly
- [ ] Contact form submits and sends email
- [ ] Sanity CMS connects at `/studio`
- [ ] Video plays in intro sequence
- [ ] Sound effects trigger correctly
- [ ] Scroll animations trigger on scroll

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader reads content
- [ ] Images have alt text
- [ ] Color contrast meets WCAG standards
- [ ] Touch targets are 44px minimum
- [ ] No auto-playing media blocks interaction

### Performance
- [ ] Images optimize (under 100KB each)
- [ ] Videos lazy-load
- [ ] Core Web Vitals acceptable
- [ ] Page load time < 3 seconds
- [ ] Mobile Lighthouse score > 80

### SEO
- [ ] Meta tags correct in layout.tsx
- [ ] Open Graph tags present
- [ ] Sitemap generated at `/sitemap.xml`
- [ ] robots.txt configured
- [ ] Google verification code added
- [ ] No 404 links

### Security
- [ ] `.env.local` not committed to Git
- [ ] `.gitignore` includes sensitive files
- [ ] API keys stored in environment variables
- [ ] No secrets in code or comments
- [ ] HTTPS ready for production

### Configuration
- [ ] Sanity Project ID: `vufzo1a0`
- [ ] Sanity Dataset: `production`
- [ ] Resend API key configured
- [ ] Email destination: halima@ubfsf.org
- [ ] Next.js config optimized

---

## 📋 Deployment Steps (To Vercel)

### Step 1: Connect GitHub to Vercel
- [ ] Push code to GitHub (ubfsf/voices-on-death-row)
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Click "New Project"
- [ ] Import from GitHub
- [ ] Select `voices-on-death-row` repository
- [ ] Configure build settings (use defaults)

### Step 2: Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID: vufzo1a0
NEXT_PUBLIC_SANITY_DATASET: production
RESEND_API_KEY: re_ZZs1Wadm_PkwXj6H6hVRAPJWHSrMiM6A7
```

- [ ] Add each variable
- [ ] Set for all environments (production, preview, development)

### Step 3: Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete
- [ ] Check deployment logs for errors
- [ ] Preview deployment URL works
- [ ] Test all features on preview

### Step 4: Domain Setup
- [ ] Register domain (voicesondeathrow.com or approved domain)
- [ ] In Vercel: Settings → Domains
- [ ] Add custom domain
- [ ] Follow DNS setup instructions
- [ ] Wait for DNS propagation (24-48 hours)
- [ ] Test domain works (www. redirect, SSL)

### Step 5: Post-Deployment
- [ ] Production URL accessible
- [ ] All pages load correctly
- [ ] Forms submit to correct email
- [ ] Sanity CMS works at `/studio`
- [ ] SEO features working

---

## 🔍 Testing Checklist (Pre-Launch)

### Functional Testing
- [ ] Homepage loads with intro video
- [ ] Opening animation plays
- [ ] Sound effects work
- [ ] ENTER button scrolls to menu
- [ ] All navigation links functional
- [ ] Contact form submits
- [ ] Form validation works
- [ ] Contact form emails received

### Cross-Browser Testing
- [ ] Chrome/Edge (desktop)
- [ ] Firefox (desktop)
- [ ] Safari (desktop)
- [ ] Chrome (mobile)
- [ ] Safari (iOS)
- [ ] Samsung Internet (Android)

### Responsive Design Testing
- [ ] 320px (iPhone SE)
- [ ] 375px (iPhone 12)
- [ ] 425px (iPhone 14 Pro)
- [ ] 768px (iPad)
- [ ] 1024px (iPad Pro)
- [ ] 1440px (Desktop)
- [ ] 1920px (Large desktop)

### Language Testing
- [ ] English content displays correctly
- [ ] French content displays correctly
- [ ] Language switcher toggles properly
- [ ] All pages available in both languages
- [ ] Accents/special characters show correctly

### Animation Testing
- [ ] Intro sequence smooth
- [ ] Scroll animations trigger correctly
- [ ] Parallax effects working
- [ ] Fade-in animations smooth
- [ ] Stagger animations synchronized
- [ ] No layout shifts during animation
- [ ] Mobile animations performance acceptable

### Content Testing
- [ ] All text readable
- [ ] All images display
- [ ] Video plays
- [ ] Audio works
- [ ] Links go to correct pages
- [ ] External links open correctly

---

## 🔒 Security Checklist

### Before Deployment
- [ ] Remove debugging code
- [ ] Remove console.logs
- [ ] Check for hardcoded secrets
- [ ] Review error messages (no sensitive info)
- [ ] Enable HTTPS (automatic with Vercel)

### After Deployment
- [ ] Test form submission (check email)
- [ ] Verify API keys work
- [ ] Check Sanity connectivity
- [ ] Test user authentication (if applicable)
- [ ] Monitor error logs

---

## 📊 Google Search Console Setup

### Step 1: Verify Ownership
- [ ] Go to [Google Search Console](https://search.google.com/search-console)
- [ ] Add Property (URL Prefix)
- [ ] Enter: `https://www.voicesondeathrow.com`
- [ ] Click "Verify" (should auto-verify with meta tag in layout.tsx)

### Step 2: Submit Sitemap
- [ ] In Search Console → Sitemaps
- [ ] Enter: `sitemap.xml`
- [ ] Click Submit
- [ ] Wait for processing

### Step 3: Request Indexing
- [ ] In Search Console → URL Inspection
- [ ] Paste: `https://www.voicesondeathrow.com`
- [ ] Click "Request Indexing"
- [ ] Repeat for major pages:
  - `/voices`
  - `/letters`
  - `/art`
  - `/podcast`
  - `/about`
  - `/contact`

### Step 4: Monitor Performance
- [ ] Check Indexing Coverage monthly
- [ ] Monitor Search Performance
- [ ] Fix any crawl errors
- [ ] Check Core Web Vitals

---

## 📧 Email Verification

### Test Contact Form
- [ ] Fill out contact form
- [ ] Submit
- [ ] Check halima@ubfsf.org inbox
- [ ] Verify email received correctly
- [ ] Check for junk/spam folder
- [ ] Reply to test message

### Email Configuration
- [ ] Verify DKIM/SPF records (Resend handles)
- [ ] Monitor email deliverability
- [ ] Add unsubscribe link if newsletter added
- [ ] Test from different email clients

---

## 🧪 Analytics & Monitoring (Optional)

If adding analytics, configure:
- [ ] Google Analytics 4 (GA4)
- [ ] Vercel Analytics
- [ ] Error tracking (Sentry - optional)
- [ ] Monitor performance metrics

---

## 🎯 Post-Launch Checklist

### Week 1
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Test all features live
- [ ] Verify email delivery
- [ ] Check mobile experience
- [ ] Monitor traffic

### Week 2-4
- [ ] Invite Halima to start adding content
- [ ] Monitor Sanity CMS stability
- [ ] Gather early feedback
- [ ] Fix any issues
- [ ] Plan content population schedule

### Ongoing
- [ ] Regular backups (Sanity handles)
- [ ] Monitor uptime (Vercel)
- [ ] Update content as Halima provides
- [ ] Track Google Search rankings
- [ ] Respond to contact form submissions

---

## 🚨 Rollback Plan

If critical issues found:

### Quick Rollback
- [ ] Revert last commit: `git revert <commit>`
- [ ] Vercel auto-redeploys from main branch
- [ ] DNS pointed to previous version (if needed)

### Content Issues
- [ ] Sanity has automatic backups
- [ ] Can restore from backup if needed

---

## 📞 Emergency Contacts

**Technical Support:**
- Vercel Status: https://www.vercel-status.com
- GitHub Issues: Project repository
- Sanity Support: https://sanity.io/help

**Project Contact:**
- Halima Kilgore: halima@ubfsf.org
- UBFSF: ubfsf.org

---

## ✨ Launch Announcement

Once deployed:
- [ ] Announce on social media
- [ ] Email to supporters/networks
- [ ] Share with collaborators
- [ ] Contact media outlets
- [ ] Add to UBFSF website

---

## 📋 Final Verification

- [ ] Domain live and SSL working
- [ ] All pages accessible
- [ ] Forms functioning
- [ ] CMS accessible to Halima
- [ ] Analytics tracking (if enabled)
- [ ] Email working
- [ ] Google Search Console registered
- [ ] Documentation complete
- [ ] Handoff to Halima complete

---

## 🎉 Launch Complete!

**Expected Timeline:**
- GitHub setup: 15 minutes
- Vercel deployment: 5 minutes
- Domain setup: 5 minutes
- DNS propagation: 24-48 hours
- Google indexing: 1-2 weeks

**Go Live Status:** ⏳ Ready when Halima gives approval

---

**Deployment Checklist Version:** 1.0
**Last Updated:** April 13, 2026
**Status:** Ready for Launch
