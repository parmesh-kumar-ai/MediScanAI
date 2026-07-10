import { betterAuth } from 'better-auth'
import { pool } from '@/lib/db'

// Secret configuration for different environments
// Production: Must be set via BETTER_AUTH_SECRET environment variable
// Preview/Build: Use a consistent secret to allow builds without warnings
// Development: Use a consistent development secret
const getAuthSecret = () => {
  if (process.env.BETTER_AUTH_SECRET) {
    return process.env.BETTER_AUTH_SECRET
  }
  
  // For Vercel preview environments and builds
  if (process.env.VERCEL_ENV === 'preview' || process.env.VERCEL === '1') {
    return 'preview-build-secret-mediscan-ai-do-not-use-in-production-2024'
  }
  
  // For development
  if (process.env.NODE_ENV === 'development') {
    return 'dev-secret-mediscan-ai-change-in-production-2024'
  }
  
  // Fallback - should never reach here in production
  return 'fallback-secret-mediscan-ai-2024'
}

export const auth = betterAuth({
  database: pool,
  secret: getAuthSecret(),
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
