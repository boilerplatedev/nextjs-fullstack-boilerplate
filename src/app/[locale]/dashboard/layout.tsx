import { Route } from '@/constants'
import { redirect } from '@/i18n/routing'
import { type GenericLocalePageProps } from '@/types/next'
import { getServerSession } from '@/utils/auth/server'
import { constructMetadata } from '@/utils/metadata'

export const metadata = constructMetadata()

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode } & GenericLocalePageProps>) {
  const { locale } = await params

  const session = await getServerSession()
  if (!session?.session.id) {
    redirect({ href: Route.AuthSignIn, locale })
  }

  return <div className="min-h-svh">{children}</div>
}
