"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, Layers, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { ImageUpload } from "@/src/features/admin/components/image-upload";
import { Alert, AlertDescription } from "@/src/components/ui/alert";

const breedSchema = z.object({
  name: z.string().min(1, "Name is required"),
  categoryId: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  origin: z.string().optional(),
  purpose: z.string().optional(),
  image: z.string().optional(),
});

type BreedFormValues = z.infer<typeof breedSchema>;

interface Category {
  id: string;
  name: string;
}

interface Breed {
  id: string;
  name: string;
  categoryId: string;
  categoryName?: string;
}

interface BreedFormProps {
  categories: Category[];
  breeds: Breed[];
  onSuccess: () => void;
}

export function BreedForm({ categories, breeds, onSuccess }: BreedFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BreedFormValues>({
    resolver: zodResolver(breedSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      description: "",
      origin: "",
      purpose: "",
      image: "",
    },
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const onSubmit = async (values: BreedFormValues) => {
    setIsSubmitting(true);
    try {
      const slug = generateSlug(values.name);
      const response = await fetch("/api/admin/breeds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          slug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create breed");
      }

      toast.success("Breed created successfully!");
      form.reset();
      onSuccess();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create breed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchedName = form.watch("name");

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              Create Breed
            </CardTitle>
            <CardDescription>
              Define specific breeds within your categories.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category</Label>
                <Select
                  value={form.watch("categoryId")}
                  onValueChange={(value) => form.setValue("categoryId", value)}
                >
                  <SelectTrigger id="categoryId">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.length === 0 ? (
                      <SelectItem value="none" disabled>
                        No categories available
                      </SelectItem>
                    ) : (
                      categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {form.formState.errors.categoryId && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.categoryId.message}
                  </p>
                )}
                {categories.length === 0 && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      You need to create a category first.
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Breed Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Rhode Island Red"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                )}
                {watchedName && (
                  <p className="text-xs text-muted-foreground">
                    Slug:{" "}
                    <code className="px-1 py-0.5 bg-muted rounded font-mono">
                      {generateSlug(watchedName)}
                    </code>
                  </p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin</Label>
                  <Input
                    id="origin"
                    placeholder="e.g., United States"
                    {...form.register("origin")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose</Label>
                  <Select
                    value={form.watch("purpose")}
                    onValueChange={(value) => form.setValue("purpose", value)}
                  >
                    <SelectTrigger id="purpose">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Meat">Meat</SelectItem>
                      <SelectItem value="Eggs">Eggs</SelectItem>
                      <SelectItem value="Dual-purpose">Dual-purpose</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Breed Image</Label>
                <ImageUpload
                  label="Upload Image"
                  value={form.watch("image") || ""}
                  onChange={(url) => form.setValue("image", url)}
                  folder="hatchhaven/breeds"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe this breed..."
                  rows={4}
                  {...form.register("description")}
                />
                {form.formState.errors.description && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Create Breed
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Existing Breeds</CardTitle>
            <CardDescription>Manage your existing breeds.</CardDescription>
          </CardHeader>
          <CardContent>
            {breeds.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                <Layers className="h-8 w-8 mb-2 opacity-50" />
                <p>No breeds yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {categories.map((category) => {
                  const categoryBreeds = breeds.filter(
                    (b) => b.categoryId === category.id
                  );
                  if (categoryBreeds.length === 0) return null;

                  return (
                    <div key={category.id} className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        {category.name}
                      </h4>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {categoryBreeds.map((breed) => (
                          <div
                            key={breed.id}
                            className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                          >
                            <span className="font-medium">{breed.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
