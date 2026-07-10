"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, Cell } from "recharts"
import { DIET_DISEASES, getDietPlan, type DietPlan, type DietType } from "@/lib/medical/diet-plans"
import { logDietPlanView } from "@/app/actions/history"
import { Salad, Ban, UtensilsCrossed, PieChart } from "lucide-react"

export function DietPlanner() {
  const [disease, setDisease] = useState<string>("")
  const [dietType, setDietType] = useState<DietType>("non-veg")
  const [plan, setPlan] = useState<DietPlan | null>(null)

  const handleGenerate = () => {
    if (!disease) return
    const p = getDietPlan(disease, dietType)
    setPlan(p)
    // Fire-and-forget history logging
    logDietPlanView(disease, dietType).catch(() => {})
  }

  const macroData = plan
    ? [
        { nutrient: "Protein", grams: plan.totals.protein },
        { nutrient: "Carbs", grams: plan.totals.carbs },
        { nutrient: "Fat", grams: plan.totals.fat },
        { nutrient: "Fiber", grams: plan.totals.fiber },
      ]
    : []

  const MACRO_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Generate a dietary plan</CardTitle>
          <CardDescription>Choose a condition and dietary preference to get a tailored nutrition plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="disease-select">Condition</Label>
              <Select value={disease} onValueChange={(v) => setDisease(v ?? "")}>
                <SelectTrigger id="disease-select">
                  <SelectValue placeholder="Choose a condition" />
                </SelectTrigger>
                <SelectContent>
                  {DIET_DISEASES.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full space-y-2 sm:w-44">
              <Label htmlFor="diet-type-select">Preference</Label>
              <Select value={dietType} onValueChange={(v) => setDietType((v ?? "non-veg") as DietType)}>
                <SelectTrigger id="diet-type-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="non-veg">All foods</SelectItem>
                  <SelectItem value="veg">Vegetarian only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleGenerate} disabled={!disease}>
              <Salad className="mr-2 h-4 w-4" aria-hidden="true" />
              Get Dietary Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {plan && (
        <>
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="text-base">
                Dietary Plan for {plan.disease}
                <Badge variant="secondary" className="ml-2 capitalize">
                  {plan.dietType === "veg" ? "Vegetarian" : "All foods"}
                </Badge>
              </CardTitle>
              <CardDescription>{plan.notes}</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Salad className="h-4 w-4 text-primary" aria-hidden="true" />
                Recommended Foods with Nutritional Values
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Food</TableHead>
                      <TableHead>Serving</TableHead>
                      <TableHead className="text-right">Calories</TableHead>
                      <TableHead className="text-right">Protein (g)</TableHead>
                      <TableHead className="text-right">Carbs (g)</TableHead>
                      <TableHead className="text-right">Fat (g)</TableHead>
                      <TableHead className="text-right">Fiber (g)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plan.recommendedFoods.map((f) => (
                      <TableRow key={f.food}>
                        <TableCell className="font-medium">{f.food}</TableCell>
                        <TableCell className="text-muted-foreground">{f.serving}</TableCell>
                        <TableCell className="text-right">{f.calories}</TableCell>
                        <TableCell className="text-right">{f.protein}</TableCell>
                        <TableCell className="text-right">{f.carbs}</TableCell>
                        <TableCell className="text-right">{f.fat}</TableCell>
                        <TableCell className="text-right">{f.fiber}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Ban className="h-4 w-4 text-destructive" aria-hidden="true" />
                Foods to Avoid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2 sm:grid-cols-2">
                {plan.avoidFoods.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-destructive" aria-hidden="true">
                      •
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <UtensilsCrossed className="h-4 w-4 text-primary" aria-hidden="true" />
                Sample Daily Meal Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Meal</TableHead>
                      <TableHead>Food</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Calories</TableHead>
                      <TableHead className="text-right">Protein (g)</TableHead>
                      <TableHead className="text-right">Carbs (g)</TableHead>
                      <TableHead className="text-right">Fat (g)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plan.meals.map((m) => (
                      <TableRow key={m.meal}>
                        <TableCell className="font-medium">{m.meal}</TableCell>
                        <TableCell>{m.food}</TableCell>
                        <TableCell className="text-muted-foreground">{m.quantity}</TableCell>
                        <TableCell className="text-right">{m.calories}</TableCell>
                        <TableCell className="text-right">{m.protein}</TableCell>
                        <TableCell className="text-right">{m.carbs}</TableCell>
                        <TableCell className="text-right">{m.fat}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <PieChart className="h-4 w-4 text-primary" aria-hidden="true" />
                  Nutrition Summary
                </CardTitle>
                <CardDescription>Daily totals from the sample meal plan</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-3">
                  {[
                    ["Total Calories", `${plan.totals.calories} kcal`],
                    ["Total Protein", `${plan.totals.protein} g`],
                    ["Total Carbs", `${plan.totals.carbs} g`],
                    ["Total Fat", `${plan.totals.fat} g`],
                    ["Total Fiber", `${plan.totals.fiber} g`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <dt className="text-sm text-muted-foreground">{label}</dt>
                      <dd className="text-sm font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Daily Macronutrients</CardTitle>
                <CardDescription>{plan.totals.calories} kcal total</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{ grams: { label: "Grams", color: "var(--chart-1)" } }}
                  className="h-56 w-full"
                >
                  <BarChart data={macroData}>
                    <XAxis dataKey="nutrient" fontSize={12} />
                    <YAxis fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="grams" radius={[4, 4, 0, 0]}>
                      {macroData.map((entry, index) => (
                        <Cell key={entry.nutrient} fill={MACRO_COLORS[index]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
