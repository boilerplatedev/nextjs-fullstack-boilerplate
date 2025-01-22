import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'
import kebabCase from 'lodash/kebabCase'

import { env } from '@/env'
import { prisma } from '@/server/services/prisma'
import { cuid } from '@/utils/id'

import email from './email'

export { verifyPassword, hashPassword } from 'better-auth/crypto'

export const createAuth = () =>
  betterAuth({
    appName: env().NEXT_PUBLIC_APP_NAME,
    basePath: `/api/auth`,
    baseURL: env().NEXT_PUBLIC_APP_URL,
    secret: env().APP_SECRET,
    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),
    advanced: {
      generateId: () => cuid({ fingerprint: 'id' }),
      cookiePrefix: kebabCase(env().NEXT_PUBLIC_APP_NAME),
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      sendResetPassword: async ({ token, url, user }) => {
        await email.passwordResetEmail({
          appName: env().NEXT_PUBLIC_APP_NAME,
          url,
          name: user.name,
          email: user.email,
          token,
          to: user.email,
        })
      },
    },
    // https://www.better-auth.com/docs/concepts/email#verifying-the-email
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ url, user }, _request) => {
        await email.verificationEmail({
          appName: env().NEXT_PUBLIC_APP_NAME,
          url: url,
          name: user.name,
          to: user.email,
        })
      },
    },
    user: { modelName: 'User' },
    session: {
      modelName: 'Session',
      // enabling cache with a short-lived session cookie
      // ref: https://www.better-auth.com/docs/guides/optimizing-for-performance#cookie-cache
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // Cache duration in seconds
      },
    },
    account: { modelName: 'UserAccount' },
    verification: { modelName: 'UserVerification' },
    plugins: [
      // Add more plugins here
      //
      // This needs to be the last plugin: https://www.better-auth.com/docs/integrations/next
      nextCookies(),
    ],
  })

export const auth = createAuth()
