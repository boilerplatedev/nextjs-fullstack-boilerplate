import { getTranslations } from 'next-intl/server'

import { type GenericLocalePageProps } from '@/types/next'
import { constructMetadata } from '@/utils/metadata'

import SignInForm from './form'

export const generateMetadata = async ({ params }: GenericLocalePageProps) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'auth' })

  return constructMetadata({
    title: t('signIn.title'),
  })
}

export default function SignInPage() {
  return <SignInForm />
}
