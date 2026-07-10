"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import {
  symptomAnalysis,
  reportAnalysis,
  dietPlanView,
} from "@/lib/db/schema"
import { and, desc, eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("Unauthorized")
  return session.user.id
}

export async function getSymptomHistory() {
  const userId = await getUserId()
  return db
    .select()
    .from(symptomAnalysis)
    .where(eq(symptomAnalysis.userId, userId))
    .orderBy(desc(symptomAnalysis.createdAt))
    .limit(50)
}

export async function getReportHistory() {
  const userId = await getUserId()
  return db
    .select({
      id: reportAnalysis.id,
      fileName: reportAnalysis.fileName,
      fileType: reportAnalysis.fileType,
      labValues: reportAnalysis.labValues,
      conditions: reportAnalysis.conditions,
      aiSummary: reportAnalysis.aiSummary,
      createdAt: reportAnalysis.createdAt,
    })
    .from(reportAnalysis)
    .where(eq(reportAnalysis.userId, userId))
    .orderBy(desc(reportAnalysis.createdAt))
    .limit(50)
}

export async function getDietHistory() {
  const userId = await getUserId()
  return db
    .select()
    .from(dietPlanView)
    .where(eq(dietPlanView.userId, userId))
    .orderBy(desc(dietPlanView.createdAt))
    .limit(50)
}

export async function logDietPlanView(disease: string, dietType: string) {
  const userId = await getUserId()
  await db.insert(dietPlanView).values({ userId, disease, dietType })
}

export async function deleteSymptomAnalysis(id: number) {
  const userId = await getUserId()
  await db
    .delete(symptomAnalysis)
    .where(and(eq(symptomAnalysis.id, id), eq(symptomAnalysis.userId, userId)))
  revalidatePath("/dashboard")
}

export async function deleteReportAnalysis(id: number) {
  const userId = await getUserId()
  await db
    .delete(reportAnalysis)
    .where(and(eq(reportAnalysis.id, id), eq(reportAnalysis.userId, userId)))
  revalidatePath("/dashboard")
}
