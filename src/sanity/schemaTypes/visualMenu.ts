// src/sanity/schemaTypes/visualMenu.ts
import { defineType, defineField } from 'sanity';

export const visualMenu = defineType({
  name: 'visualMenu',
  title: 'Extra Menu Items',
  type: 'document',
  description: 'Add extra menu items beyond the default 3 (Voices, Letters, Podcast)',
  fields: [
    defineField({
      name: 'menuItems',
      title: 'Extra Menu Items',
      type: 'array',
      description: 'Add additional menu items here. The defaults (Voices, Letters, Podcast) are always shown.',
      of: [
        defineField({
          name: 'menuItem',
          title: 'Menu Item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'localeString',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'localeText',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'slug',
              title: 'URL Slug',
              type: 'string',
              description: 'e.g., "families_voices" or "art"',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'image',
              title: 'Background Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'align',
              title: 'Text Alignment',
              type: 'string',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Right', value: 'right' }
                ],
                layout: 'radio'
              },
              initialValue: 'left'
            }),
            defineField({
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              initialValue: true
            })
          ],
          preview: {
            select: {
              titleEn: 'title.en',
              titleFr: 'title.fr',
              image: 'image',
              active: 'isActive'
            },
            prepare({ titleEn, titleFr, image, active }) {
              return {
                title: titleEn || titleFr || 'Untitled',
                subtitle: active ? '✅ Extra item' : '⛔ Disabled',
                media: image
              };
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      items: 'menuItems'
    },
    prepare({ items }) {
      return {
        title: 'Extra Menu Items',
        subtitle: `${items?.length || 0} extra items added`
      };
    }
  }
});