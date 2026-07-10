"use client"

import { useState, useTransition } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { deleteSymptomAnalysis, deleteReportAnalysis } from "@/app/actions/history"
import { symptomLabel } from "@/lib/medical/symptoms"
import { Trash2, Search } from "lucide-react"

interface SymptomRow {
  id: number
  topDisease: string
  confidence: number
  symptoms: string[]
  createdAt: string
}
interface ReportRow {
  id: number
  fileName: string
  fileType: string
  labCount: number
  createdAt: string
}
interface DietRow {
  id: number
  disease: string
  dietType: string
  createdAt: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function HistoryTabs({
  symptoms,
  reports,
  diets,
}: {
  symptoms: SymptomRow[]
  reports: ReportRow[]
  diets: DietRow[]
}) {
  const [query, setQuery] = useState("")
  const [isPending, startTransition] = useTransition()

  const q = query.toLowerCase()
  const filteredSymptoms = symptoms.filter(
    (s) => s.topDisease.toLowerCase().includes(q) || s.symptoms.some((x) => symptomLabel(x).toLowerCase().includes(q)),
  )
  const filteredReports = reports.filter((r) => r.fileName.toLowerCase().includes(q))
  const filteredDiets = diets.filter((d) => d.disease.toLowerCase().includes(q))

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-semibold">Analysis History</h2>
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search history..."
              className="pl-8"
              aria-label="Search analysis history"
            />
          </div>
        </div>

        <Tabs defaultValue="symptoms">
          <TabsList>
            <TabsTrigger value="symptoms">Symptoms ({filteredSymptoms.length})</TabsTrigger>
            <TabsTrigger value="reports">Reports ({filteredReports.length})</TabsTrigger>
            <TabsTrigger value="diets">Diet Plans ({filteredDiets.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="symptoms">
            {filteredSymptoms.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No symptom analyses yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Top Result</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead className="hidden md:table-cell">Symptoms</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-10">
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSymptoms.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.topDisease}</TableCell>
                      <TableCell>
                        <Badge variant={s.confidence >= 50 ? "default" : "secondary"}>
                          {s.confidence.toFixed(1)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden max-w-64 md:table-cell">
                        <span className="line-clamp-1 text-sm text-muted-foreground">
                          {s.symptoms.map(symptomLabel).join(", ")}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{formatDate(s.createdAt)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={isPending}
                          onClick={() => startTransition(() => deleteSymptomAnalysis(s.id))}
                          aria-label={`Delete analysis for ${s.topDisease}`}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>

          <TabsContent value="reports">
            {filteredReports.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No reports analyzed yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Lab Values</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-10">
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="max-w-48 truncate font-medium">{r.fileName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="uppercase">
                          {r.fileType}
                        </Badge>
                      </TableCell>
                      <TableCell>{r.labCount}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{formatDate(r.createdAt)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={isPending}
                          onClick={() => startTransition(() => deleteReportAnalysis(r.id))}
                          aria-label={`Delete report ${r.fileName}`}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>

          <TabsContent value="diets">
            {filteredDiets.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No diet plans viewed yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Condition</TableHead>
                    <TableHead>Preference</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDiets.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell className="font-medium">{d.disease}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">
                          {d.dietType === "veg" ? "Vegetarian" : "All foods"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{formatDate(d.createdAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
