import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-session";

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get("period") || "30"; // days
    const days = parseInt(period, 10);

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Sales over time (daily)
    const ordersByDate = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        createdAt: true,
        totalAmount: true,
        status: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Group by date
    const salesByDate: Record<string, { revenue: number; orders: number }> = {};
    ordersByDate.forEach((order) => {
      const date = order.createdAt.toISOString().split("T")[0];
      if (!salesByDate[date]) {
        salesByDate[date] = { revenue: 0, orders: 0 };
      }
      salesByDate[date].revenue += order.totalAmount;
      salesByDate[date].orders += 1;
    });

    // Convert to array format for chart
    const salesOverTime = Object.entries(salesByDate)
      .map(([date, data]) => ({
        date,
        revenue: data.revenue,
        orders: data.orders,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Revenue by category
    const ordersWithItems = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        status: {
          not: "CANCELLED",
        },
      },
      include: {
        items: {
          include: {
            variant: {
              include: {
                breed: {
                  include: {
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
            },
          },
        },
      },
    });

    const revenueByCategory: Record<string, { revenue: number; orders: number }> = {};
    ordersWithItems.forEach((order) => {
      order.items.forEach((item) => {
        const categoryName = item.variant.breed.category.name;
        if (!revenueByCategory[categoryName]) {
          revenueByCategory[categoryName] = { revenue: 0, orders: 0 };
        }
        revenueByCategory[categoryName].revenue += item.price * item.quantity;
        revenueByCategory[categoryName].orders += 1;
      });
    });

    const revenueByCategoryData = Object.entries(revenueByCategory)
      .map(([category, data]) => ({
        category,
        revenue: data.revenue,
        orders: data.orders,
      }))
      .sort((a, b) => b.revenue - a.revenue);

    // Order status breakdown
    const orderStatusCounts = await prisma.order.groupBy({
      by: ["status"],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: {
        id: true,
      },
    });

    const orderStatusData = orderStatusCounts.map((status) => ({
      status: status.status,
      count: status._count.id,
    }));

    // Top selling products
    const topProducts = await prisma.orderItem.groupBy({
      by: ["variantId"],
      where: {
        order: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
          status: {
            not: "CANCELLED",
          },
        },
      },
      _sum: {
        quantity: true,
        price: true,
      },
      _count: {
        id: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 10,
    });

    const variantIds = topProducts.map((p) => p.variantId);
    const variants = await prisma.productVariant.findMany({
      where: {
        id: {
          in: variantIds,
        },
      },
      include: {
        breed: {
          include: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const topProductsData = topProducts
      .map((product) => {
        const variant = variants.find((v) => v.id === product.variantId);
        if (!variant) return null;
        return {
          name: `${variant.breed.name} - ${variant.gender === "N/A" ? variant.ageGroup : `${variant.gender}, ${variant.ageGroup}`}`,
          category: variant.breed.category.name,
          quantity: product._sum.quantity || 0,
          revenue: (product._sum.price || 0) * (product._sum.quantity || 0),
          orders: product._count.id,
        };
      })
      .filter((p): p is NonNullable<typeof p> => p !== null)
      .sort((a, b) => b.quantity - a.quantity);

    // Overall statistics
    const totalRevenue = ordersByDate.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = ordersByDate.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // User growth
    const userGrowth = await prisma.user.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        role: "CUSTOMER",
      },
      _count: {
        id: true,
      },
    });

    const userGrowthByDate: Record<string, number> = {};
    userGrowth.forEach((group) => {
      const date = group.createdAt.toISOString().split("T")[0];
      userGrowthByDate[date] = (userGrowthByDate[date] || 0) + group._count.id;
    });

    const userGrowthData = Object.entries(userGrowthByDate)
      .map(([date, count]) => ({
        date,
        users: count,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json({
      salesOverTime,
      revenueByCategory: revenueByCategoryData,
      orderStatus: orderStatusData,
      topProducts: topProductsData,
      summary: {
        totalRevenue,
        totalOrders,
        averageOrderValue,
        period: days,
      },
      userGrowth: userGrowthData,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}

