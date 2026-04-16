import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

const tabs = ["Buffet Packages", "Bento Sets", "Connect Takeaway", "Refreshments"];

/* ──────────────────────── BUFFET ──────────────────────── */
const buffetPackages = [
  {
    name: "Bronze",
    price: "$16.80",
    courses: "8 Courses",
    minPax: "Min 30 pax",
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
    price: "$18.80",
    courses: "9 Courses",
    minPax: "Min 30 pax",
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
    price: "$21.80",
    courses: "10 Courses",
    minPax: "Min 30 pax",
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

/* ──────────────────────── BENTO ──────────────────────── */
const bentoSets = [
  { name: "Set A", title: "Baked Chicken Yakitori w Rice", desc: "Red-brown rice (180g), grilled chicken yakitori (4 sticks, 110g), steam egg, sautéed corn & edamame, Japanese cucumber & pickle (daikon)" },
  { name: "Set B", title: "Sous-vide Chicken Breast Grain Bowl", desc: "Red-brown rice (180g), sous-vide chicken breast (120g), 63° sous-vide egg, purple slaw, corn & edamame, cherry tomatoes, sesame dressing" },
  { name: "Set C", title: "Truffle Soy Salmon w Mushroom Olio Pasta", desc: "Wholegrain spaghetti mushroom olio (180g), salmon w signature truffle soy sauce (90g), pumpkin croquette, roasted mix veg w new potato, cherry tomatoes" },
  { name: "Set D", title: "Sous-vide Chicken w Tomato Bolognese Pasta", desc: "Wholegrain spaghetti w tomato chicken bolognese (180g), sous-vide chicken breast (100g), sous-vide egg, roasted mix veg w new potato" },
  { name: "Set E", title: "Torched Salmon w Olive Fried Rice", desc: "Olive red-brown fried rice (180g), torched salmon w chef sauce (mildly spicy, 90g), sous-vide egg, roasted pumpkin, sautéed edamame, Japanese cucumber & pickle" },
  { name: "Set F", title: "Baked Char Siew Chicken Leg w Fragrant Rice", desc: "Fragrant red-white-mix rice (180g), baked boneless chicken leg w char siew sauce (120g), braised hardboil egg, oyster sauce xiao bai chye, cucumber & chili" },
  { name: "Set G", title: "Steam Seabass Fillet w Rice", desc: "Red-white-mix rice (180g), steam seabass fillet w garlic soya sauce (100g), JPN tofu w egg white sauce & mix veg, seafood ngoh hiang (½ piece), nai bai w garlic" },
  { name: "Set H", title: "Avocado Grain Bowl (Vegetarian)", desc: "Red-brown rice or wholegrain mushroom olio (180g), avocado (½ piece), roasted pumpkin, purple slaw, corn & edamame, cherry tomatoes, olive oil dressing" },
];

/* ──────────────────────── CONNECT TAKEAWAY ──────────────────────── */
const connectCategories = [
  { label: "Premium (Select 1)", items: ["Breaded Prawn with Wasabi Mayo", "Salted Egg Renkon (Lotus) Chips", "House Special Mutton Rendang", "House Special Beef Rendang", "Stir Fried Black Pepper Slice Beef", "Stir Fried Sweet & Spicy Prawn (de-shell)"] },
  { label: "Chicken (Select 1)", items: ["Signature Curry Chicken w Potato", "House Special Butter Chicken Masala", "Fragrant Honey Boneless Chicken Cube", "Oriental BBQ Boneless Chicken Leg", "Grilled Chicken Yakitori with Roasted Sesame"] },
  { label: "Fish (Select 1)", items: ["Cereal Fish Fillet", "Sweet & Sour Fish Fillet", "Steam Seabass Fillet (Teochew Style)", "Steam Seabass Fillet (Nonya Sauce)", "Norwegian Teriyaki Salmon (+$1)"] },
  { label: "Sides (Select 2)", items: ["Black Pepper Kingcrab Ball", "Japanese Egg Beancurd with Chicken Mince", "Egg Omelette", "Seafood Ngoh Hiang with House Special Sambal", "Seaweed Crispy Chicken", "Stir Fried Slice Potato w Sweet Chili Sauce", "Golden Crispy Zai Er"] },
  { label: "Vegetable (Select 1)", items: ["Broccoli with Mushroom", "Roasted Cajun Mixed Vegetables", "Stir Fried Nai Bai w Garlic", "Stir Fried Xiao Bai Cai with Carrot", "Nonya Chap Chai", "Curry Mix Vegetable"] },
  { label: "Staple (Select 1)", items: ["Yangzhou Fried Rice", "Fragrant Olive Fried Rice", "Signature Stir Fried Bee Hoon", "House Special Nasi Briyani w Papadum (+$1.00)"] },
  { label: "Dessert (Select 1)", items: ["Cold Cheng Tng", "Aiyu Jelly w Mix Cocktail", "Bobo Chacha, Hot (+$0.50)", "Mango Sago", "Honeydew Sago"] },
];

/* ──────────────────────── REFRESHMENTS ──────────────────────── */
const refreshmentCategories = [
  { label: "Sandwich / Salad", items: ["Mini Egg/Tuna Mayo Sandwich", "Mini Egg/Tuna Mayo Croissant", "Potato Salad", "Mesclun Salad Mix w Roasted Yuzu Sesame Dressing"] },
  { label: "Dim Sum / Sides", items: ["Samosa (Big) (V)", "Chicken Siew Mai", "Seaweed Chicken", "Golden Chicken Ball", "Grilled Chicken Yakitori", "Ngoh Hiang Ball", "Golden Fishball", "Seafood Ngoh Hiang Roll", "Fried Kingcrab Ball", "Fried Wanton", "Springroll (Big) (V)", "Breaded Pumpkin Croquette (V)", "Breaded Potato Croquette"] },
  { label: "Staple", items: ["Century Egg & Chicken Mince Porridge", "Stir Fried Bee Hoon", "Stir Fried Kway Teow", "Stir Fried Dry Laksa", "Pineapple Fried Rice", "Olive Fried Rice", "Yang Zhou Fried Rice"] },
  { label: "Sweets", items: ["Mini Brownie", "Mini Red Velvet Cake", "Mini Assorted Muffin", "Assorted Cut Fruits", "Mango Sago", "Aiyu Jelly w Mix Fruit Cocktail", "Cold Cheng Tng", "Bobo Cha Cha (Hot)", "Green Bean Sago (Hot)", "Pilut Hitam (Hot)"] },
  { label: "Drinks", items: ["Fruit Punch", "Refreshing Orange", "Coffee w Sugar & Creamer", "Tea w Sugar & Creamer"] },
  { label: "Mini Don Bowls", items: ["Torched Salmon Don", "Grilled Unagi Don", "Grilled Chicken Yakitori Don", "Truffle Beef Don", "Avocado (V)"] },
];

/* ──────────────────────── EXPANDABLE CARD ──────────────────────── */
const BuffetCard = ({ pkg }: { pkg: typeof buffetPackages[0] }) => {
  const [expanded, setExpanded] = useState(false);
  const previewCount = 4;
  const shown = expanded ? pkg.categories : pkg.categories.slice(0, previewCount);

  return (
    <div className={`rounded-xl border p-6 relative flex flex-col ${
      pkg.popular ? "border-primary bg-background shadow-warm" : "border-border bg-background"
    }`}>
      {pkg.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-warm text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-bold font-display text-foreground mb-1">{pkg.name}</h3>
      <p className="text-3xl font-bold text-primary font-display mb-1">
        {pkg.price}<span className="text-base font-normal text-muted-foreground font-body">/pax</span>
      </p>
      <p className="text-sm text-muted-foreground font-body mb-3">{pkg.courses} · {pkg.minPax}</p>
      <hr className="mb-4 border-border" />

      <div className="space-y-3 flex-1">
        {shown.map((cat) => (
          <div key={cat.label}>
            <p className="text-xs font-bold text-primary font-body mb-1">{cat.label}</p>
            <ul className="space-y-1">
              {cat.items.map((item) => (
                <li key={item} className="flex items-start gap-1.5 text-xs font-body text-foreground/80">
                  <Check className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {pkg.categories.length > previewCount && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center gap-1 text-xs font-body text-primary hover:underline mt-3"
        >
          {expanded ? <>Show Less <ChevronUp className="w-3 h-3" /></> : <>View All Courses <ChevronDown className="w-3 h-3" /></>}
        </button>
      )}

      <a
        href="#contact"
        className={`mt-4 block text-center py-3 rounded-lg font-semibold text-sm font-body transition-opacity ${
          pkg.popular
            ? "bg-gradient-warm text-primary-foreground hover:opacity-90"
            : "bg-muted text-foreground hover:bg-muted/80"
        }`}
      >
        Get Quote
      </a>
    </div>
  );
};

/* ──────────────────────── MAIN ──────────────────────── */
const MenuSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="menu" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our <span className="text-gradient-warm">Menu</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Halal-certified dishes crafted with quality ingredients. All prices exclude GST.
          </p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold font-body transition-all ${
                activeTab === i
                  ? "bg-gradient-warm text-primary-foreground shadow-warm"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── BUFFET ── */}
          {activeTab === 0 && (
            <motion.div key="buffet" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
              {buffetPackages.map((pkg) => <BuffetCard key={pkg.name} pkg={pkg} />)}
            </motion.div>
          )}

          {/* ── BENTO ── */}
          {activeTab === 1 && (
            <motion.div key="bento" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full">
                  <span className="text-2xl font-bold font-display text-primary">$10</span>
                  <span className="text-sm font-body text-muted-foreground">/pax · Min 10 sets · Healthier Choice</span>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                {bentoSets.map((set) => (
                  <div key={set.name} className="bg-background rounded-xl border border-border p-5 hover:shadow-card transition-shadow">
                    <span className="text-xs font-bold text-primary font-body">{set.name}</span>
                    <h4 className="font-bold font-display text-foreground mt-1 mb-2 text-sm leading-snug">{set.title}</h4>
                    <p className="text-xs text-muted-foreground font-body leading-relaxed">{set.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-muted-foreground font-body mt-6">
                Includes full cutlery set & serviettes. Food best consumed within 2 hours. Transportation: $10 (excl. GST) for orders under $300.
              </p>
            </motion.div>
          )}

          {/* ── CONNECT TAKEAWAY ── */}
          {activeTab === 2 && (
            <motion.div key="connect" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full">
                  <span className="text-2xl font-bold font-display text-primary">$18.80</span>
                  <span className="text-sm font-body text-muted-foreground">/pax · 8 Courses · Min 15 pax</span>
                </div>
                <p className="text-xs text-muted-foreground font-body mt-2">Option to add self-heating trays @ $25 (whole set)</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {connectCategories.map((cat) => (
                  <div key={cat.label} className="bg-background rounded-xl border border-border p-5">
                    <p className="text-xs font-bold text-primary font-body mb-2">{cat.label}</p>
                    <ul className="space-y-1.5">
                      {cat.items.map((item) => (
                        <li key={item} className="flex items-start gap-1.5 text-xs font-body text-foreground/80">
                          <Check className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-muted-foreground font-body mt-6">
                Includes plates, bowls, cutlery, serving tongs & trash bag. Transportation: $15 (excl. GST).
              </p>
            </motion.div>
          )}

          {/* ── REFRESHMENTS ── */}
          {activeTab === 3 && (
            <motion.div key="refreshments" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-8">
                <p className="text-sm text-muted-foreground font-body">Min 20 pax · Price quoted upon selection</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {refreshmentCategories.map((cat) => (
                  <div key={cat.label} className="bg-background rounded-xl border border-border p-5">
                    <p className="text-xs font-bold text-primary font-body mb-2">{cat.label}</p>
                    <ul className="space-y-1.5">
                      {cat.items.map((item) => (
                        <li key={item} className="flex items-start gap-1.5 text-xs font-body text-foreground/80">
                          <Check className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-muted-foreground font-body mt-6">
                Includes disposable wares, serviettes & garbage bags. Transportation: $15 (excl. GST). Buffet setup & clear up service: $85 (excl. GST).
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground font-body mb-4">
            All buffet packages include warmers, tables, tablecloth & biodegradable disposable wares.
            Transportation & setup: $80 (excl. GST).
          </p>
          <a
            href="#contact"
            className="inline-block bg-gradient-warm text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-warm"
          >
            Request Full Menu
          </a>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
