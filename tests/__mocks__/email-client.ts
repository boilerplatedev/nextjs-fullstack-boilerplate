/**
 * To use this in a test:
 *
 * import emailMock from 'tests/__mocks__/email/email'
 * vi.mock('@/server/services/email/email', () => emailMock)
 */

import { vi } from 'vitest'

import { type SendEmailProps } from '@/server/services/email/email-client'

const mockSend = vi
  .fn()
  .mockImplementation(async (_props: SendEmailProps & { bodyPlainText?: string; bodyHtml?: string }) =>
    Promise.resolve({
      accepted: ['test@example.com'],
      rejected: [],
      response: '250 Message accepted',
      messageId: '<test-message-id@example.com>',
    }),
  )

const mockSendAsTemplate = vi
  .fn()
  .mockImplementation(async (_templateName: string, _props: Record<string, unknown>) =>
    Promise.resolve('<div>Mocked template HTML</div>'),
  )

const mockTransporter = {
  sendMail: mockSend,
}

const mock = {
  transporter: mockTransporter,
  send: mockSend,
  sendAsTemplate: mockSendAsTemplate,
  __esModule: true,
  // vi.mock.default when exporting with `export default` https://stackoverflow.com/a/76433096
  default: {
    transporter: mockTransporter,
    send: mockSend,
    sendAsTemplate: mockSendAsTemplate,
  },
}

export default mock
