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
    defineField({
      name: 'mediaType',
      title: 'Primary Media Format',
      type: 'string',
      options: {
        list: [
          { title: 'Video (YouTube/Vimeo)', value: 'video' },
          { title: 'Audio File (MP3/WAV)', value: 'audio' },
        ],
        layout: 'radio',
      },
      initialValue: 'video',
    }),
    defineField({ name: 'description', title: 'Description', type: 'localeText' }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      hidden: ({ document }) => document?.mediaType !== 'video',
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      options: { accept: 'audio/*' },
      hidden: ({ document }) => document?.mediaType !== 'audio',
    }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'episodeNumber', title: 'Episode Number', type: 'number' }),
    defineField({ name: 'releaseDate', title: 'Release Date', type: 'datetime' }),
  ],
})
