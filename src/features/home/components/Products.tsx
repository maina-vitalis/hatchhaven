"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Skeleton } from "@/src/components/ui/skeleton";
import { ShoppingCart } from "lucide-react";
import { formatPrice } from "@/src/lib/utils";
import { Badge } from "@/src/components/ui/badge";

import { motion } from "framer-motion";

interface Product {
  id: string;
  slug: string;
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
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Badge
            variant="outline"
            className="w-fit px-4 py-1 border-primary/20 text-primary bg-primary/5"
          >
            Farm Fresh
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Our Featured Products
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Browse our selection of premium, ethically raised poultry and fresh
            eggs.
          </p>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card
                key={i}
                className="overflow-hidden border-0 shadow-sm bg-card rounded-2xl"
              >
                <Skeleton className="aspect-4/3 w-full" />
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : products.length > 0 ? (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { delayChildren: 0.1 },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="group block h-full"
                >
                  <Card className="overflow-hidden border-border/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 rounded-2xl h-full flex flex-col py-0">
                    <div className="relative aspect-4/3 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        unoptimized
                        fill
                      />
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-white font-semibold bg-red-500/90 px-4 py-2 rounded-full text-sm shadow-lg">
                            Out of Stock
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg text-primary">
                          <ShoppingCart className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6 flex flex-col flex-1">
                      <div className="space-y-1 mb-4">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                          {product.categoryName}
                        </span>
                        <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </div>
                      <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                        <span className="text-xl font-bold text-foreground">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-sm text-muted-foreground font-medium group-hover:underline decoration-primary/50 underline-offset-4">
                          View Details
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
            <p className="text-muted-foreground text-lg">
              No products available right now.
            </p>
          </div>
        )}

        <div className="text-center mt-16">
          <Button
            size="lg"
            variant="outline"
            className="px-8 h-12 text-base border-primary/20 hover:border-primary hover:bg-primary/5"
            asChild
          >
            <Link href="/products">View Full Catalog</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
