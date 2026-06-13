import { defineType, defineField } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string'
    }),
    // Role might need translation (e.g., "Founder" vs "Fondatrice")
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'localeString'
    }),
    defineField({
      name: 'bioImage',
      title: 'Biography Photo',
      type: 'image',
      options: { hotspot: true }
    }),

    // LOCALIZED NARRATIVE SECTIONS
    defineField({
      name: 'about',
      title: 'About (Mission)',
      type: 'localeText'
    }),
    defineField({
      name: 'personalLife',
      title: 'Personal Life',
      type: 'localeText'
    }),
    defineField({
      name: 'voiceExpression',
      title: 'Voice & Expression',
      type: 'localeText'
    }),
    defineField({
      name: 'supportAdvocacy',
      title: 'Support & Advocacy',
      type: 'localeText'
    }),

    defineField({
      name: 'beliefQuote',
      title: 'Personal Quote / Belief',
      type: 'localeText'
    }),
  ],
})
