import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all blog tags (public)
export async function GET() {
  try {
    const tags = await prisma.blogTag.findMany({
      include: {
        _count: {
          select: {
            posts: {
              where: {
                post: {
                  published: true,
                },
              },
            },
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    const transformedTags = tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      postCount: tag._count.posts,
    }));

    return NextResponse.json(transformedTags);
  } catch (error) {
    console.error("Error fetching blog tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog tags" },
      { status: 500 }
    );
  }
}

