import { motion } from "framer-motion";

const OurStory = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-display">
            Our Story
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          
          <div className="space-y-6 text-lg text-muted-foreground font-body leading-relaxed">
            <p>
              We power food experiences that bring people together. From managing associates’ cafeterias and daily meals, 
              to corporate bento & buffet catering with local, Malay, Indian, Western, and Japanese options — we’ve got you covered.
            </p>
            <p>
              For fully tailored solutions, we offer bespoke culinary management, crafting every detail to your needs and preferences.
            </p>
            <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 mt-8">
              <p className="font-semibold text-foreground text-xl italic">
                "I started 2 IC Catering with one belief: that my team should enjoy preparing the food, as much as our customers enjoy eating it. That’s the spirit we live by at 2 IC Catering!"
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;
