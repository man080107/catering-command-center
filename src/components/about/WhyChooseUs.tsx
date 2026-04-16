import { motion } from "framer-motion";
import { Utensils, Building2, Sparkles, Heart } from "lucide-react";

const cards = [
  {
    icon: Utensils,
    title: "Diverse Menus",
    desc: "Local, Malay, Indian, Western & Japanese cuisine options."
  },
  {
    icon: Building2,
    title: "Corporate Solutions",
    desc: "Daily meals, cafeteria management, bento & buffet catering."
  },
  {
    icon: Sparkles,
    title: "Bespoke Services",
    desc: "Fully customized food experiences based on your needs."
  },
  {
    icon: Heart,
    title: "Passion Driven Team",
    desc: "We enjoy preparing food as much as customers enjoy eating it."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">
            Why Choose <span className="text-primary">2 IC Catering</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card p-8 rounded-3xl border border-border hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <card.icon className="w-7 h-7 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold font-display text-foreground mb-3">
                {card.title}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
