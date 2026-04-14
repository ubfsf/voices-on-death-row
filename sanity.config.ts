import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

export default defineConfig({
  name: 'default',
  title: 'Voices On Death Row',
  projectId: 'vufzo1a0',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: [
      {
        name: 'voice',
        title: 'Voices',
        type: 'document',
        fields: [
          { name: 'name', title: 'Person Name', type: 'string' },
          { name: 'photo', title: 'Photo', type: 'image' },
          { name: 'bio', title: 'Biography', type: 'text' },
          { name: 'story', title: 'Story', type: 'text' },
          { name: 'sentenceStatus', title: 'Sentence Status', type: 'string' },
        ]
      },
      {
        name: 'letter',
        title: 'Letters',
        type: 'document',
        fields: [
          { name: 'title', title: 'Letter Title', type: 'string' },
          { name: 'author', title: 'Author Name', type: 'string' },
          { name: 'content', title: 'Letter Content', type: 'text' },
          { name: 'date', title: 'Date Written', type: 'datetime' },
        ]
      },
      {
        name: 'artwork',
        title: 'Art From Inside',
        type: 'document',
        fields: [
          { name: 'title', title: 'Artwork Title', type: 'string' },
          { name: 'artist', title: 'Artist Name', type: 'string' },
          { name: 'image', title: 'Artwork Image', type: 'image' },
          { name: 'description', title: 'Description', type: 'text' },
        ]
      },
      {
        name: 'podcast',
        title: 'Podcasts',
        type: 'document',
        fields: [
          { name: 'title', title: 'Episode Title', type: 'string' },
          { name: 'audioUrl', title: 'Audio URL', type: 'url' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'guest', title: 'Guest Name', type: 'string' },
        ]
      }
    ],
  },
});
