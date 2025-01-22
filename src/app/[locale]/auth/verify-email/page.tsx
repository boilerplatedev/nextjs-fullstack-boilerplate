import { getTranslations } from 'next-intl/server'

import { Route } from '@/constants'
import { redirect } from '@/i18n/routing'
import { type GenericLocalePageProps } from '@/types/next'
import { constructMetadata } from '@/utils/metadata'

import VerifyEmailUi from './verify-email-ui'

export const generateMetadata = async ({ params }: GenericLocalePageProps) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'auth' })

  return constructMetadata({
    title: t('verifyEmail.title'),
  })
}

export default async function VerifyEmailPage({ params, searchParams }: Readonly<GenericLocalePageProps>) {
  const { locale } = await params
  const { email: rawEmail } = await searchParams

  const email = Array.isArray(rawEmail) ? rawEmail[0] : (rawEmail ?? '')

  if (!email.length) {
    redirect({ href: Route.AuthSignIn, locale })
  }

  /**
   * @note - made this component mainly because server-components can't have event handlers
   * Error: "Event handlers cannot be passed to Client Component props"
   */
  return <VerifyEmailUi email={email} />
}
