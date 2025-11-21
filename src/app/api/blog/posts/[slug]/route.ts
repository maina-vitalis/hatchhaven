import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

// GET single blog post by slug (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
      where: { slug },
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
            bio: true,
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
        comments: {
          where: {
            approved: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            author: true,
            email: true,
            avatar: true,
            content: true,
            createdAt: true,
          },
        },
      },
    });

    if (!post || !post.published) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Increment views
    await prisma.blogPost.update({
      where: { id: post.id },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    // Transform the data
    const transformedPost = {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      featured: post.featured,
      publishedAt: post.publishedAt,
      readTime: post.readTime,
      views: post.views + 1, // Include the increment
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

    return NextResponse.json(transformedPost);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}
