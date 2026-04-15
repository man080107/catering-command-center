import { motion } from "framer-motion";
import { Star, Users, Clock, Shield } from "lucide-react";

const stats = [
  { icon: Star, value: "4.9★", label: "Google Rating", sublabel: "56+ Reviews" },
  { icon: Users, value: "500+", label: "Events Served", sublabel: "Corporate & Private" },
  { icon: Clock, value: "On Time", label: "Punctual Delivery", sublabel: "Rain or Shine" },
  { icon: Shield, value: "Halal", label: "Certified", sublabel: "MUIS Approved" },
];

const TrustSection = () => {
  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-bold font-display text-foreground">{stat.value}</p>
              <p className="text-sm font-semibold font-body text-foreground/80">{stat.label}</p>
              <p className="text-xs font-body text-muted-foreground">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <blockquote className="text-lg md:text-xl italic text-foreground/70 font-body max-w-xl mx-auto">
            "Huge portions, affordable prices, and fantastic service."
          </blockquote>
          <p className="text-sm text-muted-foreground mt-2 font-body">— Verified Google Review</p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
