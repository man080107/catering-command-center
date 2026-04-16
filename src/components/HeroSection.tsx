import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import heroImage from "@/assets/1.jpeg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Premium buffet catering spread by 2 IC Catering Singapore"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-brown/90 via-warm-brown/70 to-warm-brown/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-semibold font-body mb-6">
              ⭐ 4.9 Rating · 56+ Reviews · Halal Certified
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6"
          >
            Reliable Catering in Singapore for{" "}
            <span className="text-accent">Corporate & Events</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-primary-foreground/80 font-body mb-8 leading-relaxed"
          >
            From office lunches to large-scale events, we deliver quality food
            with seamless service. Happy Bellies, Happier Communities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="bg-gradient-warm text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity shadow-warm"
            >
              Get a Quote
            </a>
            <a
              href="#menu"
              className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-foreground/20 transition-colors"
            >
              View Menu
            </a>
            <a
              href="https://wa.me/6598389733"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[hsl(142,70%,40%)] text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
