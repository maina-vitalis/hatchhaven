import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

// GET all products (breeds) with optional category filter
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categorySlug = searchParams.get("category");
    const limit = searchParams.get("limit");

    const where: {
      category?: {
        slug: string;
      };
    } = {};

    // If category filter is provided, filter by category
    if (categorySlug && categorySlug !== "all") {
      where.category = {
        slug: categorySlug,
      };
    }

    // Get breeds instead of variants to avoid duplicates
    const breeds = await prisma.breed.findMany({
      where,
      take: limit ? parseInt(limit, 10) : undefined,
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
          take: 1, // Get first variant for pricing and stock info
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
    });

    // Filter out breeds without variants and transform the data
    const products = breeds
      .filter(breed => breed.variants.length > 0)
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

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

