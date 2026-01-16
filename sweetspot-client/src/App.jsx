import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CakeCustomization from "./pages/CakeCustomization";
import CheckoutPage from "./pages/CheckoutPage";
import CakeList from "./pages/CakeList";
import ContactUs from "./pages/ContactUs";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import About from "./pages/About";
import MobileMenu from "./components/MobileMenu";
import { ToastProvider } from "./components/CustomToast"; // ✅ add this
import LoginPage from "./pages/LoginPage";
import UserProfile from "./components/UserProfile";
import WishlistPage from "./pages/WishlistPage";
import { CartProvider } from "./components/CartContext.jsx";
import { Elements } from "@stripe/react-stripe-js"; 
import { loadStripe } from "@stripe/stripe-js";
import AdminOrders from "./pages/AdminOrders";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCustomizationOrders from "./pages/AdminCustomizationOrders";
import AdminFeedback from "./pages/AdminFeedback";
const stripePromise = loadStripe("pk_test_..."); // replace with actual key
 
function App() {
  return (
    <CartProvider>
      <ToastProvider>
        
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customize" element={<CakeCustomization />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />}>
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customization" element={<AdminCustomizationOrders />} />
            <Route path="feedback" element={<AdminFeedback />} />
          </Route>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cakes" element={<CakeList />} />
          <Route path="/orders" element={<OrderTrackingPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/menu" element={<MobileMenu />} />
        </Routes>
      </Elements>
      </ToastProvider>
    </CartProvider>
  );
}

export default App;
