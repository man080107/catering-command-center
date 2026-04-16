import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const tabs = ["Buffet Packages", "Bento Sets", "Connect Takeaway", "Refreshments"];
const tabKeys = ["buffet", "bento", "connect", "refreshments"];

// Database Types
type Category = { id: string; label: string; items: string[] };
type Package = {
  id: string;
  tab: string;
  name: string;
  price: number | null;
  price_label: string | null;
  courses: string | null;
  min_pax: string | null;
  is_popular: boolean;
  description?: string | null;
  categories: Category[];
};

/* ─────────── HARDCODED FALLBACK DATA ─────────── */
const fallbackBuffet: Package[] = [
  {
    id: "fb-bronze", tab: "buffet", name: "Bronze", price: 16.80, price_label: "/pax",
    courses: "8 Courses", min_pax: "Min 30 pax", is_popular: false,
    categories: [
      { id: "c1", label: "Premium (Pick 1)", items: ["Breaded Prawn with Wasabi Mayo", "House Special Mutton Rendang", "De-shell Prawn with Chilli Crab-Less Sauce – Served with Golden Mantou"] },
      { id: "c2", label: "Chicken (Pick 1)", items: ["Signature Curry Chicken with Potato", "Shrimp Paste Chicken (Midwings)", "Fragrant Salted Egg Yolk Chicken", "Kam Hiong Chicken"] },
      { id: "c3", label: "Fish (Pick 1)", items: ["Cereal Fish Fillet", "Sweet & Sour Fish Fillet", "Assam Fish Fillet with Ladies Finger, Brinjal & Tomato", "Golden Fish Fillet with Wasabi Mayo"] },
      { id: "c4", label: "Side (Pick 1)", items: ["Black Pepper Kingcrab Ball", "Japanese Egg Beancurd with Chicken Mince", "Crispy Fried Zai Er", "Seafood Ngoh Hiang with House Special Sambal"] },
      { id: "c5", label: "Vegetable (Pick 1)", items: ["Broccoli with Mushroom", "Roasted Mix Vegetable", "Stir Fried Long Bean with Carrot", "Curry Mix Vegetable (Sayur Lodeh)"] },
      { id: "c6", label: "Staple (Pick 1)", items: ["Yang Zhou Fried Rice", "Fragrant Olive Fried Rice", "Hong Kong Fried Bee Hoon", "Stir Fried Kway Teow"] },
      { id: "c7", label: "Dessert (Pick 1)", items: ["Cold Cheng Tng", "Honeydew Sago", "Honey Sea Coconut with Longan", "Bobo Chacha (+$0.20/pax)"] },
      { id: "c8", label: "Drinks (Pick 1)", items: ["Mixed Fruit", "Orange"] },
    ],
  },
  {
    id: "fb-silver", tab: "buffet", name: "Silver", price: 18.80, price_label: "/pax",
    courses: "9 Courses", min_pax: "Min 30 pax", is_popular: true,
    categories: [
      { id: "s1", label: "Premium (Pick 1)", items: ["Salted Egg Renkon (Lotus) Chips", "Breaded Prawn with Wasabi Mayonnaise", "House Special Mutton Rendang", "De-shell Prawn with Chilli Crab-Less Sauce – Served with Golden Mantou"] },
      { id: "s2", label: "Dim Sum (Pick 1)", items: ["Golden Sweet Potato Roll", "Prawn Har Gao", "Chicken Siew Mai", "Stuffed You Tiao with Mayonnaise"] },
      { id: "s3", label: "Chicken (Pick 1)", items: ["Signature Curry Chicken with Potato", "Butter Chicken Masala", "Fragrant Salted Egg Yolk Chicken", "Shrimp Paste Chicken (Midwings)", "Cajun Boneless Chicken"] },
      { id: "s4", label: "Fish (Pick 1)", items: ["Cereal Fish Fillet", "Sweet & Sour Fish Fillet", "Assam Fish Fillet with Ladies Finger, Brinjal & Tomato", "Golden Fish Fillet with Wasabi Mayo", "Steam Seabass Fillet w Premium Garlic Soya Sauce"] },
      { id: "s5", label: "Side (Pick 1)", items: ["Black Pepper Kingcrab Ball", "Japanese Egg Beancurd with Chicken Mince", "Crispy Fried Zai Er", "Seaweed Crispy Chicken", "Seafood Ngoh Hiang with House Special Sambal"] },
      { id: "s6", label: "Vegetable (Pick 1)", items: ["Broccoli with Mushroom", "Roasted Mix Vegetable", "Nonya Chap Chai", "Curry Mix Vegetable (Sayur Lodeh)", "Stir Fried Long Bean with Carrot"] },
      { id: "s7", label: "Staple (Pick 1)", items: ["Yang Zhou Fried Rice", "Fragrant Olive Fried Rice", "Hong Kong Fried Bee Hoon", "Stir Fried Ee Fu Noodles"] },
      { id: "s8", label: "Dessert (Pick 1)", items: ["Cold Cheng Tng", "Honeydew/Mango Sago", "Honey Sea Coconut with Longan", "Bobo Chacha"] },
      { id: "s9", label: "Drinks (Pick 1)", items: ["Mixed Fruit", "Orange", "Peach Oolong Tea"] },
    ],
  },
  {
    id: "fb-gold", tab: "buffet", name: "Gold", price: 21.80, price_label: "/pax",
    courses: "10 Courses", min_pax: "Min 30 pax", is_popular: false,
    categories: [
      { id: "g1", label: "Premium (Pick 2)", items: ["Salted Egg Renkon (Lotus) Chips", "Breaded Prawn with Wasabi Mayo", "House Special Mutton Rendang", "De-shell Prawn with Chilli Crab-Less Sauce – Served with Golden Mantou", "Chicken Satay with Peanut Sauce", "Chef's Special Chicken Shepherd's Pie"] },
      { id: "g2", label: "Dim Sum (Pick 1)", items: ["Golden Sweet Potato Roll", "Chicken Siew Mai", "Shrimp Har Gao", "Stuffed You Tiao w Mayonnaise"] },
      { id: "g3", label: "Chicken (Pick 1)", items: ["Signature Curry Chicken with Potato", "Butter Chicken Masala", "Grilled Chicken Yakitori with Roasted Sesame", "Fragrant Salted Egg Yolk Chicken", "Shrimp Paste Chicken Drumlet", "Oriental BBQ (Char Siew) Chicken"] },
      { id: "g4", label: "Fish (Pick 1)", items: ["Cereal Fish Fillet", "Sweet & Sour Fish Fillet", "Assam Fish Fillet with Ladies Finger, Brinjal & Tomato", "Steam Seabass Fillet with Premium Garlic Soya", "Norwegian Salmon with Teriyaki Sauce (+$1.20/pax)"] },
      { id: "g5", label: "Side (Pick 1)", items: ["Black Pepper Kingcrab Ball", "Japanese Egg Beancurd with Chicken Mince", "Crispy Fried Zai Er", "Seaweed Crispy Chicken", "Seafood Ngoh Hiang with House Sambal"] },
      { id: "g6", label: "Vegetable (Pick 1)", items: ["Broccoli with Mushroom", "HK Kai Lan with Carrot", "Nonya Chap Chai", "Roasted Mix Vegetable", "Stir Fried French Bean w Carrot"] },
      { id: "g7", label: "Staple (Pick 1)", items: ["Yang Zhou Fried Rice", "Fragrant Olive Fried Rice", "Hong Kong Fried Bee Hoon", "Stir Fried Ee Fu Noodles", "Spaghetti Mushroom Olio"] },
      { id: "g8", label: "Dessert (Pick 1)", items: ["Cold Cheng Tng", "Bobo Chacha", "Honeydew/Mango Sago", "Honey Sea Coconut with Longan", "Aiyu Jelly with Mix Cocktail"] },
      { id: "g9", label: "Drinks (Pick 1)", items: ["Mixed Fruit", "Orange", "Peach Oolong Tea"] },
    ],
  },
];

const fallbackBentoSets: Package[] = [
  { id: "b1", tab: "bento", name: "Set A: Baked Chicken Yakitori w Rice", price: 10, price_label: "/pax", courses: null, min_pax: "Min 10 sets", is_popular: false, description: "Red-brown rice (180g), grilled chicken yakitori (4 sticks, 110g), steam egg, sautéed corn & edamame, Japanese cucumber & pickle (daikon)", categories: [] },
  { id: "b2", tab: "bento", name: "Set B: Sous-vide Chicken Breast Grain Bowl", price: 10, price_label: "/pax", courses: null, min_pax: "Min 10 sets", is_popular: false, description: "Red-brown rice (180g), sous-vide chicken breast (120g), 63° sous-vide egg, purple slaw, corn & edamame, cherry tomatoes, sesame dressing", categories: [] },
  { id: "b3", tab: "bento", name: "Set C: Truffle Soy Salmon w Mushroom Olio Pasta", price: 10, price_label: "/pax", courses: null, min_pax: "Min 10 sets", is_popular: false, description: "Wholegrain spaghetti mushroom olio (180g), salmon w signature truffle soy sauce (90g), pumpkin croquette, roasted mix veg w new potato, cherry tomatoes", categories: [] },
  { id: "b4", tab: "bento", name: "Set D: Sous-vide Chicken w Tomato Bolognese Pasta", price: 10, price_label: "/pax", courses: null, min_pax: "Min 10 sets", is_popular: false, description: "Wholegrain spaghetti w tomato chicken bolognese (180g), sous-vide chicken breast (100g), sous-vide egg, roasted mix veg w new potato", categories: [] },
  { id: "b5", tab: "bento", name: "Set E: Torched Salmon w Olive Fried Rice", price: 10, price_label: "/pax", courses: null, min_pax: "Min 10 sets", is_popular: false, description: "Olive red-brown fried rice (180g), torched salmon w chef sauce (mildly spicy, 90g), sous-vide egg, roasted pumpkin, sautéed edamame, Japanese cucumber & pickle", categories: [] },
  { id: "b6", tab: "bento", name: "Set F: Baked Char Siew Chicken Leg w Fragrant Rice", price: 10, price_label: "/pax", courses: null, min_pax: "Min 10 sets", is_popular: false, description: "Fragrant red-white-mix rice (180g), baked boneless chicken leg w char siew sauce (120g), braised hardboil egg, oyster sauce xiao bai chye, cucumber & chili", categories: [] },
  { id: "b7", tab: "bento", name: "Set G: Steam Seabass Fillet w Rice", price: 10, price_label: "/pax", courses: null, min_pax: "Min 10 sets", is_popular: false, description: "Red-white-mix rice (180g), steam seabass fillet w garlic soya sauce (100g), JPN tofu w egg white sauce & mix veg, seafood ngoh hiang (½ piece), nai bai w garlic", categories: [] },
  { id: "b8", tab: "bento", name: "Set H: Avocado Grain Bowl (Vegetarian)", price: 10, price_label: "/pax", courses: null, min_pax: "Min 10 sets", is_popular: false, description: "Red-brown rice or wholegrain mushroom olio (180g), avocado (½ piece), roasted pumpkin, purple slaw, corn & edamame, cherry tomatoes, olive oil dressing", categories: [] },
];

const fallbackConnect: Package[] = [{
  id: "fb-connect", tab: "connect", name: "Connect Takeaway", price: 18.80, price_label: "/pax",
  courses: "8 Courses", min_pax: "Min 15 pax", is_popular: false,
  categories: [
    { id: "co1", label: "Premium (Select 1)", items: ["Breaded Prawn with Wasabi Mayo", "Salted Egg Renkon (Lotus) Chips", "House Special Mutton Rendang", "House Special Beef Rendang", "Stir Fried Black Pepper Slice Beef", "Stir Fried Sweet & Spicy Prawn (de-shell)"] },
    { id: "co2", label: "Chicken (Select 1)", items: ["Signature Curry Chicken w Potato", "House Special Butter Chicken Masala", "Fragrant Honey Boneless Chicken Cube", "Oriental BBQ Boneless Chicken Leg", "Grilled Chicken Yakitori with Roasted Sesame"] },
    { id: "co3", label: "Fish (Select 1)", items: ["Cereal Fish Fillet", "Sweet & Sour Fish Fillet", "Steam Seabass Fillet (Teochew Style)", "Steam Seabass Fillet (Nonya Sauce)", "Norwegian Teriyaki Salmon (+$1)"] },
    { id: "co4", label: "Sides (Select 2)", items: ["Black Pepper Kingcrab Ball", "Japanese Egg Beancurd with Chicken Mince", "Egg Omelette", "Seafood Ngoh Hiang with House Special Sambal", "Seaweed Crispy Chicken", "Stir Fried Slice Potato w Sweet Chili Sauce", "Golden Crispy Zai Er"] },
    { id: "co5", label: "Vegetable (Select 1)", items: ["Broccoli with Mushroom", "Roasted Cajun Mixed Vegetables", "Stir Fried Nai Bai w Garlic", "Stir Fried Xiao Bai Cai with Carrot", "Nonya Chap Chai", "Curry Mix Vegetable"] },
    { id: "co6", label: "Staple (Select 1)", items: ["Yangzhou Fried Rice", "Fragrant Olive Fried Rice", "Signature Stir Fried Bee Hoon", "House Special Nasi Briyani w Papadum (+$1.00)"] },
    { id: "co7", label: "Dessert (Select 1)", items: ["Cold Cheng Tng", "Aiyu Jelly w Mix Cocktail", "Bobo Chacha, Hot (+$0.50)", "Mango Sago", "Honeydew Sago"] },
  ],
}];

const fallbackRefreshments: Package[] = [{
  id: "fb-refresh", tab: "refreshments", name: "Refreshments", price: null,
  price_label: "Price quoted upon selection", courses: "", min_pax: "Min 20 pax", is_popular: false,
  categories: [
    { id: "r1", label: "Sandwich / Salad", items: ["Mini Egg/Tuna Mayo Sandwich", "Mini Egg/Tuna Mayo Croissant", "Potato Salad", "Mesclun Salad Mix w Roasted Yuzu Sesame Dressing"] },
    { id: "r2", label: "Dim Sum / Sides", items: ["Samosa (Big) (V)", "Chicken Siew Mai", "Seaweed Chicken", "Golden Chicken Ball", "Grilled Chicken Yakitori", "Ngoh Hiang Ball", "Golden Fishball", "Seafood Ngoh Hiang Roll", "Fried Kingcrab Ball", "Fried Wanton", "Springroll (Big) (V)", "Breaded Pumpkin Croquette (V)", "Breaded Potato Croquette"] },
    { id: "r3", label: "Staple", items: ["Century Egg & Chicken Mince Porridge", "Stir Fried Bee Hoon", "Stir Fried Kway Teow", "Stir Fried Dry Laksa", "Pineapple Fried Rice", "Olive Fried Rice", "Yang Zhou Fried Rice"] },
    { id: "r4", label: "Sweets", items: ["Mini Brownie", "Mini Red Velvet Cake", "Mini Assorted Muffin", "Assorted Cut Fruits", "Mango Sago", "Aiyu Jelly w Mix Fruit Cocktail", "Cold Cheng Tng", "Bobo Cha Cha (Hot)", "Green Bean Sago (Hot)", "Pilut Hitam (Hot)"] },
    { id: "r5", label: "Drinks", items: ["Fruit Punch", "Refreshing Orange", "Coffee w Sugar & Creamer", "Tea w Sugar & Creamer"] },
    { id: "r6", label: "Mini Don Bowls", items: ["Torched Salmon Don", "Grilled Unagi Don", "Grilled Chicken Yakitori Don", "Truffle Beef Don", "Avocado (V)"] },
  ],
}];

const ALL_FALLBACK: Package[] = [
  ...fallbackBuffet,
  ...fallbackBentoSets,
  ...fallbackConnect,
  ...fallbackRefreshments,
];

/* ──────────────────────── EXPANDABLE BUFFET CARD ──────────────────────── */
const BuffetCard = ({ pkg }: { pkg: Package }) => {
  const [expanded, setExpanded] = useState(false);
  const previewCount = 4;
  const shown = expanded ? pkg.categories : pkg.categories.slice(0, previewCount);

  return (
    <div className={`rounded-xl border p-6 relative flex flex-col ${
      pkg.is_popular ? "border-primary bg-background shadow-warm" : "border-border bg-background"
    }`}>
      {pkg.is_popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-warm text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-bold font-display text-foreground mb-1">{pkg.name}</h3>
      <p className="text-3xl font-bold text-primary font-display mb-1">
        {pkg.price ? `$${pkg.price}` : pkg.price_label}
        {pkg.price && <span className="text-base font-normal text-muted-foreground font-body">{pkg.price_label || ""}</span>}
      </p>
      <p className="text-sm text-muted-foreground font-body mb-3">{pkg.courses} · {pkg.min_pax}</p>
      <hr className="mb-4 border-border" />

      <div className="space-y-3 flex-1">
        {shown.map((cat) => (
          <div key={cat.id}>
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
          pkg.is_popular
            ? "bg-gradient-warm text-primary-foreground hover:opacity-90"
            : "bg-muted text-foreground hover:bg-muted/80"
        }`}
      >
        Get Quote
      </a>
    </div>
  );
};

/* ──────────────────────── MAIN SECTION ──────────────────────── */
const MenuSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  // Start empty — fallback fills in only if Supabase returns nothing
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMenus = async () => {
      setLoading(true);
      try {
        const [pkgRes, catRes, dishRes] = await Promise.all([
          supabase.from("menu_packages").select("*").order("sort_order"),
          supabase.from("menu_categories").select("*").order("sort_order"),
          supabase.from("menu_dishes").select("*").order("sort_order"),
        ]);

        const pkgsData = pkgRes.data || [];
        const catsData = catRes.data || [];
        const dishesData = dishRes.data || [];

        // If supabase has data, assemble it; otherwise keep the fallback already in state
        if (pkgsData.length > 0) {
          const assembled: Package[] = pkgsData.map((p: any) => {
            const pCats = catsData
              .filter((c: any) => c.package_id === p.id)
              .map((c: any) => {
                const cDishes = dishesData
                  .filter((d: any) => d.category_id === c.id)
                  .map((d: any) => d.name);
                return { id: c.id, label: c.label, items: cDishes };
              });
            return { ...p, categories: pCats };
          });
          // Deduplicate by name+tab in case the DB was seeded multiple times
          const seen = new Set<string>();
          const deduped = assembled.filter((p) => {
            const key = `${p.tab}::${p.name}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
          setPackages(deduped);
        } else {
          // Supabase tables exist but are empty — use hardcoded fallback
          setPackages(ALL_FALLBACK);
        }
      } catch (err) {
        console.error("Menu load error:", err);
        // Network/auth error — use hardcoded fallback
        setPackages(ALL_FALLBACK);
      } finally {
        setLoading(false);
      }
    };
    loadMenus();
  }, []);

  const currentTabKey = tabKeys[activeTab];
  const activePackages = packages.filter((p) => p.tab === currentTabKey);
  const bentoPackages = packages.filter((p) => p.tab === "bento");

  return (
    <section id="menu" className="py-20 bg-card min-h-screen">
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

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-muted-foreground font-body text-sm">Loading menu...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">

            {/* ── BUFFET ── */}
            {activeTab === 0 && (
              <motion.div key="buffet" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
              >
                {activePackages.length > 0
                  ? activePackages.map((pkg) => <BuffetCard key={pkg.id} pkg={pkg} />)
                  : <p className="col-span-3 text-center text-muted-foreground py-10">Buffet packages are loading...</p>
                }
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
                  {bentoPackages.map((set) => {
                    // Handle both "Set A: Title" and "Set A - Title" formats
                    const sepIdx = set.name.search(/[:\-]/);
                    const bentoName = sepIdx > 0 ? set.name.slice(0, sepIdx).trim() : set.name;
                    const bentoTitle = sepIdx > 0 ? set.name.slice(sepIdx + 1).trim() : set.name;

                    return (
                      <div key={set.id} className="bg-background rounded-xl border border-border p-5 hover:shadow-card transition-shadow">
                        <span className="text-xs font-bold text-primary font-body">{bentoName}</span>
                        <h4 className="font-bold font-display text-foreground mt-1 mb-2 text-sm leading-snug">{bentoTitle}</h4>
                        <p className="text-xs text-muted-foreground font-body leading-relaxed">{set.description}</p>
                      </div>
                    );
                  })}
                </div>
                {bentoPackages.length === 0 && (
                  <p className="text-center text-muted-foreground py-10">Bento sets are updating...</p>
                )}
                <p className="text-center text-xs text-muted-foreground font-body mt-6">
                  Includes full cutlery set &amp; serviettes. Food best consumed within 2 hours. Transportation: $10 (excl. GST) for orders under $300.
                </p>
              </motion.div>
            )}

            {/* ── CONNECT TAKEAWAY ── */}
            {activeTab === 2 && (
              <motion.div key="connect" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="max-w-5xl mx-auto"
              >
                {activePackages.map((pkg) => (
                  <div key={pkg.id}>
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full">
                        <span className="text-2xl font-bold font-display text-primary">${pkg.price || "18.80"}</span>
                        <span className="text-sm font-body text-muted-foreground">{pkg.price_label || "/pax"} · {pkg.courses || "8 Courses"} · {pkg.min_pax || "Min 15 pax"}</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-body mt-2">Option to add self-heating trays @ $25 (whole set)</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pkg.categories.map((cat) => (
                        <div key={cat.id} className="bg-background rounded-xl border border-border p-5">
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
                  </div>
                ))}
                {activePackages.length === 0 && (
                  <p className="text-center text-muted-foreground py-10">Connect packages are updating...</p>
                )}
                <p className="text-center text-xs text-muted-foreground font-body mt-6">
                  Includes plates, bowls, cutlery, serving tongs &amp; trash bag. Transportation: $15 (excl. GST).
                </p>
              </motion.div>
            )}

            {/* ── REFRESHMENTS ── */}
            {activeTab === 3 && (
              <motion.div key="refreshments" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="max-w-5xl mx-auto"
              >
                {activePackages.map((pkg) => (
                  <div key={pkg.id}>
                    <div className="text-center mb-8">
                      <p className="text-sm text-muted-foreground font-body">{pkg.min_pax || "Min 20 pax"} · {pkg.price_label || "Price quoted upon selection"}</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pkg.categories.map((cat) => (
                        <div key={cat.id} className="bg-background rounded-xl border border-border p-5">
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
                  </div>
                ))}
                {activePackages.length === 0 && (
                  <p className="text-center text-muted-foreground py-10">Refreshment packages are updating...</p>
                )}
                <p className="text-center text-xs text-muted-foreground font-body mt-6">
                  Includes disposable wares, serviettes &amp; garbage bags. Transportation: $15 (excl. GST). Buffet setup &amp; clear up service: $85 (excl. GST).
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        )}

        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground font-body mb-4">
            All buffet packages include warmers, tables, tablecloth &amp; biodegradable disposable wares.
            Transportation &amp; setup: $80 (excl. GST).
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
