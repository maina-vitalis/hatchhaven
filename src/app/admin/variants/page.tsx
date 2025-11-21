"use client";

import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import { Badge } from "@/src/components/ui/badge";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { ImageUpload } from "@/src/features/admin/components/image-upload";

interface Breed {
  id: string;
  name: string;
  slug: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

interface Variant {
  id: string;
  gender: string;
  ageGroup: string;
  price: number;
  stock: number;
  image: string | null;
  breedId: string;
  breed: Breed;
  createdAt: string;
  updatedAt: string;
}

export default function VariantsPage() {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingBreeds, setLoadingBreeds] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState({
    breedId: "",
    gender: "",
    ageGroup: "",
    price: "",
    stock: "",
    image: "",
  });

  // Fetch variants and breeds
  useEffect(() => {
    fetchVariants();
    fetchBreeds();
  }, []);

  const fetchVariants = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/variants");
      if (response.ok) {
        const data = await response.json();
        setVariants(data);
      } else {
        toast.error("Failed to load variants");
      }
    } catch (error) {
      console.error("Error fetching variants:", error);
      toast.error("Failed to load variants");
    } finally {
      setLoading(false);
    }
  };

  const fetchBreeds = async () => {
    try {
      setLoadingBreeds(true);
      const response = await fetch("/api/admin/breeds");
      if (response.ok) {
        const data = await response.json();
        setBreeds(data);
      }
    } catch (error) {
      console.error("Error fetching breeds:", error);
    } finally {
      setLoadingBreeds(false);
    }
  };

  const handleCreate = async () => {
    if (
      !formData.breedId ||
      !formData.gender ||
      !formData.ageGroup ||
      !formData.price
    ) {
      toast.error("Breed, gender, age group, and price are required");
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch("/api/admin/variants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          breedId: formData.breedId,
          variants: [
            {
              gender: formData.gender,
              ageGroup: formData.ageGroup,
              price: formData.price,
              stock: formData.stock || "0",
              image: formData.image || null,
            },
          ],
        }),
      });

      if (response.ok) {
        toast.success("Product variant created successfully");
        setIsCreateDialogOpen(false);
        setFormData({
          breedId: "",
          gender: "",
          ageGroup: "",
          price: "",
          stock: "",
          image: "",
        });
        fetchVariants();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to create variant");
      }
    } catch (error) {
      console.error("Error creating variant:", error);
      toast.error("Failed to create variant");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (variant: Variant) => {
    setSelectedVariant(variant);
    setFormData({
      breedId: variant.breedId,
      gender: variant.gender,
      ageGroup: variant.ageGroup,
      price: variant.price.toString(),
      stock: variant.stock.toString(),
      image: variant.image || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (
      !selectedVariant ||
      !formData.breedId ||
      !formData.gender ||
      !formData.ageGroup ||
      !formData.price
    ) {
      toast.error("Breed, gender, age group, and price are required");
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(
        `/api/admin/variants/${selectedVariant.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            breedId: formData.breedId,
            gender: formData.gender,
            ageGroup: formData.ageGroup,
            price: formData.price,
            stock: formData.stock || "0",
            image: formData.image || null,
          }),
        }
      );

      if (response.ok) {
        toast.success("Product variant updated successfully");
        setIsEditDialogOpen(false);
        setSelectedVariant(null);
        setFormData({
          breedId: "",
          gender: "",
          ageGroup: "",
          price: "",
          stock: "",
          image: "",
        });
        fetchVariants();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update variant");
      }
    } catch (error) {
      console.error("Error updating variant:", error);
      toast.error("Failed to update variant");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (variant: Variant) => {
    setSelectedVariant(variant);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedVariant) return;

    try {
      setDeleting(true);
      const response = await fetch(
        `/api/admin/variants/${selectedVariant.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Product variant deleted successfully");
        setIsDeleteDialogOpen(false);
        setSelectedVariant(null);
        fetchVariants();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to delete variant");
      }
    } catch (error) {
      console.error("Error deleting variant:", error);
      toast.error("Failed to delete variant");
    } finally {
      setDeleting(false);
    }
  };

  const getGenderOptions = (breedId: string) => {
    const breed = breeds.find((b) => b.id === breedId);
    if (!breed) return ["Male", "Female", "Pair"];

    // Check if this breed has variants with "N/A" gender (eggs/meat)
    const breedVariants = variants.filter((v) => v.breedId === breedId);
    if (breedVariants.some((v) => v.gender === "N/A")) {
      return ["N/A"];
    }

    return ["Male", "Female", "Pair", "N/A"];
  };

  const getAgeGroupOptions = (breedId: string) => {
    const breed = breeds.find((b) => b.id === breedId);
    if (!breed)
      return ["Chick", "1-3 months", "4-7 months", "8-12 months", "Mature"];

    // Check if this breed has variants with "N/A" gender (eggs/meat)
    const breedVariants = variants.filter((v) => v.breedId === breedId);
    if (breedVariants.some((v) => v.gender === "N/A")) {
      return ["Dozen", "Half Dozen", "Single", "Tray"];
    }

    return ["Chick", "1-3 months", "4-7 months", "8-12 months", "Mature"];
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Product Variants</h1>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Variant
        </Button>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              All Product Variants
            </CardTitle>
            <CardDescription>
              Manage product variants (specific combinations of breed, gender,
              and age)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : variants.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  No variants found. Create your first product variant to get
                  started.
                </p>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Variant
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Breed</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Age Group</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {variants.map((variant) => (
                    <TableRow key={variant.id}>
                      <TableCell>
                        {variant.image ? (
                          <div className="relative h-12 w-12 rounded-md overflow-hidden border">
                            <Image
                              src={variant.image}
                              alt={`${variant.breed.name} - ${variant.gender}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-12 w-12 rounded-md border flex items-center justify-center bg-muted">
                            <ImageIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {variant.breed.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {variant.breed.category.name}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {variant.gender === "N/A" ? (
                          <Badge variant="outline">N/A</Badge>
                        ) : (
                          <Badge>{variant.gender}</Badge>
                        )}
                      </TableCell>
                      <TableCell>{variant.ageGroup}</TableCell>
                      <TableCell className="font-medium">
                        ${variant.price.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {variant.stock === 0 ? (
                          <Badge variant="destructive">Out of Stock</Badge>
                        ) : (
                          <Badge variant="outline">{variant.stock}</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(variant)}
                            className="gap-2"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(variant)}
                            className="gap-2 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Product Variant</DialogTitle>
            <DialogDescription>
              Add a new product variant. Variants represent specific
              combinations of breed, gender, and age.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="breed">Breed *</Label>
              <Select
                value={formData.breedId}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    breedId: value,
                    gender: "",
                    ageGroup: "",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a breed" />
                </SelectTrigger>
                <SelectContent>
                  {breeds.map((breed) => (
                    <SelectItem key={breed.id} value={breed.id}>
                      {breed.name} ({breed.category.name})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender/Type *</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }
                disabled={!formData.breedId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender/type" />
                </SelectTrigger>
                <SelectContent>
                  {formData.breedId &&
                    getGenderOptions(formData.breedId).map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {formData.gender === "N/A" && (
                <p className="text-xs text-muted-foreground">
                  Use "N/A" for products like eggs or meat that don&apos;t have
                  a gender.
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ageGroup">Age Group/Size *</Label>
              <Select
                value={formData.ageGroup}
                onValueChange={(value) =>
                  setFormData({ ...formData, ageGroup: value })
                }
                disabled={!formData.breedId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select age group/size" />
                </SelectTrigger>
                <SelectContent>
                  {formData.breedId &&
                    getAgeGroupOptions(formData.breedId).map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  placeholder="0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                folder="variants"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateDialogOpen(false);
                setFormData({
                  breedId: "",
                  gender: "",
                  ageGroup: "",
                  price: "",
                  stock: "",
                  image: "",
                });
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={submitting || loadingBreeds}
            >
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Variant
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product Variant</DialogTitle>
            <DialogDescription>
              Update product variant information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-breed">Breed *</Label>
              <Select
                value={formData.breedId}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    breedId: value,
                    gender: "",
                    ageGroup: "",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a breed" />
                </SelectTrigger>
                <SelectContent>
                  {breeds.map((breed) => (
                    <SelectItem key={breed.id} value={breed.id}>
                      {breed.name} ({breed.category.name})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-gender">Gender/Type *</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }
                disabled={!formData.breedId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender/type" />
                </SelectTrigger>
                <SelectContent>
                  {formData.breedId &&
                    getGenderOptions(formData.breedId).map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-ageGroup">Age Group/Size *</Label>
              <Select
                value={formData.ageGroup}
                onValueChange={(value) =>
                  setFormData({ ...formData, ageGroup: value })
                }
                disabled={!formData.breedId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select age group/size" />
                </SelectTrigger>
                <SelectContent>
                  {formData.breedId &&
                    getAgeGroupOptions(formData.breedId).map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price *</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-stock">Stock</Label>
                <Input
                  id="edit-stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  placeholder="0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-image">Image</Label>
              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                folder="variants"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setSelectedVariant(null);
                setFormData({
                  breedId: "",
                  gender: "",
                  ageGroup: "",
                  price: "",
                  stock: "",
                  image: "",
                });
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Variant
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this product variant. This action
              cannot be undone.
              {selectedVariant && (
                <span className="block mt-2 text-destructive font-medium">
                  Note: You cannot delete a variant that is in carts or orders.
                  Consider setting stock to 0 instead.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
