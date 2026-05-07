import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './src/sanity/schemaTypes'; // 1. Import your new registry

export default defineConfig({
  name: 'default',
  title: 'Voices On Death Row',
  projectId: 'vufzo1a0',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  // 2. THE FIX: Use the imported schema object instead of the hardcoded list
  schema: schema, 
});
