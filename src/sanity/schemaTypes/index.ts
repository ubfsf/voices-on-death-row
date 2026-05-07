import { voice } from './voices'
import podcast from './podcast'
import { letters } from './letters'
import { art } from './art'
import { contactInfo } from './contactInfo'

export const schema = {
  // Adding all your blueprints to the types array
  // This is what generates the folders in your Sanity Studio sidebar
  types: [voice, podcast, letters, art, contactInfo],
}
