import type { MetadataRoute } from "next";
import { getPublishedProducts } from "@/lib/products";

const STATIC_ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/shop", priority: 0.9, changeFrequency: "weekly" },
  { path: "/coaching", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/e-books", priority: 0.6, changeFrequency: "weekly" },
  { path: "/courses", priority: 0.6, changeFrequency: "weekly" },
  { path: "/vendors", priority: 0.6, changeFrequency: "weekly" },
  { path: "/legal/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/legal/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/legal/refund", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  let productEntries: MetadataRoute.Sitemap = [];
  try {
    const products = await getPublishedProducts();
    productEntries = products
      .filter((p) => !p.isComingSoon)
      .map((p) => ({
        url: `${baseUrl}/products/${p.slug}`,
        lastModified: new Date(p.createdAt),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));
  } catch {
    // Supabase unreachable at build time — product pages excluded from this sitemap generation
  }

  return [...staticEntries, ...productEntries];
}
