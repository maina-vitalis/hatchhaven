import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single product variant by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
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
    const product = {
      id: variant.id,
      name: `${variant.breed.name} - ${variant.gender === "N/A" ? variant.ageGroup : `${variant.gender}, ${variant.ageGroup}`}`,
      category: variant.breed.category.name,
      categorySlug: variant.breed.category.slug,
      breed: {
        id: variant.breed.id,
        name: variant.breed.name,
        slug: variant.breed.slug,
        description: variant.breed.description,
        origin: variant.breed.origin,
        purpose: variant.breed.purpose,
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

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

