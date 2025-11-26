import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { getCurrentUser } from "@/src/lib/get-session";

// GET single variant
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
    });

    if (!variant) {
      return NextResponse.json(
        { error: "Variant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(variant);
  } catch (error) {
    console.error("Error fetching variant:", error);
    return NextResponse.json(
      { error: "Failed to fetch variant" },
      { status: 500 }
    );
  }
}

// PUT/PATCH update variant
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
    const { gender, ageGroup, price, stock, image, breedId } = body;

    if (!gender || !ageGroup || !price || breedId) {
      return NextResponse.json(
        { error: "Gender, age group, price, and breed are required" },
        { status: 400 }
      );
    }

    // Check if variant exists
    const existingVariant = await prisma.productVariant.findUnique({
      where: { id },
    });

    if (!existingVariant) {
      return NextResponse.json(
        { error: "Variant not found" },
        { status: 404 }
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

    const variant = await prisma.productVariant.update({
      where: { id },
      data: {
        gender,
        ageGroup,
        price: parseFloat(price),
        stock: parseInt(stock || "0", 10),
        image: image || null,
        breedId,
      },
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
    });

    return NextResponse.json(variant);
  } catch (error) {
    console.error("Error updating variant:", error);
    return NextResponse.json(
      { error: "Failed to update variant" },
      { status: 500 }
    );
  }
}

// DELETE variant
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
    // Check if variant exists
    const variant = await prisma.productVariant.findUnique({
      where: { id },
      include: {
        cartItems: {
          take: 1,
        },
        orderItems: {
          take: 1,
        },
      },
    });

    if (!variant) {
      return NextResponse.json(
        { error: "Variant not found" },
        { status: 404 }
      );
    }

    // Check if variant is in carts or orders
    if (variant.cartItems.length > 0 || variant.orderItems.length > 0) {
      return NextResponse.json(
        { error: "Cannot delete variant that is in carts or orders. Consider setting stock to 0 instead." },
        { status: 400 }
      );
    }

    // Delete image from Cloudinary if exists
    if (variant.image) {
      const { extractPublicId, deleteImage } = await import("@/src/lib/cloudinary");
      const publicId = extractPublicId(variant.image);
      if (publicId) {
        await deleteImage(publicId);
      }
    }

    await prisma.productVariant.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Variant deleted successfully" });
  } catch (error) {
    console.error("Error deleting variant:", error);
    return NextResponse.json(
      { error: "Failed to delete variant" },
      { status: 500 }
    );
  }
}

