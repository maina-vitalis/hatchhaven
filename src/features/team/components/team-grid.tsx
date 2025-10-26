import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  email: string;
  image: string;
}

export function TeamGrid() {
  const teamMembers: TeamMember[] = [
    {
      name: "John Anderson",
      role: "Founder & CEO",
      bio: "Passionate farmer with 30+ years of experience in sustainable agriculture. Founded Mega Farm in 2000 with a vision for ethical poultry farming.",
      email: "john@megafarm.com",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop",
    },
    {
      name: "Sarah Mitchell",
      role: "Farm Manager",
      bio: "Expert in free-range farming practices and animal welfare. Oversees daily operations ensuring the highest quality standards.",
      email: "sarah@megafarm.com",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop",
    },
    {
      name: "Robert Chen",
      role: "Operations Director",
      bio: "Manages supply chains and logistics with a focus on sustainability. Ensures fresh products reach customers on time.",
      email: "robert@megafarm.com",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop",
    },
    {
      name: "Emily Davis",
      role: "Quality Assurance",
      bio: "Dedicated to maintaining the highest quality standards. Conducts regular inspections and ensures all products meet our strict criteria.",
      email: "emily@megafarm.com",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop",
    },
    {
      name: "Michael Johnson",
      role: "Veterinarian",
      bio: "Ensures the health and well-being of all our poultry. Regular health checks and nutrition management for optimal bird health.",
      email: "michael@megafarm.com",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop",
    },
    {
      name: "Jennifer Martinez",
      role: "Marketing Director",
      bio: "Brings our story to customers through creative campaigns. Connects our farm values with conscious consumers.",
      email: "jennifer@megafarm.com",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary mb-2">Meet The Team</p>
          <h2 className="text-4xl md:text-5xl mb-4">
            The People Behind Mega Farm
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our dedicated team brings together decades of experience in
            sustainable farming and ethical poultry production
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>
              <CardContent className="p-6">
                <h3 className="mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {member.bio}
                </p>
                <div className="flex items-center justify-between">
                  <a
                    href={`mailto:${member.email}`}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  <div className="flex gap-2">
                    <a
                      href="#"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
