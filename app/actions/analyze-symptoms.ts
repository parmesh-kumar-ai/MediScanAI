"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { symptomAnalysis } from "@/lib/db/schema"
import { headers } from "next/headers"
import { generateText } from "ai"
import { predictDiseases, type PredictionResult } from "@/lib/medical/predict"
import { getDisease } from "@/lib/medical/diseases"
import { symptomLabel } from "@/lib/medical/symptoms"

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("Unauthorized")
  return session.user.id
}

export interface SymptomAnalysisResult {
  id: number
  predictions: PredictionResult[]
  topDisease: string
  confidence: number
  diseaseInfo: {
    description: string
    category: string
    precautions: string[]
    whenToSeekHelp: string
  } | null
  aiDetails: string | null
}

export async function analyzeSymptoms(
  symptomIds: string[],
): Promise<SymptomAnalysisResult> {
  const userId = await getUserId()

  if (symptomIds.length === 0) {
    throw new Error("Please select at least one symptom")
  }

  const predictions = predictDiseases(symptomIds)
  const top = predictions[0]
  const profile = getDisease(top.disease)

  // AI-generated clinical context (graceful fallback if unavailable)
  let aiDetails: string | null = null
  try {
    const symptomNames = symptomIds.map(symptomLabel).join(", ")
    const topThree = predictions
      .slice(0, 3)
      .map((p) => `${p.disease} (${p.probability.toFixed(1)}%)`)
      .join(", ")

    const { text } = await generateText({
      model: "google/gemini-3.5-flash",
      instructions:
        "You are a medical information assistant for an educational health app. You provide clear, evidence-based general health information. You are NOT providing a diagnosis. Always be concise. Use plain language. Format with markdown headings (###) and bullet points.",
      prompt: `A user selected these symptoms: ${symptomNames}.

A screening algorithm ranked these probable conditions: ${topThree}.

Provide a brief educational overview covering:
### Overview
2-3 sentences on why these symptoms may point to ${top.disease}.
### Differential Considerations
2-3 other conditions that share these symptoms and how they differ.
### Recommended Next Steps
Which type of doctor to consult and which common tests may be relevant.
### Self-Care While Waiting
2-3 safe general tips.

Keep the entire response under 300 words. Do not prescribe medication.`,
    })
    aiDetails = text
  } catch {
    aiDetails = null
  }

  const [saved] = await db
    .insert(symptomAnalysis)
    .values({
      userId,
      symptoms: symptomIds,
      topDisease: top.disease,
      confidence: top.probability,
      results: predictions.map((p) => ({
        disease: p.disease,
        probability: Math.round(p.probability * 100) / 100,
      })),
      aiDetails,
    })
    .returning({ id: symptomAnalysis.id })

  return {
    id: saved.id,
    predictions,
    topDisease: top.disease,
    confidence: top.probability,
    diseaseInfo: profile
      ? {
          description: profile.description,
          category: profile.category,
          precautions: profile.precautions,
          whenToSeekHelp: profile.whenToSeekHelp,
        }
      : null,
    aiDetails,
  }
}
