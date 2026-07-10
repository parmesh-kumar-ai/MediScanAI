"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DISEASES } from "@/lib/medical/diseases"
import { AlertCircle, BookOpen, Shield, Zap, Heart } from "lucide-react"

export function DiseaseCatalog() {
  const [selectedDisease, setSelectedDisease] = useState<string>(DISEASES[0].name)
  
  const disease = DISEASES.find((d) => d.name === selectedDisease) || DISEASES[0]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Disease Information Database</CardTitle>
          <CardDescription>
            Browse detailed information about diseases including symptoms, causes, severity, and precautions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <div className="flex-1 space-y-2">
                <label htmlFor="disease-select" className="text-sm font-medium">
                  Select a Disease
                </label>
                <Select value={selectedDisease} onValueChange={setSelectedDisease}>
                  <SelectTrigger id="disease-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {DISEASES.map((d) => (
                      <SelectItem key={d.name} value={d.name}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {disease && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="text-xs sm:text-sm">
              Symptoms
            </TabsTrigger>
            <TabsTrigger value="guidance" className="text-xs sm:text-sm">
              Guidance
            </TabsTrigger>
            <TabsTrigger value="severity" className="text-xs sm:text-sm">
              Severity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{disease.name}</CardTitle>
                    <CardDescription className="mt-1">{disease.category}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold text-sm">Description</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">{disease.description}</p>
                </div>

                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
                  <div className="flex gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">About This Disease</p>
                      <p className="mt-1 text-sm text-blue-800 dark:text-blue-200">
                        This disease profile is based on medical knowledge and should not replace professional medical advice.
                        Always consult a healthcare provider for diagnosis and treatment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="border-muted">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Key Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div>
                        <p className="font-medium">Category</p>
                        <p className="text-muted-foreground">{disease.category}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-muted">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        Related Risk Factors
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div>
                        <p className="font-medium">Notable Symptoms</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {Object.entries(disease.weights)
                            .filter(([, weight]) => weight >= 0.6)
                            .slice(0, 3)
                            .map(([symptom]) => (
                              <Badge key={symptom} variant="secondary" className="text-xs">
                                {symptom.replace(/_/g, " ")}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="symptoms" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Associated Symptoms</CardTitle>
                <CardDescription>Symptoms commonly associated with {disease.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    {Object.entries(disease.weights)
                      .sort(([, a], [, b]) => b - a)
                      .map(([symptom, weight]) => (
                        <div key={symptom} className="flex items-center gap-3">
                          <div className="flex-1">
                            <p className="font-medium text-sm capitalize">
                              {symptom.replace(/_/g, " ")}
                            </p>
                            <div className="mt-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all"
                                style={{ width: `${weight * 100}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-muted-foreground min-w-12 text-right">
                            {Math.round(weight * 100)}%
                          </span>
                        </div>
                      ))}
                  </div>

                  <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950">
                    <p className="text-xs leading-relaxed text-amber-900 dark:text-amber-100">
                      <AlertCircle className="mr-1 inline h-3.5 w-3.5" />
                      These percentages indicate how strongly each symptom correlates with this disease. Not all symptoms need to be present.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guidance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Precautions & Care</CardTitle>
                <CardDescription>Recommended precautions and care guidelines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-3 font-semibold text-sm flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Preventive Measures
                  </h4>
                  <ul className="space-y-2">
                    {disease.precautions.map((precaution, index) => (
                      <li key={index} className="flex gap-3 text-sm">
                        <span className="text-primary font-bold">✓</span>
                        <span>{precaution}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
                  <h4 className="font-semibold text-sm text-red-900 dark:text-red-100 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    When to Seek Medical Help
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-red-800 dark:text-red-200">
                    {disease.whenToSeekHelp}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="severity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Disease Severity & Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Typical Duration</span>
                      <Badge variant="outline">Chronic</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {disease.category === "Infectious" ? "Usually 1-2 weeks" : "Long-term management required"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Severity Level</span>
                      <Badge>Variable</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Severity depends on individual factors and early intervention
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Complication Risk</span>
                      <Badge variant="secondary">Medium to High</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Proper management and medical supervision can help prevent complications
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-900 dark:bg-purple-950">
                  <p className="text-xs leading-relaxed text-purple-900 dark:text-purple-100">
                    <AlertCircle className="mr-1 inline h-3.5 w-3.5" />
                    <strong>Important:</strong> This information is educational. Always consult with qualified healthcare professionals for accurate diagnosis, prognosis, and treatment planning.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
