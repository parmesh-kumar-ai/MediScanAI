import { AlertTriangle } from "lucide-react"

export function MedicalDisclaimer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-muted-foreground leading-relaxed">
        <AlertTriangle className="mr-1 inline-block h-3 w-3 text-amber-500" aria-hidden="true" />
        Educational tool only. Not a substitute for professional medical advice, diagnosis, or treatment.
      </p>
    )
  }

  return (
    <div
      role="note"
      aria-label="Medical disclaimer"
      className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4"
    >
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">Important Medical Disclaimer</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This is an educational AI demonstration tool and should NOT replace professional medical advice. Always
            consult qualified healthcare professionals for diagnosis and treatment. In case of emergency, immediately
            contact emergency services.
          </p>
        </div>
      </div>
    </div>
  )
}
