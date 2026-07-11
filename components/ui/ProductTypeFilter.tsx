import Link from "next/link";
import type { ProductType } from "@/types";

const FILTERS: { label: string; value: ProductType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "E-Books", value: "ebook" },
  { label: "Courses", value: "course" },
  { label: "Vendor Lists", value: "vendor_list" },
];

interface ProductTypeFilterProps {
  active: ProductType | "all";
}

export function ProductTypeFilter({ active }: ProductTypeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => {
        const isActive = filter.value === active;
        const href = filter.value === "all" ? "/shop" : `/shop?type=${filter.value}`;
        return (
          <Link
            key={filter.value}
            href={href}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "border-emerald bg-emerald text-cream"
                : "border-line text-muted hover:border-gold hover:text-ink"
            }`}
          >
            {filter.label}
          </Link>
        );
      })}
    </div>
  );
}
