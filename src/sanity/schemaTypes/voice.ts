import { defineType, defineField } from 'sanity'

export const voice = defineType({
  name: 'voice',      // The internal ID
  title: 'Voices',    // What Halima sees in the sidebar
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'about', title: 'About', type: 'text', rows: 3 }),
    defineField({ name: 'skillsInterests', title: 'Skills & Interests', type: 'text', rows: 3 }),
    defineField({ name: 'professionalBackground', title: 'Professional Background', type: 'text', rows: 3 }),
    defineField({ name: 'personalLife', title: 'Personal Life', type: 'text', rows: 3 }),
    defineField({ name: 'entertainmentSports', title: 'Entertainment & Sports', type: 'text', rows: 3 }),
    defineField({ name: 'legalSituation', title: 'Legal Situation', type: 'text', rows: 5 }),
    defineField({ name: 'voiceExpression', title: 'Voice & Expression', type: 'text', rows: 5 }),
    defineField({ name: 'supportAdvocacy', title: 'Support & Advocacy', type: 'text', rows: 5 }),
    defineField({ name: 'caseLink', title: 'Link to learn more about case (URL)', type: 'url' }),
    defineField({ name: 'contactInfo', title: 'Contact Information', type: 'text', rows: 3 }),
  ],
})
