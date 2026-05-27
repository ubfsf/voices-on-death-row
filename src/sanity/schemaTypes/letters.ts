import { defineType, defineField } from 'sanity'

export const letters = defineType({
  name: 'letters',
  title: 'Letters',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Letter Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'image',
      title: 'Letter Image / Scan',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Excerpt',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'fr', type: 'string', title: 'French' },
      ]
    }),
    defineField({
      name: 'content',
      title: 'Letter Content',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'fr', type: 'text', title: 'French' },
      ]
    }),
  ],
})
