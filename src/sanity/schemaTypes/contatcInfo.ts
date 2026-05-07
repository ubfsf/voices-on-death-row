export default {
  name: 'voice',
  type: 'document',
  title: 'Voice',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name'
      }
    },
    {
      name: 'bio',
      type: 'text',
      title: 'Biography'
    },
    {
      name: 'photo',
      type: 'image',
      title: 'Photo'
    },
    // ADD THIS NEW FIELD:
    {
      name: 'contactInfo',
      type: 'text',
      title: 'Contact Information',
      description: 'Email, mailing address, phone, social media links, etc.'
    }
  ]
}