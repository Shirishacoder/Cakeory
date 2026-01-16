import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { getOrdersByUserId, ORDER_STATUS } from "../data/orderData";

const useOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      const userOrders = getOrdersByUserId(user.uid);
      setOrders(userOrders);
    } else {
      setOrders([]);
    }
    setLoading(false);
  }, [user]);

  // Stats
  const getOrderStats = () => ({
    total: orders.length,
    confirmed: orders.filter(o => o.status === 1).length,
    baking: orders.filter(o => o.status === 2).length,
    qualityCheck: orders.filter(o => o.status === 3).length,
    outForDelivery: orders.filter(o => o.status === 4).length,
    delivered: orders.filter(o => o.status === 5).length,
  });

  return {
    orders,
    loading,
    getOrderStats,
    refreshOrders: () => {
      if (user?.uid) {
        setOrders(getOrdersByUserId(user.uid));
      }
    },
  };
};

export default useOrders;
