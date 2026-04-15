import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { text: "Fantastic service and very accommodating. The food was delicious and the team went above and beyond!", author: "Sarah L.", role: "Corporate Event Manager" },
  { text: "Punctual delivery even during busy festive periods. Will definitely order again for our company events.", author: "James T.", role: "Office Admin" },
  { text: "Great for large corporate events. The buffet setup was professional and the food was outstanding.", author: "Rachel W.", role: "HR Director" },
  { text: "Delicious food and generous portions. Our team loved every single dish. Best catering in Singapore!", author: "David C.", role: "Startup Founder" },
  { text: "Easy ordering process and responsive team. They customized our menu perfectly for dietary needs.", author: "Aisha M.", role: "Event Coordinator" },
  { text: "Huge portions, affordable prices, and fantastic service. We've been ordering monthly for 2 years.", author: "Kevin L.", role: "Operations Manager" },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our <span className="text-gradient-warm">Clients Say</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-accent text-accent" />
            ))}
          </div>
          <p className="text-muted-foreground font-body">4.9 out of 5 · 56+ Google Reviews</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-6 shadow-card"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-3" />
              <p className="text-foreground/80 font-body text-sm leading-relaxed mb-4">{t.text}</p>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-accent text-accent" />
                ))}
              </div>
              <p className="font-semibold text-sm font-body text-foreground">{t.author}</p>
              <p className="text-xs text-muted-foreground font-body">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
