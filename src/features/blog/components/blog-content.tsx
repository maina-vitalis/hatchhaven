"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { BlogQuote } from "./blog-quote";
import { BlogSidebar } from "./blog-sidebar";

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  comments: number;
  likes: number;
}

export function BlogContent() {
  const blogPosts: BlogPost[] = [
    {
      title: "Continually proactive services",
      excerpt:
        "Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI. Efficiently unleash cross-media information without cross-media value.",
      image:
        "https://images.unsplash.com/photo-1707879790624-9d85552d9aa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwZmFybSUyMGZlZWRpbmd8ZW58MXx8fHwxNzYxMzc4Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      comments: 3,
      likes: 45,
    },
    {
      title: "Continually proactive services",
      excerpt:
        "Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI. Efficiently unleash cross-media information without cross-media value.",
      image:
        "https://images.unsplash.com/photo-1707915317401-ec856300cf99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlJTIwcmFuZ2UlMjBjaGlja2Vuc3xlbnwxfHx8fDE3NjEzNzI5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      comments: 5,
      likes: 67,
    },
    {
      title: "Continually proactive services",
      excerpt:
        "Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI. Efficiently unleash cross-media information without cross-media value.",
      image:
        "https://images.unsplash.com/photo-1601671397510-30dbfaa431db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3VsdHJ5JTIwZmFybSUyMGVnZ3N8ZW58MXx8fHwxNzYxMzc4Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      comments: 8,
      likes: 92,
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {blogPosts.map((post, index) => (
              <div key={index}>
                <BlogPost {...post} />
                {index === 1 && (
                  <div className="mt-8">
                    <BlogQuote />
                  </div>
                )}
              </div>
            ))}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 pt-8">
              <Button variant="outline" size="sm">
                First
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary/10"
              >
                2
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary/10"
              >
                3
              </Button>
              <Button variant="outline" size="sm">
                Last
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogPost({ title, excerpt, image, comments, likes }: BlogPost) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-video overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        </div>
        <div className="p-8">
          <h2 className="mb-4">{title}</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {excerpt}
          </p>
          <div className="flex items-center justify-between">
            <Button variant="link" className="text-primary p-0 h-auto" asChild>
              <Link
                href="/blog/[slug]"
                className="inline-flex items-center gap-2"
              >
                Read More
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </Button>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                {comments} Comments
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                {likes}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
