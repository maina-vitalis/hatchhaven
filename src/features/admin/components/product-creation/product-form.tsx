"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, Package, AlertCircle, Eye } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { ImageUpload } from "@/src/features/admin/components/image-upload";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";
import { cn } from "@/src/lib/utils";

const productSchema = z.object({
  breedId: z.string().min(1, "Breed is required"),
  gender: z.string().min(1, "Type/Gender is required"),
  ageGroup: z.string().min(1, "Size/Age is required"),
  price: z.string().min(1, "Price is required"),
  stock: z.string().optional(),
  image: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface Breed {
  id: string;
  name: string;
  categoryId: string;
  categoryName?: string;
}

interface ProductFormProps {
  breeds: Breed[];
  onSuccess: () => void;
}

export function ProductForm({ breeds, onSuccess }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      breedId: "",
      gender: "",
      ageGroup: "",
      price: "",
      stock: "",
      image: "",
    },
  });

  const onSubmit = async (values: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin/variants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          variants: [values],
          breedId: values.breedId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create product");
      }

      toast.success("Product created successfully!");
      // Reset form but keep breed selected for convenience
      const currentBreed = values.breedId;
      form.reset({
        breedId: currentBreed,
        gender: "",
        ageGroup: "",
        price: "",
        stock: "",
        image: "",
      });
      onSuccess();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create product"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchedValues = form.watch();
  const selectedBreed = breeds.find((b) => b.id === watchedValues.breedId);

  // Helper to determine if we are dealing with live birds or products
  const isLiveBird =
    watchedValues.gender === "Male" ||
    watchedValues.gender === "Female" ||
    watchedValues.gender === "Pair";

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Left Column: Form */}
      <div className="lg:col-span-7 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Add Product Variant
            </CardTitle>
            <CardDescription>
              Create a specific product variant for a breed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="breedId">Select Breed</Label>
                <Select
                  value={form.watch("breedId")}
                  onValueChange={(value) => form.setValue("breedId", value)}
                >
                  <SelectTrigger id="breedId" className="h-12">
                    <SelectValue placeholder="Select a breed" />
                  </SelectTrigger>
                  <SelectContent>
                    {breeds.length === 0 ? (
                      <SelectItem value="none" disabled>
                        No breeds available
                      </SelectItem>
                    ) : (
                      breeds.map((breed) => (
                        <SelectItem key={breed.id} value={breed.id}>
                          <span className="font-medium">{breed.name}</span>
                          {breed.categoryName && (
                            <span className="text-muted-foreground ml-2 text-xs">
                              ({breed.categoryName})
                            </span>
                          )}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {form.formState.errors.breedId && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.breedId.message}
                  </p>
                )}
                {breeds.length === 0 && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      You need to create a breed first.
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <Separator />

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Type / Gender</Label>
                  <Select
                    value={form.watch("gender")}
                    onValueChange={(value) => form.setValue("gender", value)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male (Live Birds)</SelectItem>
                      <SelectItem value="Female">Female (Live Birds)</SelectItem>
                      <SelectItem value="Pair">Pair (Live Birds)</SelectItem>
                      <SelectItem value="N/A">N/A (Eggs/Meat)</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.gender && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.gender.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Size / Age</Label>
                  <Select
                    value={form.watch("ageGroup")}
                    onValueChange={(value) => form.setValue("ageGroup", value)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select size/age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Chick">Chick</SelectItem>
                      <SelectItem value="1-7 months">1-7 months</SelectItem>
                      <SelectItem value="Mature">Mature</SelectItem>
                      <SelectItem value="Half Dozen">
                        Half Dozen (6 eggs)
                      </SelectItem>
                      <SelectItem value="Dozen">Dozen (12 eggs)</SelectItem>
                      <SelectItem value="18 Pack">18 Pack</SelectItem>
                      <SelectItem value="30 Pack">30 Pack</SelectItem>
                      <SelectItem value="1 lb">1 lb</SelectItem>
                      <SelectItem value="2 lbs">2 lbs</SelectItem>
                      <SelectItem value="5 lbs">5 lbs</SelectItem>
                      <SelectItem value="10 lbs">10 lbs</SelectItem>
                      <SelectItem value="Whole">Whole</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.ageGroup && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.ageGroup.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="pl-7 h-11"
                      {...form.register("price")}
                    />
                  </div>
                  {form.formState.errors.price && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.price.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
                    className="h-11"
                    {...form.register("stock")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Product Image (Optional)</Label>
                <ImageUpload
                  label="Upload Variant Image"
                  value={form.watch("image") || ""}
                  onChange={(url) => form.setValue("image", url)}
                  folder="hatchhaven/variants"
                />
                <p className="text-xs text-muted-foreground">
                  If left blank, the breed image will be used.
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Product...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Create Product
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Live Preview */}
      <div className="lg:col-span-5 space-y-6">
        <div className="sticky top-6">
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Live Preview
            </span>
          </div>

          <Card className="overflow-hidden border-2 border-dashed border-muted-foreground/20 bg-muted/10">
            <div className="aspect-square relative bg-muted flex items-center justify-center overflow-hidden">
              {watchedValues.image ? (
                <img
                  src={watchedValues.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-6">
                  <Package className="h-16 w-16 mx-auto text-muted-foreground/30 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No image selected
                  </p>
                </div>
              )}
              {watchedValues.stock && parseInt(watchedValues.stock) === 0 && (
                <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 text-xs font-bold rounded">
                  OUT OF STOCK
                </div>
              )}
            </div>
            <CardContent className="p-6">
              <div className="mb-2">
                <Badge variant="outline" className="mb-2">
                  {selectedBreed?.categoryName || "Category"}
                </Badge>
                <h3 className="text-2xl font-bold leading-tight">
                  {selectedBreed?.name || "Breed Name"}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {watchedValues.gender && watchedValues.gender !== "N/A" && (
                    <Badge variant="secondary">{watchedValues.gender}</Badge>
                  )}
                  {watchedValues.ageGroup && (
                    <Badge variant="secondary">{watchedValues.ageGroup}</Badge>
                  )}
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold text-primary">
                    ${watchedValues.price || "0.00"}
                  </span>
                  {watchedValues.stock && (
                    <span className="text-sm text-muted-foreground">
                      {watchedValues.stock} available
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 p-4">
              <Button className="w-full" disabled>
                Add to Cart
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
              Pro Tip
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              High-quality images significantly increase conversion rates. Make
              sure your product image is clear and well-lit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
