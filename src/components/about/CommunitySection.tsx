import { motion } from "framer-motion";
import communityImg from "@/assets/4.jpeg";

const CommunitySection = () => {
  return (
    <section className="py-24 bg-warm-brown text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display">
              More Than Catering
            </h2>
            <div className="w-20 h-1 bg-primary/80 rounded-full" />
            <p className="text-xl font-body leading-relaxed text-primary-foreground/90">
              We believe food creates stronger teams, happier workplaces, and lasting memories. 
              Every meal is an opportunity to bring people together.
            </p>
          </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src={communityImg} 
                alt="People enjoying food together"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
