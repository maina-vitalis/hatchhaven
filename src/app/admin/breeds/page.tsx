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
import { Textarea } from "@/src/components/ui/textarea";
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
  Layers,
  Plus,
  Edit,
  Trash2,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { ImageUpload } from "@/src/features/admin/components/image-upload";
import { Skeleton } from "@/src/components/ui/skeleton";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Breed {
  id: string;
  name: string;
  slug: string;
  description: string;
  origin: string | null;
  purpose: string | null;
  image: string | null;
  categoryId: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
}

export default function BreedsPage() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    origin: "",
    purpose: "",
    image: "",
    categoryId: "",
  });

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // Fetch breeds and categories
  useEffect(() => {
    fetchBreeds();
    fetchCategories();
  }, []);

  const fetchBreeds = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/breeds");
      if (response.ok) {
        const data = await response.json();
        setBreeds(data);
      } else {
        toast.error("Failed to load breeds");
      }
    } catch (error) {
      console.error("Error fetching breeds:", error);
      toast.error("Failed to load breeds");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await fetch("/api/admin/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleCreate = async () => {
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.categoryId
    ) {
      toast.error("Name, description, and category are required");
      return;
    }

    try {
      setSubmitting(true);
      const slug = generateSlug(formData.name);
      const response = await fetch("/api/admin/breeds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          slug,
          description: formData.description,
          origin: formData.origin || null,
          purpose: formData.purpose || null,
          image: formData.image || null,
          categoryId: formData.categoryId,
        }),
      });

      if (response.ok) {
        toast.success("Breed created successfully");
        setIsCreateDialogOpen(false);
        setFormData({
          name: "",
          description: "",
          origin: "",
          purpose: "",
          image: "",
          categoryId: "",
        });
        fetchBreeds();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to create breed");
      }
    } catch (error) {
      console.error("Error creating breed:", error);
      toast.error("Failed to create breed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (breed: Breed) => {
    setSelectedBreed(breed);
    setFormData({
      name: breed.name,
      description: breed.description,
      origin: breed.origin || "",
      purpose: breed.purpose || "",
      image: breed.image || "",
      categoryId: breed.categoryId,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (
      !selectedBreed ||
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.categoryId
    ) {
      toast.error("Name, description, and category are required");
      return;
    }

    try {
      setSubmitting(true);
      const slug = generateSlug(formData.name);
      const response = await fetch(`/api/admin/breeds/${selectedBreed.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          slug,
          description: formData.description,
          origin: formData.origin || null,
          purpose: formData.purpose || null,
          image: formData.image || null,
          categoryId: formData.categoryId,
        }),
      });

      if (response.ok) {
        toast.success("Breed updated successfully");
        setIsEditDialogOpen(false);
        setSelectedBreed(null);
        setFormData({
          name: "",
          description: "",
          origin: "",
          purpose: "",
          image: "",
          categoryId: "",
        });
        fetchBreeds();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update breed");
      }
    } catch (error) {
      console.error("Error updating breed:", error);
      toast.error("Failed to update breed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (breed: Breed) => {
    setSelectedBreed(breed);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedBreed) return;

    try {
      setDeleting(true);
      const response = await fetch(`/api/admin/breeds/${selectedBreed.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Breed deleted successfully");
        setIsDeleteDialogOpen(false);
        setSelectedBreed(null);
        fetchBreeds();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to delete breed");
      }
    } catch (error) {
      console.error("Error deleting breed:", error);
      toast.error("Failed to delete breed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Breeds</h1>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Breed
        </Button>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              All Breeds
            </CardTitle>
            <CardDescription>
              Manage bird breeds within categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-12 w-12 rounded-md" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-24 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Skeleton className="h-8 w-16" />
                          <Skeleton className="h-8 w-16" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : breeds.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Layers className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  No breeds found. Create your first breed to get started.
                </p>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Breed
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {breeds.map((breed) => (
                    <TableRow key={breed.id}>
                      <TableCell>
                        {breed.image ? (
                          <div className="relative h-12 w-12 rounded-md overflow-hidden border">
                            <Image
                              src={breed.image}
                              alt={breed.name}
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
                        {breed.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{breed.category.name}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{breed.slug}</Badge>
                      </TableCell>
                      <TableCell>
                        {breed.purpose ? (
                          <span className="text-sm">{breed.purpose}</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            —
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(breed)}
                            className="gap-2"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(breed)}
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
            <DialogTitle>Create Breed</DialogTitle>
            <DialogDescription>
              Add a new bird breed. Breeds belong to categories and can have
              multiple product variants.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  setFormData({ ...formData, categoryId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Rhode Island Red, Leghorn"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe the breed characteristics, temperament, etc."
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin">Origin</Label>
                <Input
                  id="origin"
                  value={formData.origin}
                  onChange={(e) =>
                    setFormData({ ...formData, origin: e.target.value })
                  }
                  placeholder="e.g., United States"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Input
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) =>
                    setFormData({ ...formData, purpose: e.target.value })
                  }
                  placeholder="e.g., Meat, Eggs, Dual-purpose"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                folder="breeds"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateDialogOpen(false);
                setFormData({
                  name: "",
                  description: "",
                  origin: "",
                  purpose: "",
                  image: "",
                  categoryId: "",
                });
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={submitting || loadingCategories}
            >
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Breed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Breed</DialogTitle>
            <DialogDescription>
              Update breed information. The slug will be auto-generated from the
              name.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category *</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  setFormData({ ...formData, categoryId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Rhode Island Red, Leghorn"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description *</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe the breed characteristics, temperament, etc."
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-origin">Origin</Label>
                <Input
                  id="edit-origin"
                  value={formData.origin}
                  onChange={(e) =>
                    setFormData({ ...formData, origin: e.target.value })
                  }
                  placeholder="e.g., United States"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-purpose">Purpose</Label>
                <Input
                  id="edit-purpose"
                  value={formData.purpose}
                  onChange={(e) =>
                    setFormData({ ...formData, purpose: e.target.value })
                  }
                  placeholder="e.g., Meat, Eggs, Dual-purpose"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-image">Image</Label>
              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                folder="breeds"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setSelectedBreed(null);
                setFormData({
                  name: "",
                  description: "",
                  origin: "",
                  purpose: "",
                  image: "",
                  categoryId: "",
                });
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Breed
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
              This will permanently delete the breed "{selectedBreed?.name}".
              This action cannot be undone.
              {selectedBreed && (
                <span className="block mt-2 text-destructive font-medium">
                  Note: You cannot delete a breed that has associated product
                  variants.
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
