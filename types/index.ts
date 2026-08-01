export type ProductType = "ebook" | "course" | "vendor_list" | "resource";

export interface Product {
  id: string;
  slug: string;
  name: string;
  type: ProductType;
  description: string;
  priceMinor: number;
  currency: string;
  isPublished: boolean;
  isComingSoon: boolean;
  coverImageUrl: string | null;
  storagePath: string | null;
  stripePriceId: string | null;
  createdAt: string;
}

export type OrderStatus = "pending" | "paid" | "failed" | "refunded";
export type PaymentProvider = "stripe" | "paypal";

export interface Order {
  id: string;
  email: string;
  status: OrderStatus;
  paymentProvider: PaymentProvider;
  providerRef: string | null;
  amountMinor: number;
  currency: string;
  emailSentAt: string | null;
  createdAt: string;
}

export interface DownloadGrant {
  id: string;
  orderId: string;
  productId: string;
  token: string;
  expiresAt: string;
  maxDownloads: number;
  downloadCount: number;
}

export interface NavItem {
  label: string;
  href: string;
}
