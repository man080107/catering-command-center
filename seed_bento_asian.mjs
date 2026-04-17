import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://topmieumaassnheevtth.supabase.co";
const supabaseKey = "sb_publishable_V4YqgzXz5dcNatLUkwK7hQ_6y5a7JtE";
const supabase = createClient(supabaseUrl, supabaseKey);

const bentoAsianSets = [
  { tab: "bento_asian", name: "Set 1 - Ayam Penyet (Boneless) Chicken Set", price: 10, price_label: "/pax", min_pax: 10, description: "Fragrant Rice, Ayam Penyet, Tempeh, Bergedil, Housemade Belacan (Separate), Roasted Cherry Tomato" },
  { tab: "bento_asian", name: "Set 2 - Blue Pea Nasi Lemak (Turmeric Chicken) Set", price: 10, price_label: "/pax", min_pax: 10, description: "Blue Pea Nasi Lemak, Baked Chicken Breast with Signature Turmeric Lemak Sauce, Omelette, Sambal Goreng, Ikan Bilis & Peanut, Nasi Lemak Chili (Separate)" },
  { tab: "bento_asian", name: "Set 3 - Pandan Nasi Lemak (Fried Midwings) Set", price: 10, price_label: "/pax", min_pax: 10, description: "Pandan Nasi Lemak, Fried Chicken Midwings, Muar Fish Otah, Sambal Egg, Stir Fried French Bean, Ikan Bilis & Peanut" },
  { tab: "bento_asian", name: "Set 4 - Nasi Briyani (Mutton Rendang) Set", price: 10, price_label: "/pax", min_pax: 10, description: "Briyani Rice, Mutton Rendang (Mild Spicy), Omelette, Samosa, Brinjal Masala (Mild Spicy)" },
  { tab: "bento_asian", name: "Set 5 - Nasi Briyani (Chicken Rendang) Set", price: 10, price_label: "/pax", min_pax: 10, description: "Briyani Rice, Chicken Rendang (Mild Spicy), Omelette, Samosa, Brinjal Masala (Mild Spicy)" },
  { tab: "bento_asian", name: "Set 6 - Nasi Briyani (Beef Rendang) Set", price: 10, price_label: "/pax", min_pax: 10, description: "Briyani Rice, Beef Rendang (Mild Spicy), Omelette, Samosa, Brinjal Masala (Mild Spicy)" },
  { tab: "bento_asian", name: "Set 7 - Oriental Honey Chicken Rice Set", price: 10, price_label: "/pax", min_pax: 10, description: "Fragrant Rice, Boneless Honey Chicken, Braised Egg, Ngoh Hiang Ball, HK Kailan w Mushroom, Chicken Rice Chili (Mild Spicy)" },
  { tab: "bento_asian", name: "Set 8 - Black Pepper Chicken & Cereal Fish Fillet Set", price: 10, price_label: "/pax", min_pax: 10, description: "Steam White Rice, Black Pepper Chicken, Cereal Fish Fillet, Sliced Potato w Sweet Thai Chili, HK Chye Sim" },
  { tab: "bento_asian", name: "Set 9 - Nasi Goreng Kampung w Ayam Masak Kicap", price: 10, price_label: "/pax", min_pax: 10, description: "Nasi Goreng Kampung, Ayam Masak Kicap, Sambal Potato, Baby Kailan w Oyster Sauce" },
  { tab: "bento_asian", name: "Set 10 - Ayam Berlado Set", price: 10, price_label: "/pax", min_pax: 10, description: "Steam White Rice, Ayam Berlado, Potato Bergedil, Omelette, Stir Fried Sambal Ladies Finger" },
  { tab: "bento_asian", name: "Set 11 - Ayam Masak Merah", price: 10, price_label: "/pax", min_pax: 10, description: "Steam White Rice, Ayam Masak Merah, Breaded Fish Fillet, Omelette, Stir Fried Sambal Petai w Eggplant" },
  { tab: "bento_asian", name: "Set 12 - Beef Masak Kandar w Nasi Minyak Set", price: 10, price_label: "/pax", min_pax: 10, description: "Nasi Minyak, Beef Masak Kandar, Potato Samosa, Sambal Egg, Stir Fried Cabbage" },
  { tab: "bento_asian", name: "Set 13 - Turmeric Seabass Fillet Set", price: 10, price_label: "/pax", min_pax: 10, description: "Steam White Rice, Baked Seabass with Signature Turmeric Lemak Sauce, Omelette, JPN Tofu w Egg White Sauce & Mixed Vegetables, Baby Kailan w Oyster Sauce" },
  { tab: "bento_asian", name: "Set 14 - Prawn Paste Chicken & Sweet & Sour Fish Set", price: 10, price_label: "/pax", min_pax: 10, description: "Steam White Rice, Prawn Paste Chicken Midwing, Sweet & Sour Fish w Capsicum & Pineapple, Braised Potato, Broccoli w Mushroom" },
  { tab: "bento_asian", name: "Set 15 - Butter Chicken w Nasi Minyak Set", price: 10, price_label: "/pax", min_pax: 10, description: "Nasi Minyak, Butter Chicken Masala (Mild Spicy), Egg Kurma (Mild Spicy), Samosa, Long Bean Masala (Mild Spicy)" },
  { tab: "bento_asian", name: "Set 16 - Black Pepper Vegetarian (Plant-Based Meat) Set", price: 10, price_label: "/pax", min_pax: 10, description: "Vegetarian Long Bean Fried Rice, Black Pepper Plant-based Meat w Capsicum, Braised Potato, HK Chye Sim" },
  { tab: "bento_asian", name: "Set 17 - Turmeric Vegetarian (Plant-Based Meat) Set", price: 10, price_label: "/pax", min_pax: 10, description: "Vegetarian Sambal Fried Rice, Signature Turmeric Lemak Sauce w Plant-based Meat, Breaded Pumpkin, Broccoli w Mushroom" },
  { tab: "bento_asian", name: "Set 18 - Sweet & Sour Vegetarian (Plant-Based Meat) Set", price: 10, price_label: "/pax", min_pax: 10, description: "Vegetarian Olive Fried Rice, Sweet & Sour Plant-based Meat w Capsicum & Pineapple, HK Kailan w Mushroom, Crispy Soya Skin" }
];

async function seed() {
  console.log("Seeding Bento Asian packages...");

  // Delete existing just in case
  await supabase.from("menu_packages").delete().eq("tab", "bento_asian");

  const records = bentoAsianSets.map((set, i) => ({
    ...set,
    sort_order: i + 1
  }));

  const { error } = await supabase.from("menu_packages").insert(records);
  
  if (error) {
    console.error("Error inserting packages:", error);
  } else {
    console.log("Inserted Bento Asian packages successfully.");
  }
}

seed();
