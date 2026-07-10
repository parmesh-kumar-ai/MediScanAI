// Disease knowledge base: 23 diseases with weighted symptom profiles.
// Weights (0-1) represent how strongly a symptom indicates the disease.

export interface DiseaseProfile {
  name: string
  category: string
  description: string
  weights: Record<string, number>
  precautions: string[]
  whenToSeekHelp: string
}

export const DISEASES: DiseaseProfile[] = [
  {
    name: "Diabetes Type 2",
    category: "Chronic / Metabolic",
    description:
      "A chronic metabolic disorder characterized by high blood sugar due to insulin resistance.",
    weights: {
      frequent_urination: 0.9,
      increased_thirst: 0.9,
      rapid_hunger: 0.8,
      fatigue: 0.6,
      blurred_vision: 0.6,
      weight_loss: 0.5,
      numbness: 0.4,
      itching: 0.3,
    },
    precautions: [
      "Monitor blood glucose regularly",
      "Follow a low-glycemic diet",
      "Exercise at least 150 minutes per week",
      "Maintain a healthy weight",
    ],
    whenToSeekHelp:
      "Seek immediate care for very high blood sugar symptoms: extreme thirst, frequent urination with confusion, or fruity-smelling breath.",
  },
  {
    name: "Hypertension",
    category: "Cardiovascular",
    description:
      "Persistently elevated blood pressure that increases the risk of heart disease and stroke.",
    weights: {
      headache: 0.7,
      dizziness: 0.7,
      blurred_vision: 0.5,
      chest_pain: 0.5,
      shortness_of_breath: 0.4,
      irregular_heartbeat: 0.4,
      fatigue: 0.3,
    },
    precautions: [
      "Reduce sodium intake",
      "Exercise regularly",
      "Limit alcohol and avoid smoking",
      "Manage stress with relaxation techniques",
    ],
    whenToSeekHelp:
      "Seek emergency care for blood pressure above 180/120, severe headache, chest pain, or vision changes.",
  },
  {
    name: "Common Cold",
    category: "Infectious",
    description:
      "A viral infection of the upper respiratory tract, usually mild and self-limiting.",
    weights: {
      cough: 0.8,
      fever: 0.5,
      headache: 0.5,
      fatigue: 0.5,
      weakness: 0.4,
    },
    precautions: [
      "Rest and stay hydrated",
      "Wash hands frequently",
      "Use a humidifier",
      "Avoid close contact with others",
    ],
    whenToSeekHelp:
      "See a doctor if symptoms last more than 10 days, fever exceeds 39.4 C (103 F), or breathing becomes difficult.",
  },
  {
    name: "Gastritis",
    category: "Digestive",
    description:
      "Inflammation of the stomach lining causing abdominal discomfort and nausea.",
    weights: {
      abdominal_pain: 0.9,
      nausea: 0.8,
      loss_of_appetite: 0.7,
      fatigue: 0.3,
    },
    precautions: [
      "Avoid spicy, acidic, and fried foods",
      "Eat smaller, more frequent meals",
      "Limit NSAIDs, alcohol, and caffeine",
      "Manage stress",
    ],
    whenToSeekHelp:
      "Seek care for vomiting blood, black stools, or severe persistent abdominal pain.",
  },
  {
    name: "Cancer (General)",
    category: "Oncology",
    description:
      "Abnormal cell growth with potential to spread; early general signs are often nonspecific.",
    weights: {
      weight_loss: 0.8,
      fatigue: 0.7,
      loss_of_appetite: 0.6,
      fever: 0.4,
      sweating: 0.4,
      skin_lesions: 0.4,
      pale_skin: 0.3,
    },
    precautions: [
      "Attend routine cancer screenings",
      "Avoid tobacco and limit alcohol",
      "Maintain a healthy diet and weight",
      "Protect skin from UV exposure",
    ],
    whenToSeekHelp:
      "See a doctor promptly for unexplained weight loss, persistent fatigue, unusual lumps, or non-healing sores.",
  },
  {
    name: "Brain Stroke",
    category: "Neurological / Emergency",
    description:
      "Interrupted blood supply to the brain causing sudden neurological deficits. A medical emergency.",
    weights: {
      numbness: 0.9,
      confusion: 0.9,
      dizziness: 0.7,
      headache: 0.7,
      blurred_vision: 0.6,
      weakness: 0.6,
    },
    precautions: [
      "Control blood pressure and cholesterol",
      "Do not smoke",
      "Manage diabetes",
      "Stay physically active",
    ],
    whenToSeekHelp:
      "CALL EMERGENCY SERVICES IMMEDIATELY for sudden face drooping, arm weakness, or speech difficulty (FAST).",
  },
  {
    name: "Heart Attack",
    category: "Cardiovascular / Emergency",
    description:
      "Blocked blood flow to the heart muscle causing tissue damage. A medical emergency.",
    weights: {
      chest_pain: 1.0,
      shortness_of_breath: 0.8,
      sweating: 0.7,
      irregular_heartbeat: 0.6,
      nausea: 0.5,
      dizziness: 0.5,
      fatigue: 0.4,
    },
    precautions: [
      "Control blood pressure and cholesterol",
      "Do not smoke",
      "Exercise regularly",
      "Maintain a heart-healthy diet",
    ],
    whenToSeekHelp:
      "CALL EMERGENCY SERVICES IMMEDIATELY for chest pain lasting more than a few minutes, especially with sweating, nausea, or shortness of breath.",
  },
  {
    name: "Cardiac Arrest",
    category: "Cardiovascular / Emergency",
    description:
      "Sudden loss of heart function; often preceded by arrhythmia symptoms. A medical emergency.",
    weights: {
      irregular_heartbeat: 1.0,
      chest_pain: 0.7,
      shortness_of_breath: 0.7,
      dizziness: 0.6,
      confusion: 0.4,
      fatigue: 0.3,
    },
    precautions: [
      "Treat underlying heart conditions",
      "Learn CPR and keep an AED accessible if high-risk",
      "Avoid stimulant abuse",
      "Attend regular cardiac checkups",
    ],
    whenToSeekHelp:
      "CALL EMERGENCY SERVICES IMMEDIATELY for collapse, no pulse, or sudden loss of consciousness. Begin CPR.",
  },
  {
    name: "Cataracts",
    category: "Ophthalmic",
    description:
      "Clouding of the eye's lens causing progressive vision impairment.",
    weights: {
      blurred_vision: 1.0,
      light_sensitivity: 0.7,
      eye_pain: 0.3,
    },
    precautions: [
      "Wear UV-protective sunglasses",
      "Manage diabetes",
      "Do not smoke",
      "Get regular eye exams",
    ],
    whenToSeekHelp:
      "See an ophthalmologist when vision changes interfere with daily activities such as driving or reading.",
  },
  {
    name: "Eczema",
    category: "Dermatological",
    description:
      "A chronic inflammatory skin condition causing itchy, red, and dry skin.",
    weights: {
      itching: 1.0,
      skin_rash: 0.9,
      skin_lesions: 0.5,
    },
    precautions: [
      "Moisturize skin daily",
      "Avoid known triggers and harsh soaps",
      "Use lukewarm (not hot) water for bathing",
      "Wear soft, breathable fabrics",
    ],
    whenToSeekHelp:
      "See a doctor if skin becomes infected (weeping, crusting, pain) or itching disrupts sleep.",
  },
  {
    name: "Glaucoma",
    category: "Ophthalmic",
    description:
      "Optic nerve damage often related to elevated eye pressure; can lead to blindness if untreated.",
    weights: {
      eye_pain: 0.9,
      blurred_vision: 0.7,
      headache: 0.5,
      eye_redness: 0.5,
      nausea: 0.3,
    },
    precautions: [
      "Get regular comprehensive eye exams",
      "Know your family eye-health history",
      "Exercise moderately",
      "Use prescribed eye drops consistently",
    ],
    whenToSeekHelp:
      "Seek emergency care for sudden severe eye pain, halos around lights, or rapid vision loss.",
  },
  {
    name: "Macular Degeneration",
    category: "Ophthalmic",
    description:
      "Deterioration of the central retina (macula) causing progressive central vision loss.",
    weights: {
      blurred_vision: 0.9,
      light_sensitivity: 0.5,
    },
    precautions: [
      "Eat leafy greens and omega-3 rich foods",
      "Do not smoke",
      "Protect eyes from UV light",
      "Monitor vision with an Amsler grid",
    ],
    whenToSeekHelp:
      "See an eye specialist promptly if straight lines appear wavy or central vision becomes dark or blurry.",
  },
  {
    name: "Liver Damage",
    category: "Hepatic",
    description:
      "Impaired liver function from disease, toxins, or alcohol, potentially progressing to failure.",
    weights: {
      jaundice: 1.0,
      abdominal_pain: 0.6,
      nausea: 0.5,
      fatigue: 0.5,
      loss_of_appetite: 0.5,
      swelling: 0.5,
      itching: 0.4,
    },
    precautions: [
      "Limit or avoid alcohol",
      "Get vaccinated for hepatitis A and B",
      "Avoid unnecessary medications and toxins",
      "Maintain a healthy weight",
    ],
    whenToSeekHelp:
      "Seek care urgently for yellowing skin/eyes, severe abdominal swelling, or confusion.",
  },
  {
    name: "Tuberculosis",
    category: "Infectious",
    description:
      "A bacterial infection primarily affecting the lungs, spread through the air.",
    weights: {
      cough: 0.9,
      fever: 0.7,
      sweating: 0.7,
      weight_loss: 0.7,
      fatigue: 0.5,
      chest_pain: 0.4,
      loss_of_appetite: 0.4,
    },
    precautions: [
      "Complete the full course of treatment",
      "Cover mouth when coughing",
      "Ensure good ventilation",
      "Attend follow-up testing",
    ],
    whenToSeekHelp:
      "See a doctor for a cough lasting over 3 weeks, coughing blood, night sweats, or unexplained weight loss.",
  },
  {
    name: "Paralysis",
    category: "Neurological",
    description:
      "Loss of muscle function in part of the body, often from nerve damage or stroke.",
    weights: {
      numbness: 1.0,
      weakness: 0.8,
      confusion: 0.4,
      dizziness: 0.3,
    },
    precautions: [
      "Control stroke risk factors",
      "Follow physical therapy programs",
      "Prevent pressure sores with position changes",
      "Maintain nerve health with a balanced diet",
    ],
    whenToSeekHelp:
      "CALL EMERGENCY SERVICES for sudden paralysis or numbness, especially on one side of the body.",
  },
  {
    name: "Anemia",
    category: "Hematological",
    description:
      "A deficiency of red blood cells or hemoglobin reducing oxygen delivery to tissues.",
    weights: {
      pale_skin: 0.9,
      fatigue: 0.8,
      weakness: 0.8,
      dizziness: 0.6,
      shortness_of_breath: 0.5,
      irregular_heartbeat: 0.4,
      headache: 0.3,
    },
    precautions: [
      "Eat iron-rich foods (leafy greens, legumes, lean meat)",
      "Pair iron with vitamin C for absorption",
      "Treat underlying causes of blood loss",
      "Take supplements as prescribed",
    ],
    whenToSeekHelp:
      "See a doctor for persistent fatigue, pale skin, or shortness of breath during light activity.",
  },
  {
    name: "Influenza",
    category: "Infectious",
    description:
      "A contagious viral respiratory illness, typically more severe than the common cold.",
    weights: {
      fever: 0.9,
      fatigue: 0.7,
      cough: 0.7,
      headache: 0.6,
      weakness: 0.6,
      joint_pain: 0.5,
      sweating: 0.4,
    },
    precautions: [
      "Get an annual flu vaccine",
      "Wash hands frequently",
      "Rest and hydrate during illness",
      "Avoid contact with vulnerable individuals",
    ],
    whenToSeekHelp:
      "Seek care for difficulty breathing, chest pain, persistent high fever, or dehydration.",
  },
  {
    name: "Migraine",
    category: "Neurological",
    description:
      "A neurological condition causing intense, often one-sided throbbing headaches.",
    weights: {
      headache: 1.0,
      light_sensitivity: 0.8,
      nausea: 0.7,
      blurred_vision: 0.5,
      dizziness: 0.4,
    },
    precautions: [
      "Identify and avoid personal triggers",
      "Maintain regular sleep and meals",
      "Stay hydrated",
      "Manage stress",
    ],
    whenToSeekHelp:
      "Seek emergency care for the 'worst headache of your life', headache with fever and stiff neck, or after head injury.",
  },
  {
    name: "Arthritis",
    category: "Musculoskeletal",
    description:
      "Joint inflammation causing pain, stiffness, and reduced mobility.",
    weights: {
      joint_pain: 1.0,
      swelling: 0.7,
      fatigue: 0.4,
      weakness: 0.3,
    },
    precautions: [
      "Maintain a healthy weight",
      "Do low-impact exercise (swimming, cycling)",
      "Protect joints during activities",
      "Apply heat/cold therapy as needed",
    ],
    whenToSeekHelp:
      "See a doctor for joint pain with swelling and redness lasting more than a few days.",
  },
  {
    name: "Asthma",
    category: "Respiratory",
    description:
      "A chronic condition where airways narrow and swell, causing breathing difficulty.",
    weights: {
      shortness_of_breath: 1.0,
      cough: 0.8,
      chest_pain: 0.5,
      sleeplessness: 0.4,
      fatigue: 0.3,
    },
    precautions: [
      "Identify and avoid triggers (allergens, smoke)",
      "Use controller inhalers as prescribed",
      "Keep a rescue inhaler accessible",
      "Monitor peak flow regularly",
    ],
    whenToSeekHelp:
      "Seek emergency care if a rescue inhaler does not relieve symptoms or if lips/fingernails turn blue.",
  },
  {
    name: "Conjunctivitis",
    category: "Ophthalmic",
    description:
      "Inflammation of the conjunctiva ('pink eye'), often viral, bacterial, or allergic.",
    weights: {
      eye_redness: 1.0,
      eye_pain: 0.7,
      itching: 0.5,
      light_sensitivity: 0.4,
    },
    precautions: [
      "Wash hands often; avoid touching eyes",
      "Do not share towels or cosmetics",
      "Replace contact lenses and cases",
      "Use warm or cool compresses",
    ],
    whenToSeekHelp:
      "See a doctor for eye pain, vision changes, intense redness, or symptoms not improving within a week.",
  },
  {
    name: "Melanoma",
    category: "Oncology / Dermatological",
    description:
      "The most serious form of skin cancer, developing in pigment-producing cells.",
    weights: {
      skin_lesions: 1.0,
      itching: 0.4,
      skin_rash: 0.3,
    },
    precautions: [
      "Use broad-spectrum sunscreen daily",
      "Avoid tanning beds",
      "Perform monthly skin self-exams (ABCDE rule)",
      "Get annual dermatology checks if high-risk",
    ],
    whenToSeekHelp:
      "See a dermatologist promptly for moles that are asymmetric, have irregular borders, color changes, diameter over 6mm, or are evolving.",
  },
  {
    name: "Psoriasis",
    category: "Dermatological",
    description:
      "An autoimmune condition causing rapid skin cell buildup, scaling, and inflammation.",
    weights: {
      skin_rash: 0.9,
      skin_lesions: 0.8,
      itching: 0.7,
      joint_pain: 0.4,
    },
    precautions: [
      "Moisturize regularly",
      "Avoid skin injury and sunburn",
      "Manage stress",
      "Limit alcohol",
    ],
    whenToSeekHelp:
      "See a doctor if psoriasis covers large areas, involves joints, or does not respond to treatment.",
  },
  {
    name: "Brain Tumour",
    category: "Oncology / Neurological",
    description:
      "An abnormal growth of cells in the brain, benign or malignant, causing pressure-related neurological symptoms.",
    weights: {
      headache: 0.9,
      seizures: 0.9,
      nausea: 0.6,
      blurred_vision: 0.6,
      confusion: 0.6,
      dizziness: 0.5,
      numbness: 0.5,
      weakness: 0.4,
    },
    precautions: [
      "Attend regular neurological follow-ups if diagnosed",
      "Avoid unnecessary radiation exposure",
      "Report new or worsening headaches promptly",
      "Maintain overall brain health with sleep and exercise",
    ],
    whenToSeekHelp:
      "Seek urgent care for new seizures, progressively worsening morning headaches, or headaches with vomiting and vision changes.",
  },
  {
    name: "Lung Cancer",
    category: "Oncology / Respiratory",
    description:
      "Malignant growth in lung tissue, strongly associated with smoking but also occurring in non-smokers.",
    weights: {
      cough: 0.9,
      chest_pain: 0.7,
      shortness_of_breath: 0.7,
      weight_loss: 0.7,
      fatigue: 0.5,
      loss_of_appetite: 0.4,
    },
    precautions: [
      "Do not smoke; avoid secondhand smoke",
      "Test your home for radon",
      "Use protective equipment around occupational carcinogens",
      "Attend low-dose CT screening if high-risk",
    ],
    whenToSeekHelp:
      "See a doctor promptly for a persistent cough over 3 weeks, coughing blood, or unexplained chest pain and weight loss.",
  },
  {
    name: "Breast Cancer",
    category: "Oncology",
    description:
      "Malignant tumour of breast tissue; the most common cancer in women, highly treatable when found early.",
    weights: {
      lump_or_mass: 1.0,
      swelling: 0.6,
      skin_rash: 0.3,
      skin_lesions: 0.3,
      fatigue: 0.3,
      weight_loss: 0.3,
    },
    precautions: [
      "Perform monthly breast self-exams",
      "Attend scheduled mammogram screenings",
      "Limit alcohol and maintain a healthy weight",
      "Know your family history and discuss genetic risk",
    ],
    whenToSeekHelp:
      "See a doctor promptly for any new breast lump, nipple discharge, skin dimpling, or persistent breast changes.",
  },
  {
    name: "Colorectal Cancer",
    category: "Oncology / Digestive",
    description:
      "Cancer of the colon or rectum, often developing from polyps; highly preventable with screening.",
    weights: {
      blood_in_stool: 1.0,
      bowel_changes: 0.9,
      abdominal_pain: 0.6,
      weight_loss: 0.6,
      fatigue: 0.5,
      weakness: 0.4,
      pale_skin: 0.3,
    },
    precautions: [
      "Get screened with colonoscopy as recommended",
      "Eat a high-fiber, low-processed-meat diet",
      "Exercise regularly and maintain healthy weight",
      "Limit alcohol and do not smoke",
    ],
    whenToSeekHelp:
      "See a doctor promptly for blood in stool, persistent changes in bowel habits, or unexplained abdominal pain and weight loss.",
  },
  {
    name: "Leukemia (Blood Cancer)",
    category: "Oncology / Hematological",
    description:
      "Cancer of blood-forming tissue causing abnormal white blood cells that crowd out healthy cells.",
    weights: {
      easy_bruising: 0.9,
      fatigue: 0.7,
      fever: 0.7,
      pale_skin: 0.7,
      sweating: 0.6,
      weight_loss: 0.5,
      weakness: 0.5,
      joint_pain: 0.3,
    },
    precautions: [
      "Avoid exposure to benzene and high-dose radiation",
      "Do not smoke",
      "Report recurrent infections or unusual bruising",
      "Attend routine blood work if high-risk",
    ],
    whenToSeekHelp:
      "See a doctor promptly for frequent infections, easy bruising or bleeding, persistent fever, or bone pain.",
  },
  {
    name: "Prostate Cancer",
    category: "Oncology",
    description:
      "Cancer of the prostate gland in men, often slow-growing but potentially aggressive.",
    weights: {
      painful_urination: 0.8,
      frequent_urination: 0.8,
      blood_in_urine: 0.7,
      back_flank_pain: 0.5,
      weight_loss: 0.3,
      fatigue: 0.3,
    },
    precautions: [
      "Discuss PSA screening with your doctor from age 50 (45 if high-risk)",
      "Eat a diet rich in vegetables and tomatoes",
      "Exercise regularly",
      "Maintain a healthy weight",
    ],
    whenToSeekHelp:
      "See a doctor for difficulty urinating, blood in urine or semen, or persistent pelvic and lower back discomfort.",
  },
  {
    name: "Kidney Stones",
    category: "Urological / Calcification",
    description:
      "Hard mineral and salt deposits (calcifications) forming in the kidneys, causing severe pain when passing.",
    weights: {
      back_flank_pain: 1.0,
      painful_urination: 0.8,
      blood_in_urine: 0.8,
      nausea: 0.6,
      frequent_urination: 0.5,
      abdominal_pain: 0.5,
      fever: 0.3,
      sweating: 0.3,
    },
    precautions: [
      "Drink 2.5-3 liters of water daily",
      "Reduce sodium and animal protein intake",
      "Limit oxalate-rich foods if prone to oxalate stones",
      "Do not skip prescribed preventive medication",
    ],
    whenToSeekHelp:
      "Seek urgent care for severe flank pain with fever, vomiting, blood in urine, or inability to pass urine.",
  },
  {
    name: "Gallstones",
    category: "Digestive / Calcification",
    description:
      "Hardened deposits (calcifications) of bile forming in the gallbladder, which can block bile ducts.",
    weights: {
      abdominal_pain: 0.9,
      nausea: 0.7,
      jaundice: 0.6,
      fever: 0.4,
      back_flank_pain: 0.4,
      loss_of_appetite: 0.3,
    },
    precautions: [
      "Maintain a healthy weight; avoid rapid weight loss",
      "Eat a high-fiber, low-saturated-fat diet",
      "Do not skip meals",
      "Exercise regularly",
    ],
    whenToSeekHelp:
      "Seek urgent care for intense right-upper abdominal pain lasting hours, especially with fever or yellowing skin.",
  },
  {
    name: "Acne",
    category: "Dermatological",
    description:
      "A common skin condition where hair follicles clog with oil and dead skin cells, causing pimples and cysts.",
    weights: {
      oily_skin: 1.0,
      skin_lesions: 0.7,
      skin_rash: 0.5,
      itching: 0.2,
    },
    precautions: [
      "Wash face twice daily with a gentle cleanser",
      "Use non-comedogenic skincare and cosmetics",
      "Avoid picking or squeezing lesions",
      "Manage stress and follow a low-glycemic diet",
    ],
    whenToSeekHelp:
      "See a dermatologist for painful cystic acne, scarring, or acne not improving with over-the-counter care.",
  },
  {
    name: "Fungal Skin Infection",
    category: "Dermatological / Infectious",
    description:
      "Infections such as ringworm or athlete's foot caused by fungi growing on skin, common in warm moist areas.",
    weights: {
      itching: 0.9,
      skin_rash: 0.9,
      skin_lesions: 0.6,
      skin_discoloration: 0.4,
    },
    precautions: [
      "Keep skin clean and dry, especially skin folds",
      "Do not share towels, shoes, or personal items",
      "Wear breathable fabrics and change damp clothes promptly",
      "Complete the full course of antifungal treatment",
    ],
    whenToSeekHelp:
      "See a doctor if the rash spreads, does not improve after 2 weeks of antifungal treatment, or you have diabetes or a weak immune system.",
  },
  {
    name: "Vitiligo",
    category: "Dermatological / Autoimmune",
    description:
      "An autoimmune condition where pigment-producing cells are destroyed, causing white patches on the skin.",
    weights: {
      skin_discoloration: 1.0,
      pale_skin: 0.4,
      itching: 0.2,
    },
    precautions: [
      "Protect depigmented skin with broad-spectrum sunscreen",
      "Avoid skin trauma (can trigger new patches)",
      "Manage stress",
      "Discuss treatment options early with a dermatologist",
    ],
    whenToSeekHelp:
      "See a dermatologist when white patches first appear or spread rapidly, to discuss repigmentation options.",
  },
]

export const DISEASE_NAMES = DISEASES.map((d) => d.name)

export function getDisease(name: string): DiseaseProfile | undefined {
  return DISEASES.find((d) => d.name === name)
}
