import React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import cn from '@/utils/cn'

import Icon from './icon'

const LoadingCva = cva('', {
  variants: {
    size: {
      xs: 'w-4 h-4',
      sm: 'w-5 h-5',
      base: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'h-12 w-12',
      xxl: 'h-16 w-16',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
})

export type LoadingProps = {
  className?: string
  wrapperClassName?: string
  children?: React.ReactNode
} & VariantProps<typeof LoadingCva>

const Loading: React.FC<LoadingProps> = ({ size, className, wrapperClassName, children }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center space-y-4 text-sm', wrapperClassName)}>
      <Icon name="spinner" className={cn('animate-spin', LoadingCva({ size, className }))} />
      {children ? <>{children}</> : null}
    </div>
  )
}

export default Loading
