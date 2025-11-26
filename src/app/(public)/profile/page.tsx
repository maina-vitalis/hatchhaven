import { auth } from "@/src/lib/auth";
import prisma from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { formatPrice } from "@/src/lib/utils";
import { format } from "date-fns";
import { Badge } from "@/src/components/ui/badge";
import { User, Package, Settings, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { ProfileForm } from "@/src/features/profile/components/profile-form";
import { PasswordForm } from "@/src/features/profile/components/password-form";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        include: {
          items: {
            include: {
              variant: {
                include: {
                  breed: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar / User Info Card */}
          <div className="w-full md:w-1/3 space-y-6">
            <Card className="border-none shadow-md overflow-hidden">
              <div className="h-32 bg-primary/10 w-full"></div>
              <CardContent className="pt-0 relative">
                <div className="absolute -top-16 left-6 h-32 w-32 rounded-full border-4 border-background bg-muted flex items-center justify-center overflow-hidden">
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.image} alt={user.name || "User"} className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-16 w-16 text-muted-foreground" />
                  )}
                </div>
                <div className="mt-20 space-y-1">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="pt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="rounded-full">
                      {user.role}
                    </Badge>
                    <span>Joined {format(new Date(user.createdAt), "MMM yyyy")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-primary/5">
                    <p className="text-3xl font-bold text-primary">{user.orders.length}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1">Orders</p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5">
                    <p className="text-3xl font-bold text-primary">
                      {formatPrice(user.orders.reduce((acc, order) => acc + order.totalAmount, 0))}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1">Spent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="w-full justify-start h-auto p-1 bg-background border rounded-xl mb-6">
                <TabsTrigger 
                  value="orders" 
                  className="flex-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-3 rounded-lg"
                >
                  <Package className="mr-2 h-4 w-4" />
                  Orders
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="flex-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-3 rounded-lg"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="mt-0">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View and track your recent orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.orders.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                          <Package className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                        <p className="text-muted-foreground mb-6">Start shopping to see your orders here.</p>
                        <Button asChild>
                          <Link href="/products">Browse Products</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Order ID</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Total</TableHead>
                              <TableHead className="text-right">Items</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {user.orders.map((order) => (
                              <TableRow key={order.id}>
                                <TableCell className="font-mono text-xs font-medium">
                                  #{order.id.slice(-8).toUpperCase()}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                  {format(new Date(order.createdAt), "MMM d, yyyy")}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant="outline"
                                    className={
                                      order.status === "DELIVERED"
                                        ? "bg-green-50 text-green-700 border-green-200"
                                        : order.status === "PENDING"
                                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                        : "bg-gray-50 text-gray-700 border-gray-200"
                                    }
                                  >
                                    {order.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-medium">
                                  {formatPrice(order.totalAmount)}
                                </TableCell>
                                <TableCell className="text-right text-muted-foreground">
                                  {order.items.length}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-0 space-y-6">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ProfileForm user={{ name: user.name, email: user.email }} />
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Manage your password</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PasswordForm />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
