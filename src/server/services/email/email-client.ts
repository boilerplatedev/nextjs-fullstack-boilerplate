import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { type JSX } from 'react'

import { render } from 'jsx-email'
import nodemailer from 'nodemailer'

import { env } from '@/env'

import { type EmailTemplates } from './templates'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const transporter = nodemailer.createTransport({
  host: env().SMTP_SERVER,
  port: env().SMTP_PORT,
  auth: {
    user: env().SMTP_USERNAME,
    pass: env().SMTP_PASSWORD,
  },
  from: env().SMTP_FROM,
})

export interface SendEmailProps {
  to: string[] | string
  subject: string
  bodyPlainText?: string
  bodyHtml?: string
}

const send = async ({ to, subject, bodyHtml, bodyPlainText }: SendEmailProps) =>
  transporter.sendMail({
    from: env().SMTP_FROM,
    to,
    subject: subject,
    text: bodyPlainText,
    html: bodyHtml,
  })

/**
 * Use JSX Email to style and render email templates.
 * Ref: https://jsx.email/
 */
const sendAsTemplate = async <T extends keyof EmailTemplates>({
  template,
  props,
  ...baseSendProps
}: {
  template: EmailTemplates[T]['key']
  props: EmailTemplates[T]['props']
} & Pick<SendEmailProps, 'to' | 'subject'>) => {
  const templatePath = path.join(__dirname, 'templates', `${template}.tsx`)

  try {
    // Check if template exists
    await fs.access(templatePath)

    // Dynamic import of template
    const importedTemplate = (await import(`./templates/${template}.tsx`)) as {
      Template: (props: EmailTemplates[T]['props']) => JSX.Element
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!importedTemplate.Template) {
      throw new Error(`Template ${template} does not export a Template component`)
    }

    // Render template with props
    const html = await render(importedTemplate.Template(props))
    const plainText = await render(importedTemplate.Template(props), { plainText: true })

    // Send email
    return send({ ...baseSendProps, bodyHtml: html, bodyPlainText: plainText })
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      throw new Error(`Template ${template} not found at ${templatePath}`)
    }
    throw error
  }
}

export default { transporter, send, template: sendAsTemplate }
