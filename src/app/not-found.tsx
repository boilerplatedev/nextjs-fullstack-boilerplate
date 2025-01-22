import '../styles/tailwind.css'

import Image from 'next/image'

import { constructMetadata } from '@/utils/metadata'

export const metadata = constructMetadata({
  title: 'Not Found',
})

export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <title>404</title>
      </head>
      <body className="flex h-screen items-center justify-center">
        <div className="relative p-4">
          <div className="relative h-full">
            <div className="absolute inset-0 rounded-full bg-black/40"></div>
            <Image
              width={1000}
              height={1000}
              src="/static/placeholder-valley.jpg"
              alt="Valley"
              className="w-full max-w-lg rounded-full lg:max-w-5xl"
            />
          </div>
          <h1 className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center text-[150px] font-semibold leading-[72px] text-white md:leading-[100px]">
            404
          </h1>
        </div>
      </body>
    </html>
  )
}
