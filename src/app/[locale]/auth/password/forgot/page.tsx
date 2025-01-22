import { getTranslations } from 'next-intl/server'

import { type GenericLocalePageProps } from '@/types/next'
import { constructMetadata } from '@/utils/metadata'
import { HydrateClient } from '@/utils/trpc/server'

import ForgotPasswordForm from './form'

export const generateMetadata = async ({ params }: GenericLocalePageProps) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'auth' })

  return constructMetadata({
    title: t('forgotPassword.title'),
  })
}

export default function ForgotPasswordPage() {
  /**
   * @note - made this component mainly because server-components can't have event handlers or
   * if we make them "use client", they can't have metadata. Catch 22.
   *
   * Error: "Event handlers cannot be passed to Client Component props"
   */
  return (
    <HydrateClient>
      <ForgotPasswordForm className="flex min-h-80 flex-col justify-center" />
    </HydrateClient>
  )
}
