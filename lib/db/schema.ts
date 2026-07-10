import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  real,
  jsonb,
} from "drizzle-orm/pg-core"

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

// --- App tables ------------------------------------------------------------

export const symptomAnalysis = pgTable("symptom_analysis", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  symptoms: jsonb("symptoms").$type<string[]>().notNull(),
  topDisease: text("topDisease").notNull(),
  confidence: real("confidence").notNull(),
  results: jsonb("results")
    .$type<{ disease: string; probability: number }[]>()
    .notNull(),
  aiDetails: text("aiDetails"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export const reportAnalysis = pgTable("report_analysis", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  fileName: text("fileName").notNull(),
  fileType: text("fileType").notNull(),
  extractedText: text("extractedText"),
  labValues: jsonb("labValues").$type<
    {
      name: string
      value: number
      unit: string
      normalRange: string
      status: "normal" | "low" | "high"
    }[]
  >(),
  conditions: jsonb("conditions").$type<string[]>(),
  aiSummary: text("aiSummary"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export const dietPlanView = pgTable("diet_plan_view", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  disease: text("disease").notNull(),
  dietType: text("dietType").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})
