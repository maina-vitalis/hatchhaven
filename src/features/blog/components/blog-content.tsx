"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  MessageCircle,
  ThumbsUp,
  Clock,
  Calendar,
  ArrowRight,
  Star,
} from "lucide-react";
import { format } from "date-fns";
import { BlogQuote } from "./blog-quote";
import { BlogSidebar } from "./blog-sidebar";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string | null;
  comments: number;
  likes: number;
  slug: string;
  category: {
    name: string;
    slug: string;
  };
  author: {
    name: string;
    avatar: string | null;
  };
  publishedAt: Date | null;
  readTime: number;
  featured?: boolean;
}

interface BlogContentProps {
  initialPosts: BlogPost[];
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    postCount: number;
  }>;
  recentPosts: Array<{
    id: string;
    title: string;
    slug: string;
    image: string | null;
  }>;
}

export function BlogContent({
  initialPosts,
  categories,
  recentPosts,
}: BlogContentProps) {
  const blogPosts = initialPosts;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {blogPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No blog posts found.</p>
              </div>
            ) : (
              blogPosts.map((post, index) => (
                <div key={post.id}>
                  <BlogPost {...post} />
                  {index === 2 && (
                    <div className="mt-10">
                      <BlogQuote />
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 pt-12 border-t">
              <Button
                variant="outline"
                size="sm"
                className="rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                First
              </Button>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 rounded-md min-w-[40px]"
              >
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary hover:text-primary-foreground transition-colors rounded-md min-w-[40px]"
              >
                2
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary hover:text-primary-foreground transition-colors rounded-md min-w-[40px]"
              >
                3
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Last
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar categories={categories} recentPosts={recentPosts} />
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogPost({
  title,
  excerpt,
  image,
  comments,
  likes,
  slug,
  category,
  author,
  publishedAt,
  readTime,
  featured,
}: BlogPost) {
  const imageUrl = image || "/placeholder-blog.jpg";
  const authorAvatar = author.avatar || "/placeholder-avatar.jpg";
  const publishedDate = publishedAt
    ? format(new Date(publishedAt), "MMM d, yyyy")
    : "Unknown";

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-border/50">
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {featured && (
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-primary/90 text-primary-foreground border-0 shadow-lg">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Featured
              </Badge>
            </div>
          )}
          <Link href={`/blog/${slug}`}>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </Link>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Category and Meta Info */}
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <Badge variant="secondary" className="text-xs font-semibold">
              {category.name}
            </Badge>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {publishedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {readTime} min read
              </span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/blog/${slug}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h2>
          </Link>

          {/* Excerpt */}
          <p className="text-muted-foreground mb-6 leading-relaxed text-base line-clamp-3">
            {excerpt}
          </p>

          {/* Author and Actions */}
          <div className="flex items-center justify-between pt-6 border-t">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
                <Image
                  src={authorAvatar}
                  alt={author.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {author.name}
                </p>
                <p className="text-xs text-muted-foreground">Author</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer">
                  <MessageCircle className="h-4 w-4" />
                  <span className="font-medium">{comments}</span>
                </span>
                <span className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="font-medium">{likes}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Read More Button */}
          <div className="mt-6">
            <Button
              variant="outline"
              className="group/btn w-full sm:w-auto hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              asChild
            >
              <Link
                href={`/blog/${slug}`}
                className="inline-flex items-center gap-2"
              >
                Read Full Article
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
