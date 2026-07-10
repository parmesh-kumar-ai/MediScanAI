import type { Metadata } from "next"
import { SymptomChecker } from "@/components/symptoms/symptom-checker"

export const metadata: Metadata = {
  title: "Symptom Analysis | MediScan AI",
  description: "AI-assisted disease probability analysis from clinical symptoms",
}

export default function SymptomsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Symptom Analysis</h1>
        <p className="mt-1 text-muted-foreground leading-relaxed">
          Select your symptoms to get an explainable probability distribution across 34 diseases.
        </p>
      </div>
      <SymptomChecker />
    </div>
  )
}
