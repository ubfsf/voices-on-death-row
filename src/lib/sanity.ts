import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

// const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
// const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const client = createClient({
  projectId: "vufzo1a0",
  dataset: "production",
  apiVersion: '2024-03-03',
  useCdn: false, // Set to false to see changes immediately
});

// Using the named export to fix the deprecation error
const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
