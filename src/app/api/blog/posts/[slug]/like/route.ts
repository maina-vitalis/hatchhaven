import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

// POST like a blog post
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Find and update the blog post
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      select: { id: true, published: true, likes: true },
    });

    if (!post || !post.published) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Increment likes
    const updatedPost = await prisma.blogPost.update({
      where: { id: post.id },
      data: {
        likes: {
          increment: 1,
        },
      },
      select: {
        likes: true,
      },
    });

    return NextResponse.json({
      success: true,
      likes: updatedPost.likes,
    });
  } catch (error) {
    console.error("Error liking blog post:", error);
    return NextResponse.json(
      { error: "Failed to like post" },
      { status: 500 }
    );
  }
}
