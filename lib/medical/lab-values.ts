export interface LabValue {
  name: string
  value: number
  unit: string
  normalRange: string
  status: "normal" | "low" | "high"
}

interface LabDefinition {
  name: string
  patterns: RegExp[]
  unit: string
  min: number
  max: number
}

// Common lab test reference ranges with regex patterns for extraction
const LAB_DEFINITIONS: LabDefinition[] = [
  {
    name: "HbA1c",
    patterns: [/hba1c[^0-9]{0,30}?(\d+\.?\d*)\s*%?/i, /glycated\s+h(?:a)?emoglobin[^0-9]{0,30}?(\d+\.?\d*)/i],
    unit: "%",
    min: 4.0,
    max: 5.6,
  },
  {
    name: "Fasting Glucose",
    patterns: [/fasting\s+(?:blood\s+)?(?:glucose|sugar)[^0-9]{0,30}?(\d+\.?\d*)/i, /fbs[^0-9]{0,20}?(\d+\.?\d*)/i],
    unit: "mg/dL",
    min: 70,
    max: 99,
  },
  {
    name: "Random Glucose",
    patterns: [/random\s+(?:blood\s+)?(?:glucose|sugar)[^0-9]{0,30}?(\d+\.?\d*)/i, /rbs[^0-9]{0,20}?(\d+\.?\d*)/i],
    unit: "mg/dL",
    min: 70,
    max: 140,
  },
  {
    name: "Hemoglobin",
    patterns: [/h(?:a)?emoglobin(?!\s*a1c)[^0-9]{0,30}?(\d+\.?\d*)/i, /\bhb\b[^0-9a-z]{0,10}(\d+\.?\d*)/i],
    unit: "g/dL",
    min: 12.0,
    max: 17.5,
  },
  {
    name: "Total Cholesterol",
    patterns: [/total\s+cholesterol[^0-9]{0,30}?(\d+\.?\d*)/i, /cholesterol[,\s]+total[^0-9]{0,20}?(\d+\.?\d*)/i],
    unit: "mg/dL",
    min: 100,
    max: 200,
  },
  {
    name: "LDL Cholesterol",
    patterns: [/ldl(?:\s+cholesterol)?[^0-9]{0,30}?(\d+\.?\d*)/i],
    unit: "mg/dL",
    min: 0,
    max: 100,
  },
  {
    name: "HDL Cholesterol",
    patterns: [/hdl(?:\s+cholesterol)?[^0-9]{0,30}?(\d+\.?\d*)/i],
    unit: "mg/dL",
    min: 40,
    max: 100,
  },
  {
    name: "Triglycerides",
    patterns: [/triglycerides?[^0-9]{0,30}?(\d+\.?\d*)/i],
    unit: "mg/dL",
    min: 0,
    max: 150,
  },
  {
    name: "Creatinine",
    patterns: [/creatinine[^0-9]{0,30}?(\d+\.?\d*)/i],
    unit: "mg/dL",
    min: 0.7,
    max: 1.3,
  },
  {
    name: "Urea",
    patterns: [/\burea\b[^0-9]{0,30}?(\d+\.?\d*)/i, /\bbun\b[^0-9]{0,20}?(\d+\.?\d*)/i],
    unit: "mg/dL",
    min: 7,
    max: 20,
  },
  {
    name: "TSH",
    patterns: [/\btsh\b[^0-9]{0,30}?(\d+\.?\d*)/i, /thyroid\s+stimulating\s+hormone[^0-9]{0,30}?(\d+\.?\d*)/i],
    unit: "mIU/L",
    min: 0.4,
    max: 4.0,
  },
  {
    name: "ALT (SGPT)",
    patterns: [/\b(?:alt|sgpt)\b[^0-9]{0,30}?(\d+\.?\d*)/i],
    unit: "U/L",
    min: 7,
    max: 56,
  },
  {
    name: "AST (SGOT)",
    patterns: [/\b(?:ast|sgot)\b[^0-9]{0,30}?(\d+\.?\d*)/i],
    unit: "U/L",
    min: 10,
    max: 40,
  },
  {
    name: "Total Bilirubin",
    patterns: [/(?:total\s+)?bilirubin[^0-9]{0,30}?(\d+\.?\d*)/i],
    unit: "mg/dL",
    min: 0.1,
    max: 1.2,
  },
  {
    name: "Vitamin D",
    patterns: [/vitamin\s*d3?[^0-9]{0,40}?(\d+\.?\d*)/i, /25[\s-]*oh[\s-]*d[^0-9]{0,30}?(\d+\.?\d*)/i],
    unit: "ng/mL",
    min: 30,
    max: 100,
  },
  {
    name: "Vitamin B12",
    patterns: [/vitamin\s*b\s*12[^0-9]{0,40}?(\d+\.?\d*)/i, /cobalamin[^0-9]{0,30}?(\d+\.?\d*)/i],
    unit: "pg/mL",
    min: 200,
    max: 900,
  },
  {
    name: "Platelet Count",
    patterns: [/platelets?(?:\s+count)?[^0-9]{0,30}?(\d+\.?\d*)/i],
    unit: "thousand/uL",
    min: 150,
    max: 450,
  },
  {
    name: "WBC Count",
    patterns: [/(?:wbc|white\s+blood\s+cells?|total\s+leu[ck]ocyte)(?:\s+count)?[^0-9]{0,30}?(\d+\.?\d*)/i],
    unit: "thousand/uL",
    min: 4.5,
    max: 11.0,
  },
]

// Condition keywords detectable in report text
const CONDITION_KEYWORDS: Record<string, string[]> = {
  Diabetes: ["diabetes", "diabetic", "hba1c", "hyperglycemia", "glucose intolerance"],
  Hypertension: ["hypertension", "high blood pressure", "elevated bp"],
  Anemia: ["anemia", "anaemia", "low hemoglobin", "iron deficiency"],
  "Liver Condition": ["fatty liver", "hepatitis", "cirrhosis", "liver function", "sgpt", "sgot"],
  "Kidney Condition": ["kidney", "renal", "creatinine", "ckd", "gfr", "nephro"],
  "Thyroid Disorder": ["thyroid", "tsh", "hypothyroid", "hyperthyroid"],
  "Cholesterol / Lipid": ["cholesterol", "lipid profile", "dyslipidemia", "triglyceride"],
  "Cardiac Condition": ["cardiac", "ecg", "echo", "troponin", "heart"],
  "Vitamin Deficiency": ["vitamin d deficiency", "b12 deficiency", "vitamin deficiency"],
}

export function extractLabValues(text: string): LabValue[] {
  const results: LabValue[] = []
  const seen = new Set<string>()

  for (const def of LAB_DEFINITIONS) {
    if (seen.has(def.name)) continue
    for (const pattern of def.patterns) {
      const match = text.match(pattern)
      if (match) {
        const value = Number.parseFloat(match[1])
        if (!Number.isNaN(value) && value > 0 && value < 100000) {
          const status: LabValue["status"] =
            value < def.min ? "low" : value > def.max ? "high" : "normal"
          results.push({
            name: def.name,
            value,
            unit: def.unit,
            normalRange: `${def.min} - ${def.max} ${def.unit}`,
            status,
          })
          seen.add(def.name)
          break
        }
      }
    }
  }

  return results
}

export function detectConditions(text: string): string[] {
  const lower = text.toLowerCase()
  const found: string[] = []
  for (const [condition, keywords] of Object.entries(CONDITION_KEYWORDS)) {
    if (keywords.some((k) => lower.includes(k))) {
      found.push(condition)
    }
  }
  return found
}
