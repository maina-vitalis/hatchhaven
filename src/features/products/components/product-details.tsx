"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
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
  Star,
  Zap,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { toast } from "sonner";

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
    toast.success("Added to cart", {
      description: `${quantity} x ${product.name} (${selectedVariant.gender !== "N/A" ? selectedVariant.gender : ""} ${selectedVariant.ageGroup})`,
    });
  };

  const handleBuyNow = () => {
    if (!selectedVariant) return;
    handleAddToCart();
    router.push("/checkout");
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
    if (selectedVariant.stock > 10) return "bg-green-500/10 text-green-700 border-green-200";
    if (selectedVariant.stock > 0) return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
    return "bg-red-500/10 text-red-700 border-red-200";
  };

  const stockStatus = getStockStatus();
  const stockBadgeClasses = getStockBadgeClasses();

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
          <div className="order-2 lg:order-1 space-y-4">
            <div className="relative w-full aspect-square lg:aspect-4/3 overflow-hidden rounded-2xl border bg-muted shadow-sm">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
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
                className="absolute top-4 right-4 h-10 w-10 rounded-full shadow-md bg-background/90 hover:bg-background transition-all hover:scale-110"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
                  )}
                />
              </Button>
              {selectedVariant && selectedVariant.stock <= 0 && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
                  <span className="bg-destructive text-destructive-foreground px-6 py-3 rounded-full text-lg font-bold shadow-lg transform -rotate-12">
                    SOLD OUT
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {allImages.map((image, index) => (
                  <button
                    key={`image-${index}-${image}`}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
                      selectedImageIndex === index
                        ? "border-primary ring-2 ring-primary/20 scale-95"
                        : "border-transparent hover:border-primary/50"
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

          {/* Product Info - Right Column */}
          <div className="order-1 lg:order-2 flex flex-col h-full">
            <div className="space-y-6">
              {/* Header Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    {product.category}
                  </Badge>
                  {product.breed.purpose && (
                    <Badge variant="outline" className="text-xs">
                      {product.breed.purpose}
                    </Badge>
                  )}
                  <div className="flex items-center gap-1 text-yellow-500 text-sm ml-auto">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-medium text-foreground">4.9</span>
                    <span className="text-muted-foreground">(128 reviews)</span>
                  </div>
                </div>

                <div>
                  <h1 className="text-3xl lg:text-5xl font-bold mb-3 leading-tight tracking-tight">
                    {product.name}
                  </h1>
                  {product.breed.origin && (
                    <p className="text-base text-muted-foreground flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary/60" />
                      Origin: {product.breed.origin}
                    </p>
                  )}
                </div>

                {/* Price & Stock */}
                <div className="flex items-end gap-4 pb-4 border-b">
                  {selectedVariant ? (
                    <>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground mb-1">Price</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-primary">
                            ${selectedVariant.price.toFixed(2)}
                          </span>
                          <span className="text-sm text-muted-foreground">/ unit</span>
                        </div>
                      </div>
                      <div className="ml-auto flex flex-col items-end">
                        <Badge variant="outline" className={cn("mb-1", stockBadgeClasses)}>
                          {stockStatus}
                        </Badge>
                        {selectedVariant.stock > 0 && (
                          <span className="text-xs text-muted-foreground">
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
              </div>

              {/* Variant Selection */}
              {product.variants.length > 1 && (
                <div className="space-y-6">
                  {/* Gender Selection */}
                  {!product.variants.every((v) => v.gender === "N/A") && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Select Type</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {Array.from(
                          new Set(product.variants.map((v) => v.gender))
                        ).map((gender) => {
                          const variant = product.variants.find(
                            (v) => v.gender === gender
                          );
                          const isSelected = selectedVariant?.gender === gender;
                          return (
                            <button
                              key={gender}
                              onClick={() => {
                                const newVariant = product.variants.find(
                                  (v) => v.gender === gender
                                );
                                if (newVariant) setSelectedVariant(newVariant);
                              }}
                              disabled={variant?.stock === 0}
                              className={cn(
                                "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all",
                                isSelected
                                  ? "border-primary bg-primary/5 text-primary"
                                  : "border-muted hover:border-primary/50",
                                variant?.stock === 0 && "opacity-50 cursor-not-allowed bg-muted"
                              )}
                            >
                              <span className="font-semibold">{gender}</span>
                              {variant?.stock === 0 && (
                                <span className="text-[10px] text-destructive mt-1">Sold Out</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Size/Quantity Selection */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {product.variants.some((v) => v.gender !== "N/A")
                          ? "Select Age Group"
                          : "Select Size / Quantity"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(
                        new Set(product.variants.map((v) => v.ageGroup))
                      )
                        .filter((ageGroup) => {
                          if (
                            selectedVariant?.gender &&
                            selectedVariant.gender !== "N/A"
                          ) {
                            return product.variants.some(
                              (v) =>
                                v.ageGroup === ageGroup &&
                                v.gender === selectedVariant.gender
                            );
                          }
                          if (
                            product.variants.every((v) => v.gender === "N/A")
                          ) {
                            return true;
                          }
                          return product.variants.some(
                            (v) =>
                              v.ageGroup === ageGroup &&
                              v.gender === selectedVariant?.gender
                          );
                        })
                        .map((ageGroup) => {
                          const variant = product.variants.find(
                            (v) =>
                              v.ageGroup === ageGroup &&
                              (selectedVariant?.gender === "N/A" ||
                                v.gender === selectedVariant?.gender ||
                                product.variants.every(
                                  (v) => v.gender === "N/A"
                                ))
                          );
                          const isSelected =
                            selectedVariant?.ageGroup === ageGroup;
                          return (
                            <Button
                              key={ageGroup}
                              variant={isSelected ? "default" : "outline"}
                              size="sm"
                              onClick={() => {
                                const newVariant = product.variants.find(
                                  (v) =>
                                    v.ageGroup === ageGroup &&
                                    (selectedVariant?.gender === "N/A" ||
                                      v.gender === selectedVariant?.gender ||
                                      product.variants.every(
                                        (v) => v.gender === "N/A"
                                      ))
                                );
                                if (newVariant) setSelectedVariant(newVariant);
                              }}
                              disabled={!variant || variant.stock === 0}
                              className={cn(
                                "h-9 rounded-lg",
                                isSelected && "ring-2 ring-primary ring-offset-2"
                              )}
                            >
                              {ageGroup}
                              {variant && (
                                <span className="ml-1.5 opacity-80 text-xs">
                                  — ${variant.price.toFixed(0)}
                                </span>
                              )}
                            </Button>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-6 mt-auto space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 rounded-xl bg-background">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-11 w-11 rounded-l-lg hover:bg-transparent"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold text-lg">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-11 w-11 rounded-r-lg hover:bg-transparent"
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
                  <Button
                    size="lg"
                    className="flex-1 h-12 text-base rounded-xl shadow-lg shadow-primary/20"
                    onClick={handleAddToCart}
                    disabled={!selectedVariant || selectedVariant.stock === 0}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                </div>
                
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full h-12 text-base rounded-xl font-bold bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/20"
                  onClick={handleBuyNow}
                  disabled={!selectedVariant || selectedVariant.stock === 0}
                >
                  <Zap className="mr-2 h-5 w-5 fill-current" />
                  Buy Now
                </Button>

                <div className="flex items-center justify-center gap-6 pt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Truck className="h-4 w-4" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-4 w-4" />
                    <span>Secure Payment</span>
                  </div>
                </div>
              </div>
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

        {/* Product Details Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-6 mb-8 overflow-x-auto">
              <TabsTrigger 
                value="description" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-base"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="specifications" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-base"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger 
                value="shipping" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-base"
              >
                Shipping & Returns
              </TabsTrigger>
              <TabsTrigger 
                value="care" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-base"
              >
                Care Guide
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="animate-in fade-in-50 slide-in-from-bottom-2">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-2xl font-bold">About {product.name}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {product.breed.description}
                  </p>
                  {product.breed.purpose && (
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                      <h4 className="font-semibold mb-2 text-primary">Ideal Purpose</h4>
                      <p className="text-foreground/80">
                        {product.breed.purpose}
                      </p>
                    </div>
                  )}
                </div>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Why Choose Us?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-3">
                        <Check className="h-5 w-5 text-green-500 shrink-0" />
                        <span className="text-sm">100% Health Guarantee</span>
                      </div>
                      <div className="flex gap-3">
                        <Check className="h-5 w-5 text-green-500 shrink-0" />
                        <span className="text-sm">Expert Support Available</span>
                      </div>
                      <div className="flex gap-3">
                        <Check className="h-5 w-5 text-green-500 shrink-0" />
                        <span className="text-sm">Ethically Sourced</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="animate-in fade-in-50 slide-in-from-bottom-2">
              <div className="border rounded-xl overflow-hidden">
                <dl className="divide-y">
                  <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30">
                    <dt className="font-medium text-muted-foreground">Category</dt>
                    <dd className="col-span-2 font-medium">{product.category}</dd>
                  </div>
                  <div className="grid grid-cols-3 gap-4 p-4">
                    <dt className="font-medium text-muted-foreground">Breed</dt>
                    <dd className="col-span-2 font-medium">{product.breed.name}</dd>
                  </div>
                  {product.breed.origin && (
                    <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30">
                      <dt className="font-medium text-muted-foreground">Origin</dt>
                      <dd className="col-span-2 font-medium">{product.breed.origin}</dd>
                    </div>
                  )}
                  {selectedVariant && (
                    <>
                      <div className="grid grid-cols-3 gap-4 p-4">
                        <dt className="font-medium text-muted-foreground">Gender/Type</dt>
                        <dd className="col-span-2 font-medium">{selectedVariant.gender}</dd>
                      </div>
                      <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30">
                        <dt className="font-medium text-muted-foreground">Age/Size</dt>
                        <dd className="col-span-2 font-medium">{selectedVariant.ageGroup}</dd>
                      </div>
                    </>
                  )}
                </dl>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="animate-in fade-in-50 slide-in-from-bottom-2">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" /> Shipping Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      We take extra care in packaging to ensure your products arrive safely.
                      Live birds are shipped via specialized carriers with climate control.
                    </p>
                    <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                      <li>Orders processed within 24 hours</li>
                      <li>Express delivery available</li>
                      <li>Tracking number provided</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" /> Returns & Guarantee
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Your satisfaction is our priority. If you are not completely satisfied
                      with your purchase, please contact us within 24 hours of delivery.
                    </p>
                    <p className="text-sm font-medium">
                      Live Arrival Guarantee: We guarantee all live birds arrive healthy.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="care" className="animate-in fade-in-50 slide-in-from-bottom-2">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Info className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold">Care Instructions</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Immediate Care</h4>
                          <p className="text-sm text-muted-foreground">
                            Upon arrival, ensure access to fresh water and appropriate feed immediately.
                            Keep in a draft-free, temperature-controlled environment.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Long-term Care</h4>
                          <p className="text-sm text-muted-foreground">
                            Maintain clean bedding and fresh water daily. Follow specific breed
                            guidelines for nutrition and housing requirements.
                          </p>
                        </div>
                      </div>
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
                          ${relatedProduct.price.toFixed(2)}
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
