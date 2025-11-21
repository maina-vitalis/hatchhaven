import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

// POST create comment on blog post
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { author, email, content } = body;

    if (!author || !email || !content) {
      return NextResponse.json(
        { error: "Author, email, and content are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Find the blog post
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      select: { id: true, published: true },
    });

    if (!post || !post.published) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Create comment (not approved by default)
    const comment = await prisma.blogComment.create({
      data: {
        postId: post.id,
        author,
        email,
        content,
        approved: false, // Requires admin approval
      },
    });

    return NextResponse.json(
      { 
        message: "Comment submitted successfully. It will appear after approval.",
        comment: {
          id: comment.id,
          author: comment.author,
          createdAt: comment.createdAt,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to submit comment" },
      { status: 500 }
    );
  }
}
