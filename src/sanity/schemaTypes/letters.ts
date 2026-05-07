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
      name: 'content',
      title: 'Letter Content',
      type: 'text',
    }),
  ],
})
