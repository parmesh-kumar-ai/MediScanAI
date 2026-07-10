import Link from "next/link"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MedicalDisclaimer } from "@/components/medical-disclaimer"
import { ThemeToggle } from "@/components/theme-toggle"
import { Activity, Brain, FileText, Salad, ShieldCheck, Stethoscope, ArrowRight, LineChart } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Symptom Analysis",
    description:
      "Select from 41 clinical symptoms and get an explainable probability distribution across 34 diseases, enriched with AI-generated clinical context.",
  },
  {
    icon: FileText,
    title: "Report Analyzer",
    description:
      "Upload lab reports as PDF or images. We extract text with OCR, detect lab values, flag abnormal ranges, and generate a plain-language AI summary.",
  },
  {
    icon: Salad,
    title: "Dietary Plans",
    description:
      "Disease-specific nutrition plans with recommended foods, foods to avoid, daily meal plans, and full macro breakdowns.",
  },
  {
    icon: LineChart,
    title: "Health Dashboard",
    description:
      "Your analyses are saved to your account. Track history, revisit past results, and export reports anytime.",
  },
]

export default async function LandingPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect("/dashboard")

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Stethoscope className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="text-lg font-semibold tracking-tight">MediScan AI</span>
        </div>
        <nav className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" nativeButton={false} render={<Link href="/sign-in" />}>
            Sign in
          </Button>
          <Button nativeButton={false} render={<Link href="/sign-up" />}>
            Get started
          </Button>
        </nav>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 text-center md:pt-24">
          <Badge variant="secondary" className="mb-6 gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Educational AI demonstration
          </Badge>
          <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Advanced AI medical analysis, made understandable
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Analyze symptoms across 34 diseases, decode diagnostic lab reports with OCR and AI, and get
            disease-specific dietary plans — all in one secure workspace.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/sign-up" />}>
              Start analyzing
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/sign-in" />}>
              Sign in
            </Button>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-4 rounded-xl border bg-card p-6">
            <div>
              <p className="text-3xl font-bold text-primary">23</p>
              <p className="mt-1 text-sm text-muted-foreground">Diseases covered</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">31</p>
              <p className="mt-1 text-sm text-muted-foreground">Clinical symptoms</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">20+</p>
              <p className="mt-1 text-sm text-muted-foreground">Lab markers detected</p>
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/40 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-center text-3xl font-bold tracking-tight">Everything in one workspace</h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground leading-relaxed">
              Four integrated modules covering the full journey from symptoms to nutrition.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-16">
          <MedicalDisclaimer />
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4" aria-hidden="true" />
            <span>MediScan AI — v2.0</span>
          </div>
          <span>Educational use only</span>
        </div>
      </footer>
    </div>
  )
}
