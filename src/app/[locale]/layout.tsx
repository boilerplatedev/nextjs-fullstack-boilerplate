import '../../styles/tailwind.css'

import { Inter, Space_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'

import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'

import AppProgress from '@/components/common/app-progress'
import { Toaster } from '@/components/ui/sonner'
import { routing, type Locale } from '@/i18n/routing'
import { TRPCReactProvider } from '@/utils/trpc/react'
import { HydrateClient } from '@/utils/trpc/server'

const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
})

const mono = Space_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}>) {
  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${sans.variable} ${mono.variable} antialiased`}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <TRPCReactProvider>
            <HydrateClient>{children}</HydrateClient>
          </TRPCReactProvider>
        </NextIntlClientProvider>
        <AppProgress />
        <Toaster />
      </body>
    </html>
  )
}
