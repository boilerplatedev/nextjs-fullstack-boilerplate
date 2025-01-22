import emailClient, { type SendEmailProps } from './email-client'
import { type PasswordResetEmailProps } from './templates/password-reset'
import { type VerificationEmailProps } from './templates/verification-email'

export interface EmailTemplates {
  verificationEmail: {
    key: 'verification-email'
    props: VerificationEmailProps
  }
  passwordResetEmail: {
    key: 'password-reset'
    props: PasswordResetEmailProps
  }
}

const emailTemplates: {
  [K in keyof EmailTemplates]: (
    props: Pick<SendEmailProps, 'to'> & EmailTemplates[K]['props'],
  ) => ReturnType<Awaited<typeof emailClient.template>>
} = {
  verificationEmail: async (props) => {
    return emailClient.template({
      template: 'verification-email',
      props,
      to: props.to,
      subject: 'Verify your email address',
    })
  },
  passwordResetEmail: async (props) => {
    return emailClient.template({
      template: 'password-reset',
      props,
      to: props.to,
      subject: 'Reset your password',
    })
  },
}

export default emailTemplates
