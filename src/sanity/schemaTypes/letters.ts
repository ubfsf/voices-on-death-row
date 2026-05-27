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
      name: 'author',
      title: 'Author Name',
      type: 'string',
      description: 'Who wrote this letter?'
    }),
    defineField({
      name: 'writtenDate',
      title: 'Date Written',
      type: 'date',
    }),
    defineField({
      name: 'facility',
      title: 'Facility / Location',
      type: 'string',
      description: 'e.g., SCI Phoenix, Pennsylvania'
    }),
    defineField({
      name: 'category',
      title: 'Letter Category',
      type: 'string',
      options: {
        list: [
          { title: 'Personal Correspondence', value: 'personal' },
          { title: 'Prison Writing', value: 'prison' },
          { title: 'Excerpt', value: 'excerpt' },
          { title: 'Legal Reflection', value: 'legal' },
        ]
      }
    }),
    defineField({
      name: 'image',
      title: 'Letter Image / Scan',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Excerpt (For Grid)',
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
