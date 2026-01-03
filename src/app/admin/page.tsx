"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Loader2,
  Tag,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalCategories: number;
  totalBreeds: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {stats?.totalProducts || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Product variants
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {stats?.totalOrders || 0}
                </div>
                <p className="text-xs text-muted-foreground">All time orders</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  $
                  {(stats?.totalRevenue || 0).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total sales revenue
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {stats?.totalUsers || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Registered customers
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2 rounded-xl shadow-sm">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and activities</CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/admin/orders">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center rounded-lg border border-dashed">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Layers className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No recent activity</h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground max-w-sm">
                There hasn't been any recent activity on the platform. New
                orders and updates will appear here.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="xl:col-span-1 rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <Link href="/admin/products" className="w-full">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 h-11"
                >
                  <Package className="h-4 w-4 text-muted-foreground" />
                  Add Products
                </Button>
              </Link>
              <Link href="/admin/categories" className="w-full">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 h-11"
                >
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  Manage Categories
                  <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {stats?.totalCategories || 0}
                  </span>
                </Button>
              </Link>
              <Link href="/admin/breeds" className="w-full">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 h-11"
                >
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  Manage Breeds
                  <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {stats?.totalBreeds || 0}
                  </span>
                </Button>
              </Link>
              <Link href="/admin/variants" className="w-full">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 h-11"
                >
                  <Package className="h-4 w-4 text-muted-foreground" />
                  Manage Variants
                  <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {stats?.totalProducts || 0}
                  </span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
