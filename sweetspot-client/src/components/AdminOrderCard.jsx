import { Calendar, MapPin, Phone, CreditCard, CheckCircle, X } from "lucide-react";

export default function AdminOrderCard({ order, onAcceptOrder, onRejectOrder }) {
  if (!order) return null;

  const item = order.cartItems?.[0];
  const normalizeStatus = (status) => {
  if (status === undefined || status === null) return 0;
  if (typeof status === "number") return status;
  if (typeof status === "string") {
    if (status.toLowerCase() === "pending") return 0;
    if (status.toLowerCase() === "confirmed") return 1;
    if (status.toLowerCase() === "rejected") return 6;
  }
  return 0;
};

const status = normalizeStatus(order.status);



  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">

      {/* Cake Image */}
      <img
        src={item?.imageURL || item?.image}
        alt={item?.name}
        className="w-full h-44 object-cover"
      />

      {/* Content */}
      <div className="p-5 space-y-3">

        {/* Cake Name */}
        <h3 className="text-lg font-bold text-gray-800">
          {item?.name}
        </h3>

        {/* Quantity */}
        <p className="text-sm text-gray-600">
          Qty: <b>{item?.quantity}</b> | {item?.selectedWeight} kg
        </p>

        {/* Customer */}
        <p className="text-sm">
          <b>User:</b> {order.customerName}
        </p>

        {/* Phone */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Phone size={16} />
          {order.phone}
        </div>

        {/* Address */}
        <div className="flex gap-2 text-sm text-gray-700">
          <MapPin size={16} className="mt-0.5" />
          <span>{order.shippingAddress}</span>
        </div>

        {/* Delivery Date & Time */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Calendar size={16} />
          {order.selectedDeliveryDate} at {order.selectedDeliveryTime}
        </div>

        {/* Payment */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <CreditCard size={16} />
          {order.paymentMethod}
        </div>

        {/* Total */}
        <p className="text-lg font-bold text-rose-600">
          ₹{order.total}
        </p>

        {/* Accept and Reject Buttons - Show only for pending orders (status 0 or undefined) */}
       {status === 0 && (
  <div className="flex gap-2 mb-3">
    <button
      onClick={() => onAcceptOrder(order.id)}
      className="flex-1 bg-green-500 text-white py-2 rounded-lg"
    >
      Accept
    </button>

    <button
      onClick={() => onRejectOrder(order.id)}
      className="flex-1 bg-red-500 text-white py-2 rounded-lg"
    >
      Reject
    </button>
  </div>
)}



        {/* Status */}
        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full
  ${status === 1 && "bg-blue-100 text-blue-700"}
  ${status === 2 && "bg-yellow-100 text-yellow-700"}
  ${status === 3 && "bg-purple-100 text-purple-700"}
  ${status === 4 && "bg-orange-100 text-orange-700"}
  ${status === 5 && "bg-green-100 text-green-700"}
  ${status === 6 && "bg-red-100 text-red-700"}
  ${status === 0 && "bg-gray-100 text-gray-700"}
`}>
  {getStatusText(status)}
</span>


      </div>
    </div>
  );
}

/* ================= STATUS LABEL ================= */
function getStatusText(status) {
  switch (status) {
    case 0:
      return "Pending";
    case 1:
      return "Order Confirmed";
    case 2:
      return "Baking in Progress";
    case 3:
      return "Quality Check";
    case 4:
      return "Out for Delivery";
    case 5:
      return "Delivered";
    case 6:
      return "Rejected";
    default:
      return "Pending";
  }
}
