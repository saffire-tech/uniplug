import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { AdminRoute } from "@/components/admin/AdminRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import SellerDashboard from "./pages/SellerDashboard";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import StorePage from "./pages/StorePage";
import Stores from "./pages/Stores";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersManagement from "./pages/admin/UsersManagement";
import StoresManagement from "./pages/admin/StoresManagement";
import ProductsManagement from "./pages/admin/ProductsManagement";
import OrdersManagement from "./pages/admin/OrdersManagement";
import ReportsManagement from "./pages/admin/ReportsManagement";
import ReportIssue from "./pages/ReportIssue";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AdminProvider>
            <CartProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/seller" element={<SellerDashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/stores" element={<Stores />} />
                <Route path="/store/:id" element={<StorePage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/admin/users" element={<AdminRoute><UsersManagement /></AdminRoute>} />
                <Route path="/admin/stores" element={<AdminRoute><StoresManagement /></AdminRoute>} />
                <Route path="/admin/products" element={<AdminRoute><ProductsManagement /></AdminRoute>} />
                <Route path="/admin/orders" element={<AdminRoute><OrdersManagement /></AdminRoute>} />
                <Route path="/admin/reports" element={<AdminRoute><ReportsManagement /></AdminRoute>} />
                <Route path="/report-issue" element={<ReportIssue />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </CartProvider>
          </AdminProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
