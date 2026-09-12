import { defineType, defineField } from 'sanity';

export const homeStoryChapter = defineType({
  name: 'homeStoryChapter',
  title: 'Home Story Chapter',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localeText',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'string',
      description: 'URL to video asset',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      titleEn: 'title.en',
      titleFr: 'title.fr',
      order: 'order',
    },
    prepare({ titleEn, titleFr, order }) {
      return {
        title: titleEn || titleFr || 'Untitled',
        subtitle: `Order ${order}`,
      };
    },
  },
});
