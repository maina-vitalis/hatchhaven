"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Facebook, Instagram, Search } from "lucide-react";

// TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.33 6.33 0 0 0 10.86-4.43V7.83a8.24 8.24 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.2-.26z"/>
  </svg>
);

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
      {/* Company Profile */}
      <Card>
        <CardContent className="p-6 text-center">
          <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Hatch Haven Logo"
              width={96}
              height={96}
              className="object-contain"
            />
          </div>
          <h3 className="mb-2">Hatch Haven</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Premium quality poultry and eggs through ethical farming practices and sustainable agriculture.
          </p>
          <div className="flex justify-center gap-3">
            <a
              href="https://www.facebook.com/share/1KR5U8RB2W/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/hatchpoultry.ke?igsh=eXM2bXJyOWVzM3Bm&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600 transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.tiktok.com/@hatchhavenacre?_r=1&_t=ZM-922sRdeftL2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-700 transition-colors"
              aria-label="Follow us on TikTok"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
          </div>
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
