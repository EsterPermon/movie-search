/* eslint-disable max-len */

import i18n from 'i18next'
import SupportedLanguages, {
  defaultFallbackLanguage,
} from './i18n-SupportedLanguages'
import english from './en'

const options = {
  lng: 'en',
  fallbackLng: defaultFallbackLanguage,
  resources: {
    [SupportedLanguages.en]: {
      translation: english,
    },
  },
}

i18n.init(options)

export const { changeLanguage } = i18n

export default i18n.t
