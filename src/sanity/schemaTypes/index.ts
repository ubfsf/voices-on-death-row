import { about } from './about'
import { voice } from './voice' 
import podcast from './podcast'
import { letters } from './letters'
import { art } from './art'
import { contactInfo } from './contactInfo'
// 1. Import your new localization blueprints
import { localeString, localeText } from './localeString' 

export const schema = {
  // 2. Add them to the types array so they are globally available
  types: [
    about, 
    voice, 
    podcast, 
    letters, 
    art, 
    contactInfo, 
    localeString, 
    localeText
  ],
}
