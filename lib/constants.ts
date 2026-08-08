import type { NavItem, ProductType } from "@/types";

export const SITE_NAME = "RoseAudit";

export const CONTACT_EMAIL = "theroseaudit@gmail.com";

export const WHATSAPP_URL = "https://wa.me/";

/** Top-bar navigation — Vendors lives under Shop, not as its own tab */
export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "E-Books", href: "/e-books" },
  { label: "Courses", href: "/courses" },
  { label: "Shop", href: "/shop" },
  { label: "Coaching", href: "/coaching" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** @deprecated use PRIMARY_NAV — kept for any leftover imports */
export const SIDEBAR_NAV: NavItem[] = PRIMARY_NAV;

export const NAV_ITEMS: NavItem[] = PRIMARY_NAV;

export const LEGAL_LINKS: NavItem[] = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Refund Policy", href: "/legal/refund" },
];

export const IS_FOR_YOU = [
  "Ready to take control of your financial future",
  "Want to build a sustainable online business",
  "Willing to put in the work",
  "Want a supportive community on the journey",
];

export const NOT_FOR_YOU = [
  "Looking for overnight luck or shortcuts",
  "Expecting results without doing the work",
  "Unwilling to invest in your own growth",
  "Prefer short-term gains over lasting wealth",
];

export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  ebook: "E-Book",
  course: "Course",
  vendor_list: "Vendor List",
  resource: "Resource",
};
