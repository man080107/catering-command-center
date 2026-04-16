-- Phase 1: Create Tables
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

  INSERT INTO menu_packages (tab, name, price, price_label, courses, min_pax, is_popular, sort_order)
  VALUES ('buffet', 'Bronze', 16.8, '/pax', '8 Courses', 30, false, 1)
  RETURNING id INTO pkg_id;

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Premium (Pick 1)', 1)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Breaded Prawn with Wasabi Mayo', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'House Special Mutton Rendang', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'De-shell Prawn with Chilli Crab-Less Sauce – Served with Golden Mantou', 3);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Chicken (Pick 1)', 2)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Signature Curry Chicken with Potato', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Shrimp Paste Chicken (Midwings)', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Fragrant Salted Egg Yolk Chicken', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Kam Hiong Chicken', 4);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Fish (Pick 1)', 3)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Cereal Fish Fillet', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Sweet & Sour Fish Fillet', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Assam Fish Fillet with Ladies Finger, Brinjal & Tomato', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Golden Fish Fillet with Wasabi Mayo', 4);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Side (Pick 1)', 4)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Black Pepper Kingcrab Ball', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Japanese Egg Beancurd with Chicken Mince', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Crispy Fried Zai Er', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Seafood Ngoh Hiang with House Special Sambal', 4);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Vegetable (Pick 1)', 5)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Broccoli with Mushroom', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Roasted Mix Vegetable', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Stir Fried Long Bean with Carrot', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Curry Mix Vegetable (Sayur Lodeh)', 4);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Staple (Pick 1)', 6)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Yang Zhou Fried Rice', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Fragrant Olive Fried Rice', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Hong Kong Fried Bee Hoon', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Stir Fried Kway Teow', 4);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Dessert (Pick 1)', 7)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Cold Cheng Tng', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Honeydew Sago', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Honey Sea Coconut with Longan', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Bobo Chacha (+$0.20/pax)', 4);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Drinks (Pick 1)', 8)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Mixed Fruit', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Orange', 2);

  INSERT INTO menu_packages (tab, name, price, price_label, courses, min_pax, is_popular, sort_order)
  VALUES ('buffet', 'Silver', 18.8, '/pax', '9 Courses', 30, true, 2)
  RETURNING id INTO pkg_id;

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Premium (Pick 1)', 1)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Salted Egg Renkon (Lotus) Chips', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Breaded Prawn with Wasabi Mayonnaise', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'House Special Mutton Rendang', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'De-shell Prawn with Chilli Crab-Less Sauce – Served with Golden Mantou', 4);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Dim Sum (Pick 1)', 2)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Golden Sweet Potato Roll', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Prawn Har Gao', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Chicken Siew Mai', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Stuffed You Tiao with Mayonnaise', 4);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Chicken (Pick 1)', 3)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Signature Curry Chicken with Potato', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Butter Chicken Masala', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Fragrant Salted Egg Yolk Chicken', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Shrimp Paste Chicken (Midwings)', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Cajun Boneless Chicken', 5);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Fish (Pick 1)', 4)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Cereal Fish Fillet', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Sweet & Sour Fish Fillet', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Assam Fish Fillet with Ladies Finger, Brinjal & Tomato', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Golden Fish Fillet with Wasabi Mayo', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Steam Seabass Fillet w Premium Garlic Soya Sauce', 5);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Side (Pick 1)', 5)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Black Pepper Kingcrab Ball', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Japanese Egg Beancurd with Chicken Mince', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Crispy Fried Zai Er', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Seaweed Crispy Chicken', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Seafood Ngoh Hiang with House Special Sambal', 5);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Vegetable (Pick 1)', 6)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Broccoli with Mushroom', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Roasted Mix Vegetable', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Nonya Chap Chai', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Curry Mix Vegetable (Sayur Lodeh)', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Stir Fried Long Bean with Carrot', 5);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Staple (Pick 1)', 7)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Yang Zhou Fried Rice', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Fragrant Olive Fried Rice', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Hong Kong Fried Bee Hoon', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Stir Fried Ee Fu Noodles', 4);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Dessert (Pick 1)', 8)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Cold Cheng Tng', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Honeydew/Mango Sago', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Honey Sea Coconut with Longan', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Bobo Chacha', 4);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Drinks (Pick 1)', 9)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Mixed Fruit', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Orange', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Peach Oolong Tea', 3);

  INSERT INTO menu_packages (tab, name, price, price_label, courses, min_pax, is_popular, sort_order)
  VALUES ('buffet', 'Gold', 21.8, '/pax', '10 Courses', 30, false, 3)
  RETURNING id INTO pkg_id;

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Premium (Pick 2)', 1)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Salted Egg Renkon (Lotus) Chips', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Breaded Prawn with Wasabi Mayo', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'House Special Mutton Rendang', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'De-shell Prawn with Chilli Crab-Less Sauce – Served with Golden Mantou', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Chicken Satay with Peanut Sauce', 5);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Chef''s Special Chicken Shepherd''s Pie', 6);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Dim Sum (Pick 1)', 2)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Golden Sweet Potato Roll', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Chicken Siew Mai', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Shrimp Har Gao', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Stuffed You Tiao w Mayonnaise', 4);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Chicken (Pick 1)', 3)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Signature Curry Chicken with Potato', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Butter Chicken Masala', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Grilled Chicken Yakitori with Roasted Sesame', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Fragrant Salted Egg Yolk Chicken', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Shrimp Paste Chicken Drumlet', 5);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Oriental BBQ (Char Siew) Chicken', 6);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Fish (Pick 1)', 4)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Cereal Fish Fillet', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Sweet & Sour Fish Fillet', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Assam Fish Fillet with Ladies Finger, Brinjal & Tomato', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Steam Seabass Fillet with Premium Garlic Soya', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Norwegian Salmon with Teriyaki Sauce (+$1.20/pax)', 5);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Side (Pick 1)', 5)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Black Pepper Kingcrab Ball', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Japanese Egg Beancurd with Chicken Mince', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Crispy Fried Zai Er', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Seaweed Crispy Chicken', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Seafood Ngoh Hiang with House Sambal', 5);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Vegetable (Pick 1)', 6)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Broccoli with Mushroom', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'HK Kai Lan with Carrot', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Nonya Chap Chai', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Roasted Mix Vegetable', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Stir Fried French Bean w Carrot', 5);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Staple (Pick 1)', 7)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Yang Zhou Fried Rice', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Fragrant Olive Fried Rice', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Hong Kong Fried Bee Hoon', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Stir Fried Ee Fu Noodles', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Spaghetti Mushroom Olio', 5);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Dessert (Pick 1)', 8)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Cold Cheng Tng', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Bobo Chacha', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Honeydew/Mango Sago', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Honey Sea Coconut with Longan', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Aiyu Jelly with Mix Cocktail', 5);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Drinks (Pick 1)', 9)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Mixed Fruit', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Orange', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Peach Oolong Tea', 3);

  INSERT INTO menu_packages (tab, name, price, price_label, min_pax, description, sort_order)
  VALUES ('bento', 'Set A: Baked Chicken Yakitori w Rice', 10, '/pax', 10, 'Red-brown rice (180g), grilled chicken yakitori (4 sticks, 110g), steam egg, sautéed corn & edamame, Japanese cucumber & pickle (daikon)', 1);

  INSERT INTO menu_packages (tab, name, price, price_label, min_pax, description, sort_order)
  VALUES ('bento', 'Set B: Sous-vide Chicken Breast Grain Bowl', 10, '/pax', 10, 'Red-brown rice (180g), sous-vide chicken breast (120g), 63° sous-vide egg, purple slaw, corn & edamame, cherry tomatoes, sesame dressing', 2);

  INSERT INTO menu_packages (tab, name, price, price_label, min_pax, description, sort_order)
  VALUES ('bento', 'Set C: Truffle Soy Salmon w Mushroom Olio Pasta', 10, '/pax', 10, 'Wholegrain spaghetti mushroom olio (180g), salmon w signature truffle soy sauce (90g), pumpkin croquette, roasted mix veg w new potato, cherry tomatoes', 3);

  INSERT INTO menu_packages (tab, name, price, price_label, min_pax, description, sort_order)
  VALUES ('bento', 'Set D: Sous-vide Chicken w Tomato Bolognese Pasta', 10, '/pax', 10, 'Wholegrain spaghetti w tomato chicken bolognese (180g), sous-vide chicken breast (100g), sous-vide egg, roasted mix veg w new potato', 4);

  INSERT INTO menu_packages (tab, name, price, price_label, min_pax, description, sort_order)
  VALUES ('bento', 'Set E: Torched Salmon w Olive Fried Rice', 10, '/pax', 10, 'Olive red-brown fried rice (180g), torched salmon w chef sauce (mildly spicy, 90g), sous-vide egg, roasted pumpkin, sautéed edamame, Japanese cucumber & pickle', 5);

  INSERT INTO menu_packages (tab, name, price, price_label, min_pax, description, sort_order)
  VALUES ('bento', 'Set F: Baked Char Siew Chicken Leg w Fragrant Rice', 10, '/pax', 10, 'Fragrant red-white-mix rice (180g), baked boneless chicken leg w char siew sauce (120g), braised hardboil egg, oyster sauce xiao bai chye, cucumber & chili', 6);

  INSERT INTO menu_packages (tab, name, price, price_label, min_pax, description, sort_order)
  VALUES ('bento', 'Set G: Steam Seabass Fillet w Rice', 10, '/pax', 10, 'Red-white-mix rice (180g), steam seabass fillet w garlic soya sauce (100g), JPN tofu w egg white sauce & mix veg, seafood ngoh hiang (½ piece), nai bai w garlic', 7);

  INSERT INTO menu_packages (tab, name, price, price_label, min_pax, description, sort_order)
  VALUES ('bento', 'Set H: Avocado Grain Bowl (Vegetarian)', 10, '/pax', 10, 'Red-brown rice or wholegrain mushroom olio (180g), avocado (½ piece), roasted pumpkin, purple slaw, corn & edamame, cherry tomatoes, olive oil dressing', 8);

  INSERT INTO menu_packages (tab, name, price, price_label, courses, min_pax, sort_order)
  VALUES ('connect', 'Connect Takeaway Menu', 18.80, '/pax', '8 Courses', 15, 1)
  RETURNING id INTO pkg_id;

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Premium (Select 1)', 1)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Breaded Prawn with Wasabi Mayo', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Salted Egg Renkon (Lotus) Chips', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'House Special Mutton Rendang', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'House Special Beef Rendang', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Stir Fried Black Pepper Slice Beef', 5);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Stir Fried Sweet & Spicy Prawn (de-shell)', 6);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Chicken (Select 1)', 2)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Signature Curry Chicken w Potato', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'House Special Butter Chicken Masala', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Fragrant Honey Boneless Chicken Cube', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Oriental BBQ Boneless Chicken Leg', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Grilled Chicken Yakitori with Roasted Sesame', 5);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Fish (Select 1)', 3)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Cereal Fish Fillet', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Sweet & Sour Fish Fillet', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Steam Seabass Fillet (Teochew Style)', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Steam Seabass Fillet (Nonya Sauce)', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Norwegian Teriyaki Salmon (+$1)', 5);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Sides (Select 2)', 4)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Black Pepper Kingcrab Ball', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Japanese Egg Beancurd with Chicken Mince', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Egg Omelette', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Seafood Ngoh Hiang with House Special Sambal', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Seaweed Crispy Chicken', 5);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Stir Fried Slice Potato w Sweet Chili Sauce', 6);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Golden Crispy Zai Er', 7);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Vegetable (Select 1)', 5)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Broccoli with Mushroom', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Roasted Cajun Mixed Vegetables', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Stir Fried Nai Bai w Garlic', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Stir Fried Xiao Bai Cai with Carrot', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Nonya Chap Chai', 5);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Curry Mix Vegetable', 6);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Staple (Select 1)', 6)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Yangzhou Fried Rice', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Fragrant Olive Fried Rice', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Signature Stir Fried Bee Hoon', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'House Special Nasi Briyani w Papadum (+$1.00)', 4);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Dessert (Select 1)', 7)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Cold Cheng Tng', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Aiyu Jelly w Mix Cocktail', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Bobo Chacha, Hot (+$0.50)', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Mango Sago', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Honeydew Sago', 5);

  INSERT INTO menu_packages (tab, name, min_pax, sort_order)
  VALUES ('refreshments', 'Refreshments Menu', 20, 1)
  RETURNING id INTO pkg_id;

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Sandwich / Salad', 1)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Mini Egg/Tuna Mayo Sandwich', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Mini Egg/Tuna Mayo Croissant', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Potato Salad', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Mesclun Salad Mix w Roasted Yuzu Sesame Dressing', 4);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Dim Sum / Sides', 2)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Samosa (Big) (V)', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Chicken Siew Mai', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Seaweed Chicken', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Golden Chicken Ball', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Grilled Chicken Yakitori', 5);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Ngoh Hiang Ball', 6);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Golden Fishball', 7);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Seafood Ngoh Hiang Roll', 8);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Fried Kingcrab Ball', 9);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Fried Wanton', 10);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Springroll (Big) (V)', 11);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Breaded Pumpkin Croquette (V)', 12);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Breaded Potato Croquette', 13);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Staple', 3)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Century Egg & Chicken Mince Porridge', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Stir Fried Bee Hoon', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Stir Fried Kway Teow', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Stir Fried Dry Laksa', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Pineapple Fried Rice', 5);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Olive Fried Rice', 6);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Yang Zhou Fried Rice', 7);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Sweets', 4)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Mini Brownie', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Mini Red Velvet Cake', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Mini Assorted Muffin', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Assorted Cut Fruits', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Mango Sago', 5);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Aiyu Jelly w Mix Fruit Cocktail', 6);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Cold Cheng Tng', 7);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Bobo Cha Cha (Hot)', 8);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Green Bean Sago (Hot)', 9);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Pilut Hitam (Hot)', 10);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Drinks', 5)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Fruit Punch', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Refreshing Orange', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Coffee w Sugar & Creamer', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Tea w Sugar & Creamer', 4);

    INSERT INTO menu_categories (package_id, label, sort_order)
    VALUES (pkg_id, 'Mini Don Bowls', 6)
    RETURNING id INTO cat_id;

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Torched Salmon Don', 1);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Grilled Unagi Don', 2);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Grilled Chicken Yakitori Don', 3);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Truffle Beef Don', 4);

      INSERT INTO menu_dishes (category_id, name, sort_order)
      VALUES (cat_id, 'Avocado (V)', 5);

END $$;
