import { useState } from "react";

export default function PaymentSection({
  total,
  paymentMethod,
  setPaymentMethod,
  onPayment,
  isLoading,
}) {
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  /* ================= VALIDATION ================= */
  const isUpiValid = /^[\w.-]+@[\w.-]+$/.test(upiId);

  const isCardValid =
    card.number.length === 16 &&
    card.cvv.length === 3 &&
    card.expiry &&
    card.name;

  const canProceed =
    paymentMethod === "COD" ||
    (paymentMethod === "UPI" && isUpiValid) ||
    (paymentMethod === "CARD" && isCardValid);

  /* ================= UI ================= */
  return (
    <div className="mt-6 space-y-5">

      {/* TOTAL */}
      <div className="p-4 rounded-xl border bg-rose-50 text-center text-xl font-bold">
        Total: ₹{total.toFixed(2)}
      </div>

      {/* PAYMENT OPTIONS */}
      <div className="space-y-3">

        {/* COD */}
        <label className={`payment-option ${paymentMethod === "COD" ? "active" : ""}`}>
          <input
            type="radio"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          Cash on Delivery
        </label>

        {/* UPI */}
        <label className={`payment-option ${paymentMethod === "UPI" ? "active" : ""}`}>
          <input
            type="radio"
            checked={paymentMethod === "UPI"}
            onChange={() => setPaymentMethod("UPI")}
          />
          UPI
        </label>

        {paymentMethod === "UPI" && (
          <input
            type="text"
            placeholder="example@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-400"
          />
        )}

        {/* CARD */}
        <label className={`payment-option ${paymentMethod === "CARD" ? "active" : ""}`}>
          <input
            type="radio"
            checked={paymentMethod === "CARD"}
            onChange={() => setPaymentMethod("CARD")}
          />
          Credit / Debit Card
        </label>

        {paymentMethod === "CARD" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              placeholder="Card Number"
              maxLength={16}
              value={card.number}
              onChange={(e) => setCard({ ...card, number: e.target.value })}
              className="p-3 border rounded"
            />
            <input
              placeholder="Cardholder Name"
              value={card.name}
              onChange={(e) => setCard({ ...card, name: e.target.value })}
              className="p-3 border rounded"
            />
            <input
              placeholder="MM/YY"
              value={card.expiry}
              onChange={(e) => setCard({ ...card, expiry: e.target.value })}
              className="p-3 border rounded"
            />
            <input
              placeholder="CVV"
              maxLength={3}
              value={card.cvv}
              onChange={(e) => setCard({ ...card, cvv: e.target.value })}
              className="p-3 border rounded"
            />
          </div>
        )}
      </div>

      {/* CONFIRM */}
      <button
        disabled={!canProceed || isLoading}
        onClick={() =>
          onPayment({
            method: paymentMethod,
            upiId: paymentMethod === "UPI" ? upiId : null,
            card: paymentMethod === "CARD" ? card : null,
          })
        }
        className="w-full py-3 rounded-xl bg-rose-500 text-white font-bold disabled:opacity-50"
      >
        {isLoading ? "Placing Order..." : "Confirm Order"}
      </button>
    </div>
  );
}
