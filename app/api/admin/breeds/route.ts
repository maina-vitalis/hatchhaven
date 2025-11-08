import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-session";

// GET all breeds
export async function GET() {
  try {
    const breeds = await prisma.breed.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(breeds);
  } catch (error) {
    console.error("Error fetching breeds:", error);
    return NextResponse.json(
      { error: "Failed to fetch breeds" },
      { status: 500 }
    );
  }
}

// POST create new breed
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
    const { name, slug, description, origin, purpose, image, categoryId } = body;

    if (!name || !slug || !description || !categoryId) {
      return NextResponse.json(
        { error: "Name, slug, description, and category are required" },
        { status: 400 }
      );
    }

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Check if slug already exists
    const existingBreed = await prisma.breed.findUnique({
      where: { slug },
    });

    if (existingBreed) {
      return NextResponse.json(
        { error: "A breed with this slug already exists" },
        { status: 400 }
      );
    }

    const breed = await prisma.breed.create({
      data: {
        name,
        slug,
        description,
        origin: origin || null,
        purpose: purpose || null,
        image: image || null,
        categoryId,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json(breed, { status: 201 });
  } catch (error) {
    console.error("Error creating breed:", error);
    return NextResponse.json(
      { error: "Failed to create breed" },
      { status: 500 }
    );
  }
}

