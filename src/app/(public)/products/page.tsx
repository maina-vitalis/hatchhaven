import {
  ProductHero,
  FilterableProductGrid,
  FeaturedProducts,
  VideoSection,
  ProductGallery,
} from "@/src/features/products";
import { Footer } from "@/src/features/shared";
import prisma from "@/src/lib/prisma";

export const dynamic = "force-dynamic";

async function getInitialData() {
  try {
    const [products, categories] = await Promise.all([
      prisma.productVariant.findMany({
        include: {
          breed: {
            include: {
              category: true,
            },
          },
          images: {
            take: 1,
            orderBy: { order: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.category.findMany({
        orderBy: { name: "asc" },
      }),
    ]);

    const formattedProducts = products.map((variant) => ({
      id: variant.id,
      name: `${variant.breed.name} - ${
        variant.gender === "N/A"
          ? variant.ageGroup
          : `${variant.gender}, ${variant.ageGroup}`
      }`,
      price: variant.price,
      image:
        variant.image ||
        variant.images[0]?.imageUrl ||
        variant.breed.image ||
        variant.breed.category.image ||
        "/placeholder-product.jpg",
      category: variant.breed.category.slug,
      categoryName: variant.breed.category.name,
      stock: variant.stock,
    }));

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
    <>
      <ProductHero />
      <FilterableProductGrid
        initialProducts={products}
        initialCategories={categories}
      />
      <FeaturedProducts />
      <VideoSection />
      <ProductGallery />
      <Footer />
    </>
  );
}
