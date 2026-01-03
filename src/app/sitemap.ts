import { MetadataRoute } from "next";
import prisma from "@/src/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.hatchhavenacres.co.ke";

  // Static routes
  const routes = [
    "",
    "/products",
    "/about",
    "/contact",
    "/blog",
    "/gallery",
    "/faq",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic routes (Products)
  // Fetch all product variants
  const products = await prisma.productVariant.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...productRoutes];
}
