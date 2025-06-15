import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51RITe84gLRA5Z0ymYo5OqzxjQmB4hveFlxYRvFaON4L3emUQbxjxB696YCOP5xWNhySfLHFdcqqFnil0qNEyT92o00oIVxx6d0"
);

function Checkout() {
  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default Checkout;
