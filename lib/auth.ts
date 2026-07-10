import { betterAuth } from 'better-auth'
import { pool } from '@/lib/db'

// Generate a default secret for development/build time if not provided
// In production, BETTER_AUTH_SECRET must be explicitly set in environment variables
const generateDefaultSecret = () => {
  if (process.env.BETTER_AUTH_SECRET) {
    return process.env.BETTER_AUTH_SECRET
  }
  // For development and build time only - in production this MUST be set
  if (process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview') {
    return 'dev-secret-key-change-in-production-' + Math.random().toString(36).substring(2, 15)
  }
  // Production default - should be overridden
  return 'change-me-in-production-' + Date.now()
}

export const auth = betterAuth({
  database: pool,
  secret: generateDefaultSecret(),
  baseURL:
    process.env.BETTER_AUTH_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.V0_RUNTIME_URL),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  trustedOrigins: [
    ...(process.env.NODE_ENV === 'development'
      ? [
          'http://localhost:3000',
          `http://localhost:${process.env.PORT ?? '3000'}`,
          // v0 preview iframe / proxied preview domains
          'https://*.vusercontent.net',
          'https://*.v0.app',
          'https://*.v0.dev',
        ]
      : []),
    ...(process.env.V0_RUNTIME_URL ? [process.env.V0_RUNTIME_URL] : []),
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
      : []),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  ...(process.env.NODE_ENV === 'development'
    ? {
        advanced: {
          // In dev (v0 preview iframe), force cross-site cookies so the
          // session cookie is stored by the browser.
          defaultCookieAttributes: {
            sameSite: 'none' as const,
            secure: true,
          },
        },
      }
    : {}),
})
