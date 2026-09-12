import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind class names, resolving conflicts (last wins). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/* ------------------------------------------------------------------ */
/* Media & text utilities                                              */
/* ------------------------------------------------------------------ */

export interface FocalPoint {
  /** Horizontal focal position, 0–1 (Sanity hotspot convention). */
  x: number;
  /** Vertical focal position, 0–1. */
  y: number;
}

/**
 * Convert a Sanity hotspot to a CSS object-position value.
 * Returns center when no hotspot is provided.
 */
export function focalPointToObjectPosition(focal?: FocalPoint | null): string {
  if (!focal) return '50% 50%';
  const x = Math.min(Math.max(focal.x, 0), 1) * 100;
  const y = Math.min(Math.max(focal.y, 0), 1) * 100;
  return `${x}% ${y}%`;
}

/** Format seconds as M:SS or H:MM:SS for audio/video UIs. */
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const s = Math.floor(seconds % 60);
  const m = Math.floor((seconds / 60) % 60);
  const h = Math.floor(seconds / 3600);
  const mm = h > 0 ? String(m).padStart(2, '0') : String(m);
  return h > 0 ? `${h}:${mm}:${String(s).padStart(2, '0')}` : `${mm}:${String(s).padStart(2, '0')}`;
}

/** Truncate text on a word boundary, appending an ellipsis when cut. */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const slice = text.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(' ');
  return `${(lastSpace > 0 ? slice.slice(0, lastSpace) : slice).trimEnd()}…`;
}


/* ------------------------------------------------------------------ */
/* Rate limiting                                                       */
/*                                                                     */
/* In-memory fixed-window limiter. Correct for the current standalone  */
/* Docker deployment (single process). If/when this moves to           */
/* multi-instance serverless, swap the store for Upstash Redis —       */
/* the exported interface stays identical.                             */
/* ------------------------------------------------------------------ */

export interface RateLimitOptions {
  /** Sliding window length in milliseconds. */
  windowMs: number;
  /** Max requests allowed per window. */
  max: number;
}

export interface RateLimitResult {
  allowed: boolean;
  /** Milliseconds until the caller may retry (0 if allowed). */
  retryAfterMs: number;
  remaining: number;
}

interface Bucket {
  hits: number[];
}

const buckets = new Map<string, Bucket>();

/** Periodically drop empty buckets so the map cannot grow unbounded. */
function prune(now: number, windowMs: number): void {
  if (buckets.size < 10_000) return;
  for (const [key, bucket] of buckets) {
    bucket.hits = bucket.hits.filter((t) => now - t < windowMs);
    if (bucket.hits.length === 0) buckets.delete(key);
  }
}

export function rateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  prune(now, options.windowMs);

  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => now - t < options.windowMs);

  if (bucket.hits.length >= options.max) {
    const oldest = bucket.hits[0];
    buckets.set(key, bucket);
    return {
      allowed: false,
      retryAfterMs: oldest + options.windowMs - now,
      remaining: 0,
    };
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);
  return {
    allowed: true,
    retryAfterMs: 0,
    remaining: options.max - bucket.hits.length,
  };
}

/** Best-effort client IP extraction behind proxies/CDNs. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

/** Standard 429 response with Retry-After header. */
export function tooManyRequests(result: RateLimitResult): Response {
  return Response.json(
    { error: 'Too many requests. Please try again later.' },
    {
      status: 429,
      headers: {
        'Retry-After': String(Math.ceil(result.retryAfterMs / 1000)),
      },
    },
  );
}

