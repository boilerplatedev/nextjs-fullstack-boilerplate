'use client'

import { useSearchParams } from 'next/navigation'

import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/common/button'
import FormElementMessage from '@/components/common/form-element-message'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Route } from '@/constants'
import useZodForm from '@/hooks/use-zod-form'
import { Link } from '@/i18n/routing'
import { authClient } from '@/utils/auth/react'
import cn from '@/utils/cn'

export interface ForgotPasswordFormProps {
  className?: string
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ className }) => {
  const t = useTranslations('auth')
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const form = useZodForm({
    schema: z.object({
      email: z.string().email(),
    }),
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await authClient.forgetPassword({
        email: data.email,
        redirectTo: Route.AuthPasswordReset,
      })

      toast.success(t('forgotPassword.toast.title'), {
        description: t('forgotPassword.toast.message'),
      })

      form.reset()
    } catch (error) {
      toast.error(t('somethingWentWrongError.title'), {
        // eslint-disable-next-line sonarjs/no-nested-template-literals
        description: `${t('somethingWentWrongError.message')}${error instanceof Error ? ` - ${error.message}` : ''}`,
      })
    }
  })

  return (
    <form onSubmit={onSubmit} className={cn('p-6 md:p-8', className)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">{t('forgotPassword.title')}</h1>
          <p className="text-balance text-slate-500">{t('forgotPassword.subTitle')}</p>
        </div>
        {error ? (
          <Alert variant={'destructive'}>
            {error === 'invalid_token' ? (
              <>
                <AlertTitle>{t('forgotPassword.errorToast.invalidToken.title')}</AlertTitle>
                <AlertDescription>{t('forgotPassword.errorToast.invalidToken.message')}</AlertDescription>
              </>
            ) : null}
            {error === 'no_token_found' ? (
              <>
                <AlertTitle>{t('somethingWentWrongError.title')}</AlertTitle>
                <AlertDescription>{t('somethingWentWrongError.message')}</AlertDescription>
              </>
            ) : null}
          </Alert>
        ) : null}
        <div className="grid gap-2">
          <Label htmlFor="email">{t('forgotPassword.form.email')}</Label>
          <Input
            {...form.register('email')}
            id="email"
            type="email"
            placeholder={t('forgotPassword.form.emailPlaceholder')}
            required
          />
          {form.formState.errors.email && (
            <FormElementMessage>{form.formState.errors.email.message}</FormElementMessage>
          )}
        </div>
        <Button type="submit" className="w-full" loading={form.formState.isSubmitting}>
          {t('forgotPassword.form.submit')}
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        {t('signUp.alreadyHaveAnAccount')}{' '}
        <Link href={Route.AuthSignIn} className="underline underline-offset-4">
          {t('signUp.signInLink')}
        </Link>
      </div>
    </form>
  )
}

export default ForgotPasswordForm
