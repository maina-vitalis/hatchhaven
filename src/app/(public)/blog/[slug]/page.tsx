import type { Metadata } from "next";
import {
  BlogSingleHero,
  BlogSingleContent,
  BlogSingleSidebar,
} from "@/src/features/blog";
import { Footer } from "@/src/features/shared";
import prisma from "@/src/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: { title: true, excerpt: true, image: true, publishedAt: true },
  });

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      url: `https://www.hatchhavenacres.com/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      images: post.image ? [{ url: post.image, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.image ? [post.image] : [],
    },
  };
}

async function getBlogPost(slug: string) {
  try {
    // Try to find post by slug (raw)
    let post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        author: { select: { id: true, name: true, email: true, avatar: true, bio: true } },
        tags: { include: { tag: { select: { id: true, name: true, slug: true } } } },
        comments: {
          where: { approved: true },
          orderBy: { createdAt: "desc" },
          select: { id: true, author: true, email: true, avatar: true, content: true, createdAt: true },
        },
      },
    });

    // If not found, try decoded slug
    if (!post) {
      const decodedSlug = decodeURIComponent(slug);
      if (decodedSlug !== slug) {
        post = await prisma.blogPost.findUnique({
          where: { slug: decodedSlug },
          include: {
            category: { select: { id: true, name: true, slug: true } },
            author: { select: { id: true, name: true, email: true, avatar: true, bio: true } },
            tags: { include: { tag: { select: { id: true, name: true, slug: true } } } },
            comments: {
              where: { approved: true },
              orderBy: { createdAt: "desc" },
              select: { id: true, author: true, email: true, avatar: true, content: true, createdAt: true },
            },
          },
        });
      }
    }

    // If still not found, try slugified version (handle cases where URL has spaces but DB has hyphens)
    if (!post) {
      const slugified = decodeURIComponent(slug)
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      if (slugified !== slug && slugified !== decodeURIComponent(slug)) {
        post = await prisma.blogPost.findUnique({
          where: { slug: slugified },
          include: {
            category: { select: { id: true, name: true, slug: true } },
            author: { select: { id: true, name: true, email: true, avatar: true, bio: true } },
            tags: { include: { tag: { select: { id: true, name: true, slug: true } } } },
            comments: {
              where: { approved: true },
              orderBy: { createdAt: "desc" },
              select: { id: true, author: true, email: true, avatar: true, content: true, createdAt: true },
            },
          },
        });
      }
    }

    if (!post || !post.published) {
      return null;
    }

    // Increment views (non-blocking)
    try {
      await prisma.blogPost.update({
        where: { id: post.id },
        data: {
          views: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      console.error("Failed to increment post views:", error);
      // Continue rendering even if view increment fails
    }

    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      featured: post.featured,
      publishedAt: post.publishedAt,
      readTime: post.readTime,
      views: post.views + 1,
      likes: post.likes,
      category: {
        id: post.category.id,
        name: post.category.name,
        slug: post.category.slug,
      },
      author: {
        id: post.author.id,
        name: post.author.name,
        email: post.author.email,
        avatar: post.author.avatar,
        bio: post.author.bio,
      },
      tags: post.tags.map((pt) => ({
        id: pt.tag.id,
        name: pt.tag.name,
        slug: pt.tag.slug,
      })),
      comments: post.comments.map((comment) => ({
        id: comment.id,
        author: comment.author,
        email: comment.email,
        avatar: comment.avatar,
        content: comment.content,
        createdAt: comment.createdAt,
      })),
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

async function getRelatedPosts(categoryId: string, excludeId: string) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        categoryId,
        published: true,
        id: {
          not: excludeId,
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        image: true,
        publishedAt: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
      take: 4,
    });

    return posts;
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

async function getBlogCategories() {
  try {
    const categories = await prisma.blogCategory.findMany({
      include: {
        _count: {
          select: {
            posts: {
              where: {
                published: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      postCount: category._count.posts,
    }));
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return [];
  }
}

export default async function BlogSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const [relatedPosts, categories] = await Promise.all([
    getRelatedPosts(post.category.id, post.id),
    getBlogCategories(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author.name },
    publisher: {
      "@type": "Organization",
      name: "Hatch Haven Acres",
      url: "https://www.hatchhavenacres.com",
    },
    url: `https://www.hatchhavenacres.com/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogSingleHero post={post} />
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BlogSingleContent post={{ ...post, slug }} />
            </div>
            <div className="lg:col-span-1">
              <BlogSingleSidebar
                categories={categories}
                relatedPosts={relatedPosts}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
