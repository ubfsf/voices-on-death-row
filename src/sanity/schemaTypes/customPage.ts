import { defineType, defineField } from 'sanity';

export const customPage = defineType({
  name: 'customPage',
  title: 'Custom Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.en' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        { type: 'localeText' },
        { type: 'image', options: { hotspot: true } },
        { type: 'string', name: 'videoUrl', title: 'Video URL' },
      ],
    }),
  ],
  preview: {
    select: {
      titleEn: 'title.en',
      titleFr: 'title.fr',
      slug: 'slug.current',
    },
    prepare({ titleEn, titleFr, slug }) {
      return {
        title: titleEn || titleFr || 'Untitled',
        subtitle: slug,
      };
    },
  },
});
