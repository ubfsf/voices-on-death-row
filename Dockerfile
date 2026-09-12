# ─────────────────────────────────────────────────────────────────────
# Voices On Death Row — production image
# Multi-stage build → minimal non-root runtime with zero secrets baked in.
# Server-secrets (RESEND_API_KEY, GEMINI_API_KEY) are NOT copied into the
# image; they are supplied at runtime via docker-compose / env vars only.
# ─────────────────────────────────────────────────────────────────────

# ─────────────────────────────────────────────────────────────────────
# STAGE 1 — dependencies (layer cached unless package files change)
# ─────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ─────────────────────────────────────────────────────────────────────
# STAGE 2 — build (only PUBLIC vars are baked; they are not secrets)
# ─────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Public build-time values (safe — used to query the public Sanity CMS)
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID \
    NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET \
    NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

RUN npm run build

# ─────────────────────────────────────────────────────────────────────
# STAGE 3 — runtime (minimal, non-root, read-only safe)
# ─────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Runs as unprivileged user (never root)
RUN addgroup -g 1001 -S nodejs \
    && adduser -S nextjs -u 1001 -G nodejs

# Next.js standalone output = server + minimal node_modules
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
# Static assets & public files needed at runtime
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

# Basic health check against the running server
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/_not-found').then(r=>process.exit(r.status===404||r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]