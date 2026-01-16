const STORAGE_KEY = "ALL_ORDERS";

/* =========================
   STORAGE HELPERS
========================= */
const loadOrders = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveOrders = (orders) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

/* =========================
   ADMIN
========================= */
export const getAllOrders = () => {
  return loadOrders();
};

/* =========================
   USER
========================= */
export const getOrdersByUserId = (userId) => {
  if (!userId) return [];
  return loadOrders().filter((o) => o.userId === userId);
};

export const addOrder = (userId, orderData) => {
  if (!userId || !orderData) return null;

  const orders = loadOrders();

  const newOrder = {
    id: `SW-${Date.now()}`,
    userId,

    customerName: orderData.customerName,
    email: orderData.email,
    phone: orderData.phone,

    cartItems: orderData.cartItems,
    total: orderData.total,

    shippingAddress: orderData.shippingAddress,
    billingAddress: orderData.billingAddress,

    paymentMethod: orderData.paymentMethod,

    selectedDeliveryDate: orderData.selectedDeliveryDate,
    selectedDeliveryTime: orderData.selectedDeliveryTime,
    preciseDeliveryDateTime: orderData.preciseDeliveryDateTime,

    status: orderData.status ?? 0,

    createdAt: new Date().toISOString(),
  };

  orders.unshift(newOrder);
  saveOrders(orders);

  return newOrder;
};
export const updateOrderStatus = (orderId, status) => {
  const orders = loadOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    orders[orderIndex].status = status;
    saveOrders(orders);
    return true;
  }
  return false;
};

export const rejectOrder = (orderId) => {
  return updateOrderStatus(orderId, 6); // 6 for Rejected
};
/* =========================
   STATUS MAP
========================= */
export const ORDER_STATUS = {
  CONFIRMED: 1,
  BAKING: 2,
  QUALITY_CHECK: 3,
  OUT_FOR_DELIVERY: 4,
  DELIVERED: 5,
};
