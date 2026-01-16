import { useEffect, useState } from "react";
import AdminOrderCard from "../components/AdminOrderCard";
import { getAllOrders, updateOrderStatus } from "../data/orderData";

export default function AdminCustomizationOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Assuming customization orders are those with custom items or specific flags
    // For now, filter orders that might be custom (e.g., based on cartItems having custom properties)
    const allOrders = getAllOrders();
    const customOrders = allOrders.filter(order =>
      order.cartItems.some(item => item.isCustom || item.customization)
    );
    setOrders(customOrders);
  }, []);

  const handleAcceptOrder = (orderId) => {
    // Update order status to confirmed (status 1)
    updateOrderStatus(orderId, 1);

    // Update local state to reflect the change
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: 1 } : order
      )
    );
  };

  if (orders.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        No customization orders found
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        Admin – Customization Orders Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <AdminOrderCard key={order.id} order={order} onAcceptOrder={handleAcceptOrder} />
        ))}
      </div>
    </div>
  );
}
