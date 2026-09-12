// src/sanity/schemaTypes/familyVoice.ts
import { defineType, defineField } from 'sanity'

export const familyVoice = defineType({
  name: 'familyVoice',
  title: "Families' Voices",
  type: 'document',
  fields: [
    defineField({ 
      name: 'name', 
      title: 'Full Name', 
      description: 'Enter the person\'s full name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Story Category',
      description: 'Which group does this story belong to?',
      type: 'string',
      options: {
        list: [
          { title: '🕯️ Families of Murder Victims', value: 'victims' },
          { title: '⚖️ Families of the Condemned', value: 'condemned' },
          { title: '🌅 Victims & Survivors Against the Death Penalty', value: 'survivors' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      description: 'This will be the web address (e.g., /families_voices/borgela-smith)',
      type: 'slug',
      options: { 
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ 
      name: 'image', 
      title: 'Portrait / Photograph', 
      description: 'Upload a portrait or meaningful image for this family member',
      type: 'image', 
      options: { hotspot: true } 
    }),
    
    // PRIMARY SECTIONS
    defineField({ 
      name: 'introduction', 
      title: '📝 Introduction / Context', 
      description: 'A short opening statement or quote that introduces this family\'s story. This appears at the top of the page.',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ 
      name: 'testimony', 
      title: '📖 Full Testimony', 
      description: 'The complete story or testimony. This is the main content.',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),

    // DYNAMIC CHAPTERS & BOX BUILDER
    defineField({
      name: 'additionalChapters',
      title: '📦 Custom Story Sections & Boxes',
      description: 'Add extra sections, pull quotes, or callout boxes. You can create as many as you need!',
      type: 'array',
      of: [
        // 1. Standard Custom Chapter / Box
        {
          type: 'object',
          name: 'chapter',
          title: '📄 Custom Text Section',
          fields: [
            { 
              name: 'chapterTitle', 
              title: 'Section Title', 
              type: 'localeString',
              description: 'Example: "Impact on Children", "Childhood Memories", "Healing Journey"',
            },
            { 
              name: 'chapterContent', 
              title: 'Section Content', 
              type: 'localeText',
              description: 'The main text for this section',
            },
            {
              name: 'style',
              title: 'Visual Style',
              description: 'How should this section look on the page?',
              type: 'string',
              options: {
                list: [
                  { title: '📄 Standard Paragraph', value: 'standard' },
                  { title: '📦 Highlight Box', value: 'highlight' },
                  { title: '💭 Reflection Box', value: 'reflection' },
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
              const styleMap = {
                standard: '📄 Standard',
                highlight: '📦 Highlight',
                reflection: '💭 Reflection'
              };
              return {
                title: titleEn || titleFr || 'Untitled Section',
                subtitle: styleMap[style as keyof typeof styleMap] || 'Standard',
              }
            }
          }
        },

        // 2. Featured Quote Box
        {
          type: 'object',
          name: 'quoteBox',
          title: '💬 Callout / Quote Box',
          description: 'A highlighted quote or powerful statement',
          fields: [
            {
              name: 'quoteText',
              title: 'Quote Text',
              type: 'localeText',
              description: 'The quote or statement',
            },
            {
              name: 'attribution',
              title: 'Who Said This?',
              type: 'string',
              description: 'Example: — Borgela Smith, Letter from Death Row',
            },
          ],
          preview: {
            select: {
              quote: 'quoteText.en',
              author: 'attribution',
            },
            prepare({ quote, author }) {
              return {
                title: quote ? `💬 "${quote.slice(0, 40)}${quote.length > 40 ? '...' : ''}"` : '💬 Quote Box',
                subtitle: author || 'Callout Box',
              }
            }
          }
        },

        // 3. Image with Caption (NEW - Extra visual element)
        {
          type: 'object',
          name: 'imageBox',
          title: '🖼️ Image with Caption',
          description: 'Add a supporting image with a caption',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'localeString',
              description: 'Description of the image',
            },
          ],
          preview: {
            select: {
              image: 'image',
              caption: 'caption.en',
            },
            prepare({ image, caption }) {
              return {
                title: caption || '🖼️ Image Box',
                subtitle: 'Image with caption',
                media: image,
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
        victims: '🕯️ Families of Murder Victims',
        condemned: '⚖️ Families of the Condemned',
        survivors: '🌅 Victims & Survivors Against the Death Penalty',
      };
      return {
        title,
        subtitle: categoryMap[subtitle] || subtitle,
        media,
      };
    },
  }
})