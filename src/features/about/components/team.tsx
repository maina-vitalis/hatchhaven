import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export function Team() {
  const team: TeamMember[] = [
    {
      name: "John Anderson",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop",
    },
    {
      name: "Sarah Mitchell",
      role: "Farm Manager",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop",
    },
    {
      name: "Robert Chen",
      role: "Operations Director",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop",
    },
    {
      name: "Emily Davis",
      role: "Quality Assurance",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary mb-2">Meet The Team</p>
          <h2 className="text-4xl md:text-5xl mb-4">
            The People Behind Mega Farm
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our dedicated team brings together decades of experience in
            sustainable farming
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
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
              <CardContent className="p-6 text-center">
                <h3 className="mb-1">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
