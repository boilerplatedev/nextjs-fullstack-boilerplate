/* eslint-disable no-restricted-properties */
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = () =>
  createEnv({
    /**
     * Specify your server-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars.
     */
    server: {
      NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
      APP_SECRET: z.string(),

      // Database
      DATABASE_URL: z.string(),
      DIRECT_DATABASE_URL: z.string(),

      // SMTP
      SMTP_SERVER: z.string(),
      SMTP_PORT: z.number({ coerce: true }),
      SMTP_USERNAME: z.string(),
      SMTP_PASSWORD: z.string(),
      SMTP_FROM: z.string(),
    },

    /**
     * Specify your client-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars. To expose them to the client, prefix them with
     * `NEXT_PUBLIC_`.
     */
    client: {
      NEXT_PUBLIC_APP_NAME: z.string(),
      NEXT_PUBLIC_APP_URL: z.string(),
      NEXT_PUBLIC_APP_ENVIRONMENT: z.enum(['local', 'development', 'test', 'staging', 'production']),
    },

    /**
     * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
     * middlewares) or client-side so we need to destruct manually.
     */
    runtimeEnv: {
      /**
       * ======================================
       * Server-side environment variables
       * ======================================
       */
      NODE_ENV: process.env.NODE_ENV,
      APP_SECRET: process.env.APP_SECRET,
      // Database
      DATABASE_URL: process.env.DATABASE_URL,
      DIRECT_DATABASE_URL: process.env.DIRECT_DATABASE_URL,
      // SMTP
      SMTP_SERVER: process.env.SMTP_SERVER,
      SMTP_PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined,
      SMTP_USERNAME: process.env.SMTP_USERNAME,
      SMTP_PASSWORD: process.env.SMTP_PASSWORD,
      SMTP_FROM: process.env.SMTP_FROM,
      /**
       * ======================================
       * Client-side environment variables
       * ======================================
       */
      NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      NEXT_PUBLIC_APP_ENVIRONMENT: process.env.NEXT_PUBLIC_APP_ENVIRONMENT,
    },
    /**
     * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
     * useful for Docker builds.
     */
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    /**
     * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
     * `SOME_VAR=''` will throw an error.
     */
    emptyStringAsUndefined: true,
  })
