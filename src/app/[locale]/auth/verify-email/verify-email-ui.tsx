'use client'

import React, { useTransition } from 'react'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/common/button'
import { authClient } from '@/utils/auth/react'
import cn from '@/utils/cn'

export interface VerifyEmailUiProps {
  className?: string
  email: string
}

const VerifyEmailUi: React.FC<VerifyEmailUiProps> = ({ email, className }) => {
  const t = useTranslations('auth')

  const [isPending, startTransition] = useTransition()

  const handleVerificationEmail = () => {
    startTransition(async () => {
      await authClient.sendVerificationEmail({
        email,
        callbackURL: '/',
      })
    })
  }

  return (
    <div className={cn('p-6 md:p-8', className)}>
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold">{t('verifyEmail.title')}</h1>
        <p className="text-slate-500">{t('verifyEmail.description')}</p>
        <Button variant="outline" className="mt-4" loading={isPending} onClick={handleVerificationEmail}>
          {t('verifyEmail.resendVerification')}
        </Button>
      </div>
    </div>
  )
}

export default VerifyEmailUi
