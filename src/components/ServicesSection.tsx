import { motion } from "framer-motion";
import { Building2, UtensilsCrossed, Salad, PartyPopper, Cake, Package } from "lucide-react";
import corporateImg from "@/assets/2.jpeg";
import buffetImg from "@/assets/3.jpeg";
import bentoImg from "@/assets/4.jpeg";
import festiveImg from "@/assets/5.jpeg";
import refreshImg from "@/assets/6.jpeg";
import bulkImg from "@/assets/hero-buffet.jpg";

const services = [
  {
    icon: Building2,
    title: "Corporate Catering",
    desc: "Office lunches, team events, and large-scale corporate functions for 100+ pax.",
    img: corporateImg,
  },
  {
    icon: UtensilsCrossed,
    title: "Buffet Catering",
    desc: "Bronze, Silver & Gold packages from $16.80/pax with full setup included.",
    img: buffetImg,
  },
  {
    icon: Salad,
    title: "Healthy Bento Sets",
    desc: "Nutritious grain bowls and bento from $10/pax. Min 10 pax order.",
    img: bentoImg,
  },
  {
    icon: PartyPopper,
    title: "Festive Catering",
    desc: "Chinese New Year, Christmas, Hari Raya — special festive menus available.",
    img: festiveImg,
  },
  {
    icon: Cake,
    title: "Refreshments & Mini Bites",
    desc: "Dim sum, sandwiches, mini don bowls, desserts and drinks for tea breaks.",
    img: refreshImg,
  },
  {
    icon: Package,
    title: "Bulk Event Orders",
    desc: "Scalable catering for events of any size. Competitive pricing for large orders.",
    img: bulkImg,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our <span className="text-gradient-warm">Services</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            From intimate office lunches to grand celebrations, we cater to every occasion with quality and care.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-xl overflow-hidden bg-card border border-border shadow-card hover:shadow-warm transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <s.icon className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold font-display text-foreground">{s.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
