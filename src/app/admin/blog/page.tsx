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
import { Switch } from "@/src/components/ui/switch";
import { FileText, Plus, Edit, Trash2, Loader2, Eye, Star } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string | null;
  featured: boolean;
  published: boolean;
  publishedAt: Date | null;
  views: number;
  likes: number;
  category: {
    id: string;
    name: string;
  };
  author: {
    id: string;
    name: string;
  };
  comments: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface Author {
  id: string;
  name: string;
  email: string;
}

export default function BlogPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [isAuthorDialogOpen, setIsAuthorDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [creatingTag, setCreatingTag] = useState(false);
  const [creatingAuthor, setCreatingAuthor] = useState(false);

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const [tagForm, setTagForm] = useState({ name: "", slug: "" });
  const [authorForm, setAuthorForm] = useState({
    name: "",
    email: "",
    avatar: "",
    bio: "",
  });

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [postsRes, categoriesRes, tagsRes, authorsRes] = await Promise.all([
        fetch("/api/admin/blog/posts"),
        fetch("/api/admin/blog/categories"),
        fetch("/api/blog/tags"),
        fetch("/api/admin/blog/authors"),
      ]);

      if (postsRes.ok) {
        const postsData = await postsRes.json();
        setPosts(postsData);
      }
      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);
      }
      if (tagsRes.ok) {
        const tagsData = await tagsRes.json();
        setTags(tagsData);
      }
      if (authorsRes.ok) {
        const authorsData = await authorsRes.json();
        setAuthors(authorsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (post: BlogPost) => {
    setSelectedPost(post);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedPost) return;

    try {
      setDeleting(true);
      const response = await fetch(`/api/admin/blog/posts/${selectedPost.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Blog post deleted successfully");
        setIsDeleteDialogOpen(false);
        setSelectedPost(null);
        fetchData();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to delete blog post");
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
      toast.error("Failed to delete blog post");
    } finally {
      setDeleting(false);
    }
  };

  const handleCreateCategory = async () => {
    if (!categoryForm.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setCreatingCategory(true);
      const slug = categoryForm.slug || generateSlug(categoryForm.name);
      const response = await fetch("/api/admin/blog/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: categoryForm.name,
          slug,
          description: categoryForm.description || null,
        }),
      });

      if (response.ok) {
        const newCategory = await response.json();
        toast.success("Category created successfully");
        setIsCategoryDialogOpen(false);
        setCategoryForm({ name: "", slug: "", description: "" });
        fetchData();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to create category");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
    } finally {
      setCreatingCategory(false);
    }
  };

  const handleCreateTag = async () => {
    if (!tagForm.name.trim()) {
      toast.error("Tag name is required");
      return;
    }

    try {
      setCreatingTag(true);
      const slug = tagForm.slug || generateSlug(tagForm.name);
      const response = await fetch("/api/admin/blog/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: tagForm.name,
          slug,
        }),
      });

      if (response.ok) {
        const newTag = await response.json();
        toast.success("Tag created successfully");
        setIsTagDialogOpen(false);
        setTagForm({ name: "", slug: "" });
        fetchData();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to create tag");
      }
    } catch (error) {
      console.error("Error creating tag:", error);
      toast.error("Failed to create tag");
    } finally {
      setCreatingTag(false);
    }
  };

  const handleCreateAuthor = async () => {
    if (!authorForm.name.trim() || !authorForm.email.trim()) {
      toast.error("Author name and email are required");
      return;
    }

    try {
      setCreatingAuthor(true);
      const response = await fetch("/api/admin/blog/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: authorForm.name,
          email: authorForm.email,
          avatar: authorForm.avatar || null,
          bio: authorForm.bio || null,
        }),
      });

      if (response.ok) {
        const newAuthor = await response.json();
        toast.success("Author created successfully");
        setIsAuthorDialogOpen(false);
        setAuthorForm({ name: "", email: "", avatar: "", bio: "" });
        fetchData();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to create author");
      }
    } catch (error) {
      console.error("Error creating author:", error);
      toast.error("Failed to create author");
    } finally {
      setCreatingAuthor(false);
    }
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Blog Posts</h1>
        </div>
        <Button asChild className="gap-2">
          <Link href="/admin/blog/new">
            <Plus className="h-4 w-4" />
            New Post
          </Link>
        </Button>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              All Blog Posts
            </CardTitle>
            <CardDescription>
              Manage your blog posts, categories, tags, and authors
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  No blog posts found. Create your first post to get started.
                </p>
                <Button asChild className="gap-2">
                  <Link href="/admin/blog/new">
                    <Plus className="h-4 w-4" />
                    New Post
                  </Link>
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {post.featured && (
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          )}
                          <span>{post.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{post.category.name}</Badge>
                      </TableCell>
                      <TableCell>{post.author.name}</TableCell>
                      <TableCell>
                        {post.published ? (
                          <Badge className="bg-green-500">Published</Badge>
                        ) : (
                          <Badge variant="outline">Draft</Badge>
                        )}
                      </TableCell>
                      <TableCell>{post.views}</TableCell>
                      <TableCell>
                        {post.publishedAt
                          ? format(new Date(post.publishedAt), "MMM d, yyyy")
                          : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="gap-2"
                          >
                            <Link href={`/blog/${post.slug}`} target="_blank">
                              <Eye className="h-4 w-4" />
                              View
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="gap-2"
                          >
                            <Link href={`/admin/blog/${post.id}/edit`}>
                              <Edit className="h-4 w-4" />
                              Edit
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(post)}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the blog post "{selectedPost?.title}
              ". This action cannot be undone.
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

      {/* Create Category Dialog */}
      <Dialog
        open={isCategoryDialogOpen}
        onOpenChange={setIsCategoryDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
            <DialogDescription>Add a new blog category</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category-name">Name *</Label>
              <Input
                id="category-name"
                value={categoryForm.name}
                onChange={(e) => {
                  setCategoryForm({ ...categoryForm, name: e.target.value });
                  if (!categoryForm.slug) {
                    setCategoryForm((prev) => ({
                      ...prev,
                      slug: generateSlug(e.target.value),
                    }));
                  }
                }}
                placeholder="e.g., Farming, Nutrition"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-slug">Slug</Label>
              <Input
                id="category-slug"
                value={categoryForm.slug}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, slug: e.target.value })
                }
                placeholder="Auto-generated from name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-description">Description</Label>
              <Textarea
                id="category-description"
                value={categoryForm.description}
                onChange={(e) =>
                  setCategoryForm({
                    ...categoryForm,
                    description: e.target.value,
                  })
                }
                placeholder="Brief description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCategoryDialogOpen(false);
                setCategoryForm({ name: "", slug: "", description: "" });
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateCategory} disabled={creatingCategory}>
              {creatingCategory && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Tag Dialog */}
      <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Tag</DialogTitle>
            <DialogDescription>Add a new blog tag</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tag-name">Name *</Label>
              <Input
                id="tag-name"
                value={tagForm.name}
                onChange={(e) => {
                  setTagForm({ ...tagForm, name: e.target.value });
                  if (!tagForm.slug) {
                    setTagForm((prev) => ({
                      ...prev,
                      slug: generateSlug(e.target.value),
                    }));
                  }
                }}
                placeholder="e.g., Chicken, Organic"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tag-slug">Slug</Label>
              <Input
                id="tag-slug"
                value={tagForm.slug}
                onChange={(e) =>
                  setTagForm({ ...tagForm, slug: e.target.value })
                }
                placeholder="Auto-generated from name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsTagDialogOpen(false);
                setTagForm({ name: "", slug: "" });
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateTag} disabled={creatingTag}>
              {creatingTag && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Author Dialog */}
      <Dialog open={isAuthorDialogOpen} onOpenChange={setIsAuthorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Author</DialogTitle>
            <DialogDescription>Add a new blog author</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author-name">Name *</Label>
                <Input
                  id="author-name"
                  value={authorForm.name}
                  onChange={(e) =>
                    setAuthorForm({ ...authorForm, name: e.target.value })
                  }
                  placeholder="Author name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author-email">Email *</Label>
                <Input
                  id="author-email"
                  type="email"
                  value={authorForm.email}
                  onChange={(e) =>
                    setAuthorForm({ ...authorForm, email: e.target.value })
                  }
                  placeholder="author@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="author-avatar">Avatar URL</Label>
              <Input
                id="author-avatar"
                value={authorForm.avatar}
                onChange={(e) =>
                  setAuthorForm({ ...authorForm, avatar: e.target.value })
                }
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author-bio">Bio</Label>
              <Textarea
                id="author-bio"
                value={authorForm.bio}
                onChange={(e) =>
                  setAuthorForm({ ...authorForm, bio: e.target.value })
                }
                placeholder="Author biography"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAuthorDialogOpen(false);
                setAuthorForm({ name: "", email: "", avatar: "", bio: "" });
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateAuthor} disabled={creatingAuthor}>
              {creatingAuthor && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
