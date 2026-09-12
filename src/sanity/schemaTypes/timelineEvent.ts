import { defineType, defineField } from 'sanity';

export const timelineEvent = defineType({
  name: 'timelineEvent',
  title: 'Timeline Event',
  type: 'document',
  fields: [
    defineField({
      name: 'season',
      title: 'Season',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
    }),
  ],
  preview: {
    select: {
      titleEn: 'title.en',
      titleFr: 'title.fr',
      season: 'season',
    },
    prepare({ titleEn, titleFr, season }) {
      return {
        title: titleEn || titleFr || 'Untitled',
        subtitle: season,
      };
    },
  },
});
