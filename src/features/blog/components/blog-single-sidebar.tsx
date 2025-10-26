"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

export function BlogSingleSidebar() {
  const recentPosts = [
    {
      title: "Credibly benchmark dynamic",
      image:
        "https://images.unsplash.com/photo-1707879790624-9d85552d9aa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwZmFybSUyMGZlZWRpbmd8ZW58MXx8fHwxNzYxMzc4Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Continually utilize bleeding edge",
      image:
        "https://images.unsplash.com/photo-1707915317401-ec856300cf99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlJTIwcmFuZ2UlMjBjaGlja2Vuc3xlbnwxfHx8fDE3NjEzNzI5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const tags = ["Chicken", "Fresh", "Organic", "Farm", "Poultry", "Healthy"];

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

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4">Recent Post</h3>
          <div className="space-y-4">
            {recentPosts.map((post, index) => (
              <a key={index} href="#" className="flex gap-3 group">
                <div className="w-20 h-20 shrink-0 rounded overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={80}
                    height={80}
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

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4">Archives</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors"
              >
                March 2024
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors"
              >
                February 2024
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors"
              >
                January 2024
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
