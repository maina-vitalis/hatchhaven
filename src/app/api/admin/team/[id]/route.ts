import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { getCurrentUser } from "@/src/lib/get-session";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getCurrentUser();
        if (!user || user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { name, role, bio, email, image, linkedin, twitter, active } = body;

        const teamMember = await prisma.teamMember.update({
            where: { id },
            data: {
                name,
                role,
                bio,
                email,
                image,
                linkedin,
                twitter,
                active,
            },
        });

        return NextResponse.json(teamMember);
    } catch (error) {
        console.error("Error updating team member:", error);
        return NextResponse.json(
            { error: "Failed to update team member" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getCurrentUser();
        if (!user || user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        const teamMember = await prisma.teamMember.findUnique({
            where: { id },
        });

        if (!teamMember) {
            return NextResponse.json(
                { error: "Team member not found" },
                { status: 404 }
            );
        }

        // Delete image from Cloudinary if exists
        if (teamMember.image) {
            const { extractPublicId, deleteImage } = await import("@/src/lib/cloudinary");
            const publicId = extractPublicId(teamMember.image);
            if (publicId) {
                await deleteImage(publicId);
            }
        }

        await prisma.teamMember.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Team member deleted successfully" });
    } catch (error) {
        console.error("Error deleting team member:", error);
        return NextResponse.json(
            { error: "Failed to delete team member" },
            { status: 500 }
        );
    }
}
