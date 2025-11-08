import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all products (variants) with optional category filter
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categorySlug = searchParams.get("category");
    const limit = searchParams.get("limit");

    const where: any = {};

    // If category filter is provided, filter by category
    if (categorySlug && categorySlug !== "all") {
      where.breed = {
        category: {
          slug: categorySlug,
        },
      };
    }

    const variants = await prisma.productVariant.findMany({
      where,
      take: limit ? parseInt(limit, 10) : undefined,
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
          take: 1,
          orderBy: { order: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Transform the data to match the frontend structure
    const products = variants.map((variant) => ({
      id: variant.id,
      name: `${variant.breed.name} - ${variant.gender === "N/A" ? variant.ageGroup : `${variant.gender}, ${variant.ageGroup}`}`,
      price: variant.price,
      image:
        variant.image ||
        variant.images[0]?.imageUrl ||
        variant.breed.image ||
        variant.breed.category.image ||
        "/placeholder-product.jpg",
      category: variant.breed.category.slug,
      categoryName: variant.breed.category.name,
      breed: {
        id: variant.breed.id,
        name: variant.breed.name,
        slug: variant.breed.slug,
      },
      gender: variant.gender,
      ageGroup: variant.ageGroup,
      stock: variant.stock,
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

