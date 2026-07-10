import type React from "react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { AppNavbar } from "@/components/app-navbar"
import { MedicalDisclaimer } from "@/components/medical-disclaimer"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/sign-in")

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar userName={session.user.name} />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <footer className="mx-auto max-w-6xl border-t px-4 py-6">
        <MedicalDisclaimer compact />
      </footer>
    </div>
  )
}
