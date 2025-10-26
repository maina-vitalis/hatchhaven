"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Facebook, Twitter, Instagram, Linkedin, Search } from "lucide-react";

interface RecentPost {
  title: string;
  image: string;
}

export function BlogSidebar() {
  const categories = [
    { name: "Poultry", count: 60 },
    { name: "Chicken", count: 45 },
    { name: "Roaster", count: 32 },
    { name: "Murgi farm", count: 28 },
    { name: "Livestock", count: 24 },
    { name: "Supplements", count: 18 },
    { name: "Photography", count: 15 },
  ];

  const recentPosts: RecentPost[] = [
    {
      title: "Continually utilize bleeding edge",
      image:
        "https://images.unsplash.com/photo-1707879790624-9d85552d9aa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwZmFybSUyMGZlZWRpbmd8ZW58MXx8fHwxNzYxMzc4Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Credibly benchmark dynamic",
      image:
        "https://images.unsplash.com/photo-1707915317401-ec856300cf99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlJTIwcmFuZ2UlMjBjaGlja2Vuc3xlbnwxfHx8fDE3NjEzNzI5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Continually utilize bleeding edge",
      image:
        "https://images.unsplash.com/photo-1601671397510-30dbfaa431db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3VsdHJ5JTIwZmFybSUyMGVnZ3N8ZW58MXx8fHwxNzYxMzc4Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Credibly benchmark dynamic",
      image:
        "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VucyUyMGNvb3B8ZW58MXx8fHwxNzYxMzc4Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const instagramImages = [
    "https://images.unsplash.com/photo-1707879790624-9d85552d9aa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwZmFybSUyMGZlZWRpbmd8ZW58MXx8fHwxNzYxMzc4Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1707915317401-ec856300cf99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlJTIwcmFuZ2UlMjBjaGlja2Vuc3xlbnwxfHx8fDE3NjEzNzI5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1601671397510-30dbfaa431db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3VsdHJ5JTIwZmFybSUyMGVnZ3N8ZW58MXx8fHwxNzYxMzc4Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VucyUyMGNvb3B8ZW58MXx8fHwxNzYxMzc4Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1707879790624-9d85552d9aa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwZmFybSUyMGZlZWRpbmd8ZW58MXx8fHwxNzYxMzc4Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1707915317401-ec856300cf99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlJTIwcmFuZ2UlMjBjaGlja2Vuc3xlbnwxfHx8fDE3NjEzNzI5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ];

  const tags = ["All", "Chicken", "Fresh", "Livestock", "Murgi", "Supplements"];

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
                key={category.name}
                className="flex justify-between items-center text-sm"
              >
                <a
                  href="#"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {category.name}
                </a>
                <span className="text-muted-foreground">
                  ({category.count})
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
            {recentPosts.map((post, index) => (
              <a key={index} href="#" className="flex gap-3 group">
                <div className="w-16 h-16 shrink-0 rounded overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instagram Feed */}
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4">Instagram Feed</h3>
          <div className="grid grid-cols-3 gap-2">
            {instagramImages.map((image, index) => (
              <a
                key={index}
                href="#"
                className="aspect-square rounded overflow-hidden group cursor-pointer"
              >
                <Image
                  src={image}
                  alt={`Instagram ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  unoptimized
                />
              </a>
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

      {/* Tags */}
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
