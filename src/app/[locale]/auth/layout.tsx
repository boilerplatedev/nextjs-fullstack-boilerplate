import { headers } from 'next/headers'
import Image from 'next/image'

import { getTranslations } from 'next-intl/server'

import { Card, CardContent } from '@/components/ui/card'
import { Route } from '@/constants'
import { Link, redirect } from '@/i18n/routing'
import { auth } from '@/server/services/auth'
import { type GenericLocalePageProps } from '@/types/next'
import cn from '@/utils/cn'

export default async function AuthLayout({
  children,
  params,
}: Readonly<
  {
    children: React.ReactNode
  } & GenericLocalePageProps
>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'auth' })

  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.session.id) {
    redirect({ href: Route.Dashboard, locale })
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-slate-100 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn('flex flex-col gap-6')}>
          <Card className="overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="relative hidden bg-slate-100 md:block">
                <Image
                  width={1000}
                  height={1000}
                  src="/static/placeholder-4x5.jpg"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
              {children}
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-slate-500 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-slate-900">
            {t.rich('terms', {
              terms: (chunks) => <Link href={Route.TermsOfService}>{chunks}</Link>,
              privacy: (chunks) => <Link href={Route.PrivacyPolicy}>{chunks}</Link>,
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
