import logo from "@/assets/logo.jpg";

const Footer = () => (
  <footer className="bg-warm-brown text-primary-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <img src={logo} alt="2 IC Catering" className="h-12 mb-4 brightness-200" />
          <p className="text-primary-foreground/60 text-sm font-body leading-relaxed">
            Happy Bellies, Happier Communities. Halal-certified catering for corporate events, buffets, and celebrations in Singapore.
          </p>
        </div>
        <div>
          <h4 className="font-display font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 font-body text-sm text-primary-foreground/60">
            <li><a href="#home" className="hover:text-primary-foreground transition-colors">Home</a></li>
            <li><a href="#services" className="hover:text-primary-foreground transition-colors">Services</a></li>
            <li><a href="#menu" className="hover:text-primary-foreground transition-colors">Menu</a></li>
            <li><a href="#testimonials" className="hover:text-primary-foreground transition-colors">Testimonials</a></li>
            <li><a href="#contact" className="hover:text-primary-foreground transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold mb-4">Contact</h4>
          <ul className="space-y-2 font-body text-sm text-primary-foreground/60">
            <li>+65 9838 9733</li>
            <li>15 Jln Tepong, Singapore 619336</li>
            <li><a href="mailto:kenny.huang@2iccatering.com" className="hover:text-primary-foreground transition-colors break-all">kenny.huang@2iccatering.com</a></li>
            <li><a href="mailto:admin@2iccatering.com" className="hover:text-primary-foreground transition-colors break-all">admin@2iccatering.com</a></li>
          </ul>
        </div>
      </div>
      <hr className="border-primary-foreground/10 mb-6" />
      <p className="text-center text-xs text-primary-foreground/40 font-body">
        © {new Date().getFullYear()} 2 IC Catering Private Limited. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
