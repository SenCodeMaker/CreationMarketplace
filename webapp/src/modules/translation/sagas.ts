import { createTranslationSaga } from 'decentraland-dapps/dist/modules/translation/sagas'
import * as translations from './locales'

export const translationSaga = createTranslationSaga({
  getTranslation: locale => {
    switch (locale) {
      case 'es':
        return translations.es
      case 'zh':
        return translations.zh
      case 'en':
      default:
        return translations.en
    }
  },
})
