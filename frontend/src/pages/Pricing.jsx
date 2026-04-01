import { useState } from "react";
import { api } from "../api/axios";

function Pricing() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (loading) return; // 🚫 prevent multiple clicks

    setLoading(true);

    try {
      const res = await api.post("/api/payment/create-subscription");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        subscription_id: res.data.id,
        name: "LeadFlow",
        description: "Monthly Subscription",

        handler: async function () {
          alert("Payment successful 🎉");
          window.location.href = "/";
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className="bg-black text-white px-6 py-2 rounded w-full"
    >
      {loading ? "Processing..." : "Subscribe Now"}
    </button>
  );
}

export default Pricing;