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
          { title: 'Video (YouTube Link or MP4 File)', value: 'video' },
          { title: 'Audio File (MP3/WAV)', value: 'audio' },
        ],
        layout: 'radio',
      },
      initialValue: 'video',
    }),
    defineField({ name: 'description', title: 'Description', type: 'localeText' }),
    
    // MEDIA UPLOADS
    defineField({
      name: 'videoUrl',
      title: 'Video URL (YouTube / Vimeo)',
      type: 'url',
      hidden: ({ document }) => document?.mediaType !== 'video',
    }),
    defineField({
      name: 'videoFile',
      title: 'Direct Video Upload (MP4)',
      type: 'file',
      options: { accept: 'video/*' },
      hidden: ({ document }) => document?.mediaType !== 'video',
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      options: { accept: 'audio/*' },
      hidden: ({ document }) => document?.mediaType !== 'audio',
    }),

    // ACCESSIBILITY / CC
    defineField({
      name: 'transcript',
      title: 'Transcript / Closed Captions',
      description: 'Add the full text of the recording here for accessibility.',
      type: 'localeText',
    }),

    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'episodeNumber', title: 'Episode Number', type: 'number' }),
    defineField({ name: 'releaseDate', title: 'Release Date', type: 'datetime' }),
  ],
})
