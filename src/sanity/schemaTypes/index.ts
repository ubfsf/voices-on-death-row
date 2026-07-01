import { about } from './about'
import { voice } from './voice' 
import { letters } from './letters'
import { art } from './art'
import { podcast } from './podcast'
import { contactInfo } from './contactInfo'
import { localeString, localeText } from './localeString'
import { familyVoice } from './familyVoice' // 1. Import the new schema

// Export as an array directly
export const schemaTypes = [
  about, 
  voice, 
  letters, 
  art, 
  podcast, 
  contactInfo, 
  localeString, 
  localeText,
  familyVoice // 2. Add it to the array
]
