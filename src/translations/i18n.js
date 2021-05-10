import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { TRANSLATIONS_NB } from './nb/translations';
import { TRANSLATIONS_EN } from './en/translations';

const resources = {
  en: {
    translation: TRANSLATIONS_EN,
    fallbackLng: 'en',
  },
  nb: {
    translation: TRANSLATIONS_NB,
    fallbackLng: 'en',
  },
  no: {
    translation: TRANSLATIONS_NB,
    fallbackLng: 'en',
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

// i18n.changeLanguage("zh");
