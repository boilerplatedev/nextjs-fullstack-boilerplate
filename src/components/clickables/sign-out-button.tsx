'use client'

import React, { useTransition } from 'react'

import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { Route } from '@/constants'
import { useRouter } from '@/i18n/routing'
import { authClient } from '@/utils/auth/react'

import { Button, type ButtonProps } from '../common/button'

const SignOutButton: React.FC<Omit<ButtonProps, 'onClick'>> = ({ loading, type = 'button', ...props }) => {
  const t = useTranslations('auth')
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const handleSignOut = () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => router.push(Route.AuthSignIn),
          onError: () => {
            toast.error(t('somethingWentWrongError.title'), {
              description: t('somethingWentWrongError.message'),
            })
          },
        },
      })
    })
  }

  return (
    <Button onClick={handleSignOut} type={type} loading={isPending || loading} {...props}>
      {t('signOut.button')}
    </Button>
  )
}

export default SignOutButton
