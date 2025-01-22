import React, { type ReactNode } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import cn from '@/utils/cn'

import { Slot } from '../ui/slot'

const TypographyCva = cva('', {
  variants: {
    variant: {
      none: '',
      'display-1': 'font-semibold text-[52px] leading-[72px] md:text-[96px] md:leading-[100px]',
      'display-2': 'font-semibold text-[40px] leading-[52px] md:text-[68px] md:leading-[76px]',
      'header-1': 'font-semibold text-[28px] leading-[32px] md:text-[48px] md:leading-[60px]',
      'header-2': 'font-semibold text-xl md:text-[28px] leading-[32px]',
      'header-sans-1': 'font-sans font-semibold text-[24px] md:text-[36px] leading-[32px]',
      'header-sans-2': 'font-sans font-semibold text-xl md:text-[28px] leading-[32px]',
      'header-sans-3': 'font-sans font-semibold text-lg md:text-xl leading-[24px]',
      subtitle: 'font-normal text-xl',
      'subtitle-semibold': 'font-semibold text-xl',
      'body-large': 'font-normal text-lg',
      'body-large-semibold': 'font-semibold text-lg',
      body: 'font-normal text-base',
      'body-medium': 'font-medium text-base',
      'body-semibold': 'font-semibold text-base',
      'body-small': 'font-normal text-sm',
      'body-small-medium': 'font-medium text-sm',
      'body-small-semibold': 'font-semibold text-sm',
      caption: 'font-normal text-xs',
      'pre-title': 'font-lexend-zetta font-extrabold text-xl tracking-wider uppercase',
      button: 'font-semibold text-[18px] leading-[22px]',
      link: 'font-bold text-base leading-[20px] underline',
      blockquote: 'border-l-4 pl-4 italic',
      // where child is either ul or ol
      list: 'my-6 ml-6 list-disc [&>li]:mt-2',
      'inline-code': 'relative rounded bg-neutral-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      prose:
        'prose prose-neutral max-w-none dark:prose-invert dark:text-neutral-400 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-neutral-500 dark:prose-lead:text-neutral-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.neutral.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px] prose-pre:rounded-xl prose-pre:bg-neutral-900 prose-pre:shadow-lg dark:prose-pre:bg-neutral-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-neutral-300/10 dark:prose-hr:border-neutral-800',
    },
  },
  defaultVariants: {
    variant: 'none',
  },
})

interface BaseTypographyProps {
  children: ReactNode | ReactNode[]
  className?: string
  slot?: string
}

export type TypographyProps = BaseTypographyProps & VariantProps<typeof TypographyCva>

/**
 * ==============================
 * Usage:
 * ==============================
 *
 * <Typography variant="regular">
 *   <p>Hello World</p>
 * </Typography>
 *
 * or:
 *
 * <Typography variant="regular">
 *   <h1>Hello World</h1>
 *   <p>This is a test</p>
 *   <pre>sd</pre>
 * </Typography>
 *
 */
const Typography: React.FC<TypographyProps> = ({ variant, children, className, ...props }) => {
  return (
    <Slot className={cn('transition-colors', TypographyCva({ variant, className }))} {...props}>
      {Array.isArray(children) ? <div>{children}</div> : children}
    </Slot>
  )
}

export default Typography
