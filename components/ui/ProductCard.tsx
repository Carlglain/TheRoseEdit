import Image from "next/image";
import { Button } from "./Button";
import { formatPrice } from "@/lib/format";
import { PRODUCT_TYPE_LABELS } from "@/lib/constants";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const available = !product.isComingSoon;

  return (
    <div className="group relative">
      {!available && (
        <span className="absolute right-3 top-3 z-10 bg-cream/95 px-2.5 py-1 text-[11px] font-medium tracking-wide text-muted">
          Coming Soon
        </span>
      )}
      <div className="relative mb-5 aspect-[4/3] overflow-hidden bg-line">
        {product.coverImageUrl ? (
          <Image
            src={product.coverImageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-xs text-muted">Cover Image</span>
          </div>
        )}
      </div>
      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
        {PRODUCT_TYPE_LABELS[product.type]}
      </p>
      <h3 className="font-heading text-lg font-light leading-snug text-ink">{product.name}</h3>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-ink">
          {formatPrice(product.priceMinor, product.currency)}
        </span>
        {available ? (
          <Button href={`/products/${product.slug}`} size="sm" variant="ghost">
            View
          </Button>
        ) : (
          <span className="text-xs text-muted">Notify Me</span>
        )}
      </div>
    </div>
  );
}
