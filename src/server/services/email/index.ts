import emailClient from './email-client'
import emailTemplates from './templates'

const email = {
  ...emailClient,
  ...emailTemplates,
}

export default email
