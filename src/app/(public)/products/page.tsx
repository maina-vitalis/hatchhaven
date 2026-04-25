import type { Metadata } from "next";
import {
  FilterableProductGrid,
} from "@/src/features/products";
import prisma from "@/src/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop Poultry & Eggs",
  description:
    "Browse and order premium free-range chickens, turkeys, ducks, guinea fowl, and fresh eggs from Hatch Haven Acres, Nanyuki, Kenya.",
  openGraph: {
    title: "Shop Poultry & Eggs | Hatch Haven Acres",
    description: "Premium farm-raised poultry and eggs delivered across Kenya.",
    url: "https://www.hatchhavenacres.com/products",
  },
};

async function getInitialData() {
  try {
    const [breeds, categories] = await Promise.all([
      // Get breeds instead of variants to match the API approach
      prisma.breed.findMany({
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
              image: true,
            },
          },
          variants: {
            take: 1, // Get first variant for each breed
            include: {
              images: {
                take: 1,
                orderBy: { order: "asc" },
              },
            },
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.category.findMany({
        orderBy: { name: "asc" },
      }),
    ]);

    // Filter out breeds without variants and transform the data
    const formattedProducts = breeds
      .filter(breed => breed.variants.length > 0)
      .map((breed) => {
        const firstVariant = breed.variants[0];
        return {
          id: breed.id,
          slug: breed.slug, // Add slug field
          name: breed.name, // Use breed name instead of variant-specific name
          price: firstVariant.price,
          image:
            firstVariant.image ||
            firstVariant.images[0]?.imageUrl ||
            breed.image ||
            breed.category.image ||
            "/placeholder-product.jpg",
          category: breed.category.slug,
          categoryName: breed.category.name,
          breed: {
            id: breed.id,
            name: breed.name,
            slug: breed.slug,
          },
          // Include first variant info for compatibility
          gender: firstVariant.gender,
          ageGroup: firstVariant.ageGroup,
          stock: firstVariant.stock,
        };
      });

    const formattedCategories = categories.map((cat) => ({
      ...cat,
      image: cat.image ?? undefined,
    }));

    return { products: formattedProducts, categories: formattedCategories };
  } catch (error) {
    console.error("Error fetching initial data:", error);
    return { products: [], categories: [] };
  }
}

export default async function ProductsPage() {
  const { products, categories } = await getInitialData();

  return (
    <FilterableProductGrid
      initialProducts={products}
      initialCategories={categories}
    />
  );
}
