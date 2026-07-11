"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { Button } from "@/components/ui/Button";

interface AddToCartButtonProps {
  productId: string;
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { items, addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = items.includes(productId);

  function handleClick() {
    addItem(productId);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <Button type="button" variant="secondary" size="lg" onClick={handleClick}>
      {justAdded || inCart ? "Added to Cart ✓" : "Add to Cart"}
    </Button>
  );
}
