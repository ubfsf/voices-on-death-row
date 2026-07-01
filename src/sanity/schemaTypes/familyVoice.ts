import { defineType, defineField } from 'sanity'

export const familyVoice = defineType({
  name: 'familyVoice',
  title: "Families' Voices",
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Families of Murder Victims', value: 'victims' },
          { title: 'Families of Death Row Prisoners', value: 'prisoners' },
          { title: 'Families of Incarcerated People', value: 'incarcerated' },
          { title: 'Survivors and Community Voices', value: 'community' },
        ],
      },
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    }),
    defineField({ name: 'image', title: 'Portrait', type: 'image', options: { hotspot: true } }),
    
    // PRIMARY SECTIONS
    defineField({ name: 'introduction', title: 'Introduction / Context', type: 'localeText' }),
    defineField({ name: 'testimony', title: 'Full Testimony', type: 'localeText' }),

    // THE "FLEXIBLE" SECTION: This lets her create her own titles/boxes
    defineField({
      name: 'additionalChapters',
      title: 'Additional Story Chapters',
      description: 'Halima: Click "Add Item" to create new custom sections (e.g., Childhood Trauma, Impact on Family, Healing Journey)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'chapter',
          fields: [
            { name: 'chapterTitle', title: 'Chapter Title (e.g. Impact on Children)', type: 'localeString' },
            { name: 'chapterContent', title: 'Content', type: 'localeText' }
          ]
        }
      ]
    }),
  ],
})
