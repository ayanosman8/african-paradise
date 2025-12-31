export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export const categories: Category[] = [
  { id: "breakfast", name: "Breakfast", description: "Start your day with authentic flavors" },
  { id: "lunch", name: "Lunch", description: "Hearty midday meals" },
  { id: "dinner", name: "Dinner", description: "Evening favorites" },
];

export const menuItems: MenuItem[] = [
  // Breakfast
  { id: "1", name: "Goat Liver", description: "Tender goat liver cooked with traditional spices", price: 20.00, category: "breakfast" },
  { id: "2", name: "Beef Stew", description: "Slow-cooked beef in rich aromatic sauce", price: 20.00, category: "breakfast" },
  { id: "3", name: "Ful", description: "Traditional fava bean stew with spices and olive oil", price: 20.00, category: "breakfast" },
  { id: "4", name: "Chicken Stew", description: "Tender chicken simmered in flavorful sauce", price: 20.00, category: "breakfast" },
  { id: "5", name: "Beef KK", description: "Beef prepared in our signature KK style", price: 22.50, category: "breakfast" },
  { id: "6", name: "Chicken KK", description: "Chicken prepared in our signature KK style", price: 22.50, category: "breakfast" },
  { id: "7", name: "Quesadilla", description: "Crispy flatbread with savory filling", price: 15.00, category: "breakfast" },
  { id: "8", name: "Malawax", description: "Sweet Somali pancake, soft and spongy", price: 1.30, category: "breakfast" },
  { id: "9", name: "Smoothie", description: "Fresh blended fruit smoothie", price: 4.50, category: "breakfast" },
  { id: "10", name: "Mango Juice", description: "Fresh pressed mango juice", price: 4.50, category: "breakfast" },
  { id: "11", name: "Avocado Juice", description: "Creamy fresh avocado blend", price: 4.50, category: "breakfast" },
  { id: "12", name: "Papaya Juice", description: "Sweet tropical papaya juice", price: 4.50, category: "breakfast" },
  { id: "13", name: "Mix Juice", description: "Blend of seasonal fresh fruits", price: 4.50, category: "breakfast" },

  // Lunch
  { id: "14", name: "Grilled Chicken Steak With Rice", description: "Juicy grilled chicken served with seasoned rice", price: 22.50, category: "lunch" },
  { id: "15", name: "Curry Rice", description: "Fragrant curry sauce over fluffy rice", price: 13.75, category: "lunch" },
  { id: "16", name: "Pasta Saldato", description: "Pasta in our special house sauce", price: 13.75, category: "lunch" },
  { id: "17", name: "Biryani Rice", description: "Aromatic spiced rice with herbs", price: 15.00, category: "lunch" },
  { id: "18", name: "Beef Kalankal With Rice", description: "Grilled beef cubes served with rice", price: 22.50, category: "lunch" },
  { id: "19", name: "Chicken Kalankal Rice", description: "Grilled chicken cubes served with rice", price: 22.50, category: "lunch" },
  { id: "20", name: "Beef Steak With Rice", description: "Tender beef steak with seasoned rice", price: 23.75, category: "lunch" },
  { id: "21", name: "Falafel Pasta/Rice", description: "Crispy falafel with your choice of pasta or rice", price: 29.00, category: "lunch" },
  { id: "22", name: "Chicken Legs With Rice", description: "Roasted chicken legs served with rice", price: 22.50, category: "lunch" },
  { id: "23", name: "Salmon Fish", description: "Fresh salmon fillet, grilled to perfection", price: 25.00, category: "lunch" },
  { id: "24", name: "Fish Salad", description: "Fresh fish over crisp garden salad", price: 25.00, category: "lunch" },
  { id: "25", name: "Traditional Soup", description: "Hearty traditional soup recipe", price: 2.00, category: "lunch" },
  { id: "26", name: "Family Size", description: "Large portion perfect for sharing", price: 51.25, category: "lunch" },
  { id: "27", name: "Veggie Soup", description: "Fresh vegetable soup", price: 2.00, category: "lunch" },
  { id: "28", name: "Anjeero Ethiopian", description: "Ethiopian-style injera platter", price: 25.50, category: "lunch" },
  { id: "29", name: "Grilled Goat", description: "Tender goat meat grilled with spices", price: 24.70, category: "lunch" },
  { id: "30", name: "Sambuza Chicken", description: "Crispy pastry filled with spiced chicken", price: 2.60, category: "lunch" },
  { id: "31", name: "Sambuza Beef", description: "Crispy pastry filled with spiced beef", price: 2.60, category: "lunch" },
  { id: "32", name: "Malawax", description: "Sweet Somali pancake, soft and spongy", price: 1.30, category: "lunch" },
  { id: "33", name: "Smoothie", description: "Fresh blended fruit smoothie", price: 4.50, category: "lunch" },
  { id: "34", name: "Mango Juice", description: "Fresh pressed mango juice", price: 4.50, category: "lunch" },
  { id: "35", name: "Avocado Juice", description: "Creamy fresh avocado blend", price: 4.50, category: "lunch" },
  { id: "36", name: "Watermelon Juice", description: "Refreshing watermelon juice", price: 4.50, category: "lunch" },
  { id: "37", name: "Papaya Juice", description: "Sweet tropical papaya juice", price: 4.50, category: "lunch" },
  { id: "38", name: "Mix Juice", description: "Blend of seasonal fresh fruits", price: 4.50, category: "lunch" },

  // Dinner
  { id: "39", name: "Beef Shawarma", description: "Seasoned beef wrapped in fresh bread", price: 17.50, category: "dinner" },
  { id: "40", name: "Pasta Special", description: "Chef's special pasta creation", price: 15.00, category: "dinner" },
  { id: "41", name: "Beef Sandwich", description: "Tender beef in fresh baked bread", price: 16.25, category: "dinner" },
  { id: "42", name: "Mufo Paradise", description: "Our signature Paradise specialty dish", price: 23.75, category: "dinner" },
  { id: "43", name: "Chicken Sandwich", description: "Grilled chicken in fresh baked bread", price: 16.25, category: "dinner" },
  { id: "44", name: "Chicken Shawarma", description: "Seasoned chicken wrapped in fresh bread", price: 17.50, category: "dinner" },
  { id: "45", name: "Beef Stew", description: "Slow-cooked beef in rich aromatic sauce", price: 20.00, category: "dinner" },
  { id: "46", name: "Chicken Stew", description: "Tender chicken simmered in flavorful sauce", price: 20.00, category: "dinner" },
  { id: "47", name: "Grilled Goat", description: "Tender goat meat grilled with spices", price: 24.70, category: "dinner" },
  { id: "48", name: "Malawax", description: "Sweet Somali pancake, soft and spongy", price: 1.30, category: "dinner" },
  { id: "49", name: "Mango Juice", description: "Fresh pressed mango juice", price: 4.50, category: "dinner" },
  { id: "50", name: "Avocado Juice", description: "Creamy fresh avocado blend", price: 4.50, category: "dinner" },
  { id: "51", name: "Papaya Juice", description: "Sweet tropical papaya juice", price: 4.50, category: "dinner" },
  { id: "52", name: "Mix Juice", description: "Blend of seasonal fresh fruits", price: 4.50, category: "dinner" },
];
