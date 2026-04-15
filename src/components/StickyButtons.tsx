import { MessageCircle, FileText } from "lucide-react";

const StickyButtons = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
    <a
      href="#contact"
      className="bg-gradient-warm text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-warm hover:scale-110 transition-transform"
      title="Get Quote"
    >
      <FileText className="w-6 h-6" />
    </a>
    <a
      href="https://wa.me/6598389733"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[hsl(142,70%,40%)] text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      title="WhatsApp Us"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  </div>
);

export default StickyButtons;
