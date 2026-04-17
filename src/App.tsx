import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Testimonials from "./pages/Testimonials.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminLayout from "./components/AdminLayout.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminMenu from "./pages/admin/AdminMenu.tsx";
import AdminInquiries from "./pages/admin/AdminInquiries.tsx";
import AdminTestimonials from "./pages/admin/AdminTestimonials.tsx";
import AdminBrands from "./pages/admin/AdminBrands.tsx";
import AdminContent from "./pages/admin/AdminContent.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="menu" element={<AdminMenu />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="brands" element={<AdminBrands />} />
              <Route path="content" element={<AdminContent />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
