"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Cell, XAxis, YAxis, LabelList } from "recharts"
import type { SymptomAnalysisResult } from "@/app/actions/analyze-symptoms"
import { AlertCircle, Award, BookOpen, Sparkles } from "lucide-react"

function MarkdownLite({ text }: { text: string }) {
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {text.split("\n").map((line, i) => {
        const trimmed = line.trim()
        if (!trimmed) return null
        if (trimmed.startsWith("###")) {
          return (
            <h4 key={i} className="pt-2 font-semibold text-foreground">
              {trimmed.replace(/^#+\s*/, "")}
            </h4>
          )
        }
        if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
          return (
            <p key={i} className="pl-4 text-muted-foreground">
              • {trimmed.replace(/^[-*]\s*/, "").replace(/\*\*/g, "")}
            </p>
          )
        }
        return (
          <p key={i} className="text-muted-foreground">
            {trimmed.replace(/\*\*/g, "")}
          </p>
        )
      })}
    </div>
  )
}

export function SymptomResults({ result }: { result: SymptomAnalysisResult }) {
  const chartData = result.predictions.map((p) => ({
    disease: p.disease,
    probability: Math.round(p.probability * 100) / 100,
  }))

  const confidenceLevel = result.confidence >= 50 ? "High" : result.confidence >= 25 ? "Moderate" : "Low"

  return (
    <div className="space-y-6">
      <Card className="border-primary/30">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Award className="h-4 w-4 text-primary" aria-hidden="true" />
            Primary Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-2xl font-bold">{result.topDisease}</p>
              {result.diseaseInfo && (
                <Badge variant="secondary" className="mt-1">
                  {result.diseaseInfo.category}
                </Badge>
              )}
            </div>
            <div className="min-w-40">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Confidence</span>
                <span className="font-semibold">
                  {result.confidence.toFixed(1)}% ({confidenceLevel})
                </span>
              </div>
              <Progress value={Math.min(result.confidence, 100)} className="mt-1.5" />
            </div>
          </div>

          {result.diseaseInfo && (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{result.diseaseInfo.description}</p>
          )}

          <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
            <p className="text-xs leading-relaxed text-muted-foreground">
              <AlertCircle className="mr-1 inline h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
              This is an AI-based preliminary assessment, not a diagnosis. Please consult a healthcare professional.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Complete Probability Distribution</CardTitle>
          <CardDescription>Likelihood across all covered diseases based on your selected symptoms</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{ probability: { label: "Probability %", color: "var(--chart-1)" } }}
            className="h-[520px] w-full"
          >
            <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 80 }}>
              <XAxis type="number" tickFormatter={(v) => `${v}%`} fontSize={11} />
              <YAxis type="category" dataKey="disease" width={130} fontSize={11} interval={0} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="probability" radius={[0, 4, 4, 0]}>
                <LabelList dataKey="probability" position="right" fill="#666" fontSize={11} formatter={(v: number) => `${v}%`} />
                {chartData.map((entry, index) => (
                  <Cell
                    key={entry.disease}
                    fill={index === 0 ? "var(--chart-1)" : index < 5 ? "var(--chart-2)" : "var(--chart-5)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {result.diseaseInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4 text-primary" aria-hidden="true" />
              Precautions & Guidance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-1.5">
              {result.diseaseInfo.precautions.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                  <span className="text-primary" aria-hidden="true">
                    •
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-sm leading-relaxed">
                <span className="font-semibold">When to seek help: </span>
                <span className="text-muted-foreground">{result.diseaseInfo.whenToSeekHelp}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {result.aiDetails && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              AI Clinical Context
            </CardTitle>
            <CardDescription>Generated educational overview — not medical advice</CardDescription>
          </CardHeader>
          <CardContent>
            <MarkdownLite text={result.aiDetails} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
