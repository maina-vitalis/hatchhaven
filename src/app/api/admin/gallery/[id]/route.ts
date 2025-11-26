import { NextResponse } from "next/server";
import { auth } from "@/src/lib/auth";
import prisma from "@/src/lib/prisma";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        const image = await prisma.galleryImage.findUnique({
            where: { id },
        });

        if (!image) {
            return NextResponse.json({ error: "Image not found" }, { status: 404 });
        }

        // Delete from Cloudinary
        if (image.imageUrl) {
            const { extractPublicId, deleteImage } = await import("@/src/lib/cloudinary");
            const publicId = extractPublicId(image.imageUrl);
            if (publicId) {
                await deleteImage(publicId);
            }
        }

        await prisma.galleryImage.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting gallery image:", error);
        return NextResponse.json(
            { error: "Failed to delete gallery image" },
            { status: 500 }
        );
    }
}
