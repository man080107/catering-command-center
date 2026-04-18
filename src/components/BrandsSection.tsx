import { motion } from "framer-motion";
import { ExternalLink, Instagram, ShoppingBag } from "lucide-react";
import donplayplayImg from "@/assets/donplayplay-logo2.png";
import guudfillsImg from "@/assets/guudfills-logo.jpg";
import g1 from "@/assets/g1.jpeg";
import g2 from "@/assets/g2.jpeg";
import g3 from "@/assets/g3.jpeg";
import g4 from "@/assets/g4.jpeg";
import g5 from "@/assets/g5.jpeg";
import h1 from "@/assets/h1.jpeg";
import h2 from "@/assets/h2.jpeg";
import h3 from "@/assets/h3.jpeg";
import h4 from "@/assets/h4.jpeg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const brands = [
  {
    name: "Don Play Play",
    tagline: "Premium Japanese Bowls\n\nIndulge in our don bowls - from torched salmon to our best selling truffle beef don. Bold flavours, generous portions, Don Play Play.",
    description: "",
    images: [donplayplayImg, h1, h2, h3, h4],
    links: {
      website: "https://www.donplayplay.com",
      instagram: "https://www.instagram.com/donplayplaysg",
    },
    imageClass: "object-cover object-center",
    accent: "from-amber-600 to-orange-500",
  },
  {
    name: "Guudfills",
    tagline: "\n\nPremium marinated somen, salmon shoyuzuke & sushi bakes\nA variety of irresistible flavours paired with the freshest ingredients",
    description: "",
    images: [guudfillsImg, g1, g2, g3, g4, g5],
    links: {
      order: "https://take.app/guudfills",
      instagram: "https://www.instagram.com/guudfills",
    },
    imageClass: "object-contain bg-background object-center",
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
              {/* Cover Images Carousel */}
              <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-black/5 dark:bg-black/40">
                <Carousel className="w-full h-full" opts={{ loop: true }}>
                  <CarouselContent className="h-full">
                    {brand.images.map((img, idx) => (
                      <CarouselItem key={idx} className="h-full w-full relative">
                        <img
                          src={img}
                          alt={`${brand.name} ${idx + 1}`}
                          className={`w-full h-full ${brand.imageClass || 'object-cover'} group-hover:scale-105 transition-transform duration-700`}
                          loading="lazy"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  
                  {brand.images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="pointer-events-auto ml-2">
                        <CarouselPrevious className="relative left-0 bg-background/80 hover:bg-background border-none w-8 h-8 rounded-full" />
                      </div>
                      <div className="pointer-events-auto mr-2">
                        <CarouselNext className="relative right-0 bg-background/80 hover:bg-background border-none w-8 h-8 rounded-full" />
                      </div>
                    </div>
                  )}
                </Carousel>
                
                <div className="absolute pointer-events-none inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute pointer-events-none bottom-4 left-5 right-5">
                  <h3 className="text-2xl font-bold font-display text-primary-foreground drop-shadow-lg">
                    {brand.name}
                  </h3>
                  <p className="text-sm font-body text-primary-foreground/80 drop-shadow whitespace-pre-wrap">
                    {brand.tagline}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {brand.description && (
                  <p className="text-sm text-muted-foreground font-body leading-relaxed mb-5 whitespace-pre-wrap">
                    {brand.description}
                  </p>
                )}

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
