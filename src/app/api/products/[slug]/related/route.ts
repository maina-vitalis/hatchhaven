import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

// GET related products (same category, excluding current product)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Get the current breed by slug to find its category
    const currentBreed = await prisma.breed.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!currentBreed) {
      return NextResponse.json([]);
    }

    // Get other breeds from the same category, excluding the current breed
    const relatedBreeds = await prisma.breed.findMany({
      where: {
        categoryId: currentBreed.categoryId,
        id: {
          not: currentBreed.id,
        },
      },
      include: {
        category: {
          select: {
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
      take: 4,
      orderBy: { createdAt: "desc" },
    });

    // Transform the data - return breed-based products with slug
    const relatedProducts = relatedBreeds
      .filter(breed => breed.variants.length > 0) // Only include breeds with variants
      .map((breed) => {
        const firstVariant = breed.variants[0];
        return {
          id: breed.id,
          slug: breed.slug,
          name: breed.name,
          price: firstVariant.price,
          image:
            firstVariant.image ||
            firstVariant.images[0]?.imageUrl ||
            breed.image ||
            breed.category.image ||
            "/placeholder-product.jpg",
          category: breed.category.name,
          categorySlug: breed.category.slug,
        };
      });

    return NextResponse.json(relatedProducts);
  } catch (error) {
    console.error("Error fetching related products:", error);
    return NextResponse.json(
      { error: "Failed to fetch related products" },
      { status: 500 }
    );
  }
}