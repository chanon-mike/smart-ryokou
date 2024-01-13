import { createI18nClient } from 'next-international/client';

// import ja from './ja';

export const {
  useI18n,
  useScopedI18n,
  I18nProviderClient,
  useChangeLocale,
  defineLocale,
  useCurrentLocale,
} = createI18nClient(
  {
    en: async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return import('./en');
    },
    ja: async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return import('./ja');
    },
  },
  // {
  //   fallbackLocale: ja,
  // },
);
