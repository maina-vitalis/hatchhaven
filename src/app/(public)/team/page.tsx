import { TeamHero, TeamGrid } from "@/src/features/team";
import { Footer } from "@/src/features/shared";
import prisma from "@/src/lib/prisma";

export const dynamic = "force-dynamic";

async function getTeamMembers() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      where: {
        active: true,
      },
      orderBy: [
        { order: "asc" },
        { createdAt: "asc" },
      ],
      select: {
        id: true,
        name: true,
        role: true,
        bio: true,
        email: true,
        image: true,
        linkedin: true,
        twitter: true,
      },
    });

    return teamMembers;
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  return (
    <>
      <TeamHero />
      <TeamGrid teamMembers={teamMembers} />
      <Footer />
    </>
  );
}
