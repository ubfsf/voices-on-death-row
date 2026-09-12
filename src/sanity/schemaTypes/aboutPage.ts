// src/sanity/schemaTypes/aboutPage.ts
import { defineType, defineField } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'localeString',
      initialValue: {
        en: 'About the Founder',
        fr: 'À propos de la Fondatrice'
      }
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main image for the about page (museum photo)'
    }),
    defineField({
      name: 'portraitImage',
      title: 'Portrait Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Polaroid portrait of the founder used in the biography section'
    }),
    defineField({
      name: 'founderName',
      title: 'Founder Name',
      type: 'localeString',
      initialValue: {
        en: 'Halima Kilgore',
        fr: 'Halima Kilgore'
      }
    }),
    defineField({
      name: 'founderTitle',
      title: 'Founder Title',
      type: 'localeString',
      initialValue: {
        en: 'Founder of Voices on Death Row',
        fr: 'Fondatrice de Voices on Death Row'
      }
    }),
    defineField({
      name: 'biography',
      title: 'Biography',
      type: 'localeText',
      description: 'Full biography text'
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'localeString',
      initialValue: {
        en: '"Giving voice to every side of the story, because humanity has no borders."',
        fr: '"Donner une voix à chaque côté de l\'histoire, car l\'humanité n\'a pas de frontières."'
      }
    }),
    defineField({
      name: 'values',
      title: 'Core Values',
      type: 'array',
      of: [
        defineField({
          name: 'value',
          title: 'Value',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'localeString',
              description: 'e.g., "I LISTEN"'
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'localeString',
              description: 'e.g., "Because every voice matters."'
            })
          ]
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'heroImage'
    },
    prepare({ title, media }) {
      return {
        title: title || 'About Page',
        media: media
      };
    }
  }
});