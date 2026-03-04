export const podcast = {
  name: 'podcast',
  title: 'Podcasts',
  type: 'document',
  fields: [
    { name: 'title', title: 'Episode Title', type: 'string' },
    { name: 'audioUrl', title: 'Audio File URL', type: 'url', description: 'Link to the MP3 file' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'date', title: 'Release Date', type: 'date' },
  ]
}
