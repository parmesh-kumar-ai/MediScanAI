import { FOOD_DB, type FoodItem } from "./foods"

export type DietType = "veg" | "non-veg"

interface DiseaseDietConfig {
  recommended: string[] // keys into FOOD_DB
  avoid: string[]
  notes: string
}

// Disease-specific dietary configurations
export const DIET_CONFIGS: Record<string, DiseaseDietConfig> = {
  "Diabetes Type 2": {
    recommended: ["oats", "lentils", "broccoli", "spinach", "berries", "walnuts", "chia_seeds", "quinoa", "greek_yogurt", "salmon", "chicken_breast", "avocado"],
    avoid: ["Sugary drinks and sodas", "White bread and refined carbs", "Fried foods", "Sweets and pastries", "Fruit juices with added sugar", "Processed snacks"],
    notes: "Focus on low-glycemic foods with high fiber to stabilize blood sugar.",
  },
  Hypertension: {
    recommended: ["beets", "spinach", "bananas", "oats", "berries", "flaxseeds", "salmon", "garlic", "sweet_potato", "avocado", "lentils", "greek_yogurt"],
    avoid: ["High-sodium processed foods", "Canned soups with added salt", "Pickled foods", "Deli meats", "Alcohol in excess", "Caffeine in excess"],
    notes: "A DASH-style diet rich in potassium and low in sodium supports healthy blood pressure.",
  },
  "Common Cold": {
    recommended: ["chicken_soup", "soup_veg", "ginger", "oranges", "garlic", "honey", "green_tea", "spinach", "berries", "turmeric_milk"],
    avoid: ["Dairy in excess (may thicken mucus)", "Sugary foods", "Alcohol", "Caffeinated drinks (dehydrating)", "Fried and greasy foods"],
    notes: "Warm fluids, vitamin C, and rest support immune recovery.",
  },
  Gastritis: {
    recommended: ["oats", "bananas", "papaya", "brown_rice", "soup_veg", "ginger", "greek_yogurt", "sweet_potato", "carrots", "chicken_breast"],
    avoid: ["Spicy foods", "Acidic foods (citrus, tomato)", "Coffee and caffeine", "Alcohol", "Fried and fatty foods", "Carbonated drinks"],
    notes: "Bland, low-acid foods eaten in small frequent meals reduce stomach irritation.",
  },
  "Cancer (General)": {
    recommended: ["broccoli", "berries", "spinach", "kale", "garlic", "green_tea", "walnuts", "lentils", "salmon", "pomegranate", "carrots", "tofu"],
    avoid: ["Processed meats", "Charred or grilled meats in excess", "Alcohol", "Sugary drinks", "Ultra-processed foods", "Excess red meat"],
    notes: "Antioxidant-rich plant foods support the body during treatment and recovery.",
  },
  "Brain Stroke": {
    recommended: ["salmon", "oats", "spinach", "berries", "walnuts", "avocado", "beets", "lentils", "olive_oil", "bananas", "flaxseeds"],
    avoid: ["High-sodium foods", "Trans fats and fried foods", "Processed meats", "Sugary foods", "Excess alcohol"],
    notes: "A Mediterranean-style diet supports vascular health and stroke recovery.",
  },
  "Heart Attack": {
    recommended: ["salmon", "oats", "walnuts", "berries", "spinach", "avocado", "olive_oil", "lentils", "flaxseeds", "garlic", "quinoa", "broccoli"],
    avoid: ["Trans fats", "Fried foods", "Processed meats", "Excess salt", "Sugary drinks", "Full-fat dairy in excess"],
    notes: "Heart-healthy omega-3 fats and soluble fiber help manage cholesterol.",
  },
  "Cardiac Arrest": {
    recommended: ["salmon", "spinach", "bananas", "avocado", "oats", "walnuts", "beets", "lentils", "berries", "olive_oil", "pumpkin_seeds"],
    avoid: ["Stimulants and energy drinks", "Excess caffeine", "High-sodium foods", "Trans fats", "Alcohol", "Processed foods"],
    notes: "Potassium- and magnesium-rich foods support healthy heart rhythm.",
  },
  Cataracts: {
    recommended: ["spinach", "kale", "carrots", "bell_peppers", "oranges", "berries", "eggs", "salmon", "almonds", "sweet_potato", "broccoli"],
    avoid: ["Sugary foods", "Refined carbohydrates", "Fried foods", "Excess alcohol", "High-sodium processed foods"],
    notes: "Lutein, zeaxanthin, and vitamins C and E support lens health.",
  },
  Eczema: {
    recommended: ["salmon", "flaxseeds", "avocado", "oats", "sweet_potato", "spinach", "berries", "walnuts", "greek_yogurt", "cucumber"],
    avoid: ["Common allergens (dairy, eggs) if sensitive", "Processed foods", "Sugary snacks", "Alcohol", "Spicy foods", "Artificial additives"],
    notes: "Omega-3 fats and probiotics may reduce inflammatory skin flares.",
  },
  Glaucoma: {
    recommended: ["kale", "spinach", "carrots", "berries", "oranges", "salmon", "green_tea", "broccoli", "eggs", "walnuts"],
    avoid: ["Excess caffeine (raises eye pressure)", "High-sodium foods", "Trans fats", "Excessive fluid intake at once", "Alcohol in excess"],
    notes: "Leafy greens with nitrates may help regulate intraocular pressure.",
  },
  "Macular Degeneration": {
    recommended: ["kale", "spinach", "salmon", "eggs", "oranges", "berries", "almonds", "sweet_potato", "broccoli", "bell_peppers"],
    avoid: ["Processed foods with trans fats", "Fried foods", "Sugary snacks", "Refined carbohydrates", "Excess alcohol"],
    notes: "Lutein-rich greens and omega-3s are linked to slower macular degeneration.",
  },
  "Liver Damage": {
    recommended: ["oats", "garlic", "beets", "broccoli", "green_tea", "walnuts", "olive_oil", "berries", "grapes", "lentils", "papaya"],
    avoid: ["Alcohol (strictly)", "Fried and fatty foods", "Added sugars", "Excess salt", "Raw shellfish", "Unnecessary supplements/medications"],
    notes: "Liver-supportive foods aid detoxification; alcohol must be avoided entirely.",
  },
  Tuberculosis: {
    recommended: ["eggs", "chicken_breast", "lentils", "greek_yogurt", "bananas", "oats", "spinach", "almonds", "oranges", "salmon", "brown_rice"],
    avoid: ["Alcohol (interferes with treatment)", "Tobacco", "Excess caffeine", "Processed junk foods", "Carbonated drinks"],
    notes: "High-protein, calorie-dense nutrition supports recovery and medication tolerance.",
  },
  Paralysis: {
    recommended: ["salmon", "eggs", "lentils", "spinach", "bananas", "walnuts", "oats", "berries", "greek_yogurt", "olive_oil", "chickpeas"],
    avoid: ["High-sodium foods", "Trans fats", "Excess sugar", "Alcohol", "Processed meats"],
    notes: "B-vitamins, omega-3s, and lean protein support nerve and muscle health.",
  },
  Anemia: {
    recommended: ["spinach", "lentils", "lean_beef", "chicken_liver", "chickpeas", "pumpkin_seeds", "beets", "oranges", "eggs", "tofu", "pomegranate"],
    avoid: ["Tea/coffee with meals (blocks iron)", "Calcium supplements with iron-rich meals", "Processed foods", "Excess dairy at mealtimes"],
    notes: "Pair iron-rich foods with vitamin C sources to maximize absorption.",
  },
  Influenza: {
    recommended: ["chicken_soup", "soup_veg", "ginger", "garlic", "oranges", "honey", "green_tea", "bananas", "oats", "turmeric_milk", "watermelon"],
    avoid: ["Alcohol", "Sugary drinks", "Fried foods", "Dairy in excess", "Caffeine (dehydrating)"],
    notes: "Hydration and easily digestible immune-supporting foods speed recovery.",
  },
  Migraine: {
    recommended: ["spinach", "quinoa", "almonds", "salmon", "bananas", "watermelon", "flaxseeds", "sweet_potato", "cucumber", "ginger"],
    avoid: ["Aged cheeses", "Processed meats with nitrates", "Artificial sweeteners", "Excess caffeine", "Alcohol (especially red wine)", "MSG"],
    notes: "Magnesium-rich foods and steady hydration may reduce migraine frequency.",
  },
  Arthritis: {
    recommended: ["salmon", "walnuts", "berries", "spinach", "olive_oil", "broccoli", "garlic", "ginger", "green_tea", "oats", "turmeric_milk"],
    avoid: ["Fried foods", "Refined sugar", "Excess red meat", "Processed foods", "Excess alcohol", "Excess omega-6 oils"],
    notes: "Anti-inflammatory omega-3s and antioxidants help manage joint inflammation.",
  },
  Asthma: {
    recommended: ["salmon", "spinach", "apples", "bananas", "carrots", "tomatoes", "broccoli", "sweet_potato", "berries", "avocado", "flaxseeds", "walnuts"],
    avoid: ["Sulfites (dried fruits, wine)", "Dairy (if allergic)", "Shellfish", "Eggs (if allergic)", "Peanuts (if allergic)", "Processed foods"],
    notes: "Antioxidants and omega-3 fatty acids support airway health.",
  },
  Conjunctivitis: {
    recommended: ["carrots", "spinach", "oranges", "berries", "sweet_potato", "eggs", "almonds", "green_tea", "bell_peppers"],
    avoid: ["Processed foods", "Sugary snacks", "Allergy triggers if allergic conjunctivitis", "Excess caffeine"],
    notes: "Vitamin A and C rich foods support eye tissue healing.",
  },
  Melanoma: {
    recommended: ["berries", "green_tea", "broccoli", "kale", "tomatoes", "walnuts", "salmon", "pomegranate", "carrots", "garlic"],
    avoid: ["Processed meats", "Alcohol", "Ultra-processed foods", "Excess sugar", "Charred meats"],
    notes: "Antioxidant-dense foods support skin health during treatment.",
  },
  Psoriasis: {
    recommended: ["salmon", "olive_oil", "berries", "spinach", "broccoli", "flaxseeds", "walnuts", "sweet_potato", "chickpeas", "green_tea"],
    avoid: ["Alcohol", "Red meat in excess", "Nightshades (if sensitive)", "Gluten (if sensitive)", "Processed foods", "Refined sugar"],
    notes: "An anti-inflammatory diet may reduce flare frequency and severity.",
  },
  "Brain Tumour": {
    recommended: ["salmon", "walnuts", "berries", "broccoli", "spinach", "olive_oil", "eggs", "green_tea", "avocado", "flaxseeds", "turmeric_milk"],
    avoid: ["Processed meats", "Refined sugar", "Alcohol", "Ultra-processed foods", "Charred meats", "Artificial sweeteners in excess"],
    notes: "Omega-3s and antioxidant-rich foods support brain health during treatment and recovery.",
  },
  "Lung Cancer": {
    recommended: ["broccoli", "kale", "berries", "carrots", "oranges", "salmon", "garlic", "green_tea", "lentils", "walnuts", "tomatoes", "eggs"],
    avoid: ["Tobacco in any form", "Processed meats", "Alcohol", "Fried foods", "Sugary drinks", "Excess supplements (especially beta-carotene if smoker)"],
    notes: "Cruciferous vegetables and vitamin-rich produce support lung tissue and treatment tolerance.",
  },
  "Breast Cancer": {
    recommended: ["broccoli", "kale", "berries", "flaxseeds", "salmon", "lentils", "walnuts", "green_tea", "tofu", "oats", "pomegranate", "garlic"],
    avoid: ["Alcohol", "Processed meats", "Sugary drinks", "Ultra-processed foods", "Excess saturated fat", "Charred meats"],
    notes: "Fiber, cruciferous vegetables, and flaxseed lignans are linked to better outcomes; alcohol should be avoided.",
  },
  "Colorectal Cancer": {
    recommended: ["oats", "lentils", "broccoli", "brown_rice", "berries", "spinach", "chickpeas", "salmon", "greek_yogurt", "garlic", "papaya", "whole_wheat_bread"],
    avoid: ["Processed meats (strictly)", "Excess red meat", "Alcohol", "Fried foods", "Refined carbohydrates", "Sugary drinks"],
    notes: "High-fiber whole grains and legumes protect colon health; processed meat should be eliminated.",
  },
  "Leukemia (Blood Cancer)": {
    recommended: ["chicken_breast", "eggs", "lentils", "spinach", "greek_yogurt", "oats", "berries", "bananas", "salmon", "oranges", "brown_rice", "almonds"],
    avoid: ["Raw or undercooked meats/eggs (infection risk)", "Unpasteurized dairy", "Unwashed raw produce", "Alcohol", "Sugary processed foods"],
    notes: "Protein- and calorie-dense, food-safe nutrition supports blood counts and immunity during treatment.",
  },
  "Prostate Cancer": {
    recommended: ["tomatoes", "broccoli", "green_tea", "salmon", "walnuts", "lentils", "pomegranate", "flaxseeds", "berries", "tofu", "garlic", "spinach"],
    avoid: ["Excess dairy", "Processed meats", "Charred meats", "Excess saturated fat", "Alcohol in excess", "Excess calcium supplements"],
    notes: "Lycopene from tomatoes and plant-forward eating patterns are associated with prostate health.",
  },
  "Kidney Stones": {
    recommended: ["watermelon", "cucumber", "coconut_water", "oranges", "bananas", "oats", "carrots", "bell_peppers", "brown_rice", "apples", "celery"],
    avoid: ["High-oxalate foods in excess (spinach, nuts, beets)", "Excess salt", "Excess animal protein", "Sugary sodas and colas", "Excess vitamin C supplements", "Dehydration"],
    notes: "High fluid intake is the single most important factor; citrus fruits help prevent stone formation.",
  },
  Gallstones: {
    recommended: ["oats", "brown_rice", "lentils", "apples", "berries", "carrots", "broccoli", "olive_oil", "greek_yogurt", "sweet_potato", "papaya"],
    avoid: ["Fried and fatty foods", "Full-fat dairy", "Fatty red meat", "Refined carbohydrates", "Rapid crash diets", "Skipping meals"],
    notes: "Regular high-fiber, moderate-fat meals keep bile flowing and reduce gallstone attacks.",
  },
  Acne: {
    recommended: ["salmon", "walnuts", "berries", "spinach", "sweet_potato", "green_tea", "oats", "pumpkin_seeds", "carrots", "tomatoes", "avocado"],
    avoid: ["High-glycemic foods (white bread, sweets)", "Sugary drinks", "Skim milk in excess", "Whey protein supplements (if flare-prone)", "Greasy fast food"],
    notes: "A low-glycemic diet with zinc and omega-3s may reduce breakout frequency and severity.",
  },
  "Fungal Skin Infection": {
    recommended: ["greek_yogurt", "garlic", "ginger", "spinach", "broccoli", "oats", "berries", "eggs", "pumpkin_seeds", "green_tea", "coconut_water"],
    avoid: ["Refined sugar (feeds yeast)", "Alcohol", "Refined carbohydrates", "Sugary drinks", "Excess processed foods", "Moldy or aged foods (if sensitive)"],
    notes: "Probiotics and low-sugar eating support the skin barrier and healthy microbial balance.",
  },
  Vitiligo: {
    recommended: ["spinach", "chickpeas", "eggs", "bananas", "walnuts", "berries", "broccoli", "lentils", "greek_yogurt", "papaya", "beets"],
    avoid: ["Excess vitamin C mega-doses (debated; discuss with doctor)", "Alcohol", "Highly processed foods", "Gluten (if sensitive)", "Artificial colorings"],
    notes: "Folate, B12, zinc, and copper-rich foods support melanocyte function alongside medical treatment.",
  },
}

export interface Meal {
  meal: string
  food: string
  quantity: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
}

export interface DietPlan {
  disease: string
  dietType: DietType
  notes: string
  recommendedFoods: FoodItem[]
  avoidFoods: string[]
  meals: Meal[]
  totals: { calories: number; protein: number; carbs: number; fat: number; fiber: number }
}

const MEAL_SLOTS = ["Breakfast", "Mid-Morning", "Lunch", "Evening Snack", "Dinner"]

export function getDietPlan(disease: string, dietType: DietType): DietPlan | null {
  const config = DIET_CONFIGS[disease]
  if (!config) return null

  let foods = config.recommended
    .map((key) => FOOD_DB[key])
    .filter(Boolean)

  if (dietType === "veg") {
    foods = foods.filter((f) => f.veg)
  }

  // Build a sample daily meal plan from the food list, deterministic per disease
  const pool = [...foods]
  const meals: Meal[] = MEAL_SLOTS.map((slot, i) => {
    const primary = pool[i % pool.length]
    const secondary = pool[(i + 3) % pool.length]
    const useCombo = slot === "Breakfast" || slot === "Lunch" || slot === "Dinner"
    const cal = primary.calories + (useCombo ? secondary.calories : 0)
    return {
      meal: slot,
      food: useCombo && secondary.food !== primary.food ? `${primary.food} with ${secondary.food}` : primary.food,
      quantity: useCombo && secondary.food !== primary.food ? `${primary.serving} + ${secondary.serving}` : primary.serving,
      calories: Math.round(cal),
      protein: Math.round((primary.protein + (useCombo ? secondary.protein : 0)) * 10) / 10,
      carbs: Math.round((primary.carbs + (useCombo ? secondary.carbs : 0)) * 10) / 10,
      fat: Math.round((primary.fat + (useCombo ? secondary.fat : 0)) * 10) / 10,
      fiber: Math.round((primary.fiber + (useCombo ? secondary.fiber : 0)) * 10) / 10,
    }
  })

  const totals = meals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      protein: Math.round((acc.protein + m.protein) * 10) / 10,
      carbs: Math.round((acc.carbs + m.carbs) * 10) / 10,
      fat: Math.round((acc.fat + m.fat) * 10) / 10,
      fiber: Math.round((acc.fiber + m.fiber) * 10) / 10,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
  )

  return {
    disease,
    dietType,
    notes: config.notes,
    recommendedFoods: foods,
    avoidFoods: config.avoid,
    meals,
    totals,
  }
}

export const DIET_DISEASES = Object.keys(DIET_CONFIGS)
