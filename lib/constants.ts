import type { NavItem, ProductType } from "@/types";

export const SITE_NAME = "RoseAudit";

export const CONTACT_EMAIL = "theroseaudit@gmail.com";

// TODO: confirm WhatsApp number/link with client.
export const WHATSAPP_URL = "https://wa.me/";

/** Always visible in the top bar */
export const PRIMARY_NAV: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Opens in the sidebar menu */
export const SIDEBAR_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Courses", href: "/courses" },
  { label: "E-Books", href: "/e-books" },
  { label: "Vendors", href: "/vendors" },
  { label: "Coaching", href: "/coaching" },
];

/** Full list for footer / sitemaps */
export const NAV_ITEMS: NavItem[] = [
  ...SIDEBAR_NAV,
  ...PRIMARY_NAV,
];

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
