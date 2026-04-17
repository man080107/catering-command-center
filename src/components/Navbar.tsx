import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Menu", href: "/#menu" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Brands", href: "/#brands" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="2 IC Catering" className="h-10 md:h-12 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isHash = link.href.includes('#');
            // If on home page, use just the hash to enable smooth scroll without reload
            const to = isHash && location.pathname === '/' ? link.href.substring(1) : link.href;
            return (
              <a
                key={link.label}
                href={to}
                className="font-body text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+6598389733"
            className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            +65 9838 9733
          </a>
          <a
            href="#contact"
            className="bg-gradient-warm text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Get Quote
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => {
                const isHash = link.href.includes('#');
                const to = isHash && location.pathname === '/' ? link.href.substring(1) : link.href;
                return (
                  <a
                    key={link.label}
                    href={to}
                    onClick={() => setIsOpen(false)}
                    className="font-body text-base font-medium text-foreground/80 py-2"
                  >
                    {link.label}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="bg-gradient-warm text-primary-foreground px-5 py-3 rounded-lg text-center font-semibold mt-2"
              >
                Get Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
