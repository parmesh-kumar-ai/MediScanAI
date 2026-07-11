import { ResetPasswordForm } from '@/components/reset-password-form'
import { Suspense } from 'react'

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex min-h-svh items-center justify-center">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
