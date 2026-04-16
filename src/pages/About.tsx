import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import CommunitySection from "@/components/about/CommunitySection";
import FinalCTA from "@/components/about/FinalCTA";

const About = () => {
  // Scroll to top on mount when coming from another page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <AboutHero />
        <OurStory />
        <WhyChooseUs />
        <CommunitySection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default About;
