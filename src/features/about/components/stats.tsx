import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Package, Users, Award, Heart, Globe } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  description?: string;
}

export function Stats() {
  const stats: Stat[] = [
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      value: "25+",
      label: "Years in Business",
      description: "Trusted expertise since 2000",
    },
    {
      icon: <Package className="h-10 w-10 text-primary" />,
      value: "2,500+",
      label: "Products Daily",
      description: "Fresh products delivered",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      value: "10,000+",
      label: "Happy Customers",
      description: "Satisfied families & businesses",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      value: "15+",
      label: "Awards Won",
      description: "Industry recognition",
    },
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      value: "100%",
      label: "Ethical Practices",
      description: "Free-range & organic",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      value: "50+",
      label: "Local Communities",
      description: "Regions served",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-wider">
            By The Numbers
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Impact & Achievements
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            These numbers reflect our commitment to excellence, quality, and
            community service
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
            >
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center mb-6 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  {stat.icon}
                </div>
                <div className="text-5xl md:text-6xl font-bold mb-3 text-foreground">
                  {stat.value}
                </div>
                <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
                {stat.description && (
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
