import kebabCase from 'lodash/kebabCase'
import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

import { env } from '@/env'

/**
 * Add it here and also update matcher in @src/middleware.ts
 */
export const locales = ['en'] as const
export type Locale = (typeof locales)[number]

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',

  localePrefix: 'as-needed',

  localeCookie: {
    name: kebabCase(env().NEXT_PUBLIC_APP_NAME) + '-locale',
  },
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
