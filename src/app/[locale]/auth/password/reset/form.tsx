'use client'

import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/common/button'
import FormElementMessage from '@/components/common/form-element-message'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Route } from '@/constants'
import useZodForm from '@/hooks/use-zod-form'
import { useRouter } from '@/i18n/routing'
import { authClient } from '@/utils/auth/react'
import cn from '@/utils/cn'

export interface ResetPasswordFormProps {
  className?: string
  token: string
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ className, token }) => {
  const t = useTranslations('auth')
  const router = useRouter()

  const form = useZodForm({
    schema: z.object({
      password: z.string().min(8),
    }),
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await authClient.resetPassword({
        newPassword: data.password,
        token,
      })

      toast.success(t('resetPassword.toast.title'), {
        description: t('resetPassword.toast.message'),
      })

      router.push(Route.AuthSignIn)
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
          <h1 className="text-2xl font-bold">{t('resetPassword.title')}</h1>
          <p className="text-balance text-slate-500">{t('resetPassword.subTitle')}</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">{t('resetPassword.form.password')}</Label>
          <Input {...form.register('password')} id="password" type="password" required />
          {form.formState.errors.password && (
            <FormElementMessage>{form.formState.errors.password.message}</FormElementMessage>
          )}
        </div>
        <Button type="submit" className="w-full" loading={form.formState.isSubmitting}>
          {t('resetPassword.form.submit')}
        </Button>
      </div>
    </form>
  )
}

export default ResetPasswordForm
