"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/src/components/ui/pagination";
import {
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
  slug: string;
  category: {
    name: string;
    slug: string;
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
  totalPosts?: number;
  postsPerPage?: number;
}

export function BlogContent({
  initialPosts,
  categories,
  recentPosts,
  totalPosts = 0,
  postsPerPage = 6,
}: BlogContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const blogPosts = initialPosts;

  // Calculate pagination
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    const newUrl = params.toString() ? `/blog?${params.toString()}` : '/blog';
    router.push(newUrl);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <section id="blog-content" className="py-20 bg-background">
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
            {totalPages > 1 && (
              <div className="pt-12 border-t">
                <Pagination>
                  <PaginationContent>
                    {hasPrevPage && (
                      <PaginationItem>
                        <PaginationPrevious
                          href={`/blog?page=${currentPage - 1}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage - 1);
                          }}
                        />
                      </PaginationItem>
                    )}

                    {getPageNumbers().map((page, index) => (
                      <PaginationItem key={index}>
                        {page === 'ellipsis' ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            href={`/blog?page=${page}`}
                            isActive={currentPage === page}
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(page as number);
                            }}
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}

                    {hasNextPage && (
                      <PaginationItem>
                        <PaginationNext
                          href={`/blog?page=${currentPage + 1}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage + 1);
                          }}
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
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
  slug,
  category,
  publishedAt,
  readTime,
  featured,
}: BlogPost) {
  const imageUrl = image || "/placeholder-blog.jpg";
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



          {/* Read More Button */}
          <div className="mt-6">
            <Link
              href={`/blog/${slug}`}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 group/btn w-full sm:w-auto hover:border-primary transition-all duration-300"
            >
              Read Full Article
              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
