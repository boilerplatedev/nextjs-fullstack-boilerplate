import React from 'react'

import { Body, Button, Container, Head, Hr, Html, Link, Preview, Section, Text } from 'jsx-email'

export interface VerificationEmailProps {
  appName: string
  url: string
  name: string
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  marginBottom: '64px',
  padding: '20px 0 48px',
  borderRadius: '8px',
}

const box = {
  padding: '0 48px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
}

const anchor = {
  color: '#777',
}

const button = {
  fontWeight: 'bold',
  padding: '10px 20px',
  textDecoration: 'none',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
}

export const previewProps: VerificationEmailProps = {
  appName: 'App',
  url: 'https://example.com/verify?token=123',
  name: 'John Doe',
}

export const templateName = 'verification-email'

export const Template = ({ url, appName, name }: VerificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Verify your email address to get started</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Text style={paragraph}>Hi {name.length ? name : 'there'},</Text>
          <Text style={paragraph}>
            Welcome to {appName}! Please verify your email address by clicking the button below:
          </Text>
          <Button
            align="center"
            backgroundColor="#4f46e5"
            borderRadius={5}
            fontSize={16}
            height={30}
            href={url}
            style={button}
            textColor="#fff"
            width={300}
          >
            Verify Email Address
          </Button>
          <Hr style={hr} />
          <Text style={{ ...paragraph, ...footer }}>
            If you didn&apos;t create an account with {appName}, you can safely ignore this email.
          </Text>
          <Text style={{ ...paragraph, ...footer }}>
            Or copy and paste this URL into your browser:{' '}
            <Link style={anchor} href={url}>
              {url}
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)
