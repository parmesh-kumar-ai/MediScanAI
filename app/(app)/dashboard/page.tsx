import type { Metadata } from "next"
import Link from "next/link"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { getSymptomHistory, getReportHistory, getDietHistory } from "@/app/actions/history"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HistoryTabs } from "@/components/dashboard/history-tabs"
import { Brain, FileSearch, Salad, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard | MediScan AI",
  description: "Your health analysis history and quick actions",
}

const QUICK_ACTIONS = [
  {
    href: "/symptoms",
    icon: Brain,
    title: "Symptom Analysis",
    description: "Get a disease probability assessment",
  },
  {
    href: "/reports",
    icon: FileSearch,
    title: "Report Analyzer",
    description: "Upload and decode a lab report",
  },
  {
    href: "/diet",
    icon: Salad,
    title: "Dietary Plans",
    description: "Condition-specific nutrition plans",
  },
]

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  const [symptoms, reports, diets] = await Promise.all([getSymptomHistory(), getReportHistory(), getDietHistory()])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {session?.user?.name?.split(" ")[0]}</h1>
        <p className="mt-1 text-muted-foreground leading-relaxed">
          Your health analysis workspace. All results are saved to your private history.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {QUICK_ACTIONS.map((a) => (
          <Card key={a.href} className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <a.icon className="h-4.5 w-4.5" aria-hidden="true" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold">{a.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{a.description}</p>
              <Button variant="link" className="mt-2 h-auto p-0" nativeButton={false} render={<Link href={a.href} />}>
                Open
                <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-1">
            <CardDescription>Symptom analyses</CardDescription>
            <CardTitle className="text-3xl">{symptoms.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardDescription>Reports analyzed</CardDescription>
            <CardTitle className="text-3xl">{reports.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardDescription>Diet plans viewed</CardDescription>
            <CardTitle className="text-3xl">{diets.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <HistoryTabs
        symptoms={symptoms.map((s) => ({
          id: s.id,
          topDisease: s.topDisease,
          confidence: s.confidence,
          symptoms: (s.symptoms as string[]) ?? [],
          createdAt: s.createdAt.toISOString(),
        }))}
        reports={reports.map((r) => ({
          id: r.id,
          fileName: r.fileName,
          fileType: r.fileType,
          labCount: Array.isArray(r.labValues) ? r.labValues.length : 0,
          createdAt: r.createdAt.toISOString(),
        }))}
        diets={diets.map((d) => ({
          id: d.id,
          disease: d.disease,
          dietType: d.dietType,
          createdAt: d.createdAt.toISOString(),
        }))}
      />
    </div>
  )
}
