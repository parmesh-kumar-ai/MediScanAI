"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { reportAnalysis } from "@/lib/db/schema"
import { headers } from "next/headers"
import { generateText } from "ai"
import { extractText as extractPdfText } from "unpdf"
import {
  extractLabValues,
  detectConditions,
  type LabValue,
} from "@/lib/medical/lab-values"

const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25 MB

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("Unauthorized")
  return session.user.id
}

export interface ReportAnalysisResult {
  id: number
  fileName: string
  extractedText: string
  labValues: LabValue[]
  conditions: string[]
  aiSummary: string | null
}

export async function analyzeReport(
  formData: FormData,
): Promise<ReportAnalysisResult> {
  const userId = await getUserId()

  const file = formData.get("file") as File | null
  if (!file) throw new Error("No file provided")
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File exceeds the 25 MB size limit")
  }

  const isPdf = file.type === "application/pdf"
  const isImage = file.type.startsWith("image/")
  if (!isPdf && !isImage) {
    throw new Error("Only PDF and image files are supported")
  }

  const buffer = new Uint8Array(await file.arrayBuffer())
  let extractedText = ""

  if (isPdf) {
    try {
      const result = await extractPdfText(buffer, { mergePages: true })
      extractedText = typeof result.text === "string" ? result.text : ""
    } catch {
      throw new Error("Could not read the PDF. The file may be corrupted.")
    }
  } else {
    // Image: use vision model OCR
    try {
      const { text } = await generateText({
        model: "google/gemini-3.5-flash",
        instructions:
          "You are an OCR engine for medical documents. Extract ALL text from the image verbatim, preserving lab test names, values, units, and reference ranges. Output only the extracted text, nothing else.",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract all text from this medical report image.",
              },
              {
                type: "file",
                data: buffer,
                mediaType: file.type,
              },
            ],
          },
        ],
      })
      extractedText = text
    } catch {
      throw new Error(
        "Could not extract text from the image. Please try a clearer photo or a PDF.",
      )
    }
  }

  if (!extractedText || extractedText.trim().length < 20) {
    throw new Error(
      "No readable text found in the document. If this is a scanned PDF, try uploading it as an image instead.",
    )
  }

  // Cap stored text
  const truncated = extractedText.slice(0, 15000)

  const labValues = extractLabValues(truncated)
  const conditions = detectConditions(truncated)

  // AI clinical summary
  let aiSummary: string | null = null
  try {
    const labSummary =
      labValues.length > 0
        ? labValues
            .map(
              (l) =>
                `${l.name}: ${l.value} ${l.unit} (normal: ${l.normalRange}, status: ${l.status})`,
            )
            .join("\n")
        : "No standard lab values were automatically extracted."

    const { text } = await generateText({
      model: "google/gemini-3.5-flash",
      instructions:
        "You are a medical report interpreter for an educational health app. Explain lab reports in plain, reassuring language a patient can understand. You are NOT diagnosing. Be concise. Use markdown headings (###) and bullets.",
      prompt: `Analyze this medical report excerpt and the extracted lab values.

EXTRACTED LAB VALUES:
${labSummary}

REPORT TEXT (excerpt):
${truncated.slice(0, 6000)}

Provide:
### Summary
2-3 sentence plain-language overview of what this report covers.
### Key Findings
Bullet each abnormal or noteworthy value with what it commonly means. If everything is normal, say so clearly.
### Suggested Follow-Up
Which specialist or follow-up tests may be worth discussing with a doctor.

Keep it under 300 words. Never prescribe medication.`,
    })
    aiSummary = text
  } catch {
    aiSummary = null
  }

  const [saved] = await db
    .insert(reportAnalysis)
    .values({
      userId,
      fileName: file.name,
      fileType: isPdf ? "pdf" : "image",
      extractedText: truncated,
      labValues,
      conditions,
      aiSummary,
    })
    .returning({ id: reportAnalysis.id })

  return {
    id: saved.id,
    fileName: file.name,
    extractedText: truncated,
    labValues,
    conditions,
    aiSummary,
  }
}
