import { getTranslations } from 'next-intl/server'

import Typography from '@/components/common/typography'
import { Route } from '@/constants'
import { Link } from '@/i18n/routing'
import { type GenericLocalePageProps } from '@/types/next'
import { getServerSession } from '@/utils/auth/server'
import { constructMetadata } from '@/utils/metadata'

export const generateMetadata = async ({ params }: GenericLocalePageProps) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing' })

  return constructMetadata({
    title: t('home.title'),
  })
}

export default async function Home({ params }: Readonly<GenericLocalePageProps>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.home' })

  const session = await getServerSession()

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Typography variant="header-2">
        <h2>{t('title')}</h2>
      </Typography>

      <div className="mt-4 flex items-center gap-2">
        {!session?.session.id ? (
          <>
            <Typography variant="link">
              <Link href={Route.AuthSignUp}>{t('links.signUp')}</Link>
            </Typography>
            &middot;
            <Typography variant="link">
              <Link href={Route.AuthSignIn}>{t('links.signIn')}</Link>
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="link">
              <Link href={Route.Dashboard}>
                {t('links.dashboard')} for {session.user.name}
              </Link>
            </Typography>
          </>
        )}
      </div>
    </div>
  )
}
