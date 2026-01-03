import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

// GET single product by breed slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Find the breed by slug first
    const breed = await prisma.breed.findUnique({
      where: { slug },
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
          include: {
            images: {
              orderBy: { order: "asc" },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!breed || breed.variants.length === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Use the first variant as the primary variant (or you can add logic to select a default)
    const primaryVariant = breed.variants[0];

    // Get all images for the breed
    const breedImages = await prisma.productImage.findMany({
      where: { breedId: breed.id },
      orderBy: { order: "asc" },
    });

    // Transform the data to match the frontend structure
    const product = {
      id: primaryVariant.id,
      slug: breed.slug,
      name: breed.name,
      category: breed.category.name,
      categorySlug: breed.category.slug,
      breed: {
        id: breed.id,
        name: breed.name,
        slug: breed.slug,
        description: breed.description,
        origin: breed.origin,
        purpose: breed.purpose,
        image:
          breed.image ||
          breed.category.image ||
          "/placeholder-product.jpg",
      },
      variants: breed.variants.map((v) => ({
        id: v.id,
        gender: v.gender,
        ageGroup: v.ageGroup,
        price: v.price,
        stock: v.stock,
        image:
          v.image ||
          v.images[0]?.imageUrl ||
          breed.image ||
          "/placeholder-product.jpg",
      })),
      images: [
        ...breedImages.map((img) => img.imageUrl),
        ...breed.variants
          .map((v) => v.image)
          .filter(Boolean) as string[],
        breed.image,
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