import { motion } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { allTestimonials } from "@/data/testimonials";

const TestimonialsSection = () => {
  const displayedTestimonials = allTestimonials.slice(0, 6);

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {displayedTestimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-6 shadow-card flex flex-col"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-3 shrink-0" />
              <p className="text-foreground/80 font-body text-sm leading-relaxed mb-4 flex-1 line-clamp-4">{t.text}</p>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-accent text-accent" />
                ))}
              </div>
              <p className="font-semibold text-sm font-body text-foreground">{t.author}</p>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-muted-foreground font-body">{t.role}</p>
                <p className="text-xs text-muted-foreground font-body">{t.time}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/testimonials"
            className="group flex items-center gap-2 bg-background border border-border text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted/50 transition-colors shadow-sm"
          >
            Read All {allTestimonials.length}+ Google Reviews
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
