import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './settings';

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales });

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default
}));