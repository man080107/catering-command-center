import { motion } from "framer-motion";
import { Building2, UtensilsCrossed, PartyPopper, Package } from "lucide-react";
import corporateImg from "@/assets/2.jpeg";
import buffetImg from "@/assets/3.jpeg";
import bespokeImg from "@/assets/beskope.jpeg";
import bulkImg from "@/assets/hero-buffet2.jpeg";

const services = [
  {
    icon: Building2,
    title: "Associates' Cafeteria & Meal Management",
    desc: "Running daily meals for staff, handling the full cafeteria operation.",
    img: bulkImg,
  },
  {
    icon: PartyPopper,
    title: "Buffet Catering Events",
    desc: "Set menus available, but we're always open to customize selections to suit your preferences.",
    img: buffetImg,
  },
  {
    icon: UtensilsCrossed,
    title: "Corporate Meals",
    desc: "Bento & buffet options with wide variety — local favorites, Malay, Indian, Japanese and Western cuisine.",
    img: corporateImg,
  },
  {
    icon: Package,
    title: "Bespoke Culinary Management",
    desc: "Partnership-based, producing food tailored specifically to clients' needs.",
    img: bespokeImg,
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

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
