// src/lib/sanityQueries.ts
import { client } from './sanity';

// Get Visual Menu data (FIXED)
export async function getVisualMenu(locale: string) {
  const query = `*[_type == "visualMenu"][0]{
    "heroTitle": heroTitle{
      "subtitle": subtitle[$locale],
      "mainTitle": mainTitle[$locale],
      "prefix": prefix[$locale],
      "deathRowText": deathRowText[$locale],
      "brushstrokeImage": brushstrokeImage.asset->url
    },
    "menuItems": menuItems[]{
      "title": title[$locale],
      "subtitle": subtitle[$locale],
      slug,
      "image": image.asset->url,
      align,
      isActive
    }
  }`;

  return await client.fetch(query, { locale });
}

// Get About Page data (NEW)
export async function getAboutPage(locale: string) {
  const query = `*[_type == "aboutPage"][0]{
    "title": title[$locale],
    "heroImage": heroImage.asset->url,
    "founderName": founderName[$locale],
    "founderTitle": founderTitle[$locale],
    "biography": biography[$locale],
    "quote": quote[$locale],
    "values": values[]{
      "label": label[$locale],
      "description": description[$locale]
    }
  }`;

  return await client.fetch(query, { locale });
}

// Get Family Voices
export async function getFamilyVoices(locale: string, category?: string) {
  let filter = '';
  if (category) {
    filter = `&& category == "${category}"`;
  }
  
  const query = `*[_type == "familyVoice" ${filter}]{
    name,
    slug,
    image,
    "introduction": introduction[$locale],
    category
  }`;

  return await client.fetch(query, { locale });
}

// Get Single Family Voice
export async function getFamilyVoice(slug: string, locale: string) {
  const query = `*[_type == "familyVoice" && slug.current == $slug][0]{
    name,
    category,
    image,
    "introduction": introduction[$locale],
    "testimony": testimony[$locale],
    "additionalChapters": additionalChapters[]{
      "title": chapterTitle[$locale],
      "content": chapterContent[$locale]
    }
  }`;

  return await client.fetch(query, { slug, locale });
}

// Get Letters
export async function getLetters(locale: string) {
  const query = `*[_type == "letters"]{
    title,
    slug,
    "content": content[$locale],
    author,
    date
  }`;

  return await client.fetch(query, { locale });
}

// Get Single Letter
export async function getLetter(slug: string, locale: string) {
  const query = `*[_type == "letters" && slug.current == $slug][0]{
    title,
    "content": content[$locale],
    author,
    date
  }`;

  return await client.fetch(query, { slug, locale });
}

// Get Podcasts
export async function getPodcasts(locale: string) {
  const query = `*[_type == "podcast"]{
    title,
    slug,
    "description": description[$locale],
    audioUrl,
    image,
    date
  }`;

  return await client.fetch(query, { locale });
}

// Get Art
export async function getArt(locale: string) {
  const query = `*[_type == "art"]{
    title,
    slug,
    "description": description[$locale],
    image,
    artist,
    date
  }`;

  return await client.fetch(query, { locale });
}

// Get Voices
export async function getVoices(locale: string) {
  const query = `*[_type == "voice"]{
    name,
    slug,
    "bio": bio[$locale],
    image,
    category
  }`;

  return await client.fetch(query, { locale });
}

// Get Single Voice
export async function getVoice(slug: string, locale: string) {
  const query = `*[_type == "voice" && slug.current == $slug][0]{
    name,
    "bio": bio[$locale],
    image,
    category
  }`;

  return await client.fetch(query, { slug, locale });
}