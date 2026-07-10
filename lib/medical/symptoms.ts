export type SymptomCategory =
  | "General"
  | "Neurological"
  | "Respiratory & Cardiac"
  | "Digestive"
  | "Eyes & Skin"
  | "Other"

export interface Symptom {
  id: string
  label: string
  category: SymptomCategory
}

export const SYMPTOMS: Symptom[] = [
  // General
  { id: "fatigue", label: "Fatigue", category: "General" },
  { id: "weakness", label: "Tiredness / Weakness", category: "General" },
  { id: "sleeplessness", label: "Sleeplessness", category: "General" },
  { id: "fever", label: "Fever", category: "General" },
  { id: "sweating", label: "Excessive Sweating", category: "General" },
  // Neurological
  { id: "headache", label: "Headache", category: "Neurological" },
  { id: "dizziness", label: "Dizziness", category: "Neurological" },
  { id: "blurred_vision", label: "Blurred Vision", category: "Neurological" },
  { id: "numbness", label: "Numbness", category: "Neurological" },
  { id: "confusion", label: "Confusion", category: "Neurological" },
  { id: "seizures", label: "Seizures", category: "Neurological" },
  // Respiratory & Cardiac
  { id: "cough", label: "Cough", category: "Respiratory & Cardiac" },
  {
    id: "shortness_of_breath",
    label: "Shortness of Breath",
    category: "Respiratory & Cardiac",
  },
  { id: "chest_pain", label: "Chest Pain", category: "Respiratory & Cardiac" },
  {
    id: "irregular_heartbeat",
    label: "Irregular Heartbeat",
    category: "Respiratory & Cardiac",
  },
  // Digestive
  { id: "nausea", label: "Nausea", category: "Digestive" },
  { id: "abdominal_pain", label: "Abdominal Pain", category: "Digestive" },
  { id: "loss_of_appetite", label: "Loss of Appetite", category: "Digestive" },
  { id: "rapid_hunger", label: "Rapid Hunger", category: "Digestive" },
  { id: "jaundice", label: "Jaundice", category: "Digestive" },
  { id: "blood_in_stool", label: "Blood in Stool", category: "Digestive" },
  { id: "bowel_changes", label: "Change in Bowel Habits", category: "Digestive" },
  // Eyes & Skin
  { id: "eye_pain", label: "Eye Pain", category: "Eyes & Skin" },
  { id: "eye_redness", label: "Eye Redness", category: "Eyes & Skin" },
  { id: "light_sensitivity", label: "Light Sensitivity", category: "Eyes & Skin" },
  { id: "skin_rash", label: "Skin Rash", category: "Eyes & Skin" },
  { id: "itching", label: "Itching", category: "Eyes & Skin" },
  { id: "skin_lesions", label: "Skin Lesions", category: "Eyes & Skin" },
  { id: "skin_discoloration", label: "Skin Discoloration / White Patches", category: "Eyes & Skin" },
  { id: "oily_skin", label: "Oily Skin / Pimples", category: "Eyes & Skin" },
  // Other
  { id: "joint_pain", label: "Joint Pain", category: "Other" },
  { id: "frequent_urination", label: "Frequent Urination", category: "Other" },
  { id: "increased_thirst", label: "Increased Thirst", category: "Other" },
  { id: "weight_loss", label: "Weight Loss", category: "Other" },
  { id: "pale_skin", label: "Pale Skin", category: "Other" },
  { id: "swelling", label: "Swelling", category: "Other" },
  { id: "lump_or_mass", label: "Lump or Mass", category: "Other" },
  { id: "painful_urination", label: "Painful Urination", category: "Other" },
  { id: "blood_in_urine", label: "Blood in Urine", category: "Other" },
  { id: "back_flank_pain", label: "Back / Flank Pain", category: "Other" },
  { id: "easy_bruising", label: "Easy Bruising / Bleeding", category: "Other" },
]

export const SYMPTOM_CATEGORIES: SymptomCategory[] = [
  "General",
  "Neurological",
  "Respiratory & Cardiac",
  "Digestive",
  "Eyes & Skin",
  "Other",
]

export function symptomLabel(id: string): string {
  return SYMPTOMS.find((s) => s.id === id)?.label ?? id
}
