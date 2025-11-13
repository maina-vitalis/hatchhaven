import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all published blog posts (public)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const featured = searchParams.get("featured");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const where: {
      published: boolean;
      category?: { slug: string };
      tags?: { some: { tag: { slug: string } } };
      featured?: boolean;
    } = {
      published: true,
    };

    if (category) {
      where.category = {
        slug: category,
      };
    }

    if (tag) {
      where.tags = {
        some: {
          tag: {
            slug: tag,
          },
        },
      };
    }

    if (featured === "true") {
      where.featured = true;
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
          tags: {
            include: {
              tag: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
          _count: {
            select: {
              comments: {
                where: {
                  approved: true,
                },
              },
            },
          },
        },
        orderBy: [
          { featured: "desc" },
          { publishedAt: "desc" },
        ],
        skip,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ]);

    // Transform the data
    const transformedPosts = posts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      image: post.image,
      featured: post.featured,
      publishedAt: post.publishedAt,
      readTime: post.readTime,
      views: post.views,
      likes: post.likes,
      comments: post._count.comments,
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
      },
      tags: post.tags.map((pt) => ({
        id: pt.tag.id,
        name: pt.tag.name,
        slug: pt.tag.slug,
      })),
    }));

    return NextResponse.json({
      posts: transformedPosts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

