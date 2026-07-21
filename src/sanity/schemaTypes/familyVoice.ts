import { defineType, defineField } from 'sanity'

export const familyVoice = defineType({
  name: 'familyVoice',
  title: "Families' Voices",
  type: 'document',
  fields: [
    defineField({ 
      name: 'name', 
      title: 'Name', 
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Families of Murder Victims', value: 'victims' },
          { title: 'Families of the Condemned', value: 'condemned' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ 
      name: 'image', 
      title: 'Portrait / Photograph', 
      type: 'image', 
      options: { hotspot: true } 
    }),
    
    // PRIMARY SECTIONS
    defineField({ 
      name: 'introduction', 
      title: 'Introduction / Context', 
      description: 'Short opening statement or quote for this family story.',
      type: 'localeText' 
    }),
    defineField({ 
      name: 'testimony', 
      title: 'Full Testimony', 
      description: 'The primary story text.',
      type: 'localeText' 
    }),

    // DYNAMIC CHAPTERS & BOX BUILDER
    defineField({
      name: 'additionalChapters',
      title: 'Custom Story Sections & Boxes',
      description: 'Add custom chapters, pull quotes, or key callout boxes. You can create as many as you need and set custom titles for each.',
      type: 'array',
      of: [
        // 1. Standard Custom Chapter / Box
        {
          type: 'object',
          name: 'chapter',
          title: 'Custom Text Chapter',
          fields: [
            { 
              name: 'chapterTitle', 
              title: 'Box / Chapter Title', 
              type: 'localeString',
              description: 'e.g., Impact on Children, Childhood Trauma, Healing Journey' 
            },
            { 
              name: 'chapterContent', 
              title: 'Content', 
              type: 'localeText' 
            },
            {
              name: 'style',
              title: 'Box Visual Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Standard Paragraph', value: 'standard' },
                  { title: 'Bordered Highlight Box', value: 'highlight' },
                  { title: 'Italic Reflection Box', value: 'reflection' },
                ],
                layout: 'radio',
              },
              initialValue: 'standard',
            },
          ],
          preview: {
            select: {
              titleEn: 'chapterTitle.en',
              titleFr: 'chapterTitle.fr',
              style: 'style',
            },
            prepare({ titleEn, titleFr, style }) {
              return {
                title: titleEn || titleFr || 'Untitled Custom Box',
                subtitle: `Style: ${style || 'standard'}`,
              }
            }
          }
        },

        // 2. Featured Quote Box
        {
          type: 'object',
          name: 'quoteBox',
          title: 'Callout / Quote Box',
          fields: [
            {
              name: 'quoteText',
              title: 'Quote Text',
              type: 'localeText',
            },
            {
              name: 'attribution',
              title: 'Attribution / Author',
              type: 'string',
              description: 'e.g., — Borgela, Letter from Death Row',
            },
          ],
          preview: {
            select: {
              quote: 'quoteText.en',
              author: 'attribution',
            },
            prepare({ quote, author }) {
              return {
                title: quote ? `“${quote.slice(0, 40)}...”` : 'Quote Box',
                subtitle: author || 'Callout Box',
              }
            }
          }
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      const categoryMap: Record<string, string> = {
        victims: 'Families of Murder Victims',
        condemned: 'Families of the Condemned',
      };
      return {
        title,
        subtitle: categoryMap[subtitle] || subtitle,
        media,
      };
    },
  }
})