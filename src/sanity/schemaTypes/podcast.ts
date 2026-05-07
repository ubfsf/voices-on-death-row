import { defineType, defineField } from 'sanity'

export const podcast = defineType({
  name: 'podcast',
  title: 'Podcasts',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'localeString' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.en', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'episodeNumber', title: 'Episode Number', type: 'number' }),
    defineField({ name: 'description', title: 'Description', type: 'localeText' }),
    
    // MEDIA FIELDS
    defineField({
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      options: { accept: 'audio/*' },
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (YouTube / Vimeo)',
      type: 'url',
      description: 'Paste the link to the video recording here.'
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    
    defineField({ name: 'duration', title: 'Duration (e.g., "45:32")', type: 'string' }),
    defineField({ name: 'releaseDate', title: 'Release Date', type: 'datetime' }),
  ],
})
