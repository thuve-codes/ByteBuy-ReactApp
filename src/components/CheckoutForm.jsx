import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      // Here you would normally create a PaymentIntent server-side first
      // Mocked response for demonstration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setProcessing(false);
      setPaymentSuccess(true);
      setError(null);
    } catch (err) {
      setProcessing(false);
      setError(err.message);
      setPaymentSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Enter Your Payment Details</h2>

      {/* Customer Information */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        disabled={processing}
        required
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email Address"
        disabled={processing}
        required
      />

      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Street Address"
        disabled={processing}
        required
      />

      {/* Card details */}
      <div className="card-element">
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>

      <button disabled={!stripe || processing} type="submit">
        {processing ? "Processing…" : "Pay Now"}
      </button>

      {error && <div className="error-message">{error}</div>}

      {paymentSuccess && (
        <div className="payment-success">
          ✅ Payment successful! Thank you for your order.
          <br />
          <br />
          <button className="buy-now-button" onClick={() => navigate("/")}>
            Back Home
          </button>
        </div>
      )}
    </form>
  );
}

export default CheckoutForm;
