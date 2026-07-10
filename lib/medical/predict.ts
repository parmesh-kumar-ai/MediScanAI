import { DISEASES } from "./diseases"

export interface PredictionResult {
  disease: string
  probability: number
  matchedSymptoms: string[]
}

/**
 * Deterministic, explainable disease scoring.
 * For each disease: score = sum(weights of matched symptoms) with a coverage
 * penalty for diseases whose profile is mostly unmatched. Scores are then
 * normalized into a probability distribution across all 23 diseases.
 */
export function predictDiseases(symptomIds: string[]): PredictionResult[] {
  const selected = new Set(symptomIds)

  const raw = DISEASES.map((disease) => {
    const entries = Object.entries(disease.weights)
    const totalWeight = entries.reduce((sum, [, w]) => sum + w, 0)

    let matchedWeight = 0
    const matchedSymptoms: string[] = []
    for (const [symptom, weight] of entries) {
      if (selected.has(symptom)) {
        matchedWeight += weight
        matchedSymptoms.push(symptom)
      }
    }

    // Coverage: how much of the disease profile is present
    const coverage = totalWeight > 0 ? matchedWeight / totalWeight : 0
    // Specificity: how many of the user's symptoms this disease explains
    const specificity =
      selected.size > 0 ? matchedSymptoms.length / selected.size : 0

    // Blend both signals; add small epsilon so all diseases get non-zero mass
    const score = matchedWeight * (0.6 + 0.25 * coverage + 0.15 * specificity)

    return { disease: disease.name, score: score + 0.001, matchedSymptoms }
  })

  const total = raw.reduce((sum, r) => sum + r.score, 0)

  return raw
    .map((r) => ({
      disease: r.disease,
      probability: total > 0 ? (r.score / total) * 100 : 0,
      matchedSymptoms: r.matchedSymptoms,
    }))
    .sort((a, b) => b.probability - a.probability)
}
