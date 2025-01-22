import { type Metadata } from 'next'

import { env } from '@/env'

export function constructMetadata({
  title,
  fullTitle,
  siteTitle = 'Next Fullstack Boilerplate',
  description = 'A modern full-stack Next.js boilerplate with TypeScript, Tailwind CSS, and more.',
  image,
  video,
  icons,
  canonicalUrl,
  noIndex = false,
}: {
  title?: string
  fullTitle?: string
  siteTitle?: string
  description?: string
  image?: string | null
  video?: string | null
  icons?: Metadata['icons']
  canonicalUrl?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title: fullTitle ?? (title ? `${title} | ${siteTitle}` : siteTitle),
    description,
    openGraph: {
      title,
      description,
      ...(image && {
        images: image,
      }),
      ...(video && {
        videos: video,
      }),
    },
    twitter: {
      title,
      description,
      ...(image && {
        card: 'summary_large_image',
        images: [image],
      }),
      ...(video && {
        player: video,
      }),
      creator: '@abhishekwebin',
    },
    icons,
    metadataBase: new URL(env().NEXT_PUBLIC_APP_URL),
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
