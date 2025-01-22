import { headers } from 'next/headers'

import { auth } from '@/server/services/auth'

export const getServerSession = async () => {
  return auth.api.getSession({ headers: await headers() })
}
