export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
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
  { id: "1", name: "Goat Liver", description: "Tender goat liver cooked with traditional spices", price: 20.00, category: "breakfast", image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400" },
  { id: "2", name: "Beef Suugar", description: "Slow-cooked beef in rich aromatic sauce", price: 20.00, category: "breakfast", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400" },
  { id: "3", name: "Ful", description: "Traditional fava bean stew with spices and olive oil", price: 20.00, category: "breakfast", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400" },
  { id: "4", name: "Chicken Suugar", description: "Tender chicken simmered in flavorful sauce", price: 20.00, category: "breakfast", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400" },
  { id: "5", name: "Beef KK", description: "Beef prepared in our signature KK style", price: 22.50, category: "breakfast", image: "https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b0?w=400" },
  { id: "6", name: "Chicken KK", description: "Chicken prepared in our signature KK style", price: 22.50, category: "breakfast", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400" },
  { id: "7", name: "Quesadilla", description: "Crispy flatbread with savory filling", price: 15.00, category: "breakfast", image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400" },
  { id: "8", name: "Malawax", description: "Sweet Somali pancake, soft and spongy", price: 1.30, category: "breakfast", image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400" },
  { id: "9", name: "Smoothie", description: "Fresh blended fruit smoothie", price: 4.50, category: "breakfast", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400" },
  { id: "10", name: "Mango Juice", description: "Fresh pressed mango juice", price: 4.50, category: "breakfast", image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400" },
  { id: "11", name: "Avocado Juice", description: "Creamy fresh avocado blend", price: 4.50, category: "breakfast", image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400" },
  { id: "12", name: "Papaya Juice", description: "Sweet tropical papaya juice", price: 4.50, category: "breakfast", image: "https://images.unsplash.com/photo-1619546952812-520e98064a52?w=400" },
  { id: "13", name: "Mix Juice", description: "Blend of seasonal fresh fruits", price: 4.50, category: "breakfast", image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400" },

  // Lunch
  { id: "14", name: "Grilled Chicken Steak With Rice", description: "Juicy grilled chicken served with seasoned rice", price: 22.50, category: "lunch", image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400" },
  { id: "15", name: "Curry Rice", description: "Fragrant curry sauce over fluffy rice", price: 13.75, category: "lunch", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400" },
  { id: "16", name: "Pasta Saldato", description: "Pasta in our special house sauce", price: 13.75, category: "lunch", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400" },
  { id: "17", name: "Biryani Rice", description: "Aromatic spiced rice with herbs", price: 15.00, category: "lunch", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400" },
  { id: "18", name: "Beef Kalankal With Rice", description: "Grilled beef cubes served with rice", price: 22.50, category: "lunch", image: "https://images.unsplash.com/photo-1504973960431-1c467e159aa4?w=400" },
  { id: "19", name: "Chicken Kalankal Rice", description: "Grilled chicken cubes served with rice", price: 22.50, category: "lunch", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400" },
  { id: "20", name: "Beef Steak With Rice", description: "Tender beef steak with seasoned rice", price: 23.75, category: "lunch", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400" },
  { id: "21", name: "Falafel Pasta/Rice", description: "Crispy falafel with your choice of pasta or rice", price: 29.00, category: "lunch", image: "https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=400" },
  { id: "22", name: "Chicken Legs With Rice", description: "Roasted chicken legs served with rice", price: 22.50, category: "lunch", image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400" },
  { id: "23", name: "Salmon Fish", description: "Fresh salmon fillet, grilled to perfection", price: 25.00, category: "lunch", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400" },
  { id: "24", name: "Fish Salad", description: "Fresh fish over crisp garden salad", price: 25.00, category: "lunch", image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=400" },
  { id: "25", name: "Traditional Soup", description: "Hearty traditional soup recipe", price: 2.00, category: "lunch", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400" },
  { id: "26", name: "Family Size", description: "Large portion perfect for sharing", price: 51.25, category: "lunch", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400" },
  { id: "27", name: "Veggie Soup", description: "Fresh vegetable soup", price: 2.00, category: "lunch", image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400" },
  { id: "28", name: "Anjeero Ethiopian", description: "Ethiopian-style injera platter", price: 25.50, category: "lunch", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400" },
  { id: "29", name: "Grilled Goat", description: "Tender goat meat grilled with spices", price: 24.70, category: "lunch", image: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=400" },
  { id: "30", name: "Sambuza Chicken", description: "Crispy pastry filled with spiced chicken", price: 2.60, category: "lunch", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400" },
  { id: "31", name: "Sambuza Beef", description: "Crispy pastry filled with spiced beef", price: 2.60, category: "lunch", image: "https://images.unsplash.com/photo-1601050690117-94f5f7fa0ed6?w=400" },
  { id: "32", name: "Malawax", description: "Sweet Somali pancake, soft and spongy", price: 1.30, category: "lunch", image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400" },
  { id: "33", name: "Smoothie", description: "Fresh blended fruit smoothie", price: 4.50, category: "lunch", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400" },
  { id: "34", name: "Mango Juice", description: "Fresh pressed mango juice", price: 4.50, category: "lunch", image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400" },
  { id: "35", name: "Avocado Juice", description: "Creamy fresh avocado blend", price: 4.50, category: "lunch", image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400" },
  { id: "36", name: "Watermelon Juice", description: "Refreshing watermelon juice", price: 4.50, category: "lunch", image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=400" },
  { id: "37", name: "Papaya Juice", description: "Sweet tropical papaya juice", price: 4.50, category: "lunch", image: "https://images.unsplash.com/photo-1619546952812-520e98064a52?w=400" },
  { id: "38", name: "Mix Juice", description: "Blend of seasonal fresh fruits", price: 4.50, category: "lunch", image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400" },

  // Dinner
  { id: "39", name: "Beef Shawarma", description: "Seasoned beef wrapped in fresh bread", price: 17.50, category: "dinner", image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400" },
  { id: "40", name: "Pasta Special", description: "Chef's special pasta creation", price: 15.00, category: "dinner", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400" },
  { id: "41", name: "Beef Sandwich", description: "Tender beef in fresh baked bread", price: 16.25, category: "dinner", image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400" },
  { id: "42", name: "Mufo Paradise", description: "Our signature Paradise specialty dish", price: 23.75, category: "dinner", image: "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400" },
  { id: "43", name: "Chicken Sandwich", description: "Grilled chicken in fresh baked bread", price: 16.25, category: "dinner", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400" },
  { id: "44", name: "Chicken Shawarma", description: "Seasoned chicken wrapped in fresh bread", price: 17.50, category: "dinner", image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400" },
  { id: "45", name: "Beef Suugar", description: "Slow-cooked beef in rich aromatic sauce", price: 20.00, category: "dinner", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400" },
  { id: "46", name: "Chicken Suugar", description: "Tender chicken simmered in flavorful sauce", price: 20.00, category: "dinner", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400" },
  { id: "47", name: "Grilled Goat", description: "Tender goat meat grilled with spices", price: 24.70, category: "dinner", image: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=400" },
  { id: "48", name: "Malawax", description: "Sweet Somali pancake, soft and spongy", price: 1.30, category: "dinner", image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400" },
  { id: "49", name: "Mango Juice", description: "Fresh pressed mango juice", price: 4.50, category: "dinner", image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400" },
  { id: "50", name: "Avocado Juice", description: "Creamy fresh avocado blend", price: 4.50, category: "dinner", image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400" },
  { id: "51", name: "Papaya Juice", description: "Sweet tropical papaya juice", price: 4.50, category: "dinner", image: "https://images.unsplash.com/photo-1619546952812-520e98064a52?w=400" },
  { id: "52", name: "Mix Juice", description: "Blend of seasonal fresh fruits", price: 4.50, category: "dinner", image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400" },
];
