import type { Metadata } from "next"
import { DietPlanner } from "@/components/diet/diet-planner"

export const metadata: Metadata = {
  title: "Dietary Plans | MediScan AI",
  description: "Disease-specific dietary recommendations with full nutritional breakdowns",
}

export default function DietPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dietary Plans</h1>
        <p className="mt-1 text-muted-foreground leading-relaxed">
          Evidence-based nutrition plans for 34 conditions, with recommended foods, foods to avoid, sample meal plans,
          and macro breakdowns.
        </p>
      </div>
      <DietPlanner />
    </div>
  )
}
