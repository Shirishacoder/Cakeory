import { useEffect, useState } from "react";
import AdminOrderCard from "../components/AdminOrderCard";
import { getAllOrders, updateOrderStatus, rejectOrder } from "../data/orderData";


export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(getAllOrders());
  }, []);

  const handleAcceptOrder = (orderId) => {
    updateOrderStatus(orderId, 1); // 1 for Confirmed
    setOrders(getAllOrders()); // Refresh the list
  };

  const handleRejectOrder = (orderId) => {
    rejectOrder(orderId);
    setOrders(getAllOrders()); // Refresh the list
  };

  if (orders.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        No orders found
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        Admin – Orders Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <AdminOrderCard
            key={order.id}
            order={order}
            onAcceptOrder={handleAcceptOrder}
            onRejectOrder={handleRejectOrder}
          />
        ))}
      </div>
    </div>
  );
}
