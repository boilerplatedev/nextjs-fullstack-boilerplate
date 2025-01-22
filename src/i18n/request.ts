/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getRequestConfig } from 'next-intl/server'

import { routing, type Locale } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: {
      auth: (await import(`./static/${locale}/auth.json`)).default,
      landing: (await import(`./static/${locale}/landing.json`)).default,
    },
  }
})
