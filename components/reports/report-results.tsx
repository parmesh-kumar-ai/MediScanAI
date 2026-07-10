"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ReportAnalysisResult } from "@/app/actions/analyze-report"
import { Activity, Download, FileText, FlaskConical, Sparkles } from "lucide-react"

function statusVariant(status: string): "default" | "secondary" | "destructive" {
  if (status === "normal") return "secondary"
  return "destructive"
}

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

export function ReportResults({ result }: { result: ReportAnalysisResult }) {
  const abnormalCount = result.labValues.filter((l) => l.status !== "normal").length

  const downloadSummary = () => {
    const lines = [
      `MediScan AI — Report Analysis`,
      `File: ${result.fileName}`,
      `Date: ${new Date().toLocaleString()}`,
      ``,
      `DETECTED LAB VALUES (${result.labValues.length}):`,
      ...result.labValues.map((l) => `- ${l.name}: ${l.value} ${l.unit} [${l.status.toUpperCase()}] (normal: ${l.normalRange})`),
      ``,
      `CONDITIONS MENTIONED: ${result.conditions.length > 0 ? result.conditions.join(", ") : "None detected"}`,
      ``,
      `AI SUMMARY:`,
      result.aiSummary ?? "Not available",
      ``,
      `DISCLAIMER: Educational tool only. Not medical advice.`,
    ]
    const blob = new Blob([lines.join("\n")], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `mediscan-report-analysis.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card className="border-primary/30">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
                Analysis Summary
              </CardTitle>
              <CardDescription className="mt-1">File analyzed: {result.fileName}</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={downloadSummary}>
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-2xl font-bold text-primary">{result.labValues.length}</p>
              <p className="mt-1 text-xs text-muted-foreground">Lab values extracted</p>
            </div>
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className={`text-2xl font-bold ${abnormalCount > 0 ? "text-destructive" : "text-primary"}`}>
                {abnormalCount}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Abnormal values</p>
            </div>
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-2xl font-bold text-primary">{result.conditions.length}</p>
              <p className="mt-1 text-xs text-muted-foreground">Conditions mentioned</p>
            </div>
          </div>
          {result.conditions.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Detected keywords:</span>
              {result.conditions.map((c) => (
                <Badge key={c} variant="outline">
                  {c}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {result.labValues.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FlaskConical className="h-4 w-4 text-primary" aria-hidden="true" />
              Detected Lab Values
            </CardTitle>
            <CardDescription>Values compared against standard adult reference ranges</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Normal Range</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.labValues.map((l) => (
                  <TableRow key={l.name}>
                    <TableCell className="font-medium">{l.name}</TableCell>
                    <TableCell>
                      {l.value} {l.unit}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{l.normalRange}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(l.status)} className="capitalize">
                        {l.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {result.aiSummary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              AI Health Assessment
            </CardTitle>
            <CardDescription>Plain-language interpretation — not medical advice</CardDescription>
          </CardHeader>
          <CardContent>
            <MarkdownLite text={result.aiSummary} />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Activity className="h-4 w-4 text-primary" aria-hidden="true" />
            Extracted Report Text
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-64 overflow-y-auto rounded-lg border bg-muted/50 p-4">
            <p className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-muted-foreground">
              {result.extractedText.slice(0, 4000)}
              {result.extractedText.length > 4000 && "\n\n... (text truncated for display)"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
