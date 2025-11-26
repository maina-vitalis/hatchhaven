"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { ArrowLeft, Leaf, Shield, Truck, Check } from "lucide-react";
import { toast } from "sonner";
import { formatPrice } from "@/src/lib/utils";
import { useCart } from "@/src/context/cart-context";

import { ProductGallery } from "./product-details/product-gallery";
import { ProductInfo } from "./product-details/product-info";
import { ProductVariants } from "./product-details/product-variants";
import { ProductActions } from "./product-details/product-actions";
import { ProductTabs } from "./product-details/product-tabs";

interface ProductVariant {
  id: string;
  gender: string;
  ageGroup: string;
  price: number;
  stock: number;
  image?: string;
}

interface ProductDetailsProps {
  readonly product: {
    id: string;
    name: string;
    category: string;
    categorySlug?: string;
    breed: {
      name: string;
      description: string;
      origin?: string;
      purpose?: string;
      image?: string;
    };
    variants: ProductVariant[];
    images?: string[];
  };
  readonly relatedProducts?: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  }>;
}

export function ProductDetails({
  product,
  relatedProducts = [],
}: ProductDetailsProps) {
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants[0] || null
  );
  const [quantity, setQuantity] = useState(1);

  // Get all available images for the product
  const getAllImages = (): string[] => {
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    const variantImages = product.variants
      .map((v) => v.image)
      .filter(Boolean) as string[];
    if (variantImages.length > 0) {
      return variantImages;
    }
    return product.breed.image ? [product.breed.image] : [];
  };

  const allImages = getAllImages();

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    
    addToCart({
      id: selectedVariant.id,
      name: product.name,
      price: selectedVariant.price,
      quantity: quantity,
      image: allImages[0] || "/placeholder-product.jpg",
      variantId: selectedVariant.id,
      breedName: product.breed.name,
    });
  };

  const handleBuyNow = () => {
    if (!selectedVariant) return;
    handleAddToCart();
    router.push("/checkout");
  };

  const getStockStatus = (): string => {
    if (!selectedVariant) return "Select Variant";
    if (selectedVariant.stock > 10) return "In Stock";
    if (selectedVariant.stock > 0) return "Low Stock";
    return "Out of Stock";
  };

  const getStockBadgeClasses = (): string => {
    if (!selectedVariant) return "bg-muted/50 text-muted-foreground";
    if (selectedVariant.stock > 10) return "bg-green-500/10 text-green-700 border-green-200";
    if (selectedVariant.stock > 0) return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
    return "bg-red-500/10 text-red-700 border-red-200";
  };

  const features = [
    {
      icon: Leaf,
      title: "Free-Range & Organic",
      description: "Raised in open pastures with access to natural feed",
    },
    {
      icon: Shield,
      title: "No Hormones or Antibiotics",
      description: "100% natural, hormone-free and antibiotic-free",
    },
    {
      icon: Truck,
      title: "Fresh Daily Delivery",
      description: "Order by 2 PM for next-day delivery",
    },
    {
      icon: Check,
      title: "Ethically Raised",
      description: "Animal welfare is our top priority",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto whitespace-nowrap no-scrollbar">
              <Link
                href="/"
                className="hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/products"
                className="hover:text-foreground transition-colors"
              >
                Products
              </Link>
              <span>/</span>
              <Link
                href={`/products?category=${
                  product.categorySlug || product.category.toLowerCase()
                }`}
                className="hover:text-foreground transition-colors"
              >
                {product.category}
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium truncate max-w-[200px]">
                {product.name}
              </span>
            </div>
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
        {/* Product Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          {/* Image Gallery - Left Column */}
          <div className="order-2 lg:order-1">
            <ProductGallery
              images={allImages}
              productName={product.name}
              isSoldOut={selectedVariant?.stock === 0}
            />
          </div>

          {/* Product Info - Right Column */}
          <div className="order-1 lg:order-2 flex flex-col h-full">
            <div className="space-y-6">
              <ProductInfo
                name={product.name}
                category={product.category}
                purpose={product.breed.purpose}
                origin={product.breed.origin}
                price={selectedVariant?.price}
                stockStatus={getStockStatus()}
                stockBadgeClasses={getStockBadgeClasses()}
                stockCount={selectedVariant?.stock || 0}
              />

              <ProductVariants
                variants={product.variants}
                selectedVariant={selectedVariant}
                onVariantSelect={setSelectedVariant}
              />

              <ProductActions
                quantity={quantity}
                stock={selectedVariant?.stock || 0}
                onQuantityChange={setQuantity}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                disabled={!selectedVariant || selectedVariant.stock === 0}
              />
            </div>
          </div>
        </div>

        {/* Detailed Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-muted/30 border-none shadow-none">
              <CardContent className="p-6 flex flex-col gap-3">
                <div className="p-3 rounded-xl bg-background w-fit shadow-sm">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <ProductTabs
          description={product.breed.description}
          purpose={product.breed.purpose}
          category={product.category}
          breedName={product.breed.name}
          origin={product.breed.origin}
          gender={selectedVariant?.gender}
          ageGroup={selectedVariant?.ageGroup}
        />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">You May Also Like</h2>
              <Button variant="outline" asChild>
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id} 
                  href={`/products/${relatedProduct.id}`}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-none bg-muted/10 h-full flex flex-col">
                    <div className="relative aspect-square w-full overflow-hidden bg-muted">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <CardContent className="p-4 flex flex-col flex-1">
                      <div className="mb-2">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {relatedProduct.category}
                        </span>
                      </div>
                      <h3 className="text-base font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <div className="mt-auto pt-2 flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(relatedProduct.price)}
                        </span>
                        <Button size="sm" variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
