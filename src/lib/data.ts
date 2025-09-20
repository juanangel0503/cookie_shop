import { CookieFlavor, PackOption } from '@/types';

// Individual Cookie Flavors
export const cookieFlavors: CookieFlavor[] = [
  {
    id: 1,
    name: "Grandma's Chocolate Chip",
    description: "Our signature cookie made with real butter, brown sugar, and chunks of Belgian chocolate.",
    category: "chocolate",
    emoji: "🍪",
    calories: "650 cal"
  },
  {
    id: 2,
    name: "Vanilla Sugar Cookie",
    description: "Buttery soft sugar cookies with real vanilla extract and a delicate dusting of powdered sugar.",
    category: "classic",
    emoji: "🍪",
    calories: "600 cal"
  },
  {
    id: 3,
    name: "Oatmeal Raisin",
    description: "Old-fashioned oatmeal cookies with plump California raisins, cinnamon, and a touch of nutmeg.",
    category: "classic",
    emoji: "🍪",
    calories: "580 cal"
  },
  {
    id: 4,
    name: "Double Chocolate Fudge",
    description: "For chocolate lovers - rich cocoa cookies with semi-sweet chips and a fudgy center.",
    category: "chocolate",
    emoji: "🍪",
    calories: "720 cal"
  },
  {
    id: 5,
    name: "Strawberry Shortcake",
    description: "Light and airy cookies with freeze-dried strawberries and a hint of cream.",
    category: "fruity",
    emoji: "🍪",
    calories: "680 cal"
  },
  {
    id: 6,
    name: "Lemon Zest",
    description: "Bright and refreshing with fresh lemon zest and a light lemon glaze.",
    category: "fruity",
    emoji: "🍪",
    calories: "620 cal"
  },
  {
    id: 7,
    name: "Pumpkin Spice",
    description: "Fall favorite made with real pumpkin puree, warm spices, and a dusting of cinnamon sugar.",
    category: "seasonal",
    emoji: "🍪",
    calories: "640 cal"
  },
  {
    id: 8,
    name: "Peanut Butter Classic",
    description: "Creamy natural peanut butter cookies with a crisscross pattern.",
    category: "classic",
    emoji: "🍪",
    calories: "590 cal"
  },
  {
    id: 9,
    name: "Red Velvet Indulgence",
    description: "Luxurious red velvet cookies with cream cheese frosting and chocolate chips.",
    category: "chocolate",
    emoji: "🍪",
    calories: "750 cal",
    surcharge: "+$0.99 each"
  },
  {
    id: 10,
    name: "Snickerdoodle Classic",
    description: "Traditional snickerdoodles with cinnamon sugar coating and soft, chewy center.",
    category: "classic",
    emoji: "🍪",
    calories: "610 cal"
  },
  {
    id: 11,
    name: "Blueberry Muffin Top",
    description: "Cookie version of your favorite blueberry muffin with fresh berry pieces.",
    category: "fruity",
    emoji: "🍪",
    calories: "670 cal"
  },
  {
    id: 12,
    name: "Gingerbread Wonder",
    description: "Holiday favorite with warm ginger, molasses, and festive spices.",
    category: "seasonal",
    emoji: "🍪",
    calories: "630 cal"
  }
];

// Pack Options
export const packOptions: PackOption[] = [
  {
    id: 'single',
    name: "Single",
    price: 4.99,
    size: 1
  },
  {
    id: '4pack',
    name: "4-Pack",
    price: 18.99,
    size: 4
  },
  {
    id: '6pack',
    name: "6-Pack", 
    price: 24.99,
    size: 6
  },
  {
    id: '12pack',
    name: "12-Pack",
    price: 48.99,
    size: 12
  }
];

// Individual cookie price for savings calculation
export const individualCookiePrice = 4.99;

// Calculate savings percentage
export function calculateSavings(boxSize: number, boxPrice: number): number {
  const individualTotal = individualCookiePrice * boxSize;
  const savings = individualTotal - boxPrice;
  const savingsPercentage = Math.round((savings / individualTotal) * 100);
  return savingsPercentage;
}
