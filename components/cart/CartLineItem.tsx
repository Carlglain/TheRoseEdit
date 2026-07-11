"use client";

import { useCart } from "./CartContext";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/format";
import { PRODUCT_TYPE_LABELS } from "@/lib/constants";
import type { Product } from "@/types";

interface CartLineItemProps {
  product: Product;
}

export function CartLineItem({ product }: CartLineItemProps) {
  const { removeItem } = useCart();

  return (
    <div className="flex items-center gap-4 rounded-brand border border-line bg-white p-4">
      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-[10px] bg-line">
        <span className="text-[10px] text-muted">Cover</span>
      </div>

      <div className="min-w-0 flex-1">
        <Badge variant="gold" className="mb-1">
          {PRODUCT_TYPE_LABELS[product.type]}
        </Badge>
        <h3 className="truncate font-heading text-base text-ink">{product.name}</h3>
        <p className="mt-1 text-xs text-muted">Qty 1 · Digital download</p>
      </div>

      <div className="flex flex-shrink-0 flex-col items-end gap-2">
        <span className="text-sm font-medium text-ink">
          {formatPrice(product.priceMinor, product.currency)}
        </span>
        <button
          type="button"
          onClick={() => removeItem(product.id)}
          className="text-xs text-muted underline-offset-2 transition-colors duration-200 hover:text-ink hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
