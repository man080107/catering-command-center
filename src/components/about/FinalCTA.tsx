import { motion } from "framer-motion";
import { ArrowRight, UtensilsCrossed } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground leading-tight">
            Ready to Create Your Next Food Experience?
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/#contact"
              className="w-full sm:w-auto bg-gradient-warm text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-warm transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Contact Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="/#menu"
              className="w-full sm:w-auto bg-card border-2 border-border text-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center gap-2"
            >
              View Menu
              <UtensilsCrossed className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
