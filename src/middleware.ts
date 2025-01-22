import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

/**
 * - If you need add additional middleware to this: https://next-intl.dev/docs/routing/middleware#composing-other-middlewares
 * - This won't also run on static exports: https://next-intl.dev/docs/routing/middleware#usage-without-middleware-static-export
 */
export default createMiddleware(routing)

export const config = {
  /**
   * If using localePrefix: 'always', you can use the following matcher:
   * matcher: ['/', '/(de|en)/:path*'],
   *
   * otherwise use what we have activated below. Ref: https://next-intl.dev/docs/routing/middleware#matcher-no-prefix
   * Works for both. localePrefix: 'as-needed' and localePrefix: 'always'.*:
   *
   * Ref: @src/i18n/routing.ts
   */
  // Matcher entries are linked with a logical "or", therefore
  // if one of them matches, the middleware will be invoked.
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // However, match all pathnames within `/users`, optionally with a locale prefix
    '/([\\w-]+)?/users/(.+)',
  ],
}
