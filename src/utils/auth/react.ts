import { nextCookies } from 'better-auth/next-js'
import { createAuthClient } from 'better-auth/react' // make sure to import from better-auth/react

import { env } from '@/env'

export const authClient = createAuthClient({
  baseURL: `${env().NEXT_PUBLIC_APP_URL}/api/auth`,
  plugins: [
    nextCookies(),
    //
  ],
})
