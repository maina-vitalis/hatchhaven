import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { TrendingUp, Package, Users, Award, Heart, Globe } from "lucide-react";

interface Stat {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  description?: string;
  color: string;
}

export function Stats() {
  const stats: Stat[] = [
    {
      icon: TrendingUp,
      value: "25+",
      label: "Years in Business",
      description: "Trusted expertise since 2000",
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      icon: Package,
      value: "2,500+",
      label: "Products Daily",
      description: "Fresh products delivered",
      color: "bg-green-500/10 text-green-600"
    },
    {
      icon: Users,
      value: "10,000+",
      label: "Happy Customers",
      description: "Satisfied families & businesses",
      color: "bg-purple-500/10 text-purple-600"
    },
    {
      icon: Award,
      value: "15+",
      label: "Awards Won",
      description: "Industry recognition",
      color: "bg-yellow-500/10 text-yellow-600"
    },
    {
      icon: Heart,
      value: "100%",
      label: "Ethical Practices",
      description: "Free-range & organic",
      color: "bg-red-500/10 text-red-600"
    },
    {
      icon: Globe,
      value: "50+",
      label: "Local Communities",
      description: "Regions served",
      color: "bg-indigo-500/10 text-indigo-600"
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-8 text-foreground">
            Our Impact & Achievements
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold mb-1 text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
