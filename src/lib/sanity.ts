// src/lib/sanity.ts
import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

// Use environment variables (already in .env.local)
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export const client = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: '2024-03-03',
  // Use Sanity's CDN with ISR revalidation on fetches (see per-page
  // `export const revalidate`). Content changes propagate within the
  // revalidate window; wire a Sanity webhook → revalidateTag/on-demand
  // purge for instant updates when the ingest pipeline lands.
  useCdn: true,
});

// Image URL builder
const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}