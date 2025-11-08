"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  categoryName: string;
  stock: number;
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products?limit=8");
        if (response.ok) {
          const data = await response.json();
          // Take only the first 8 products (latest products)
          setProducts(data.slice(0, 8));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our selection of premium, farm-fresh poultry and eggs
          </p>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card
                key={i}
                className="overflow-hidden flex flex-col p-0 py-0 gap-0 rounded-xl"
              >
                <Skeleton className="aspect-4/3 w-full rounded-t-xl" />
                <CardContent className="p-4 px-4 flex flex-col flex-1 space-y-3">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="mt-auto flex items-center justify-between pt-3 border-t">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden hover:shadow-lg transition-shadow flex flex-col p-0 py-0 gap-0 rounded-xl"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-muted rounded-t-xl">
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
                        <span className="text-white font-semibold bg-red-500 px-3 py-1 rounded text-sm">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4 px-4 flex flex-col flex-1">
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
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No products available yet. Check back soon!
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button size="lg" className="px-8" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
