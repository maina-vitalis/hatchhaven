import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Package, Users, Award } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export function Stats() {
  const stats: Stat[] = [
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      value: "25+",
      label: "Years in Business",
    },
    {
      icon: <Package className="h-8 w-8 text-primary" />,
      value: "500+",
      label: "Products Daily",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      value: "1000+",
      label: "Happy Customers",
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      value: "15+",
      label: "Awards Won",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-2">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl mb-2">{stat.value}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
