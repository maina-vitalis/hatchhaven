import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

// GET related products (same category, excluding current product)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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
      return NextResponse.json([]);
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
    const relatedProducts = relatedVariants.map((variant) => ({
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

    return NextResponse.json(relatedProducts);
  } catch (error) {
    console.error("Error fetching related products:", error);
    return NextResponse.json(
      { error: "Failed to fetch related products" },
      { status: 500 }
    );
  }
}

