'use client'

import { useState } from 'react'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await authClient.forgetPassword({
      email,
      redirectTo: '/reset-password',
    })

    setLoading(false)

    if (error) {
      setError(error.message ?? 'Something went wrong')
      return
    }

    setSuccess(true)
  }

  return (
    <main className="min-h-svh bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-sm p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Forgot Password
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enter your email to receive a password reset link
          </p>
        </div>

        {success ? (
          <div className="flex flex-col gap-4">
            <div className="rounded-lg bg-green-50 p-4 border border-green-200 dark:bg-green-950 dark:border-green-900 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div className="text-sm text-green-900 dark:text-green-100">
                <p className="font-medium mb-1">Check your email</p>
                <p>
                  We have sent a password reset link to <strong>{email}</strong>. 
                  (Note: in development, check your server console for the link).
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full mt-2">
              <Link href="/sign-in">Return to Sign In</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="m@example.com"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 flex gap-2 text-red-900 border border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-900">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Sending link...' : 'Send reset link'}
            </Button>
            
            <p className="text-sm text-center mt-4">
              <Link
                href="/sign-in"
                className="text-muted-foreground font-medium underline-offset-4 hover:underline"
              >
                Back to sign in
              </Link>
            </p>
          </form>
        )}
      </Card>
    </main>
  )
}
