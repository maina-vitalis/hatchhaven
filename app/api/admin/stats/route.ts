import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-session";

export async function GET() {
  try {
    // Check if user is authenticated and is admin
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch counts in parallel
    const [
      totalProducts,
      totalOrders,
      totalRevenue,
      totalUsers,
      totalCategories,
      totalBreeds,
    ] = await Promise.all([
      prisma.productVariant.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: {
          totalAmount: true,
        },
      }),
      prisma.user.count({
        where: {
          role: "CUSTOMER",
        },
      }),
      prisma.category.count(),
      prisma.breed.count(),
    ]);

    return NextResponse.json({
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      totalUsers,
      totalCategories,
      totalBreeds,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

