"use client";

import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";
import { Button } from "@/components/ui/Button";

interface BuyNowButtonProps {
  productId: string;
}

export function BuyNowButton({ productId }: BuyNowButtonProps) {
  const { addItem } = useCart();
  const router = useRouter();

  function handleClick() {
    addItem(productId);
    router.push("/cart");
  }

  return (
    <Button type="button" size="lg" onClick={handleClick}>
      Buy Now
    </Button>
  );
}
