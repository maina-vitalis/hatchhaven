import { NextResponse } from "next/server";
import { auth } from "@/src/lib/auth";
import prisma from "@/src/lib/prisma";

export async function GET() {
    try {
        const images = await prisma.galleryImage.findMany({
            orderBy: [
                { featured: "desc" },
                { order: "asc" },
                { createdAt: "desc" },
            ],
        });

        return NextResponse.json(images);
    } catch (error) {
        console.error("Error fetching gallery images:", error);
        return NextResponse.json(
            { error: "Failed to fetch gallery images" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { title, alt, imageUrl, category, description, featured } = body;

        if (!imageUrl || !alt) {
            return NextResponse.json(
                { error: "Image URL and Alt text are required" },
                { status: 400 }
            );
        }

        const image = await prisma.galleryImage.create({
            data: {
                title,
                alt,
                imageUrl,
                category,
                description,
                featured: featured || false,
            },
        });

        return NextResponse.json(image);
    } catch (error) {
        console.error("Error creating gallery image:", error);
        return NextResponse.json(
            { error: "Failed to create gallery image" },
            { status: 500 }
        );
    }
}
