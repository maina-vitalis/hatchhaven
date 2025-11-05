import { Heart, Leaf, Handshake, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function MissionValues() {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Animal Welfare",
      description:
        "We prioritize the health and happiness of our poultry, ensuring they live in natural, stress-free environments with access to open pastures and quality nutrition.",
    },
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: "Sustainability",
      description:
        "Our farming practices protect the environment through responsible resource management, organic methods, and renewable energy initiatives.",
    },
    {
      icon: <Handshake className="h-8 w-8 text-primary" />,
      title: "Community Focus",
      description:
        "We build lasting relationships with local communities, supporting local businesses and contributing to regional food security.",
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Quality Excellence",
      description:
        "Every product meets rigorous quality standards through continuous monitoring, testing, and improvement of our processes.",
    },
  ];

  const mission = {
    title: "Our Mission",
    content:
      "To provide the highest quality, ethically-raised poultry and eggs while promoting sustainable agriculture, animal welfare, and community well-being. We are committed to transparency, integrity, and continuous improvement in everything we do.",
  };

  const vision = {
    title: "Our Vision",
    content:
      "To be the leading provider of sustainable poultry products, setting the standard for ethical farming practices and inspiring positive change in the agricultural industry.",
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{mission.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {mission.content}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{vision.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {vision.content}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center mb-12">
            <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-wider">
              What We Stand For
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
              These fundamental principles guide every decision we make and
              every action we take
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center mb-4 p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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

