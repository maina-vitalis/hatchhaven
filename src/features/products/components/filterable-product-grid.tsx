"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Skeleton } from "@/src/components/ui/skeleton";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/src/lib/utils";

export type ProductCategory = "all" | string;

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  categoryName: string;
  stock: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
}

const categoryIcons: Record<string, string> = {
  eggs: "🥚",
  chicken: "🍗",
  ducks: "🦆",
  "premium-birds": "✨",
  meat: "🥩",
  turkey: "🦃",
};

export function FilterableProductGrid() {
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories/public");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url =
          selectedCategory === "all"
            ? "/api/products"
            : `/api/products?category=${selectedCategory}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const allCategories: Array<{
    id: ProductCategory;
    label: string;
    icon: string;
  }> = [
    { id: "all", label: "All Products", icon: "🛒" },
    ...categories.map((cat) => ({
      id: cat.slug,
      label: cat.name,
      icon: categoryIcons[cat.slug] || "📦",
    })),
  ];

  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our selection of premium, farm-fresh poultry and eggs
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {allCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "h-auto py-3 px-6 rounded-full transition-all duration-200",
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "hover:bg-primary/10 hover:border-primary/50"
              )}
            >
              <span className="text-xl mr-2">{category.icon}</span>
              <span className="font-medium">{category.label}</span>
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card
                key={i}
                className="relative overflow-hidden border border-border/50 bg-background flex flex-col p-0"
              >
                <Skeleton className="aspect-[4/3] w-full" />
                <CardContent className="p-4 md:p-5 flex flex-col flex-1 space-y-3">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="mt-auto flex items-center justify-between pt-3 border-t">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="group relative overflow-hidden border border-border/50 bg-background hover:border-primary/20 hover:shadow-xl transition-all duration-300 flex flex-col p-0"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold bg-red-500 px-3 py-1 rounded">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4 md:p-5 flex flex-col flex-1">
                      <span className="text-xs font-medium text-primary mb-1 uppercase tracking-wide">
                        {product.categoryName}
                      </span>
                      <h3 className="text-base font-semibold mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="mt-auto flex items-center justify-between pt-3 border-t">
                        <span className="text-lg font-bold text-primary">
                          ${product.price.toFixed(2)}
                        </span>
                        <Button
                          size="sm"
                          className="h-8 w-8 rounded-full p-0"
                          aria-label={`View ${product.name} details`}
                          disabled={product.stock === 0}
                          asChild
                        >
                          <Link href={`/products/${product.id}`}>
                            <ShoppingCart className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                Showing {products.length} product
                {products.length !== 1 ? "s" : ""}
                {selectedCategory !== "all" && (
                  <span>
                    {" "}
                    in{" "}
                    {
                      allCategories.find((c) => c.id === selectedCategory)
                        ?.label
                    }
                  </span>
                )}
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No products found
              {selectedCategory !== "all" ? " in this category" : ""}.
            </p>
            {selectedCategory !== "all" && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSelectedCategory("all")}
              >
                View All Products
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
