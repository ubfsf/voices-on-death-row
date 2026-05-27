import { defineType, defineField } from 'sanity'

export const art = defineType({
  name: 'art',
  title: 'Art From Inside',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Artwork Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'artist',
      title: 'Artist Name',
      type: 'string',
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
      description: 'e.g., Pencil on paper, Acrylic, Poem, Digital'
    }),
    defineField({
      name: 'dateCreated',
      title: 'Date Created',
      type: 'string',
      description: 'e.g., Summer 2023'
    }),
    defineField({
      name: 'facility',
      title: 'Facility / Location',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Artwork Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description or Poem Content',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'fr', type: 'text', title: 'French' },
      ]
    }),
  ],
})
