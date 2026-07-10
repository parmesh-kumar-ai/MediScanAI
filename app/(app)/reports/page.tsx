import type { Metadata } from "next"
import { ReportAnalyzer } from "@/components/reports/report-analyzer"

export const metadata: Metadata = {
  title: "Report Analyzer | MediScan AI",
  description: "Upload diagnostic reports for AI-assisted lab value extraction and interpretation",
}

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Diagnostic Report Analyzer</h1>
        <p className="mt-1 text-muted-foreground leading-relaxed">
          Upload lab reports as PDF or images. We extract the text, detect lab values against reference ranges, and
          generate a plain-language AI summary.
        </p>
      </div>
      <ReportAnalyzer />
    </div>
  )
}
