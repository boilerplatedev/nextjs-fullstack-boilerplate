import React from 'react'
import Link from 'next/link'

import { Route } from '@/constants'
import { env } from '@/env'
import cn from '@/utils/cn'

export interface ClickableLogoProps {
  href?: string
  className?: string
}

const ClickableLogo: React.FC<ClickableLogoProps> = ({ className, href = Route.Index }) => {
  return (
    <Link href={href} className={cn('flex items-center space-x-2', className)}>
      <h1 className={cn('sr-only')}>{env().NEXT_PUBLIC_APP_NAME}</h1>
    </Link>
  )
}

export default ClickableLogo
