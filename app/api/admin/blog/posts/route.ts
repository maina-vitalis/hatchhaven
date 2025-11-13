import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-session";

// GET all blog posts (admin)
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const posts = await prisma.blogPost.findMany({
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
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const transformedPosts = posts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      image: post.image,
      featured: post.featured,
      published: post.published,
      publishedAt: post.publishedAt,
      readTime: post.readTime,
      views: post.views,
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
      },
      tags: post.tags.map((pt) => ({
        id: pt.tag.id,
        name: pt.tag.name,
        slug: pt.tag.slug,
      })),
      comments: post._count.comments,
    }));

    return NextResponse.json(transformedPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

// POST create new blog post
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      image,
      featured,
      published,
      publishedAt,
      readTime,
      categoryId,
      authorId,
      tagIds,
    } = body;

    if (!title || !slug || !excerpt || !content || !categoryId || !authorId) {
      return NextResponse.json(
        { error: "Title, slug, excerpt, content, category, and author are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    // Create post
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        image: image || null,
        featured: featured || false,
        published: published || false,
        publishedAt: published && publishedAt ? new Date(publishedAt) : null,
        readTime: readTime || 5,
        categoryId,
        authorId,
      },
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
      },
    });

    // Create tag associations if provided
    if (tagIds && Array.isArray(tagIds) && tagIds.length > 0) {
      await prisma.blogPostTag.createMany({
        data: tagIds.map((tagId: string) => ({
          postId: post.id,
          tagId,
        })),
      });

      // Fetch updated post with tags
      const updatedPost = await prisma.blogPost.findUnique({
        where: { id: post.id },
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
        },
      });

      return NextResponse.json(updatedPost, { status: 201 });
    }

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}

