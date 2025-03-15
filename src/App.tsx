
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Account from "./pages/Account";
import Search from "./pages/Search";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";

// Company Section Pages
import AboutUs from "./pages/company/AboutUs";
import Sustainability from "./pages/company/Sustainability";
import StoreLocator from "./pages/company/StoreLocator";
import Careers from "./pages/company/Careers";
import ContactUs from "./pages/company/ContactUs";

// Customer Service Section Pages
import HelpCenter from "./pages/customer-service/HelpCenter";
import ShippingAndReturns from "./pages/customer-service/ShippingAndReturns";
import SizeGuide from "./pages/customer-service/SizeGuide";
import PrivacyPolicy from "./pages/customer-service/PrivacyPolicy";
import TermsAndConditions from "./pages/customer-service/TermsAndConditions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/account" element={<Account />} />
                <Route path="/search" element={<Search />} />
                <Route path="/wishlist" element={<Wishlist />} />
                
                {/* Company Section Routes */}
                <Route path="/about" element={<AboutUs />} />
                <Route path="/sustainability" element={<Sustainability />} />
                <Route path="/stores" element={<StoreLocator />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/contact" element={<ContactUs />} />
                
                {/* Customer Service Section Routes */}
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/shipping" element={<ShippingAndReturns />} />
                <Route path="/size-guide" element={<SizeGuide />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
