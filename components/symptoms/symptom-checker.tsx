"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { SYMPTOMS, SYMPTOM_CATEGORIES } from "@/lib/medical/symptoms"
import { analyzeSymptoms, type SymptomAnalysisResult } from "@/app/actions/analyze-symptoms"
import { SymptomResults } from "./symptom-results"
import { Loader2, Stethoscope, RotateCcw } from "lucide-react"

export function SymptomChecker() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<SymptomAnalysisResult | null>(null)

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleAnalyze = async () => {
    setError(null)
    setLoading(true)
    try {
      const res = await analyzeSymptoms(Array.from(selected))
      setResult(res)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setSelected(new Set())
    setResult(null)
    setError(null)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <Card className="h-fit lg:sticky lg:top-20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            Select your symptoms
            <Badge variant="secondary">{selected.size} selected</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {SYMPTOM_CATEGORIES.map((category) => (
            <fieldset key={category}>
              <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {category}
              </legend>
              <div className="space-y-1.5">
                {SYMPTOMS.filter((s) => s.category === category).map((s) => (
                  <div key={s.id} className="flex items-center gap-2">
                    <Checkbox id={s.id} checked={selected.has(s.id)} onCheckedChange={() => toggle(s.id)} />
                    <Label htmlFor={s.id} className="cursor-pointer text-sm font-normal">
                      {s.label}
                    </Label>
                  </div>
                ))}
              </div>
            </fieldset>
          ))}

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <div className="flex gap-2">
            <Button className="flex-1" onClick={handleAnalyze} disabled={loading || selected.size === 0}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Stethoscope className="mr-2 h-4 w-4" aria-hidden="true" />
                  Diagnose
                </>
              )}
            </Button>
            {(result || selected.size > 0) && (
              <Button variant="outline" size="icon" onClick={reset} aria-label="Reset">
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div>
        {result ? (
          <SymptomResults result={result} />
        ) : (
          <Card className="flex min-h-64 items-center justify-center">
            <CardContent className="py-12 text-center">
              <Stethoscope className="mx-auto h-10 w-10 text-muted-foreground/50" aria-hidden="true" />
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Select symptoms from the panel and click Diagnose to see a probability analysis across all 34 covered
                diseases.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
