import { auth } from "@/src/lib/auth";
import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword, verifyPassword } from "@/src/lib/auth-utils";

const passwordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { currentPassword, newPassword } = passwordSchema.parse(body);

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
        });

        if (!user || !user.password) {
            return new NextResponse("User not found or using OAuth", { status: 404 });
        }

        const isPasswordValid = await verifyPassword(currentPassword, user.password);

        if (!isPasswordValid) {
            return new NextResponse("Invalid current password", { status: 400 });
        }

        const hashedPassword = await hashPassword(newPassword);

        await prisma.user.update({
            where: { id: session.user.id },
            data: { password: hashedPassword },
        });

        return NextResponse.json({ message: "Password updated successfully" });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse("Invalid request data", { status: 422 });
        }
        console.error("[PASSWORD_UPDATE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
