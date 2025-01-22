export enum Route {
  Index = '/',

  // Meta
  TermsOfService = '/terms-of-service',
  PrivacyPolicy = `/privacy-policy`,

  // Authentication
  AuthSignIn = '/auth/sign-in',
  AuthSignUp = '/auth/sign-up',
  AuthSignOut = '/auth/sign-out',
  AuthVerifyEmail = '/auth/verify-email',
  AuthPasswordForgot = '/auth/password/forgot',
  AuthPasswordReset = '/auth/password/reset',

  // Dashboard
  Dashboard = '/dashboard',
}
