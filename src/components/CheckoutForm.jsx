// src/CheckoutForm.jsx
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
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 14px rgb(0 0 0 / 0.1)",
        background: "#fff",
        maxWidth: "400px",
        margin: "40px auto",
        textAlign: "center",
        fontFamily: "Helvetica, Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Enter Your Payment Details</h2>

      {/* Customer Information */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        disabled={processing}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          width: "100%",
          fontSize: "16px",
        }}
        required
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email Address"
        disabled={processing}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          width: "100%",
          fontSize: "16px",
        }}
        required
      />

      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Street Address"
        disabled={processing}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          width: "100%",
          fontSize: "16px",
        }}
        required
      />

      {/* Card details */}
      <div
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "20px",
        }}
      >
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>

      <button
        disabled={!stripe || processing}
        type="submit"
        style={{
          padding: "12px 20px",
          background: processing ? "#888" : "#6772E5",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: processing ? "not-allowed" : "pointer",
          boxShadow: "0 4px 14px rgb(0 0 0 / 0.1)",
          transform: "translateY(0)",
          transition: "transform 0.3s ease",
        }}
      >
        {processing ? "Processing…" : "Pay Now"}
      </button>

      {error && <div style={{ color: "red", marginTop: "20px" }}>{error}</div>}

      {paymentSuccess && (
        <div style={{ color: "green", marginTop: "20px" }}>
          ✅ Payment successful! Thank you for your order.
          <br />
          <br />
          <button
            className="buy-now-button"
            onClick={() => navigate("/")}
            style={{
              padding: "10px 20px",
              background: "#6772E5",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgb(0 0 0 / 0.1)",
              transform: "translateY(0)",
              transition: "transform 0.3s ease",
            }}
          >
            Back Home
          </button>
        </div>
      )}
    </form>
  );
}

export default CheckoutForm;
