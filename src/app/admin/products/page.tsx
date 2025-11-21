"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { SidebarTrigger } from "@/src/components/ui/sidebar";
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
import { Separator } from "@/src/components/ui/separator";
import { Badge } from "@/src/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Plus,
  LogOut,
  Save,
  X,
  Loader2,
  Package,
  Tag,
  Layers,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { ImageUpload } from "@/src/features/admin/components/image-upload";

interface ProductVariant {
  id: string;
  gender: string;
  ageGroup: string;
  price: string;
  stock: string;
  image: string;
}

export default function ProductsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("category");

  // Category Form State
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    image: "",
  });

  // Breed Form State
  const [breedForm, setBreedForm] = useState({
    name: "",
    description: "",
    origin: "",
    purpose: "",
    image: "",
    categoryId: "",
  });

  // Variant Form State
  const [variantForm, setVariantForm] = useState({
    breedId: "",
    gender: "",
    ageGroup: "",
    price: "",
    stock: "",
    image: "",
  });

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
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingBreeds, setLoadingBreeds] = useState(true);
  const [submittingCategory, setSubmittingCategory] = useState(false);
  const [submittingBreed, setSubmittingBreed] = useState(false);
  const [submittingVariant, setSubmittingVariant] = useState(false);

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/admin/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch breeds
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch("/api/admin/breeds");
        if (response.ok) {
          const data = await response.json();
          setBreeds(
            data.map(
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
        console.error("Error fetching breeds:", error);
        toast.error("Failed to load breeds");
      } finally {
        setLoadingBreeds(false);
      }
    };

    fetchBreeds();
  }, []);

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingCategory(true);
    try {
      const slug = generateSlug(categoryForm.name);
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...categoryForm,
          slug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create category");
      }

      toast.success("Category created successfully!");
      setCategoryForm({ name: "", description: "", image: "" });
      // Refresh categories list
      const refreshResponse = await fetch("/api/admin/categories");
      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        setCategories(refreshData);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create category"
      );
    } finally {
      setSubmittingCategory(false);
    }
  };

  const handleBreedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingBreed(true);
    try {
      const slug = generateSlug(breedForm.name);
      const response = await fetch("/api/admin/breeds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...breedForm,
          slug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create breed");
      }

      toast.success("Breed created successfully!");
      setBreedForm({
        name: "",
        description: "",
        origin: "",
        purpose: "",
        image: "",
        categoryId: "",
      });
      // Refresh breeds list
      const refreshResponse = await fetch("/api/admin/breeds");
      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        setBreeds(
          refreshData.map(
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
      toast.error(
        error instanceof Error ? error.message : "Failed to create breed"
      );
    } finally {
      setSubmittingBreed(false);
    }
  };

  const handleVariantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!variantForm.breedId) {
      toast.error("Please select a breed");
      return;
    }

    if (!variantForm.gender || !variantForm.ageGroup || !variantForm.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmittingVariant(true);
    try {
      const response = await fetch("/api/admin/variants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          variants: [variantForm],
          breedId: variantForm.breedId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create product");
      }

      toast.success("Product created successfully!");
      setVariantForm({
        breedId: variantForm.breedId, // Keep the breed selected
        gender: "",
        ageGroup: "",
        price: "",
        stock: "",
        image: "",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create product"
      );
    } finally {
      setSubmittingVariant(false);
    }
  };

  const selectedBreed = breeds.find((b) => b.id === variantForm.breedId);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Add Products</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {session?.user?.email}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 overflow-auto">
        <div className="max-w-4xl mx-auto w-full space-y-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-2xl grid-cols-3">
              <TabsTrigger value="category" className="gap-2">
                <Tag className="h-4 w-4" />
                Categories
              </TabsTrigger>
              <TabsTrigger value="breed" className="gap-2">
                <Layers className="h-4 w-4" />
                Breeds
              </TabsTrigger>
              <TabsTrigger value="product" className="gap-2">
                <Package className="h-4 w-4" />
                Products
              </TabsTrigger>
            </TabsList>

            {/* Categories Tab */}
            <TabsContent value="category" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Create Category
                  </CardTitle>
                  <CardDescription>
                    Categories group your products (e.g., Eggs, Chicken, Ducks,
                    Turkey)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {categories.length > 0 && (
                    <>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Existing Categories ({categories.length})
                        </Label>
                        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                          {categories.map((category) => (
                            <Badge
                              key={category.id}
                              variant="secondary"
                              className="justify-start p-3 h-auto"
                            >
                              <div className="flex items-center gap-2">
                                {category.image && (
                                  <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-6 h-6 rounded object-cover"
                                  />
                                )}
                                <span>{category.name}</span>
                              </div>
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Separator />
                    </>
                  )}

                  <form onSubmit={handleCategorySubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="category-name">Category Name *</Label>
                      <Input
                        id="category-name"
                        placeholder="e.g., Eggs, Chicken, Ducks"
                        value={categoryForm.name}
                        onChange={(e) =>
                          setCategoryForm({
                            ...categoryForm,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                      {categoryForm.name && (
                        <p className="text-xs text-muted-foreground">
                          Slug:{" "}
                          <code className="px-1 py-0.5 bg-muted rounded">
                            {generateSlug(categoryForm.name)}
                          </code>
                        </p>
                      )}
                    </div>

                    <ImageUpload
                      label="Category Image"
                      value={categoryForm.image}
                      onChange={(url) =>
                        setCategoryForm({
                          ...categoryForm,
                          image: url,
                        })
                      }
                      folder="hatchhaven/categories"
                    />

                    <div className="space-y-2">
                      <Label htmlFor="category-description">Description</Label>
                      <Textarea
                        id="category-description"
                        placeholder="Describe this category..."
                        rows={3}
                        value={categoryForm.description}
                        onChange={(e) =>
                          setCategoryForm({
                            ...categoryForm,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        disabled={submittingCategory}
                        className="flex-1"
                      >
                        {submittingCategory ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Create Category
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Breeds Tab */}
            <TabsContent value="breed" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5" />
                    Create Breed
                  </CardTitle>
                  <CardDescription>
                    Breeds are specific types within a category (e.g., Rhode
                    Island Red, Cornish Cross, Brown Eggs, Chicken Breast)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {breeds.length > 0 && (
                    <>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Existing Breeds ({breeds.length})
                        </Label>
                        <div className="grid gap-2 md:grid-cols-2">
                          {breeds.map((breed) => (
                            <Badge
                              key={breed.id}
                              variant="secondary"
                              className="justify-start p-2 h-auto"
                            >
                              <span className="text-xs">
                                {breed.name}
                                {breed.categoryName && (
                                  <span className="text-muted-foreground ml-1">
                                    ({breed.categoryName})
                                  </span>
                                )}
                              </span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Separator />
                    </>
                  )}

                  <form onSubmit={handleBreedSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="breed-category">Category *</Label>
                      <Select
                        value={breedForm.categoryId}
                        onValueChange={(value) =>
                          setBreedForm({
                            ...breedForm,
                            categoryId: value,
                          })
                        }
                        required
                      >
                        <SelectTrigger id="breed-category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {loadingCategories ? (
                            <SelectItem value="loading" disabled>
                              Loading...
                            </SelectItem>
                          ) : categories.length === 0 ? (
                            <SelectItem value="none" disabled>
                              No categories. Create one first.
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="breed-name">Breed Name *</Label>
                      <Input
                        id="breed-name"
                        placeholder="e.g., Rhode Island Red"
                        value={breedForm.name}
                        onChange={(e) =>
                          setBreedForm({
                            ...breedForm,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                      {breedForm.name && (
                        <p className="text-xs text-muted-foreground">
                          Slug:{" "}
                          <code className="px-1 py-0.5 bg-muted rounded">
                            {generateSlug(breedForm.name)}
                          </code>
                        </p>
                      )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="breed-origin">Origin</Label>
                        <Input
                          id="breed-origin"
                          placeholder="e.g., United States"
                          value={breedForm.origin}
                          onChange={(e) =>
                            setBreedForm({
                              ...breedForm,
                              origin: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="breed-purpose">Purpose</Label>
                        <Select
                          value={breedForm.purpose}
                          onValueChange={(value) =>
                            setBreedForm({
                              ...breedForm,
                              purpose: value,
                            })
                          }
                        >
                          <SelectTrigger id="breed-purpose">
                            <SelectValue placeholder="Select purpose" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Meat">Meat</SelectItem>
                            <SelectItem value="Eggs">Eggs</SelectItem>
                            <SelectItem value="Dual-purpose">
                              Dual-purpose
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <ImageUpload
                      label="Breed Image"
                      value={breedForm.image}
                      onChange={(url) =>
                        setBreedForm({
                          ...breedForm,
                          image: url,
                        })
                      }
                      folder="hatchhaven/breeds"
                    />

                    <div className="space-y-2">
                      <Label htmlFor="breed-description">Description *</Label>
                      <Textarea
                        id="breed-description"
                        placeholder="Describe this breed..."
                        rows={4}
                        value={breedForm.description}
                        onChange={(e) =>
                          setBreedForm({
                            ...breedForm,
                            description: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submittingBreed}
                      className="w-full md:w-auto"
                    >
                      {submittingBreed ? (
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
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="product" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Add Products
                  </CardTitle>
                  <CardDescription>
                    Create products that customers can buy. Fill in the details
                    below and click "Create Product".
                    <br />
                    <span className="text-sm mt-2 block font-medium">
                      For Live Birds:
                    </span>
                    <span className="text-xs">
                      Example: "Rhode Island Red - Female, Mature, $25"
                    </span>
                    <br />
                    <span className="text-sm mt-2 block font-medium">
                      For Eggs & Meat:
                    </span>
                    <span className="text-xs">
                      Select "N/A" for Type/Size and choose size/quantity (e.g.,
                      "Dozen", "1 lb")
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleVariantSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="variant-breed">Select Breed *</Label>
                      <Select
                        value={variantForm.breedId}
                        onValueChange={(value) =>
                          setVariantForm({
                            ...variantForm,
                            breedId: value,
                          })
                        }
                        required
                      >
                        <SelectTrigger id="variant-breed">
                          <SelectValue placeholder="Select a breed" />
                        </SelectTrigger>
                        <SelectContent>
                          {loadingBreeds ? (
                            <SelectItem value="loading" disabled>
                              Loading...
                            </SelectItem>
                          ) : breeds.length === 0 ? (
                            <SelectItem value="none" disabled>
                              No breeds found. Create one first.
                            </SelectItem>
                          ) : (
                            breeds.map((breed) => (
                              <SelectItem key={breed.id} value={breed.id}>
                                {breed.name}
                                {breed.categoryName && (
                                  <span className="text-muted-foreground ml-1">
                                    ({breed.categoryName})
                                  </span>
                                )}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      {selectedBreed && (
                        <p className="text-sm text-muted-foreground">
                          Creating products for:{" "}
                          <strong>{selectedBreed.name}</strong>
                        </p>
                      )}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="variant-gender">
                            Type/Size *
                            <span className="text-xs text-muted-foreground ml-1">
                              (Gender for birds, Size for eggs/meat)
                            </span>
                          </Label>
                          <Select
                            value={variantForm.gender}
                            onValueChange={(value) =>
                              setVariantForm({
                                ...variantForm,
                                gender: value,
                              })
                            }
                            required
                          >
                            <SelectTrigger id="variant-gender">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Male">
                                Male (Live Birds)
                              </SelectItem>
                              <SelectItem value="Female">
                                Female (Live Birds)
                              </SelectItem>
                              <SelectItem value="Pair">
                                Pair (Live Birds)
                              </SelectItem>
                              <SelectItem value="N/A">
                                N/A (For Eggs & Meat)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="variant-age">
                            Size/Quantity *
                            <span className="text-xs text-muted-foreground ml-1">
                              (Age for birds, Size/Quantity for eggs/meat)
                            </span>
                          </Label>
                          <Select
                            value={variantForm.ageGroup}
                            onValueChange={(value) =>
                              setVariantForm({
                                ...variantForm,
                                ageGroup: value,
                              })
                            }
                            required
                          >
                            <SelectTrigger id="variant-age">
                              <SelectValue placeholder="Select size/quantity" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Chick">
                                Chick (Live Birds)
                              </SelectItem>
                              <SelectItem value="1-7 months">
                                1-7 months (Live Birds)
                              </SelectItem>
                              <SelectItem value="Mature">
                                Mature (Live Birds)
                              </SelectItem>
                              <SelectItem value="Half Dozen">
                                Half Dozen - 6 eggs
                              </SelectItem>
                              <SelectItem value="Dozen">
                                Dozen - 12 eggs
                              </SelectItem>
                              <SelectItem value="18 Pack">
                                18 Pack eggs
                              </SelectItem>
                              <SelectItem value="30 Pack">
                                30 Pack eggs
                              </SelectItem>
                              <SelectItem value="1 lb">1 lb (Meat)</SelectItem>
                              <SelectItem value="2 lbs">
                                2 lbs (Meat)
                              </SelectItem>
                              <SelectItem value="5 lbs">
                                5 lbs (Meat)
                              </SelectItem>
                              <SelectItem value="10 lbs">
                                10 lbs (Meat)
                              </SelectItem>
                              <SelectItem value="Whole">
                                Whole (Meat)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="variant-price">Price ($) *</Label>
                          <Input
                            id="variant-price"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={variantForm.price}
                            onChange={(e) =>
                              setVariantForm({
                                ...variantForm,
                                price: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="variant-stock">Stock Quantity</Label>
                          <Input
                            id="variant-stock"
                            type="number"
                            placeholder="0"
                            value={variantForm.stock}
                            onChange={(e) =>
                              setVariantForm({
                                ...variantForm,
                                stock: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <ImageUpload
                        label="Product Image (Optional)"
                        value={variantForm.image}
                        onChange={(url) =>
                          setVariantForm({
                            ...variantForm,
                            image: url,
                          })
                        }
                        folder="hatchhaven/variants"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full md:w-auto"
                      disabled={submittingVariant}
                    >
                      {submittingVariant ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Create Product
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
