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
    
    // IDENTITY FIELDS (Existing data is safe here)
    defineField({ name: 'inmateNumber', title: 'Inmate Number', type: 'string' }),
    defineField({ name: 'facility', title: 'Facility / Prison Name', type: 'string' }),
    defineField({ name: 'cityState', title: 'City, State', type: 'string' }),
    
    // STANDARD SECTIONS (Existing data is safe here)
    defineField({ name: 'about', title: 'About / Overview', type: 'localeText' }),
    defineField({ name: 'professionalBackground', title: 'Professional Background', type: 'localeText' }),
    defineField({ name: 'personalLife', title: 'Personal Life & Family', type: 'localeText' }),
    defineField({ name: 'legalSituation', title: 'Legal Situation', type: 'localeText' }),
    defineField({ name: 'contactInfo', title: 'Contact Information', type: 'localeText' }),

    // MRS Kilgore CUSTOM SECTIONS (She can create as many "boxes" as she wants here)
    defineField({
      name: 'additionalChapters',
      title: 'Additional Story Chapters',
      description: 'Halima: Click "Add Item" to create a new section (e.g., Spiritual Journey, How to Help)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'chapter',
          fields: [
            { name: 'chapterTitle', title: 'Chapter Title', type: 'localeString' },
            { name: 'chapterContent', title: 'Chapter Content', type: 'localeText' }
          ]
        }
      ]
    }),
    
    defineField({ name: 'caseLink', title: 'Link to Case Details (URL)', type: 'url' }),
  ],
})
