import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { getCurrentUser } from "@/src/lib/get-session";

export async function GET() {
    try {
        const teamMembers = await prisma.teamMember.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(teamMembers);
    } catch (error) {
        console.error("Error fetching team members:", error);
        return NextResponse.json(
            { error: "Failed to fetch team members" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user || user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, role, bio, email, image, linkedin, twitter } = body;

        if (!name || !role || !email) {
            return NextResponse.json(
                { error: "Name, role, and email are required" },
                { status: 400 }
            );
        }

        const teamMember = await prisma.teamMember.create({
            data: {
                name,
                role,
                bio,
                email,
                image,
                linkedin,
                twitter,
            },
        });

        return NextResponse.json(teamMember);
    } catch (error) {
        console.error("Error creating team member:", error);
        return NextResponse.json(
            { error: "Failed to create team member" },
            { status: 500 }
        );
    }
}
