import { motion } from "framer-motion";
import { ExternalLink, Instagram, ShoppingBag } from "lucide-react";
import donplayplayImg from "@/assets/donplayplay-logo.jpeg";
import guudfillsImg from "@/assets/guudfills-logo.jpg";

const brands = [
  {
    name: "Don Play Play",
    tagline: "Premium Japanese Donburi Bowls",
    description:
      "Indulge in our signature donburi bowls — from torched salmon to truffle beef don. Bold flavours, generous portions, no play play.",
    image: donplayplayImg,
    links: {
      website: "https://www.donplayplay.com",
      instagram: "https://www.instagram.com/donplayplaysg",
    },
    accent: "from-amber-600 to-orange-500",
  },
  {
    name: "Guudfills",
    tagline: "Artisan Filled Pastries & Baked Goods",
    description:
      "Handcrafted buns, croissants and pastries with irresistible fillings. Perfect for breakfast catering, tea breaks, and gifting.",
    image: guudfillsImg,
    links: {
      order: "https://take.app/guudfills",
      instagram: "https://www.instagram.com/guudfills",
    },
    accent: "from-yellow-600 to-amber-500",
  },
];

const BrandsSection = () => {
  return (
    <section id="brands" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our <span className="text-gradient-warm">Brands</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Part of the 2 IC family — trusted food brands delivering quality across Singapore.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-warm transition-all duration-500"
            >
              {/* Cover Image */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="text-2xl font-bold font-display text-primary-foreground drop-shadow-lg">
                    {brand.name}
                  </h3>
                  <p className="text-sm font-body text-primary-foreground/80 drop-shadow">
                    {brand.tagline}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-5">
                  {brand.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {brand.links.website && (
                    <a
                      href={brand.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-warm text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold font-body hover:opacity-90 transition-opacity"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Website
                    </a>
                  )}
                  {brand.links.order && (
                    <a
                      href={brand.links.order}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-warm text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold font-body hover:opacity-90 transition-opacity"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Order Now
                    </a>
                  )}
                  <a
                    href={brand.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-muted text-foreground px-5 py-2.5 rounded-lg text-sm font-semibold font-body hover:bg-muted/80 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
