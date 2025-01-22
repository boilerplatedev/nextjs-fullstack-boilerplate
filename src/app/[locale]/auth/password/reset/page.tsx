import { getTranslations } from 'next-intl/server'

import { Route } from '@/constants'
import { redirect } from '@/i18n/routing'
import { type GenericLocalePageProps } from '@/types/next'
import { constructMetadata } from '@/utils/metadata'

import ResetPasswordForm from './form'

export const generateMetadata = async ({ params }: GenericLocalePageProps) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'auth' })

  return constructMetadata({
    title: t('resetPassword.title'),
  })
}

export default async function ResetPasswordPage({ params, searchParams }: Readonly<GenericLocalePageProps>) {
  const { locale } = await params
  const { token: rawToken, error: rawError } = await searchParams

  const token = Array.isArray(rawToken) ? rawToken[0] : (rawToken ?? '')
  const error = Array.isArray(rawError) ? rawError[0] : (rawError ?? '')

  if (error === 'invalid_token') {
    redirect({
      href: `${Route.AuthPasswordForgot}?error=invalid_token`,
      locale,
    })
    return
  }

  if (!token.length) {
    redirect({ href: `${Route.AuthPasswordForgot}?error=no_token_found`, locale })
    return
  }

  /**
   * @note - made this component mainly because server-components can't have event handlers or
   * if we make them "use client", they can't have metadata. Catch 22.
   *
   * Error: "Event handlers cannot be passed to Client Component props"
   */
  return <ResetPasswordForm token={token} className="flex min-h-80 flex-col justify-center" />
}
