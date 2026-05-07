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
      name: 'artist',
      title: 'Artist Name',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Artwork Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
