import { type Locale } from '@/i18n/routing'

export interface GenericLocalePageProps {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}
