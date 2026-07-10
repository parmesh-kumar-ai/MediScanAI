"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { analyzeReport, type ReportAnalysisResult } from "@/app/actions/analyze-report"
import { ReportResults } from "./report-results"
import { FileText, Loader2, Upload, X } from "lucide-react"

const ACCEPTED = "application/pdf,image/png,image/jpeg,image/webp"

export function ReportAnalyzer() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ReportAnalysisResult | null>(null)

  const acceptFile = (f: File | undefined) => {
    if (!f) return
    if (f.size > 25 * 1024 * 1024) {
      setError("File exceeds the 25 MB size limit")
      return
    }
    setError(null)
    setFile(f)
    setResult(null)
  }

  const handleAnalyze = async () => {
    if (!file) return
    setError(null)
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await analyzeReport(formData)
      setResult(res)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Upload your diagnostic report</CardTitle>
          <CardDescription>
            Lab reports, test results, or medical documents in PDF or image format, up to 25 MB. Files are processed
            for analysis and the extracted text is saved to your history.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload diagnostic report file"
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") inputRef.current?.click()
            }}
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
              acceptFile(e.dataTransfer.files?.[0])
            }}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 text-center transition-colors ${
              dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
          >
            <Upload className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
            <p className="mt-3 text-sm font-medium">Drop your file here or click to browse</p>
            <p className="mt-1 text-xs text-muted-foreground">PDF, PNG, JPG, or WebP — max 25 MB</p>
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED}
              className="sr-only"
              onChange={(e) => acceptFile(e.target.files?.[0])}
            />
          </div>

          {file && (
            <div className="flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setFile(null)
                  setResult(null)
                }}
                aria-label="Remove file"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          )}

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <Button onClick={handleAnalyze} disabled={!file || loading} className="w-full sm:w-auto">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                Analyzing report...
              </>
            ) : (
              "Analyze Report"
            )}
          </Button>
        </CardContent>
      </Card>

      {result && <ReportResults result={result} />}
    </div>
  )
}
