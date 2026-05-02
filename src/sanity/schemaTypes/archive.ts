export const archive = {
  name: 'archive', // This is your _type
  title: 'Archive Entries',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }, // ADD THIS
    { name: 'content', title: 'Letter Content', type: 'text' },
    { name: 'author', title: 'Incarcerated Author', type: 'string' },
    { name: 'image', title: 'Associated Image', type: 'image' },
  ]
}
