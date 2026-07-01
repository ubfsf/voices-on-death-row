import { defineType, defineField } from 'sanity'

export const resource = defineType({
  name: 'resource',
  title: 'Resources',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Resource Title', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Legal Assistance', value: 'legal' },
          { title: 'Psychological Support & Trauma', value: 'support' },
          { title: 'Educational Materials', value: 'education' },
          { title: 'How to Help / Advocacy', value: 'advocacy' },
        ],
      },
    }),
    defineField({ name: 'description', title: 'Short Description', type: 'localeText' }),
    defineField({ name: 'link', title: 'External Link (URL)', type: 'url' }),
    defineField({ name: 'file', title: 'Downloadable PDF', type: 'file' }),
  ],
})
