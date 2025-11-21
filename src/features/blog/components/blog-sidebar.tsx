"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Search } from "lucide-react";

interface BlogSidebarProps {
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

export function BlogSidebar({ categories, recentPosts }: BlogSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Author Profile */}
      <Card>
        <CardContent className="p-6 text-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary">
            <Image
              src="https://images.unsplash.com/photo-1562672767-51120ccfdfeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjEyODc4Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Johan Smith"
              width={96}
              height={96}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
          <h3 className="mb-2">Johan Smith</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Professionally predominate real time niche markets with
            clicks-and-mortar
          </p>
          <div className="flex justify-center gap-3 mb-4">
            <a
              href="#"
              className="text-blue-400 hover:text-blue-500 transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="text-pink-500 hover:text-pink-600 transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="text-blue-700 hover:text-blue-800 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="text-primary">500k</span> Followers
          </p>
        </CardContent>
      </Card>

      {/* Categories */}
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

      {/* Recent Posts */}
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4">Recent Post</h3>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="flex gap-3 group"
              >
                <div className="w-16 h-16 shrink-0 rounded overflow-hidden">
                  <Image
                    src={post.image || "/placeholder-blog.jpg"}
                    alt={post.title}
                    width={64}
                    height={64}
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

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Input type="search" placeholder="Search..." className="pr-10" />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
