import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import bentoImg from "@/assets/bento-set.jpg";
import buffetImg from "@/assets/hero-buffet.jpg";
import refreshImg from "@/assets/refreshments.jpg";

const tabs = ["Buffet Packages", "Bento Sets", "Refreshments"];

const buffetPackages = [
  {
    name: "Bronze",
    price: "$16.80",
    courses: "8 Courses",
    minPax: "Min 30 pax",
    popular: false,
    dishes: [
      "Premium dish (Mutton Rendang / Prawns)",
      "Chicken (Curry / Salted Egg / Shrimp Paste)",
      "Fish (Cereal / Sweet & Sour / Assam)",
      "Side dish & Vegetable",
      "Fried Rice / Bee Hoon / Kway Teow",
      "Dessert & Drinks",
    ],
  },
  {
    name: "Silver",
    price: "$18.80",
    courses: "9 Courses",
    minPax: "Min 30 pax",
    popular: true,
    dishes: [
      "Everything in Bronze, plus:",
      "Dim Sum (Har Gao / Siew Mai / You Tiao)",
      "Butter Chicken Masala option",
      "Steam Seabass Fillet option",
      "Ee Fu Noodles option",
      "Peach Oolong Tea & Bobo Chacha",
    ],
  },
  {
    name: "Gold",
    price: "$21.80",
    courses: "10 Courses",
    minPax: "Min 30 pax",
    popular: false,
    dishes: [
      "Everything in Silver, plus:",
      "Pick 2 Premium items",
      "Chicken Satay & Shepherd's Pie",
      "Norwegian Salmon option (+$1.20)",
      "Spaghetti Mushroom Olio",
      "Aiyu Jelly with Cocktail",
    ],
  },
];

const bentoSets = [
  { name: "Set A", title: "Baked Chicken Yakitori w Rice", desc: "Brown rice, grilled yakitori, steam egg, edamame & corn" },
  { name: "Set B", title: "Sous-vide Chicken Grain Bowl", desc: "Brown rice, sous-vide chicken, 63° egg, purple slaw, sesame dressing" },
  { name: "Set C", title: "Truffle Soy Salmon Pasta", desc: "Wholegrain mushroom olio, truffle soy salmon, pumpkin croquette" },
  { name: "Set D", title: "Chicken Tomato Bolognese Pasta", desc: "Wholegrain spaghetti, sous-vide chicken, bolognese, roasted veg" },
  { name: "Set E", title: "Torched Salmon w Olive Fried Rice", desc: "Olive brown fried rice, torched salmon, sous-vide egg, pumpkin" },
  { name: "Set F", title: "Baked Char Siew Chicken w Rice", desc: "Fragrant rice, boneless chicken leg, braised egg, xiao bai chye" },
  { name: "Set G", title: "Steam Seabass Fillet w Rice", desc: "Mixed rice, seabass fillet w garlic soya, tofu, ngoh hiang" },
  { name: "Set H", title: "Avocado Grain Bowl (Vegetarian)", desc: "Brown rice or wholegrain olio, avocado, pumpkin, edamame & corn" },
];

const refreshments = [
  "Mini Egg/Tuna Mayo Sandwich", "Mini Croissant", "Chicken Siew Mai", "Har Gao",
  "Seaweed Chicken", "Spring Roll", "Grilled Yakitori", "Ngoh Hiang Roll",
  "Torched Salmon Don Bowl", "Grilled Unagi Don Bowl", "Truffle Beef Don Bowl",
  "Mini Brownie", "Mini Red Velvet Cake", "Assorted Muffin", "Mango Sago",
  "Fruit Punch", "Coffee & Tea",
];

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
          {activeTab === 0 && (
            <motion.div
              key="buffet"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
              {buffetPackages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`rounded-xl border p-6 relative ${
                    pkg.popular
                      ? "border-primary bg-background shadow-warm"
                      : "border-border bg-background"
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-warm text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-2xl font-bold font-display text-foreground mb-1">{pkg.name}</h3>
                  <p className="text-3xl font-bold text-primary font-display mb-1">{pkg.price}<span className="text-base font-normal text-muted-foreground font-body">/pax</span></p>
                  <p className="text-sm text-muted-foreground font-body mb-1">{pkg.courses} · {pkg.minPax}</p>
                  <hr className="my-4 border-border" />
                  <ul className="space-y-2.5">
                    {pkg.dishes.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm font-body text-foreground/80">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`mt-6 block text-center py-3 rounded-lg font-semibold text-sm font-body transition-opacity ${
                      pkg.popular
                        ? "bg-gradient-warm text-primary-foreground hover:opacity-90"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    Get Quote
                  </a>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div
              key="bento"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full">
                  <span className="text-2xl font-bold font-display text-primary">$10</span>
                  <span className="text-sm font-body text-muted-foreground">/pax · Min 10 sets · Healthier Choice</span>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {bentoSets.map((set) => (
                  <div key={set.name} className="bg-background rounded-xl border border-border p-5 hover:shadow-card transition-shadow">
                    <span className="text-xs font-bold text-primary font-body">{set.name}</span>
                    <h4 className="font-bold font-display text-foreground mt-1 mb-2 text-sm leading-snug">{set.title}</h4>
                    <p className="text-xs text-muted-foreground font-body leading-relaxed">{set.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div
              key="refreshments"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <p className="text-sm text-muted-foreground font-body">Min 20 pax · Price quoted upon selection</p>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {refreshments.map((item) => (
                  <div key={item} className="flex items-center gap-2 bg-background rounded-lg border border-border px-4 py-3">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-body text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
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
