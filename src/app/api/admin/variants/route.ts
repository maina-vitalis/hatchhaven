import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { getCurrentUser } from "@/src/lib/get-session";

// GET all variants
export async function GET() {
  try {
    const variants = await prisma.productVariant.findMany({
      include: {
        breed: {
          select: {
            id: true,
            name: true,
            slug: true,
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(variants);
  } catch (error) {
    console.error("Error fetching variants:", error);
    return NextResponse.json(
      { error: "Failed to fetch variants" },
      { status: 500 }
    );
  }
}

// POST create new variants (batch)
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { variants, breedId } = body;

    if (!variants || !Array.isArray(variants) || variants.length === 0) {
      return NextResponse.json(
        { error: "At least one variant is required" },
        { status: 400 }
      );
    }

    if (!breedId) {
      return NextResponse.json(
        { error: "Breed ID is required" },
        { status: 400 }
      );
    }

    // Verify breed exists
    const breed = await prisma.breed.findUnique({
      where: { id: breedId },
    });

    if (!breed) {
      return NextResponse.json(
        { error: "Breed not found" },
        { status: 404 }
      );
    }

    // Create all variants
    const createdVariants = await Promise.all(
      variants.map((variant: { gender: string; ageGroup: string; price: string; stock?: string; image?: string }) =>
        prisma.productVariant.create({
          data: {
            breedId,
            gender: variant.gender,
            ageGroup: variant.ageGroup,
            price: parseFloat(variant.price),
            stock: parseInt(variant.stock || "0", 10),
            image: variant.image || null,
          },
        })
      )
    );

    return NextResponse.json(
      { variants: createdVariants, count: createdVariants.length },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating variants:", error);
    return NextResponse.json(
      { error: "Failed to create variants" },
      { status: 500 }
    );
  }
}

