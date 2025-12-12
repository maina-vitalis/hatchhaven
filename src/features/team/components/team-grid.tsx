import Image from "next/image";
import { Card, CardContent } from "@/src/components/ui/card";
import { Mail, Linkedin, Twitter } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  email: string;
  image: string | null;
  linkedin: string | null;
  twitter: string | null;
}

interface TeamGridProps {
  teamMembers: TeamMember[];
}

export function TeamGrid({ teamMembers }: TeamGridProps) {
  // Fallback placeholder image
  const getImageUrl = (image: string | null) => {
    return image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop";
  };

  return (
    <section id="team-members" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary mb-2">Meet The Team</p>
          <h2 className="text-4xl md:text-5xl mb-4">
            The People Behind Hatch Haven
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our dedicated team brings together decades of experience in
            sustainable farming and ethical poultry production
          </p>
        </div>

        {teamMembers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No team members found.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={getImageUrl(member.image)}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-3 font-medium">{member.role}</p>
                  {member.bio && (
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {member.bio}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <a
                      href={`mailto:${member.email}`}
                      className="text-primary hover:text-primary/80 transition-colors"
                      title={`Email ${member.name}`}
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <div className="flex gap-2">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors"
                          title={`${member.name} on LinkedIn`}
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors"
                          title={`${member.name} on Twitter`}
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
