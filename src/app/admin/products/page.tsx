"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { SidebarTrigger } from "@/src/components/ui/sidebar";
import { Button } from "@/src/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { LogOut, Package, Tag, Layers } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

import { CategoryForm } from "@/src/features/admin/components/product-creation/category-form";
import { BreedForm } from "@/src/features/admin/components/product-creation/breed-form";
import { ProductForm } from "@/src/features/admin/components/product-creation/product-form";

export default function ProductsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("category");

  const [categories, setCategories] = useState<
    Array<{ id: string; name: string; slug: string; image?: string }>
  >([]);
  
  const [breeds, setBreeds] = useState<
    Array<{
      id: string;
      name: string;
      categoryId: string;
      categoryName?: string;
    }>
  >([]);
  
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [catRes, breedRes] = await Promise.all([
        fetch("/api/admin/categories"),
        fetch("/api/admin/breeds")
      ]);

      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData);
      }

      if (breedRes.ok) {
        const breedData = await breedRes.json();
        setBreeds(
          breedData.map(
            (breed: {
              id: string;
              name: string;
              categoryId: string;
              category?: { name: string };
            }) => ({
              id: breed.id,
              name: breed.name,
              categoryId: breed.categoryId,
              categoryName: breed.category?.name,
            })
          )
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background z-10 sticky top-0">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Product Management</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden md:inline-block">
            {session?.user?.email}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-auto bg-muted/10 p-4 md:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <p className="text-muted-foreground">
                Manage your categories, breeds, and products.
              </p>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full max-w-md grid-cols-3 h-12 p-1 bg-muted/50 rounded-lg">
              <TabsTrigger value="category" className="gap-2 h-10 rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                <Tag className="h-4 w-4" />
                Categories
              </TabsTrigger>
              <TabsTrigger value="breed" className="gap-2 h-10 rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                <Layers className="h-4 w-4" />
                Breeds
              </TabsTrigger>
              <TabsTrigger value="product" className="gap-2 h-10 rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                <Package className="h-4 w-4" />
                Products
              </TabsTrigger>
            </TabsList>

            <TabsContent value="category" className="space-y-6 focus-visible:ring-0 animate-in fade-in-50 duration-300 slide-in-from-bottom-2">
               <CategoryForm categories={categories} onSuccess={fetchData} />
            </TabsContent>

            <TabsContent value="breed" className="space-y-6 focus-visible:ring-0 animate-in fade-in-50 duration-300 slide-in-from-bottom-2">
              <BreedForm categories={categories} breeds={breeds} onSuccess={fetchData} />
            </TabsContent>

            <TabsContent value="product" className="space-y-6 focus-visible:ring-0 animate-in fade-in-50 duration-300 slide-in-from-bottom-2">
              <ProductForm breeds={breeds} onSuccess={fetchData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
