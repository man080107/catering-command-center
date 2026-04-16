import fs from 'fs';

const escapeSql = (str) => str.replace(/'/g, "''");

const buffetPackages = [
  {
    name: "Bronze",
    price: 16.80,
    courses: "8 Courses",
    minPax: 30,
    popular: false,
    categories: [
      { label: "Premium (Pick 1)", items: ["Breaded Prawn with Wasabi Mayo", "House Special Mutton Rendang", "De-shell Prawn with Chilli Crab-Less Sauce – Served with Golden Mantou"] },
      { label: "Chicken (Pick 1)", items: ["Signature Curry Chicken with Potato", "Shrimp Paste Chicken (Midwings)", "Fragrant Salted Egg Yolk Chicken", "Kam Hiong Chicken"] },
      { label: "Fish (Pick 1)", items: ["Cereal Fish Fillet", "Sweet & Sour Fish Fillet", "Assam Fish Fillet with Ladies Finger, Brinjal & Tomato", "Golden Fish Fillet with Wasabi Mayo"] },
      { label: "Side (Pick 1)", items: ["Black Pepper Kingcrab Ball", "Japanese Egg Beancurd with Chicken Mince", "Crispy Fried Zai Er", "Seafood Ngoh Hiang with House Special Sambal"] },
      { label: "Vegetable (Pick 1)", items: ["Broccoli with Mushroom", "Roasted Mix Vegetable", "Stir Fried Long Bean with Carrot", "Curry Mix Vegetable (Sayur Lodeh)"] },
      { label: "Staple (Pick 1)", items: ["Yang Zhou Fried Rice", "Fragrant Olive Fried Rice", "Hong Kong Fried Bee Hoon", "Stir Fried Kway Teow"] },
      { label: "Dessert (Pick 1)", items: ["Cold Cheng Tng", "Honeydew Sago", "Honey Sea Coconut with Longan", "Bobo Chacha (+$0.20/pax)"] },
      { label: "Drinks (Pick 1)", items: ["Mixed Fruit", "Orange"] },
    ],
  },
  {
    name: "Silver",
    price: 18.80,
    courses: "9 Courses",
    minPax: 30,
    popular: true,
    categories: [
      { label: "Premium (Pick 1)", items: ["Salted Egg Renkon (Lotus) Chips", "Breaded Prawn with Wasabi Mayonnaise", "House Special Mutton Rendang", "De-shell Prawn with Chilli Crab-Less Sauce – Served with Golden Mantou"] },
      { label: "Dim Sum (Pick 1)", items: ["Golden Sweet Potato Roll", "Prawn Har Gao", "Chicken Siew Mai", "Stuffed You Tiao with Mayonnaise"] },
      { label: "Chicken (Pick 1)", items: ["Signature Curry Chicken with Potato", "Butter Chicken Masala", "Fragrant Salted Egg Yolk Chicken", "Shrimp Paste Chicken (Midwings)", "Cajun Boneless Chicken"] },
      { label: "Fish (Pick 1)", items: ["Cereal Fish Fillet", "Sweet & Sour Fish Fillet", "Assam Fish Fillet with Ladies Finger, Brinjal & Tomato", "Golden Fish Fillet with Wasabi Mayo", "Steam Seabass Fillet w Premium Garlic Soya Sauce"] },
      { label: "Side (Pick 1)", items: ["Black Pepper Kingcrab Ball", "Japanese Egg Beancurd with Chicken Mince", "Crispy Fried Zai Er", "Seaweed Crispy Chicken", "Seafood Ngoh Hiang with House Special Sambal"] },
      { label: "Vegetable (Pick 1)", items: ["Broccoli with Mushroom", "Roasted Mix Vegetable", "Nonya Chap Chai", "Curry Mix Vegetable (Sayur Lodeh)", "Stir Fried Long Bean with Carrot"] },
      { label: "Staple (Pick 1)", items: ["Yang Zhou Fried Rice", "Fragrant Olive Fried Rice", "Hong Kong Fried Bee Hoon", "Stir Fried Ee Fu Noodles"] },
      { label: "Dessert (Pick 1)", items: ["Cold Cheng Tng", "Honeydew/Mango Sago", "Honey Sea Coconut with Longan", "Bobo Chacha"] },
      { label: "Drinks (Pick 1)", items: ["Mixed Fruit", "Orange", "Peach Oolong Tea"] },
    ],
  },
  {
    name: "Gold",
    price: 21.80,
    courses: "10 Courses",
    minPax: 30,
    popular: false,
    categories: [
      { label: "Premium (Pick 2)", items: ["Salted Egg Renkon (Lotus) Chips", "Breaded Prawn with Wasabi Mayo", "House Special Mutton Rendang", "De-shell Prawn with Chilli Crab-Less Sauce – Served with Golden Mantou", "Chicken Satay with Peanut Sauce", "Chef's Special Chicken Shepherd's Pie"] },
      { label: "Dim Sum (Pick 1)", items: ["Golden Sweet Potato Roll", "Chicken Siew Mai", "Shrimp Har Gao", "Stuffed You Tiao w Mayonnaise"] },
      { label: "Chicken (Pick 1)", items: ["Signature Curry Chicken with Potato", "Butter Chicken Masala", "Grilled Chicken Yakitori with Roasted Sesame", "Fragrant Salted Egg Yolk Chicken", "Shrimp Paste Chicken Drumlet", "Oriental BBQ (Char Siew) Chicken"] },
      { label: "Fish (Pick 1)", items: ["Cereal Fish Fillet", "Sweet & Sour Fish Fillet", "Assam Fish Fillet with Ladies Finger, Brinjal & Tomato", "Steam Seabass Fillet with Premium Garlic Soya", "Norwegian Salmon with Teriyaki Sauce (+$1.20/pax)"] },
      { label: "Side (Pick 1)", items: ["Black Pepper Kingcrab Ball", "Japanese Egg Beancurd with Chicken Mince", "Crispy Fried Zai Er", "Seaweed Crispy Chicken", "Seafood Ngoh Hiang with House Sambal"] },
      { label: "Vegetable (Pick 1)", items: ["Broccoli with Mushroom", "HK Kai Lan with Carrot", "Nonya Chap Chai", "Roasted Mix Vegetable", "Stir Fried French Bean w Carrot"] },
      { label: "Staple (Pick 1)", items: ["Yang Zhou Fried Rice", "Fragrant Olive Fried Rice", "Hong Kong Fried Bee Hoon", "Stir Fried Ee Fu Noodles", "Spaghetti Mushroom Olio"] },
      { label: "Dessert (Pick 1)", items: ["Cold Cheng Tng", "Bobo Chacha", "Honeydew/Mango Sago", "Honey Sea Coconut with Longan", "Aiyu Jelly with Mix Cocktail"] },
      { label: "Drinks (Pick 1)", items: ["Mixed Fruit", "Orange", "Peach Oolong Tea"] },
    ],
  },
];

const connectCategories = [
  { label: "Premium (Select 1)", items: ["Breaded Prawn with Wasabi Mayo", "Salted Egg Renkon (Lotus) Chips", "House Special Mutton Rendang", "House Special Beef Rendang", "Stir Fried Black Pepper Slice Beef", "Stir Fried Sweet & Spicy Prawn (de-shell)"] },
  { label: "Chicken (Select 1)", items: ["Signature Curry Chicken w Potato", "House Special Butter Chicken Masala", "Fragrant Honey Boneless Chicken Cube", "Oriental BBQ Boneless Chicken Leg", "Grilled Chicken Yakitori with Roasted Sesame"] },
  { label: "Fish (Select 1)", items: ["Cereal Fish Fillet", "Sweet & Sour Fish Fillet", "Steam Seabass Fillet (Teochew Style)", "Steam Seabass Fillet (Nonya Sauce)", "Norwegian Teriyaki Salmon (+$1)"] },
  { label: "Sides (Select 2)", items: ["Black Pepper Kingcrab Ball", "Japanese Egg Beancurd with Chicken Mince", "Egg Omelette", "Seafood Ngoh Hiang with House Special Sambal", "Seaweed Crispy Chicken", "Stir Fried Slice Potato w Sweet Chili Sauce", "Golden Crispy Zai Er"] },
  { label: "Vegetable (Select 1)", items: ["Broccoli with Mushroom", "Roasted Cajun Mixed Vegetables", "Stir Fried Nai Bai w Garlic", "Stir Fried Xiao Bai Cai with Carrot", "Nonya Chap Chai", "Curry Mix Vegetable"] },
  { label: "Staple (Select 1)", items: ["Yangzhou Fried Rice", "Fragrant Olive Fried Rice", "Signature Stir Fried Bee Hoon", "House Special Nasi Briyani w Papadum (+$1.00)"] },
  { label: "Dessert (Select 1)", items: ["Cold Cheng Tng", "Aiyu Jelly w Mix Cocktail", "Bobo Chacha, Hot (+$0.50)", "Mango Sago", "Honeydew Sago"] },
];

const refreshmentCategories = [
  { label: "Sandwich / Salad", items: ["Mini Egg/Tuna Mayo Sandwich", "Mini Egg/Tuna Mayo Croissant", "Potato Salad", "Mesclun Salad Mix w Roasted Yuzu Sesame Dressing"] },
  { label: "Dim Sum / Sides", items: ["Samosa (Big) (V)", "Chicken Siew Mai", "Seaweed Chicken", "Golden Chicken Ball", "Grilled Chicken Yakitori", "Ngoh Hiang Ball", "Golden Fishball", "Seafood Ngoh Hiang Roll", "Fried Kingcrab Ball", "Fried Wanton", "Springroll (Big) (V)", "Breaded Pumpkin Croquette (V)", "Breaded Potato Croquette"] },
  { label: "Staple", items: ["Century Egg & Chicken Mince Porridge", "Stir Fried Bee Hoon", "Stir Fried Kway Teow", "Stir Fried Dry Laksa", "Pineapple Fried Rice", "Olive Fried Rice", "Yang Zhou Fried Rice"] },
  { label: "Sweets", items: ["Mini Brownie", "Mini Red Velvet Cake", "Mini Assorted Muffin", "Assorted Cut Fruits", "Mango Sago", "Aiyu Jelly w Mix Fruit Cocktail", "Cold Cheng Tng", "Bobo Cha Cha (Hot)", "Green Bean Sago (Hot)", "Pilut Hitam (Hot)"] },
  { label: "Drinks", items: ["Fruit Punch", "Refreshing Orange", "Coffee w Sugar & Creamer", "Tea w Sugar & Creamer"] },
  { label: "Mini Don Bowls", items: ["Torched Salmon Don", "Grilled Unagi Don", "Grilled Chicken Yakitori Don", "Truffle Beef Don", "Avocado (V)"] },
];

const bentoSets = [
  { name: "Set A", title: "Baked Chicken Yakitori w Rice", desc: "Red-brown rice (180g), grilled chicken yakitori (4 sticks, 110g), steam egg, sautéed corn & edamame, Japanese cucumber & pickle (daikon)", price: 10 },
  { name: "Set B", title: "Sous-vide Chicken Breast Grain Bowl", desc: "Red-brown rice (180g), sous-vide chicken breast (120g), 63° sous-vide egg, purple slaw, corn & edamame, cherry tomatoes, sesame dressing", price: 10 },
  { name: "Set C", title: "Truffle Soy Salmon w Mushroom Olio Pasta", desc: "Wholegrain spaghetti mushroom olio (180g), salmon w signature truffle soy sauce (90g), pumpkin croquette, roasted mix veg w new potato, cherry tomatoes", price: 10 },
  { name: "Set D", title: "Sous-vide Chicken w Tomato Bolognese Pasta", desc: "Wholegrain spaghetti w tomato chicken bolognese (180g), sous-vide chicken breast (100g), sous-vide egg, roasted mix veg w new potato", price: 10 },
  { name: "Set E", title: "Torched Salmon w Olive Fried Rice", desc: "Olive red-brown fried rice (180g), torched salmon w chef sauce (mildly spicy, 90g), sous-vide egg, roasted pumpkin, sautéed edamame, Japanese cucumber & pickle", price: 10 },
  { name: "Set F", title: "Baked Char Siew Chicken Leg w Fragrant Rice", desc: "Fragrant red-white-mix rice (180g), baked boneless chicken leg w char siew sauce (120g), braised hardboil egg, oyster sauce xiao bai chye, cucumber & chili", price: 10 },
  { name: "Set G", title: "Steam Seabass Fillet w Rice", desc: "Red-white-mix rice (180g), steam seabass fillet w garlic soya sauce (100g), JPN tofu w egg white sauce & mix veg, seafood ngoh hiang (½ piece), nai bai w garlic", price: 10 },
  { name: "Set H", title: "Avocado Grain Bowl (Vegetarian)", desc: "Red-brown rice or wholegrain mushroom olio (180g), avocado (½ piece), roasted pumpkin, purple slaw, corn & edamame, cherry tomatoes, olive oil dressing", price: 10 },
];

let sql = `-- Phase 1: Create Tables
CREATE TABLE IF NOT EXISTS menu_packages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tab text NOT NULL CHECK (tab IN ('buffet', 'bento', 'connect', 'refreshments')),
  name text NOT NULL,
  price numeric,
  price_label text,
  courses text,
  min_pax int,
  is_popular boolean DEFAULT false,
  sort_order int DEFAULT 0,
  description text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS menu_categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  package_id uuid REFERENCES menu_packages(id) ON DELETE CASCADE,
  label text NOT NULL,
  sort_order int DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS menu_dishes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id uuid REFERENCES menu_categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  sort_order int DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Phase 2: Seed Database
DO $$
DECLARE
  pkg_id uuid;
  cat_id uuid;
BEGIN
`;

// Buffet
buffetPackages.forEach((pkg, p_idx) => {
  sql += `
  INSERT INTO menu_packages (tab, name, price, price_label, courses, min_pax, is_popular, sort_order)
  VALUES ('buffet', '${escapeSql(pkg.name)}', ${pkg.price}, '/pax', '${pkg.courses}', ${pkg.minPax}, ${pkg.popular}, ${p_idx + 1})
  RETURNING id INTO pkg_id;
`;
  pkg.categories.forEach((cat, c_idx) => {
    sql += `
    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, '${escapeSql(cat.label)}', ${c_idx + 1})
    RETURNING id INTO cat_id;
`;
    cat.items.forEach((item, i_idx) => {
      sql += `
      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, '${escapeSql(item)}', ${i_idx + 1});
`;
    });
  });
});

// Bento
bentoSets.forEach((set, s_idx) => {
  sql += `
  INSERT INTO menu_packages (tab, name, price, price_label, min_pax, description, sort_order)
  VALUES ('bento', '${escapeSql(set.name)}: ${escapeSql(set.title)}', ${set.price}, '/pax', 10, '${escapeSql(set.desc)}', ${s_idx + 1});
`;
});

// Connect
sql += `
  INSERT INTO menu_packages (tab, name, price, price_label, courses, min_pax, sort_order)
  VALUES ('connect', 'Connect Takeaway Menu', 18.80, '/pax', '8 Courses', 15, 1)
  RETURNING id INTO pkg_id;
`;
connectCategories.forEach((cat, c_idx) => {
  sql += `
    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, '${escapeSql(cat.label)}', ${c_idx + 1})
    RETURNING id INTO cat_id;
`;
  cat.items.forEach((item, i_idx) => {
    sql += `
      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, '${escapeSql(item)}', ${i_idx + 1});
`;
  });
});

// Refreshments
sql += `
  INSERT INTO menu_packages (tab, name, min_pax, sort_order)
  VALUES ('refreshments', 'Refreshments Menu', 20, 1)
  RETURNING id INTO pkg_id;
`;
refreshmentCategories.forEach((cat, c_idx) => {
  sql += `
    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, '${escapeSql(cat.label)}', ${c_idx + 1})
    RETURNING id INTO cat_id;
`;
  cat.items.forEach((item, i_idx) => {
    sql += `
      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, '${escapeSql(item)}', ${i_idx + 1});
`;
  });
});

sql += `
END $$;
`;

fs.writeFileSync('supabase_migration.sql', sql);
console.log('Generated supabase_migration.sql');
