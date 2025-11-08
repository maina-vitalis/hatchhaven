import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-session";

// GET single breed
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const breed = await prisma.breed.findUnique({
      where: { id },
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

    if (!breed) {
      return NextResponse.json(
        { error: "Breed not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(breed);
  } catch (error) {
    console.error("Error fetching breed:", error);
    return NextResponse.json(
      { error: "Failed to fetch breed" },
      { status: 500 }
    );
  }
}

// PUT/PATCH update breed
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { name, slug, description, origin, purpose, image, categoryId } = body;

    if (!name || !slug || !description || !categoryId) {
      return NextResponse.json(
        { error: "Name, slug, description, and category are required" },
        { status: 400 }
      );
    }

    // Check if breed exists
    const existingBreed = await prisma.breed.findUnique({
      where: { id },
    });

    if (!existingBreed) {
      return NextResponse.json(
        { error: "Breed not found" },
        { status: 404 }
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

    // Check if slug is being changed and if new slug already exists
    if (slug !== existingBreed.slug) {
      const slugExists = await prisma.breed.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: "A breed with this slug already exists" },
          { status: 400 }
        );
      }
    }

    const breed = await prisma.breed.update({
      where: { id },
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

    return NextResponse.json(breed);
  } catch (error) {
    console.error("Error updating breed:", error);
    return NextResponse.json(
      { error: "Failed to update breed" },
      { status: 500 }
    );
  }
}

// DELETE breed
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    // Check if breed exists
    const breed = await prisma.breed.findUnique({
      where: { id },
      include: {
        variants: {
          take: 1,
        },
      },
    });

    if (!breed) {
      return NextResponse.json(
        { error: "Breed not found" },
        { status: 404 }
      );
    }

    // Check if breed has variants
    if (breed.variants.length > 0) {
      return NextResponse.json(
        { error: "Cannot delete breed with associated variants. Please delete variants first." },
        { status: 400 }
      );
    }

    await prisma.breed.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Breed deleted successfully" });
  } catch (error) {
    console.error("Error deleting breed:", error);
    return NextResponse.json(
      { error: "Failed to delete breed" },
      { status: 500 }
    );
  }
}

