"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/src/components/ui/card";
import { Mail, Linkedin } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  email: string;
  linkedin?: string;
  active: boolean;
}

export function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch("/api/admin/team");
        if (response.ok) {
          const data = await response.json();
          setTeam(data.filter((m: TeamMember) => m.active));
        }
      } catch (error) {
        console.error("Failed to fetch team members", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p>Loading team...</p>
        </div>
      </section>
    );
  }

  if (team.length === 0) {
    return null; 
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-wider">
            Meet The Team
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The People Behind Hatch Haven
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Our dedicated team brings together decades of experience in
            sustainable farming, quality assurance, and ethical agriculture.
            Each member is committed to our mission of excellence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 group"
            >
              <div className="aspect-square overflow-hidden relative">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-semibold mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t">
                  <a
                    href={`mailto:${member.email}`}
                    className="text-primary hover:text-primary/80 transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                      aria-label={`LinkedIn ${member.name}`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
