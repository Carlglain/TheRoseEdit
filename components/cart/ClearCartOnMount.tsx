"use client";

import { useEffect } from "react";
import { useCart } from "./CartContext";

// Drops the cart cookie once a checkout has actually completed (the success page only renders
// after Stripe redirects back, so reaching this point means the customer is done with the cart).
export function ClearCartOnMount() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
