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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    }),
    defineField({ name: 'image', title: 'Portrait', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'introduction', title: 'Introduction', type: 'localeText' }),
    defineField({ name: 'testimony', title: 'Full Testimony', type: 'localeText' }),
  ],
})
