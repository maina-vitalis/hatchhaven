import { Heart, Leaf, Handshake, Target, Eye, Compass } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";

export function MissionValues() {
  const values = [
    {
      icon: Heart,
      title: "Animal Welfare",
      description: "We prioritize the health and happiness of our poultry, ensuring they live in natural, stress-free environments with access to open pastures and quality nutrition.",
      color: "bg-red-500/10 text-red-600"
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Our farming practices protect the environment through responsible resource management, organic methods, and renewable energy initiatives.",
      color: "bg-green-500/10 text-green-600"
    },
    {
      icon: Handshake,
      title: "Community Focus",
      description: "We build lasting relationships with local communities, supporting local businesses and contributing to regional food security.",
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      icon: Target,
      title: "Quality Excellence",
      description: "Every product meets rigorous quality standards through continuous monitoring, testing, and improvement of our processes.",
      color: "bg-purple-500/10 text-purple-600"
    },
  ];

  const mission = {
    title: "Our Mission",
    icon: Compass,
    content: "To provide the highest quality, ethically-raised poultry and eggs while promoting sustainable agriculture, animal welfare, and community well-being. We are committed to transparency, integrity, and continuous improvement in everything we do.",
  };

  const vision = {
    title: "Our Vision",
    icon: Eye,
    content: "To be the leading provider of sustainable poultry products, setting the standard for ethical farming practices and inspiring positive change in the agricultural industry.",
  };

  return (
    <section className="py-20 bg-background">

      <div className="container mx-auto px-4 lg:px-8">
        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <mission.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{mission.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {mission.content}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <vision.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{vision.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {vision.content}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              What We Stand For
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Our Core <span className="text-primary">Values</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These fundamental principles guide every decision we make and every action we take
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-center">{value.title}</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
