import { ProductDetails } from "@/src/features/products/components/product-details";
import { Footer } from "@/src/features/shared";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getProductData(id: string) {
  try {
    const variant = await prisma.productVariant.findUnique({
      where: { id },
      include: {
        breed: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
                image: true,
              },
            },
          },
        },
        images: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!variant) {
      return null;
    }

    // Get all variants for the same breed (for variant selection)
    const allBreedVariants = await prisma.productVariant.findMany({
      where: { breedId: variant.breedId },
      include: {
        images: {
          take: 1,
          orderBy: { order: "asc" },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    // Get all images for the breed
    const breedImages = await prisma.productImage.findMany({
      where: { breedId: variant.breedId },
      orderBy: { order: "asc" },
    });

    // Transform the data to match the frontend structure
    return {
      id: variant.id,
      name: `${variant.breed.name} - ${variant.gender === "N/A" ? variant.ageGroup : `${variant.gender}, ${variant.ageGroup}`}`,
      category: variant.breed.category.name,
      categorySlug: variant.breed.category.slug,
      breed: {
        id: variant.breed.id,
        name: variant.breed.name,
        slug: variant.breed.slug,
        description: variant.breed.description,
        origin: variant.breed.origin ?? undefined,
        purpose: variant.breed.purpose ?? undefined,
        image:
          variant.breed.image ||
          variant.breed.category.image ||
          "/placeholder-product.jpg",
      },
      variants: allBreedVariants.map((v) => ({
        id: v.id,
        gender: v.gender,
        ageGroup: v.ageGroup,
        price: v.price,
        stock: v.stock,
        image:
          v.image ||
          v.images[0]?.imageUrl ||
          variant.breed.image ||
          "/placeholder-product.jpg",
      })),
      images: [
        ...breedImages.map((img) => img.imageUrl),
        ...allBreedVariants
          .map((v) => v.image)
          .filter(Boolean) as string[],
        variant.breed.image,
      ].filter(Boolean) as string[],
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

async function getRelatedProducts(id: string) {
  try {
    // Get the current product to find its category
    const currentVariant = await prisma.productVariant.findUnique({
      where: { id },
      include: {
        breed: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!currentVariant) {
      return [];
    }

    // Get other products from the same category, excluding the current breed
    const relatedVariants = await prisma.productVariant.findMany({
      where: {
        breed: {
          categoryId: currentVariant.breed.categoryId,
        },
        breedId: {
          not: currentVariant.breedId,
        },
      },
      include: {
        breed: {
          include: {
            category: {
              select: {
                name: true,
                slug: true,
                image: true,
              },
            },
          },
        },
        images: {
          take: 1,
          orderBy: { order: "asc" },
        },
      },
      take: 4,
      orderBy: { createdAt: "desc" },
    });

    // Transform the data
    return relatedVariants.map((variant) => ({
      id: variant.id,
      name: `${variant.breed.name} - ${variant.gender === "N/A" ? variant.ageGroup : `${variant.gender}, ${variant.ageGroup}`}`,
      price: variant.price,
      image:
        variant.image ||
        variant.images[0]?.imageUrl ||
        variant.breed.image ||
        variant.breed.category.image ||
        "/placeholder-product.jpg",
      category: variant.breed.category.name,
      categorySlug: variant.breed.category.slug,
    }));
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductData(id);
  const relatedProducts = await getRelatedProducts(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductDetails product={product} relatedProducts={relatedProducts} />
      <Footer />
    </>
  );
}

