import {Pathnames} from 'next-intl/navigation';

export const locales = ['en', 'ru', 'ar'] as const;

export const pathnames = {
  '/': '/',
  '/pathnames': {
    en: '/pathnames',
    ru: '/pathnames',
    ar: '/pathnames'
  }
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;