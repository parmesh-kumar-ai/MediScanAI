import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MedicalDisclaimer } from "@/components/medical-disclaimer"
import { DISEASES } from "@/lib/medical/diseases"
import { SYMPTOMS } from "@/lib/medical/symptoms"
import { Cpu, ListChecks, Stethoscope } from "lucide-react"

export const metadata: Metadata = {
  title: "About | MediScan AI",
  description: "About the MediScan AI medical analysis system",
}

const FEATURES = [
  `Comprehensive coverage: ${DISEASES.length} diseases including chronic, cardiovascular, oncological, urological, dermatological, and infectious conditions`,
  `${SYMPTOMS.length} clinical symptoms across 6 categories for accurate screening`,
  "Explainable probability scoring — every prediction shows which symptoms contributed",
  "AI-generated clinical context via large language models",
  "PDF text extraction plus vision-model OCR for scanned reports and photos",
  "20+ lab markers detected and compared against standard reference ranges",
  "Disease-specific dietary plans with complete macro and calorie tracking",
  "Private, per-user history stored securely with authentication",
]

const STACK = [
  ["Next.js 16", "React framework with App Router and Server Actions"],
  ["Neon Postgres", "Serverless database for user data and analysis history"],
  ["Better Auth", "Secure email and password authentication with session management"],
  ["Drizzle ORM", "Type-safe database queries"],
  ["AI SDK + Vercel AI Gateway", "LLM-powered report interpretation, OCR, and clinical summaries"],
  ["unpdf", "Serverless PDF text extraction"],
  ["Recharts + shadcn/ui", "Data visualization and accessible UI components"],
  ["Tailwind CSS v4", "Design system with semantic tokens and dark mode"],
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">About This System</h1>
        <p className="mt-1 text-muted-foreground leading-relaxed">
          MediScan AI is an educational demonstration of AI/ML applications in healthcare — showing how machine
          intelligence can assist preliminary health assessments and evidence-based dietary guidance.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ListChecks className="h-4 w-4 text-primary" aria-hidden="true" />
            System Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                <span className="text-primary" aria-hidden="true">
                  •
                </span>
                {f}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Stethoscope className="h-4 w-4 text-primary" aria-hidden="true" />
            Diseases Covered
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3">
            {DISEASES.map((d) => (
              <li key={d.name} className="text-sm text-muted-foreground">
                {d.name}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Cpu className="h-4 w-4 text-primary" aria-hidden="true" />
            Technology Stack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2.5">
            {STACK.map(([name, desc]) => (
              <div key={name} className="text-sm leading-relaxed">
                <dt className="inline font-semibold">{name}: </dt>
                <dd className="inline text-muted-foreground">{desc}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      <MedicalDisclaimer />

      <p className="text-center text-xs text-muted-foreground">Version 2.0 | Built as an educational demonstration</p>
    </div>
  )
}
