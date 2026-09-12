import { aboutPage } from './aboutPage'
import { voice } from './voice' 
import { letters } from './letters'
import { art } from './art'
import { podcast } from './podcast'
import { contactInfo } from './contactInfo'
import { localeString, localeText } from './localeString'
import { familyVoice } from './familyVoice' // 1. Import the new schema
import { resource } from './resource'
import { visualMenu } from './visualMenu'; // ← Add this
import { homeStoryChapter } from './homeStoryChapter';
import { timelineEvent } from './timelineEvent';
import { customPage } from './customPage';


// Export as an array directly
export const schemaTypes = [
  aboutPage, 
  voice, 
  letters, 
  art, 
  podcast, 
  contactInfo, 
  localeString, 
  localeText,
  familyVoice, // 2. Add it to the array
  resource,
  visualMenu, // ← Add this
  homeStoryChapter,
  timelineEvent,
  customPage,
]
