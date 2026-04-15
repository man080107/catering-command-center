import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import ServicesSection from "@/components/ServicesSection";
import MenuSection from "@/components/MenuSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BrandsSection from "@/components/BrandsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StickyButtons from "@/components/StickyButtons";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <TrustSection />
    <ServicesSection />
    <MenuSection />
    <TestimonialsSection />
    <BrandsSection />
    <ContactSection />
    <Footer />
    <StickyButtons />
  </div>
);

export default Index;
