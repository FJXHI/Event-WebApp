// src/i18n.ts
import { createI18n } from 'vue-i18n';

// Import the language files (e.g. German, English)
import de from '../locales/de.json';
import en from '../locales/en.json';

const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: 'de', // Set the default locale
  messages: {
    de,
    en,
  },
});

export default i18n;