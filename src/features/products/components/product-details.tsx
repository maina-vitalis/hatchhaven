"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Truck,
  Shield,
  Leaf,
  Info,
  Minus,
  Plus,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants[0] || null
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
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
  const mainImage = allImages[selectedImageIndex] || allImages[0] || "";

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    // Cart functionality will be implemented with cart context/API
    console.log("Add to cart:", {
      variantId: selectedVariant.id,
      quantity,
    });
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

  const getStockStatus = (): string => {
    if (!selectedVariant) return "Select Variant";
    if (selectedVariant.stock > 10) return "In Stock";
    if (selectedVariant.stock > 0) return "Low Stock";
    return "Out of Stock";
  };

  const getStockBadgeClasses = (): string => {
    if (!selectedVariant) return "bg-muted/50 text-muted-foreground";
    if (selectedVariant.stock > 10) return "bg-green-500/10 text-green-700";
    if (selectedVariant.stock > 0) return "bg-yellow-500/10 text-yellow-700";
    return "bg-red-500/10 text-red-700";
  };

  const stockStatus = getStockStatus();
  const stockBadgeClasses = getStockBadgeClasses();

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                href={`/products?category=${product.category.toLowerCase()}`}
                className="hover:text-foreground transition-colors"
              >
                {product.category}
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">
                {product.name}
              </span>
            </div>
            <Button variant="ghost" size="sm" asChild>
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
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image Gallery - Left Column */}
          <div className="order-2 lg:order-1">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative w-full aspect-4/3 overflow-hidden rounded-lg border bg-muted">
                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No Image Available
                  </div>
                )}
                {/* Favorite Button */}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-3 right-3 h-9 w-9 rounded-full shadow-md bg-background/90 hover:bg-background"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      isFavorite && "fill-red-500 text-red-500"
                    )}
                  />
                </Button>
              </div>

              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {allImages.map((image, index) => (
                    <button
                      key={`image-${index}-${image}`}
                      onClick={() => setSelectedImageIndex(index)}
                      className={cn(
                        "relative aspect-square overflow-hidden rounded-md border-2 transition-all",
                        selectedImageIndex === index
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info - Right Column */}
          <div className="order-1 lg:order-2">
            <div className="space-y-5">
              {/* Category & Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="secondary"
                  className="text-xs font-semibold uppercase"
                >
                  {product.category}
                </Badge>
                {product.breed.purpose && (
                  <Badge variant="outline" className="text-xs">
                    {product.breed.purpose}
                  </Badge>
                )}
                {selectedVariant && selectedVariant.stock > 10 && (
                  <Badge className="text-xs bg-green-500/10 text-green-700 border-green-500/20">
                    ✓ In Stock
                  </Badge>
                )}
              </div>

              {/* Product Name */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                  {product.name}
                </h1>
                {product.breed.origin && (
                  <p className="text-sm text-muted-foreground">
                    Origin: {product.breed.origin}
                  </p>
                )}
              </div>

              {/* Price & Stock */}
              <div className="space-y-2">
                {selectedVariant ? (
                  <>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-primary">
                        ${selectedVariant.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-sm font-medium px-2.5 py-1 rounded-md",
                          stockBadgeClasses
                        )}
                      >
                        {stockStatus}
                      </span>
                      {selectedVariant.stock > 0 && (
                        <span className="text-sm text-muted-foreground">
                          {selectedVariant.stock} available
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Select a variant to see pricing
                  </p>
                )}
              </div>

              <Separator />

              {/* Variant Selection */}
              <div className="space-y-4">
                {/* Gender Selection */}
                <div>
                  <div className="text-sm font-semibold mb-2">Gender</div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(
                      new Set(product.variants.map((v) => v.gender))
                    ).map((gender) => {
                      const variant = product.variants.find(
                        (v) => v.gender === gender
                      );
                      const isSelected = selectedVariant?.gender === gender;
                      return (
                        <Button
                          key={gender}
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            const newVariant = product.variants.find(
                              (v) => v.gender === gender
                            );
                            if (newVariant) setSelectedVariant(newVariant);
                          }}
                          disabled={variant?.stock === 0}
                          className={cn(variant?.stock === 0 && "opacity-50")}
                        >
                          {gender}
                          {variant?.stock === 0 && " (Sold Out)"}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Age Group Selection */}
                <div>
                  <div className="text-sm font-semibold mb-2">Age Group</div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(
                      new Set(product.variants.map((v) => v.ageGroup))
                    ).map((ageGroup) => {
                      const variant = product.variants.find(
                        (v) =>
                          v.ageGroup === ageGroup &&
                          v.gender === selectedVariant?.gender
                      );
                      const isSelected = selectedVariant?.ageGroup === ageGroup;
                      return (
                        <Button
                          key={ageGroup}
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            const newVariant = product.variants.find(
                              (v) =>
                                v.ageGroup === ageGroup &&
                                v.gender === selectedVariant?.gender
                            );
                            if (newVariant) setSelectedVariant(newVariant);
                          }}
                          disabled={!variant || variant.stock === 0}
                          className={cn(
                            (!variant || variant.stock === 0) && "opacity-50"
                          )}
                        >
                          {ageGroup}
                          {variant?.stock === 0 && " (Sold Out)"}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold mb-2">Quantity</div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-6 py-2 min-w-[60px] text-center font-medium">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() =>
                          setQuantity(
                            Math.min(selectedVariant?.stock || 1, quantity + 1)
                          )
                        }
                        disabled={
                          !selectedVariant ||
                          quantity >= (selectedVariant.stock || 0)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={!selectedVariant || selectedVariant.stock === 0}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      navigator.share?.({
                        title: product.name,
                        url: globalThis.location.href,
                      });
                    }}
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Quick Features */}
              <div className="pt-4 border-t">
                <div className="grid grid-cols-2 gap-3">
                  {features.slice(0, 4).map((feature) => (
                    <div
                      key={feature.title}
                      className="flex items-start gap-2 p-3 rounded-lg bg-muted/50"
                    >
                      <feature.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-xs font-medium leading-tight">
                        {feature.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Features Section */}
        <Card className="mb-12">
          <CardContent className="p-6 lg:p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col gap-3 p-4 rounded-lg bg-muted/30 border"
                >
                  <div className="p-2 rounded-md bg-primary/10 w-fit">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1 text-sm">
                      {feature.title}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="care">Care & Handling</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About This Product</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.breed.description}
                  </p>
                  {product.breed.purpose && (
                    <div className="mt-6 p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold mb-2">Purpose</h4>
                      <p className="text-muted-foreground">
                        {product.breed.purpose}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted/30">
                      <dt className="text-sm font-medium text-muted-foreground mb-1">
                        Category
                      </dt>
                      <dd className="text-base font-semibold">
                        {product.category}
                      </dd>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <dt className="text-sm font-medium text-muted-foreground mb-1">
                        Breed
                      </dt>
                      <dd className="text-base font-semibold">
                        {product.breed.name}
                      </dd>
                    </div>
                    {product.breed.origin && (
                      <div className="p-3 rounded-lg bg-muted/30">
                        <dt className="text-sm font-medium text-muted-foreground mb-1">
                          Origin
                        </dt>
                        <dd className="text-base font-semibold">
                          {product.breed.origin}
                        </dd>
                      </div>
                    )}
                    {product.breed.purpose && (
                      <div className="p-3 rounded-lg bg-muted/30">
                        <dt className="text-sm font-medium text-muted-foreground mb-1">
                          Purpose
                        </dt>
                        <dd className="text-base font-semibold">
                          {product.breed.purpose}
                        </dd>
                      </div>
                    )}
                    {selectedVariant && (
                      <>
                        <div className="p-3 rounded-lg bg-muted/30">
                          <dt className="text-sm font-medium text-muted-foreground mb-1">
                            Gender
                          </dt>
                          <dd className="text-base font-semibold">
                            {selectedVariant.gender}
                          </dd>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/30">
                          <dt className="text-sm font-medium text-muted-foreground mb-1">
                            Age Group
                          </dt>
                          <dd className="text-base font-semibold">
                            {selectedVariant.ageGroup}
                          </dd>
                        </div>
                      </>
                    )}
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                    <div className="p-2 rounded-md bg-primary/10 shrink-0">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Free Shipping</p>
                      <p className="text-sm text-muted-foreground">
                        Free shipping on orders over $50. Standard delivery
                        takes 2-3 business days.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                    <div className="p-2 rounded-md bg-primary/10 shrink-0">
                      <Info className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Delivery Schedule</p>
                      <p className="text-sm text-muted-foreground">
                        Orders placed before 2 PM EST will be processed the same
                        day. We deliver Monday through Friday.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                    <div className="p-2 rounded-md bg-primary/10 shrink-0">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Freshness Guarantee</p>
                      <p className="text-sm text-muted-foreground">
                        All products are guaranteed fresh. If you&apos;re not
                        satisfied, contact us within 24 hours for a full refund.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="care" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Care & Handling</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/30">
                      <h4 className="font-semibold mb-2">Storage</h4>
                      <p className="text-sm text-muted-foreground">
                        Store all poultry products in the refrigerator at 40°F
                        or below. Use within 1-2 days of purchase or freeze for
                        longer storage.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30">
                      <h4 className="font-semibold mb-2">Handling</h4>
                      <p className="text-sm text-muted-foreground">
                        Always wash your hands before and after handling raw
                        poultry. Use separate cutting boards and utensils for
                        raw poultry to prevent cross-contamination.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30">
                      <h4 className="font-semibold mb-2">Cooking</h4>
                      <p className="text-sm text-muted-foreground">
                        Cook poultry to an internal temperature of 165°F as
                        measured with a food thermometer. Always ensure juices
                        run clear before serving.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Related Products</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/products">View All</Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="group overflow-hidden hover:shadow-lg transition-all flex flex-col p-0"
                >
                  <Link href={`/products/${relatedProduct.id}`}>
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                    <CardContent className="p-4 flex flex-col flex-1">
                      <Badge
                        variant="secondary"
                        className="text-xs w-fit mb-2 uppercase"
                      >
                        {relatedProduct.category}
                      </Badge>
                      <h3 className="text-base font-semibold mb-2 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="mt-auto flex items-center justify-between pt-3 border-t">
                        <span className="text-lg font-bold text-primary">
                          ${relatedProduct.price.toFixed(2)}
                        </span>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
