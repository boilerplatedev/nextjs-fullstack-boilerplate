import React from 'react'

import cn from '@/utils/cn'

const FormElementMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn('text-[0.8rem] font-medium text-red-500 dark:text-red-900', className)} {...props}>
        {children}
      </p>
    )
  },
)

FormElementMessage.displayName = 'FormElementMessage'

export default FormElementMessage
