import { DiseaseCatalog } from "@/components/disease-catalog"
import { Info } from "lucide-react"

export const metadata = {
  title: "Diseases | MediScan AI",
  description: "Browse detailed disease information including causes, symptoms, severity, and care guidelines.",
}

export default function DiseasesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Disease Catalog</h1>
        <p className="mt-2 text-muted-foreground">
          Comprehensive information about diseases, their symptoms, and care guidelines.
        </p>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900 dark:text-blue-100">
            This disease database is for educational purposes only. It provides general information about diseases and should not be used for self-diagnosis.
            Always consult with a healthcare professional for accurate diagnosis and treatment recommendations.
          </p>
        </div>
      </div>

      <DiseaseCatalog />
    </div>
  )
}
