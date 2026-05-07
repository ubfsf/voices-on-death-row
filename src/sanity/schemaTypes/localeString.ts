import { defineType, defineField } from 'sanity'

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'string' }),
    defineField({ name: 'fr', title: 'French', type: 'string' }),
  ],
})

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized Text',
  type: 'object', // FIXED: Changed from 'text' to 'object'
  fields: [
    defineField({ name: 'en', title: 'English', type: 'text', rows: 5 }),
    defineField({ name: 'fr', title: 'French', type: 'text', rows: 5 }),
  ],
})
