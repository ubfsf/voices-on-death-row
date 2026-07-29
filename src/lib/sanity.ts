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
  useCdn: false, // Set to false to see changes immediately
});

// Image URL builder
const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}