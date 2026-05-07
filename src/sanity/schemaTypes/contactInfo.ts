import { defineType, defineField } from 'sanity'

export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'document',
  fields: [
    defineField({
      name: 'founderName',
      title: 'Founder Name',
      type: 'string',
      initialValue: 'Halima Kilgore',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'address',
      title: 'Mailing Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
  ],
})
