export interface FoodItem {
  food: string
  serving: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  veg: boolean
}

// Central nutrition database (per serving)
export const FOOD_DB: Record<string, FoodItem> = {
  salmon: { food: "Salmon", serving: "4 oz", calories: 206, protein: 23, carbs: 0, fat: 13, fiber: 0, veg: false },
  chicken_breast: { food: "Grilled Chicken Breast", serving: "4 oz", calories: 187, protein: 35, carbs: 0, fat: 4, fiber: 0, veg: false },
  eggs: { food: "Eggs", serving: "2 large", calories: 143, protein: 13, carbs: 1, fat: 10, fiber: 0, veg: false },
  tuna: { food: "Tuna", serving: "4 oz", calories: 132, protein: 28, carbs: 0, fat: 1, fiber: 0, veg: false },
  turkey: { food: "Turkey Breast", serving: "4 oz", calories: 153, protein: 34, carbs: 0, fat: 1, fiber: 0, veg: false },
  sardines: { food: "Sardines", serving: "3 oz", calories: 177, protein: 21, carbs: 0, fat: 10, fiber: 0, veg: false },
  lean_beef: { food: "Lean Beef", serving: "4 oz", calories: 230, protein: 33, carbs: 0, fat: 10, fiber: 0, veg: false },
  chicken_liver: { food: "Chicken Liver", serving: "3 oz", calories: 142, protein: 21, carbs: 1, fat: 6, fiber: 0, veg: false },
  spinach: { food: "Spinach", serving: "2 cups", calories: 14, protein: 2, carbs: 2, fat: 0, fiber: 1, veg: true },
  kale: { food: "Kale", serving: "1 cup", calories: 33, protein: 3, carbs: 6, fat: 1, fiber: 2, veg: true },
  apples: { food: "Apples", serving: "1 medium", calories: 95, protein: 0.5, carbs: 25, fat: 0, fiber: 4, veg: true },
  bananas: { food: "Bananas", serving: "1 medium", calories: 105, protein: 1, carbs: 27, fat: 0, fiber: 3, veg: true },
  carrots: { food: "Carrots", serving: "1 cup", calories: 52, protein: 1, carbs: 12, fat: 0, fiber: 4, veg: true },
  tomatoes: { food: "Tomatoes", serving: "1 medium", calories: 22, protein: 1, carbs: 5, fat: 0, fiber: 1.5, veg: true },
  broccoli: { food: "Broccoli", serving: "1 cup", calories: 55, protein: 4, carbs: 11, fat: 1, fiber: 5, veg: true },
  sweet_potato: { food: "Sweet Potato", serving: "1 medium", calories: 103, protein: 2, carbs: 24, fat: 0, fiber: 4, veg: true },
  berries: { food: "Mixed Berries", serving: "1 cup", calories: 84, protein: 1, carbs: 21, fat: 0.5, fiber: 4, veg: true },
  avocado: { food: "Avocado", serving: "1/2 medium", calories: 120, protein: 2, carbs: 6, fat: 11, fiber: 5, veg: true },
  flaxseeds: { food: "Flaxseeds", serving: "2 tbsp", calories: 75, protein: 3, carbs: 4, fat: 6, fiber: 4, veg: true },
  walnuts: { food: "Walnuts", serving: "1 oz", calories: 185, protein: 4, carbs: 4, fat: 18, fiber: 2, veg: true },
  almonds: { food: "Almonds", serving: "1 oz", calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5, veg: true },
  oats: { food: "Oatmeal", serving: "1 cup cooked", calories: 158, protein: 6, carbs: 27, fat: 3, fiber: 4, veg: true },
  quinoa: { food: "Quinoa", serving: "1 cup cooked", calories: 222, protein: 8, carbs: 39, fat: 4, fiber: 5, veg: true },
  brown_rice: { food: "Brown Rice", serving: "1 cup cooked", calories: 216, protein: 5, carbs: 45, fat: 2, fiber: 3.5, veg: true },
  lentils: { food: "Lentils", serving: "1 cup cooked", calories: 230, protein: 18, carbs: 40, fat: 1, fiber: 16, veg: true },
  chickpeas: { food: "Chickpeas", serving: "1 cup cooked", calories: 269, protein: 15, carbs: 45, fat: 4, fiber: 12, veg: true },
  tofu: { food: "Tofu", serving: "1/2 cup", calories: 94, protein: 10, carbs: 2, fat: 6, fiber: 1, veg: true },
  greek_yogurt: { food: "Greek Yogurt (low-fat)", serving: "1 cup", calories: 146, protein: 20, carbs: 8, fat: 4, fiber: 0, veg: true },
  cottage_cheese: { food: "Cottage Cheese", serving: "1/2 cup", calories: 110, protein: 12, carbs: 4, fat: 5, fiber: 0, veg: true },
  olive_oil: { food: "Olive Oil", serving: "1 tbsp", calories: 119, protein: 0, carbs: 0, fat: 13.5, fiber: 0, veg: true },
  garlic: { food: "Garlic", serving: "3 cloves", calories: 13, protein: 0.6, carbs: 3, fat: 0, fiber: 0.2, veg: true },
  ginger: { food: "Ginger Tea", serving: "1 cup", calories: 9, protein: 0.2, carbs: 2, fat: 0, fiber: 0.2, veg: true },
  turmeric_milk: { food: "Turmeric Milk", serving: "1 cup", calories: 130, protein: 8, carbs: 12, fat: 5, fiber: 0, veg: true },
  oranges: { food: "Oranges", serving: "1 medium", calories: 62, protein: 1, carbs: 15, fat: 0, fiber: 3, veg: true },
  bell_peppers: { food: "Bell Peppers", serving: "1 cup", calories: 30, protein: 1, carbs: 7, fat: 0, fiber: 2.5, veg: true },
  beets: { food: "Beets", serving: "1 cup", calories: 59, protein: 2, carbs: 13, fat: 0, fiber: 4, veg: true },
  celery: { food: "Celery Sticks", serving: "1 cup", calories: 16, protein: 1, carbs: 3, fat: 0, fiber: 1.6, veg: true },
  cucumber: { food: "Cucumber", serving: "1 cup", calories: 16, protein: 1, carbs: 4, fat: 0, fiber: 0.5, veg: true },
  pumpkin_seeds: { food: "Pumpkin Seeds", serving: "1 oz", calories: 151, protein: 7, carbs: 5, fat: 13, fiber: 1.7, veg: true },
  chia_seeds: { food: "Chia Seeds", serving: "2 tbsp", calories: 138, protein: 5, carbs: 12, fat: 9, fiber: 10, veg: true },
  green_tea: { food: "Green Tea", serving: "1 cup", calories: 2, protein: 0, carbs: 0, fat: 0, fiber: 0, veg: true },
  barley: { food: "Barley", serving: "1 cup cooked", calories: 193, protein: 4, carbs: 44, fat: 1, fiber: 6, veg: true },
  mushrooms: { food: "Mushrooms", serving: "1 cup", calories: 15, protein: 2, carbs: 2, fat: 0, fiber: 1, veg: true },
  whole_wheat_bread: { food: "Whole Wheat Bread", serving: "2 slices", calories: 160, protein: 8, carbs: 28, fat: 2, fiber: 4, veg: true },
  papaya: { food: "Papaya", serving: "1 cup", calories: 55, protein: 1, carbs: 14, fat: 0, fiber: 2.5, veg: true },
  pomegranate: { food: "Pomegranate", serving: "1/2 cup arils", calories: 72, protein: 1.5, carbs: 16, fat: 1, fiber: 3.5, veg: true },
  grapes: { food: "Grapes", serving: "1 cup", calories: 104, protein: 1, carbs: 27, fat: 0, fiber: 1.4, veg: true },
  watermelon: { food: "Watermelon", serving: "1 cup", calories: 46, protein: 1, carbs: 12, fat: 0, fiber: 0.6, veg: true },
  coconut_water: { food: "Coconut Water", serving: "1 cup", calories: 46, protein: 2, carbs: 9, fat: 0.5, fiber: 2.6, veg: true },
  soup_veg: { food: "Vegetable Soup", serving: "1 bowl", calories: 98, protein: 4, carbs: 17, fat: 2, fiber: 4, veg: true },
  chicken_soup: { food: "Chicken Soup", serving: "1 bowl", calories: 150, protein: 12, carbs: 12, fat: 5, fiber: 1, veg: false },
  honey: { food: "Honey", serving: "1 tbsp", calories: 64, protein: 0, carbs: 17, fat: 0, fiber: 0, veg: true },
}

export type FoodKey = keyof typeof FOOD_DB
