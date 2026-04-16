import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-display text-white leading-tight">
            Food for sharing, memories for keeping.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-body font-light">
            Happy bellies, happier communities.
          </p>
          <div className="pt-8">
            <a 
              href="/#contact"
              className="inline-block bg-gradient-warm text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-warm transition-all duration-300 transform hover:-translate-y-1"
            >
              Get In Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
