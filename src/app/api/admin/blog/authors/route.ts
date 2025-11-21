import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { getCurrentUser } from "@/src/lib/get-session";

// GET all blog authors (admin)
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const authors = await prisma.blogAuthor.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(authors);
  } catch (error) {
    console.error("Error fetching blog authors:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog authors" },
      { status: 500 }
    );
  }
}

// POST create blog author
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
    const { name, email, avatar, bio } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingAuthor = await prisma.blogAuthor.findUnique({
      where: { email },
    });

    if (existingAuthor) {
      return NextResponse.json(
        { error: "An author with this email already exists" },
        { status: 400 }
      );
    }

    const author = await prisma.blogAuthor.create({
      data: {
        name,
        email,
        avatar: avatar || null,
        bio: bio || null,
      },
    });

    return NextResponse.json(author, { status: 201 });
  } catch (error) {
    console.error("Error creating blog author:", error);
    return NextResponse.json(
      { error: "Failed to create blog author" },
      { status: 500 }
    );
  }
}


