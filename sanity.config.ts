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
        name: 'podcast',
        title: 'Podcasts',
        type: 'document',
        fields: [
          { name: 'title', title: 'Episode Title', type: 'string' },
          { name: 'audioUrl', title: 'Audio URL', type: 'url' },
          { name: 'description', title: 'Description', type: 'text' },
        ]
      }
    ],
  },
});
