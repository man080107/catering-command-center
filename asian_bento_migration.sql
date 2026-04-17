-- 1. Drop the old check constraint on tab
ALTER TABLE menu_packages DROP CONSTRAINT IF EXISTS menu_packages_tab_check;

-- 2. Add the new check constraint that includes 'bento_asian'
ALTER TABLE menu_packages ADD CONSTRAINT menu_packages_tab_check 
CHECK (tab IN ('buffet', 'bento', 'connect', 'refreshments', 'bento_asian'));

-- 3. Insert the 18 new Bento - Asian/Local Favourites datasets
INSERT INTO menu_packages (tab, name, price, price_label, min_pax, description, sort_order)
VALUES 
  ('bento_asian', 'Set 1 - Ayam Penyet (Boneless) Chicken Set', 10, '/pax', 10, 'Fragrant Rice, Ayam Penyet, Tempeh, Bergedil, Housemade Belacan (Separate), Roasted Cherry Tomato', 1),
  ('bento_asian', 'Set 2 - Blue Pea Nasi Lemak (Turmeric Chicken) Set', 10, '/pax', 10, 'Blue Pea Nasi Lemak, Baked Chicken Breast with Signature Turmeric Lemak Sauce, Omelette, Sambal Goreng, Ikan Bilis & Peanut, Nasi Lemak Chili (Separate)', 2),
  ('bento_asian', 'Set 3 - Pandan Nasi Lemak (Fried Midwings) Set', 10, '/pax', 10, 'Pandan Nasi Lemak, Fried Chicken Midwings, Muar Fish Otah, Sambal Egg, Stir Fried French Bean, Ikan Bilis & Peanut', 3),
  ('bento_asian', 'Set 4 - Nasi Briyani (Mutton Rendang) Set', 10, '/pax', 10, 'Briyani Rice, Mutton Rendang (Mild Spicy), Omelette, Samosa, Brinjal Masala (Mild Spicy)', 4),
  ('bento_asian', 'Set 5 - Nasi Briyani (Chicken Rendang) Set', 10, '/pax', 10, 'Briyani Rice, Chicken Rendang (Mild Spicy), Omelette, Samosa, Brinjal Masala (Mild Spicy)', 5),
  ('bento_asian', 'Set 6 - Nasi Briyani (Beef Rendang) Set', 10, '/pax', 10, 'Briyani Rice, Beef Rendang (Mild Spicy), Omelette, Samosa, Brinjal Masala (Mild Spicy)', 6),
  ('bento_asian', 'Set 7 - Oriental Honey Chicken Rice Set', 10, '/pax', 10, 'Fragrant Rice, Boneless Honey Chicken, Braised Egg, Ngoh Hiang Ball, HK Kailan w Mushroom, Chicken Rice Chili (Mild Spicy)', 7),
  ('bento_asian', 'Set 8 - Black Pepper Chicken & Cereal Fish Fillet Set', 10, '/pax', 10, 'Steam White Rice, Black Pepper Chicken, Cereal Fish Fillet, Sliced Potato w Sweet Thai Chili, HK Chye Sim', 8),
  ('bento_asian', 'Set 9 - Nasi Goreng Kampung w Ayam Masak Kicap', 10, '/pax', 10, 'Nasi Goreng Kampung, Ayam Masak Kicap, Sambal Potato, Baby Kailan w Oyster Sauce', 9),
  ('bento_asian', 'Set 10 - Ayam Berlado Set', 10, '/pax', 10, 'Steam White Rice, Ayam Berlado, Potato Bergedil, Omelette, Stir Fried Sambal Ladies Finger', 10),
  ('bento_asian', 'Set 11 - Ayam Masak Merah', 10, '/pax', 10, 'Steam White Rice, Ayam Masak Merah, Breaded Fish Fillet, Omelette, Stir Fried Sambal Petai w Eggplant', 11),
  ('bento_asian', 'Set 12 - Beef Masak Kandar w Nasi Minyak Set', 10, '/pax', 10, 'Nasi Minyak, Beef Masak Kandar, Potato Samosa, Sambal Egg, Stir Fried Cabbage', 12),
  ('bento_asian', 'Set 13 - Turmeric Seabass Fillet Set', 10, '/pax', 10, 'Steam White Rice, Baked Seabass with Signature Turmeric Lemak Sauce, Omelette, JPN Tofu w Egg White Sauce & Mixed Vegetables, Baby Kailan w Oyster Sauce', 13),
  ('bento_asian', 'Set 14 - Prawn Paste Chicken & Sweet & Sour Fish Set', 10, '/pax', 10, 'Steam White Rice, Prawn Paste Chicken Midwing, Sweet & Sour Fish w Capsicum & Pineapple, Braised Potato, Broccoli w Mushroom', 14),
  ('bento_asian', 'Set 15 - Butter Chicken w Nasi Minyak Set', 10, '/pax', 10, 'Nasi Minyak, Butter Chicken Masala (Mild Spicy), Egg Kurma (Mild Spicy), Samosa, Long Bean Masala (Mild Spicy)', 15),
  ('bento_asian', 'Set 16 - Black Pepper Vegetarian (Plant-Based Meat) Set', 10, '/pax', 10, 'Vegetarian Long Bean Fried Rice, Black Pepper Plant-based Meat w Capsicum, Braised Potato, HK Chye Sim', 16),
  ('bento_asian', 'Set 17 - Turmeric Vegetarian (Plant-Based Meat) Set', 10, '/pax', 10, 'Vegetarian Sambal Fried Rice, Signature Turmeric Lemak Sauce w Plant-based Meat, Breaded Pumpkin, Broccoli w Mushroom', 17),
  ('bento_asian', 'Set 18 - Sweet & Sour Vegetarian (Plant-Based Meat) Set', 10, '/pax', 10, 'Vegetarian Olive Fried Rice, Sweet & Sour Plant-based Meat w Capsicum & Pineapple, HK Kailan w Mushroom, Crispy Soya Skin', 18);
