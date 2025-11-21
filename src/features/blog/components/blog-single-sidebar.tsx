"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import { Search } from "lucide-react";

interface BlogSingleSidebarProps {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    postCount: number;
  }>;
  relatedPosts: Array<{
    id: string;
    title: string;
    slug: string;
    image: string | null;
  }>;
}

export function BlogSingleSidebar({
  categories,
  relatedPosts,
}: BlogSingleSidebarProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Input type="search" placeholder="Search..." className="pr-10" />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      {categories.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="flex justify-between items-center text-sm"
                >
                  <Link
                    href={`/blog?category=${category.slug}`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                  <span className="text-muted-foreground">
                    ({category.postCount})
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {relatedPosts.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4">Related Posts</h3>
            <div className="space-y-4">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="flex gap-3 group"
                >
                  <div className="w-20 h-20 shrink-0 rounded overflow-hidden">
                    <Image
                      src={post.image || "/placeholder-blog.jpg"}
                      alt={post.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
