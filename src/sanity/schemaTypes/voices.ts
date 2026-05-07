import { defineType, defineField } from 'sanity'

export const voices = defineType({
  name: 'voice',
  title: 'Voices',
  type: 'document',
  fields: [
    defineField({
      name: 'personName',
      title: 'Person Name',
      type: 'string',
    }),
    // ✅ ADD THIS SLUG FIELD
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'personName',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'biography',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})