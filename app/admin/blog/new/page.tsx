"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { TipTapEditor } from "@/src/features/admin/components/tiptap-editor";
import { ImageUpload } from "@/src/features/admin/components/image-upload";

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

export default function NewBlogPostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [isAuthorDialogOpen, setIsAuthorDialogOpen] = useState(false);
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [creatingTag, setCreatingTag] = useState(false);
  const [creatingAuthor, setCreatingAuthor] = useState(false);

  const [categoryForm, setCategoryForm] = useState({ name: "", slug: "", description: "" });
  const [tagForm, setTagForm] = useState({ name: "", slug: "" });
  const [authorForm, setAuthorForm] = useState({ name: "", email: "", avatar: "", bio: "" });

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    featured: false,
    published: false,
    publishedAt: "",
    readTime: "5",
    categoryId: "",
    authorId: "",
    tagIds: [] as string[],
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
      const [categoriesRes, tagsRes, authorsRes] = await Promise.all([
        fetch("/api/admin/blog/categories"),
        fetch("/api/blog/tags"),
        fetch("/api/admin/blog/authors"),
      ]);

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

  const handleCreate = async () => {
    if (!formData.title || !formData.excerpt || !formData.content || !formData.categoryId || !formData.authorId) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      const slug = formData.slug || generateSlug(formData.title);
      const response = await fetch("/api/admin/blog/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          slug,
          readTime: parseInt(formData.readTime) || 5,
          tagIds: formData.tagIds,
        }),
      });

      if (response.ok) {
        toast.success("Blog post created successfully");
        router.push("/admin/blog");
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to create blog post");
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast.error("Failed to create blog post");
    } finally {
      setSubmitting(false);
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
          description: categoryForm.description,
        }),
      });

      if (response.ok) {
        const newCategory = await response.json();
        setCategories([...categories, newCategory]);
        setFormData({ ...formData, categoryId: newCategory.id });
        setIsCategoryDialogOpen(false);
        setCategoryForm({ name: "", slug: "", description: "" });
        toast.success("Category created successfully");
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
        setTags([...tags, newTag]);
        setIsTagDialogOpen(false);
        setTagForm({ name: "", slug: "" });
        toast.success("Tag created successfully");
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
          avatar: authorForm.avatar,
          bio: authorForm.bio,
        }),
      });

      if (response.ok) {
        const newAuthor = await response.json();
        setAuthors([...authors, newAuthor]);
        setFormData({ ...formData, authorId: newAuthor.id });
        setIsAuthorDialogOpen(false);
        setAuthorForm({ name: "", email: "", avatar: "", bio: "" });
        toast.success("Author created successfully");
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

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Create Blog Post</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  if (!formData.slug) {
                    setFormData((prev) => ({ ...prev, slug: generateSlug(e.target.value) }));
                  }
                }}
                placeholder="Enter post title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="Auto-generated from title"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Brief description of the post"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <TipTapEditor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="Start writing your blog post..."
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="category">Category *</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCategoryDialogOpen(true)}
                  className="h-7 text-xs"
                >
                  + New Category
                </Button>
              </div>
              <Select
                value={formData.categoryId}
                onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
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
              <div className="flex items-center justify-between">
                <Label htmlFor="author">Author *</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAuthorDialogOpen(true)}
                  className="h-7 text-xs"
                >
                  + New Author
                </Button>
              </div>
              <Select
                value={formData.authorId}
                onValueChange={(value) => setFormData({ ...formData, authorId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an author" />
                </SelectTrigger>
                <SelectContent>
                  {authors.map((author) => (
                    <SelectItem key={author.id} value={author.id}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="tags">Tags</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsTagDialogOpen(true)}
                className="h-7 text-xs"
              >
                + New Tag
              </Button>
            </div>
            <Select
              value=""
              onValueChange={(value) => {
                if (!formData.tagIds.includes(value)) {
                  setFormData({ ...formData, tagIds: [...formData.tagIds, value] });
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Add tags" />
              </SelectTrigger>
              <SelectContent>
                {tags.map((tag) => (
                  <SelectItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.tagIds.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tagIds.map((tagId) => {
                  const tag = tags.find((t) => t.id === tagId);
                  return tag ? (
                    <Badge
                      key={tagId}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          tagIds: formData.tagIds.filter((id) => id !== tagId),
                        });
                      }}
                    >
                      {tag.name} ×
                    </Badge>
                  ) : null;
                })}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="readTime">Read Time (minutes)</Label>
              <Input
                id="readTime"
                type="number"
                min="1"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publishedAt">Published Date</Label>
              <Input
                id="publishedAt"
                type="date"
                value={formData.publishedAt}
                onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Featured Image</Label>
              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                folder="blog"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
              />
              <Label htmlFor="featured">Featured</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
              />
              <Label htmlFor="published">Published</Label>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Post
            </Button>
          </div>
        </div>
      </div>

      {/* Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
            <DialogDescription>
              Create a new blog category
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Name *</Label>
              <Input
                id="categoryName"
                value={categoryForm.name}
                onChange={(e) => {
                  setCategoryForm({ ...categoryForm, name: e.target.value });
                  if (!categoryForm.slug) {
                    setCategoryForm((prev) => ({ ...prev, slug: generateSlug(e.target.value) }));
                  }
                }}
                placeholder="Category name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categorySlug">Slug</Label>
              <Input
                id="categorySlug"
                value={categoryForm.slug}
                onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                placeholder="Auto-generated from name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoryDescription">Description</Label>
              <Textarea
                id="categoryDescription"
                value={categoryForm.description}
                onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                placeholder="Category description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCategory} disabled={creatingCategory}>
              {creatingCategory && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tag Dialog */}
      <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Tag</DialogTitle>
            <DialogDescription>
              Create a new blog tag
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tagName">Name *</Label>
              <Input
                id="tagName"
                value={tagForm.name}
                onChange={(e) => {
                  setTagForm({ ...tagForm, name: e.target.value });
                  if (!tagForm.slug) {
                    setTagForm((prev) => ({ ...prev, slug: generateSlug(e.target.value) }));
                  }
                }}
                placeholder="Tag name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagSlug">Slug</Label>
              <Input
                id="tagSlug"
                value={tagForm.slug}
                onChange={(e) => setTagForm({ ...tagForm, slug: e.target.value })}
                placeholder="Auto-generated from name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTagDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTag} disabled={creatingTag}>
              {creatingTag && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Author Dialog */}
      <Dialog open={isAuthorDialogOpen} onOpenChange={setIsAuthorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Author</DialogTitle>
            <DialogDescription>
              Create a new blog author
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="authorName">Name *</Label>
              <Input
                id="authorName"
                value={authorForm.name}
                onChange={(e) => setAuthorForm({ ...authorForm, name: e.target.value })}
                placeholder="Author name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="authorEmail">Email *</Label>
              <Input
                id="authorEmail"
                type="email"
                value={authorForm.email}
                onChange={(e) => setAuthorForm({ ...authorForm, email: e.target.value })}
                placeholder="author@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="authorAvatar">Avatar URL</Label>
              <Input
                id="authorAvatar"
                value={authorForm.avatar}
                onChange={(e) => setAuthorForm({ ...authorForm, avatar: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="authorBio">Bio</Label>
              <Textarea
                id="authorBio"
                value={authorForm.bio}
                onChange={(e) => setAuthorForm({ ...authorForm, bio: e.target.value })}
                placeholder="Author bio"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAuthorDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateAuthor} disabled={creatingAuthor}>
              {creatingAuthor && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


