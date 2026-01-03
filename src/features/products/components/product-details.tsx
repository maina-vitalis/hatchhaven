"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  ArrowLeft,
  Leaf,
  Shield,
  Truck,
  Check,
  ChevronRight,
  Heart,
  Share2,
} from "lucide-react";
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
  const [isFavorite, setIsFavorite] = useState(false);

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
    toast.success("Added to cart");
  };

  const handleBuyNow = () => {
    if (!selectedVariant) return;

    const message = `Hi! I'd like to order:\n\n• ${
      product.name
    } x${quantity} - KES ${(selectedVariant.price * quantity).toFixed(
      2
    )}\n\n*Total: KES ${(selectedVariant.price * quantity).toFixed(2)}*`;

    const whatsappNumber =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254700000000";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const getStockStatus = (): string => {
    if (!selectedVariant) return "Select Variant";
    if (selectedVariant.stock > 10) return "In Stock";
    if (selectedVariant.stock > 0) return "Low Stock";
    return "Out of Stock";
  };

  const getStockBadgeClasses = (): string => {
    if (!selectedVariant) return "bg-muted/50 text-muted-foreground";
    if (selectedVariant.stock > 10)
      return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
    if (selectedVariant.stock > 0)
      return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800";
    return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
  };

  const features = [
    {
      icon: Leaf,
      title: "100% Organic",
      description: "Free-range & chemical free",
    },
    {
      icon: Shield,
      title: "Health Guarantee",
      description: "Vet checked & vaccinated",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Countrywide shipping",
    },
    {
      icon: Check,
      title: "Ethical Farming",
      description: "Humanely raised poultry",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 pb-20">
      {/* Top Navigation Bar / Breadcrumb */}
      <div className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground overflow-hidden">
            <Link
              href="/products"
              className="flex items-center hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Back to Products</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0 opacity-50" />
            <Link
              href={`/products?category=${
                product.categorySlug || product.category.toLowerCase()
              }`}
              className="hover:text-foreground transition-colors truncate"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0 opacity-50" />
            <span className="font-medium text-foreground truncate">
              {product.breed.name}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            <ProductGallery
              images={allImages}
              productName={product.name}
              isSoldOut={selectedVariant?.stock === 0}
            />

            {/* Description & Specs Tabs (Desktop) */}
            <div className="hidden lg:block">
              <ProductTabs
                description={product.breed.description}
                purpose={product.breed.purpose}
                category={product.category}
                breedName={product.breed.name}
                origin={product.breed.origin}
                gender={selectedVariant?.gender}
                ageGroup={selectedVariant?.ageGroup}
              />
            </div>
          </div>

          {/* Right Column: Buying Section (Sticky) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-8">
              {/* Main Product Info & Purchase Card */}
              <div className="bg-background rounded-3xl p-6 lg:p-8 shadow-sm border space-y-6">
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

                <div className="h-px bg-border" />

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

                {/* Trust Badges Check */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  {features.slice(0, 2).map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <item.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{item.title}</span>
                    </div>
                  ))}
                  {features.slice(2, 4).map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <item.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Description (visible only on small screens) */}
              <div className="lg:hidden">
                <ProductTabs
                  description={product.breed.description}
                  purpose={product.breed.purpose}
                  category={product.category}
                  breedName={product.breed.name}
                  origin={product.breed.origin}
                  gender={selectedVariant?.gender}
                  ageGroup={selectedVariant?.ageGroup}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 lg:mt-32">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
                  You May Also Like
                </h2>
                <p className="text-muted-foreground mt-1">
                  Other premium poultry you might be interested in
                </p>
              </div>
              <Button variant="outline" asChild className="hidden sm:flex">
                <Link href="/products">View All</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group block"
                >
                  <Card className="overflow-hidden border-none shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col bg-background rounded-2xl">
                    <div className="relative aspect-square w-full overflow-hidden bg-muted">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                    <CardContent className="p-4 flex flex-col flex-1">
                      <div className="mb-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/80">
                          {relatedProduct.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-base leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <div className="mt-auto pt-2 flex items-center justify-between">
                        <span className="font-bold text-lg text-primary">
                          {formatPrice(relatedProduct.price)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex justify-center sm:hidden">
              <Button variant="outline" asChild className="w-full">
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
