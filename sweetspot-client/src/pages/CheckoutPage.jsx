import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Clock, CreditCard } from "lucide-react";

import { useCart } from "../components/CartContext";
import { useAuth } from "../hooks/useAuth";
import { addOrder } from "../data/orderData";
import { getUserProfile } from "../data/userProfile";
import { getDistanceToStore } from "../utils/distance";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, resetCart } = useCart();
  const { user, authLoading } = useAuth();

  const [profile, setProfile] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [placingOrder, setPlacingOrder] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      const data = await getUserProfile(user.uid);
      setProfile(data);
    };

    loadProfile();
  }, [user]);

  /* ================= GUARDS ================= */
  useEffect(() => {
    if (authLoading) return;
    if (!user) navigate("/login");
    if (cartItems.length === 0) navigate("/");
  }, [authLoading, user, cartItems, navigate]);

  if (!profile) {
    return <div className="p-10 text-center">Loading checkout…</div>;
  }

  /* ================= PLACE ORDER ================= */
  const handleConfirmOrder = async () => {
    if (!deliveryDate || !deliveryTime) {
      alert("Please select delivery date & time");
      return;
    }

    // Distance validation
    const userLat = profile.address?.latitude;
    const userLon = profile.address?.longitude;

    if (!userLat || !userLon) {
      alert("Location information is missing. Please update your address with valid coordinates.");
      return;
    }

    const distance = getDistanceToStore(userLat, userLon);

    if (distance > 20) {
      alert(`Delivery is available only within 20km radius. Your location is ${distance.toFixed(2)} km away.`);
      return;
    }

    setPlacingOrder(true);

    const fullAddress = `${profile.address?.street}, ${profile.address?.city} - ${profile.address?.postalCode}`;

    await addOrder(user.uid, {
      customerName: `${profile.firstName} ${profile.lastName}`,
      email: profile.email,
      phone: profile.phone,
      cartItems,
      total,
      shippingAddress: fullAddress,
      billingAddress: fullAddress,
      paymentMethod,
      selectedDeliveryDate: deliveryDate,
      selectedDeliveryTime: deliveryTime,
      deliveryDistance: distance.toFixed(2), // Optional: store distance in order
      status: 0,
    });

    resetCart();
    navigate("/orders");
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-pink-50">
      {/* HEADER */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-bold">Your Perfect Order Awaits 🚚</h1>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-6">

        {/* ADDRESS CARD */}
        <div className="bg-white rounded-xl shadow p-5 space-y-2">
          <div className="flex items-center gap-2 font-semibold">
            <MapPin size={18} /> Shipping Address
          </div>
          <p>{profile.firstName} {profile.lastName}</p>
          <p>{profile.email}</p>
          <p>{profile.phone}</p>
          <p>
            {profile.address?.street}, {profile.address?.city} -{" "}
            {profile.address?.postalCode}
          </p>
        </div>

        {/* DELIVERY */}
        <div className="bg-white rounded-xl shadow p-5 space-y-4">
          <div className="flex items-center gap-2 font-semibold">
            <Calendar size={18} /> Delivery Date
          </div>
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <div className="flex items-center gap-2 font-semibold">
            <Clock size={18} /> Delivery Time
          </div>
          <input
            type="time"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            className="w-full border p-3 rounded"
          />
        </div>

        {/* PAYMENT */}
        <div className="bg-white rounded-xl shadow p-5 space-y-3">
          <div className="flex items-center gap-2 font-semibold">
            <CreditCard size={18} /> Payment Method
          </div>

          <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
            <input
              type="radio"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
            <input
              type="radio"
              checked={paymentMethod === "UPI"}
              onChange={() => setPaymentMethod("UPI")}
            />
            UPI
          </label>

          <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
            <input
              type="radio"
              checked={paymentMethod === "Card"}
              onChange={() => setPaymentMethod("Card")}
            />
            Credit / Debit Card
          </label>
        </div>

        {/* TOTAL */}
        <div className="bg-white rounded-xl shadow p-5 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        {/* CONFIRM */}
        <button
          disabled={placingOrder}
          onClick={handleConfirmOrder}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-xl font-semibold text-lg"
        >
          {placingOrder ? "Placing Order..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
}
