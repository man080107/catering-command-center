import { motion } from "framer-motion";
import { Star, Quote, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { allTestimonials } from "@/data/testimonials";
import Footer from "@/components/Footer";

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        <section className="py-20 bg-background pt-32">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="mb-12">
              <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 font-body">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-display">
                All <span className="text-gradient-warm">Google Reviews</span>
              </h1>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-lg text-muted-foreground font-body">4.9 out of 5 · {allTestimonials.length} Real Reviews</p>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {allTestimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i % 10) * 0.05 }}
                  className="bg-card border border-border rounded-xl p-6 shadow-sm break-inside-avoid flex flex-col"
                >
                  <Quote className="w-8 h-8 text-primary/20 mb-3 shrink-0" />
                  <p className="text-foreground/80 font-body text-sm leading-relaxed mb-4 flex-1">{t.text}</p>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="font-semibold text-sm font-body text-foreground">{t.author}</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-muted-foreground font-body max-w-[60%] truncate">{t.role}</p>
                    <p className="text-xs text-muted-foreground font-body">{t.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Testimonials;
