import { getTranslations } from 'next-intl/server'

import { type GenericLocalePageProps } from '@/types/next'
import { constructMetadata } from '@/utils/metadata'

import SignUpForm from './form'

export const generateMetadata = async ({ params }: GenericLocalePageProps) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'auth' })

  return constructMetadata({
    title: t('signUp.title'),
  })
}

export default function SignUpPage() {
  return <SignUpForm />
}
