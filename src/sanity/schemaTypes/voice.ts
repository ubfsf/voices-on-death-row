import { defineType, defineField } from 'sanity'

export const voice = defineType({
  name: 'voice',
  title: 'Voices',
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
    
    // IDENTIFICATION (Same for both languages)
    defineField({ name: 'inmateNumber', title: 'Inmate Number', type: 'string' }),
    defineField({ name: 'facility', title: 'Facility / Prison Name', type: 'string' }),
    defineField({ name: 'cityState', title: 'City, State', type: 'string' }),
    
    // LOCALIZED NARRATIVE SECTIONS (Uses the localeText helper)
    defineField({ name: 'about', title: 'About', type: 'localeText' }),
    defineField({ name: 'legalSituation', title: 'Legal Situation', type: 'localeText' }),
    defineField({ name: 'voiceExpression', title: 'Voice & Expression', type: 'localeText' }),
    defineField({ name: 'supportAdvocacy', title: 'Support & Advocacy', type: 'localeText' }),
    defineField({ name: 'contactInfo', title: 'Contact Information', type: 'localeText' }),
    
    defineField({ name: 'caseLink', title: 'Link to Case Details (URL)', type: 'url' }),
  ],
})
